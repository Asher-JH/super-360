const form = document.querySelector('#contact-form');
const name = document.querySelector('#nameInput');
const email = document.querySelector('#emailInput');
const message = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  fetch('/new-contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      response.json();
      // eslint-disable-next-line no-alert
      alert('Message sent!');
      document.querySelector('#nameInput').value = '';
      document.querySelector('#emailInput').value = '';
      document.querySelector('#messageInput').value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
