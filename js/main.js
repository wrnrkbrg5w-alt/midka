const pageColors = [
    { color: '#f8f9fa', name: 'Light' },
    { color: '#eef5ff', name: 'Sky' },
    { color: '#f4f0ff', name: 'Lavender' },
    { color: '#edf8f2', name: 'Mint' }
];

let currentColor = 0;
const themeButton = document.querySelector('.theme-button');

if (themeButton) {
    themeButton.addEventListener('click', function () {
        currentColor = (currentColor + 1) % pageColors.length;
        const selectedColor = pageColors[currentColor];
        document.body.style.setProperty('background-color', selectedColor.color, 'important');
        themeButton.textContent = 'Background: ' + selectedColor.name;
    });
}

const dateTimeElement = document.querySelector('.current-datetime');

function updateDateTime() {
    if (!dateTimeElement) return;

    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);
