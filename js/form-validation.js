const signUpForm = document.querySelector('.newsletter-form');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#fullname');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  return name.trim().length >= 2;
}

if (signUpForm && emailInput && nameInput) {
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const name = nameInput.value.trim();

    if (!isValidName(name)) {
      alert('Please enter your full name (at least 2 characters).');
      nameInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    alert(`Thank you, ${name}! You have successfully subscribed.`);
    signUpForm.reset();
  });
}
