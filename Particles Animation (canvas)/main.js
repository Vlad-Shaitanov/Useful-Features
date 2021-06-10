(function(){

	const canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

	//Ширина канваса равна ширине текущего окна просмотра
	let w = canvas.width = innerWidth;
	//Высота канваса равна высоте текущего окна просмотра
	let h = canvas.height = innerHeight;

	//Настройки частиц
	let particles = [];

	//Настройки визуализации
	let properties ={
		bgColor: "rgba(17, 17, 19, 1)",//Фон
		particleColor: "rgba(255, 40, 40, 1)",//Цвет частицы
		particleRadius: 3,//Радиус окружности частицы
		particleCount: 60,//Количество частиц на канвасе
		particleMaxVelocity: 0.5,//Скорость частиц
	};

	//Добавляем канвас на страницу
	document.querySelector("body").appendChild(canvas);

	//Масштабирование канваса при изменении размеров экрана
	window.onresize = function(){

		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
	};

	class Particle{
		constructor(){
			//Расположение частицы на осях канваса
			this.x = Math.random() * w;
			this.y = Math.random() * h;

			//Скорость частиц по оси Х
			this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
			//Скорость частиц по оси У
			this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;

		}

		//Положение частиц в текущий момент
		position(){
			/*Если текущее положение по Х плюс скорость Х больше ширины и скорость по Х больше нуля.
			Или текущее положение по Х плюс скорость Х меньше нуля и скорость Х меньше нуля, то
			умножаем скорость на -1(частица начнет двигаться в обратном направлении), иначе
			оставляем все как есть*/
			this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *=-1 : this.velocityX;
			//Аналогично проверяем ось У
			this.y + this.velocityY > w && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *=-1 : this.velocityY;

			this.x += this.velocityX;
			this.y += this.velocityY;
		}

		//Отрисовка частиц на канвасе
		reDraw(){
			ctx.beginPath();//Начало

			//Значения по Х и У, радиус, окружность от нуля до полного круга
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
			ctx.closePath();//Конец
			ctx.fillStyle = properties.particleColor;//Цвет
			ctx.fill();//Заливка
		}
	}

	//Обновление фона
	function reDrawBackground(){
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0, 0, w, h);
	}

	function reDrawParticles(){
		//Проход по частицам в массиве
		for(let i in particles){
			particles[i].position();
			particles[i].reDraw();
		}
	}

	function loop(){
		//Рекурсивная функция
		reDrawBackground();//Перерисовка фона
		reDrawParticles();//Перерисовка частиц
		requestAnimationFrame(loop);
	}

	function init(){
		//Заполняем массив частиц
		for(let i = 0; i < properties.particleCount; i++){
			particles.push(new Particle);
		}
		loop();
	}

	init();
}())