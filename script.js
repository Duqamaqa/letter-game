class LetterLearningGame {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.total = 0;
        this.currentMode = 'capitalToLower';
        this.currentLetter = null;
        this.correctAnswer = null;
        this.gameActive = true;
        
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
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
        
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
        const targetLetterElement = document.getElementById('targetLetter');
        if (this.currentMode === 'capitalToLower') {
            targetLetterElement.textContent = this.currentLetter.capital;
            this.correctAnswer = this.currentLetter.lowercase;
        } else {
            targetLetterElement.textContent = this.currentLetter.lowercase;
            this.correctAnswer = this.currentLetter.capital;
        }
        
        // Generate options
        this.generateOptions();
    }
    
    generateOptions() {
        const optionsGrid = document.getElementById('optionsGrid');
        optionsGrid.innerHTML = '';
        
        // Create array of all possible answers
        let allOptions = [];
        if (this.currentMode === 'capitalToLower') {
            allOptions = this.letters.map(letter => letter.lowercase);
        } else {
            allOptions = this.letters.map(letter => letter.capital);
        }
        
        // Shuffle and select 4 options including the correct answer
        const shuffledOptions = this.shuffleArray([...allOptions]);
        const selectedOptions = [this.correctAnswer];
        
        // Add 3 random wrong options
        for (let option of shuffledOptions) {
            if (selectedOptions.length >= 4) break;
            if (option !== this.correctAnswer) {
                selectedOptions.push(option);
            }
        }
        
        // Shuffle the final options
        const finalOptions = this.shuffleArray(selectedOptions);
        
        // Create option buttons
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
    
    showNextButton() {
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    
    hideNextButton() {
        document.getElementById('nextBtn').style.display = 'none';
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

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new LetterLearningGame();
}); 