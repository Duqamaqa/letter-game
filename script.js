class LetterLearningGame {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.total = 0;
        this.currentMode = 'capitalToLower';
        this.currentLetter = null;
        this.correctAnswer = null;
        this.gameActive = true;
        this.carrots = 0;
        this.level = 1;
        this.letters = [
            { capital: 'A', lowercase: 'a' },
            { capital: 'B', lowercase: 'b' },
            { capital: 'C', lowercase: 'c' },
            { capital: 'D', lowercase: 'd' },
            { capital: 'E', lowercase: 'e' },
            { capital: 'F', lowercase: 'f' },
            { capital: 'G', lowercase: 'g' },
            { capital: 'H', lowercase: 'h' },
            { capital: 'I', lowercase: 'i' },
            { capital: 'J', lowercase: 'j' },
            { capital: 'K', lowercase: 'k' },
            { capital: 'L', lowercase: 'l' },
            { capital: 'M', lowercase: 'm' },
            { capital: 'N', lowercase: 'n' },
            { capital: 'O', lowercase: 'o' },
            { capital: 'P', lowercase: 'p' },
            { capital: 'Q', lowercase: 'q' },
            { capital: 'R', lowercase: 'r' },
            { capital: 'S', lowercase: 's' },
            { capital: 'T', lowercase: 't' },
            { capital: 'U', lowercase: 'u' },
            { capital: 'V', lowercase: 'v' },
            { capital: 'W', lowercase: 'w' },
            { capital: 'X', lowercase: 'x' },
            { capital: 'Y', lowercase: 'y' },
            { capital: 'Z', lowercase: 'z' }
        ];
        this.initializeGame();
    }
    initializeGame() {
        this.setupEventListeners();
        this.generateNewQuestion();
        this.updateStats();
        this.updateCarrotBank();
    }
    setupEventListeners() {
        document.getElementById('capitalToLower').addEventListener('click', () => {
            this.switchMode('capitalToLower');
        });
        document.getElementById('lowerToCapital').addEventListener('click', () => {
            this.switchMode('lowerToCapital');
        });
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.level = parseInt(btn.getAttribute('data-level'));
                this.generateNewQuestion();
            });
        });
    }
    switchMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
        this.generateNewQuestion();
    }
    generateNewQuestion() {
        this.gameActive = true;
        this.hideFeedback();
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
        const shuffledOptions = this.shuffleArray([...allOptions]);
        const selectedOptions = [this.correctAnswer];
        for (let option of shuffledOptions) {
            if (selectedOptions.length >= 4) break;
            if (option !== this.correctAnswer) {
                selectedOptions.push(option);
            }
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
        this.gameActive = false;
        this.total++;
        const isCorrect = selectedAnswer === this.correctAnswer;
        if (isCorrect) {
            this.score++;
            this.streak++;
            this.carrots++;
            this.showFeedback('Correct! 🎉', 'correct');
            this.highlightCorrectAnswer();
            this.animateCarrotHappy();
            this.showConfetti();
            this.wiggleTargetLetter();
            this.showHappyEmoji();
        } else {
            this.streak = 0;
            this.carrots = Math.max(0, this.carrots - this.level);
            this.showFeedback(`Wrong! The correct answer is ${this.correctAnswer}`, 'incorrect');
            this.highlightCorrectAnswer();
            this.highlightIncorrectAnswer(selectedAnswer);
            this.animateCarrotFlyAway(this.level);
        }
        this.updateStats();
        this.updateProgress();
        this.updateCarrotBank();
        this.showNextButtonInOptionsGrid();
    }
    updateCarrotBank() {
        const carrotIcons = document.getElementById('carrotIcons');
        const carrotCount = document.getElementById('carrotCount');
        carrotIcons.innerHTML = '';
        for (let i = 0; i < this.carrots; i++) {
            const carrot = document.createElement('span');
            carrot.className = 'carrot-icon';
            carrotIcons.appendChild(carrot);
        }
        carrotCount.textContent = this.carrots;
    }
    animateCarrotHappy() {
        const carrotIcons = document.querySelectorAll('.carrot-icon');
        if (carrotIcons.length > 0) {
            const lastCarrot = carrotIcons[carrotIcons.length - 1];
            lastCarrot.classList.add('happy', 'sparkle');
            setTimeout(() => {
                lastCarrot.classList.remove('happy', 'sparkle');
            }, 700);
        }
    }
    animateCarrotFlyAway(count) {
        const carrotIcons = document.querySelectorAll('.carrot-icon');
        let flyCount = Math.min(count, carrotIcons.length);
        for (let i = carrotIcons.length - 1; i >= 0 && flyCount > 0; i--, flyCount--) {
            const carrot = carrotIcons[i];
            carrot.classList.add('flyaway');
            setTimeout(() => {
                if (carrot.parentNode) carrot.parentNode.removeChild(carrot);
            }, 1000);
        }
    }
    showConfetti() {
        const container = document.querySelector('.container');
        for (let i = 0; i < 18; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = (50 + (Math.random() - 0.5) * 60) + '%';
            confetti.style.top = '120px';
            confetti.style.background = this.randomConfettiColor();
            confetti.style.transform = `rotate(${Math.random()*360}deg)`;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1200);
        }
    }
    randomConfettiColor() {
        const colors = ['#f6e05e', '#e67e22', '#48bb78', '#4299e1', '#f56565', '#f2994a', '#b7791f', '#ffb6b9', '#ffe066'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    wiggleTargetLetter() {
        const target = document.querySelector('.target-letter');
        target.classList.add('wiggle');
        setTimeout(() => target.classList.remove('wiggle'), 700);
    }
    showHappyEmoji() {
        const container = document.querySelector('.container');
        const emojiList = ['😃','😆','🥕','🎉','🤩','😺','🦄','🥳','😻','🐰'];
        const emoji = document.createElement('div');
        emoji.className = 'happy-emoji';
        emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
        container.appendChild(emoji);
        setTimeout(() => emoji.remove(), 1200);
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
    showFeedback(message, type) {
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.textContent = message;
        feedbackElement.className = `feedback-message ${type} show`;
    }
    hideFeedback() {
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.className = 'feedback-message';
    }
    showNextButtonInOptionsGrid() {
        const optionsGrid = document.getElementById('optionsGrid');
        // Remove any existing next button first
        const oldNext = document.getElementById('nextBtn');
        if (oldNext) oldNext.remove();
        const nextBtn = document.createElement('button');
        nextBtn.id = 'nextBtn';
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'Next Letter';
        nextBtn.addEventListener('click', () => this.generateNewQuestion());
        optionsGrid.appendChild(nextBtn);
    }
    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('total').textContent = this.total;
    }
    updateProgress() {
        const progressPercentage = this.total > 0 ? (this.score / this.total) * 100 : 0;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    }
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new LetterLearningGame();
});
