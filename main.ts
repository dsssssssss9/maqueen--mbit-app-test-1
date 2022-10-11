function sendDistanceandSpeed () {
    if (connected) {
        bluetooth.uartWriteString("$CSB" + "" + "," + speed + "#")
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    sendDistanceandSpeed()
    basic.pause(500)
    connected = true
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        doSpeed()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
    connected = false
})
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
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
    } else if (uartdata == "B") {
        basic.showString("B")
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
    } else if (uartdata == "0") {
        basic.showIcon(IconNames.No)
        maqueen.motorStop(maqueen.Motors.All)
    }
}
let uartdata = ""
let speed = 0
let connected = false
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)
connected = false
speed = 100
basic.forever(function () {
    basic.pause(200)
    sendDistanceandSpeed()
})
