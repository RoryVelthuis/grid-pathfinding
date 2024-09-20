// src/lib/shapes.js
// import { circleStore } from './stores';


export class Shape {
    constructor(x=25, y=25, color, dx = 0, dy = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;

    }

    draw(ctx) {
        // Override in subclasses
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

    }

    setMovement(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    isMoving() {
        return this.dx !== 0 || this.dy !== 0;
    }

    getMovement() {
        return { dx: this.dx, dy: this.dy };
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }
}

export class Circle extends Shape {
    constructor(x, y, radius, color, dx = 0, dy = 0) {
        super(x, y, color);
        this.radius = radius;
        // this.store = circleStore;
        // this.store.set({ x, y, dx, dy, radius, color });
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        // Update state as needed
        super.update();
        // this.store.update(circle => {
        //     circle.x = this.x;
        //     circle.y = this.y;
        //     circle.dx = this.dx;
        //     circle.dy = this.dy;
        //     return circle;
        // });
    }
}