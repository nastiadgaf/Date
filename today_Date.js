let clock = document.querySelector('#clock');
let date = document.querySelector('#date');
let daysDate = document.querySelector('.date-days')

class DateToday {
    updateDate() {
        const now = new Date();
        this.hours = now.getHours().toString();
        this.minutes = now.getMinutes().toString();
        this.seconds = now.getSeconds().toString();
        this.days = now.getDate().toString();
        this.month = now.getMonth().toString();
        this.year = now.getFullYear().toString();

        
    }

    formatNumToTwoCharStr = num => num >= 10 ? num : `0${num}`;

    generateTimeString(array, separator) {
        let string = '';
        for (let i = 0; i < array.length; i++) {
            string += this.formatNumToTwoCharStr(array[i]);
            if (i !== array.length - 1) string += separator
        }
        return string;
    }



    start() {
        this.updateDate();

        let time = [this.hours, this.minutes, this.seconds]
        clock.innerHTML = this.generateTimeString(time, ':');

        let date = [this.days, ++this.month, this.year]
        daysDate.innerHTML = this.generateTimeString(date, '.');
    }

    render() {
        this.renderTime = setInterval(() => this.start(), 1000);
    }
}

let today = new DateToday();
today.start();
today.render();