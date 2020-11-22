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

const updateResult = () => {
    actualResult.innerText = actualOperation;
    if (selectedOperation) {
        previousOperation.innerText = previousOperation + selectedOperation;
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
