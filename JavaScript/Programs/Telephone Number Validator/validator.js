function checkPhoneNumber() {
  const userInput = document.getElementById('user-input').value.trim();
  const resultsDiv = document.getElementById('results-div');

  if (!userInput) {
    alert('Please provide a phone number');
    return;
  }

  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

  if (phoneRegex.test(userInput)) {
    resultsDiv.innerHTML += `<p class="valid-number">Valid US number: ${userInput}</p>`;
    document.getElementById('user-input').classList.remove('invalid');
    document.getElementById('user-input').classList.add('valid');
  } else {
    resultsDiv.innerHTML += `<p class="invalid-number">Invalid US number: ${userInput}</p>`;
    document.getElementById('user-input').classList.remove('valid');
    document.getElementById('user-input').classList.add('invalid');
  }

  document.getElementById('user-input').value = '';

  document.getElementById('user-input').classList.remove('valid', 'invalid');

  resultsDiv.scrollTop = resultsDiv.scrollHeight;
}

document.getElementById('check-btn').addEventListener('click', checkPhoneNumber);

document.getElementById('user-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    checkPhoneNumber(); 
  }
});

document.getElementById('clear-btn').addEventListener('click', function() {
  document.getElementById('results-div').innerHTML = '';
});

document.getElementById('user-input').addEventListener('input', function() {
  const userInput = this.value.trim();
  
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

  if (userInput === '') {
    this.classList.remove('valid', 'invalid'); 
  } else if (phoneRegex.test(userInput)) {
    this.classList.add('valid');
    this.classList.remove('invalid');
  } else {
    this.classList.add('invalid');
    this.classList.remove('valid');
  }
});
