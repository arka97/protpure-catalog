# Components & Design System (Internal)

The visual language and the component vocabulary that expresses it.

## Tokens

All design tokens live in `src/index.css` (CSS variables, HSL values) and are exposed to Tailwind in `tailwind.config.ts`. Every color used in components must reference a token; no raw `#hex` or `text-white` style classes.

| Token family | Examples |
|---|---|
| Surface | `--background`, `--card`, `--muted`, `--popover` |
| Foreground | `--foreground`, `--muted-foreground`, `--card-foreground` |
| Brand | `--primary`, `--primary-foreground`, `--accent` |
| State | `--destructive`, `--success` (where defined), `--border`, `--ring` |

## Typography

- **Headings** — serif font; conveys technical authority.
- **Body** — sans-serif; high readability.
- **Mono** — used for product catalog numbers and SKU references.
- Heading sizes scale by route: hero pages get larger H1, content pages get tighter scale.

## Spacing & layout

- Container widths: `max-w-5xl` for content, `max-w-7xl` for marketing sections.
- Vertical rhythm follows Tailwind's default scale; section padding is consistently `py-12` to `py-20`.
- Border radius defaults to `rounded-2xl` for cards, `rounded-lg` for inputs.

## shadcn primitives

The `components/ui/` folder is a vendored shadcn install. Treat each primitive as a stable contract:

- Extend via wrapper components, not by editing the primitive.
- Add new variants through `cva` in the wrapper.
- Never delete a primitive that is still imported elsewhere.

## Component inventory by domain

| Domain | Components |
|---|---|
| Layout | `Header`, `Footer`, `PageHero`, `WhatsAppFAB` |
| Home | `HeroSection`, `TrustStrip`, `CategoryGrid`, `ResinSelector`, `FlowVelocitySection`, `USPGrid`, `WhyProtpure`, `FacilitySnapshot`, `CTABand` |
| Products | `ProductCard`, `ProductDetailModal`, `FilterSidebar`, `BeadSizeSelector`, `FindYourResinPanel`, `CompareBar`, `CompareModal` |
| RFQ | `RFQDrawer` |
| Docs | `PasswordGate`, `MarkdownRenderer` |

## Dos and don'ts

**Do**

- Reach for a shadcn primitive before writing custom interaction logic.
- Use `prose prose-slate dark:prose-invert` for all long-form content.
- Keep components under ~150 lines; split when state or markup grows.
- Use Lucide icons; one icon library, consistent sizes.

**Don't**

- Don't write `text-white`, `bg-black`, or `text-gray-500` in components.
- Don't reach for new icon packs.
- Don't introduce a new font family without updating tokens and tailwind config.
- Don't ship inline `<style>` tags or one-off CSS files.

## Accessibility

- All interactive elements reachable by keyboard.
- Focus ring uses the `--ring` token; never `outline-none` without a replacement.
- Color contrast meets WCAG AA in both themes.
- Modal/drawer components rely on shadcn primitives that already trap focus correctly.