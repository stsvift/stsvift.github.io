let sleepData = JSON.parse(localStorage.getItem('sleepData')) || [];

function addNote() {
    const sleepNote = document.getElementById('sleep-note').value;

    if (sleepNote) {
        sleepData.push({ note: sleepNote });
        saveData();
        alert('Заметка добавлена');
    } else {
        alert('Введите заметку!');
    }
}

let currentNote = ''; // переменная для хранения текущей заметки

function markSleep() {
    const sleepDate = document.getElementById('sleep-date').value;
    const wakeTime = document.getElementById('sleep-time').value;
    const customNote = document.getElementById('custom-note').value;

    if (sleepDate && wakeTime) {
        const sleepTime = new Date(`1970-01-01T${wakeTime}`);
        const hours = sleepTime.getHours();
        const minutes = sleepTime.getMinutes();

        let duration = `${hours} ч ${minutes} мин`;

        let note = '';

        if (hours < 7) {
            note = 'Здоровый сон рекомендуется от 7 до 9 часов.';
        }

        if (customNote) {
            note += ` ${customNote}`;
        }

        let index = sleepData.findIndex(item => item.date === sleepDate);
        if (index === -1) {
            sleepData.push({ date: sleepDate, duration: duration, customNote: customNote });
        } else {
            sleepData[index].duration = duration;
            sleepData[index].customNote = customNote;
        }

        saveData();

        alert(`Сон отмечен за ${sleepDate}. Продолжительность сна: ${duration}.`);

        document.getElementById('custom-note').value = '';
    } else {
        alert('Выберите дату и время пробуждения!');
    }
}

function showReport() {
    const reportDate = document.getElementById('report-date').value;
    const reportDetails = document.getElementById('report-details');
    const customNoteContent = document.getElementById('custom-note-content');

    const reportData = sleepData.find(item => item.date === reportDate);

    if (reportData) {
        let detailsContent = `<p>Продолжительность сна: ${reportData.duration}</p>`;
        
        // Очищаем содержимое перед выводом
        customNoteContent.innerHTML = '';

        // Добавляем рекомендацию
        if (reportData.duration && reportData.duration.includes('ч')) {
            customNoteContent.innerHTML += `<div class="note-block">
                                                <h4>Рекомендация:</h4>
                                                <p>Здоровый сон рекомендуется от 7 до 9 часов.</p>
                                            </div>`;
        }

        // Добавляем дополнительную заметку
        if (reportData.customNote) {
            customNoteContent.innerHTML += `<div class="note-block">
                                                <h4>Дополнительная заметка:</h4>
                                                <p>${reportData.customNote}</p>
                                            </div>`;
        }

        reportDetails.innerHTML = detailsContent;

    } else {
        reportDetails.innerHTML = '<p>Отчет за выбранную дату отсутствует.</p>';
        customNoteContent.innerHTML = '';
    }
}





function saveData() {
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
}

// Пример рекомендаций для улучшения сна (можно расширить список)
const recommendations = [
    'Соблюдайте режим дня.',
    'Избегайте кофеин после 16:00.',
    'Создайте комфортные условия для сна в комнате.',
    'Проводите время на свежем воздухе.'
];

window.addEventListener('DOMContentLoaded', () => {
    const recommendationList = document.getElementById('recommendation-list');
    
    recommendations.forEach(recommendation => {
        const listItem = document.createElement('li');
        listItem.textContent = recommendation;
        recommendationList.appendChild(listItem);
    });
});
