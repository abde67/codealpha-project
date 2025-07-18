let currentInput = '';
let expression = '';
let result = '';
let operator = '';
let justCalculated = false;

const display = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');

function updateDisplay() {
  display.textContent = result || '0';
  expressionDisplay.textContent = expression || '0';
}

function appendNumber(number) {
  if (justCalculated) {
    currentInput = number;
    expression = number;
    justCalculated = false;
  } else {
    currentInput += number;
    expression += number;
  }
  result = currentInput;
  updateDisplay();
}

function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += currentInput === '' ? '0.' : '.';
    expression += '.';
    result = currentInput;
    updateDisplay();
  }
}

function clearAll() {
  currentInput = '';
  expression = '';
  result = '';
  operator = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput) {
    currentInput = String(-parseFloat(currentInput));
    result = currentInput;
    expression = expression.replace(/[\d.]+$/, currentInput);
    updateDisplay();
  }
}

function percent() {
  if (currentInput) {
    currentInput = String(parseFloat(currentInput) / 100);
    result = currentInput;
    expression = expression.replace(/[\d.]+$/, currentInput);
    updateDisplay();
  }
}

function handleOperator(op) {
  if (currentInput === '' && expression !== '') {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += ` ${op} `;
  }

  try {
    result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/')).toString();
  } catch {
    result = 'Error';
  }

  operator = op;
  currentInput = '';
  justCalculated = false;
  updateDisplay();
}

function calculateResult() {
  try {
    const final = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
    result = final.toString();
    expression = result;
    currentInput = result;
    justCalculated = true;
    updateDisplay();
  } catch {
    result = 'Error';
    updateDisplay();
  }
}
