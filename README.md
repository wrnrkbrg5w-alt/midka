# BookVerse — Assignment 5

Interactive book discovery website continuing Assignment 4.

**Live website:** https://wrnrkbrg5w-alt.github.io/midka/

**Team:** Hour
**Members:** Khairgeldi Bekzat, Talapek Meyirzhan
**Group:** SE-2503 — Astana IT University

## Run locally

Extract the ZIP and open `index.html`. All assets, including Bootstrap 5.3.3 and the notification sound, are included. No installation or API keys are required. For consistent browser storage, serve the folder with any static HTTP server.

## Pages

- Home: personalized greeting, featured books and subscription popup.
- Catalog: carousel, nine dynamically rendered books, combined title/author search, category filters, star ratings, expandable descriptions and a reading list.
- About Us: team, mission and FAQ accordion.
- Contact: three-step demo reader profile with validation, Back/Next callbacks, review and reset.

## Assignment 5 requirements

| Requirement | Implementation |
| --- | --- |
| DOM selection and content updates | `querySelector`, `querySelectorAll`, `getElementById`, `textContent`, trusted static `innerHTML` |
| Dynamic styles | Day/night theme, background colors, rating classes and progress width |
| Attribute/content manipulation | Read more/less uses `style.display`, `aria-expanded`, `aria-controls`; ratings use `aria-pressed` |
| Click listeners | Theme, filters, save, rating, sound, popup, greeting and form buttons |
| Keyboard listeners | Arrow keys wrap through menu links; Home/End jump to first/last; Escape closes popup |
| Callbacks | `navigateStep(direction, onStepChanged)` calls `showStep`; inputs remain in the DOM |
| Switch statements | Category descriptions, menu key handling and card actions |
| Objects and methods | `BookVerse.read/write/playSound`, `library.toggleSaved/setRating/getRating` |
| Arrays and loops | Book object array, `for` loop creating five rating buttons, form validation loop |
| Higher-order functions | `filter`, `map`, `forEach`, and the step navigation callback |
| Sound | Included WAV; one reusable Audio element prevents overlapping playback; mute and preview controls |
| Animations | Filtered card entrance, save pulse, hover transitions and form progress |
| Separation of concerns | Four HTML pages, `css/style.css`, four separate JS files, local vendor and audio folders |
| Theme and UX | Reading list, categories, mobile navigation, empty state, keyboard focus and reduced motion |

## JavaScript organization

- `js/main.js`: settings object, safe storage, themes, sounds, menu keys, clock and greeting.
- `js/catalog.js`: book objects, library methods, rendering, search, filters, ratings and saved list.
- `js/validation.js`: validation, multi-step callback, review, completion and reset.
- `js/components.js`: inherited FAQ and subscription popup, with focus handling and transition fixes.

Only ratings, saved book IDs, theme and sound preference use localStorage. Form data and passwords are never stored or transmitted. The project does not create real accounts or deliver messages. The subscription popup also remains a local demo.

## Verification

All four pages were checked at 375, 768 and 1440 px. Browser checks covered combined filters, empty results, ratings and saved list after reload, theme persistence, arrow navigation, WAV playback, validation, Back/Next state retention, review, consent, reset, FAQ and popup. No JavaScript console errors, broken images or horizontal overflow were found in those checks.

## Submission

Submit `Assignment5_Project.zip` and the separate `Assignment5_Report.pdf`. The PDF contains step-by-step explanations and screenshots of the actual source code and resulting pages. See `DEFENSE_RU.md` for a short explanation of the implementation.

## Third-party assets

Bootstrap 5.3.3 is included under the MIT license; see `vendor/BOOTSTRAP-LICENSE.txt`. The short notification WAV is generated for this project. Book cover assets are retained from the previous assignment.
