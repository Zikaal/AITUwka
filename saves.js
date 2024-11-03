document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    const cards = document.querySelectorAll('.card');

    // Загружаем состояние из localStorage
    const savedState = JSON.parse(localStorage.getItem('pickedButtons')) || {};
    console.log("Загруженное состояние из localStorage:", savedState);

    cards.forEach(card => {
        const interestedButton = card.querySelector('.interested');
        const notInterestedButton = card.querySelector('.not-interested');

        if (!interestedButton || !notInterestedButton) {
            console.warn("Кнопки не найдены для карточки", card);
            return;
        }

        const cardId = interestedButton.getAttribute('data-id');

        // Устанавливаем состояние кнопок на основе localStorage
        if (savedState[cardId] && savedState[cardId].interested) {
            setPickedState(card, interestedButton, notInterestedButton);
        }

        // Обработчики для кнопок
        interestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            setPickedState(card, interestedButton, notInterestedButton);
            saveState();
        });

        notInterestedButton.addEventListener('click', (e) => {
            e.preventDefault();
            card.remove();
            saveState();
        });
    });
}

function setPickedState(card, interestedButton, notInterestedButton) {
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

function saveState() {
    const state = {};
    document.querySelectorAll('.card').forEach(card => {
        const interestedButton = card.querySelector('.interested');
        const cardId = interestedButton.getAttribute('data-id');
        state[cardId] = { interested: interestedButton.classList.contains('picked') };
    });

    localStorage.setItem('pickedButtons', JSON.stringify(state));
    console.log("Состояние сохранено в localStorage:", state);
}
