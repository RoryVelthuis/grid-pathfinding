export class Path {
    constructor(points=[]) {
        this.points = points;
    }

    draw(ctx, grid) {
        if(this.points.length > 0) {
            ctx.strokeStyle = 'Green';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 0; i < this.points.length; i++) {
                const cell = this.points[i];
                const cellCenter = grid.getCellCenter(cell.row, cell.col);
                ctx.lineTo(cellCenter.x, cellCenter.y);
            }

            ctx.stroke();
        }
    }

    clear() {
        this.points = [];
    }

    length() {
        return this.points.length;
    }



}

export default Path;