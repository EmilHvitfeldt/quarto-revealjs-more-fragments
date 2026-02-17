# quarto revealjs more-fragments

An [Quarto](https://quarto.org/) revealjs extension that uses [Animate.css](https://animate.style/) and [Magic.css](https://www.minimamente.com/project/magic/) libraries to add additional fragment animations to RevealJS presentations.

**[View Documentation & Live Examples](https://emilhvitfeldt.github.io/quarto-revealjs-more-fragments/)**

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

The header text will animate as a fragment step, while the slide content appears normally.

### Whole-Slide Animations

To animate an entire slide (header and all content together), use `.fragment-slide`:

```markdown
## Animated Slide {.fragment-slide .fadeIn}

This entire slide animates as one unit.
All content appears together with the header.
```

The slide becomes visible when navigated to, but all content (header + body) starts hidden and animates in together as one fragment step.

| Class | Effect |
|-------|--------|
| `.fragment` | Animates only the header text; content appears immediately |
| `.fragment-slide` | Animates header and content together as one fragment |

### Letter-by-Letter Animations

Animate text character by character with `.fragment-letters`:

```markdown
[Hello World]{.fragment-letters .bounceIn}
```

Each letter animates in sequence with a staggered delay, all triggered by a single fragment step.

**Speed control for letter stagger:**

```markdown
[Fast text]{.fragment-letters .fadeIn .letter-fast}
[Slow reveal]{.fragment-letters .zoomIn .letter-slower}
```

| Class | Delay Between Letters |
|-------|----------------------|
| `letter-faster` | 20ms |
| `letter-fast` | 35ms |
| (default) | 50ms |
| `letter-slow` | 80ms |
| `letter-slower` | 120ms |

You can also combine with animation speed utilities:

```markdown
[Quick bounce letters]{.fragment-letters .bounceIn .faster .letter-fast}
```

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

### Magic.css Animations

Additional animations from [Magic.css](https://www.minimamente.com/project/magic/):

| Category | Entrances | Exits |
|----------|-----------|-------|
| Bling | `puffIn`, `vanishIn` | `puffOut`, `vanishOut` |
| Perspective | `perspectiveDownReturn`, `perspectiveUpReturn`, `perspectiveLeftReturn`, `perspectiveRightReturn` | `perspectiveDown`, `perspectiveUp`, `perspectiveLeft`, `perspectiveRight` |
| Space | `spaceInDown`, `spaceInUp`, `spaceInLeft`, `spaceInRight` | `spaceOutDown`, `spaceOutUp`, `spaceOutLeft`, `spaceOutRight` |
| Boing | `boingInUp` | `boingOutDown` |
| Swash | `swashIn` | `swashOut` |
| Tin | `tinDownIn`, `tinUpIn`, `tinLeftIn`, `tinRightIn` | `tinDownOut`, `tinUpOut`, `tinLeftOut`, `tinRightOut` |

Magic.css attention seekers: `magic`, `twisterInDown`, `twisterInUp`

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
