import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Quote, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="amber">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow icon={Lightbulb} text="Daily Inspiration" />
					<QuoteBlock
						quote="The best way to predict the future is to invent it."
						author="Alan Kay"
						role="Computer Scientist"
					/>
					<Description text="Start each day with wisdom from tech pioneers, thought leaders, and innovators. Curated quotes paired with actionable insights." />
					<CTA
						items={[
							{ label: 'Get Daily Quotes', href: '/subscribe', icon: Sparkles },
							{ label: 'Browse Archive', href: '/quotes', variant: 'outline' },
						]}
					/>
					<QuoteCategories
						items={[
							'Leadership',
							'Innovation',
							'Productivity',
							'Creativity',
							'Growth',
							'Resilience',
						]}
					/>
				</div>
			</div>
			<AmbientDecorative />
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-8 @md:mb-10">
		<Badge variant="secondary" className="gap-2 px-4 py-1.5">
			<Icon className="size-4 text-primary" />
			{text}
		</Badge>
	</div>
);

interface QuoteBlockProps {
	quote: string;
	author: string;
	role: string;
}

const QuoteBlock = ({ quote, author, role }: QuoteBlockProps) => (
	<div className="mb-6 @md:mb-8">
		<Quote className="size-12 @md:size-16 text-primary/20 mx-auto mb-4" />
		<blockquote className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-serif italic leading-tight mb-6">
			&ldquo;{quote}&rdquo;
		</blockquote>
		<div className="flex items-center justify-center gap-2">
			<span className="font-semibold">{author}</span>
			<span className="text-muted-foreground">·</span>
			<span className="text-muted-foreground">{role}</span>
		</div>
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

const QuoteCategories = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap justify-center gap-2">
		{items.map((category) => (
			<Badge
				key={category}
				variant="outline"
				className="cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
			>
				{category}
			</Badge>
		))}
	</div>
);

const AmbientDecorative = () => (
	<>
		<div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl" />
		<div className="pointer-events-none absolute top-0 left-0 size-32 bg-linear-to-br from-primary/10 to-transparent blur-2xl" />
		<div className="pointer-events-none absolute bottom-0 right-0 size-32 bg-linear-to-tl from-accent/10 to-transparent blur-2xl" />
	</>
);
