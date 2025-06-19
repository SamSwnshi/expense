document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const chart = document.getElementById('spending-chart');
      const days = ['mon','tue','wed','thu','fri','sat','sun'];
      const todayIdx = new Date().getDay(); // 0=Sunday, 1=Monday, ...
      const maxAmount = Math.max(...data.map(d => d.amount));
      chart.innerHTML = '';
      data.forEach((item, idx) => {
        const bar = document.createElement('div');
        bar.className = 'spending-chart__bar';
        bar.setAttribute('data-label', item.day);
        bar.setAttribute('data-amount', `$${item.amount.toFixed(2)}`);
        // Highlight current day
        if (idx === ((todayIdx + 6) % 7)) bar.classList.add('active');
        // Bar height proportional to max
        const height = 40 + (item.amount / maxAmount) * 100;
        bar.style.height = `${height}px`;
        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `$${item.amount.toFixed(2)}`;
        bar.appendChild(tooltip);
        // Show tooltip on hover/focus
        bar.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
        bar.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
        bar.addEventListener('focus', () => tooltip.style.opacity = '1');
        bar.addEventListener('blur', () => tooltip.style.opacity = '0');
        // Label
        const label = document.createElement('div');
        label.className = 'spending-chart__bar-label';
        label.textContent = item.day;
        bar.appendChild(label);
        chart.appendChild(bar);
      });
    });
});
