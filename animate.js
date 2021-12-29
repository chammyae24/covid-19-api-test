function animationStart() {
  const animateStarts = document.querySelectorAll(".animation");

  animateStarts.forEach(anime => {
    anime.style.transform = "scale(0)";
    anime.style.transition = "transform 0.35s cubic-bezier(1,0,0,1) 0s";

    setTimeout(() => {
      anime.style.transform = "scale(1)";
    }, 400);
  });
}

function animationEnd(e) {
  const animateEnd = e.target.parentElement;

  animateEnd.style.transform = "scale(0)";
}
