const slider = document.querySelector('.items');
// let isDown = false;
let startX;
let scrollLeft;
var pageLeft = $(document).scrollLeft();
var pageRight = pageLeft + $(window).width();
var tags = $(".item");
let mouseDown = false;
const startScrollOffset = $(window).pageXOffset;
console.log($(window).width(),startScrollOffset);

function checkPosition() {
  var startCard = $(window).width()/3;
  let secondCard = $(window).width()/3*2;
  var endCard = $(window).width();
  console.log(startCard, secondCard, endCard,slider.scrollLeft);
  // percentMovement = slider.scrollLeft / slider.scrollWidth;
  if (slider.scrollLeft <= startCard) {
    $(tags[0]).addClass("visible");
  } else if (slider.scrollLeft > startCard && slider.scrollLeft < secondCard) {
    $(tags[0]).removeClass("visible");
    $(tags[2]).removeClass("visible");
    $(tags[1]).addClass("visible");
  } else if (slider.scrollLeft > secondCard && slider.scrollLeft <= endCard) {
  $(tags[0]).removeClass("visible");  
    $(tags[2]).addClass("visible"); 
  } else {
    $(tags[2]).addClass("visible"); 
  }
}


let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  console.log(scrollLeft)
};

let stopDragging = function (event) {
  mouseDown = false;
  checkPosition();
};

slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);


