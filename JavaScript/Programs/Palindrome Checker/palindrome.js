const checkBtn = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
const resultSpan = document.getElementById('result');

checkBtn.addEventListener('click', () => {
  const inputText = textInput.value.trim();

  if (inputText === '') {
    alert('Please input a value');
    resultSpan.style.display = 'none';
    return;
  }

  // Clean the input text for palindrome checking
  const cleanText = inputText.toLowerCase().replace(/[^a-z0-9]/g, '');

  const reversedText = cleanText.split('').reverse().join('');

  if (cleanText === reversedText) {
    resultSpan.innerHTML = `<strong>${inputText}</strong> is a palindrome`;
  } else {
    resultSpan.innerHTML = `<strong>${inputText}</strong> is not a palindrome`;
  }

  resultSpan.style.display = 'block';
});
