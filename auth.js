import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from './firebaseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('register-email')?.value;
      const password = document.getElementById('register-password')?.value;

      if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

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

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const password = document.getElementById('login-password')?.value;

      if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

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
});
