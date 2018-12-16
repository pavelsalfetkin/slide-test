"use strict";

/* ---------------------------------------------------------------------------- */
/* ---------------------------------  CONST  ---------------------------------- */
/* ---------------------------------------------------------------------------- */

var container = document.getElementById("container");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");

var parallax = document.getElementById("parallax__layer--front");

var sliderIce = document.getElementById("slider-ice");
var slides = document.getElementById("slides-container");
var sliderRunner = document.getElementById("slider-runner");

var rightDots = document.getElementById("right-dots");
var bottomBlock = document.getElementById("bottom-block");

var circle1R30 = document.getElementById("circle-1-30px");
var circle2R20 = document.getElementById("circle-2-20px");
var circle3R60 = document.getElementById("circle-3-60px");
var circle4R20 = document.getElementById("circle-4-20px");

var fullscreen = document.getElementById("fullscreen");
var exitFullscreen = document.getElementById("exitFullscreen");

var circleAnimRadius = [circle1R30, circle2R20, circle3R60, circle4R20];

/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */

var RUNNER_WIDTH = sliderRunner.offsetWidth / 100;

// circleAnimRadius.forEach(function (circle) {
// 	return circle.children[1].r.baseVal.value = 0;
// });
circleAnimRadius.forEach(function (circle) {
	return circle.children[2].r.baseVal.value = 0;
});

function animateCircle(circleArr, durationMs, index, timeout) {
	var runtime;
	var progress;
	var starttime;
	var duration = durationMs;

	function loop() {
		runtime = Date.now() - starttime;
		progress = Math.min(runtime / duration, 1);
		circleArr.forEach(function (circle) {
			return circle.children[index].r.baseVal.value = (circle.children[0].r.baseVal.value * progress).toFixed(2);
		});
		if (runtime >= duration) {
			starttime = Date.now();
			// window.requestAnimationFrame(loop);
			setInterval(loop, 1000/60);
		} else {
			// window.requestAnimationFrame(loop);
			setInterval(loop, 1000/60);
		}
	};

	if (!timeout) {
		// starttime = window.performance.now();
		// window.requestAnimationFrame(loop);
		starttime = Date.now();
		loop();
	} else {
		setTimeout(function () {
			starttime = Date.now();
			loop();
		}, duration / 2);
	}
}

// перемещаем контейнер с секциями на секцию 1
var switchToSection1 = function switchToSection1() {
	// сдвигаем элемент на всю высоту по оси Y (оси X Y Z)
	container.style.transform = 'translate3d(0px, 0px, 0px)';
	// плавный переход (property duration timing-function delay)
	container.style.transition = 'all 700ms ease 0s';
	parallax.style.transform = 'translate3d(0px, -40px, 0px)';
	parallax.style.transition = 'all 700ms ease 0s';
};

// перемещаем контейнер с секциями на секцию 2
var switchToSection2 = function switchToSection2() {
	container.style.transform = 'translate3d(0px, -768px, 0px)';
	container.style.transition = 'all 700ms ease 0s';
	parallax.style.transform = 'translate3d(0px, 0px, 0px)';
	parallax.style.transition = 'all 1400ms ease 0s';
	// добавляем событие которое отслеживает окончание анимации
	container.addEventListener("transitionend", function () {
		// когда мы переместили контейнер на секцию 2, добавляем событие 'wheel' которе отследит вращение колеса мыши или трекпада
		// эта конструкция частично не дает проскочить мимо секции 2 когда используется трекпад на ноутбуке
		// т.к. событие "листания" начинается на секции 1 и по инерции переходит на секцию 2 и пролистывает ее мимо
		section2.addEventListener('wheel', switch2, false);
	}, false);
};

// перемещаем контейнер с секциями на секцию 3
var switchToSection3 = function switchToSection3() {
	container.style.transform = 'translate3d(0px, -1536px, 0px)';
	container.style.transition = 'all 700ms ease 0s';
	parallax.style.transform = 'translate3d(0px, 80px, 0px)';
	parallax.style.transition = 'all 700ms ease 0s';
};

// функция срабатывает на событие 'wheel' на секции 1
var switch1 = function switch1(e) {
	// отменяем стандартное поведение браузера на это событие
	// e.preventDefault();
	// отслеживаем чтобы итераций листания было > 24 для избежания случайных листаний
	// если > 0 то листаем снизу вверх
	if (e.deltaY > 24) {
		// удаляем событие листания на секции 2 для избежания пролистывания мимо этой секции
		// т.к. событие "листания" начинается на одной секции и по инерции переходит на другую и пролистывает ее тоже
		section2.removeEventListener('wheel', switch2, false);
		switchToSection2();
	}
};

// функция срабатывает на событие 'wheel' на секции 2
var switch2 = function switch2(e) {
	e.preventDefault();
	// если < 0 то листаем сверху вниз
	if (e.deltaY < -24) {
		switchToSection1();
	}
	// если > 0 то листаем снизу вверх
	else if (e.deltaY > 24) {
			switchToSection3();
		}
};

// функция срабатывает на событие 'wheel' на секции 3
var switch3 = function switch3(e) {
	e.preventDefault();
	if (e.deltaY < -24) {
		section2.removeEventListener('wheel', switch2, false);
		switchToSection2();
	}
};

// реагируем на событие 'touchstart' на секции 1
function swipeFromSection1(e) {
	// e.preventDefault();
	// объявляем переменную и записываем координаты начала движения
	this.startPoint = e.targetTouches[0].clientY;
	// объявляем переменную конечных координат движения
	this.endPoint;
	this.addEventListener('touchend', function () {
		// e.preventDefault();
	});
	this.addEventListener('touchcancel', function () {
		// e.preventDefault();
	});
	this.addEventListener('touchmove', function (e) {
		// e.preventDefault();
		// записываем координаты окончания движения
		this.endPoint = e.targetTouches[0].clientY;
		// если начальные координаты больше конечных - произошло движение снизу вверх
		if (this.startPoint > this.endPoint) switchToSection2();
	}, false);
}

// реагируем на событие 'touchstart' на секции 2
function swipeFromSection2(e) {
	e.preventDefault();
	this.startPoint = e.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchend', function () {
		e.preventDefault();
	});
	this.addEventListener('touchcancel', function () {
		e.preventDefault();
	});
	this.addEventListener('touchmove', function (e) {
		this.endPoint = e.targetTouches[0].clientY;
		// если начальные координаты больше конечных - произошло движение снизу вверх
		if (this.startPoint > this.endPoint) switchToSection3();
		// иначе сверху вниз
		else switchToSection1();
	}, false);
}

// реагируем на событие 'touchstart' на секции 3
function swipeFromSection3(e) {
	e.preventDefault();
	this.startPoint = e.targetTouches[0].clientY;
	this.endPoint;
	this.addEventListener('touchend', function () {
		e.preventDefault();
	});
	this.addEventListener('touchcancel', function () {
		e.preventDefault();
	});
	this.addEventListener('touchmove', function (e) {
		this.endPoint = e.targetTouches[0].clientY;
		if (this.startPoint < this.endPoint) switchToSection2();
	}, false);
}

function bottomSlider(e) {
	e.stopPropagation();
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

/* ---------------------------------------------------------------------------- */
/* ---------------------------------  EVENTS  --------------------------------- */
/* ---------------------------------------------------------------------------- */

// отслеживаем листание на трекпаде или вращение колеса мыши на секциях
section1.addEventListener('wheel', switch1, false);
// это событие добавляется в функции - switchToSection2
// section2.addEventListener('wheel', switch2, false);
section3.addEventListener('wheel', switch3, false);

// отслеживаем начало touch события на секциях
section1.addEventListener('touchstart', swipeFromSection1, false);
section2.addEventListener('touchstart', swipeFromSection2, false);
section3.addEventListener('touchstart', swipeFromSection3, false);

sliderIce.addEventListener('input', bottomSlider);

fullscreen.addEventListener('click', function() {
	console.log("document.body.requestFullscreen()");
	document.body.requestFullscreen();
	document.body.webkitRequestFullScreen()
}, false);

exitFullscreen.addEventListener('click', function() {
	console.log("document.exitFullscreen()");
	document.exitFullscreen();
	document.webkitExitFullscreen();
}, false);

// screen.lockOrientation('landscape');


/* ---------------------------------------------------------------------------- */
/* ----------------------------------  INIT  ---------------------------------- */
/* ---------------------------------------------------------------------------- */

// animateCircle(circleAnimRadius, 4000, 1);
// animateCircle(circleAnimRadius, 4000, 2, true);
