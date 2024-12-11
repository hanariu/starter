import {
  computePosition,
  autoUpdate,
  hide,
  flip,
  offset,
  shift,
  arrow,
} from "@floating-ui/dom";

import type { Placement } from '@floating-ui/dom'

import Alpine from 'alpinejs'

const useAnchor = () => {
  Alpine.magic("anchor", (el: any) => {
    if (!el._x_anchor)
      throw "Alpine: No x-anchor directive found on element using $anchor...";

    return el._x_anchor;
  });

  Alpine.interceptClone((from: any, to: any) => {
    if (from && from._x_anchor && !to._x_anchor) {
      to._x_anchor = from._x_anchor;
    }
  });

  Alpine.directive(
    "anchor",
    Alpine.skipDuringClone(
      (el: any, { expression, modifiers }, { cleanup, evaluate }) => {
        let { placement, offsetValue, unstyled } = getOptions(modifiers);

        el._x_anchor = Alpine.reactive({ x: 0, y: 0 });

        let reference = evaluate(expression) as any;

        if (!reference) throw "Alpine: no element provided to x-anchor...";

        let compute = () => {
          let previousValue: any;
          const aEl = el.querySelector("[data-arrow]");
          computePosition(reference, el, {
            placement,
            middleware: [
              flip(),
              shift({ padding: 5 }),
              offset(offsetValue),
              arrow({ element: aEl }),
              hide()
            ],
          }).then(({ x, y, middlewareData, placement }) => {
            unstyled || setStyles(el, x, y);
            // Only trigger Alpine reactivity when the value actually changes...
            if (JSON.stringify({ x, y }) !== previousValue) {
              if (middlewareData.hide) {
                const { referenceHidden } = middlewareData.hide;

                Object.assign(el.style, {
                  visibility: referenceHidden ? "hidden" : "visible",
                });
              }
              el._x_anchor.x = x;
              el._x_anchor.y = y;
              Object.assign(el.style, {
                left: `${x}px`,
                top: `${y}px`
              })
              const { x: arrowX, y: arrowY } = middlewareData.arrow as {
                x: number
                y: number
              }
              const opposideSide = {
                left: 'right',
                right: 'left',
                bottom: 'top',
                top: 'bottom'
              }[placement.split('-')[0]] as string
    
              Object.assign(aEl.style, {
                left: arrowX ? `${arrowX}px` : '',
                top: arrowY ? `${arrowY}px` : '',
                bottom: '',
                right: '',
                [opposideSide]: '-4px'
              })

              aEl.classList.remove("border-r")
              aEl.classList.remove("border-b")
              aEl.classList.remove("border-l")
              aEl.classList.remove("border-t")
              const np = placement.split('-')[0]
              switch (np) {
                case "top":
                  aEl.classList.add("border-r")
                  aEl.classList.add("border-b")
                  break;
                case "bottom":
                  aEl.classList.add("border-l")
                  aEl.classList.add("border-t")
                  break;
                case "left":
                  aEl.classList.add("border-t")
                  aEl.classList.add("order-r")
                  break;
                case "right":
                  aEl.classList.add("border-b")
                  aEl.classList.add("border-l")
                  break;
              }
            }

            previousValue = JSON.stringify({ x, y });
          });
        };

        let release = autoUpdate(reference, el, () => compute());

        cleanup(() => release());
      },

      // When cloning (or "morphing"), we will graft the style and position data from the live tree...
      (el, { modifiers}) => {
        let { unstyled } = getOptions(modifiers);

        if (el._x_anchor) {
          unstyled || setStyles(el, el._x_anchor.x, el._x_anchor.y);
        }
      }
    )
  );
}

function setStyles(el: any, x: any, y: any) {
  Object.assign(el.style, {
    left: x + "px",
    top: y + "px",
    position: "absolute",
  });
}

function getOptions(modifiers: any) {
  let positions = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ];
  let placement = positions.find((i) => modifiers.includes(i)) as Placement;
  let offsetValue = 0;
  if (modifiers.includes("offset")) {
    let idx = modifiers.findIndex((i:any) => i === "offset");

    offsetValue =
      modifiers[idx + 1] !== undefined
        ? Number(modifiers[idx + 1])
        : offsetValue;
  }
  let unstyled = modifiers.includes("no-style");

  return { placement, offsetValue, unstyled };
}


export default useAnchor