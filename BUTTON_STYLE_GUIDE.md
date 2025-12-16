# Portfolio Button Style Guide

This document explains the "Filled Contrast" button effect used in the portfolio (matching the Header Navigation).

## The Effect
A solid, high-contrast button that stands out against the background. It uses simple color shifting on hover rather than complex animations or blurs.

## Visual Characteristics
1.  **State: Default**
    *   **Background**: High contrast (`slate-900` light / `white` dark).
    *   **Text**: Inverse of background (`white` light / `black` dark).
    *   **Font**: Bold, readable.
    *   **Shadow**: Subtle, just enough to lift it (`shadow-[0_0_10px_rgba(...)]`).

2.  **State: Hover**
    *   **Background**: Slightly lighter/dimmer variation (`slate-700` light / `gray-200` dark).
    *   **Transition**: Smooth color transition.

## Logic & Classes (Tailwind CSS)

```jsx
<button className="
  /* Layout */
  px-8 py-4 rounded-full
  
  /* Colors (Adaptive Dark Mode) */
  bg-slate-900 dark:bg-white
  text-white dark:text-black
  
  /* Typography */
  font-bold text-lg
  
  /* Interactive States */
  hover:bg-slate-700 dark:hover:bg-gray-200
  transition-colors
  
  /* Shadow */
  shadow-[0_0_10px_rgba(0,0,0,0.1)] 
  dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]
">
  Button Text
</button>
```

## Why it works
*   **Clarity**: It is clearly the primary action on the page.
*   **Consistency**: Matches the top navigation bar, creating a unified visual language.
*   **Simplicity**: It doesn't distract with unnecessary motion artifacts.
