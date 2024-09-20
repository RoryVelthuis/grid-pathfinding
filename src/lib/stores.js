import { writable } from "svelte/store";
import { Path } from "./path";

export const playerStore = writable({
    path: new Path(),
    currentPathIndex: 0,
    progress: 0,
    shape: null,
})

// export const circleStore = writable({
//     x: 25,
//     y: 25,
//     dx: 0,
//     dy: 0,
//     color: 'red',
//     radius: 20,
// })