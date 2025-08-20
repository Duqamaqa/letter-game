(function(){
  const A_Z = Array.from({length:26}, (_,i)=>String.fromCharCode(65+i));
  function renderGrid() {
    const grid = document.getElementById('lettersGrid');
    const selected = (LGApp.getSelectedLetters && LGApp.getSelectedLetters()) || [];
    const set = new Set(selected);
    grid.innerHTML = '';
    A_Z.forEach(ch => {
      const id = 'chk_'+ch;
      const label = document.createElement('label');
      label.setAttribute('for', id);
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = id;
      input.value = ch;
      input.checked = set.size === 0 ? true : set.has(ch);
      label.appendChild(input);
      label.appendChild(document.createTextNode(' '+ch));
      grid.appendChild(label);
    });
  }
  function getSelectedFromUI() {
    const inputs = document.querySelectorAll('#lettersGrid input[type="checkbox"]');
    const list = [];
    inputs.forEach(i => { if (i.checked) list.push(i.value); });
    // if all selected, keep explicit list anyway
    return list;
  }
  function onSave() {
    const email = LGApp.getCurrentUserEmail();
    if (!email) {
      alert('Please login first.');
      window.location.href = 'login.html';
      return;
    }
    const sel = getSelectedFromUI();
    LGApp.setSelectedLetters(sel);
    alert('Saved! These letters will be used in games.');
  }
  function onSelectAll() {
    document.querySelectorAll('#lettersGrid input').forEach(i => i.checked = true);
  }
  function onClearAll() {
    document.querySelectorAll('#lettersGrid input').forEach(i => i.checked = false);
  }
  document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    document.getElementById('saveBtn').addEventListener('click', onSave);
    document.getElementById('selectAll').addEventListener('click', onSelectAll);
    document.getElementById('clearAll').addEventListener('click', onClearAll);
  });
})();


