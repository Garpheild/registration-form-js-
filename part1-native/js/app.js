const VALID_LOGIN = 'admin@mail.ru';
const VALID_PASSWORD = 'secret123';

const form = document.getElementById('loginForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const rememberMe = document.getElementById('rememberMe');
const submitBtn = document.getElementById('submitBtn');
const loginError = document.getElementById('login-error');
const passwordError = document.getElementById('password-error');
const successDiv = document.getElementById('success');
const displayLogin = document.getElementById('displayLogin');
const logoutBtn = document.getElementById('logoutBtn');


function validateLogin(val) {
  if (!val.trim()) return 'Введите логин';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[\d\s\-()]{7,15}$/;
  if (!emailRe.test(val) && !phoneRe.test(val)) return 'Введите email или телефон';
  return '';
}


function validatePassword(val) {
  if (!val) return 'Введите пароль';
  if (val.length < 6) return 'Минимум 6 символов';
  return '';
}


const showError = (msg, el, input) => {
  el.textContent = msg;
  input.classList.add('error');
  input.classList.remove('success');
};


const clearError = (el, input) => {
  el.textContent = '';
  input.classList.remove('error');
  input.classList.remove('success');
};


function restoreSession() {
  const saved = localStorage.getItem('savedLogin');
  if (saved) {
    loginInput.value = saved;
    rememberMe.checked = true;
  }
}


function showSuccess(login) {
  form.hidden = true;
  document.querySelector('.socials').hidden = true;
  document.querySelector('.divider').hidden = true;
  document.querySelector('h2').hidden = true;
  displayLogin.textContent = login;
  successDiv.hidden = false;
}


function logout() {
  successDiv.hidden = true;
  form.hidden = false;
  document.querySelector('.socials').hidden = false;
  document.querySelector('.divider').hidden = false;
  document.querySelector('h2').hidden = false;
  loginInput.value = '';
  passwordInput.value = '';
  clearError(loginError, loginInput);
  clearError(passwordError, passwordInput);
  localStorage.removeItem('savedLogin');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const login = loginInput.value.trim();
  const password = passwordInput.value;

  const loginMsg = validateLogin(login);
  const passMsg = validatePassword(password);

  let ok = true;

  if (loginMsg) {
    showError(loginMsg, loginError, loginInput);
    ok = false;
  } else {
    clearError(loginError, loginInput);
    loginInput.classList.add('success');
  }

  if (passMsg) {
    showError(passMsg, passwordError, passwordInput);
    ok = false;
  } else {
    clearError(passwordError, passwordInput);
    passwordInput.classList.add('success');
  }

  if (!ok) return;

  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Войти';

    if (login === VALID_LOGIN && password === VALID_PASSWORD) {
      if (rememberMe.checked) {
        localStorage.setItem('savedLogin', login);
      } else {
        localStorage.removeItem('savedLogin');
      }
      showSuccess(login);
    } else {
      showError('Неверный логин или пароль', loginError, loginInput);
      showError('Неверный логин или пароль', passwordError, passwordInput);
    }
  }, 1000);
});

loginInput.addEventListener('input', () => {
  const msg = validateLogin(loginInput.value);
  if (msg) {
    showError(msg, loginError, loginInput);
  } else {
    clearError(loginError, loginInput);
    loginInput.classList.add('success');
  }
});

passwordInput.addEventListener('input', () => {
  const msg = validatePassword(passwordInput.value);
  if (msg) {
    showError(msg, passwordError, passwordInput);
  } else {
    clearError(passwordError, passwordInput);
    passwordInput.classList.add('success');
  }
});

logoutBtn.addEventListener('click', logout);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => alert('Пока недоступно'));
});

restoreSession();
