document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.querySelector('#post');

    postBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const form = new FormData(document.querySelector('#create-post-form'));
        const formObj = {};
        for (const data of form) {
            formObj[data[0]] = data[1];
        }

        const jsonFormObj = JSON.stringify(formObj);

        fetch('/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonFormObj
        }).then((res) => {
            console.log(`Server responded: ${res}`);
            if (res.status === 200) {
                window.location.href = '/';
            }
        }).catch(err => {
            console.error(err);
        });
    });
});