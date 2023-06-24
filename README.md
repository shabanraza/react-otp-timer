# react-otp-timer
You can use this component to log in with OTP.
## Install

`npm install react-otp-timer --save`

## Usage
Just import the component and pass the number of minutes and styles in the otp component.

``` javascript
import React from'react'
import  { Otp } from 'react-otp-timer';
class App extends React.Component {


    //callback of the send button
    resendEvent() { 
     
     console.log("***************Resend button pressed, do stuff here *********************")

    }
    
    render() {
      let style = {
          otpTimer:{
              margin:'10px',
              color:'blue',
          },
          resendBtn:{
            backgroundColor:'#5cb85c',
            color:'white',
            border: '1 px solid #ccc'
          }
      }

    return (
        <div>
            <h1>Otp Timer counter</h1>
            <Otp
                style={style}
                minutes=1.5 // Minutes (Enter the number of minutes to count)
                resendEvent=this.resendEvent.bind(this)} //  Resend button event You can pass your function name here
            />
        </div>
    )
  }
}
export default App

```

## how to restart a otp-timer 
There is resendEvent props which will return callback function 

```javscript
    <Otp
       style={style}
       minutes={1.5}      // Minutes ( Pass the no of minutes that you want count )
       resendEvent={...} //  Pass your callback function here
    />

```
## Demo
You can see the demo here
visit http://otptimer.surge.sh

