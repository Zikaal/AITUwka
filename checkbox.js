document.addEventListener('DOMContentLoaded', function () {
    const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const sidebar = document.querySelector('.sidebar');

    // Функция для применения ночного режима
    function applyNightMode(isNightMode) {
        body.classList.toggle('night-mode', isNightMode);
        header.classList.toggle('night-mode', isNightMode);
        footer.classList.toggle('night-mode', isNightMode);
        sidebar.classList.toggle('night-mode', isNightMode);
        themeToggleCheckbox.checked = isNightMode;
    }

    // Проверяем сохраненное состояние из localStorage
    const savedTheme = localStorage.getItem('nightMode');
    if (savedTheme === 'true') {
        applyNightMode(true);
    }

    // Слушаем изменения переключателя
    themeToggleCheckbox.addEventListener('change', function () {
        const isChecked = themeToggleCheckbox.checked;
        applyNightMode(isChecked);

        // Сохраняем состояние в localStorage
        localStorage.setItem('nightMode', isChecked);
    });
});


