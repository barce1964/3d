let canvas = document.getElementsByClassName('snow')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
	return Math.floor(Math.random() * max) + min;
}

function SnowDrops(x, y, endy, velocity, opacity) {

	this.x = x;
	this.y = y;
	this.endy = endy;
	this.velocity = velocity;
	this.opacity = opacity;

	this.draw = function() {
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.lineTo(this.x, this.y - this.endy);
		c.lineWidth = 5;
		c.strokeStyle= "rgba(255, 255, 255, " + this.opacity + ")";
		c.stroke();
	}

	this.update = function() {
		let snowEnd = window.innerHeight + 100;
		if (this.y >= snowEnd) {
			this.y = this.endy - 100;
		} else {
			this.y = this.y + this.velocity;
		}
		this.draw();
	}

}

let snowArray = [];

for (let i = 0; i < 140; i++) {
	let snowXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
	let snowYLocation = Math.random() * -500;
	let randomSnowHeight = randomNum(10, 2);
	let randomSpeed = randomNum(3, 2);
	let randomOpacity = Math.random() * .75;
	snowArray.push(new SnowDrops(snowXLocation, snowYLocation, randomSnowHeight, randomSpeed, randomOpacity));
}

function animateSnow() {

	requestAnimationFrame(animateSnow);
	c.clearRect(0,0, window.innerWidth, window.innerHeight);

	for (let i = 0; i < snowArray.length; i++) {
		snowArray[i].update();
	}

}

animateSnow();
