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
        '1. Создайте уютную атмосферу в спальне, обеспечьте тишину и темноту.',
        '2. Поддерживайте регулярный режим сна, ложитесь и вставайте в одно и то же время каждый день.',
        '3. Избегайте употребления кофеина и алкоголя перед сном.',
        '4. Проходите регулярные физические упражнения, но не непосредственно перед сном.',
        '5. Создайте ритуал перед сном: например, чашка горячего молока или расслабляющая ванна.',
        '6. Ограничивайте время, проведенное за экранами устройств перед сном.',
        '7. Убедитесь, что ваш матрас и подушки подходят вам по жесткости и комфорту.',
        '8. Обеспечьте прохладную температуру в спальне.',
        '9. Избегайте переедания и употребления тяжелой пищи перед сном.',
        '10. Расслабляющие техники, такие как йога, медитация или глубокое дыхание, могут помочь улучшить сон.',
        '11. Помогает заняться перед сном чтением книги или журнала.',
        '12. Проведите время на свежем воздухе в течение дня для лучшего сна ночью.',
        '13. Избегайте длительного сна днем, чтобы не нарушить ночной сон.',
        '14. Убедитесь, что ваша постельная простыня и одеяло чисты и свежи.',
        '15. Избегайте стресса и тревоги перед сном, попробуйте практиковать релаксацию и позитивные мысли.',
        '16. Проведите время на свежем воздухе в течение дня для лучшего сна ночью.',
        '17. Попробуйте натуральные средства для сна, такие как медовый напиток или травяные чаи.',
        '18. Убедитесь, что ваша спальная обстановка способствует расслаблению: уберите беспорядок и создайте уют.',
        '19. Попробуйте различные позы для сна, чтобы найти наиболее удобную для себя.',
        '20. Посвятите время увлечениям, которые способствуют расслаблению, например, рисованию или рукоделию.',
        '21. При необходимости обратитесь к специалисту, чтобы исключить медицинские причины нарушений сна.',
        '22. Подумайте о закрытии глаз и воображении успокаивающего.' 
];

window.addEventListener('DOMContentLoaded', () => {
    const recommendationList = document.getElementById('recommendation-list');
    
    recommendations.forEach(recommendation => {
        const listItem = document.createElement('li');
        listItem.textContent = recommendation;
        recommendationList.appendChild(listItem);
    });
});
