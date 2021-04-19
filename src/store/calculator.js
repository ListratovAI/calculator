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
        this.firstNumber = this.firstNumber ? this.firstNumber + `${i}` : i
    }

    addSecondNumber = (i) => {
        this.secondNumber = this.secondNumber ? this.secondNumber + `${i}` : i
    }

    setOperator = (operator) => {
        this.operator = operator
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

}

export default new Calculator()