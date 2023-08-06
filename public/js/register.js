document.addEventListener('DOMContentLoaded', () => {
    console.log('document loaded!');
    const submitBtn = document.querySelector('#submit');

    console.log(`submit button: ${submitBtn}`);

    submitBtn?.addEventListener('click', (e) => {
        console.log('submit button clicked');
        e.preventDefault();
        
        const form = new FormData(document.querySelector('#register-form'));
        console.log(`Form data: ${form}`);
        const formObj = {};
        for (const data of form) {
            formObj[data[0]] = data[1];
        }

        const jsonFormObj = JSON.stringify(formObj);
        console.log(jsonFormObj);

        fetch('/register', {
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
                window.location.href = '/register';
            }
        }).catch(err => {
            console.error(err);
        });
    });
});

console.log('javascript file loaded');