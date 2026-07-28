# Motion Audit: Dragon-Ball-Api (API Explorer)

## 1. Existing Motion Grep Analysis
* **Grep Hits**: 1 file (`index.html`) with basic `transition: all 0.15s ease` on buttons.
* **Missing Animations**: Hero section entrance, endpoint card reveal choreography, interactive request runner output transition, status code badge pop animation.

## 2. High-Value Targeted Additions
* **Library / Strategy**: Pure CSS `@keyframes` + Vanilla JS `IntersectionObserver` (Zero external bundle overhead for static HTML).
* **Target Interactions**:
  1. Hero banner reveal animation (`@keyframes fadeSlideDown`).
  2. Endpoint cards staggered reveal on load and scroll into view.
  3. Interactive request sandbox runner response panel morph & status badge count/pulse.
  4. Copy button feedback ripple & tick mark transition.
* **Accessibility**: Respect `prefers-reduced-motion: reduce`.
