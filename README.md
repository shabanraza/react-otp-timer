# react-otp-timer

A simple React OTP countdown timer component with a configurable resend button.
The resend button is automatically disabled while the timer is running and is
enabled once the countdown reaches `00 : 00`.

## Install

```
npm install react-otp-timer --save
```

`react`, `react-dom` and `prop-types` must be installed in your application
(they are declared as peer dependencies).

## Usage

```jsx
import React from 'react';
import { Otp } from 'react-otp-timer';

class App extends React.Component {
    resendEvent = () => {
        console.log('Resend button pressed — do stuff here');
    };

    onTimerComplete = () => {
        console.log('Timer finished');
    };

    render() {
        const style = {
            otpTimer: {
                margin: '10px',
                color: 'blue',
            },
            resendBtn: {
                backgroundColor: '#5cb85c',
                color: 'white',
                border: '1px solid #ccc',
            },
        };

        return (
            <div>
                <h1>Otp Timer counter</h1>
                <Otp
                    style={style}
                    minutes={1}
                    seconds={30}
                    resendEvent={this.resendEvent}
                    onTimerComplete={this.onTimerComplete}
                    resendButtonText="Resend OTP"
                    seperator=":"
                />
            </div>
        );
    }
}

export default App;
```

## Props

| Prop                | Type     | Default   | Description                                                                 |
| ------------------- | -------- | --------- | --------------------------------------------------------------------------- |
| `minutes`           | number   | `0`       | Countdown minutes. May be a decimal (e.g. `1.5`). Combined with `seconds`.  |
| `seconds`           | number   | `0`       | Additional countdown seconds added to `minutes`.                            |
| `seperator`         | string   | `" : "`   | Text placed between the minutes and seconds displays.                       |
| `resendButtonText`  | string   | `Resend`  | Text shown on the resend button.                                            |
| `resendEvent`       | function | —         | Called when the user clicks the resend button (only fires when enabled).    |
| `onTimerComplete`   | function | —         | Called once when the countdown reaches zero.                                |
| `style`             | object   | `{}`      | `{ otpTimer, resendBtn }` style objects applied to the time and button.     |

## Behaviour

- The resend button is rendered `disabled` while the timer is counting down and
  becomes enabled when it reaches `00 : 00`.
- Clicking resend triggers your `resendEvent` callback and restarts the timer
  with the current `minutes` / `seconds` props.
- Changing the `minutes` or `seconds` prop from the parent automatically resets
  and restarts the timer.

## Demo

Visit http://otptimer.surge.sh
