document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initButtons();
});

const cards = document.querySelectorAll('.card');

// Функция для загрузки состояния кнопок из localStorage
function loadState() {
    // Проверка наличия ключа 'pickedButtons' в localStorage
    if (!localStorage.getItem('pickedButtons')) {
        localStorage.setItem('pickedButtons', JSON.stringify({}));
    }

    const savedState = JSON.parse(localStorage.getItem('pickedButtons')) || {};

    cards.forEach(card => {
        const cardId = card.querySelector('.interested').getAttribute('data-id');
        if (savedState[cardId]) {
            const { interested } = savedState[cardId];
            const interestedButton = card.querySelector('.interested');
            const notInterestedButton = card.querySelector('.not-interested');

            if (interested) {
                interestedButton.classList.add('picked'); // Установим класс "picked"
                interestedButton.textContent = 'Picked';
                notInterestedButton.style.display = 'none'; // скрываем кнопку Not Interested

                // Добавляем кнопку Cancel
                const cancelButton = document.createElement('button');
                cancelButton.classList.add('event-button', 'cancel');
                cancelButton.textContent = 'Cancel';
                card.querySelector('.event-buttons').appendChild(cancelButton);

                cancelButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    interestedButton.classList.remove('picked'); // восстанавливаем стиль
                    interestedButton.textContent = 'Interested'; // восстанавливаем текст
                    notInterestedButton.style.display = 'inline-block'; // показываем кнопку Not Interested
                    cancelButton.remove(); // удаляем кнопку Cancel

                    // Обновляем состояние в localStorage
                    saveState();
                });
            }
        }
    });
}

// Функция для сохранения состояния кнопок в localStorage
function saveState() {
    const state = {};

    cards.forEach(card => {
        const cardId = card.querySelector('.interested').getAttribute('data-id');
        const interestedButton = card.querySelector('.interested');
        state[cardId] = {
            interested: interestedButton.classList.contains('picked'),
        };
    });

    localStorage.setItem('pickedButtons', JSON.stringify(state));
    console.log('Сохранено состояние:', localStorage.getItem('pickedButtons')); // Отладка
}

// Инициализация кнопок
function initButtons() {
    cards.forEach(card => {
        const interestedButton = card.querySelector('.interested');
        const notInterestedButton = card.querySelector('.not-interested');

        interestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            interestedButton.classList.add('picked');
            interestedButton.textContent = 'Picked';
            notInterestedButton.style.display = 'none';

            // Добавляем кнопку Cancel
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('event-button', 'cancel');
            cancelButton.textContent = 'Cancel';
            card.querySelector('.event-buttons').appendChild(cancelButton);

            cancelButton.addEventListener('click', (e) => {
                e.preventDefault();
                interestedButton.classList.remove('picked');
                interestedButton.textContent = 'Interested';
                notInterestedButton.style.display = 'inline-block';
                cancelButton.remove();

                // Обновляем состояние в localStorage
                saveState();
            });

            // Обновляем состояние в localStorage
            saveState();
        });

        notInterestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            card.remove(); // удаляем карточку

            // Обновляем состояние в localStorage
            saveState();
        });
    });
}
