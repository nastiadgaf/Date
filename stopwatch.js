let watch = document.querySelector('#watch');
let start = document.querySelector('.start');
let loop = document.querySelector('.loop');
let stop = document.querySelector('.stop');
let reset = document.querySelector('.reset');
let timeBlockText = document.querySelector('.time_block_text');
let timeBlock = document.querySelector(".time_block");
let loopTextAmount = 0;
class StopWatch {
    constructor(h, m, s, ms) {
        this.hours = h.toString();
        this.minutes = m.toString();
        this.second = s.toString();
        this.ms = ms.toString();
    }

    formatNumToTwoCharStr = num => num >= 10 ? num : `0${num}`;
    
    seconds() {
        this.FormatNumber();

        if (this.ms == 100) {
            this.second++;
            this.ms = 0;
        }
        if (this.second == 60) {
            this.minutes++;
            this.second = 0;
        }
        if (this.minutes == 60) {
            this.hours++;
            this.minutes = 0;
        }
        this.ms++;    
    }

    FormatNumber(){
        const timeValues = [this.hours, this.minutes, this.second, this.ms]
        let string = '';

        for (let i = 0; i < timeValues.length; i++) {
            string += this.formatNumToTwoCharStr(timeValues[i]);
            if (i !== timeValues.length - 1) string += " : ";
        }

        watch.innerHTML = string;
    }

    secondsWork() {
        this.stopWatchWork = setInterval(() => this.seconds(), 10)
    }

    reset() {
        watch.innerHTML = '00:00:00:000';
        this.resetLoopBlock();
        clearInterval(this.stopWatchWork);
        this.hours = '0';
        this.minutes = '0';
        this.second = '0';
        this.ms = '0';
        loopTextAmount = 0;
    }

    stop() {
        clearInterval(this.stopWatchWork);
        if (this.ms > 1) {
            this.ms++;
        }
    }

    loop() {
        
        console.log(loopTextAmount)
        if (loopTextAmount >= 4) {
            timeBlock.firstChild.remove();
            loopTextAmount = 4
        }
        let loopText = document.createElement('p');
        loopText.classList.add('time_block_text')
        loopText.textContent = `${timeBlockText.textContent}${watch.textContent}`;
        timeBlock.append(loopText);
        loopTextAmount++;
    }

    resetLoopBlock() {
        while (timeBlock.firstChild) {
            timeBlock.removeChild(timeBlock.firstChild);
            loopTextAmount = 0;
        }
    }

}

let stopWatch = new StopWatch(0, 0, 0, 0);

document.addEventListener('click', function (e) {
    function checkClassName(name) {
        return e.target.classList.contains(name);
    }
    switch (true) {
        case checkClassName('start'):
            stopWatch.secondsWork();
            start.disabled = true;
            break;
        case checkClassName('reset'):
            stopWatch.reset();
            break;
        case checkClassName('stop'):
            stopWatch.stop();
            start.disabled = false;
            break;
        case checkClassName('loop'):
            stopWatch.loop();
            break;
    }
})