let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector("header");

    if (!header) return;

    // Only trigger hide after scrolling down past 100px
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling DOWN -> Hide floating navbar
        header.classList.add("nav-hidden");
    } else {
        // Scrolling UP -> Reveal floating navbar
        header.classList.remove("nav-hidden");
    }

    if (scrollTop > 50) {
        header.style.boxShadow = "8px 8px 0px #000000";
    } else {
        header.style.boxShadow = "6px 6px 0px #000000";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scroll bounds
});