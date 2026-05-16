// More Fragments - Direction detection for entrance/exit animation pairs

(function() {
  // ==========================================================================
  // Letter-by-Letter Animation Configuration
  // ==========================================================================

  const LETTER_DELAY_MS = 50;  // Default delay between letters
  const WORD_DELAY_MS = 150;   // Default delay between words

  // Speed classes (letter-*) map to different delay tables for letters vs words,
  // so that "slow"/"slower" actually slow each mode down relative to its default.
  const LETTER_DELAYS = {
    'letter-faster': 20,
    'letter-fast': 35,
    'letter-slow': 80,
    'letter-slower': 120
  };

  const WORD_DELAYS = {
    'letter-faster': 60,
    'letter-fast': 100,
    'letter-slow': 250,
    'letter-slower': 400
  };

  // Get delay for a letter/word fragment
  function getUnitDelay(element, isWords) {
    const table = isWords ? WORD_DELAYS : LETTER_DELAYS;
    for (const [cls, delay] of Object.entries(table)) {
      if (element.classList.contains(cls)) {
        return delay;
      }
    }
    return isWords ? WORD_DELAY_MS : LETTER_DELAY_MS;
  }

  // Check if this is a letter or word container fragment
  function isLetterContainer(element) {
    return element.classList.contains('letter-container');
  }
  function isWordContainer(element) {
    return element.classList.contains('word-container');
  }
  function isUnitContainer(element) {
    return isLetterContainer(element) || isWordContainer(element);
  }

  // Get all units (letters or words) in a container, sorted by index
  function getUnitsInContainer(container) {
    const isWords = isWordContainer(container);
    const unitSelector = isWords ? '.word-char' : '.letter-char';
    const indexAttr = isWords ? 'data-word-index' : 'data-letter-index';
    const units = Array.from(container.querySelectorAll(unitSelector));

    units.sort((a, b) => {
      const aIdx = parseInt(a.getAttribute(indexAttr) || '0');
      const bIdx = parseInt(b.getAttribute(indexAttr) || '0');
      return aIdx - bIdx;
    });

    return units;
  }

  // ==========================================================================
  // Animation Pairs Configuration
  // ==========================================================================

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

    // Bouncing animations (reverse direction: exit the way it came in)
    bounceIn: 'bounceOut',
    bounceInDown: 'bounceOutUp',
    bounceInLeft: 'bounceOutRight',
    bounceInRight: 'bounceOutLeft',
    bounceInUp: 'bounceOutDown',
    bounceOut: 'bounceIn',
    bounceOutDown: 'bounceInUp',
    bounceOutLeft: 'bounceInRight',
    bounceOutRight: 'bounceInLeft',
    bounceOutUp: 'bounceInDown',

    // Fading animations (reverse direction: exit the way it came in)
    fadeIn: 'fadeOut',
    fadeInDown: 'fadeOutUp',
    fadeInDownBig: 'fadeOutUpBig',
    fadeInLeft: 'fadeOutLeft',
    fadeInLeftBig: 'fadeOutLeftBig',
    fadeInRight: 'fadeOutRight',
    fadeInRightBig: 'fadeOutRightBig',
    fadeInUp: 'fadeOutDown',
    fadeInUpBig: 'fadeOutDownBig',
    fadeInTopLeft: 'fadeOutTopLeft',
    fadeInTopRight: 'fadeOutTopRight',
    fadeInBottomLeft: 'fadeOutBottomLeft',
    fadeInBottomRight: 'fadeOutBottomRight',
    fadeOut: 'fadeIn',
    fadeOutDown: 'fadeInUp',
    fadeOutDownBig: 'fadeInUpBig',
    fadeOutLeft: 'fadeInLeft',
    fadeOutLeftBig: 'fadeInLeftBig',
    fadeOutRight: 'fadeInRight',
    fadeOutRightBig: 'fadeInRightBig',
    fadeOutUp: 'fadeInDown',
    fadeOutUpBig: 'fadeInDownBig',
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
    // Sliding animations (reverse direction: exit the way it came in)
    slideInDown: 'slideOutUp',
    slideInLeft: 'slideOutLeft',
    slideInRight: 'slideOutRight',
    slideInUp: 'slideOutDown',
    slideOutDown: 'slideInUp',
    slideOutLeft: 'slideInLeft',
    slideOutRight: 'slideInRight',
    slideOutUp: 'slideInDown',

    // Zooming animations
    // Zooming animations (reverse direction: exit the way it came in)
    zoomIn: 'zoomOut',
    zoomInDown: 'zoomOutUp',
    zoomInLeft: 'zoomOutLeft',
    zoomInRight: 'zoomOutRight',
    zoomInUp: 'zoomOutDown',
    zoomOut: 'zoomIn',
    zoomOutDown: 'zoomInUp',
    zoomOutLeft: 'zoomInLeft',
    zoomOutRight: 'zoomInRight',
    zoomOutUp: 'zoomInDown',

    // Specials
    jackInTheBox: 'zoomOut',
    rollIn: 'rollOut',
    rollOut: 'rollIn',
    hinge: 'fadeIn',

    // ==========================================================================
    // Magic.css Animations
    // ==========================================================================

    // Magic.css - Bling
    puffIn: 'puffOut',
    puffOut: 'puffIn',
    vanishIn: 'vanishOut',
    vanishOut: 'vanishIn',

    // Magic.css - Perspective
    perspectiveDown: 'perspectiveDownReturn',
    perspectiveUp: 'perspectiveUpReturn',
    perspectiveLeft: 'perspectiveLeftReturn',
    perspectiveRight: 'perspectiveRightReturn',
    perspectiveDownReturn: 'perspectiveDown',
    perspectiveUpReturn: 'perspectiveUp',
    perspectiveLeftReturn: 'perspectiveLeft',
    perspectiveRightReturn: 'perspectiveRight',

    // Magic.css - Space
    spaceInDown: 'spaceOutDown',
    spaceInUp: 'spaceOutUp',
    spaceInLeft: 'spaceOutLeft',
    spaceInRight: 'spaceOutRight',
    spaceOutDown: 'spaceInDown',
    spaceOutUp: 'spaceInUp',
    spaceOutLeft: 'spaceInLeft',
    spaceOutRight: 'spaceInRight',

    // Magic.css - Boing
    boingInUp: 'boingOutDown',
    boingOutDown: 'boingInUp',

    // Magic.css - Swash
    swashIn: 'swashOut',
    swashOut: 'swashIn',

    // Magic.css - Tin
    tinDownIn: 'tinDownOut',
    tinUpIn: 'tinUpOut',
    tinLeftIn: 'tinLeftOut',
    tinRightIn: 'tinRightOut',
    tinDownOut: 'tinDownIn',
    tinUpOut: 'tinUpIn',
    tinLeftOut: 'tinLeftIn',
    tinRightOut: 'tinRightIn',

    // Magic.css - Attention seekers (replay same animation)
    magic: 'magic',
    twisterInDown: 'twisterInDown',
    twisterInUp: 'twisterInUp'
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

  // Get animation duration based on speed utility class
  function getAnimationDuration(element) {
    if (element.classList.contains('slower')) return '3s';
    if (element.classList.contains('slow')) return '2s';
    if (element.classList.contains('fast')) return '800ms';
    if (element.classList.contains('faster')) return '500ms';
    return '1s';
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
    element.style.setProperty('animation-duration', getAnimationDuration(element), 'important');
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

  // Get all fragments with the same index in the current slide
  function getFragmentsWithSameIndex(fragment) {
    const index = fragment.getAttribute('data-fragment-index');
    if (index === null) return [fragment];

    const slide = fragment.closest('section');
    if (!slide) return [fragment];

    return Array.from(slide.querySelectorAll(`.fragment[data-fragment-index="${index}"]`));
  }

  function initMoreFragments() {
    // Fragment shown - forward navigation
    Reveal.on('fragmentshown', function(event) {
      const fragment = event.fragment;

      // Handle letter-by-letter or word-by-word animations (container-based)
      if (isUnitContainer(fragment)) {
        const isWords = isWordContainer(fragment);
        const units = getUnitsInContainer(fragment);
        if (units.length === 0) return;

        const delay = getUnitDelay(fragment, isWords);
        const visibleClass = isWords ? 'word-visible' : 'letter-visible';

        units.forEach(function(unit, index) {
          setTimeout(function() {
            const animClass = getAnimationClass(unit);
            if (animClass && animationPairs[animClass]) {
              applyAnimation(unit, animClass, false);
            }
            unit.classList.add(visibleClass);
          }, index * delay);
        });
        return;
      }

      // Handle regular fragments
      const fragments = getFragmentsWithSameIndex(fragment);

      fragments.forEach(function(frag) {
        const animClass = getAnimationClass(frag);
        if (animClass && animationPairs[animClass]) {
          applyAnimation(frag, animClass, false);
        }
      });
    });

    // Fragment hidden - backward navigation
    Reveal.on('fragmenthidden', function(event) {
      const fragment = event.fragment;

      // Handle letter-by-letter or word-by-word animations (reverse order)
      if (isUnitContainer(fragment)) {
        const isWords = isWordContainer(fragment);
        const units = getUnitsInContainer(fragment);
        if (units.length === 0) return;

        const delay = getUnitDelay(fragment, isWords);
        const visibleClass = isWords ? 'word-visible' : 'letter-visible';

        const reversedUnits = [...units].reverse();

        reversedUnits.forEach(function(unit, index) {
          setTimeout(function() {
            const animClass = getAnimationClass(unit);
            if (animClass && animationPairs[animClass]) {
              applyAnimation(unit, animationPairs[animClass], true);
            }
            unit.classList.remove(visibleClass);
          }, index * delay);
        });
        return;
      }

      // Handle regular fragments
      const fragments = getFragmentsWithSameIndex(fragment);

      fragments.forEach(function(frag) {
        const animClass = getAnimationClass(frag);
        if (animClass && animationPairs[animClass]) {
          applyAnimation(frag, animationPairs[animClass], true);
        }
      });
    });
  }
})();
