document.addEventListener("DOMContentLoaded", function() {
  const options = {
    strings: ["Your Text Here"],
    typeSpeed: 100,   // typing speed in milliseconds
    backSpeed: 50,   // backspacing speed in milliseconds
    backDelay: 1000,  // delay before starting to backspace
    loop: true       // set to false if you don't want the animation to loop
  };

  const typed = new Typed("#typed-output", options);
});
