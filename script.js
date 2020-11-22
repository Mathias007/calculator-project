const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const cleanButton = document.querySelector(".clean");
const signChangeButton = document.querySelector(".sign");
const equalButton = document.querySelector(".equal");

const previousResult = document.querySelector(".previous");
const actualResult = document.querySelector(".actual");

let actualOperation = "";
let previousOperation = "";
let selectedOperation = undefined;

const calculate = () => {
    let calculation;
    if (!previousOperation || !actualOperation) return;
    const previous = parseFloat(previousOperation);
    const actual = parseFloat(actualOperation);

    if (isNaN(previous) || isNaN(actual)) return;

    switch (selectedOperation) {
        case "+":
            calculation = previous + actual;
            break;
        case "-":
            calculation = previous - actual;
            break;
        case "×":
            calculation = previous * actual;
            break;
        case "/":
            actual === 0
                ? (calculation = "Herezja!")
                : (calculation = previous / actual);
            break;
        case "%":
            if (!actual) {
                calculation = previous / 100;
            } else {
                calculation = (previous / 100) * actual;
            }
            break;
        default:
            return;
    }

    actualOperation = calculation;
    selectedOperation = undefined;
    previousOperation = "";
};

const toggleSign = () => {
    if (!actualOperation) return;

    let actual = parseFloat(actualOperation);
    if (isNaN(actual)) return;
    actual = -actual;

    actualOperation = actual.toString();
};

const chooseOperation = (operator) => {
    if (actualOperation === "") return;
    if (previousOperation) {
        const previous = previousResult.innerText;
        if (
            actualOperation.toString() === "0" &&
            previous[previous.length - 1] === "/"
        ) {
            actualOperation = "Nieprawidłowa operacja";
            return;
        }
    }
    selectedOperation = operator;
    previousOperation = actualOperation;
    actualOperation = "";
};

const updateResult = () => {
    actualResult.innerText = actualOperation;
    if (selectedOperation) {
        previousResult.innerText = previousOperation + selectedOperation;
    } else {
        previousResult.innerText = "";
    }
};

const addNumber = (number) => {
    actualOperation = actualOperation.toString() + number.toString();
};

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
    });
});

const cleanResult = () => {
    actualOperation = "";
    previousOperation = "";
    selectedOperation = undefined;
};

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperation(operator.innerText);
        updateResult();
    });
});

equalButton.addEventListener("click", () => {
    calculate();
    updateResult();
});

cleanButton.addEventListener("click", () => {
    cleanResult();
    updateResult();
});

signChangeButton.addEventListener("click", () => {
    toggleSign();
    updateResult();
});
