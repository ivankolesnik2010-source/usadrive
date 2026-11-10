document.addEventListener('DOMContentLoaded', () => {
  const priceInput = document.getElementById('price');
  const engineSelect = document.getElementById('engine');
  const volumeInput = document.getElementById('volume');
  const yearInput = document.getElementById('year');
  const volGroup = document.getElementById('vol-group');

  const resAuction = document.getElementById('res-auction');
  const resShipping = document.getElementById('res-shipping');
  const resCustoms = document.getElementById('res-customs');
  const resFee = document.getElementById('res-fee');
  const totalPriceEl = document.getElementById('total-price');

  // Приховати об'єм для електрокарів
  engineSelect.addEventListener('change', () => {
    if (engineSelect.value === 'electric') {
      volGroup.style.display = 'none';
    } else {
      volGroup.style.display = 'flex';
    }
    calculate();
  });

  // Функція розрахунку
  function calculate() {
    const price = parseFloat(priceInput.value) || 0;
    const engine = engineSelect.value;
    const volume = parseFloat(volumeInput.value) || 0;
    const year = parseInt(yearInput.value) || 2020;
    const currentYear = 2026;
    const age = Math.max(1, currentYear - year);

    // 1. Аукціонний збір
    let auctionFee = 400 + price * 0.05;
    if (auctionFee > 900) auctionFee = 900;

    // 2. Доставка
    const shipping = 1400;

    // 3. Розмитнення
    let customs = 0;
    if (engine === 'electric') {
      customs = 150; // Пільгове розмитнення електрокарів
    } else {
      const baseRate = engine === 'petrol' ? 50 : 75;
      const excise = (baseRate * (volume / 1000) * age) * 1.08; // з урахуванням акцизу
      const duty = price * 0.10;
      const vat = (price + duty + excise) * 0.20;
      customs = duty + excise + vat;
    }

    // 4. Послуги компанії
    const companyFee = 750;

    const total = price + auctionFee + shipping + customs + companyFee;

    // Оновлення текстових полів
    resAuction.textContent = `$${Math.round(auctionFee)}`;
    resShipping.textContent = `$${Math.round(shipping)}`;
    resCustoms.textContent = `$${Math.round(customs)}`;
    resFee.textContent = `$${Math.round(companyFee)}`;
    totalPriceEl.textContent = `$${Math.round(total)}`;
  }

  // Слухаємо зміни у всіх полях
  [priceInput, engineSelect, volumeInput, yearInput].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  calculate(); // первинний розрахунок
});