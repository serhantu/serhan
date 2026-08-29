# Frontend Engineering Rules — Serhan Turizm

> **Permanent convention.** Any future coding agent modifying frontend code in
> this repository MUST read this file first. These rules are mandatory for all
> frontend code, including changes during later feature phases.

---

## 1. Styling & Frameworks

- **Vanilla Extract ONLY.** All component styling uses `*.css.ts` files.
- **No Tailwind.**
- **No inline styles** (`style={{ ... }}` on elements is strictly forbidden).
- **No CSS Modules** (`.module.css`).
- **No styled-components, Emotion, or any runtime CSS-in-JS.**
- Global CSS is limited to reset, base HTML element styles, CSS variables / tokens, and truly global styles. Component-specific styling NEVER goes in global CSS.
- All design tokens live in `styles/tokens.css.ts` and are consumed via the exported `vars` and `breakpoints` objects.

---

## 2. Modern CSS & Logical Properties (Standard)

- **Logical properties over physical properties:**
  - `inline-size` and `max-inline-size` (instead of `width` / `max-width`).
  - `block-size` and `min-block-size` (instead of `height` / `min-height`).
  - `margin-inline` and `margin-block` (instead of `margin-left/right` and `margin-top/bottom`).
  - `padding-inline` and `padding-block` (instead of `padding-left/right` and `padding-top/bottom`).
  - `inset-inline-start`, `inset-inline-end`, `inset-block-start`, `inset-block-end` (instead of `left`, `right`, `top`, `bottom`).
- **Fluid sizing & Clamp:**
  - Use `clamp(min, ideal, max)` for fluid typography, hero sizes, section paddings, and dynamic containers.
  - Sınır tanımlarken `min(100%, Nrem)` veya `max-inline-size: min(100%, Nrem)` kalıplarıyla container taşmalarını önle.
- **İçerik-bazlı boyutlandırma (Intrinsic Sizing):**
  - Buton, badge, link, chip, pill ve toggle genişlikleri için `inline-size: fit-content` (veya `max-content` / `stretch`) kullan.
- **Akışkan Grid Yapısı (Auto-fit & Minmax):**
  - Kart, galeri ve listeleme alanlarında sabit sütunlar yerine `grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` kalıbını kullan.
  - Sayfalar medya sorgusu yığınlarına boğulmadan doğal akışkanlık (intrinsic layout) ile her ekrana uyum sağlamalıdır.

---

## 3. Units & Breakpoints

- **`rem` is the sole standard:** All dimensions, spacing, typography, radii (e.g. `radius.full: "999rem"`), honeypot offsets (`-999rem`), and breakpoints use `rem`.
- **`px` is allowed only where technically necessary** (e.g. `1px solid ${vars.color.border}` or focus outline offsets).
- **Breakpoints (in `rem`):**
  - `sm: "30rem"` (480px eşdeğeri)
  - `md: "48rem"` (768px eşdeğeri)
  - `lg: "64rem"` (1024px eşdeğeri)
  - `xl: "80rem"` (1280px eşdeğeri)

---

## 4. Colors

- **HSL only.** Use `hsl(...)`.
- **No hex** (`#fff`), **no `rgb()`**, **no `rgba()`**.
- Never scatter raw color values in components. Always reference `vars.color.*`.

---

## 5. React & Architecture

- **Server Components by default.**
- Use `"use client"` **only** when client-side interactivity is actually required (event handlers, browser APIs, interactive form states).
- Do **not** turn entire pages into Client Components unnecessarily.
- Keep business logic **outside** presentation components.
- Keep data fetching **server-side** where possible.
- Do **not** introduce React Context unless there is a concrete architectural requirement.
- Prefer simple props and composition; avoid unnecessary global state.

---

## 6. TypeScript

- **`strict` mode is mandatory.**
- Avoid `any`.
- Avoid unnecessary type assertions (`as`).
- Prefer explicit domain types and Zod schemas (`lib/validation/`).
- Keep server/client boundaries type-safe.

---

## 7. Forms & Security

- Use semantic HTML (`<form>`, `<label>`, `<input>`, `<button type="submit">`).
- Use **Zod** for validation (shared between client and server).
- Always include Honeypot (`_hp`) spam protection in public forms.
- Server Actions must validate authentication (`requireAdminSession()`) and sanitize all inputs server-side.

---

## 8. Accessibility (a11y)

- Use semantic HTML.
- Labels must be associated with their form controls (`htmlFor`/`id` or wrapping).
- Buttons must be actual `<button>` elements; links must be actual `<a>` elements.
- Keyboard navigation must work seamlessly.
- **Focus states must never be removed** (`:focus-visible`).
- Form validation errors must be accessible (`role="alert"`, `aria-live="polite"`).
