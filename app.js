/* Global app utilities for user storage, navigation, and shared data */
(function () {
  const STORAGE_KEY = 'lg_users_v1';
  const CURRENT_USER_KEY = 'lg_current_user_v1';

  const DEFAULT_USER = () => ({
    email: '',
    carrots: 0,
    pets: [], // ['rabbit','hamster','unicorn']
    selectedLetters: [], // array of uppercase letters, empty means all
    bestTimedScore: 0,
  });

  const PETS = [
    { id: 'rabbit', name: 'Rabbit', price: 150, emoji: '🐰' },
    { id: 'hamster', name: 'Hamster', price: 250, emoji: '🐹' },
    { id: 'unicorn', name: 'Unicorn', price: 500, emoji: '🦄' },
  ];

  function getAllUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Storage parse error', e);
      return {};
    }
  }

  function saveAllUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function getCurrentUserEmail() {
    return localStorage.getItem(CURRENT_USER_KEY) || '';
  }

  function setCurrentUserEmail(email) {
    if (email) localStorage.setItem(CURRENT_USER_KEY, email);
    else localStorage.removeItem(CURRENT_USER_KEY);
  }

  function initUserIfNeeded(email) {
    if (!email) return null;
    const users = getAllUsers();
    if (!users[email]) {
      const user = DEFAULT_USER();
      user.email = email;
      users[email] = user;
      saveAllUsers(users);
    }
    return users[email];
  }

  function getUserData() {
    const email = getCurrentUserEmail();
    if (!email) return null;
    const users = getAllUsers();
    return users[email] || null;
  }

  function setUserData(newUser) {
    if (!newUser || !newUser.email) return;
    const users = getAllUsers();
    users[newUser.email] = newUser;
    saveAllUsers(users);
  }

  function updateUserData(patch) {
    const user = getUserData();
    if (!user) return null;
    const updated = { ...user, ...patch };
    setUserData(updated);
    return updated;
  }

  function addCarrots(amount) {
    const user = getUserData();
    if (!user) return;
    const carrots = Math.max(0, (user.carrots || 0) + amount);
    updateUserData({ carrots });
  }

  function setCarrots(carrots) {
    const user = getUserData();
    if (!user) return;
    updateUserData({ carrots: Math.max(0, Math.floor(carrots || 0)) });
  }

  function spendCarrots(amount) {
    const user = getUserData();
    if (!user) return false;
    const have = user.carrots || 0;
    if (have < amount) return false;
    updateUserData({ carrots: have - amount });
    return true;
  }

  function ownPet(petId) {
    const user = getUserData();
    if (!user) return;
    const pets = Array.isArray(user.pets) ? user.pets.slice() : [];
    if (!pets.includes(petId)) {
      pets.push(petId);
      updateUserData({ pets });
    }
  }

  function hasPet(petId) {
    const user = getUserData();
    if (!user) return false;
    return Array.isArray(user.pets) && user.pets.includes(petId);
  }

  function getPetsCatalog() {
    return PETS.slice();
  }

  function getSelectedLetters() {
    const user = getUserData();
    if (!user) return [];
    return Array.isArray(user.selectedLetters) ? user.selectedLetters : [];
  }

  function setSelectedLetters(letters) {
    updateUserData({ selectedLetters: Array.from(new Set(letters || [])).sort() });
  }

  function setupNav() {
    const loginNav = document.getElementById('loginNav');
    if (loginNav) {
      const email = getCurrentUserEmail();
      loginNav.textContent = email ? `Me: ${email}` : 'Login';
    }
  }

  window.LGApp = {
    getAllUsers,
    saveAllUsers,
    getCurrentUserEmail,
    setCurrentUserEmail,
    initUserIfNeeded,
    getUserData,
    setUserData,
    updateUserData,
    addCarrots,
    setCarrots,
    spendCarrots,
    ownPet,
    hasPet,
    getPetsCatalog,
    getSelectedLetters,
    setSelectedLetters,
    setupNav,
  };

  document.addEventListener('DOMContentLoaded', setupNav);
})();


