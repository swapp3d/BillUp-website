// Newsletter form: format-based validation with inline red highlighting.
// On success the visitor is sent to subscribed.html.
(function () {
  'use strict';

  const form = document.getElementById('newsletterForm');
  if (!form) {
    return;
  }

  const SUCCESS_PAGE = 'subscribed.html';

  // Latin (incl. Lithuanian/European letters) and Cyrillic letters, with apostrophes, dots and hyphens inside a word
  const WORD = "[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u017F\\u0400-\\u04FF][A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u017F\\u0400-\\u04FF'\\u2019.-]*";
  const NAME_PATTERN = new RegExp('^' + WORD + '( ' + WORD + ')+$');
  const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

  // one rule per field id: how to clean the value, how to check it and what to say when it is wrong
  const rules = {
    fullname: {
      clean: (value) => value.trim().replace(/\s+/g, ' '),
      isValid: (value) => value.length >= 3 && value.length <= 60 && NAME_PATTERN.test(value),
      message: 'Enter your first and last name using letters only.'
    },
    email: {
      clean: (value) => value.trim(),
      isValid: (value) => value.length <= 100 && !/\.\./.test(value) && EMAIL_PATTERN.test(value),
      message: 'Enter a valid email address, e.g. name@example.com.'
    }
  };

  const fields = Object.keys(rules).map((id) => document.getElementById(id)).filter(Boolean);

  function showState(input, valid) {
    const error = document.getElementById(input.id + '-error');
    input.classList.toggle('is-invalid', !valid);
    input.classList.toggle('is-valid', valid);
    input.setAttribute('aria-invalid', String(!valid));
    if (error) {
      error.textContent = valid ? '' : rules[input.id].message;
    }
  }

  function validateField(input) {
    const rule = rules[input.id];
    const valid = rule.isValid(rule.clean(input.value));
    showState(input, valid);
    return valid;
  }

  fields.forEach((input) => {
    // validate when the user leaves the field, then keep checking while typing
    input.addEventListener('blur', () => {
      input.dataset.touched = 'true';
      validateField(input);
    });
    input.addEventListener('input', () => {
      if (input.dataset.touched === 'true') {
        validateField(input);
      }
    });
  });

  function shake(input) {
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('shake');
      setTimeout(() => group.classList.remove('shake'), 450);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    fields.forEach((input) => {
      input.dataset.touched = 'true';
      if (!validateField(input)) {
        shake(input);
        firstInvalid = firstInvalid || input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const name = rules.fullname.clean(form.elements.fullname.value);
    const email = rules.email.clean(form.elements.email.value);
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = 'Signing you up…';

    // short pause so the visitor sees that the form was accepted, then open the success page
    setTimeout(() => {
      window.location.href = SUCCESS_PAGE + '?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email);
    }, 600);
  });
})();
