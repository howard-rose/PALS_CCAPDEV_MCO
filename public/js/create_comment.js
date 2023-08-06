document.addEventListener('DOMContentLoaded', () => {
    /*const postBtn = document.querySelector('#post');

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
    });*/

    const commentBtns = document.querySelectorAll('button.comment');

    for (const commentBtn of commentBtns) {
        commentBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const form = new FormData(commentBtn.parentElement);
            const formObj = {};
            for (const data of form) {
                formObj[data[0]] = data[1];
            }

            const jsonFormObj = JSON.stringify(formObj);

            const response = await fetch('/createComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonFormObj
            }).then(async (res) => {
                console.log(`Server responded: ${res}`);
            }).catch(err => {
                console.error(err);
            });

            console.log(response.json());

            const child_id = response.json().child_id;
            const parent = commentBtn.parentElement.parentElement.parentElement;
            const parent_id = parent.id;
            let route = '';

            if (parent.classList.contains('comment')) {
                route = '/replyComment';
            } else {
                route = '/replyPost';
            }

            await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({parent_id, child_id})
            }).then((res) => {
                console.log(`Server responded: ${res}`);
                location.reload();
            }).catch(err => {
                console.error(err);
            });
        });
    }
});