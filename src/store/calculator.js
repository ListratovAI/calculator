import { makeAutoObservable } from "mobx"

class Calculator {
    firstNumber = null
    secondNumber = null
    operator = null
    result = null

    constructor() {
        makeAutoObservable(this)
    }

    addFirstNumber = (i) => {
        if (i !== '.' || this.firstNumber && ! String(this.firstNumber).includes('.')) {
            this.firstNumber = this.firstNumber ? this.firstNumber + `${i}` : i
        }
    }

    addSecondNumber = (i) => {
        if (i !== '.' || this.secondNumber &&  ! String(this.secondNumber).includes('.')) {
            this.secondNumber = this.secondNumber ? this.secondNumber + `${i}` : i
        }
    }

    setOperator = (operator) => {
        if (this.firstNumber) {
            this.operator = operator
            return true
        }
        return false
    }

    getResult = () => {
        if (this.secondNumber) {
            if (this.operator === '+') {
                this.result = +this.firstNumber + +this.secondNumber
            }
            else if (this.operator === '-') {
                this.result = this.firstNumber - this.secondNumber
            }
            else if (this.operator === '*') {
                this.result = this.firstNumber * this.secondNumber
            }
            else if (this.operator === '/') {
                this.result = this.firstNumber / this.secondNumber
            }
            this.firstNumber = null
            this.secondNumber = null
            this.operator = null
        }
    }

    clearResult = () => {
        this.result = null
    }

    clearField = () => {
        this.firstNumber = null
        this.secondNumber = null
        this.operator = null
        this.result = null
    }

    switchNumber = (isSecond) => {
        if (!isSecond) {
            this.firstNumber = this.firstNumber*-1
        }
        else {
            this.secondNumber = this.secondNumber*-1
        }
    }

    deleteLast = (isSecond) => {
        if (!isSecond && this.firstNumber) {
            this.firstNumber = this.firstNumber.slice(0, -1)
        }
        else if (isSecond && this.secondNumber && !isNaN(this.secondNumber)) {
            this.secondNumber = String(this.secondNumber).slice(0, -1)
        }
    }
}

export default new Calculator()