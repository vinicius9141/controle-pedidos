document.addEventListener('DOMContentLoaded', () => {
  fetch('menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu-container').innerHTML = data;

      const menuButton = document.getElementById('menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      const dropdownButton = document.getElementById('dropdown-button');
      const dropdownMenu = document.getElementById('dropdown-menu');
      const salesDropdownButton = document.getElementById('sales-dropdown-button');
      const salesDropdownMenu = document.getElementById('sales-dropdown-menu');

      if (menuButton) {
        menuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      }

      if (dropdownButton) {
        dropdownButton.addEventListener('click', () => {
          dropdownMenu.classList.toggle('hidden');
        });
      }

      if (salesDropdownButton) {
        salesDropdownButton.addEventListener('click', () => {
          salesDropdownMenu.classList.toggle('hidden');
        });
      }

      const mobileDropdownButton = document.getElementById('dropdown-button-mobile');
      const mobileDropdownMenu = document.getElementById('dropdown-menu-mobile');
      const mobileSalesDropdownButton = document.getElementById('sales-dropdown-button-mobile');
      const mobileSalesDropdownMenu = document.getElementById('sales-dropdown-menu-mobile');

      if (mobileDropdownButton) {
        mobileDropdownButton.addEventListener('click', () => {
          mobileDropdownMenu.classList.toggle('hidden');
        });
      }

      if (mobileSalesDropdownButton) {
        mobileSalesDropdownButton.addEventListener('click', () => {
          mobileSalesDropdownMenu.classList.toggle('hidden');
        });
      }

      const logoutButton = document.getElementById('logout-button');
      const logoutButtonMobile = document.getElementById('logout-button-mobile');

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

      if (logoutButtonMobile) {
        logoutButtonMobile.addEventListener('click', async () => {
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
});
