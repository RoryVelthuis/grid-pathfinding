<script>
    import { onMount } from 'svelte';
    
    let canvas;
    let animationFrameId;
    let ctx;

    let mousePosition = { x: 0, y: 0 };

    //Inialize canvas
    function initCanvas() {
        ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    // Animation loop
    function animate() {
        // Update and render
        update();
        render();

        // Request next frame
        animationFrameId = requestAnimationFrame(animate);
    }

    function update() {
        // Update state as needed
    }

    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw something
    }

    // Event listeners
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        mousePosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        // console.log(`Mouse Position: ${mousePosition.x}, ${mousePosition.y}`);
    }


    onMount(() => {
        console.log('Animation Canvas mounted');
        initCanvas();
        animate();

        // Handle window resize event
        window.addEventListener('resize', resizeCanvas);
        console.log('Resize event listener added');

        // Cleanup on component destroy
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            console.log('Event listeners removed');
        };

    })
</script>

<canvas bind:this={canvas} on:mousemove={handleMouseMove} ></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>