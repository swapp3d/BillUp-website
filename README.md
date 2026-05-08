# BillUp – Landing Page

Landing page for **BillUp**, a household bill management app that helps users track utilities, subscriptions, and monthly expenses in one place.

Built as part of a web development coursework project.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript

---

## Project Structure

```
billup/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── burger.js
│   ├── video-autoplay.js
│   └── form-validation.js
└── assets/
├── images/
└── icons/
```

---

## Features

- Semantic HTML5 structure
- Custom typography — Montserrat Alternates + Instrument Sans (Google Fonts)
- Responsive layout using Flexbox and CSS Grid
- Mobile-first breakpoint at 768px
- Sticky navigation bar
- Burger menu with animated overlay (mobile)
- Hero section with CTA buttons
- Feature cards grid (2×2)
- "How It Works" section with Cloudinary-hosted videos (scroll-triggered autoplay)
- Testimonials grid (2 rows × 3 cards)
- CTA section with Resident and Company columns
- Compare Plans table
- Footer with newsletter signup form (with validation), navigation links, contact info, social icons, and back-to-top button
- About page with responsive layout and back button

---
## JavaScript

| File | Purpose |
|---|---|
| `burger.js` | Toggles mobile nav overlay; closes on link click; dynamically positions overlay below navbar |
| `video-autoplay.js` | Uses IntersectionObserver to play/pause step videos when 50% in viewport |
| `form-validation.js` | Validates newsletter form (name ≥ 2 chars, email requires `@` and `.com`); shows success alert and clears fields |

---

## Fonts

| Role | Font |
|---|---|
| Headings | Montserrat Alternates (Bold / SemiBold) |
| Body text | Instrument Sans (Regular) |

---

## Color Palette

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#FAC253` | Main CTA buttons |
| `--color-primary-light` | `#ffd787` | Primary button hover |
| `--color-secondary` | `#C892DF` | Secondary buttons, nav hover |
| `--color-secondary-light` | `#ebc3fc` | Secondary button hover |
| `--color-dark` | `#434343` | Headings, main text |
| `--color-text` | `#555` | Body / secondary text |
| `--color-footer-bg` | `rgba(49, 37, 54, 0.8)` | Footer background |

---

## Getting Started

No dependencies or build tools required. Just open `index.html` in a browser.

```bash
git clone https://github.com/your-username/BillUp-website.git
cd BillUp-website
open index.html
```

---

## Author

**Hlib Tretiak** – [@swapp3d](https://github.com/swapp3d)

---

## Notes

This project was created for educational purposes as part of a web development course and is not a finished product.
