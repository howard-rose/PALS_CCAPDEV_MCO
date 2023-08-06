document.addEventListener('DOMContentLoaded', () => {
    const createPostPrompt = document.querySelector('#create-post-prompt');

    createPostPrompt.addEventListener('click', (e) => {
        window.location.href = '/createPost';
    })
});