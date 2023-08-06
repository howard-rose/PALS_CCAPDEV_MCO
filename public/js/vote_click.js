document.addEventListener('DOMContentLoaded', () => {
    /*
    const upvoteElements = document.querySelectorAll('.upvote');
    const downvoteElements = document.querySelectorAll('.downvote');

    for (const upvoteElement of upvoteElements) {
        upvoteElement.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }

    for (const downvoteElement of downvoteElements) {
        downvoteElement.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }*/

    const postVoteBars = document.querySelectorAll('.post-vote-bar');

    for (const postVoteBar of postVoteBars) {
        const upvoteElement = postVoteBar.querySelector('.upvote');
        const downvoteElement = postVoteBar.querySelector('.downvote');

        upvoteElement.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('upvote pressed!');

            if (upvoteElement.classList.contains('on')) {
                // Toggle off
                score = 0;
            } else {
                // Toggle on
                score = 1;
            }

            await voteFetch(upvoteElement, score);
            setVoteClasses(score, upvoteElement, downvoteElement);
        });

        downvoteElement.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('downvote pressed!');

            if (downvoteElement.classList.contains('on')) {
                // Toggle off
                score = 0;
            } else {
                // Toggle on
                score = -1;
            }

            try {
                await voteFetch(downvoteElement, score);
                setVoteClasses(score, upvoteElement, downvoteElement);
            } catch (err) {
                console.error(err);
            }
        });
    }
});

function setVoteClasses(score, upvote, downvote) {
    if (score == -1) {
        upvote.className = 'vote upvote off';
        downvote.className = 'vote downvote on';
    } else if (score == 0) {
        upvote.className = 'vote upvote off';
        downvote.className = 'vote downvote off';
    } else {
        upvote.className = 'vote upvote on';
        downvote.className = 'vote downvote off';
    }

    location.reload();
}

async function voteFetch(element, score) {
    const parent = element.parentElement.parentElement;
    console.log(parent);
    console.log(parent.id);

    if (parent.classList.contains('comment')) {
        await commentVoteFetch(parent.id, score);
    } else {
        await postVoteFetch(parent.id, score);
    }
}

async function postVoteFetch(id, score) {
    await fetch(`/vote/post/${id}/${score}`, {
        method: 'POST'
    }).then((res) => {
        console.log(`Server responded: ${res}`);
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
}

async function commentVoteFetch(id, score) {
    await fetch(`/vote/comment/${id}/${score}`, {
        method: 'POST'
    }).then((res) => {
        console.log(`Server responded: ${res}`);
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
}