document.addEventListener("DOMContentLoaded", function() {
    const inputFieldsContainer = document.getElementById('input-fields');

    for (let i = 0; i < 8; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input${i}`;
        input.placeholder = 'e.g., 4-7';
        input.addEventListener('input', function(event) {
            calculate();
            if (event.target.value.match(/-?\d+\s*[-+]\s*-?\d+/)) {
                const nextInput = document.getElementById(`input${i + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
        rowDiv.appendChild(input);

        const resultSpan = document.createElement('span');
        resultSpan.id = `result${i}`;
        resultSpan.textContent = 'Result: 0';
        rowDiv.appendChild(resultSpan);

        inputFieldsContainer.appendChild(rowDiv);

        if (i === 3) {
            const divider = document.createElement('div');
            divider.classList.add('divider');
            inputFieldsContainer.appendChild(divider);
        }
    }
});

function calculate() {
    for (let i = 0; i < 8; i++) {
        const input = document.getElementById(`input${i}`).value.trim(); // Trim to remove leading/trailing spaces
        const resultSpan = document.getElementById(`result${i}`);

        if (input) {
            console.log(`Input for row ${i}:`, input);
            
            const parsed = input.match(/(-?\d+)\s*([-+])\s*(-?\d+)/);
            console.log(`Parsed values for row ${i}:`, parsed);
            
            if (parsed) {
                const num1 = parseInt(parsed[1]);
                const operator = parsed[2];
                const num2 = parseInt(parsed[3]);

                console.log(`Parsed numbers for row ${i}:`, num1, operator, num2);

                let result;
                if (operator === '+') {
                    result = num1 + num2;
                } else if (operator === '-') {
                    result = num1 - num2;
                }

                // Get last digit of result
                const lastDigit = Math.abs(result) % 10;

                console.log(`Result for row ${i}:`, lastDigit);
                resultSpan.textContent = `Result: ${lastDigit}`;
            } else {
                resultSpan.textContent = 'Invalid input';
            }
        } else {
            resultSpan.textContent = 'Result: 0';
        }
    }
}

function resetFields() {
    for (let i = 0; i < 8; i++) {
        document.getElementById(`input${i}`).value = '';
        document.getElementById(`result${i}`).textContent = 'Result: 0';
    }
}
