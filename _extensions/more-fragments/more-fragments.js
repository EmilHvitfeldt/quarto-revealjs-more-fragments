// More Fragments - Direction detection for entrance/exit animation pairs

(function() {
  // Mapping of entrance animations to their exit counterparts
  const animationPairs = {
    // Back animations (reverse direction: exit the way it came in)
    backInDown: 'backOutUp',
    backInLeft: 'backOutRight',
    backInRight: 'backOutLeft',
    backInUp: 'backOutDown',
    backOutDown: 'backInUp',
    backOutLeft: 'backInRight',
    backOutRight: 'backInLeft',
    backOutUp: 'backInDown',

    // Bouncing animations
    bounceIn: 'bounceOut',
    bounceInDown: 'bounceOutDown',
    bounceInLeft: 'bounceOutLeft',
    bounceInRight: 'bounceOutRight',
    bounceInUp: 'bounceOutUp',
    bounceOut: 'bounceIn',
    bounceOutDown: 'bounceInDown',
    bounceOutLeft: 'bounceInLeft',
    bounceOutRight: 'bounceInRight',
    bounceOutUp: 'bounceInUp',

    // Fading animations
    fadeIn: 'fadeOut',
    fadeInDown: 'fadeOutDown',
    fadeInDownBig: 'fadeOutDownBig',
    fadeInLeft: 'fadeOutLeft',
    fadeInLeftBig: 'fadeOutLeftBig',
    fadeInRight: 'fadeOutRight',
    fadeInRightBig: 'fadeOutRightBig',
    fadeInUp: 'fadeOutUp',
    fadeInUpBig: 'fadeOutUpBig',
    fadeInTopLeft: 'fadeOutTopLeft',
    fadeInTopRight: 'fadeOutTopRight',
    fadeInBottomLeft: 'fadeOutBottomLeft',
    fadeInBottomRight: 'fadeOutBottomRight',
    fadeOut: 'fadeIn',
    fadeOutDown: 'fadeInDown',
    fadeOutDownBig: 'fadeInDownBig',
    fadeOutLeft: 'fadeInLeft',
    fadeOutLeftBig: 'fadeInLeftBig',
    fadeOutRight: 'fadeInRight',
    fadeOutRightBig: 'fadeInRightBig',
    fadeOutUp: 'fadeInUp',
    fadeOutUpBig: 'fadeInUpBig',
    fadeOutTopLeft: 'fadeInTopLeft',
    fadeOutTopRight: 'fadeInTopRight',
    fadeOutBottomLeft: 'fadeInBottomLeft',
    fadeOutBottomRight: 'fadeInBottomRight',

    // Flippers
    flipInX: 'flipOutX',
    flipInY: 'flipOutY',
    flipOutX: 'flipInX',
    flipOutY: 'flipInY',

    // Lightspeed
    lightSpeedInRight: 'lightSpeedOutRight',
    lightSpeedInLeft: 'lightSpeedOutLeft',
    lightSpeedOutRight: 'lightSpeedInRight',
    lightSpeedOutLeft: 'lightSpeedInLeft',

    // Rotating animations
    rotateIn: 'rotateOut',
    rotateInDownLeft: 'rotateOutDownLeft',
    rotateInDownRight: 'rotateOutDownRight',
    rotateInUpLeft: 'rotateOutUpLeft',
    rotateInUpRight: 'rotateOutUpRight',
    rotateOut: 'rotateIn',
    rotateOutDownLeft: 'rotateInDownLeft',
    rotateOutDownRight: 'rotateInDownRight',
    rotateOutUpLeft: 'rotateInUpLeft',
    rotateOutUpRight: 'rotateInUpRight',

    // Sliding animations
    slideInDown: 'slideOutDown',
    slideInLeft: 'slideOutLeft',
    slideInRight: 'slideOutRight',
    slideInUp: 'slideOutUp',
    slideOutDown: 'slideInDown',
    slideOutLeft: 'slideInLeft',
    slideOutRight: 'slideInRight',
    slideOutUp: 'slideInUp',

    // Zooming animations
    zoomIn: 'zoomOut',
    zoomInDown: 'zoomOutDown',
    zoomInLeft: 'zoomOutLeft',
    zoomInRight: 'zoomOutRight',
    zoomInUp: 'zoomOutUp',
    zoomOut: 'zoomIn',
    zoomOutDown: 'zoomInDown',
    zoomOutLeft: 'zoomInLeft',
    zoomOutRight: 'zoomInRight',
    zoomOutUp: 'zoomInUp',

    // Specials
    jackInTheBox: 'zoomOut',
    rollIn: 'rollOut',
    rollOut: 'rollIn',
    hinge: 'fadeIn'
  };

  // Get all animation class names
  const allAnimations = Object.keys(animationPairs);

  // Find which animation class an element has
  function getAnimationClass(element) {
    for (const anim of allAnimations) {
      if (element.classList.contains(anim)) {
        return anim;
      }
    }
    return null;
  }

  // Apply animation to element
  function applyAnimation(element, animationName, keepVisible) {
    // Remove any existing animation
    element.style.setProperty('animation-name', 'none');

    // If keepVisible, force the element to stay visible during animation
    if (keepVisible) {
      element.style.setProperty('opacity', '1', 'important');
      element.style.setProperty('visibility', 'visible', 'important');
    }

    // Force reflow
    element.offsetHeight;

    // Apply new animation
    element.style.setProperty('animation-name', animationName, 'important');
    element.style.setProperty('animation-duration', '1s', 'important');
    element.style.setProperty('animation-fill-mode', 'both', 'important');

    // If keepVisible, clean up after animation ends
    if (keepVisible) {
      element.addEventListener('animationend', function handler() {
        element.style.removeProperty('opacity');
        element.style.removeProperty('visibility');
        element.style.removeProperty('animation-name');
        element.style.removeProperty('animation-duration');
        element.style.removeProperty('animation-fill-mode');
        element.removeEventListener('animationend', handler);
      });
    }
  }

  // Wait for Reveal to be ready
  function setupReveal() {
    if (typeof Reveal !== 'undefined') {
      // Check if Reveal is already initialized
      if (Reveal.isReady()) {
        initMoreFragments();
      } else {
        Reveal.on('ready', function() {
          initMoreFragments();
        });
      }
    }
  }

  if (document.readyState === 'complete') {
    setupReveal();
  } else {
    window.addEventListener('load', setupReveal);
  }

  function initMoreFragments() {
    // Fragment shown - forward navigation
    Reveal.on('fragmentshown', function(event) {
      const fragment = event.fragment;
      const animClass = getAnimationClass(fragment);

      if (animClass && animationPairs[animClass]) {
        applyAnimation(fragment, animClass, false);
      }
    });

    // Fragment hidden - backward navigation
    Reveal.on('fragmenthidden', function(event) {
      const fragment = event.fragment;
      const animClass = getAnimationClass(fragment);

      if (animClass && animationPairs[animClass]) {
        applyAnimation(fragment, animationPairs[animClass], true);
      }
    });
  }
})();
