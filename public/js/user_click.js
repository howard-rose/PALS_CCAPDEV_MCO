document.addEventListener('DOMContentLoaded', () => {
    const usernameElements = document.querySelectorAll('.post-username');

    for (const usernameElement of usernameElements) {
        usernameElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/profile/${usernameElement.textContent}`;
        })
    }
});