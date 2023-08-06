document.addEventListener('DOMContentLoaded', () => {
    const navHome = document.querySelector(".nav-home");
    const navUser = document.querySelector(".nav-user");

    navHome?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/";
    });

    /*navUser?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/register";
    });*/

    const navSearchForm = document.querySelector('#nav-search-form');
    navSearchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Search bar submitted!');
        
        const searchQuery = document.querySelector('#nav-search-bar').value;
        console.log(searchQuery);

        window.location.href = `/search/${searchQuery}`;
    });

    // DROPDOWN
    const dropBtn = document.querySelector('#dropbtn');
    const dropdownContainer = document.querySelector('#dropdown-container')
    const logoutBtn = document.querySelector('#dropdown-logout');
    
    dropBtn.addEventListener('click', (e) => {
        dropdownContainer.classList.toggle('show');
    });

    window.onclick = (e) => {
        if (!dropBtn.contains(e.target)) {
            if (dropdownContainer.classList.contains('show')) {
                dropdownContainer.classList.remove('show');
            }
        }
    }

    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('/logout', {
            method: 'POST',
        }).then((res) => {
            console.log(`Server responded: ${res}`);
            if (res.status === 200) {
                window.location.href = '/';
            }
        }).catch(err => {
            console.error(err);
        });
    })
});
