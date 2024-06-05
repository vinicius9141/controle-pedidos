import { db, collection, addDoc, auth, onAuthStateChanged } from "./firebaseConfig.js";
import { startOfISOWeek, format, parseISO } from "https://cdn.jsdelivr.net/npm/date-fns@2.21.1/esm/index.js";

document.getElementById('weekly-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const week = document.getElementById('week').value;
  const piecesSold = parseInt(document.getElementById('pieces-sold').value);
  const totalValue = parseFloat(document.getElementById('total-value').value);

  if (!week || isNaN(piecesSold) || isNaN(totalValue)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  try {
    const startDate = startOfISOWeek(parseISO(week + '-1'));
    const formattedWeek = format(startDate, 'yyyy-MM-dd');

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        try {
          await addDoc(collection(db, 'weekly_sales'), {
            userId,
            week: formattedWeek,
            piecesSold,
            totalValue
          });
          alert('Dados salvos com sucesso!');
          document.getElementById('weekly-form').reset();
        } catch (error) {
          console.error('Erro ao salvar dados semanais: ', error);
          alert('Erro ao salvar dados semanais.');
        }
      } else {
        window.location.href = 'login.html';
      }
    });
  } catch (error) {
    console.error('Erro ao processar a data: ', error);
    alert('Erro ao processar a data.');
  }
});
