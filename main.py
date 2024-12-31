def Set_Volume():
    l = bytearray(7)
    l.set_uint8(0, 0x7E)
    l.set_uint8(1, 0x06)
    l.set_uint8(2, 0x00)
    l.set_uint8(3, 0x02)
    l.set_uint8(4, 0x00)
    l.set_uint8(5, Volume)
    l.set_uint8(6, 0xEF)
    serial.write_buffer(l)
def sendDistanceandSpeed():
    if connected:
        bluetooth.uart_write_string("$CSB" + "" + "," + ("" + str(speed)) + "#")

def on_bluetooth_connected():
    global Track_Num, connected, uartdata
    Track_Num = 9
    Set_Volume()
    Play_Track()
    basic.show_icon(IconNames.HAPPY)
    Set_Volume()
    sendDistanceandSpeed()
    basic.pause(500)
    connected = True
    while connected:
        uartdata = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        CarCtrl()
        doSpeed()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global Track_Num, connected
    basic.show_icon(IconNames.SAD)
    Set_Volume()
    Track_Num = 1
    Play_Track()
    connected = False
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def Play_Track():
    m = bytearray(7)
    m.set_uint8(0, 0x7E)
    m.set_uint8(1, 0x03)
    m.set_uint8(2, 0x00)
    m.set_uint8(3, 0x02)
    m.set_uint8(4, 0x00)
    m.set_uint8(5, Track_Num)
    m.set_uint8(6, 0xEF)
    serial.write_buffer(m)
def doSpeed():
    global speed
    if uartdata == "1":
        speed = 20
    elif uartdata == "2":
        speed = 50
    elif uartdata == "3":
        speed = 100
    elif uartdata == "4":
        speed = 120
    elif uartdata == "5":
        speed = 160
    elif uartdata == "6":
        speed = 180
    elif uartdata == "7":
        speed = 220
    elif uartdata == "8":
        speed = 255
    elif uartdata == "B1":
        speed = 160
    elif uartdata == "B2":
        speed = 180
    elif uartdata == "B3":
        speed = 200
    elif uartdata == "B4":
        speed = 255
def CarCtrl():
    if uartdata == "A":
        basic.show_string("F")
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, speed)
    elif uartdata == "B":
        basic.show_string("B")
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, speed)
    elif uartdata == "C":
        basic.show_string("L")
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        maqueen.motor_stop(maqueen.Motors.M1)
    elif uartdata == "D":
        basic.show_string("R")
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motor_stop(maqueen.Motors.M2)
    elif uartdata == "E":
        basic.show_string("l")
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, speed)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    elif uartdata == "F":
        basic.show_string("r")
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, speed)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed)
    elif uartdata == "0":
        basic.show_icon(IconNames.NO)
        maqueen.motor_stop(maqueen.Motors.ALL)
uartdata = ""
speed = 0
connected = False
Track_Num = 0
serial.redirect(SerialPin.P2, SerialPin.P1, BaudRate.BAUD_RATE9600)
Volume = 16
Track_Num = 0
bluetooth.set_transmit_power(7)
bluetooth.start_uart_service()
basic.show_icon(IconNames.SQUARE)
connected = False
speed = 100

def on_forever():
    basic.pause(200)
    sendDistanceandSpeed()
basic.forever(on_forever)
