
export class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.closedSet = [ 
                            { row: 4, col: 6 }, { row: 4, col: 7 }, { row: 4, col: 8 }, { row: 4, col: 8 },
                            { row: 5, col: 6 }, { row: 6, col: 6 }, { row: 7, col: 6 }, { row: 8, col: 6 },
                         ];
    }

    draw(ctx) {
        ctx.beginPath();
        for (let i = 0; i <= this.rows; i++) {
            ctx.moveTo(0, i * this.cellSize);
            ctx.lineTo(this.cols * this.cellSize, i * this.cellSize);
        }

        for (let i = 0; i <= this.cols; i++) {
            ctx.moveTo(i * this.cellSize, 0);
            ctx.lineTo(i * this.cellSize, this.rows * this.cellSize);
        }

        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'black';
        this.closedSet.forEach(cell => {
            const x = cell.col * this.cellSize;
            const y = cell.row * this.cellSize;
            ctx.fillRect(x, y, this.cellSize, this.cellSize);
        });
    }

    isClosedCell(row, col) {
        return this.closedSet.some(cell => cell.row === row && cell.col === col);
    }

    getCell(x, y) {
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        return { row, col };
    }

    getCellCenter(row, col) {
        const x = col * this.cellSize + this.cellSize / 2;
        const y = row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    getNeighbors(row, col) {
        return [
            { row: row - 1, col },     // Up
            { row: row + 1, col },     // Down
            { row, col: col - 1 },     // Left
            { row, col: col + 1 },     // Right
            { row: row - 1, col: col - 1 },  // Diagonal top-left
            { row: row - 1, col: col + 1 },  // Diagonal top-right
            { row: row + 1, col: col - 1 },  // Diagonal bottom-left
            { row: row + 1, col: col + 1 },  // Diagonal bottom-right
        ];
        // const neighbors = [];
        // if (row > 0) neighbors.push({ row: row - 1, col });
        // if (row < this.rows - 1) neighbors.push({ row: row + 1, col });
        // if (col > 0) neighbors.push({ row, col: col - 1 });
        // if (col < this.cols - 1) neighbors.push({ row, col: col + 1 });
        // return neighbors;
    }
}