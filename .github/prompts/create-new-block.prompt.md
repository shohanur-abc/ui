---
agent: agent
---
### Requirements

* Highly responsive, polished, professional UI
* Clean, readable, and consistent code structure
* Follow strict component naming and prop conventions
 - follow layout based file naming conventions (e.g., `card-2x3-01.tsx`, `hero-1x1-02.tsx`, `bento-01.tsx`, `split-screen-01.tsx`, etc.)
 - follow folder based organization (e.g., `landing/feature/`, `portfolio/skills/`, etc.)
 - props should be in shape of `{ items: ItemType[] }` or `{ title: string; description: string; items: ItemType[] }` etc.
* Adhere to shadcn/ui design system and globalcss styles
* Use shadcn/ui components from `@/components/ui` as core primitives
* Well-typed with TypeScript
* Include necessary comments for complex logic

### Design & Layout Rules

* `max-w-7xl`
* Must use Tailwind `@container`as parent container
* Use all available `@breakpoints` for top‑tier responsiveness across all device sizes
* Consistent spacing, padding, and margin conventions. (e.g., `@3xs (16rem), @2xs (18rem), @xs (20rem), @sm (24rem), @md (28rem), @lg (32rem), @xl (36rem), @2xl (42rem), @3xl (48rem), @4xl (56rem), @5xl (64rem), @6xl (72rem), @7xl (80rem)`)
* Use built-in Tailwind scale values (e.g., -xl, -lg) only not hardcoded values (e.g., px-[37px], rounded-[2.5rem])
* Unique, modern designs only
* for visual appeal, use gradients, shadows, and hover effects tastefully, backdrop blur but avoid overuse
* Build using `src/components/ui` as core primitives. Use shadcn/ui components wherever possible (e.g., Button, Card, Badge, Avatar, etc.)
* Be careful about the default spacing of components, especially `src/components/ui/card.tsx` components.


OTHER
* 
*
- State Utilities: Use group and peer for coordinating component states.
- Selector Utilities: Use universal and child selectors (*:, **:, [&>*]:, [&>p]:, [&>*]) for precise styling.
- ARIA & Data Attributes: Use selectors like **aria-required, **aria-[sort=ascending]:, and **data-* for accessibility and dynamic functions.

### Tech Stack
* Tailwind v4 · React 19 · Next.js 16

### Scripts
* `src/blocks/sync-metadata.ts`
* `src/blocks/sync-registry.ts`


#### Frequently Used Components

```tsx
<section className="@container">
    <div className="max-w-7xl mx-auto py-12 @md:py-16 @xl:py-20 @3xl:py-24 px-4 @sm:px-6 @md:px-8 @xl:px-12">
    ...
    </div>
</section>
<Eyebrow icon={} text="" />
<Title text="" hightlight=""/>
<Description text="" />
<CTA items={[
    { label: '', href: '', iconRight: ArrowRight},
    { label: '', href: '', variant: 'outline' },
]} />
<HeroImage
    src="https://avatars.githubusercontent.com/u/252440198?v=4"
    fallback=""
    alt="Taohid"
    />
```