'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            if (!this.running) {
                this.times = {
                    minute: 0,
                    second: 0,
                    milisecond: 0
                };
                this.print();
            }
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pre0(times.minute) + ':' + pre0(times.second) + ':' + pre0(times.milisecond);
        }
    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'calculate',
        value: function calculate() {
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
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            selector('#stop').innerText = 'Pause';
            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
                this.print();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.running) {
                selector('#stop').innerText = 'Reset';
                this.running = false;
                clearInterval(this.watch);
            } else {
                selector('#stop').innerText = 'Pause';
                this.reset();
            }
        }
    }, {
        key: 'timeShot',
        value: function timeShot() {
            if (this.running) {
                var timeShot = this.format(this.times);
                var elementList = document.createElement('li');
                elementList.innerText = timeShot;
                if (selector('#result').hasChildNodes) {
                    selector('#result').insertBefore(elementList, selector('#result').firstChild);
                } else {
                    selector('#result').appendChild(elementList);
                }
            }
        }
    }, {
        key: 'resetList',
        value: function resetList() {
            if (!this.running) selector('#result').innerText = '';
        }
    }]);

    return Stopwatch;
}();

function selector(selector) {
    return document.querySelector(selector);
}

function pre0(value) {
    var result = value.toString();
    return result.length < 2 ? '0' + result : result;
}

var stopwatch = new Stopwatch(selector('.stopwatch'));

selector('#start').addEventListener('click', function () {
    return stopwatch.start();
});

selector('#stop').addEventListener('click', function () {
    return stopwatch.stop();
});

selector('#reset').addEventListener('click', function () {
    return stopwatch.resetList();
});

selector('.stopwatch').addEventListener('click', function () {
    return stopwatch.timeShot();
});
