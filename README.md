# Smooth Scrolling Image Trail Effect

This project creates a **smooth image trail effect** where images appear and follow the user's mouse cursor inside a designated container. The images fade away after a short period, creating a dynamic visual effect. The project also includes **smooth scrolling** using the Lenis library.

## ✨ Features
- **Lenis Smooth Scrolling** for a fluid page scrolling experience.
- **Mouse Trail Effect** with dynamically appearing images.
- **Configurable Animation** (duration, easing, rotation, lifespan, etc.).
- **Optimized Performance** using `requestAnimationFrame` for smooth updates.

## 📂 Project Structure
```
project-folder/
│── assets/                # Images for the trail effect
│── index.html             # Main HTML file
│── styles.css             # Styling for the project
│── script.js              # Main JavaScript logic
│── README.md              # Project documentation (this file)
```

## 📦 Dependencies
This project uses **Lenis** for smooth scrolling.

```sh
npm install lenis
```

Alternatively, you can include Lenis via a CDN:
```html
<script src="https://unpkg.com/lenis@latest"></script>
```

## 🚀 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/repository-name.git
   cd trailImageEffect
   ```
2. **Install dependencies** (if using npm)
   ```sh
   npm install
   ```
3. **Run the project**
   Open `index.html` in a browser or use **Live Server** in VS Code.

## 🔧 Configuration
Modify animation settings inside `script.js` under the `config` object:
```js
const config = {
  imageCount: 35, // Number of available images
  imageLifespan: 750, // Time before an image is removed (ms)
  removeDelay: 50, // Delay between removing images
  mouseThreshold: 100, // Minimum distance before a new image appears
  inDuration: 750, // Fade-in duration
  outDuration: 1000, // Fade-out duration
  inEasing: "cubic-bezier(.07,.5,.5,1)",
  outEasing: "cubic-bezier(.87,0,.13,1)",
};
```

## 🖥️ Usage
- Move your mouse inside the `.trail-container` to generate image trails.
- Images will appear, rotate randomly, and disappear after a short delay.
- The effect only triggers if the mouse moves a certain distance.

## 🛠️ Code Breakdown
The main functionality is implemented in `script.js`:
1. **Detects mouse movement inside the container**.
2. **Generates an image** at the cursor position.
3. **Animates the image** (scaling & rotation effects).
4. **Removes old images** after their lifespan expires.
5. **Uses `requestAnimationFrame`** for optimized performance.

## 📸 Demo
UnAvailable
## ⚡ Future Improvements
- Add touch support for mobile devices.
- Optimize image loading and caching.
- Allow user customization via UI controls.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.


