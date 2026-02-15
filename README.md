# More Fragments

A Quarto Reveal.js extension that provides additional fragment animations using [Animate.css](https://animate.style/).

## Installation

```bash
quarto add emilhvitfeldt/quarto-revealjs-more-fragments
```

## Usage

Add the filter to your document's YAML header:

```yaml
---
title: "My Presentation"
format: revealjs
filters:
  - more-fragments
---
```

Then use any animation class with the `.fragment` class:

```markdown
::: {.fragment .bounceIn}
This text bounces in!
:::
```

### Inline Usage

Animations also work on inline elements:

```markdown
This sentence has a [bouncing]{.fragment .bounce} word in it.
```

## Available Animations

### Attention Seekers

These animations keep the element visible and animate when triggered:

`bounce`, `flash`, `pulse`, `rubberBand`, `shakeX`, `shakeY`, `headShake`, `swing`, `tada`, `wobble`, `jello`, `heartBeat`

### Entrance/Exit Animations

These animations show or hide elements with directional movement:

| Category | Entrances | Exits |
|----------|-----------|-------|
| Back | `backInDown`, `backInLeft`, `backInRight`, `backInUp` | `backOutDown`, `backOutLeft`, `backOutRight`, `backOutUp` |
| Bounce | `bounceIn`, `bounceInDown`, `bounceInLeft`, `bounceInRight`, `bounceInUp` | `bounceOut`, `bounceOutDown`, `bounceOutLeft`, `bounceOutRight`, `bounceOutUp` |
| Fade | `fadeIn`, `fadeInDown`, `fadeInDownBig`, `fadeInLeft`, `fadeInLeftBig`, `fadeInRight`, `fadeInRightBig`, `fadeInUp`, `fadeInUpBig`, `fadeInTopLeft`, `fadeInTopRight`, `fadeInBottomLeft`, `fadeInBottomRight` | `fadeOut`, `fadeOutDown`, `fadeOutDownBig`, `fadeOutLeft`, `fadeOutLeftBig`, `fadeOutRight`, `fadeOutRightBig`, `fadeOutUp`, `fadeOutUpBig`, `fadeOutTopLeft`, `fadeOutTopRight`, `fadeOutBottomLeft`, `fadeOutBottomRight` |
| Flip | `flipInX`, `flipInY` | `flipOutX`, `flipOutY` |
| Lightspeed | `lightSpeedInLeft`, `lightSpeedInRight` | `lightSpeedOutLeft`, `lightSpeedOutRight` |
| Rotate | `rotateIn`, `rotateInDownLeft`, `rotateInDownRight`, `rotateInUpLeft`, `rotateInUpRight` | `rotateOut`, `rotateOutDownLeft`, `rotateOutDownRight`, `rotateOutUpLeft`, `rotateOutUpRight` |
| Slide | `slideInDown`, `slideInLeft`, `slideInRight`, `slideInUp` | `slideOutDown`, `slideOutLeft`, `slideOutRight`, `slideOutUp` |
| Zoom | `zoomIn`, `zoomInDown`, `zoomInLeft`, `zoomInRight`, `zoomInUp` | `zoomOut`, `zoomOutDown`, `zoomOutLeft`, `zoomOutRight`, `zoomOutUp` |

### Specials

`flip`, `hinge`, `jackInTheBox`, `rollIn`, `rollOut`

## Reversible Fragment Behavior

All animations are fully reversible when navigating backwards through your presentation. The reverse animation is designed to **exit the way it came in**, creating a natural undo effect:

| Forward Animation | Reverse Animation | Reasoning |
|-------------------|-------------------|-----------|
| `backInDown` | `backOutUp` | Came from top, exits to top |
| `backInLeft` | `backOutRight` | Came from right, exits to right |
| `slideInDown` | `slideOutUp` | Slid down from top, slides back up |
| `zoomInLeft` | `zoomOutLeft` | Zoomed in from left, zooms back to left |
| `bounceInRight` | `bounceOutLeft` | Bounced in from left, bounces back to left |

This means if you use `backInDown`, the element will:
- **Forward**: Animate in from the top (backInDown)
- **Backward**: Animate out to the top (backOutUp)

This creates an intuitive "rewind" effect rather than a mirrored animation.

## License

MIT
