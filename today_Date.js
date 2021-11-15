let clock = document.querySelector('#clock');
let date = document.querySelector('#date');

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

    // formatNumToTwoCharStr = (val) =>{
    //         val = String(val);
    //         if(val.length < 2) val = '0' + val;
    //         return val;
    //     }

    formatNumToTwoCharStr = num => String(num).length > 1 ? String(num) : `0${String(num)}`;

    createTimeString() {
        let time = [this.hours, this.minutes, this.seconds]
        
        let clockString = '';

        for(let i = 0; i < time.length; i++){
            clockString  += this.formatNumToTwoCharStr(time[i]);
            if(i !== time - 1) clockString += " : "
        }
    }
    
    createTodayDateString() {
        let date = [this.days, this.month, this.year]

        let dateString = '';

        for(let i = 0; i < date.length; i++){
            dateString  += this.formatNumToTwoCharStr(date[i]);
            if(i !== date - 1) dateString += " : "
        }
    }

    start() {
        this.updateDate();
        this.createTimeString();
        this.createTodayDateString();
    }

    render() {
        this.renderTime = setInterval(() => this.start(), 1000);
    }
}

let today = new DateToday();
today.start();
today.render();