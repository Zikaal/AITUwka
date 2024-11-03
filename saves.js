document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM загружен");
    loadState();
    initButtons();
});

const cards = document.querySelectorAll('.card');

function loadState() {
    console.log("Загрузка состояния...");
    if (!localStorage.getItem('pickedButtons')) {
        console.log("Создаем начальное состояние в localStorage");
        localStorage.setItem('pickedButtons', JSON.stringify({}));
    }

    const savedState = JSON.parse(localStorage.getItem('pickedButtons'));
    console.log("Загруженное состояние из localStorage:", savedState);

    cards.forEach(card => {
        const interestedButton = card.querySelector('.interested');
        const notInterestedButton = card.querySelector('.not-interested');
        if (!interestedButton || !notInterestedButton) {
            console.warn("Не удалось найти кнопки для карточки", card);
            return;
        }

        const cardId = interestedButton.getAttribute('data-id');
        if (savedState[cardId]?.interested) {
            applyPickedState(card, interestedButton, notInterestedButton);
        }
    });
}

function saveState() {
    const state = {};
    cards.forEach(card => {
        const interestedButton = card.querySelector('.interested');
        if (!interestedButton) return;

        const cardId = interestedButton.getAttribute('data-id');
        state[cardId] = {
            interested: interestedButton.classList.contains('picked'),
        };
    });

    localStorage.setItem('pickedButtons', JSON.stringify(state));
    console.log("Состояние сохранено в localStorage:", state);
}

function applyPickedState(card, interestedButton, notInterestedButton) {
    interestedButton.classList.add('picked');
    interestedButton.textContent = 'Picked';
    notInterestedButton.style.display = 'none';

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

        saveState();
    });
}

function initButtons() {
    cards.forEach(card => {
        const interestedButton = card.querySelector('.interested');
        const notInterestedButton = card.querySelector('.not-interested');
        if (!interestedButton || !notInterestedButton) {
            console.warn("Не удалось найти кнопки для карточки", card);
            return;
        }

        interestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            applyPickedState(card, interestedButton, notInterestedButton);
            saveState();
        });

        notInterestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            card.remove();
            saveState();
        });
    });
}
