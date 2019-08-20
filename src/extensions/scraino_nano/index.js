const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
// const cast = require('../../util/cast')
// const BLE = require('../../io/ble')
// const Base64Util = require('../../util/base64-util')

class Nano {
    constructor (runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._runtime.registerPeripheralExtension(extensionId, this);

        this._socket = null;

        this._timeoutID = null;
        this._busy = false;
        this._busyTimeoutID = null;

        this.disconnect = this.disconnect.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);

        this._availablePeripherals = [];
    }

    scan () {
        // this._socket = io('http://127.0.0.1:65529')
        // this._socket.emit('scan', { deviceId: deviceId, name: extensionName })
        console.log('scan');
        setTimeout(() => {
            this._availablePeripherals = [{name: 'COM3'}, {name: 'COM4'}];
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);
        }, 500);
    }

    connect (id) {
        // this._bt.connectPeripheral(id)
        console.log('connect');
        setTimeout(() => {
            this._connected = true;
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
        }, 1e3);
    }

    disconnect () {
        // this._bt.disconnect()
        // this._clearSensorsAndMotors()
        // window.clearInterval(this._pollingIntervalID)
        // this._pollingIntervalID = null
        console.log('disconnect');
        this._connected = false;
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED, {
            message: `Scraino lost connection to`,
            extensionId: this._extensionId
        });
    }

    isConnected () {
        // let connected = false
        // if (this._bt) {
        //     connected = this._bt.isConnected()
        // }
        // return connected
        console.log('isConnected');
        return this._connected;
    }

    send (command, message) {}

    _onConnect () {}

    _onMessage (base64) {}
}

class ScrainoNanoBlocks {
    static get EXTENSION_NAME () {
        return 'Nano';
    }

    static get EXTENSION_ID () {
        return 'nano';
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new Nano(this.runtime, ScrainoNanoBlocks.EXTENSION_ID);
    }

    getInfo () {
        return {
            id: ScrainoNanoBlocks.EXTENSION_ID,
            name: ScrainoNanoBlocks.EXTENSION_NAME,
            showStatusButton: true,
            colour: '#8ec43d',
            colourSecondary: '#78b331',
            colourTertiary: '#66a01e',
            blocks: [
                // 设置数字输出
                {
                    opcode: 'digitalWrite',
                    blockType: BlockType.COMMAND,
                    text: '设置 [PORT] 数字输出 [STAT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'DIGITAL_PORT',
                            defaultValue: '1'
                        },
                        STAT: {
                            type: ArgumentType.STRING,
                            menu: 'LEVEL_STAT',
                            defaultValue: '1'
                        }
                    }
                },
                // 读取数字量
                {
                    opcode: 'digitalRead',
                    blockType: BlockType.BOOLEAN,
                    text: '读取 [PORT] 数字量',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'DIGITAL_PORT',
                            defaultValue: '1'
                        }
                    }
                }
            ],
            menus: {
                DIGITAL_PORT: [
                    {value: '1', text: '接口1'},
                    {value: '10', text: '接口2'},
                    {value: '2', text: '接口3'},
                    {value: '12', text: '接口4'},
                    {value: '3', text: '接口5'},
                    {value: '8', text: '接口6'},
                    {value: '9', text: '接口7'},
                    {value: '13', text: '接口8'}
                ],
                LEVEL_STAT: [{value: '1', text: '高'}, {value: '0', text: '低'}]
            }
        };
    }

    digitalWrite (args) {
        return false;
    }

    digitalRead (args) {
        return false;
    }
}

module.exports = ScrainoNanoBlocks;
