let timer = document.querySelector('.timer_time');
let plus = document.querySelector('.plus');
let minus = document.querySelector('.minus');
let startTimer = document.querySelector('.start_timer');
let stopTimer = document.querySelector('.stop_timer');
let timerClock = document.querySelector('.timer_clock');
let resetTimer = document.querySelector('.reset_timer');

class Timer {
    constructor(){
        this.minutes = +timer.innerHTML;
        this.seconds = 0;
    }

    plusWork() {
        this.minutes++;
        timer.innerHTML = this.minutes;
        this.updateString();
    }

    minusWork() {
        if (this.minutes < 1) return; 
            this.minutes--;
            timer.innerHTML = this.minutes;
            this.updateString();
        
    }

    updateString(){
        if(timer.innerHTML.length < 2){
            timer.innerHTML = `0${this.minutes}`;
        }
    }
    formatNumToTwoCharStr = num => num >= 10 ? num : `0${num}`;
    
    updateTimeValue(){
        let timeArr = [this.minutes, this.seconds];
        let string = '';
        for (let i = 0; i < timeArr.length; i++) {
            string += this.formatNumToTwoCharStr(timeArr[i]);
            if (i !== timeArr.length - 1) string += ':';
        }
        
        timerClock.innerHTML = string;
    }

    decreaseBySecond() {
            if(this.seconds === 0){
                this.minutes--;
                this.seconds = 59;
            } else{
                this.seconds --;
            }

            this.updateTimeValue();
            
        }

        startTimerWork() {
            this.timerWork = setInterval(() => this.decreaseBySecond(), 1000);
        }

        stopTimerWork() {
            clearInterval(this.timerWork);
        }

        resetTimerWork() {
            timerClock.innerHTML = '00:00';
            this.minutes = 0;
            this.seconds = 0;
            timer.innerHTML = 0;
            this.updateTimeValue();
            clearInterval(this.timerWork);
        }
}

    let newTimer = new Timer();

document.addEventListener('click', function(e){
    function checkClassName(name){
        return e.target.classList.contains(name);
    }
    switch(true){
        case checkClassName('plus'):
            newTimer.plusWork();
            break;
        case checkClassName('minus'):
            newTimer.minusWork();
            break;
        case checkClassName('start_timer'):
            newTimer.startTimerWork();
            break;
        case checkClassName('reset_timer'):
            newTimer.resetTimerWork();
            break;
        case checkClassName('stop_timer'):
            newTimer.stopTimerWork();
            break;
    }
})
