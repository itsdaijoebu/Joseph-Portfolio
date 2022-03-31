// external link behavious
const externalLinks = Array.from(document.querySelectorAll(`.ext-links`))
externalLinks.forEach(link => link.addEventListener('click', newTab))
function newTab(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    window.open(`${e.currentTarget.href}`)
}

// mobile menu
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

// let i = 0;
// mobile menu event listeners
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

//highlight nav items on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#primary-nav a");
window.addEventListener("scroll", () => {
    let current = "";
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop;
        const sectionHeight = sections[i].clientHeight;
        if (pageYOffset <= (sections[1].offsetTop - sections[1].clientHeight / 3)) {
            current = "top";
            break;
        }
        else if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = sections[i].getAttribute("id");
            break;
        }
    }

    // sections.forEach(section => {
    //     const sectionTop = section.offsetTop;
    //     const sectionHeight = section.clientHeight;
    //     if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
    //         current = section.getAttribute("id");
    //     }
    //     console.log(pageYOffset)
    //     console.log(`${current} ${current.length}`);
    // })

    navItems.forEach(a => {
        a.classList.remove("active-nav-item");
        if (a.classList.contains(current)) {
            a.classList.add("active-nav-item");
        }
    })
})

//Google sheets contact form
// window.addEventListener("load", function() {
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
        .then(() => {
            alert("Success!");
        })
    contactForm.reset();
});
//   });