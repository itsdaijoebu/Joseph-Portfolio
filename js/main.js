const today = new Date();

// external link behavious
const externalLinks = Array.from(document.querySelectorAll(`.ext-links`));
externalLinks.forEach((link) => link.addEventListener("click", newTab));
function newTab(e) {
  e.preventDefault();
  window.open(`${e.currentTarget.href}`);
}

// mobile menu
const btn = document.querySelector("#mobile-menu-button");
const menu = document.querySelector("#mobile-menu");

// let i = 0;
// mobile menu event listeners
btn.addEventListener("click", () => {
  menu.classList.toggle("display-mobile-menu");
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
    // if (scrollY <= sections[1].clientHeight / 3 - sections[1].offsetTop) {
    if (scrollY <= sections[0].offsetHeight / 2) {
      current = "top";
      break;
    } else if (scrollY >= sectionTop - sectionHeight / 3) {
      current = sections[i].getAttribute("id");
      break;
    }
  }

  if (current === 'top') {
    document.querySelector('#top-button').classList.add('invisible')
  } else {
    document.querySelector('#top-button').classList.remove('invisible')
  }

  navItems.forEach((a) => {
    a.classList.remove("active-nav-item");
    if (a.classList.contains(current)) {
      a.classList.add("active-nav-item");
    }
  });
});

// // Video behaviour
let isPaused = false;
let portfolioVideos = Array.from(document.querySelectorAll(".portfolio-video"));
portfolioVideos.forEach((video) => {
  let firstPlay = true;

  video.addEventListener("mouseover", playOnHover);
  // video.addEventListener("click", clickPlayPause);
  // video.addEventListener("mouseleave", pauseOffHover);

  function playOnHover(e) {
    if (!firstPlay) return
    e.target.play();
    isPaused = false;
    e.target.classList.remove("paused");
    firstPlay = false;
  }
  function clickPlayPause(e) {
    if (isPaused) e.target.play();
    else e.target.pause();
    isPaused = !isPaused;

    if (isPaused) e.target.classList.add("paused");
    else e.target.classList.remove("paused");
  }
});


//Google sheets contact form
// window.addEventListener("load", function() {
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzAWQDy5qgkbmFy3FbFH4OwRr0kApdqIkn8cgAOLybSswVxgWtZx8zGmKEhV5JhJ_tr/exec";
// const contactForm = document.getElementById("contact-form");
// const contactSubmit = document.getElementById("submit-contact");
const form = document.forms["submit-to-gSheets"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitContact = document.querySelector("#submit-contact");
  submitContact.disabled = true;
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((res) => console.log("Success!", res))
    .catch((err) => console.error("Error!", err.message));

  resetForm(5);

  function resetForm(seconds) {
    if (seconds > 0) {
      submitContact.innerHTML = `Thank you!<br>Resetting form in ${seconds}`;
      --seconds;
      setTimeout(() => resetForm(seconds), 1000);
    } else {
      form.reset();
      submitContact.disabled = false;
      submitContact.innerText = "Send";
    }
  }
});

// contactForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const data = new FormData(contactForm);
//   const action = e.target.action;
//   contactSubmit.innerText = "Sending...";
//   contactSubmit.style = "pointer-events: none";
//   fetch(action, {
//     method: "POST",
//     body: data,
//   }).then(() => {
//     contactSubmit.innerText = "Success!";
//     contactForm.reset();
//     setTimeout(() => {
//       contactSubmit.innerText = "Send";
//       contactSubmit.style = "pointer-events: auto";
//     }, 1500);
//   });
// });
//   });
const scream = new screamToScroll();
document.getElementById("scream-checkbox").addEventListener("change", (e) => {
  if (e.target.checked) {
    scream.createScream();
  } else {
    scream.stopScream();
  }
});
// Scream to Scroll
function screamToScroll() {
  let audioContext;
  let screamInterval;
  let highscore = Number(localStorage.getItem("screamScore")) || 0;
  let totalScore = Number(localStorage.getItem("screamTotal")) || 0;
  let sessionScore = 0;
  let score = 0;
  const volumeMeterEl = document.getElementById("scream-meter");
  const screamSwitch = document.getElementById("scream-switch");
  const screamSessionTotal = document.getElementById("scream-session-total");
  const screamTotal = document.getElementById("scream-total");

  function setPersonalBest(score) {
    document.getElementById("scream-personal-best").textContent = score;
  }
  screamTotal.textContent = totalScore;
  setPersonalBest(highscore);

  return {
    createScream: async () => {
      audioContext = new AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      // audioContext = new AudioContext();
      const mediaStreamAudioSourceNode =
        audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamAudioSourceNode.connect(analyserNode);

      const pcmData = new Float32Array(analyserNode.fftSize);
      const scream = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amp of pcmData) {
          sumSquares += amp * amp;
        }
        const volume = Math.sqrt(sumSquares / pcmData.length);
        volumeMeterEl.value = volume;
        if (volume < 0.01) {
          localStorage.setItem("screamTotal", totalScore);
          if (score > 0) {
            if (score > highscore) {
              highscore = score;
              localStorage.setItem("screamScore", highscore);
            }
            setPersonalBest(highscore);

            score = 0;
            screamSwitch.dataset.scoreAfter = "";
            screamSwitch.dataset.scoreBefore = "0";
          }
          screamSwitch.classList.remove("scream-thousands-ones");
          screamSwitch.classList.remove("scream-thousands");
          screamSwitch.classList.remove("scream-tenthousands");
          screamSwitch.classList.remove("scream-tenthousands-ones");
        }
        if (volume) {
          const scrollDist = Math.floor(Math.pow((volume * 50), 2));
          window.scrollBy(0, scrollDist);
          score += scrollDist;
          sessionScore += scrollDist;
          totalScore += scrollDist;
          screamTotal.textContent = totalScore;
          screamSessionTotal.textContent = sessionScore;
          screamSwitch.dataset.scoreBefore = String(score).slice(-2);
          if (score > 99) {
            screamSwitch.dataset.scoreAfter = String(score).slice(0, -2);
          }
          if (score > 999 && score < 10000) {
            if (score < 1100 || score > 1199) {
              screamSwitch.classList.add("scream-thousands");
              screamSwitch.classList.remove("scream-thousands-ones");
            } else {
              screamSwitch.classList.remove("scream-thousands");
              screamSwitch.classList.add("scream-thousands-ones");
            }
          } else if (score > 9999) {
            if (score < 11100 || score > 11199) {
              screamSwitch.classList.remove("scream-thousands");
              screamSwitch.classList.remove("scream-tenthousands-ones");
              screamSwitch.classList.add("scream-tenthousands");
            } else {
              screamSwitch.classList.remove("scream-tenthousands");
              screamSwitch.classList.remove("scream-thousands");
              screamSwitch.classList.add("scream-tenthousands-ones");
            }
          }
          if (
            scrollY + 10 >=
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
          ) {
            window.scrollTo({
              top: 0,
              behavior: "instant",
            });
          }
        }
      };

      screamInterval = setInterval(scream, 100);
    },
    stopScream: () => {
      audioContext.close();
      clearInterval(screamInterval);
    },
  };
}
