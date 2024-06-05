import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "./firebaseConfig.js";

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Registrado com sucesso!');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error("Erro ao registrar: ", error);
        alert('Erro ao registrar.');
      });
  });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error("Erro ao fazer login: ", error);
        alert('Erro ao fazer login.');
      });
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
