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

// mobile menu event listeners
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});