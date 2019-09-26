(() => {
    let canvas = document.querySelector('canvas');

    let ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    function random(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    }

    class Ball {
        constructor(x, y, velX, velY, color, size) {
            this.x = x;
            this.y = y;
            this.velX = velX;
            this.velY = velY;
            this.color = color;
            this.size = size;
        }
        draw = (ctx) => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
        update = () => {
            if ((this.x + this.size) >= width) {
                this.velX = -(this.velX);
            }

            if ((this.x - this.size) <= 0) {
                this.velX = -(this.velX);
            }

            if ((this.y + this.size) >= height) {
                this.velY = -(this.velY);
            }

            if ((this.y - this.size) <= 0) {
                this.velY = -(this.velY);
            }

            this.x += this.velX;
            this.y += this.velY;
        }
        collisionDetect = () => {
            for (var j = 0; j < balls.length; j++) {
                if (!(this === balls[j])) {
                    var dx = this.x - balls[j].x;
                    var dy = this.y - balls[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.size + balls[j].size) {
                        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                    }
                }
            }
        }
    }
    let balls = [];

    const loop = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);

        while (balls.length < 25) {
            let ball = new Ball(
                random(0, width),
                random(0, height),
                random(-7, 7),
                random(-7, 7),
                'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
                random(10, 20)
            );
            balls.push(ball);
        }

        for (var i = 0; i < balls.length; i++) {
            console.log("tests");

            balls[i].draw(ctx);
            balls[i].update();
            balls[i].collisionDetect();
        }

        requestAnimationFrame(loop);
    }
    loop();
})();