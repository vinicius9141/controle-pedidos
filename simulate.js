document.getElementById('simulation-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const unitCost = parseFloat(document.getElementById('unit-cost').value);
  const desiredProfitMargin = parseFloat(document.getElementById('desired-profit-margin').value);

  if (isNaN(unitCost) || isNaN(desiredProfitMargin)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  // Calcular o preço de venda ideal
  const idealSalePrice = unitCost + (unitCost * (desiredProfitMargin / 100));

  document.getElementById('result').textContent = `O preço de venda ideal é: R$ ${idealSalePrice.toFixed(2)}`;
});
