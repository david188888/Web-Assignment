document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop();

    switch (currentPath) {
        case 'index.html':
            document.getElementById('home-link').classList.add('current-page');
            break;
        case 'About.html':
            document.getElementById('about-link').classList.add('current-page');
            break;
        case 'quiz.html':
            document.getElementById('quiz-link').classList.add('current-page');
            break;
        default:
            break;
    }
});