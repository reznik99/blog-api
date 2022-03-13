## How to make a RaspberryPI Remote Controlled car! Websockets & Streams
> ### This blog is a work in progress
In this blog we are going to make a remote controlled car using:
- RaspberryPI
- RaspberryPI Camera v1/v2
- Power Bank/Battery power for RaspberryPI and motors
- 2 DC motors (Left & Right wheel drivers)
- MotorDriver IC (H-Bridge)
- Some copper cables

In terms of software:
- Web GUI for viewing camera feed, and inputting commands
- Express/WebSocket Relay Server to proxy requests to/from the WebGUI and the RC Car (this will be used to bypass NAT so we don't have to port forward)
- Client software that will run on the RaspberryPI to convert commands to GPIO Pin actions to control the motors (PWM etc.)


## 1. Relay Server

### 1.1 HTTP Server
We will use **Express** to spin up a simple REST API for Login and fetching available robots

### 1.2 Websocket Server
We will use **Websockets** to transmit commands, statistics and video in *real-time* to the browser

## 2. RaspberryPI Client

### 2.1 Authentication and websocket logic
Code for Raspberry PI Client to connect to WebSocket Relay Server
~~~js
const axios = require("axios")
const { WebSocket } = require("ws")
 
initSocket = async () => { 
  try { 
    const response = await axios.post(`${API_URL}/login`, { 
      username: "<your username>", 
      password: "<your password>",
      isRobot: true
    })
    const ws = new WebSocket( 
      `${SOCKET_URL}/ws?token=${response.data.token}` 
    )
    ws.on("open", function open() { 
      console.log("connected")
    })
 
    ws.on("close", function close() { 
      console.log("disconnected")
    })
 
    ws.on("message", function message(data) { 
      console.log(data.toString())
    })
  } catch (err) { 
    console.error(err)
  } 
}
 
initSocket()
~~~

The important part here is the authentication logic.
We first authenticate using HTTP and credentials. This let's us recieve a JWT Token that we store.

This token is used to initialize the WebSocket connection to the Relay Server (so that not everyone can connect to it and DoS us)

### 2.2 Pin Control
Within the message event handler. We need to figure out the command recieved, and perform that action on the GPIO pins

~~~js
ws.on("message", function message(data) { 
    const command = data.toString()
    switch (command.toUpperCase()) {
        case 'W':
            // Fire the right pins to make both motors turn forward
            break
        case 'S':
             // Fire the right pins to make both motors turn backwards
            break
        case 'A':
             // Fire the right pins to make both motors turn opposite of eachother
            break
        case 'D':
             // Fire the right pins to make both motors turn opposite of eachother
            break
        default:
            console.error(`Unrecognized command: ${command}`)
    }
})
~~~