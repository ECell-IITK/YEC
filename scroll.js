window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector("header");

    if (!header) return;

    // Add scrolled class when user scrolls down for shadow/border enhancement
    if (scrollTop > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});