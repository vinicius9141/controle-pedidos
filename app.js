import { db, collection, addDoc, getDocs, deleteDoc, doc, query, where, auth, onAuthStateChanged } from "./firebaseConfig.js";

const orderForm = document.getElementById('order-form');
const orderList = document.getElementById('order-list');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;

    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const supplier = document.getElementById('supplier').value;
      const orderDate = document.getElementById('order-date').value;
      const product = document.getElementById('product').value;
      const quantity = parseInt(document.getElementById('quantity').value);
      const unitCost = parseFloat(document.getElementById('unit-cost').value);
      const salePrice = parseFloat(document.getElementById('sale-price').value);

      // Cálculos automáticos
      const totalCost = unitCost * quantity;
      const totalSalePrice = salePrice * quantity;
      const unitProfitMargin = salePrice - unitCost;
      const totalProfitMargin = unitProfitMargin * quantity;
      const unitProfitPercentage = ((unitProfitMargin / unitCost) * 100).toFixed(2);

      try {
        await addDoc(collection(db, 'orders'), {
          userId,
          supplier,
          orderDate,
          product,
          quantity,
          unitCost,
          salePrice,
          totalCost,
          totalSalePrice,
          unitProfitMargin,
          totalProfitMargin,
          unitProfitPercentage
        });
        alert('Pedido salvo com sucesso!');
        orderForm.reset();
        loadOrders(userId);
      } catch (error) {
        console.error("Erro ao adicionar pedido: ", error);
        alert('Erro ao salvar pedido.');
      }
    });

    async function loadOrders(userId) {
      orderList.innerHTML = '';
      const q = query(collection(db, 'orders'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const orderId = doc.id;
        const listItem = document.createElement('li');
        listItem.className = 'p-4 border border-gray-300 rounded-md';

        if (parseFloat(order.unitProfitPercentage) < 80) {
          listItem.classList.add('bg-yellow-100');
        }

        listItem.innerHTML = `
          <div class="flex justify-between">
            <span class="font-semibold">Fornecedor:</span> <span>${order.supplier}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Data do Pedido:</span> <span>${order.orderDate}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Produto:</span> <span>${order.product}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Quantidade:</span> <span>${order.quantity}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Preço por Unidade (Custo):</span> <span>${order.unitCost}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Preço de Venda por Unidade:</span> <span>${order.salePrice}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Preço Total (Custo):</span> <span>${order.totalCost}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Preço Total de Venda:</span> <span>${order.totalSalePrice}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Margem de Lucro por Unidade:</span> <span>${order.unitProfitMargin}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Margem de Lucro Total:</span> <span>${order.totalProfitMargin}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Porcentagem de Lucro por Unidade:</span> <span>${order.unitProfitPercentage}%</span>
          </div>
          <button 
            class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            onclick="deleteOrder('${orderId}')"
          >
            Apagar
          </button>
        `;
        orderList.appendChild(listItem);
      });
    }

    loadOrders(userId);
  } else {
    window.location.href = 'login.html';
  }
});

window.deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    const orderItem = document.querySelector(`[onclick="deleteOrder('${orderId}')"]`).parentElement;
    orderItem.remove();
  } catch (error) {
    console.error('Erro ao apagar pedido: ', error);
    alert('Erro ao apagar pedido.');
  }
};
