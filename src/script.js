import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({ autoRaf: true });
  const container = document.querySelector(".trail-container");

  // Animation Configurations
  const config = {
    imageCount: 35,
    imageLifespan: 750, // Time before an image is removed
    removeDelay: 50, // Delay between removing images
    mouseThreshold: 10, // Min distance before a new image appears
    scrollThreshold: 50,
    idleCursorInterval: 300,
    inDuration: 750,
    outDuration: 1000,
    inEasing: "cubic-bezier(.07,.5,.5,1)",
    outEasing: "cubic-bezier(.87,0,.13,1)",
  };

  // Generate image paths dynamically
  const images = Array.from(
    { length: config.imageCount },
    (_, i) => `assets/img${i + 1}.jpeg`
  );

  // Trail array to track images
  const trail = [];
  let mouseX = 0,
    mouseY = 0,
    lastMouseX = 0,
    lastMouseY = 0;
  let isMoving = false,
    isCursorInContainer = false;
  let lastRemovalTime = 0,
    lastSteadyImageTime = 0,
    lastScrollTime = 0;
  let isScrolling = false,
    scrollTicking = false;

  // Check if mouse is inside the container
  const isInContainer = (x, y) => {
    const rect = container.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
  };

  // Set initial mouse position
  const setInitialMousePos = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    // console.log(mouseX, mouseY,lastMouseX,lastMouseY);
    isCursorInContainer = isInContainer(mouseX, mouseY);
    document.removeEventListener("mouseover", setInitialMousePos, false);
  };
  document.addEventListener("mouseover", setInitialMousePos, false);

  // Check if mouse has moved enough to trigger a new image
  const hasMovedEnough = () => {
    const distance = Math.sqrt(
      Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
    );
    console.log(mouseX,mouseY,lastMouseX,lastMouseY);
    return distance > config.mouseThreshold;
  };

  // Create a new trail image
  const createImage = () => {
    if (!isCursorInContainer) return;

    const img = document.createElement("img");
    img.classList.add("trail-img");

    const randomIndex = Math.floor(Math.random() * images.length);
    const rotation = (Math.random() - 0.5) * 50;
    img.src = images[randomIndex];

    const rect = container.getBoundingClientRect();
    const relativeX = mouseX - rect.left;
    const relativeY = mouseY - rect.top;

    img.style.left = `${relativeX}px`;
    img.style.top = `${relativeY}px`;
    img.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) scale(0)`;
    img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

    container.appendChild(img);

    setTimeout(() => {
      img.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) scale(1)`;
    }, 10);

    trail.push({
      element: img,
      rotation: rotation,
      removeTime: Date.now() + config.imageLifespan,
    });
  };

  // Remove old images after lifespan
  const removeOldImages = () => {
    const now = Date.now();
    if (trail.length === 0 || now - lastRemovalTime < config.removeDelay) return;

    const oldestImage = trail.shift(); // Remove the oldest image
    if (!oldestImage) return;

    oldestImage.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
    oldestImage.element.style.transform = `translate(-50%,-50%) rotate(${oldestImage.rotation}deg) scale(0)`;

    lastRemovalTime = now;

    setTimeout(() => {
      if (oldestImage.element.parentNode) {
        oldestImage.element.parentNode.removeChild(oldestImage.element);
      }
    }, config.outDuration);
  };

  // Track mouse movement and generate images
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isCursorInContainer = isInContainer(mouseX, mouseY);

    if (isCursorInContainer) {
      isMoving = true;
      clearTimeout(window.moveTimeout);
      window.moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
      if (hasMovedEnough()) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        createImage();
      }
    }
  });

  // Animation loop
  const animate = () => {
    removeOldImages();
    requestAnimationFrame(animate);
  };

  animate();
});
