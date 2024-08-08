const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertToRoman = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
  ];

  let result = '';
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};

const validateUserInput = () => {
  const numberInput = document.getElementById("number").value;

  output.classList.remove('valid-output', 'error-output');

  if (!numberInput || isNaN(numberInput) || numberInput.includes('e')) {
    output.textContent = "Please enter a valid number";
    output.classList.add('error-output');
  } else {
    const number = parseInt(numberInput);
    if (number < 1) {
      output.textContent = "Please enter a number greater than or equal to 1";
      output.classList.add('error-output');
    } else if (number >= 4000) {
      output.textContent = "Please enter a number less than or equal to 3999";
      output.classList.add('error-output');
    } else {
      output.textContent = convertToRoman(number);
      output.classList.add('valid-output');
    }
  }

  output.classList.remove('hidden');
};

convertBtn.addEventListener("click", validateUserInput);

document.getElementById("number").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    validateUserInput();
  }
});
