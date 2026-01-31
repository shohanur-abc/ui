import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SlideIndicators = ({
	total,
	active,
}: {
	total: number;
	active: number;
}) => (
	<div className="flex items-center gap-2">
		{[...Array(total)].map((_, i) => (
			<button
				key={i}
				className={`h-1.5 rounded-full transition-all ${
					i === active ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30'
				}`}
			/>
		))}
	</div>
);

const SlideNavigation = () => (
	<div className="flex items-center gap-2">
		<Button variant="outline" size="icon" className="size-10">
			<ChevronLeft className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="size-10">
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

const SlideContent = ({
	badge,
	headline,
	description,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="space-y-4 @md:space-y-6 max-w-2xl">
		<Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold tracking-tight">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-lg">
			{description}
		</p>
		<Button size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-8 mb-8">
						<SlideContent
							badge={{ icon: Sparkles, text: 'Featured' }}
							headline={{ text: 'Summer', highlight: 'Collection 2026' }}
							description="Discover the latest trends and styles for the season. Fresh arrivals, timeless classics."
							cta={{ label: 'Shop Now', href: '/summer-collection' }}
						/>
						<div className="flex items-center gap-6">
							<SlideIndicators total={4} active={0} />
							<SlideNavigation />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
