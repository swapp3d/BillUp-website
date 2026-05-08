const signUpBtn = document.querySelector('.newsletter-form .btn-full');
const emailInput = document.querySelector('.newsletter-form input[type="email"]');
const nameInput  = document.querySelector('.newsletter-form input[type="text"]');

function isValidEmail(email) {
  return email.includes('@') && email.includes('.com');
}

function isValidName(name) {
  return name.trim().length >= 2;
}

signUpBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const name  = nameInput.value.trim();

  if (!isValidName(name)) {
    alert('Please enter your full name (at least 2 characters).');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert(`Thank you, ${name}! You have successfully subscribed.`);

  //clear fields after success
  emailInput.value = '';
  nameInput.value  = '';
});