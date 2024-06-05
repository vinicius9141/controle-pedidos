import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from "./firebaseConfig.js";

const totalSalesChartCtx = document.getElementById('totalSalesChart').getContext('2d');
const profitMarginChartCtx = document.getElementById('profitMarginChart').getContext('2d');
const ordersBySupplierChartCtx = document.getElementById('ordersBySupplierChart').getContext('2d');
const expenditureVsProfitChartCtx = document.getElementById('expenditureVsProfitChart').getContext('2d');
const weeklySalesChartCtx = document.getElementById('weeklySalesChart').getContext('2d');

async function getWeeklySalesData(userId) {
  const q = query(
    collection(db, 'weekly_sales'),
    where('userId', '==', userId)
  );

  try {
    const querySnapshot = await getDocs(q);
    let salesData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      salesData.push(data);
    });

    return salesData;
  } catch (error) {
    console.error('Error fetching weekly sales data: ', error);
    return [];
  }
}

function createWeeklySalesChart(salesData) {
  const labels = salesData.map(data => data.week);
  const piecesSold = salesData.map(data => data.piecesSold);
  const totalValue = salesData.map(data => data.totalValue);

  new Chart(weeklySalesChartCtx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Peças Vendidas',
          data: piecesSold,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Valor Total Vendido (R$)',
          data: totalValue,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data());
    });

    const suppliers = {};
    const totalSalesData = {
      labels: [],
      data: []
    };
    const profitMarginData = {
      labels: [],
      data: []
    };
    const expenditureVsProfitData = {
      labels: [],
      expenditure: [],
      profit: []
    };

    orders.forEach(order => {
      totalSalesData.labels.push(order.product);
      totalSalesData.data.push(order.totalSalePrice);

      profitMarginData.labels.push(order.product);
      profitMarginData.data.push(order.totalProfitMargin);

      expenditureVsProfitData.labels.push(order.product);
      expenditureVsProfitData.expenditure.push(order.totalCost);
      expenditureVsProfitData.profit.push(order.totalProfitMargin);

      if (suppliers[order.supplier]) {
        suppliers[order.supplier] += 1;
      } else {
        suppliers[order.supplier] = 1;
      }
    });

    const ordersBySupplierData = {
      labels: Object.keys(suppliers),
      data: Object.values(suppliers)
    };

    new Chart(totalSalesChartCtx, {
      type: 'bar',
      data: {
        labels: totalSalesData.labels,
        datasets: [{
          label: 'Total de Vendas por Produto',
          data: totalSalesData.data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(profitMarginChartCtx, {
      type: 'line',
      data: {
        labels: profitMarginData.labels,
        datasets: [{
          label: 'Margem de Lucro por Produto',
          data: profitMarginData.data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(ordersBySupplierChartCtx, {
      type: 'pie',
      data: {
        labels: ordersBySupplierData.labels,
        datasets: [{
          label: 'Pedidos por Fornecedor',
          data: ordersBySupplierData.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });

    new Chart(expenditureVsProfitChartCtx, {
      type: 'bar',
      data: {
        labels: expenditureVsProfitData.labels,
        datasets: [
          {
            label: 'Dinheiro Gasto',
            data: expenditureVsProfitData.expenditure,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Lucro Pretendido',
            data: expenditureVsProfitData.profit,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Adicionando o gráfico de vendas semanais
    const weeklySalesData = await getWeeklySalesData(userId);
    createWeeklySalesChart(weeklySalesData);

  } else {
    window.location.href = 'login.html';
  }
});
