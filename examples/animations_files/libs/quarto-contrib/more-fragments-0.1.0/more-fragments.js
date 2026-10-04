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

  // Is one of *our own* entrance/exit keyframe animations currently running
  // on this element? (Not finished/idle, and not reveal.js's own default
  // `.fragment { transition: all .2s ease }` opacity fade — that's a plain
  // CSS Transition, which also shows up in getAnimations() but only
  // CSSAnimation instances expose `animationName`, so checking for it here
  // excludes reveal's fade from counting as "live".)
  function isAnimationLive(element) {
    return element.getAnimations().some(function(a) {
      return a.animationName && (a.playState === 'running' || a.playState === 'paused');
    });
  }

  // Look up the declared opacity/transform at a @keyframes rule's own final
  // step (its true "arrived" state — e.g. backOutUp ends translated and
  // scaled away, not at identity). Interrupting mid-flight should converge
  // on the same place the animation would have settled if left to finish,
  // not a generic neutral value — otherwise a retarget toward "hidden"
  // visually looks like it's completing the *entrance* (sliding/growing
  // in) while only opacity fades, instead of continuing to retreat.
  const keyframeEndCache = {};
  function getKeyframeEndState(name) {
    if (name in keyframeEndCache) return keyframeEndCache[name];
    let result = null;
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; } // cross-origin sheets throw
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === name) {
          let best = null;
          let bestPct = -1;
          for (const kf of rule.cssRules) {
            const text = kf.keyText;
            const pct = text === 'to' ? 100 : text === 'from' ? 0 : parseFloat(text);
            if (!isNaN(pct) && pct >= bestPct) {
              bestPct = pct;
              best = kf;
            }
          }
          if (best) {
            result = {
              opacity: best.style.opacity || null,
              transform: best.style.transform || null
            };
          }
        }
      }
    }
    keyframeEndCache[name] = result;
    return result;
  }

  // Apply animation to element
  function applyAnimation(element, animationName, keepVisible) {
    const liveAnims = element.getAnimations().filter(function(a) {
      return a.animationName && (a.playState === 'running' || a.playState === 'paused');
    });

    if (liveAnims.length > 0) {
      // Mid-flight interrupt: restarting `animationName` from its first
      // keyframe (the normal path below) would snap the element straight to
      // that keyframe's value — e.g. fully visible, untransformed — before
      // playing, which is a visible pop. Instead, snapshot the live
      // computed value, cancel the stale animation, and smoothly retarget
      // via a CSS transition toward the new direction's rest state.
      const cs = getComputedStyle(element);
      const liveOpacity = cs.opacity;
      const liveTransform = cs.transform;
      liveAnims.forEach(function(a) { a.cancel(); });

      const duration = getAnimationDuration(element);

      // `cancel()` reverts computed style to the plain (non-animated)
      // cascade, which for a `.visible` fragment usually reads
      // opacity:1/transform:none — i.e. indistinguishable from the
      // animation's own *end* state. Re-freeze the live snapshot onto the
      // element immediately, before anything else touches its rendered
      // style, so if the browser paints before our own retarget transition
      // is set up, it paints the live snapshot, not a flash of "the end".
      element.style.setProperty('transition', 'none');
      element.style.setProperty('opacity', liveOpacity, 'important');
      element.style.setProperty('transform', liveTransform);
      element.style.setProperty('animation-name', 'none');

      // reveal.js has already added/removed the `visible` class (it does
      // this before firing fragmentshown/fragmenthidden) — so visibility
      // isn't animatable, and without an override the element would
      // vanish/reappear instantly regardless of how the opacity transition
      // goes. Force it visible for the duration of the retarget; cleanup
      // below restores the natural value once the transition finishes.
      element.style.setProperty('visibility', 'visible', 'important');
      void element.offsetHeight; // commit the frozen snapshot as the transition's starting point

      // Target the animation's *own* final keyframe, not a generic neutral
      // value — `animationName` is whichever direction is about to play
      // (e.g. "backOutUp" when undoing "backInDown"), and its true end
      // state is translated/scaled away, not identity. Converging on
      // identity instead would make the element look like it's completing
      // its *entrance* (sliding/growing to center) while only opacity
      // reverses, instead of continuing to retreat. Fall back to measuring
      // the stylesheet's natural value (off a detached clone, never the
      // live element, so the measurement itself can't flash the wrong
      // value onto the screen) for whichever of opacity/transform the
      // keyframe doesn't explicitly declare at its end.
      const endState = getKeyframeEndState(animationName);
      let targetOpacity = endState && endState.opacity;
      let targetTransform = endState && endState.transform;
      if (!targetOpacity || !targetTransform) {
        const probe = element.cloneNode(false);
        probe.removeAttribute('style');
        probe.style.position = 'absolute';
        probe.style.visibility = 'hidden';
        probe.style.pointerEvents = 'none';
        element.parentNode.insertBefore(probe, element);
        const naturalCs = getComputedStyle(probe);
        if (!targetOpacity) targetOpacity = naturalCs.opacity;
        if (!targetTransform) targetTransform = naturalCs.transform;
        probe.remove();
      }

      element.style.setProperty('transition', `opacity ${duration} ease, transform ${duration} ease`);
      element.style.setProperty('opacity', targetOpacity, 'important');
      element.style.setProperty('transform', targetTransform);

      element.addEventListener('transitionend', function handler() {
        element.style.removeProperty('transition');
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
        element.style.removeProperty('animation-name');
        element.style.removeProperty('animation-duration');
        element.style.removeProperty('animation-fill-mode');
        element.style.removeProperty('visibility');
        element.removeEventListener('transitionend', handler);
      }, { once: true });

      return;
    }

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

        const unitDelayMs = getUnitDelay(fragment, isWords);
        const visibleClass = isWords ? 'word-visible' : 'letter-visible';

        units.forEach(function(unit, index) {
          // A stale timer from the opposite direction's stagger schedule
          // (still pending because this unit hadn't been reached yet when
          // the direction flipped) must not be left to fire later — it
          // would show/hide the unit on its own schedule, well after this
          // navigation already decided otherwise.
          if (unit._fragTimer) {
            clearTimeout(unit._fragTimer);
            unit._fragTimer = null;
          }
          // A unit still mid-flight from a reverse interrupt must redirect
          // immediately; only idle/settled units wait their stagger turn.
          const delay = isAnimationLive(unit) ? 0 : index * unitDelayMs;
          unit._fragTimer = setTimeout(function() {
            unit._fragTimer = null;
            const animClass = getAnimationClass(unit);
            if (animClass && animationPairs[animClass]) {
              applyAnimation(unit, animClass, false);
            }
            unit.classList.add(visibleClass);
          }, delay);
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

        const unitDelayMs = getUnitDelay(fragment, isWords);
        const visibleClass = isWords ? 'word-visible' : 'letter-visible';

        const reversedUnits = [...units].reverse();

        reversedUnits.forEach(function(unit, index) {
          // See the matching comment in the fragmentshown handler — a stale
          // pending timer from the opposite direction must be cancelled
          // before scheduling this one, or it fires later unprompted.
          if (unit._fragTimer) {
            clearTimeout(unit._fragTimer);
            unit._fragTimer = null;
          }
          // A unit still mid-flight from a forward interrupt must redirect
          // immediately; only idle/settled units wait their stagger turn.
          const delay = isAnimationLive(unit) ? 0 : index * unitDelayMs;
          unit._fragTimer = setTimeout(function() {
            unit._fragTimer = null;
            const animClass = getAnimationClass(unit);
            if (animClass && animationPairs[animClass]) {
              applyAnimation(unit, animationPairs[animClass], true);
            }
            unit.classList.remove(visibleClass);
          }, delay);
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
