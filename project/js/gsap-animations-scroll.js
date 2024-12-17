function setupScrollAnimation(canvas) {
  const context = canvas.getContext("2d");
  const animationWrap = canvas.closest("[animation-scroll]");

  // Validation of data attributes
  if (
    !canvas.dataset.animationScrollName ||
    !canvas.dataset.animationScrollUrl ||
    !canvas.dataset.animationScrollFrameWidth ||
    !canvas.dataset.animationScrollFrameHeight ||
    !canvas.dataset.animationScrollFrames ||
    !canvas.dataset.animationScrollFrameType
  ) {
    console.error("Missing or invalid data attributes for canvas element");
    return;
  }

  const showMarkers =
    animationWrap.getAttribute("animation-scroll") === "debbug";

  const animationName = canvas.dataset.animationScrollName;
  const animationUrl = canvas.dataset.animationScrollUrl;
  const frameWidth = parseInt(canvas.dataset.animationScrollFrameWidth, 10);
  const frameHeight = parseInt(canvas.dataset.animationScrollFrameHeight, 10);
  const frameCount = parseInt(canvas.dataset.animationScrollFrames, 10);
  const frameType = canvas.dataset.animationScrollFrameType;
  const urlPad = parseInt(canvas.dataset.animationScrollUrlPad, 10) || 4;

  const animationStart = canvas.dataset.animationScrollStart || "center bottom";
  const animationEnd = canvas.dataset.animationScrollEnd || "bottom bottom";

  const currentFrame = (index) =>
    `${animationUrl}/${(index + 1)
      .toString()
      .padStart(urlPad, "0")}.${frameType}`;

  const images = [];
  const animation = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      if (i === 0) render();
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${img.src}`);
    };
    images.push(img);
  }

  gsap.to(animation, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: animationWrap,
      scrub: 1,
      start: animationStart,
      end: animationEnd,
      markers: showMarkers,
    },
    onUpdate: render,
  });

  function render() {
    const source = images[animation.frame];
    const sourceAspectRatio = source.width / source.height;
    const wrapper = animationWrap.getBoundingClientRect();
    const wrapperAspectRatio = wrapper.width / wrapper.height;

    let bgWidth, bgHeight;

    if (sourceAspectRatio > wrapperAspectRatio) {
      bgHeight = wrapper.height;
      bgWidth = bgHeight * sourceAspectRatio;
    } else {
      bgWidth = wrapper.width;
      bgHeight = bgWidth / sourceAspectRatio;
    }

    const bgSize = `${bgWidth}px ${bgHeight}px`;
    const bgPosition = `center center`;

    animationWrap.style.backgroundImage = `url(${source.src})`;
    animationWrap.style.backgroundSize = "contain";
    animationWrap.style.backgroundPosition = "center center";
    animationWrap.style.backgroundRepeat = "no-repeat";
  }
}

document
  .querySelectorAll("[animation-scroll] canvas[data-animation-scroll-name]")
  .forEach((canvas) => {
    setupScrollAnimation(canvas);
  });

/////

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("[data-animation-scroll-video]");

  if (videos.length === 0) {
    return;
  }

  const showMarkers =
    animationWrap.getAttribute("animation-scroll") === "debbug";
  gsap.registerPlugin(ScrollTrigger);

  videos.forEach((video) => {
    const animationWrap = video.closest("[animation-scroll]");

    if (animationWrap === null) {
      console.warn(
        `Unable to find animation wrap element for video with data-animation-scroll-video="${video.dataset.animationScrollVideo}"`
      );
      return;
    }

    const animationStart =
      video.dataset.animationScrollStart || "center bottom";
    const animationEnd = video.dataset.animationScrollEnd || "bottom bottom";

    const scrollTrigger = ScrollTrigger.create({
      trigger: animationWrap,
      start: animationStart,
      end: animationEnd,
      onUpdate: (self) => {
        video.currentTime = video.duration * self.progress;
      },
      markers: showMarkers,
    });

    video.onerror = () => {
      console.error(`Failed to load video: ${video.src}`);
    };
  });
});
