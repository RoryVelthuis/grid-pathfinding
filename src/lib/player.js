import { playerStore } from './stores';
import { calculateDirection, normalizeVector } from '$lib/vectors';
import { astar } from '$lib/astar';
import { Path } from './path.js'


export class Player {
    constructor(grid, shape) {
        this.shape = shape
        this.grid = grid
        this.path = new Path()
        this.currentPathIndex = 0
        this.progress = 0

        // Initialize the player store
        playerStore.set({
            path: this.path.points,
            currentPathIndex: this.currentPathIndex,
            progress: this.progress,
            shape: this.shape,
        });

        console.log('Player created');

    }

    PathTo(targetCell) {
        if(this.path.points.length > 0) {
            // Reset path if a new cell is clicked
            this.path.clear();
            this.currentPathIndex = 0;
        }

        console.log('Finding path');
        // Find path using A* algorithm
        const startCell = this.grid.getCell(this.shape.x, this.shape.y);
        console.log(startCell);

        const points = astar(this.grid, startCell, targetCell);
        console.log(points);

        this.path = new Path(points);
        console.log(this.path);
    }

    update() {
        if(this.path.points.length > 0) {
            if (this.currentPathIndex < this.path.points.length) {

                // Get the current and target points
                let currentPoint = this.path.points[ this.currentPathIndex];
                let targetPoint =  this.path.points[ this.currentPathIndex + 1];

                // Get the center of the current and target cells
                let currentCenter = this.grid.getCellCenter(currentPoint.row, currentPoint.col);
                let targetCenter = this.grid.getCellCenter(targetPoint.row, targetPoint.col);

                // Calculate the movement direction
                let direction = calculateDirection(currentCenter, targetCenter);
                let directionNormalized = normalizeVector(direction);
                // Scale the normalized movement vector
                const speed = 2; // Adjust speed as needed
                directionNormalized.x *= speed;
                directionNormalized.y *= speed;
                // Set the circle movement
                this.shape.setMovement(directionNormalized.x, directionNormalized.y);

                // To determine the progress of the circle between each grid cell in the path we
                // calculate the total distance between the current center and the target center
                const totalDistance = Math.sqrt(
                    (targetCenter.x - currentCenter.x) ** 2 + (targetCenter.y - currentCenter.y) ** 2
                );
                // Calculate the distance the circle has traveled from the current center
                let traveledDistance = Math.sqrt(
                    ( this.shape.x - currentCenter.x) ** 2 + ( this.shape.y - currentCenter.y) ** 2
                );
                // Compute the progress as the ratio of the traveled distance to the total distance
                this.progress = traveledDistance / totalDistance;
                
                // Apply a correction to the x or y position
                if(Math.abs( this.shape.dx) > 0 &&  this.shape.dy === 0) {
                    const distanceY = Math.abs( this.shape.y - currentCenter.y);
                    if(distanceY > 0) {
                        // Apply correction to y position
                        this.shape.y = currentCenter.y;
                    }
                }
                if(Math.abs( this.shape.dy) > 0 &&  this.shape.dx === 0) {
                    const distanceX = Math.abs( this.shape.x - currentCenter.x);
                    if(distanceX > 0) {
                        // Apply correction to x position
                        this.shape.x = currentCenter.x;
                    }
                }

                // Check if the circle has reached the target cell center
                if ( this.progress >= 1) {
                    this.currentPathIndex++; // Increment the path index
                    console.log('Next point');
                    if ( this.currentPathIndex >=  this.path.points.length - 1) {
                        // Reset path if the end is reached
                        console.log('End of path');
                        this.shape.setMovement(0,0);
                        this.path.clear();
                        this.currentPathIndex = 0;
                    }
                }
            }
        }
        // Update circle position
        this.shape.update();

        // Update the player store
        playerStore.update(player => {
            player.path = this.path.points;
            player.currentPathIndex = this.currentPathIndex;
            player.progress = this.progress;
            return player;
        });
    }
}