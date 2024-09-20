
export function calculateDirection(vectorA, vectorB) {
    const directionX = vectorB.x - vectorA.x;
    const directionY = vectorB.y - vectorA.y;
    const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
    
    return {
        x: directionX / magnitude,
        y: directionY / magnitude
    };
}


export function normalizeVector(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (length === 0) return { x: 0, y: 0 };
    return {
        x: vector.x / length,
        y: vector.y / length
    };
}

