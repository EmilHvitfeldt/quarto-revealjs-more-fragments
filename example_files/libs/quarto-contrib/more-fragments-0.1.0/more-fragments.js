// More Fragments - Direction detection for entrance/exit animation pairs

(function() {
  // Mapping of entrance animations to their exit counterparts
  const animationPairs = {
    // Back animations
    backInDown: 'backOutDown',
    backInLeft: 'backOutLeft',
    backInRight: 'backOutRight',
    backInUp: 'backOutUp',
    backOutDown: 'backInDown',
    backOutLeft: 'backInLeft',
    backOutRight: 'backInRight',
    backOutUp: 'backInUp',

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
  function applyAnimation(element, animationName) {
    // Remove any existing animation
    element.style.animationName = 'none';
    // Force reflow
    element.offsetHeight;
    // Apply new animation
    element.style.animationName = animationName;
  }

  // Wait for Reveal to be ready
  if (typeof Reveal !== 'undefined') {
    Reveal.on('ready', function() {
      initMoreFragments();
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof Reveal !== 'undefined') {
        Reveal.on('ready', function() {
          initMoreFragments();
        });
      }
    });
  }

  function initMoreFragments() {
    // Fragment shown - forward navigation
    Reveal.on('fragmentshown', function(event) {
      const fragment = event.fragment;
      const animClass = getAnimationClass(fragment);

      if (animClass && animationPairs[animClass]) {
        // Apply the forward animation (the class name itself)
        applyAnimation(fragment, animClass);
      }
    });

    // Fragment hidden - backward navigation
    Reveal.on('fragmenthidden', function(event) {
      const fragment = event.fragment;
      const animClass = getAnimationClass(fragment);

      if (animClass && animationPairs[animClass]) {
        // Apply the reverse animation
        applyAnimation(fragment, animationPairs[animClass]);
      }
    });
  }
})();
