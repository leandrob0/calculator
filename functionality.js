function add(a,b) {
    let addition = a+b;
    return addition;
}

function substract(a,b) {
    let substraction = a-b;
    return substraction;
}

function multiply(a,b) {
    let multiplication = a*b;
    return multiplication;
}

function divide(a,b) {
    let division = a/b;
    return division;
}

function mod(a,b) {
    let rest = a%b;
    return rest;
}

function operate2(operator, num1, num2) {
    switch(operator){
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        case '%':
            return mod(num1, num2);
        default:
            return null;
    }
}

class Calculator {
    constructor(resultScreen) { //WHERE EVERYTHING WILL BE DISPLAYED
        this.resultScreen = resultScreen;
    }

    clearAll() {
        this.currentOperand = ''; 
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0 , -1); //SLICES THE STRING STARTING FROM THE BACK
    }

    appendNumber(number) {
        if(this.currentOperand == undefined)
        {
            this.currentOperand = '';
        }
        if(number === '.' && this.currentOperand.includes('.')) return; //MAKES SURE MORE THAN 1  DOT WONT BE USED
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') { //TO CALCULATE SEVERAL TIMES BEFORE PUSHING =
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        if(this.operation === '/' && current == 0) return;
        let result = operate2(this.operation, prev, current);
        if(result.toString().length > 16)
        {
            resultScreen.style.wordBreak = 'break-all';
            resultScreen.style.marginLeft = '20px';
            resultScreen.style.marginTop = '20px';
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    showInDisplay() {
        this.resultScreen.innerText = this.currentOperand;
    }

    
}

const buttonNumber = document.querySelectorAll(".number");
const buttonOperator = document.querySelectorAll(".operator");
const buttonClearAll = document.querySelector("#ac");
const buttonDelete = document.querySelector("#clear");
const buttonEquals = document.querySelector("#equal");
const resultScreen = document.querySelector("#results");

const calculator = new Calculator(resultScreen);

buttonNumber.forEach(number => number.addEventListener('click', () =>{
    calculator.appendNumber(number.innerText);
    if(resultScreen.innerText.toString().length > 16) return;
    calculator.showInDisplay();
}));

buttonOperator.forEach(number => number.addEventListener('click', () =>{
    calculator.chooseOperation(number.innerText);
    calculator.showInDisplay();
}));

buttonEquals.addEventListener('click' , button => {
    calculator.operate();
    calculator.showInDisplay();
});

buttonClearAll.addEventListener('click' , button => {
    calculator.clearAll();
    resultScreen.style.marginLeft = '0';
    resultScreen.style.marginTop = '40px';
    calculator.showInDisplay();
});

buttonDelete.addEventListener('click' , button => {
    calculator.delete();
    if(resultScreen.innerText.toString().length < 18) {
        resultScreen.style.marginLeft = '0';
        resultScreen.style.marginTop = '40px';
    }
    calculator.showInDisplay();
});