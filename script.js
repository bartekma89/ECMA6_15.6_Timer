class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        if (!this.running) {
            this.times = {
                minute: 0,
                second: 0,
                milisecond: 0
            };
            this.print();
        }
    }

    format(times) {
        return `${pre0(times.minute)}:${pre0(times.second)}:${pre0(times.milisecond)}`;
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    calculate() {
        this.times.milisecond += 1;
        if (this.times.milisecond >= 100) {
            this.times.second += 1;
            this.times.milisecond = 0;
        }
        if (this.times.second >= 60) {
            this.times.minute += 1;
            this.times.second = 0;
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    start() {
        selector('#stop').innerText = 'Pause';
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
            this.print();
        }
    }

    stop() {
        if (this.running) {
            selector('#stop').innerText = 'Reset';
            this.running = false;
            clearInterval(this.watch);
        } else {
            selector('#stop').innerText = 'Pause';
            this.reset();
        }
    }

    timeShot() {
        if (this.running) {
            let timeShot = this.format(this.times);
            var elementList = document.createElement('li');
            elementList.innerText = timeShot;
            if (selector('#result').hasChildNodes) {
                selector('#result').insertBefore(elementList, selector('#result').firstChild);
            } else {
                selector('#result').appendChild(elementList);
            }
        }
    }

    resetList() {
        if (!this.running) selector('#result').innerText = '';
    }

}

function selector(selector) {
    return document.querySelector(selector);
}

function pre0(value) {
    let result = value.toString();
    return (result.length < 2) ? '0' + result : result;
}

const stopwatch = new Stopwatch(selector('.stopwatch'));

selector('#start').addEventListener('click', () => stopwatch.start());

selector('#stop').addEventListener('click', () => stopwatch.stop());

selector('#reset').addEventListener('click', () => stopwatch.resetList());

selector('.stopwatch').addEventListener('click', () => stopwatch.timeShot());