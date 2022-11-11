const today = new Date();

// external link behavious
const externalLinks = Array.from(document.querySelectorAll(`.ext-links`))
externalLinks.forEach(link => link.addEventListener('click', newTab))
function newTab(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    window.open(`${e.currentTarget.href}`)
}

// mobile menu
const btn = document.querySelector("#mobile-menu-button");
const menu = document.querySelector("#mobile-menu");

// let i = 0;
// mobile menu event listeners
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

const copyYear = document.querySelector("#year");
copyYear.innerText = today.getFullYear();


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

// Video behaviour
let isPaused = false;
let portfolioVideos = Array.from(document.querySelectorAll(".portfolio-video"))
portfolioVideos.forEach(video => {
    video.addEventListener("mouseover", playOnHover);
    video.addEventListener("click", clickPlayPause)
    // video.addEventListener("mouseleave", pauseOffHover);
})
function playOnHover(e) {
    e.target.play();
    isPaused = false;
    e.target.classList.remove('paused');
}
function pauseOffHover(e) {
    e.target.pause();
}
function clickPlayPause(e) {
    if(isPaused) e.target.play();
    else e.target.pause();
    isPaused = !isPaused;

    if(isPaused) e.target.classList.add('paused')
    else e.target.classList.remove('paused')
}


//Google sheets contact form
// window.addEventListener("load", function() {
const contactForm = document.getElementById('contact-form');
const contactSubmit = document.getElementById('submit-contact');
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const action = e.target.action;
    contactSubmit.innerText = "Sending..."
    contactSubmit.style = "pointer-events: none"
    fetch(action, {
        method: 'POST',
        body: data,
    })
        .then(() => {

            contactSubmit.innerText = "Success!"
            contactForm.reset();
            setTimeout(() => {
                contactSubmit.innerText = "Send"
                contactSubmit.style = "pointer-events: auto"
            }, 1500)

        })
});
//   });