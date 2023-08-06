document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('#submit');

    console.log(`submit button: ${submitBtn}`);

    submitBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        
        // TODO session management
        window.location.href = '/';
    });
});