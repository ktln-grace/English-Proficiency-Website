document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuItems = document.querySelector('.navbar');

    burgerMenu.addEventListener('click', function() {
        menuItems.classList.toggle('active');
    });
     // Event listener to hide the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menuItems.contains(event.target);
        const isClickInsideBurger = burgerMenu.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideBurger) {
            menuItems.classList.remove('active');
        }
    });

    // Event listener to close the menu when clicking the close button
    closeButton.addEventListener('click', function() {
        menuItems.classList.remove('active');
    });
});