// console.log("main.js is ok");


/* ---------------------------------------------------------------------------- */
/* ---------------------------------  CONST  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


var slider = document.getElementById("slider");
var slides = document.getElementById("slides");
var sliderRunner = document.getElementById("runner");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var rightDots = document.getElementById("right-dots");
var bottomBlock = document.getElementById("bottom-block");

var circleAnimRadius1 = Array.from(document.getElementsByClassName("circle__radius-1"));
var circleAnimRadius2 = Array.from(document.getElementsByClassName("circle__radius-2"));

const runnerWidth = sliderRunner.offsetWidth / 100;


/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */


function animation(circles, ms) {

	var posStart = 4;
	var posEnd = 13.4;
	var shiftInterval = 0.2;

	setInterval(frame, ms);
  function frame() {
    if (posStart >= posEnd) {
    	posStart = 4;
      frame();
    }
    else {
			posStart += shiftInterval;
			circles.forEach(x => x.r.baseVal.value = posStart);
    }
  }
}

animation(circleAnimRadius1, 40);
setTimeout(function() { animation(circleAnimRadius2, 40) }, 1000);
bottomBlock.setAttribute('class', 'bottom-block-active');

// window.addEventListener('wheel', function(e) {
// 	console.log("move down", e.target);
// });


/* ---------------------------------------------------------------------------- */
/* ---------------------------------  EVENTS  --------------------------------- */
/* ---------------------------------------------------------------------------- */


section1.addEventListener('touchstart', function(e) {
	const startPoint = e.targetTouches[0].clientY;
	let endPoint;
	this.addEventListener('touchmove', function(e) { endPoint = e.targetTouches[0].clientY });
	this.addEventListener('touchend', function(e) {
		if (startPoint > endPoint) {
			console.log("slide UP");
			section2.scrollIntoView({block: "start", behavior: "smooth"});
			rightDots.children[0].classList.remove('active');
			rightDots.children[1].classList.add('active');
			rightDots.children[2].classList.remove('active');
		} else {
			console.log("slide DOWN");
		}
	});
});

section2.addEventListener('touchstart', function(e) {
	const startPoint = e.targetTouches[0].clientY;
	let endPoint;
	this.addEventListener('touchmove', function(e) { endPoint = e.targetTouches[0].clientY });
	this.addEventListener('touchend', function(e) {
		if (startPoint > endPoint) {
			console.log("slide UP");
			section3.scrollIntoView({block: "start", behavior: "smooth"});
			bottomBlock.setAttribute('class', 'bottom-block-none');
			rightDots.children[0].classList.remove('active');
			rightDots.children[1].classList.remove('active');
			rightDots.children[2].classList.add('active');
		} else {
			console.log("slide DOWN");
			section1.scrollIntoView({block: "start", behavior: "smooth"});
			bottomBlock.setAttribute('class', 'bottom-block-active');
			rightDots.children[0].classList.add('active');
			rightDots.children[1].classList.remove('active');
			rightDots.children[2].classList.remove('active');
		}
	});
});

section3.addEventListener('touchstart', function(e) {
	const startPoint = e.targetTouches[0].clientY;
	let endPoint;
	this.addEventListener('touchmove', function(e) { endPoint = e.targetTouches[0].clientY });
	this.addEventListener('touchend', function(e) {
		if (startPoint > endPoint) {
			console.log("slide UP");
		} else {
			console.log("slide DOWN");
			section2.scrollIntoView({block: "start", behavior: "smooth"});
			rightDots.children[0].classList.remove('active');
			rightDots.children[1].classList.add('active');
			rightDots.children[2].classList.remove('active');
		}
	});
});





section1.addEventListener('wheel', function(e) {
	// console.log("this", this);
	if (e.deltaY > 10) {
		// console.log("move down", e.deltaY);
		section2.scrollIntoView({block: "start", behavior: "smooth"});
		rightDots.children[0].classList.remove('active');
		rightDots.children[1].classList.add('active');
		rightDots.children[2].classList.remove('active');
	};
});

section2.addEventListener('wheel', function(e) {
	// console.log("this", this);
	if (e.deltaY > 10) {
		// console.log("move down", e.deltaY);
		section3.scrollIntoView({block: "start", behavior: "smooth"});
		bottomBlock.setAttribute('class', 'bottom-block-none');
		// bottomBlock.classList.add('none');
		rightDots.children[0].classList.remove('active');
		rightDots.children[1].classList.remove('active');
		rightDots.children[2].classList.add('active');
	}
	if (e.deltaY < -10) {
		// console.log("move up", e.deltaY);
		section1.scrollIntoView({block: "start", behavior: "smooth"});
		bottomBlock.setAttribute('class', 'bottom-block-active');
		rightDots.children[0].classList.add('active');
		rightDots.children[1].classList.remove('active');
		rightDots.children[2].classList.remove('active');
	}
});

section3.addEventListener('wheel', function(e) {
	// console.log("this", this);
	if (e.deltaY < -10) {
		// console.log("move up", e.deltaY);
		section2.scrollIntoView({block: "start", behavior: "smooth"});
		rightDots.children[0].classList.remove('active');
		rightDots.children[1].classList.add('active');
		rightDots.children[2].classList.remove('active');
	};
});

slider.addEventListener('input', function() {
	// console.log(this.value);
	if (this.value <= 100 && this.value >= 71) {
		slides.style.right = "0";
	}
	if (this.value <= 70 && this.value >= 31) {
		slides.style.right = "-100%";
	}
	if (this.value <= 30 && this.value >= 1) {
		slides.style.right = "-200%";
	}
	sliderRunner.style.width = runnerWidth * this.value + "px";
	// console.log(Math.round(runnerWidth * this.value) + "px");
});