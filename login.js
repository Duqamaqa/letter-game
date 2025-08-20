(function(){
  function refreshStatus() {
    const email = LGApp.getCurrentUserEmail();
    const status = document.getElementById('status');
    status.textContent = email ? `Logged in as ${email}` : 'Not logged in';
  }
  document.addEventListener('DOMContentLoaded', () => {
    refreshStatus();
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim().toLowerCase();
      if (!email) return;
      LGApp.setCurrentUserEmail(email);
      LGApp.initUserIfNeeded(email);
      refreshStatus();
      alert('Logged in!');
      window.location.href = 'index.html';
    });
    document.getElementById('logoutBtn').addEventListener('click', () => {
      LGApp.setCurrentUserEmail('');
      refreshStatus();
      alert('Logged out');
      window.location.reload();
    });
  });
})();


