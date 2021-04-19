import React, { useEffect, useState } from 'react';
import './styles/numbers.css'
import calculator from './store/calculator'
import { observer } from 'mobx-react-lite';

const Display = observer(() => {

    return (
        <div className='display'>
            <div>
                {calculator.firstNumber}
            </div>
            <div>
                {calculator.operator}
            </div>
            <div>
                {calculator.secondNumber}
            </div>
            <div>
                {calculator.result}
            </div>
        </div>
    )
})

const Operators = (props) => {
    return (
        <div>
            <div className='operators'>
                <div className='numbers' onClick={() => props.toSecond('+')}>
                    +
                </div>
                <div className='numbers' onClick={() => props.toSecond('-')}>
                    -
                </div>
                <div className='numbers' onClick={() => props.toSecond('*')}>
                    *
                </div>
                <div className='numbers' onClick={() => props.toSecond('/')}>
                    /
                </div>
                            <div className='numbers minus' onClick={() => props.toSwitchNumber()}>+/-</div>
            <div className='numbers minus' onClick={() => props.toDeleteLast()}>del</div>
            <div className='numbers equal' onClick={() => props.toGetResult()}>=</div>
            </div>

        </div>
    )
}

const Menu = observer(() => {

    const [isSecond, setIsSecond] = useState(false)

    const numbers = [];

    const addNumbers = (number) => {
        if (calculator.result) {
            calculator.clearResult()
        }
        isSecond ? calculator.addSecondNumber(number) : calculator.addFirstNumber(number)
    }

    const clickOperator = (operator) => {
        setIsSecond(calculator.setOperator(operator))
    }

    const getResult = () => {
        calculator.getResult();
        if (calculator.secondNumber) {
            setIsSecond(false);
        }
    }

    for (let i = 1; i <= 9; i++) {
        numbers.push (
            <div className='numbers' onClick={() => addNumbers(i)} key={i}>{i}</div>
        )
    }

    const keyboardEnter = (e) => {

        const keys = ['+', '-', '*', '/'];
        if (!isNaN(+e.key) || e.key === '.') {
            addNumbers(e.key)
        }
        else if (keys.includes(e.key)) {
            clickOperator(e.key)
        }
        else if (e.key === 'Enter') {
            getResult(e.key)
        }
    }

    const clearField = () => {
        calculator.clearField();
        setIsSecond(false)
    }

    const switchNumber = () => {
        calculator.switchNumber(isSecond);
    }

    const deleteLast = () => {
        calculator.deleteLast(isSecond)
    }

    useEffect(() => {
        document.addEventListener('keydown', keyboardEnter, false);
        return () => {
            document.removeEventListener("keydown", keyboardEnter, false);
    }})

    return(
        <>
            <Display/>
            <div className='containerButtons'>

                <div>
                    <div className='numbersContainers'>
                        {numbers}
                    </div>
                    <div className='downBottons'>                    
                        <div className='numbers num0' 
                        onClick={() => addNumbers(0)}
                        >
                        0
                        </div>
                        <div className='numbers result' onClick={() => {addNumbers('.')}}>.</div>
                        <div className='numbers result' onClick={() => {clearField()}}>C</div>
                    </div>
                </div>
                <Operators 
                    toSecond={(operator)=>clickOperator(operator)}
                    toResult={()=>getResult()}
                    toSwitchNumber={()=>switchNumber()}
                    toGetResult={()=>getResult()}
                    toDeleteLast={()=>deleteLast()}
                />

            </div>
        </>
    )
})

export default Menu;