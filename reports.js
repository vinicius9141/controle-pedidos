import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from "./firebaseConfig.js";
import { formatISO, getDaysInMonth } from "https://cdn.jsdelivr.net/npm/date-fns@2.21.1/esm/index.js";

document.getElementById('generate-report').addEventListener('click', async () => {
  const month = document.getElementById('report-month').value;
  if (!month) {
    alert('Por favor, selecione um mês.');
    return;
  }

  const [year, monthNum] = month.split('-').map(Number);
  const startDate = new Date(year, monthNum - 1, 1);
  const endDate = new Date(year, monthNum - 1, getDaysInMonth(startDate));

  console.log(`Generating report for ${startDate} to ${endDate}`);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        where('orderDate', '>=', formatISO(startDate, { representation: 'date' })),
        where('orderDate', '<=', formatISO(endDate, { representation: 'date' }))
      );

      console.log(`Query: ${q}`);

      try {
        const querySnapshot = await getDocs(q);

        console.log(`Query Snapshot: ${querySnapshot.size} documents`);

        let totalPieces = 0;
        let totalSpent = 0;
        let totalProfit = 0;
        let totalMoney = 0;

        querySnapshot.forEach((doc) => {
          const order = doc.data();
          totalPieces += order.quantity;
          totalSpent += order.totalCost;
          totalProfit += order.totalProfitMargin;
          console.log(`Order: ${JSON.stringify(order)}`);
        });

        document.getElementById('total-pieces').textContent = `Total de Peças Compradas: ${totalPieces}`;
        document.getElementById('total-spent').textContent = `Dinheiro Gasto: R$ ${totalSpent.toFixed(2)}`;
        document.getElementById('total-profit').textContent = `Lucro Pretendido: R$ ${totalProfit.toFixed(2)}`;
        document.getElementById('total-money').textContent = `Giro Total: R$ ${(totalSpent + totalProfit).toFixed(2)}`;
      } catch (error) {
        console.error('Error fetching documents: ', error);
        alert('Erro ao gerar relatório. Verifique se o índice composto está configurado corretamente no Firestore.');
      }
    } else {
      window.location.href = 'login.html';
    }
  });
});
