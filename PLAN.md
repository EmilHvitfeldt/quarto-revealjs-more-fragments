# More Fragments Extension - Implementation Plan

## Overview

Add all Animate.css animations as reversible Reveal.js fragments. Animations fall into two categories:

1. **Attention Seekers** - Element stays visible, animation plays both directions (CSS-only)
2. **Entrance/Exit Pairs** - Element appears/disappears, requires direction detection (JavaScript + CSS)

---

## Architecture

### CSS Structure

```css
/* Attention seekers - always visible, animate on trigger */
.reveal .slides section .fragment.{name} {
  opacity: unset;
  visibility: unset;
}

/* Inline elements (spans) need inline-block for animations to work */
.reveal .slides section span.fragment.{name} {
  display: inline-block;
}

.reveal .slides section .fragment.{name}.current-fragment {
  animation-name: {name};
  animation-duration: 1s;
}

/* Entrance/Exit pairs - handled via JavaScript */
.reveal .slides section .fragment.{name} {
  /* Initial hidden state handled by JS class toggling */
}
```

**Note:** Animate.css requires `display: inline-block` for inline elements. We apply this only to `span` elements to avoid affecting block-level divs created by the `:::` syntax.

### JavaScript for Direction Detection

```javascript
// Detect forward/backward navigation for entrance/exit pairs
Reveal.on('fragmentshown', function(event) {
  // Forward: apply entrance animation
});

Reveal.on('fragmenthidden', function(event) {
  // Backward: apply exit animation
});
```

---

## Implementation Checklist

### Phase 1: Attention Seekers (CSS-only, same animation both ways)

These stay visible and just animate when triggered.

- [x] bounce
- [x] flash
- [x] pulse
- [x] rubberBand
- [x] shakeX
- [x] shakeY
- [x] headShake
- [x] swing
- [x] tada
- [x] wobble
- [x] jello
- [x] heartBeat

**Add to example.qmd:**

```markdown
## Attention Seekers

::: {.fragment .bounce}
bounce
:::

::: {.fragment .flash}
flash
:::

::: {.fragment .pulse}
pulse
:::

::: {.fragment .rubberBand}
rubberBand
:::

##

::: {.fragment .shakeX}
shakeX
:::

::: {.fragment .shakeY}
shakeY
:::

::: {.fragment .headShake}
headShake
:::

::: {.fragment .swing}
swing
:::

##

::: {.fragment .tada}
tada
:::

::: {.fragment .wobble}
wobble
:::

::: {.fragment .jello}
jello
:::

::: {.fragment .heartBeat}
heartBeat
:::
```

---

### Phase 2: JavaScript Infrastructure

- [x] Create `more-fragments.js` for direction detection
- [x] Register in `more-fragments.lua` via scripts dependency
- [x] Implement `fragmentshown` event handler
- [x] Implement `fragmenthidden` event handler

---

### Phase 3: Back Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| backInDown | backInDown | backOutDown |
| backInLeft | backInLeft | backOutLeft |
| backInRight | backInRight | backOutRight |
| backInUp | backInUp | backOutUp |
| backOutDown | backOutDown | backInDown |
| backOutLeft | backOutLeft | backInLeft |
| backOutRight | backOutRight | backInRight |
| backOutUp | backOutUp | backInUp |

- [x] backInDown / backOutDown
- [x] backInLeft / backOutLeft
- [x] backInRight / backOutRight
- [x] backInUp / backOutUp
- [x] backOutDown / backInDown
- [x] backOutLeft / backInLeft
- [x] backOutRight / backInRight
- [x] backOutUp / backInUp

**Add to example.qmd:**

```markdown
## Back Entrances

::: {.fragment .backInDown}
backInDown
:::

::: {.fragment .backInLeft}
backInLeft
:::

::: {.fragment .backInRight}
backInRight
:::

::: {.fragment .backInUp}
backInUp
:::

## Back Exits

::: {.fragment .backOutDown}
backOutDown
:::

::: {.fragment .backOutLeft}
backOutLeft
:::

::: {.fragment .backOutRight}
backOutRight
:::

::: {.fragment .backOutUp}
backOutUp
:::
```

---

### Phase 4: Bouncing Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| bounceIn | bounceIn | bounceOut |
| bounceInDown | bounceInDown | bounceOutDown |
| bounceInLeft | bounceInLeft | bounceOutLeft |
| bounceInRight | bounceInRight | bounceOutRight |
| bounceInUp | bounceInUp | bounceOutUp |
| bounceOut | bounceOut | bounceIn |
| bounceOutDown | bounceOutDown | bounceInDown |
| bounceOutLeft | bounceOutLeft | bounceInLeft |
| bounceOutRight | bounceOutRight | bounceInRight |
| bounceOutUp | bounceOutUp | bounceInUp |

- [x] bounceIn / bounceOut
- [x] bounceInDown / bounceOutDown
- [x] bounceInLeft / bounceOutLeft
- [x] bounceInRight / bounceOutRight
- [x] bounceInUp / bounceOutUp
- [x] bounceOut / bounceIn
- [x] bounceOutDown / bounceInDown
- [x] bounceOutLeft / bounceInLeft
- [x] bounceOutRight / bounceInRight
- [x] bounceOutUp / bounceInUp

**Add to example.qmd:**

```markdown
## Bouncing Entrances

::: {.fragment .bounceIn}
bounceIn
:::

::: {.fragment .bounceInDown}
bounceInDown
:::

::: {.fragment .bounceInLeft}
bounceInLeft
:::

::: {.fragment .bounceInRight}
bounceInRight
:::

::: {.fragment .bounceInUp}
bounceInUp
:::

## Bouncing Exits

::: {.fragment .bounceOut}
bounceOut
:::

::: {.fragment .bounceOutDown}
bounceOutDown
:::

::: {.fragment .bounceOutLeft}
bounceOutLeft
:::

::: {.fragment .bounceOutRight}
bounceOutRight
:::

::: {.fragment .bounceOutUp}
bounceOutUp
:::
```

---

### Phase 5: Fading Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| fadeIn | fadeIn | fadeOut |
| fadeInDown | fadeInDown | fadeOutDown |
| fadeInDownBig | fadeInDownBig | fadeOutDownBig |
| fadeInLeft | fadeInLeft | fadeOutLeft |
| fadeInLeftBig | fadeInLeftBig | fadeOutLeftBig |
| fadeInRight | fadeInRight | fadeOutRight |
| fadeInRightBig | fadeInRightBig | fadeOutRightBig |
| fadeInUp | fadeInUp | fadeOutUp |
| fadeInUpBig | fadeInUpBig | fadeOutUpBig |
| fadeInTopLeft | fadeInTopLeft | fadeOutTopLeft |
| fadeInTopRight | fadeInTopRight | fadeOutTopRight |
| fadeInBottomLeft | fadeInBottomLeft | fadeOutBottomLeft |
| fadeInBottomRight | fadeInBottomRight | fadeOutBottomRight |

- [x] fadeIn / fadeOut
- [x] fadeInDown / fadeOutDown
- [x] fadeInDownBig / fadeOutDownBig
- [x] fadeInLeft / fadeOutLeft
- [x] fadeInLeftBig / fadeOutLeftBig
- [x] fadeInRight / fadeOutRight
- [x] fadeInRightBig / fadeOutRightBig
- [x] fadeInUp / fadeOutUp
- [x] fadeInUpBig / fadeOutUpBig
- [x] fadeInTopLeft / fadeOutTopLeft
- [x] fadeInTopRight / fadeOutTopRight
- [x] fadeInBottomLeft / fadeOutBottomLeft
- [x] fadeInBottomRight / fadeOutBottomRight

**Add to example.qmd:**

```markdown
## Fading Entrances

::: {.fragment .fadeIn}
fadeIn
:::

::: {.fragment .fadeInDown}
fadeInDown
:::

::: {.fragment .fadeInDownBig}
fadeInDownBig
:::

::: {.fragment .fadeInLeft}
fadeInLeft
:::

##

::: {.fragment .fadeInLeftBig}
fadeInLeftBig
:::

::: {.fragment .fadeInRight}
fadeInRight
:::

::: {.fragment .fadeInRightBig}
fadeInRightBig
:::

::: {.fragment .fadeInUp}
fadeInUp
:::

##

::: {.fragment .fadeInUpBig}
fadeInUpBig
:::

::: {.fragment .fadeInTopLeft}
fadeInTopLeft
:::

::: {.fragment .fadeInTopRight}
fadeInTopRight
:::

##

::: {.fragment .fadeInBottomLeft}
fadeInBottomLeft
:::

::: {.fragment .fadeInBottomRight}
fadeInBottomRight
:::

## Fading Exits

::: {.fragment .fadeOut}
fadeOut
:::

::: {.fragment .fadeOutDown}
fadeOutDown
:::

::: {.fragment .fadeOutDownBig}
fadeOutDownBig
:::

::: {.fragment .fadeOutLeft}
fadeOutLeft
:::

##

::: {.fragment .fadeOutLeftBig}
fadeOutLeftBig
:::

::: {.fragment .fadeOutRight}
fadeOutRight
:::

::: {.fragment .fadeOutRightBig}
fadeOutRightBig
:::

::: {.fragment .fadeOutUp}
fadeOutUp
:::

##

::: {.fragment .fadeOutUpBig}
fadeOutUpBig
:::

::: {.fragment .fadeOutTopLeft}
fadeOutTopLeft
:::

::: {.fragment .fadeOutTopRight}
fadeOutTopRight
:::

##

::: {.fragment .fadeOutBottomLeft}
fadeOutBottomLeft
:::

::: {.fragment .fadeOutBottomRight}
fadeOutBottomRight
:::
```

---

### Phase 6: Flippers

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| flip | flip | flip |
| flipInX | flipInX | flipOutX |
| flipInY | flipInY | flipOutY |
| flipOutX | flipOutX | flipInX |
| flipOutY | flipOutY | flipInY |

- [x] flip (attention seeker style)
- [x] flipInX / flipOutX
- [x] flipInY / flipOutY
- [x] flipOutX / flipInX
- [x] flipOutY / flipInY

**Add to example.qmd:**

```markdown
## Flippers

::: {.fragment .flip}
flip
:::

::: {.fragment .flipInX}
flipInX
:::

::: {.fragment .flipInY}
flipInY
:::

::: {.fragment .flipOutX}
flipOutX
:::

::: {.fragment .flipOutY}
flipOutY
:::
```

---

### Phase 7: Lightspeed

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| lightSpeedInRight | lightSpeedInRight | lightSpeedOutRight |
| lightSpeedInLeft | lightSpeedInLeft | lightSpeedOutLeft |
| lightSpeedOutRight | lightSpeedOutRight | lightSpeedInRight |
| lightSpeedOutLeft | lightSpeedOutLeft | lightSpeedInLeft |

- [x] lightSpeedInRight / lightSpeedOutRight
- [x] lightSpeedInLeft / lightSpeedOutLeft
- [x] lightSpeedOutRight / lightSpeedInRight
- [x] lightSpeedOutLeft / lightSpeedInLeft

**Add to example.qmd:**

```markdown
## Lightspeed

::: {.fragment .lightSpeedInRight}
lightSpeedInRight
:::

::: {.fragment .lightSpeedInLeft}
lightSpeedInLeft
:::

::: {.fragment .lightSpeedOutRight}
lightSpeedOutRight
:::

::: {.fragment .lightSpeedOutLeft}
lightSpeedOutLeft
:::
```

---

### Phase 8: Rotating Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| rotateIn | rotateIn | rotateOut |
| rotateInDownLeft | rotateInDownLeft | rotateOutDownLeft |
| rotateInDownRight | rotateInDownRight | rotateOutDownRight |
| rotateInUpLeft | rotateInUpLeft | rotateOutUpLeft |
| rotateInUpRight | rotateInUpRight | rotateOutUpRight |
| rotateOut | rotateOut | rotateIn |
| rotateOutDownLeft | rotateOutDownLeft | rotateInDownLeft |
| rotateOutDownRight | rotateOutDownRight | rotateInDownRight |
| rotateOutUpLeft | rotateOutUpLeft | rotateInUpLeft |
| rotateOutUpRight | rotateOutUpRight | rotateInUpRight |

- [ ] rotateIn / rotateOut
- [ ] rotateInDownLeft / rotateOutDownLeft
- [ ] rotateInDownRight / rotateOutDownRight
- [ ] rotateInUpLeft / rotateOutUpLeft
- [ ] rotateInUpRight / rotateOutUpRight
- [ ] rotateOut / rotateIn
- [ ] rotateOutDownLeft / rotateInDownLeft
- [ ] rotateOutDownRight / rotateInDownRight
- [ ] rotateOutUpLeft / rotateInUpLeft
- [ ] rotateOutUpRight / rotateInUpRight

**Add to example.qmd:**

```markdown
## Rotating Entrances

::: {.fragment .rotateIn}
rotateIn
:::

::: {.fragment .rotateInDownLeft}
rotateInDownLeft
:::

::: {.fragment .rotateInDownRight}
rotateInDownRight
:::

::: {.fragment .rotateInUpLeft}
rotateInUpLeft
:::

::: {.fragment .rotateInUpRight}
rotateInUpRight
:::

## Rotating Exits

::: {.fragment .rotateOut}
rotateOut
:::

::: {.fragment .rotateOutDownLeft}
rotateOutDownLeft
:::

::: {.fragment .rotateOutDownRight}
rotateOutDownRight
:::

::: {.fragment .rotateOutUpLeft}
rotateOutUpLeft
:::

::: {.fragment .rotateOutUpRight}
rotateOutUpRight
:::
```

---

### Phase 9: Sliding Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| slideInDown | slideInDown | slideOutDown |
| slideInLeft | slideInLeft | slideOutLeft |
| slideInRight | slideInRight | slideOutRight |
| slideInUp | slideInUp | slideOutUp |
| slideOutDown | slideOutDown | slideInDown |
| slideOutLeft | slideOutLeft | slideInLeft |
| slideOutRight | slideOutRight | slideInRight |
| slideOutUp | slideOutUp | slideInUp |

- [ ] slideInDown / slideOutDown
- [ ] slideInLeft / slideOutLeft
- [ ] slideInRight / slideOutRight
- [ ] slideInUp / slideOutUp
- [ ] slideOutDown / slideInDown
- [ ] slideOutLeft / slideInLeft
- [ ] slideOutRight / slideInRight
- [ ] slideOutUp / slideInUp

**Add to example.qmd:**

```markdown
## Sliding Entrances

::: {.fragment .slideInDown}
slideInDown
:::

::: {.fragment .slideInLeft}
slideInLeft
:::

::: {.fragment .slideInRight}
slideInRight
:::

::: {.fragment .slideInUp}
slideInUp
:::

## Sliding Exits

::: {.fragment .slideOutDown}
slideOutDown
:::

::: {.fragment .slideOutLeft}
slideOutLeft
:::

::: {.fragment .slideOutRight}
slideOutRight
:::

::: {.fragment .slideOutUp}
slideOutUp
:::
```

---

### Phase 10: Zooming Animations (Entrance/Exit Pairs)

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| zoomIn | zoomIn | zoomOut |
| zoomInDown | zoomInDown | zoomOutDown |
| zoomInLeft | zoomInLeft | zoomOutLeft |
| zoomInRight | zoomInRight | zoomOutRight |
| zoomInUp | zoomInUp | zoomOutUp |
| zoomOut | zoomOut | zoomIn |
| zoomOutDown | zoomOutDown | zoomInDown |
| zoomOutLeft | zoomOutLeft | zoomInLeft |
| zoomOutRight | zoomOutRight | zoomInRight |
| zoomOutUp | zoomOutUp | zoomInUp |

- [ ] zoomIn / zoomOut
- [ ] zoomInDown / zoomOutDown
- [ ] zoomInLeft / zoomOutLeft
- [ ] zoomInRight / zoomOutRight
- [ ] zoomInUp / zoomOutUp
- [ ] zoomOut / zoomIn
- [ ] zoomOutDown / zoomInDown
- [ ] zoomOutLeft / zoomInLeft
- [ ] zoomOutRight / zoomInRight
- [ ] zoomOutUp / zoomInUp

**Add to example.qmd:**

```markdown
## Zooming Entrances

::: {.fragment .zoomIn}
zoomIn
:::

::: {.fragment .zoomInDown}
zoomInDown
:::

::: {.fragment .zoomInLeft}
zoomInLeft
:::

::: {.fragment .zoomInRight}
zoomInRight
:::

::: {.fragment .zoomInUp}
zoomInUp
:::

## Zooming Exits

::: {.fragment .zoomOut}
zoomOut
:::

::: {.fragment .zoomOutDown}
zoomOutDown
:::

::: {.fragment .zoomOutLeft}
zoomOutLeft
:::

::: {.fragment .zoomOutRight}
zoomOutRight
:::

::: {.fragment .zoomOutUp}
zoomOutUp
:::
```

---

### Phase 11: Specials

| Fragment Class | Forward Animation | Backward Animation |
|---------------|-------------------|-------------------|
| hinge | hinge | fadeIn (no reverse) |
| jackInTheBox | jackInTheBox | zoomOut |
| rollIn | rollIn | rollOut |
| rollOut | rollOut | rollIn |

- [ ] hinge (one-way, fade back)
- [ ] jackInTheBox / zoomOut
- [ ] rollIn / rollOut
- [ ] rollOut / rollIn

**Add to example.qmd:**

```markdown
## Specials

::: {.fragment .hinge}
hinge
:::

::: {.fragment .jackInTheBox}
jackInTheBox
:::

::: {.fragment .rollIn}
rollIn
:::

::: {.fragment .rollOut}
rollOut
:::
```

---

## File Structure (Final)

```
_extensions/more-fragments/
  _extension.yml
  more-fragments.lua
  more-fragments.js      # NEW: direction detection
  more-fragments.css
  animate.min.css
```

---

## Testing

- [ ] Test all attention seekers forward/backward
- [ ] Test all entrance/exit pairs forward/backward
- [ ] Test nested fragments
- [ ] Test fragment-index ordering
- [ ] Test with different Quarto themes

---

## Notes

- Animation duration default: 1s (can be customized via CSS variables)
- Consider adding utility classes for speed: `slower`, `slow`, `fast`, `faster`
- Consider adding delay utility classes: `delay-1s`, `delay-2s`, etc.

## Documentation TODO

- [ ] Document reversible fragment naming convention: animations reverse by exiting the way they came in (e.g., `backInDown` reverses to `backOutUp`, not `backOutDown`)
