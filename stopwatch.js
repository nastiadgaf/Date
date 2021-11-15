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

    seconds() {
        watch.innerHTML = this.hours + " : " + this.minutes + ": " + this.second + " : " + this.ms;

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

        const timeValues = [this.hours, this.minutes, this.second, this.ms]
        //const formatNumToTwoCharStr = num => String(num).length > 1 ? String(num) : `0${String(num)}`;
        let timeString;

        const formatNumToTwoCharStr = (val) =>{
            val = String(val);
            if(val.length < 2) val = '0' + val;
            return val;
        }

        for(let i = 0; i < timeValues.length; i++){
            timeString  += formatNumToTwoCharStr(timeValues[i]);
            if(i !== timeValues - 1) timeString += " : "
        }
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
    }

    stop() {
        clearInterval(this.stopWatchWork);
        if (this.ms > 1) {
            this.ms++;
        }
    }

    loop() {
        this.cleanLoopBlockByNumber();
        let loopText = document.createElement('p');
        loopText.classList.add('time_block_text')
        loopText.textContent = `${timeBlockText.textContent}${watch.textContent}`;
        timeBlock.append(loopText);
        loopTextAmount++;
    }

    cleanLoopBlock() {
        timeBlock.removeChild(timeBlock[0])
    }

    resetLoopBlock(){
        while(timeBlock.firstChild){
            timeBlock.removeChild(timeBlock.firstChild);
        }
    }

    cleanLoopBlockByNumber() {
        if (loopTextAmount === 5) {
            this.cleanLoopBlock();
        }
    }

}

let stopWatch = new StopWatch(0, 0, 0, 0);

document.addEventListener('click', function(e){
    function checkClassName(name){
        return e.target.classList.contains(name);
    }
    switch(true){
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