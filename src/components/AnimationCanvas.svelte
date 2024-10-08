<script>
    import { onMount } from 'svelte';
    import { initCanvas, resizeCanvas, getMousePosition } from '$lib/canvasHelpers';
    import { Circle } from '$lib/shapes';
    import { Grid } from '$lib/grid';

    import { playerStore } from '$lib/stores';
    import { Player } from '$lib/player';
    
    let canvas;
    let animationFrameId;
    let ctx;
    let mousePosition = { x: 0, y: 0 };
    let currentCell = { x: 0, y: 0 };

    const grid = new Grid(20, 20, 40, 40);

    // Create player object
    const circle = new Circle(60, 60, 15, 'red');

    // Create player object
    const player = new Player(grid, circle);

    // Animation loop
    function animate() {
        // Update and render
        update();
        render();
        // Request next frame
        animationFrameId = requestAnimationFrame(animate);
    }

    function update() {
        // Update state
        player.update();
    }

    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        grid.draw(ctx); // Draw grid
        player.path.draw(ctx, grid); // Draw path
        player.shape.draw(ctx); //Draw circle

    }

    function handleMouseMove(event) {
        mousePosition = getMousePosition(canvas, event);
        currentCell = grid.getCell(mousePosition.x, mousePosition.y);
    }

    function handleMouseClick(event) {
        // Get mouse position and calculate cell reference
        const clickPosition = getMousePosition(canvas, event);
        const clickedCell = grid.getCell(clickPosition.x, clickPosition.y);
        console.log('Clicked cell:', clickedCell.row, clickedCell.col);

        // Check if the clicked cell is within bounds
        if (clickedCell.row < 0 || clickedCell.row >= grid.rows || clickedCell.col < 0 || clickedCell.col >= grid.cols) {
            console.log('Clicked outside the grid');
            return;
        }

        // Check if the clicked cell is a closed cell
        if (grid.isClosedCell(clickedCell.row, clickedCell.col)) {
            console.log('Clicked on a closed cell');
            return;
        }

        player.PathTo(clickedCell);
    }


    onMount(() => {
        console.log('Animation Canvas mounted');

        // Initialize canvas context
        ctx = initCanvas(canvas); 
        
        //Start animation loop
        animate();

        // Handle window resize event
        window.addEventListener('resize', () => { resizeCanvas(canvas) });
        console.log('Resize event listener added');

        // Cleanup on component destroy
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            console.log('Event listeners removed');
        };

    })
</script>

<canvas bind:this={canvas} on:mousemove={handleMouseMove} on:click={handleMouseClick}></canvas>
<div class="overlay">
    <div class="grid-info infobox">
        <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
        <p>Current cell: {currentCell.row}, {currentCell.col}</p>
    </div>
    <div class="circle-info infobox">
        {#if $playerStore}
            <p>Circle position: {$playerStore.shape.x}, {$playerStore.shape.y}</p>
            <p>Circle movement: {$playerStore.shape.dx}, {$playerStore.shape.dy}</p>
            <p>Path length: {$playerStore.path.length}</p>
            <p>Current path index: { $playerStore.currentPathIndex}</p>
            <p>Cell travel progress: {$playerStore.progress}</p>
        {/if}
    </div>
</div>

<style>
    canvas {
        width: 100%;
        height: 100%;
    }

    .infobox {
        color: white;
        padding: 10px 0px;
        margin: 5px 10px;
    }

    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
    }
</style>