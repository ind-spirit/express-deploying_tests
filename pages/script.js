window.onload = function() {
    const toggle = document.querySelector('.toggle-btn');

    toggle.addEventListener('click', function () {
        const head = document.querySelector('head');
        
        if (toggle.checked) {
            const dark_theme = document.createElement('link');
            dark_theme.rel = 'stylesheet';
            dark_theme.href = '../dark-theme.css';
            dark_theme.classList.add('dark-theme');
            head.appendChild(dark_theme);
        }
        else {
            const dark_theme = document.querySelector('.dark-theme');
            head.removeChild(dark_theme);
        }
    });
}