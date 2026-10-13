# Interactive Fiscal Printer: Experience Guide

## Purpose

The fiscal printer is a polished interactive easter egg in the hero. It should
feel like a believable piece of hardware that becomes a short, delightful
demonstration of EasyFuel Pro's fiscal and eTIMS capability.

The interaction must be visually strong enough for a product demonstration
without becoming distracting, obstructing the hero content, or feeling like a
generic CSS gimmick.

## Resting state

The printer is a small, floating visual accent. It is not part of the normal
document flow and must never create layout gaps or push content downward.

### Desktop

- Anchor the printer to the hero image.
- Place it at the image's lower-left edge as a small popup/easter egg.
- It should sit in the open space around the image edge rather than covering
  meaningful image content.
- Its resting position should be stable relative to the image, not relative to
  the top of the hero section or viewport.

### Mobile

- Anchor the printer to the bottom-right of the eTIMS disclaimer container.
- Keep it compact enough that the disclaimer remains readable.
- It must not cover the disclaimer text, icon, or other important controls.
- The mobile position should be independently tuned rather than being a scaled
  desktop position.

### Shared resting-state rules

- Use an absolute or equivalent overlay positioning model.
- The printer contributes zero layout height.
- The printer remains keyboard accessible and has a clear focus state.
- The resting printer should be visibly clickable without competing with the
  primary call to action.
- The provided transparent fiscal-printer asset remains the hardware visual.

## Activation

Clicking or activating the printer starts a modal-style demonstration scene.
The receipt should not grow out of the tiny resting printer in place.

The transition should be staged:

1. The resting printer responds to the interaction with a small tactile press
   or activation reaction.
2. The printer leaves its anchored resting position and smoothly travels to the
   center of the page.
3. The scene becomes the visual focus without requiring navigation.
4. Once centered, the printer performs a standard receipt-printing animation.

The printer should not teleport. The movement should be smooth, intentional,
and short enough that the user understands the relationship between the small
easter egg and the centered demonstration.

## Centered demonstration scene

The centered scene is an overlay above the page content.

- The printer is centered in the viewport or a well-defined centered stage.
- The scene should have enough visual separation from the page to be clearly
  readable.
- A subtle backdrop, blur, or scrim may be used if it improves focus, but it
  must preserve the site's visual language and should not feel like an
  intrusive full-screen dialog.
- The printer and receipt should be large enough to be visible in a product
  demonstration.
- The centered scene must remain responsive and usable on small screens.
- The page behind it must not shift.
- The interaction must not depend on hover.

## Receipt behavior

The receipt is a normal, reasonably sized thermal receipt for the centered
demonstration. It is not an extremely long receipt and not a tiny receipt
confined to the resting printer.

### Physical model

- The receipt starts at the printer's thermal output slot.
- The printed paper is anchored at the output edge.
- The first line is printed first at the thermal head.
- The paper then feeds upward as additional lines are printed.
- Line 2 follows line 1, then line 3, and so on.
- The printed content must preserve normal top-to-bottom receipt order.
- The receipt should visibly grow/feed in the direction a thermal printer feeds
  paper: the newly exposed paper is at the thermal head while older printed
  content moves away from it.
- Do not animate the receipt as one rigid rectangle scaling from the wrong
  edge.
- Do not make the lines appear to print from the bottom in reverse order.

### Visual treatment

- Use a realistic receipt width for the centered printer.
- Include a concise but credible fiscal transaction:
  - station identity
  - date/time or transaction identifier
  - pump and fuel details
  - quantity and unit price
  - subtotal/total
  - VAT or tax information
  - eTIMS validation/status
  - thank-you/footer content
- Dynamic values are welcome, but the content must remain coherent and
  readable.
- The receipt should be long enough to demonstrate feeding, but finish before
  the experience becomes tedious.
- The paper may have a subtle torn edge, paper texture, shadow, and slight
  irregularity.

## Motion and polish

The result should feel like a premium product easter egg, not a collection of
unrelated animations.

- Printer movement to center: smooth and eased.
- Printer activation: subtle mechanical response.
- Printing: visible feed cadence with a convincing thermal-head rhythm.
- Paper: slight natural flutter or wave after leaving the slot.
- Wind effects: restrained and purposeful, never noisy or distracting.
- Receipt movement: the bottom/output point remains stable while the visible
  paper body has subtle physical motion.
- Use coordinated timing so the printer arrival, print start, feed, and finish
  read as one sequence.
- Avoid excessive shaking, giant receipt lengths, or continuous movement that
  makes the content difficult to read.
- Respect `prefers-reduced-motion` by replacing travel and flutter with
  reduced or instant transitions while preserving the interaction's meaning.

## Dismissal

The centered scene remains open after printing finishes. It does not
automatically return to the resting anchor.

All of these dismissal paths should work:

1. A clearly visible close icon at the top of the centered scene.
2. Clicking the centered printer again.
3. Clicking outside the printer/receipt scene.

Dismissal should:

- remove the receipt and overlay state cleanly;
- return the printer to its original desktop/mobile anchored position;
- restore focus sensibly to the activating printer when practical;
- avoid leaving the page scrolled or visually shifted;
- remain accessible by keyboard, including Escape as a sensible enhancement.

## Responsive behavior

There are two distinct layout modes, not one position scaled down:

- Desktop resting anchor: image lower-left edge.
- Mobile resting anchor: eTIMS disclaimer bottom-right.
- Centered demonstration: responsive viewport-centered stage in both modes.

The centered receipt and printer must fit within narrow viewports without
horizontal clipping. The close control must remain reachable and visible.

## Implementation boundaries

- Keep the hero content as a server-rendered component where possible.
- Isolate state, timers, interaction handlers, and browser-only behavior in a
  focused client component.
- Use a portal or a top-level absolute overlay for the centered scene if that
  produces more reliable stacking and positioning.
- Do not use layout spacers to position the resting printer.
- Do not couple the receipt's position to the top of the hero section.
- Clean up timers and event listeners when the interaction unmounts or is
  dismissed.
- Keep the visual asset and receipt animation layers separate so the printer
  movement does not distort the paper physics.

## Acceptance checklist

- [ ] Desktop printer is small and anchored to the hero image lower-left edge.
- [ ] Mobile printer is small and anchored to the eTIMS card bottom-right.
- [ ] Resting printer never changes document layout height.
- [ ] Resting printer never obscures required content.
- [ ] Activation smoothly moves the printer to the page center.
- [ ] Centered scene is prominent and readable.
- [ ] Receipt is standard-sized and moderately long.
- [ ] Receipt prints in normal line order at a visible cadence.
- [ ] Paper feeds upward from a stable thermal output edge.
- [ ] Paper body has restrained, believable flutter.
- [ ] Close icon dismisses the scene.
- [ ] Clicking the centered printer dismisses the scene.
- [ ] Clicking outside dismisses the scene.
- [ ] Dismissal returns the printer to its responsive anchor.
- [ ] Keyboard activation and Escape work.
- [ ] Reduced-motion behavior is respected.
- [ ] Existing hero tests and production build pass.
