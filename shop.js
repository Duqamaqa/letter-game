(function(){
  function updateCarrotBank() {
    const user = LGApp.getUserData();
    const count = user ? (user.carrots||0) : 0;
    const carrotIcons = document.getElementById('carrotIcons');
    const carrotCount = document.getElementById('carrotCount');
    carrotIcons.innerHTML = '';
    for (let i=0; i<count && i<50; i++) { // cap icons for perf
      const span = document.createElement('span');
      span.className = 'carrot-icon';
      carrotIcons.appendChild(span);
    }
    carrotCount.textContent = count;
  }
  function renderShop() {
    const email = LGApp.getCurrentUserEmail();
    if (!email) {
      alert('Please login first.');
      window.location.href = 'login.html';
      return;
    }
    const user = LGApp.getUserData();
    const owned = new Set((user && user.pets) || []);
    const grid = document.getElementById('shopGrid');
    grid.innerHTML='';
    LGApp.getPetsCatalog().forEach(p => {
      const card = document.createElement('div');
      card.className = 'shop-item';
      const img = document.createElement('img');
      img.src = `images/pet-${p.id}.png`;
      img.alt = p.name;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
      img.style.margin = '0 auto 8px';
      const title = document.createElement('h3');
      title.textContent = `${p.emoji} ${p.name}`;
      const price = document.createElement('div');
      price.textContent = `Price: ${p.price} carrots`;
      const btn = document.createElement('button');
      btn.className = 'btn';
      const have = owned.has(p.id);
      btn.textContent = have ? 'Owned' : 'Buy';
      btn.disabled = have || (user.carrots||0) < p.price;
      btn.addEventListener('click', () => {
        const fresh = LGApp.getUserData();
        if ((fresh.carrots||0) < p.price) { alert('Not enough carrots!'); return; }
        if (fresh.pets && fresh.pets.includes(p.id)) { alert('Already owned!'); return; }
        if (!LGApp.spendCarrots(p.price)) { alert('Not enough carrots!'); return; }
        LGApp.ownPet(p.id);
        updateCarrotBank();
        renderShop();
        alert(`${p.name} purchased!`);
      });
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    updateCarrotBank();
    renderShop();
  });
})();


