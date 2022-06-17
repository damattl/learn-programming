const calculatorStack = []

function isOperator(element) {
    return element === '+' || element === '-' || element === '*' || element === '/'
}

function addNumber(number) {
    if (calculatorStack.length == 0) {
        calculatorStack.push(number)
        updateView()
        return
    }
    let lastElement = calculatorStack[calculatorStack.length - 1]
    if (!isOperator(lastElement)) {
        calculatorStack[calculatorStack.length - 1] = `${lastElement}${number}`
    } else {
        calculatorStack.push(number)
    }
    updateView()
}

function addOperator(operator) {
    if (calculatorStack.length == 0) {
        return
    }
    let lastElement = calculatorStack[calculatorStack.length - 1]
    if (!isOperator(lastElement)) {
        calculatorStack.push(operator)
    } else {
        calculatorStack[calculatorStack.length - 1] = operator
    }
    updateView()
}

function addDecimalPlaces() {
    if (calculatorStack.length == 0) {
        calculatorStack.push('0.')
        updateView()
        return
    }
    let lastElement = calculatorStack[calculatorStack.length - 1]
    if (!isOperator(lastElement)) {
        calculatorStack[calculatorStack.length - 1] = `${lastElement}.`
    } else {
        calculatorStack.push('0.')
    }
    updateView()
}

function updateView(customStr) {
    let display = document.getElementsByClassName("calculator-result")[0]
    if (display == null) {
        return
    }
    display.innerHTML = customStr ? customStr : calculatorStack.join(' ')
}


function calculate() {
    if (calculatorStack.length == 0) {
        return
    }
    let lastElement = calculatorStack[calculatorStack.length - 1]
    if (isOperator(lastElement)) {
        calculatorStack.pop()
    }
    if (calculatorStack.length < 3) {
        updateView(`${calculatorStack[0]} = ${calculatorStack[0]}`)
        return 
    }

    let result = parseInt(calculatorStack[0])
   
    console.log(calculatorStack)
    for (var i = 1; i < calculatorStack.length; i++) {
        let element = calculatorStack[i]
        if (isOperator(element)) {
            let next = parseInt(calculatorStack[i + 1])
            if (next != null) {
                result = applyOperator(element, result, next)
                if (result == null) {
                    return
                }
            }
            
        }
    
    }
    
    updateView(`${calculatorStack.join(' ')} = ${result}`)
}


function applyOperator(operator, result, next) {
    switch(operator) {
        case '+':
            return result = result + next
        case '-':
            return result = result - next
        case '*':
            return result = result * next
        case '/':
            if (next == 0) {
                displayError("Can't divide through null")
                return null
            }
            return result = result / next
    }
}

function displayError(error) {
    let display = document.getElementsByClassName("calculator-result")[0]
    if (display == null) {
        return
    }
    display.innerHTML = error
}

function undo() {
    if (calculatorStack.length == 0) {
        return
    }
    let lastElement = calculatorStack[calculatorStack.length - 1]
    if (isOperator(lastElement)) {
        calculatorStack.pop()
        updateView()
    } else {
        if (typeof lastElement === 'string' || lastElement.length > 0) {
            calculatorStack[calculatorStack.length - 1] = lastElement.slice(0, -1)
        } else {
            calculatorStack.pop()
        }
        updateView()
    }
}

function reset() {
    calculatorStack.length = 0
    updateView()
}
