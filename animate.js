function slideAnimeStart(child) {
  child.style.transform = "translateX(50px)";
}

function animationStart() {
  const animateStarts = document.querySelectorAll(".animation");

  animateStarts.forEach(anime => {
    anime.classList.add("start");
  });
}

function animationEnd(e) {
  const anime = e.target.parentElement;

  anime.classList.remove("start");
  anime.classList.add("end");
}
