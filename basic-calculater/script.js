
  let operation = "";
  let resultDisplayed = false;

  const operationDisplay = document.getElementById('operation');
  const resultDisplay = document.getElementById('result');
function updateDisplay() {
  if (!resultDisplayed) {
    resultDisplay.classList.remove('result-large');
    operationDisplay.style.color = '#eee';
    operationDisplay.style.fontWeight = 'bold';
    resultDisplay.style.color = '#888';
    resultDisplay.style.fontWeight = 'normal';

    const operationSpan = operationDisplay;
    operationSpan.textContent = operation || "0";

    setTimeout(() => {
      const diff = operationSpan.scrollWidth - operationSpan.clientWidth;
      operationSpan.style.transform = diff > 0 ? `translateX(-${diff}px)` : `translateX(0)`;
    }, 0);

    try {
      if (operation && !isNaN(operation.slice(-1))) {
        let res = eval(operation);
        let resStr = String(res);
        if (resStr.length > 12) {
          resultDisplay.textContent = Number(res).toExponential(6);
          resultDisplay.title = resStr; // Tooltip
        } else {
          resultDisplay.textContent = resStr;
          resultDisplay.title = "";
        }

        setTimeout(() => {
          resultDisplay.classList.toggle("auto-shrink", resultDisplay.scrollWidth > resultDisplay.clientWidth);
        }, 0);
      } else {
        resultDisplay.textContent = "";
        resultDisplay.title = "";
      }
    } catch {
      resultDisplay.textContent = "";
      resultDisplay.title = "";
    }
  } else {
    operationDisplay.textContent = "";
    resultDisplay.classList.add('result-large');
    try {
      const answer = eval(operation);
      const answerStr = String(answer);
      if (answerStr.length > 12) {
        resultDisplay.textContent = Number(answer).toExponential(6);
        resultDisplay.title = answerStr;
      } else {
        resultDisplay.textContent = answerStr;
        resultDisplay.title = "";
      }

      setTimeout(() => {
        resultDisplay.classList.toggle("auto-shrink", resultDisplay.scrollWidth > resultDisplay.clientWidth);
      }, 0);
    } catch {
      resultDisplay.textContent = "Error";
      resultDisplay.title = "";
    }
  }
}


function calculate() {
  try {
    const result = eval(operation);
    operation = String(result);
    resultDisplayed = true;
    updateDisplay();
  } catch (e) {
    resultDisplay.textContent = "Error";
    resultDisplay.title = "";
  }
}


  function appendNumber(num) {
    if (resultDisplayed) {
      operation = "";
      resultDisplayed = false;
    }
    operation += num;
    updateDisplay();
  }

  function appendOperator(op) {
    if (operation === "") return;
    if ("+-*/".includes(operation.slice(-1))) {
      operation = operation.slice(0, -1);
    }
    operation += op;
    resultDisplayed = false;
    updateDisplay();
  }

  function appendDot() {
    if (resultDisplayed) {
      operation = "0.";
      resultDisplayed = false;
    } else {
      let parts = operation.split(/[\+\-\*\/]/);
      if (!parts[parts.length - 1].includes('.')) {
        operation += ".";
      }
    }
    updateDisplay();
  }

  function clearDisplay() {
    operation = "";
    resultDisplayed = false;
    updateDisplay();
  }

  function toggleSign() {
    if (operation !== "") {
      try {
        const value = eval(operation);
        operation = String(value * -1);
        updateDisplay();
      } catch (e) {}
    }
  }

  function percent() {
    if (operation !== "") {
      try {
        const value = eval(operation);
        operation = String(value / 100);
        updateDisplay();
      } catch (e) {}
    }
  }

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      e.preventDefault();
      appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      e.preventDefault();
      appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculate();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      operation = operation.slice(0, -1);
      updateDisplay();
    } else if (e.key.toLowerCase() === 'c') {
      e.preventDefault();
      clearDisplay();
    }
  });