"use strict";

// from Babel to es2015

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

var circleAnimRadius = [circle1R30, circle2R20, circle3R60, circle4R20];


/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */


// объявляем константу для слайдера из секции 3
var RUNNER_WIDTH = sliderRunner.offsetWidth / 100;

// обнуляем радиус у анимированных кругов в секции 1
circleAnimRadius.forEach(function (circle) {
	return circle.children[1].r.baseVal.value = 0;
});
circleAnimRadius.forEach(function (circle) {
	return circle.children[2].r.baseVal.value = 0;
});

// функция отвечающая за анимацию кругов в секции 1
function animateCircle(circleArr, durationMs, index, timeout) {
	var runtime;
	var progress;
	var starttime;
	var duration = durationMs;

	function loop(timestamp) {
		runtime = timestamp - starttime;
		progress = Math.min(runtime / duration, 1);
		circleArr.forEach(function (circle) {
			return circle.children[index].r.baseVal.value = (circle.children[0].r.baseVal.value * progress).toFixed(2);
		});
		if (runtime >= duration) {
			starttime = window.performance.now();
			window.requestAnimationFrame(loop);
		} else {
			window.requestAnimationFrame(loop);
		}
	};

	if (!timeout) {
		starttime = window.performance.now();
		window.requestAnimationFrame(loop);
	} else {
		setTimeout(function () {
			starttime = window.performance.now();
			window.requestAnimationFrame(loop);
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

	// управляем отображением навигационных элементов
	bottomBlock.classList.remove('none');
	bottomBlock.classList.add('active');
	rightDots.children[0].classList.add('active');
	rightDots.children[1].classList.remove('active');
	rightDots.children[2].classList.remove('active');
};

// перемещаем контейнер с секциями на секцию 2
var switchToSection2 = function switchToSection2() {
	container.style.transform = 'translate3d(0px, -768px, 0px)';
	container.style.transition = 'all 700ms ease 0s';
	parallax.style.transform = 'translate3d(0px, 0px, 0px)';
	parallax.style.transition = 'all 1400ms ease 0s';

	bottomBlock.classList.add('none');
	bottomBlock.classList.remove('active');
	rightDots.children[0].classList.remove('active');
	rightDots.children[1].classList.add('active');
	rightDots.children[2].classList.remove('active');

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

	bottomBlock.classList.add('none');
	bottomBlock.classList.remove('active');
	rightDots.children[0].classList.remove('active');
	rightDots.children[1].classList.remove('active');
	rightDots.children[2].classList.add('active');
};

// функция срабатывает на событие 'wheel' на секции 1
var switch1 = function switch1(e) {
	// отменяем стандартное поведение браузера на это событие
	e.preventDefault();
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
	e.preventDefault();
	// объявляем переменную и записываем координаты начала движения
	this.startPoint = e.targetTouches[0].clientY;
	// объявляем переменную конечных координат движения
	this.endPoint;
	this.addEventListener('touchend', function () {
		e.preventDefault();
	});
	this.addEventListener('touchcancel', function () {
		e.preventDefault();
	});
	this.addEventListener('touchmove', function (e) {
		e.preventDefault();
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

// реагируем на перемещение ледышки-слайдера в секции 3
function bottomSlider() {
	if (this.value <= 100 && this.value >= 71) {
		slides.style.transform = 'translate3d(0px, 0px, 0px)';
		slides.style.transition = 'all 700ms ease 0s';
	}
	if (this.value <= 70 && this.value >= 31) {
		slides.style.transform = 'translate3d(1024px, 0px, 0px)';
		slides.style.transition = 'all 700ms ease 0s';
	}
	if (this.value <= 30 && this.value >= 1) {
		slides.style.transform = 'translate3d(2048px, 0px, 0px)';
		slides.style.transition = 'all 700ms ease 0s';
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

// отслеживаем движение ползунка-ледышки
sliderIce.addEventListener('input', bottomSlider, false);
// блокируем всплытие события во время передвижения ползунка-ледышки
// для предотвращения перелистывания на секцию 2
sliderIce.addEventListener('touchstart', function (e) {
	e.stopPropagation();
}, false);


/* ---------------------------------------------------------------------------- */
/* ----------------------------------  INIT  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


// запускаем анимацию кружков - animateCircle(circleArr, durationMs, index, timeout)
animateCircle(circleAnimRadius, 4000, 1);
animateCircle(circleAnimRadius, 4000, 2, true);