# Verification Steps
After every modification, ensure the following commands are executed to maintain code quality and functionality:

1. **Lint the code**:  
  ```bash
  bun run lint
  ```

2. **Type-check the code**:  
  ```bash
  bun run type-check
  ```

3. **Run the development server**:  
  ```bash
  bun dev
  ```

4. **Build the project**:  
  ```bash
  bun build
  ```

---


## 🎨 UI/Component Rules
- follow shadcn/ui design system and globalcss styles
- shadcn prebuilt components = automatic color adjustment + less manual design
- When creating a component, maintain consistent styling across all pages
- Use shadcn/ui components from `@/components/ui` instead of building from scratch
- Keep component props well-typed with TypeScript

RESPONSIVENESS

* Follow a **mobile-first approach**: design for the smallest devices first (≈360px), then progressively scale up to wider and larger screens.
* Use **range modifiers** (e.g., `min-lg:max-2xl:grid`) where appropriate to control layouts across specific size ranges.
* Prefer **fixed spacing per breakpoint** (e.g., `@sm`, `@md`) for **structural stability**.
  Use **fluid techniques** like `clamp()`, `fit-content()`, `min()`, `max()`, `calc()`, and `minmax()` only where there is a **large size difference or significant variation** (e.g., headings, large margins/paddings).
  Avoid fluid sizing for **small, consistent spacing**—fixed values per breakpoint are generally more predictable and maintainable.

DECORATIVE
- Use simple background decorations (gradients, subtle textures, or solid colors).
- Add minimal, smooth hover effects for interactive elements.
- Use image-based decorations only when relevant.
- Use complex decorations (div + CSS or `@/components/canvas.tsx`) only when they meaningfully enhance the design.

OTHER
- State Utilities: Use group and peer for coordinating component states.
- Selector Utilities: Use universal and child selectors (*:, **:, [&>*]:, [&>p]:, [&>*]) for precise styling.
- ARIA & Data Attributes: Use selectors like **aria-required, **aria-[sort=ascending]:, and **data-* for accessibility and dynamic functions.




