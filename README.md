# Before/After with CSS and a few lines of JS

Deployment: [https://vikhri.github.io/before-after-range/](https://vikhri.github.io/before-after-range/)

### Used:
CSS variables, masks, linear gradient

## How It Works:

The markup consists of a container with 2 images and an input[type="range"].

Step 1. Position the images on the same spot inside the container. Apply grid display to the container with images. Assign grid-area 1/1 to the image sections.

```
.compare {
  position: relative;
  display: grid;

  > * {
    grid-area: 1 / 1;
  }

  > section {
    display: grid;
    place-content: center;
  }
}
```

Step 2. Convert the input into a vertical stripe. Make the input background transparent and style the controller.
```
input[type="range"] {
    z-index: 2;
    appearance: none;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  
    &::-webkit-slider-thumb {
      appearance: none;
      width: 2px;
      height: 100dvh;
      background-color: lightgray;
    }
    &::-moz-range-thumb {
      appearance: none;
      width: 2px;
      height: 100dvh;
      background-color: lightgray;
    }
  }
```
Step 3. Apply a mask to each image, which will hide a portion of the image.

```
.before {
   mask: linear-gradient(to right, #000 0, 50%, #0000 0);
}
.after {
  mask: linear-gradient(to right, #0000 0, 50%, #000 0);
}
```

The mask determines the transparency of specific areas of the element. Anything black under the mask remains visible, anything transparent becomes invisible. If you simply insert this gradient into the background property, you'll see the element divided in half, half black and half transparent.

The difference between .before and .after lies in the order of colors in the gradients. In 'before', the gradient is black up to 50%, then transparent. In 'after', it's the opposite.

Instead of using 50%, let's use a CSS variable var(--pos). By changing the --pos value, we can shift the gradient boundary in the mask.

Step 4. Change the value of the variable responsible for the gradient boundary in the mask. In JS, add an input listener, assigning the slider value to the --pos variable.

```
const range = document.getElementById("range");

range.addEventListener("input", () => {
  document.body.style.setProperty("--pos", range.value + "%");
});
```

That's it!
