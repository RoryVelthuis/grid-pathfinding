// src/lib/astar.js

import { Node } from './node';

function heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, start, end) {
    const openSet = [];
    const closedSet = new Set();
    const startNode = new Node(start.row, start.col);
    const endNode = new Node(end.row, end.col);

    openSet.push(startNode);

    while (openSet.length > 0) {
        // Get the node with the lowest f-cost
        let currentNode = openSet.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));

        // If we reached the end node, reconstruct the path
        if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
            const path = [];
            let temp = currentNode;
            while (temp) {
                path.push({ row: temp.row, col: temp.col });
                temp = temp.parent;
            }
            return path.reverse();
        }

        // Remove current node from open set and add to closed set
        openSet.splice(openSet.indexOf(currentNode), 1);
        closedSet.add(`${currentNode.row},${currentNode.col}`);

        // Get neighbors
        const neighbors = grid.getNeighbors(currentNode.row, currentNode.col);

        for (let neighbor of neighbors) {
            if (closedSet.has(`${neighbor.row},${neighbor.col}`)) {
                continue;
            }

            const gScore = currentNode.g + 1; // Assuming each move has a cost of 1

            let neighborNode = openSet.find(node => node.row === neighbor.row && node.col === neighbor.col);
            if (!neighborNode) {
                neighborNode = new Node(neighbor.row, neighbor.col, gScore, heuristic(neighbor, endNode), currentNode);
                openSet.push(neighborNode);
            } else if (gScore < neighborNode.g) {
                neighborNode.g = gScore;
                neighborNode.f = gScore + neighborNode.h;
                neighborNode.parent = currentNode;
            }
        }
    }

    // No path found
    return [];
}