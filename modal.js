// Проверяем наличие флага в локальном хранилище
window.onload = function() {
    const modal = document.getElementById('welcomeModal');
    const showModal = localStorage.getItem('showWelcomeModal');

    if (showModal === 'true') {
        modal.style.display = 'flex';
        // Убираем флаг после показа
        localStorage.removeItem('showWelcomeModal');
    }
};

// Закрываем модальное окно при нажатии на крестик
document.getElementById('closeModal').onclick = function() {
    const modal = document.getElementById('welcomeModal');
    modal.style.display = 'none';
};

// Закрываем модальное окно при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('welcomeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};