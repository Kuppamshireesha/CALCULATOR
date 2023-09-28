console.log("Simple Calculator");

let screen = document.getElementById("result");
let screenValue = "";
let isSign = true;

function isNumber(char) {
    return /^\d$/.test(char);
}

function appendCharacter(value) {
    if (value === "=") {
        calculateResult();
    } else if (value === "C") {
        clearAll();
    } else if (value === "CE") {
        clearEntry();
    } else {
        updateDisplay(value);
    }
}

function updateDisplay(value) {
    screenValue += value;
    screen.value = screenValue;
    isSign = true;
}

function calculateResult() {
    try {
        screenValue = eval(screenValue);
        screen.value = screenValue;
        if (isNaN(screenValue) || !isFinite(screenValue)) {
            throw new Error("Invalid input");
        }
    } catch (error) {
        screenValue = "Error";
        screen.value = screenValue;
    }
}

function clearAll() {
    screenValue = "";
    screen.value = "";
    isSign = true;
}

function clearEntry() {
    screenValue = screenValue.slice(0, -1);
    screen.value = screenValue;
    isSign = true;
}

const buttons = document.querySelectorAll('.calculator button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        appendCharacter(buttonText);
    });
});

document.addEventListener('keydown', function (event) {
    handleKeyPress(event.key);
});

function handleKeyPress(key) {
    if (key === 'Enter') {
        appendCharacter('=');
    } else if (key === 'Delete' || key === 'Backspace') {
        appendCharacter('CE');
    } else if (/[0-9]/.test(key) || /[\+\-\*\/%]/.test(key)) {
        appendCharacter(key);
    }
}
