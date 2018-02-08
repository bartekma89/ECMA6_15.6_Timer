class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print();
    }

    reset() {
        if (!this.running) {
            this.time = {
                minute: 0,
                second: 0,
                milisecond: 0
            };
            this.print();
        }
    }

    format(time) {
        return `${pre0(time.minute)}:${pre0(time.second)}:${pre0(time.milisecond)}`;
    }

    print() {
        this.display.innerText = this.format(this.time);
    }

    calculate() {
        this.time.milisecond += 1;
        if (this.time.milisecond >= 100) {
            this.time.second += 1;
            this.time.milisecond = 0;
        }
        if (this.time.second >= 60) {
            this.time.minute += 1;
            this.time.second = 0;
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
            this.print();
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
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

selector('#reset').addEventListener('click', () => stopwatch.reset());