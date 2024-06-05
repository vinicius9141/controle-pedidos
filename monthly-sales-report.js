import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from "./firebaseConfig.js";
import { startOfMonth, endOfMonth, format } from "https://cdn.jsdelivr.net/npm/date-fns@2.21.1/esm/index.js";

document.getElementById('generate-report').addEventListener('click', async () => {
  const month = document.getElementById('report-month').value;
  if (!month) {
    alert('Por favor, selecione um mês.');
    return;
  }

  const [year, monthNum] = month.split('-').map(Number);
  const startDate = startOfMonth(new Date(year, monthNum - 1));
  const endDate = endOfMonth(new Date(year, monthNum - 1));

  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  console.log(`Generating report for ${formattedStartDate} to ${formattedEndDate}`);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      console.log(`User ID: ${userId}`);
      const q = query(
        collection(db, 'weekly_sales'),
        where('userId', '==', userId),
        where('week', '>=', formattedStartDate),
        where('week', '<=', formattedEndDate)
      );

      console.log(`Query: ${JSON.stringify(q)}`);

      try {
        const querySnapshot = await getDocs(q);

        console.log(`Query Snapshot: ${querySnapshot.size} documents`);

        let totalPieces = 0;
        let totalValue = 0;

        querySnapshot.forEach((doc) => {
          const report = doc.data();
          console.log(`Document Data: ${JSON.stringify(report)}`);
          totalPieces += report.piecesSold;
          totalValue += report.totalValue;
        });

        document.getElementById('total-pieces').textContent = `Total de Peças Vendidas no Mês: ${totalPieces}`;
        document.getElementById('total-value').textContent = `Valor Total Vendido no Mês: R$ ${totalValue.toFixed(2)}`;
      } catch (error) {
        console.error('Error fetching documents: ', error);
        alert('Erro ao gerar relatório. Verifique se o índice composto está configurado corretamente no Firestore.');
      }
    } else {
      window.location.href = 'login.html';
    }
  });
});
