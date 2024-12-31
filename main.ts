/**
 * f / b
 * 
 * 1 & red
 */
function Set_Volume () {
    let l = control.createBuffer(7)
l.setUint8(0, 0x7E)
l.setUint8(1, 0x06)
l.setUint8(2, 0x00)
l.setUint8(3, 0x02)
l.setUint8(4, 0x00)
l.setUint8(5, Volume)
l.setUint8(6, 0xEF)
serial.writeBuffer(l)
}
function sendDistanceandSpeed () {
    if (connected) {
        bluetooth.uartWriteString("$CSB" + "" + "," + ("" + speed) + "#")
    }
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
    Track_Num = 1
    Play_Track()
    connected = false
})
bluetooth.onBluetoothConnected(function () {
    Track_Num = 9
    Play_Track()
    basic.showIcon(IconNames.Happy)
    basic.pause(500)
    connected = true
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        doSpeed()
    }
})
function Play_Track () {
    let m = control.createBuffer(7)
m.setUint8(0, 0x7E)
m.setUint8(1, 0x03)
m.setUint8(2, 0x00)
m.setUint8(3, 0x02)
m.setUint8(4, 0x00)
m.setUint8(5, Track_Num)
m.setUint8(6, 0xEF)
serial.writeBuffer(m)
}
function doSpeed () {
    if (uartdata == "1") {
        speed = 20
    } else if (uartdata == "2") {
        speed = 50
    } else if (uartdata == "3") {
        speed = 100
    } else if (uartdata == "4") {
        speed = 120
    } else if (uartdata == "5") {
        speed = 160
    } else if (uartdata == "6") {
        speed = 180
    } else if (uartdata == "7") {
        speed = 220
    } else if (uartdata == "8") {
        speed = 255
    } else if (uartdata == "B1") {
        speed = 160
    } else if (uartdata == "B2") {
        speed = 180
    } else if (uartdata == "B3") {
        speed = 200
    } else if (uartdata == "B4") {
        speed = 255
    }
}
function CarCtrl () {
    if (uartdata == "A") {
        basic.showString("F")
        Track_Num = 10
        Play_Track()
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
    } else if (uartdata == "B") {
        basic.showString("B")
        Track_Num = 8
        Play_Track()
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
    } else if (uartdata == "C") {
        basic.showString("L")
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        maqueen.motorStop(maqueen.Motors.M1)
    } else if (uartdata == "D") {
        basic.showString("R")
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorStop(maqueen.Motors.M2)
    } else if (uartdata == "E") {
        basic.showString("l")
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    } else if (uartdata == "F") {
        basic.showString("r")
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, speed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
    } else if (uartdata == "1") {
        Track_Num = 1
        Play_Track()
    } else if (uartdata == "G") {
        Track_Num = 6
        Play_Track()
    } else if (uartdata == "0") {
        basic.showIcon(IconNames.No)
        maqueen.motorStop(maqueen.Motors.All)
    }
}
let uartdata = ""
let speed = 0
let connected = false
let Track_Num = 0
serial.redirect(
SerialPin.P2,
SerialPin.P1,
BaudRate.BaudRate9600
)
let Volume = 16
Track_Num = 0
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
connected = false
speed = 100
basic.forever(function () {
    basic.pause(200)
    sendDistanceandSpeed()
})
