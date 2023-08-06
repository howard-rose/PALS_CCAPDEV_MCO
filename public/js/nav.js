document.addEventListener('DOMContentLoaded', () => {
    const navHome = document.querySelector(".nav-home");
    const navUser = document.querySelector(".nav-user");

    navHome?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/";
    });

    navUser?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/register";
    });

    const navSearchForm = document.querySelector('#nav-search-form');
    navSearchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Search bar submitted!');
        
        const searchQuery = document.querySelector('#nav-search-bar').value;
        console.log(searchQuery);

        window.location.href = `/search/${searchQuery}`;
    });
});
