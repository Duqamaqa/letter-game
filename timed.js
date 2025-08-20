class TimedLetterGame {
  constructor() {
    this.score = 0;
    this.currentMode = 'capitalToLower';
    this.currentLetter = null;
    this.correctAnswer = null;
    this.gameActive = false;
    this.carrots = 0;
    this.timeLeft = 60;
    this.timerId = null;
    this.allLetters = [
      { capital: 'A', lowercase: 'a' }, { capital: 'B', lowercase: 'b' }, { capital: 'C', lowercase: 'c' },
      { capital: 'D', lowercase: 'd' }, { capital: 'E', lowercase: 'e' }, { capital: 'F', lowercase: 'f' },
      { capital: 'G', lowercase: 'g' }, { capital: 'H', lowercase: 'h' }, { capital: 'I', lowercase: 'i' },
      { capital: 'J', lowercase: 'j' }, { capital: 'K', lowercase: 'k' }, { capital: 'L', lowercase: 'l' },
      { capital: 'M', lowercase: 'm' }, { capital: 'N', lowercase: 'n' }, { capital: 'O', lowercase: 'o' },
      { capital: 'P', lowercase: 'p' }, { capital: 'Q', lowercase: 'q' }, { capital: 'R', lowercase: 'r' },
      { capital: 'S', lowercase: 's' }, { capital: 'T', lowercase: 't' }, { capital: 'U', lowercase: 'u' },
      { capital: 'V', lowercase: 'v' }, { capital: 'W', lowercase: 'w' }, { capital: 'X', lowercase: 'x' },
      { capital: 'Y', lowercase: 'y' }, { capital: 'Z', lowercase: 'z' }
    ];
    this.letters = this.allLetters.slice();
    this.initialize();
  }
  initialize() {
    const user = window.LGApp && LGApp.getUserData && LGApp.getUserData();
    if (!user) {
      alert('Please login first.');
      window.location.href = 'login.html';
      return;
    }
    this.carrots = user.carrots || 0;
    const selected = LGApp.getSelectedLetters();
    if (selected && selected.length) {
      const set = new Set(selected);
      this.letters = this.allLetters.filter(l => set.has(l.capital));
    }
    this.updateCarrotBank();
    this.updateBest();
    this.bind();
    this.generateNewQuestion();
    this.renderPets();
  }
  bind() {
    document.getElementById('startBtn').addEventListener('click', () => this.start());
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
  }
  start() {
    if (this.gameActive) return;
    this.gameActive = true;
    this.score = 0;
    this.timeLeft = 60;
    document.getElementById('score').textContent = this.score;
    document.getElementById('timeLeft').textContent = this.timeLeft;
    this.timerId = setInterval(() => {
      this.timeLeft -= 1;
      document.getElementById('timeLeft').textContent = this.timeLeft;
      if (this.timeLeft <= 0) {
        this.end();
      }
    }, 1000);
  }
  reset() {
    this.end(false);
    this.score = 0;
    document.getElementById('score').textContent = this.score;
    document.getElementById('timeLeft').textContent = 60;
    this.generateNewQuestion();
  }
  end(showAlert = true) {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
    const wasActive = this.gameActive;
    this.gameActive = false;
    if (wasActive) {
      const user = LGApp.getUserData();
      const best = user.bestTimedScore || 0;
      if (this.score > best) {
        LGApp.updateUserData({ bestTimedScore: this.score });
        this.updateBest();
      }
      if (showAlert) alert(`Time! Your score: ${this.score}`);
    }
  }
  updateBest() {
    const user = LGApp.getUserData();
    document.getElementById('best').textContent = user ? (user.bestTimedScore||0) : 0;
  }
  generateNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.letters.length);
    this.currentLetter = this.letters[randomIndex];
    const targetLetterElement = document.getElementById('targetLetter');
    if (this.currentMode === 'capitalToLower') {
      targetLetterElement.textContent = this.currentLetter.capital;
      this.correctAnswer = this.currentLetter.lowercase;
    } else {
      targetLetterElement.textContent = this.currentLetter.lowercase;
      this.correctAnswer = this.currentLetter.capital;
    }
    this.generateOptions();
  }
  generateOptions() {
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    let allOptions = [];
    if (this.currentMode === 'capitalToLower') {
      allOptions = this.letters.map(letter => letter.lowercase);
    } else {
      allOptions = this.letters.map(letter => letter.capital);
    }
    const shuffled = this.shuffleArray([...allOptions]);
    const selectedOptions = [this.correctAnswer];
    for (let option of shuffled) {
      if (selectedOptions.length >= 4) break;
      if (option !== this.correctAnswer) selectedOptions.push(option);
    }
    const finalOptions = this.shuffleArray(selectedOptions);
    finalOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;
      button.addEventListener('click', () => this.checkAnswer(option));
      optionsGrid.appendChild(button);
    });
  }
  checkAnswer(selectedAnswer) {
    if (!this.gameActive) return;
    const isCorrect = selectedAnswer === this.correctAnswer;
    if (isCorrect) {
      this.score++;
      document.getElementById('score').textContent = this.score;
      this.showFeedback('Correct! 🎉', 'correct');
      this.highlightCorrectAnswer();
      this.animateCarrotHappy();
      this.showConfetti();
      this.wiggleTargetLetter();
      this.showHappyEmoji();
      this.cheerPets();
      // earn carrots
      const user = LGApp.getUserData();
      LGApp.updateUserData({ carrots: (user.carrots||0) + 1 });
      this.updateCarrotBank();
    } else {
      this.showFeedback(`Wrong! The correct answer is ${this.correctAnswer}`, 'incorrect');
      this.highlightCorrectAnswer();
      this.highlightIncorrectAnswer(selectedAnswer);
      this.animateCarrotFlyAway(1);
      this.sadPets();
      // lose 1 carrot in timed mode (gentler)
      const user = LGApp.getUserData();
      LGApp.updateUserData({ carrots: Math.max(0, (user.carrots||0) - 1) });
      this.updateCarrotBank();
    }
    setTimeout(() => this.generateNewQuestion(), 300);
  }
  updateCarrotBank() {
    const user = LGApp.getUserData();
    const count = user ? (user.carrots||0) : 0;
    const carrotIcons = document.getElementById('carrotIcons');
    const carrotCount = document.getElementById('carrotCount');
    if (carrotIcons) {
      carrotIcons.innerHTML = '';
      for (let i=0; i<count && i<50; i++) {
        const span = document.createElement('span');
        span.className = 'carrot-icon';
        carrotIcons.appendChild(span);
      }
    }
    if (carrotCount) carrotCount.textContent = count;
  }
  showFeedback(message, type) {
      const feedbackElement = document.getElementById('feedbackMessage');
      feedbackElement.textContent = message;
      feedbackElement.className = `feedback-message ${type} show`;
  }
  highlightCorrectAnswer() {
      const buttons = document.querySelectorAll('.option-btn');
      buttons.forEach(button => {
          if (button.textContent === this.correctAnswer) {
              button.classList.add('correct');
          }
      });
  }
  highlightIncorrectAnswer(wrongAnswer) {
      const buttons = document.querySelectorAll('.option-btn');
      buttons.forEach(button => {
          if (button.textContent === wrongAnswer) {
              button.classList.add('incorrect');
          }
      });
  }
  wiggleTargetLetter() {
      const target = document.querySelector('.target-letter');
      target.classList.add('wiggle');
      setTimeout(() => target.classList.remove('wiggle'), 700);
  }
  showConfetti() {
      const container = document.querySelector('.container');
      for (let i = 0; i < 12; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = (50 + (Math.random() - 0.5) * 60) + '%';
          confetti.style.top = '120px';
          confetti.style.background = this.randomConfettiColor();
          confetti.style.transform = `rotate(${Math.random()*360}deg)`;
          container.appendChild(confetti);
          setTimeout(() => confetti.remove(), 1000);
      }
  }
  randomConfettiColor() {
      const colors = ['#f6e05e', '#e67e22', '#48bb78', '#4299e1', '#f56565', '#f2994a', '#b7791f', '#ffb6b9', '#ffe066'];
      return colors[Math.floor(Math.random() * colors.length)];
  }
  showHappyEmoji() {
    const container = document.querySelector('.container');
    const emojiList = ['😃','😆','🥕','🎉','🤩','😺','🦄','🥳','😻','🐰'];
    const emoji = document.createElement('div');
    emoji.className = 'happy-emoji';
    emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1000);
  }
  animateCarrotHappy() {
    const carrotIcons = document.querySelectorAll('.carrot-icon');
    if (carrotIcons.length > 0) {
        const lastCarrot = carrotIcons[carrotIcons.length - 1];
        lastCarrot.classList.add('happy', 'sparkle');
        setTimeout(() => { lastCarrot.classList.remove('happy', 'sparkle'); }, 600);
    }
  }
  animateCarrotFlyAway(count) {
    const carrotIcons = document.querySelectorAll('.carrot-icon');
    let flyCount = Math.min(count, carrotIcons.length);
    for (let i = carrotIcons.length - 1; i >= 0 && flyCount > 0; i--, flyCount--) {
        const carrot = carrotIcons[i];
        carrot.classList.add('flyaway');
        setTimeout(() => { if (carrot.parentNode) carrot.parentNode.removeChild(carrot); }, 900);
    }
  }
  renderPets() {
    const layer = document.getElementById('petsLayer');
    if (!layer) return;
    layer.innerHTML = '';
    const user = LGApp.getUserData();
    const owned = Array.isArray(user.pets) ? user.pets : [];
    const areaWidth = layer.clientWidth || 400;
    const areaHeight = 60;
    owned.forEach(id => {
      const el = document.createElement('div');
      el.className = 'pet pet-sprite';
      const spritePath = `images/pet-${id}.png`;
      el.style.backgroundImage = `url('${spritePath}')`;
      el.style.left = Math.floor(Math.random() * (areaWidth - 40)) + 'px';
      el.style.top = Math.floor(Math.random() * areaHeight) + 'px';
      layer.appendChild(el);
    });
  }
  cheerPets() { document.querySelectorAll('.pet').forEach(p => { p.classList.add('pet-cheer'); setTimeout(()=>p.classList.remove('pet-cheer'), 600); }); }
  sadPets() { document.querySelectorAll('.pet').forEach(p => { p.classList.add('pet-sad'); setTimeout(()=>p.classList.remove('pet-sad'), 600); }); }
  shuffleArray(array) { const s=[...array]; for (let i=s.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [s[i],s[j]]=[s[j],s[i]];} return s; }
}

document.addEventListener('DOMContentLoaded', () => {
  new TimedLetterGame();
});


