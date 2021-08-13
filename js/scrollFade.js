document.addEventListener("scroll", function (event) {
    fadeInOnScroll();
});

async function fadeInOnScroll(){
    let elements = document.querySelectorAll('.fadeOnScroll');

    elements.forEach.call(elements, function(el, i){
        const rect = el.getBoundingClientRect();
        let yOffset = rect.top;
        if (window.scrollY + (window.screen.height/3) > yOffset){
            el.classList.add('active');
        }
        // Add else clause to re-hide the elements on scroll up?
    });
}
