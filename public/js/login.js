document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('#submit');

    console.log(`submit button: ${submitBtn}`);

    submitBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const form = new FormData(document.querySelector('#login-form'));
        const formObj = {};
        for (const data of form) {
            formObj[data[0]] = data[1];
        }

        const jsonFormObj = JSON.stringify(formObj);

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonFormObj
        }).then((res) => {
            console.log(`Server responded: ${res}`);
            if (res.status === 200) {
                window.location.href = '/';
            } else {
                window.location.href = '/login';
            }
        }).catch(err => {
            console.error(err);
        });
        
        // TODO session management
        //window.location.href = '/';
    });
});