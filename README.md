# BillUp – Landing Page

Landing page for **BillUp**, a household bill management app that helps users track utilities, subscriptions, and monthly expenses in one place.

Built as part of a web development coursework project.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla, no libraries)
- Bootstrap 5.3 (local copy in `vendor/bootstrap/`)

---

## Project Structure

```
billup/
├── index.html
├── about.html
├── team.html          (Our Team: Bootstrap carousel, accordion, list group)
├── subscribed.html    (shown after a valid newsletter sign-up)
├── vendor/bootstrap/
├── css/
│   └── style.css
├── js/
│   ├── burger.js
│   ├── video-autoplay.js
│   ├── form-validation.js
│   └── subscribed.js
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
- About page: intro, "What We Stand For" cards, call-to-action and footer
- Navbar with About and Our Team links (burger menu below 900px)
- Our Team page: Bootstrap carousel of team-member cards (mouse-wheel on desktop, swipe on mobile, faded sides; photos go in `assets/images/team/member-1.jpg` … `member-6.jpg`), breadcrumb, list group and FAQ accordion
- Subscription confirmation page: personalised greeting, alert, list group and an animated redirect countdown (progress bar)

---
## JavaScript

| File | Purpose |
|---|---|
| `burger.js` | Toggles mobile nav overlay; closes on link click; dynamically positions overlay below navbar |
| `video-autoplay.js` | Uses IntersectionObserver to play/pause step videos when 50% in viewport |
| `form-validation.js` | Validates the newsletter form by format (first + last name, valid email pattern). Invalid fields are highlighted red with an inline message; valid input opens `subscribed.html` |
| `team-carousel.js` | Wheel scrolling and fade/slide mode for the team carousel, photo placeholders |
| `subscribed.js` | Reads the name/email from the URL, fades the card in (`setTimeout`) and runs the redirect countdown (`setInterval` / `clearInterval`) with a cancel/restart button |

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
