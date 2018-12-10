/* ---------------------------------------------------------------------------- */
/* ---------------------------------  CONST  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


var parallax = document.getElementById("parallax__layer--front");
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

var circle1R30 = document.getElementById("circle-1-30px");
var circle2R20 = document.getElementById("circle-2-20px");
var circle3R60 = document.getElementById("circle-3-60px");
var circle4R20 = document.getElementById("circle-4-20px");

var circleAnimRadius = [circle1R30, circle2R20, circle3R60, circle4R20];


/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */


const RUNNER_WIDTH = sliderRunner.offsetWidth / 100;

circleAnimRadius.forEach(circle => circle.children[1].r.baseVal.value = 0);
circleAnimRadius.forEach(circle => circle.children[2].r.baseVal.value = 0);

function animateCircle(circleArr, durationMs, index, timeout) {
	var runtime;
	var progress;
	var starttime;
	var duration = durationMs;

	function loop(timestamp) {
		runtime = timestamp - starttime;
		progress = Math.min(runtime / duration, 1);
		circleArr.forEach(circle => circle.children[index].r.baseVal.value = (circle.children[0].r.baseVal.value * progress).toFixed(2));
		if (runtime >= duration) {
			starttime = window.performance.now();
			window.requestAnimationFrame(loop);
		}
		else {
			window.requestAnimationFrame(loop);
		}
	};

	if (!timeout) {
		starttime = window.performance.now();
		window.requestAnimationFrame(loop);
	}
	else {
		setTimeout(function() {
			starttime = window.performance.now();
			window.requestAnimationFrame(loop);
		}, duration / 2);
	}
}


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
	// console.log("slide to section1");
	// section1.scrollIntoView({block: "start", behavior: "smooth"});
	// section1.style.transform = 'translate3d(0px, 0px, 0px)';
	// section2.style.transform = 'translate3d(0px, 0px, 0px)';
	// section3.style.transform = 'translate3d(0px, 0px, 0px)';

	// section1.style.transition = 'all 700ms ease 0s';
	// section2.style.transition = 'all 700ms ease 0s';
	// section3.style.transition = 'all 700ms ease 0s';

	container.style.transform = 'translate3d(0px, 0px, 0px)';
	container.style.transition = 'all 700ms ease 0s';

	parallax.style.transform = 'translate3d(0px, -40px, 0px)';
		parallax.style.transition = 'all 700ms ease 0s';

	// bottomBlock.classList.remove('none');
	// bottomBlock.classList.add('active');
	// rightDots.children[0].classList.add('active');
	// rightDots.children[1].classList.remove('active');
	// rightDots.children[2].classList.remove('active');
};

const switchToSection2 = () => {
		// console.log("slide to section2");
		// section2.scrollIntoView({block: "start", behavior: "smooth"});
		// section1.style.transform = 'translate3d(0px, -100%, 0px)';
		// section2.style.transform = 'translate3d(0px, -100%, 0px)';
		// section3.style.transform = 'translate3d(0px, -100%, 0px)';

		// section1.style.transition = 'all 700ms ease 0s';
		// section2.style.transition = 'all 700ms ease 0s';
		// section3.style.transition = 'all 700ms ease 0s';

		container.style.transform = 'translate3d(0px, -768px, 0px)';
		container.style.transition = 'all 700ms ease 0s';

		parallax.style.transform = 'translate3d(0px, 0px, 0px)';
		parallax.style.transition = 'all 1400ms ease 0s';

		// bottomBlock.classList.add('none');
		// bottomBlock.classList.remove('active');
		// rightDots.children[0].classList.remove('active');
		// rightDots.children[1].classList.add('active');
		// rightDots.children[2].classList.remove('active');
};

const switchToSection3 = () => {
		// console.log("slide to section3");
		// section3.scrollIntoView({block: "start", behavior: "smooth"});
		// section1.style.transform = 'translate3d(0px, -200%, 0px)';
		// section2.style.transform = 'translate3d(0px, -200%, 0px)';
		// section3.style.transform = 'translate3d(0px, -200%, 0px)';

		// section1.style.transition = 'all 700ms ease 0s';
		// section2.style.transition = 'all 700ms ease 0s';
		// section3.style.transition = 'all 700ms ease 0s';

		container.style.transform = 'translate3d(0px, -1536px, 0px)';
		container.style.transition = 'all 700ms ease 0s';

		parallax.style.transform = 'translate3d(0px, 80px, 0px)';
		parallax.style.transition = 'all 700ms ease 0s';

		// rightDots.children[0].classList.remove('active');
		// rightDots.children[1].classList.remove('active');
		// rightDots.children[2].classList.add('active');
};

function swipeFromSection1 (event) {
	console.log(`event.target`, event.target);
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
		if (this.startPoint > this.endPoint) switchToSection2();
	});
	// this.addEventListener('touchend', function() {
	// 	if (this.startPoint > this.endPoint) switchToSection2();
	// });
}

function swipeFromSection2 (event) {
	console.log(`event.target`, event.target);
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
		if (this.startPoint > this.endPoint) switchToSection3();
		else switchToSection1();
	});
	// this.addEventListener('touchend', function() {
	// 	if (this.startPoint > this.endPoint) switchToSection3();
	// 	else switchToSection1();
	// });	
}

function swipeFromSection3 (event) {
	console.log(`event.target`, event.target);
	this.startPoint = event.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchmove', function(event) {
		this.endPoint = event.targetTouches[0].clientY;
		if (this.startPoint < this.endPoint) switchToSection2();
	});
	// this.addEventListener('touchend', function() {
	// 	if (this.startPoint < this.endPoint) switchToSection2();
	// });
}

const touchEventRemove = () => {
	console.log("section - remove")
	section1.removeEventListener('touchstart', swipeFromSection1);
	section2.removeEventListener('touchstart', swipeFromSection3);
	section3.removeEventListener('touchstart', swipeFromSection3);
};

const touchEventAdd = () => {
	console.log("section - add")
	section1.addEventListener('touchstart', swipeFromSection1);
	section2.addEventListener('touchstart', swipeFromSection2);
	section3.addEventListener('touchstart', swipeFromSection3);
};


/* ---------------------------------------------------------------------------- */
/* ---------------------------------  EVENTS  --------------------------------- */
/* ---------------------------------------------------------------------------- */


section1.addEventListener('touchstart', swipeFromSection1, false);
section2.addEventListener('touchstart', swipeFromSection2, false);
section3.addEventListener('touchstart', swipeFromSection3, false);

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

section1.addEventListener('scroll', function(e) {
	if (e.deltaY > 10) switchToSection2();
});

section2.addEventListener('scroll', function(e) {
	if (e.deltaY < -10) switchToSection1();
	else if (e.deltaY > 10) switchToSection3();
});

section3.addEventListener('scroll', function(e) {
	if (e.deltaY < -10) switchToSection2();
});

sliderIce.addEventListener('touchstart', touchEventRemove);
sliderIce.addEventListener('touchend', touchEventAdd);

sliderIce.addEventListener('input', bottomSlider);

document.addEventListener("touchmove", function(e){ e.preventDefault() }, false);

// screen.lockOrientation('landscape');


/* ---------------------------------------------------------------------------- */
/* ----------------------------------  INIT  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


animateCircle(circleAnimRadius, 4000, 1);
animateCircle(circleAnimRadius, 4000, 2, true);