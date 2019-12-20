const root = document.getElementById('root');

const displayForm = () => {
  const form = document.createElement('form');
  form.innerHTML = `
<fieldset>
  <legend>Signup</legend>
  <input name="email" type="text" placeholder="email">
  <input name="password" type="password" placeholder="password">
</fieldset>
<button>Signup</button>
`;

  form
    .addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(() => {
          window.location.reload();
        });
    });

  root.appendChild(form);
};

const displayUser = user => {
  const h1 = document.createElement('h1');
  h1.textContent = user.email;

  root.appendChild(h1);
};

fetch('/api/v1/auth/verify', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(user => {
    if(user._id) {
      displayUser(user);
    } else {
      displayForm();
    }
  });
