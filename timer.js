let timer = document.querySelector('.timer_time');
let plus = document.querySelector('.plus');
let minus = document.querySelector('.minus');
let startTimer = document.querySelector('.start_timer');
let stopTimer = document.querySelector('.stop_timer');
let timerClock = document.querySelector('.timer_clock');
let resetTimer = document.querySelector('.reset_timer');
startTimer.disabled = true;

class Timer {
    constructor() {
        this.minutes = +timer.innerHTML;
        this.seconds = 0;
    }

    plusWork() {
        this.minutes++;
        timer.innerHTML = this.minutes;
        this.updateString();
        this.unblockStartButton();
    }

    minusWork() {
        if (this.minutes < 1) {
            this.blockStartButton();
            return;
        } 
        this.minutes--;
        timer.innerHTML = this.minutes;
        this.updateString();

    }

    updateString() {
        if (timer.innerHTML.length < 2) {
            timer.innerHTML = `0${this.minutes}`;
        }
    }

    formatNumToTwoCharStr = num => num >= 10 ? num : `0${num}`;

    updateTimeValue() {
        let timeArr = [this.minutes, this.seconds];
        let string = '';
        for (let i = 0; i < timeArr.length; i++) {
            string += this.formatNumToTwoCharStr(timeArr[i]);
            if (i !== timeArr.length - 1) string += ':';
        }

        timerClock.innerHTML = string;
    }

    decreaseBySecond() {
        if (this.seconds === 0) {
            this.minutes--;
            this.seconds = 59;
        } else {
            this.seconds--;
        }

        this.updateTimeValue();
        this.endTimerWork();

    }

    startTimerWork() {
        this.timerWork = setInterval(() => this.decreaseBySecond(), 1000);
        this.blockStartButton();
    }

    stopTimerWork() {
        clearInterval(this.timerWork);
        this.unblockStartButton();
    }

    resetTimerWork() {
        timerClock.innerHTML = '00:00';
        this.minutes = 0;
        this.seconds = 0;
        timer.innerHTML = '00';
        this.updateTimeValue();
        clearInterval(this.timerWork);
        this.blockStartButton();
    }

    endTimerWork(){
        if(timerClock.innerHTML == '00:00'){
            this.stopTimerWork();
            this.resetTimerWork();
            this.blockStartButton();
        } 
    }

    blockStartButton(){
        startTimer.disabled = true;
    }

    unblockStartButton(){
        startTimer.disabled = false;
    }
}

let newTimer = new Timer();

document.addEventListener('click', function (e) {
    const actionTypes = ['plus', 'minus', 'start_timer', 'reset_timer', 'stop_timer'];

    let currentType;

    for (let type of actionTypes) {
        if (e.target.classList.contains(type)) currentType = type;
    }

    switch (currentType) {
        case 'plus':
            newTimer.plusWork();
            break;
        case 'minus':
            newTimer.minusWork();
            break;
        case 'start_timer':
            newTimer.startTimerWork();
            break;
        case 'reset_timer':
            newTimer.resetTimerWork();
            break;
        case 'stop_timer':
            newTimer.stopTimerWork();
            break;
    }
})