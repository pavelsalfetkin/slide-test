/* ---------------------------------------------------------------------------- */
/* ---------------------------------  CONST  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


var container = document.getElementById("container");
var sliderCont = document.getElementById("slider-cont");
var sliderIce = document.getElementById("slider");
var slides = document.getElementById("slides");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var sliderRunner = document.getElementById("runner");
var rightDots = document.getElementById("right-dots");
var bottomBlock = document.getElementById("bottom-block");

var circleAnimRadius1 = Array.from(document.getElementsByClassName("circle__radius-1"));
var circleAnimRadius2 = Array.from(document.getElementsByClassName("circle__radius-2"));


/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */


const RUNNER_WIDTH = sliderRunner.offsetWidth / 100;

const animation = (circles) => {
	var posStart = 4;
	var posEnd = 13.4;
	var shiftInterval = 0.2;
	var ms = 40;
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
};

function bottomSlider () {
	if (this.value <= 100 && this.value >= 71) {
		slides.style.right = "0";
	}
	if (this.value <= 70 && this.value >= 31) {
		slides.style.right = "-100%";
	}
	if (this.value <= 30 && this.value >= 1) {
		slides.style.right = "-200%";
	}
	sliderRunner.style.width = RUNNER_WIDTH * this.value + "px";
};

const switchToSection1 = () => {
	console.log("slide to section1");
	// section1.scrollIntoView({block: "start", behavior: "smooth"});
	section1.style.transform = 'translateY(0%)';
	section2.style.transform = 'translateY(0%)';
	section3.style.transform = 'translateY(0%)';

	section1.style.transition = 'all 700ms ease 0s';
	section2.style.transition = 'all 700ms ease 0s';
	section3.style.transition = 'all 700ms ease 0s';

	bottomBlock.classList.remove('none');
	bottomBlock.classList.add('active');
	rightDots.children[0].classList.add('active');
	rightDots.children[1].classList.remove('active');
	rightDots.children[2].classList.remove('active');
};

const switchToSection2 = () => {
		console.log("slide to section2");
		// section2.scrollIntoView({block: "start", behavior: "smooth"});
		section1.style.transform = 'translateY(-100%)';
		section2.style.transform = 'translateY(-100%)';
		section3.style.transform = 'translateY(-100%)';

		section1.style.transition = 'all 700ms ease 0s';
		section2.style.transition = 'all 700ms ease 0s';
		section3.style.transition = 'all 700ms ease 0s';

		bottomBlock.classList.add('none');
		bottomBlock.classList.remove('active');
		rightDots.children[0].classList.remove('active');
		rightDots.children[1].classList.add('active');
		rightDots.children[2].classList.remove('active');
};

const switchToSection3 = () => {
		console.log("slide to section3");
		// section3.scrollIntoView({block: "start", behavior: "smooth"});
		section1.style.transform = 'translateY(-200%)';
		section2.style.transform = 'translateY(-200%)';
		section3.style.transform = 'translateY(-200%)';

		section1.style.transition = 'all 700ms ease 0s';
		section2.style.transition = 'all 700ms ease 0s';
		section3.style.transition = 'all 700ms ease 0s';

		rightDots.children[0].classList.remove('active');
		rightDots.children[1].classList.remove('active');
		rightDots.children[2].classList.add('active');
};

function swipeFromSection1 (event) {
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
	});
	this.addEventListener('touchend', function() {
		if (this.startPoint > this.endPoint) switchToSection2();
	});
}

function swipeFromSection2 (event) {
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
	});
	this.addEventListener('touchend', function() {
		if (this.startPoint > this.endPoint) switchToSection3();
		else switchToSection1();
	});
	
}

function swipeFromSection3 (event) {
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
	});
	this.addEventListener('touchend', function() {
		if (this.startPoint < this.endPoint) switchToSection2();
	});
}

// const touchEventRemove = () => {
// 	console.log("section - remove")
// 	section1.removeEventListener('touchstart', swipeFromSection1);
// 	section2.removeEventListener('touchstart', swipeFromSection3);
// 	section3.removeEventListener('touchstart', swipeFromSection3);
// };

// const touchEventAdd = () => {
// 	setTimeout(function() {
// 		console.log("section - add")
// 		section1.addEventListener('touchstart', swipeFromSection1);
// 		section2.addEventListener('touchstart', swipeFromSection2);
// 		section3.addEventListener('touchstart', swipeFromSection3);
// 	}, 10000);
// };


/* ---------------------------------------------------------------------------- */
/* ---------------------------------  EVENTS  --------------------------------- */
/* ---------------------------------------------------------------------------- */


section1.addEventListener('touchstart', swipeFromSection1);
section2.addEventListener('touchstart', swipeFromSection2);
section3.addEventListener('touchstart', swipeFromSection3);

section1.addEventListener('wheel', function(e) {
	if (e.deltaY > 10) switchToSection2();
});

section2.addEventListener('wheel', function(e) {
	if (e.deltaY < -10) switchToSection1();
	else if (e.deltaY > 10) switchToSection3();
});

section3.addEventListener('wheel', function(e) {
	if (e.deltaY < -10) switchToSection2();
});

// sliderIce.addEventListener('touchstart', touchEventRemove);
// sliderIce.addEventListener('touchend', touchEventAdd);

sliderIce.addEventListener('input', bottomSlider);

// screen.lockOrientation('landscape');


/* ---------------------------------------------------------------------------- */
/* ----------------------------------  INIT  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


(() => {
	animation(circleAnimRadius1);
	setTimeout(function() { animation(circleAnimRadius2) }, 1000);
})();