import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "./firebaseConfig.js";

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuário registrado com sucesso!');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Erro ao registrar usuário: ', error);
      alert('Erro ao registrar usuário.');
    }
  });
}
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Erro ao fazer login: ', error);
      alert('Erro ao fazer login.');
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert('Usuário deslogado com sucesso!');
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Erro ao fazer logout: ', error);
      alert('Erro ao fazer logout.');
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário está logado
  } else {
    // Usuário não está logado, redirecionar para login
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
      window.location.href = 'login.html';
    }
  }
});
