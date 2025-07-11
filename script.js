class LetterLearningGame {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.total = 0;
        this.currentMode = 'capitalToLower';
        this.currentLetter = null;
        this.correctAnswer = null;
        this.gameActive = true;
<<<<<<< HEAD
        this.carrots = 0;
        this.level = 1;
=======
        
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
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
<<<<<<< HEAD
        this.initializeGame();
    }
=======
        
        this.initializeGame();
    }
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    initializeGame() {
        this.setupEventListeners();
        this.generateNewQuestion();
        this.updateStats();
<<<<<<< HEAD
        this.updateCarrotBank();
    }
    setupEventListeners() {
        document.getElementById('capitalToLower').addEventListener('click', () => {
            this.switchMode('capitalToLower');
        });
        document.getElementById('lowerToCapital').addEventListener('click', () => {
            this.switchMode('lowerToCapital');
        });
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.generateNewQuestion();
        });
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.level = parseInt(btn.getAttribute('data-level'));
            });
        });
    }
    switchMode(mode) {
        this.currentMode = mode;
=======
    }
    
    setupEventListeners() {
        // Mode switching
        document.getElementById('capitalToLower').addEventListener('click', () => {
            this.switchMode('capitalToLower');
        });
        
        document.getElementById('lowerToCapital').addEventListener('click', () => {
            this.switchMode('lowerToCapital');
        });
        
        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.generateNewQuestion();
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update button states
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
<<<<<<< HEAD
        this.generateNewQuestion();
    }
    generateNewQuestion() {
        this.gameActive = true;
        this.hideFeedback();
        this.hideNextButton();
        const randomIndex = Math.floor(Math.random() * this.letters.length);
        this.currentLetter = this.letters[randomIndex];
=======
        
        // Generate new question with new mode
        this.generateNewQuestion();
    }
    
    generateNewQuestion() {
        // Reset game state
        this.gameActive = true;
        this.hideFeedback();
        this.hideNextButton();
        
        // Select random letter
        const randomIndex = Math.floor(Math.random() * this.letters.length);
        this.currentLetter = this.letters[randomIndex];
        
        // Set target letter based on mode
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
        const targetLetterElement = document.getElementById('targetLetter');
        if (this.currentMode === 'capitalToLower') {
            targetLetterElement.textContent = this.currentLetter.capital;
            this.correctAnswer = this.currentLetter.lowercase;
        } else {
            targetLetterElement.textContent = this.currentLetter.lowercase;
            this.correctAnswer = this.currentLetter.capital;
        }
<<<<<<< HEAD
        this.generateOptions();
    }
    generateOptions() {
        const optionsGrid = document.getElementById('optionsGrid');
        optionsGrid.innerHTML = '';
=======
        
        // Generate options
        this.generateOptions();
    }
    
    generateOptions() {
        const optionsGrid = document.getElementById('optionsGrid');
        optionsGrid.innerHTML = '';
        
        // Create array of all possible answers
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
        let allOptions = [];
        if (this.currentMode === 'capitalToLower') {
            allOptions = this.letters.map(letter => letter.lowercase);
        } else {
            allOptions = this.letters.map(letter => letter.capital);
        }
<<<<<<< HEAD
        const shuffledOptions = this.shuffleArray([...allOptions]);
        const selectedOptions = [this.correctAnswer];
=======
        
        // Shuffle and select 4 options including the correct answer
        const shuffledOptions = this.shuffleArray([...allOptions]);
        const selectedOptions = [this.correctAnswer];
        
        // Add 3 random wrong options
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
        for (let option of shuffledOptions) {
            if (selectedOptions.length >= 4) break;
            if (option !== this.correctAnswer) {
                selectedOptions.push(option);
            }
        }
<<<<<<< HEAD
        const finalOptions = this.shuffleArray(selectedOptions);
=======
        
        // Shuffle the final options
        const finalOptions = this.shuffleArray(selectedOptions);
        
        // Create option buttons
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
        finalOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option));
            optionsGrid.appendChild(button);
        });
    }
<<<<<<< HEAD
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
        this.showNextButton();
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
=======
    
    checkAnswer(selectedAnswer) {
        if (!this.gameActive) return;
        
        this.gameActive = false;
        this.total++;
        
        const isCorrect = selectedAnswer === this.correctAnswer;
        
        if (isCorrect) {
            this.score++;
            this.streak++;
            this.showFeedback('Correct! 🎉', 'correct');
            this.highlightCorrectAnswer();
        } else {
            this.streak = 0;
            this.showFeedback(`Wrong! The correct answer is ${this.correctAnswer}`, 'incorrect');
            this.highlightCorrectAnswer();
            this.highlightIncorrectAnswer(selectedAnswer);
        }
        
        this.updateStats();
        this.updateProgress();
        this.showNextButton();
    }
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    highlightCorrectAnswer() {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            if (button.textContent === this.correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
<<<<<<< HEAD
=======
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    highlightIncorrectAnswer(wrongAnswer) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            if (button.textContent === wrongAnswer) {
                button.classList.add('incorrect');
            }
        });
    }
<<<<<<< HEAD
=======
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    showFeedback(message, type) {
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.textContent = message;
        feedbackElement.className = `feedback-message ${type} show`;
    }
<<<<<<< HEAD
=======
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    hideFeedback() {
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.className = 'feedback-message';
    }
<<<<<<< HEAD
    showNextButton() {
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    hideNextButton() {
        document.getElementById('nextBtn').style.display = 'none';
    }
=======
    
    showNextButton() {
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    
    hideNextButton() {
        document.getElementById('nextBtn').style.display = 'none';
    }
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('total').textContent = this.total;
    }
<<<<<<< HEAD
=======
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    updateProgress() {
        const progressPercentage = this.total > 0 ? (this.score / this.total) * 100 : 0;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    }
<<<<<<< HEAD
=======
    
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
<<<<<<< HEAD
=======

// Initialize the game when the page loads
>>>>>>> 6ca9d13118d89b40356cf9b99fc6a57ab995b385
document.addEventListener('DOMContentLoaded', () => {
    new LetterLearningGame();
}); 