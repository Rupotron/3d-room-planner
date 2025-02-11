# 3D Room Planner

## Overview

3D Room Planner is an interactive web-based application that allows users to visualize and organize room layouts in a 3D environment. Users can input room dimensions (in inches) and add furniture items—currently a bed and an almirah. The app converts these dimensions to meters for rendering with Three.js via React Three Fiber. Furniture items can be dragged (with movement constrained to remain inside the room) and rotated. A fixed top-view camera ensures a stable and intuitive view during interactions.

## How It Works

### Architecture

- **Frontend Framework:** React (bootstrapped with Vite for fast development)
- **3D Rendering:** [React Three Fiber](https://github.com/pmndrs/react-three-fiber) (a React renderer for Three.js)
- **3D Helpers:** [@react-three/drei](https://github.com/pmndrs/drei) (provides utilities like OrbitControls and Html)
- **Gesture Handling:** [@use-gesture/react](https://use-gesture.netlify.app/) (enables draggable interactions)

### Key Components

- **App.jsx:**  
  - Manages state for room dimensions, furniture (bed and almirah), and camera controls.
  - Provides UI controls for dimension input.
  - Renders the Three.js `<Canvas>` and integrates all other components.
  
- **Room.jsx:**  
  - Renders the 3D room including the floor and walls based on user-specified dimensions.
  - Sets the initial top-down camera view when the room mounts.
  
- **Furniture.jsx:**  
  - Renders a draggable and rotatable piece of furniture.
  - Uses the `useDrag` hook from @use-gesture/react to enable movement, with constraints to keep the furniture within the room.
  - Uses `<Html>` from @react-three/drei to render a rotation button as an overlay in the 3D scene.
  
- **CameraSetup.jsx:**  
  - Configures the camera and OrbitControls.
  - Locks the camera in a top-down view while furniture is being dragged.
  - Re-enables full camera controls after dragging stops.

### Unit Conversion

All dimensions are entered in inches and converted to meters using:
> 1 inch = 0.0254 meters

## User Interaction

- **Dragging:**  
  Drag furniture items with your mouse (or touch). Movement is constrained so that items remain inside the room boundaries.
  
- **Rotation:**  
  Click the "Rotate" button (displayed via an HTML overlay) to rotate furniture items in 90° increments.
  
- **Camera Controls:**  
  The camera starts in a fixed top-down view. When dragging furniture, rotation via OrbitControls is disabled to maintain a stable view, while zoom and pan remain active.

## Future Enhancements

- **More Furniture Options:**  
  Add additional types of furniture with detailed 3D models and realistic textures.
  
- **Save and Load Layouts:**  
  Implement functionality to save and load room configurations using localStorage or a backend service like Firebase.
  
- **Collision Detection:**  
  Introduce collision detection to prevent overlapping furniture.
  
- **Advanced UI/UX:**  
  Enhance the control panels, add responsive design improvements, and further refine the user experience.
  
- **Dynamic Resizing:**  
  Allow users to scale or resize furniture items dynamically.
  
- **AR/VR Integration:**  
  Explore augmented reality (AR) or virtual reality (VR) features for an immersive planning experience.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Rupotron/3d-room-planner.git
   cd 3d-room-planner
