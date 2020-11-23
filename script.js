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

    if (isNaN(previous) || isNaN(actual)) actualOperation = "Błąd!";

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
                ? (calculation = "Błąd!")
                : (calculation = previous / actual);
            break;
        case "%":
            calculation = (previous / 100) * actual;
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
        )
            return;
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
    if (number === ",") {
        actualOperation = actualOperation.toString() + ".";
    } else {
        actualOperation = actualOperation.toString() + number.toString();
    }
};

const cleanResult = () => {
    actualOperation = "";
    previousOperation = "";
    selectedOperation = undefined;
};

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
    });
});

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
