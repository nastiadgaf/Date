let watch = document.querySelector('#watch');
let start = document.querySelector('.start');
let loop = document.querySelector('.loop');
let stop = document.querySelector('.stop');
let reset = document.querySelector('.reset');
let timeBlock = document.querySelector(".time_block");

class StopWatch {
    constructor() {
        this.setInitialText();
        document.addEventListener('click', (e) =>  this.onActionButtons(e))
    }

    onActionButtons(e) {
        const actionTypes = ['start', 'reset', 'stop', 'loop'];

        let currentType;

        for (let type of actionTypes) {
            if (e.target.classList.contains(type)) currentType = type;
        }

        switch (currentType) {
            case 'start':
                this.secondsWork();
                start.disabled = true;
                this.unblockLoopButton();
                break;
            case 'reset':
                this.reset();
                this.unblockStartButton();
                this.blockLoopButton();
                break;
            case 'stop':
                this.stop();
                this.unblockStartButton();
                this.blockLoopButton();
                break;
            case 'loop':
                this.loop();
                break;
        }
    }

    setInitialText() {
        this.hours = '0';
        this.minutes = '0';
        this.second = '0';
        this.ms = '0';
        this.loopTextAmount = 0;
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

    FormatNumber() {
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
        this.stop();
        this.clearLoopBlock();
        watch.innerHTML = '00:00:00:000';
        this.hours = '0';
        this.minutes = '0';
        this.second = '0';
        this.ms = '0';
        this.loopTextAmount = 0;
    }

    stop() {
        clearInterval(this.stopWatchWork);
        if (this.ms > 1) this.ms++;
    }

    loop() {

        if (this.loopTextAmount >= 5) {
            timeBlock.firstElementChild.remove();
            this.loopTextAmount = 5;
        } else {
            this.loopTextAmount++;
        }
        this.saveCurrentLoopValue();
    }

    saveCurrentLoopValue() {

        let loopValue = document.createElement('time');
        loopValue.classList.add('time_block_text')
        loopValue.textContent = `${watch.textContent}`;
        timeBlock.append(loopValue);

    }

    clearLoopBlock() {
        timeBlock.innerHTML = '';
    }

    unblockStartButton() {
        start.disabled = false;
    }

    blockLoopButton() {
        loop.disabled = true;
    }

    unblockLoopButton() {
        loop.disabled = false;
    }
}

let stopWatch = new StopWatch();
stopWatch.blockLoopButton();

