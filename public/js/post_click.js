document.addEventListener('DOMContentLoaded', () => {
    const postElements = document.querySelectorAll('.post-main-view');

    for (const postElement of postElements) {
        postElement.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `/post/${postElement.id}`;
            /*
            fetch(`/post/${postElement.id}`, {
                method: 'GET'
            }).then((res) => {
                console.log(`Server responded: ${res}`);
                if (res.status === 200) {
                    //good
                }
            }).catch(err => {
                console.error(err);
            });*/
        });
    }
});