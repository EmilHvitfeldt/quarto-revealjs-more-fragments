# more-fragments

An extension that uses the [Animate.css](https://animate.style/) library to add additional fragment animations to RevealJS presentations.

## Installation

To install this extension in your current directory (or into the Quarto project that you're currently working in), use the following command:

```bash
quarto install extension EmilHvitfeldt/quarto-revealjs-more-fragments
```

## Usage

The more-fragments extension is implemented as a filter in Quarto. Once installed, using the extension is easy.

### Setup

You can enable this like:

```markdown
---
title: Simple more-fragments setup
filters:
   - _extensions/more-fragments/more-fragments.lua
---
```

> **Note:** Using the direct filter path (rather than just `- more-fragments`) enables all features including header animations.

Then use any animation class with `.fragment`:

```markdown
::: {.fragment .bounceIn}
This text bounces in!
:::
```

Animations also work on inline elements:

```markdown
This sentence has a [bouncing]{.fragment .bounce} word in it.
```

### Header Animations

You can animate slide headers as fragments:

```markdown
## My Animated Title {.fragment .bounceIn}

Content that appears after the header animates in.
```

Speed utilities work on headers too:

```markdown
## Fast Header {.fragment .zoomIn .faster}
```

The header text will animate as a fragment step, while the slide itself appears normally.

For full documentation and examples, visit the [documentation site](https://emilhvitfeldt.github.io/quarto-revealjs-more-fragments/).

## Available Animations

### Attention Seekers

`bounce`, `flash`, `pulse`, `rubberBand`, `shakeX`, `shakeY`, `headShake`, `swing`, `tada`, `wobble`, `jello`, `heartBeat`

### Entrance/Exit Animations

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

## Speed Utilities

Control animation speed by adding a speed class:

| Class | Duration |
|-------|----------|
| `slower` | 3s |
| `slow` | 2s |
| (default) | 1s |
| `fast` | 800ms |
| `faster` | 500ms |

```markdown
::: {.fragment .bounceIn .fast}
This bounces in quickly!
:::
```

## Reversible Fragment Behavior

All animations are fully reversible when navigating backwards. The reverse animation **exits the way it came in**:

| Forward | Reverse | Reasoning |
|---------|---------|-----------|
| `backInDown` | `backOutUp` | Came from top, exits to top |
| `slideInLeft` | `slideOutLeft` | Slid in from left, slides back to left |

This creates an intuitive "rewind" effect rather than a mirrored animation.
