# Pathfinding on a Grid

This project is built using Svelte and implements pathfinding algorithms on a grid using the HTML canvas. It features an `AnimationCanvas` component that facilitates animations by implementing an update and render loop. The project uses the A* pathfinding algorithm to find the shortest path along a grid with obstacles. Additionally, it is interactive, allowing the user to move a player object along the grid using the mouse to find a path.

## Features

- **`AnimationCanvas` Component**
    - Update loop for continuous animation
    - Render loop for drawing frames
- **Pathfinding Algorithms**
    - A* Pathfinding algorithm
        - Implements corner cutting logic
        - Implemnts tie breaking with goal-oriented priority
- **Grid-Based Layout**
    - Dynamic grid management
- **Interactive Canvas**
    - Mouse position tracking for interaction



## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Installation commands:

1. Clone the repository:
    ```bash
    git clone https://github.com/RoryVelthuis/grid-pathfinding.git
    ```
2. Navigate to the project directory:
    ```bash
    cd grid-pathfinding
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
    

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.