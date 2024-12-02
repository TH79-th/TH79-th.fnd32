'use strict'

document.addEventListener("DOMContentLoaded", function () {
  const mazeContainer = document.getElementById("maze-container");
  const walls = document.querySelectorAll(".wall");
  const ngMessage = document.getElementById("ngMessage");
  const okMessage = document.getElementById("okMessage");
  const mouseStalker = document.getElementById("mouseStalker");

  function updateMouseStalkerPosition(event) {
    mouseStalker.style.left = (event.clientX + window.scrollX) + "px";
    mouseStalker.style.top = (event.clientY + window.scrollY) + "px";

    const mouseRect = mouseStalker.getBoundingClientRect();
    const mazeRect = mazeContainer.getBoundingClientRect();
    let isTouchingWall = false;

    walls.forEach(function(wall) {
      const wallRect = wall.getBoundingClientRect();
      if (
        mouseRect.left < wallRect.right &&
        mouseRect.right > wallRect.left &&
        mouseRect.top < wallRect.bottom &&
        mouseRect.bottom > wallRect.top
      ) {
        isTouchingWall = true;
      }
    });

    if (isTouchingWall) {
      ngMessage.style.display = "block";
      okMessage.style.display = "none";
    } else {
      ngMessage.style.display = "none";
    }

    if (mouseRect.right >= mazeRect.right && mouseRect.left <= mazeRect.right) {
      okMessage.style.display = "block";
      setTimeout(function() {
        okMessage.style.display = "none";
      }, 3000);
    } else {
      okMessage.style.display = "none";
    }
  }

  document.addEventListener("mousemove", updateMouseStalkerPosition);
  window.addEventListener("scroll", function() {
    const event = new MouseEvent('mousemove', {
      clientX: mouseStalker.getBoundingClientRect().left - window.scrollX,
      clientY: mouseStalker.getBoundingClientRect().top - window.scrollY
    });
    updateMouseStalkerPosition(event);
  });
});
