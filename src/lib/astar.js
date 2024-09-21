import { Node } from './node';
import FastPriorityQueue from 'fastpriorityqueue';

function heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, start, end) {
    const openSet = new FastPriorityQueue((a, b) => a.f < b.f); // Min-heap based on f-cost
    const closedSet = new Set(grid.closedSet.map(cell => `${cell.row},${cell.col}`)); // Initialize with grid's closedSet
    
    const startNode = new Node(start.row, start.col);
    const endNode = new Node(end.row, end.col);

    openSet.add(startNode); // Insert the start node into the priority queue

    while (!openSet.isEmpty()) {
        let currentNode = openSet.poll(); // Get the node with the lowest f-cost

        // If we reached the end node, reconstruct the path
        if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
            const path = [];
            let temp = currentNode;
            while (temp) {
                path.push({ row: temp.row, col: temp.col });
                temp = temp.parent;
            }
            return path.reverse(); // Return the path from start to end
        }

        // Add the current node to the closed set
        closedSet.add(`${currentNode.row},${currentNode.col}`);

        // Get neighbors of the current node
        const neighbors = grid.getNeighbors(currentNode.row, currentNode.col);

        for (let neighbor of neighbors) {
            const neighborKey = `${neighbor.row},${neighbor.col}`;
            
            // If the neighbor is in the closed set, skip it
            if (closedSet.has(neighborKey)) continue;

            // Calculate the gScore for this neighbor
            const isDiagonal = Math.abs(neighbor.row - currentNode.row) === 1 && Math.abs(neighbor.col - currentNode.col) === 1;
            const moveCost = isDiagonal ? 1.4 : 1;  // 1.4 for diagonal, 1 for straight
            const gScore = currentNode.g + moveCost;

            // Check if the neighbor is already in the open set
            let neighborNode = openSet.array.find(node => node.row === neighbor.row && node.col === neighbor.col);
            if (!neighborNode) {
                // If not in the open set, create a new node and add it
                neighborNode = new Node(neighbor.row, neighbor.col, gScore, heuristic(neighbor, endNode), currentNode);
                openSet.add(neighborNode);
            } else if (gScore < neighborNode.g) {
                // If it's already in the open set, but we found a better path, update it
                neighborNode.g = gScore;
                neighborNode.f = gScore + neighborNode.h;
                neighborNode.parent = currentNode;
                openSet.remove(neighborNode); // Remove the old node
                openSet.add(neighborNode); // Re-add the updated node
            }
        }
    }

    // If no path is found, return an empty array
    return [];
}
