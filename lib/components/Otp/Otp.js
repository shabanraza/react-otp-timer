'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pad = function pad(n) {
    return n < 10 ? '0' + n : '' + n;
};

var computeDuration = function computeDuration(props) {
    var minutes = typeof props.minutes === 'number' ? props.minutes : 0;
    var seconds = typeof props.seconds === 'number' ? props.seconds : 0;
    var total = Math.max(0, Math.floor(minutes * 60 + seconds));
    return total;
};

var Otp = function (_React$Component) {
    _inherits(Otp, _React$Component);

    function Otp(props) {
        _classCallCheck(this, Otp);

        var _this = _possibleConstructorReturn(this, (Otp.__proto__ || Object.getPrototypeOf(Otp)).call(this, props));

        _this.resendOTP = _this.resendOTP.bind(_this);
        _this.tick = _this.tick.bind(_this);

        var duration = computeDuration(props);
        _this.state = {
            start: Date.now(),
            duration: duration,
            minutes: pad(Math.floor(duration / 60)),
            seconds: pad(duration % 60),
            resend: duration === 0
        };

        _this.timerId = null;
        return _this;
    }

    _createClass(Otp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.duration > 0) {
                this.startTimer();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.minutes !== this.props.minutes || prevProps.seconds !== this.props.seconds) {
                this.reset();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimer();
        }
    }, {
        key: 'clearTimer',
        value: function clearTimer() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        }
    }, {
        key: 'startTimer',
        value: function startTimer() {
            this.clearTimer();
            this.timerId = setInterval(this.tick, 1000);
        }
    }, {
        key: 'tick',
        value: function tick() {
            var elapsed = Math.floor((Date.now() - this.state.start) / 1000);
            var remaining = Math.max(0, this.state.duration - elapsed);
            var minutes = Math.floor(remaining / 60);
            var seconds = remaining % 60;

            this.setState({ minutes: pad(minutes), seconds: pad(seconds) });

            if (remaining <= 0) {
                this.clearTimer();
                this.setState({ resend: true });
                if (typeof this.props.onTimerComplete === 'function') {
                    this.props.onTimerComplete();
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this2 = this;

            var duration = computeDuration(this.props);
            this.setState({
                start: Date.now(),
                duration: duration,
                minutes: pad(Math.floor(duration / 60)),
                seconds: pad(duration % 60),
                resend: duration === 0
            }, function () {
                if (duration > 0) _this2.startTimer();else _this2.clearTimer();
            });
        }
    }, {
        key: 'resendOTP',
        value: function resendOTP(evt) {
            if (evt && evt.preventDefault) evt.preventDefault();
            if (!this.state.resend) return;
            this.reset();
            if (typeof this.props.resendEvent === 'function') {
                this.props.resendEvent();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.props.style || {};
            var seperator = this.props.seperator != null ? this.props.seperator : ' : ';
            var resendButtonText = this.props.resendButtonText || 'Resend';
            var timerLabel = this.state.minutes + seperator + this.state.seconds;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h3',
                    { className: 'errMsg', style: style.otpTimer },
                    timerLabel
                ),
                _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'resend',
                        style: style.resendBtn,
                        onClick: this.resendOTP,
                        disabled: !this.state.resend
                    },
                    resendButtonText
                )
            );
        }
    }]);

    return Otp;
}(_react2.default.Component);

Otp.propTypes = {
    minutes: _propTypes2.default.number,
    seconds: _propTypes2.default.number,
    seperator: _propTypes2.default.string,
    resendButtonText: _propTypes2.default.string,
    resendEvent: _propTypes2.default.func,
    onTimerComplete: _propTypes2.default.func,
    style: _propTypes2.default.shape({
        otpTimer: _propTypes2.default.object,
        resendBtn: _propTypes2.default.object
    })
};

Otp.defaultProps = {
    minutes: 0,
    seconds: 0,
    seperator: ' : ',
    resendButtonText: 'Resend',
    style: {}
};

exports.default = Otp;
