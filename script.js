class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.time);
	}

	reset() {
		this.time = {
			minute: 0,
			second: 0,
			milisecond: 0
		}
	}

	print() {
		this.display.innerText = this.format(this.time);
	}

	format(time) {
		return `${pre0(time.minute)}:${pre0(time.second)}:${pre0(time.milisecond)}`;
	}
};

let selector = selector => {
	return document.querySelector(selector);
};

const stopwatch = new Stopwatch(selector('.stopwatch'));