function animationStart() {
  const animateStarts = document.querySelectorAll(".animation");

  animateStarts.forEach(anime => {
    anime.style.transform = "scale(1)";
  });
}

function animationEnd(e) {
  const animateEnd = e.target.parentElement;

  animateEnd.style.transform = "scale(0)";
}
