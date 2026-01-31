import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Crown, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<Eyebrow icon={Crown} text="Premium Content" />
					<Title text="Unlock Exclusive" highlight="Insights" />
					<Description text="Go beyond the surface with premium deep-dives, early access to content, and ad-free reading. Invest in your growth." />
					<PremiumFeatures
						items={[
							'Exclusive in-depth articles',
							'Early access to new content',
							'Ad-free reading experience',
							'Monthly expert AMAs',
							'Private community access',
							'Downloadable resources',
						]}
					/>
					<PricingCTA
						price="$9"
						period="/month"
						ctaText="Start 7-Day Free Trial"
						href="/premium"
					/>
					<Guarantee text="Cancel anytime. No questions asked." />
				</div>
			</div>
			<PremiumDecorative />
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
	<div className="mb-4 @md:mb-6">
		<Badge className="gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
			<Icon className="size-4" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}{' '}
		<span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
			{highlight}
		</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

const PremiumFeatures = ({ items }: { items: string[] }) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10 @md:mb-12 text-left">
		{items.map((item) => (
			<div key={item} className="flex items-center gap-3">
				<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
					<Check className="size-3 text-primary" />
				</div>
				<span className="text-sm @md:text-base">{item}</span>
			</div>
		))}
	</div>
);

interface PricingCTAProps {
	price: string;
	period: string;
	ctaText: string;
	href: string;
}

const PricingCTA = ({ price, period, ctaText, href }: PricingCTAProps) => (
	<div className="mb-4">
		<div className="inline-flex items-baseline gap-1 mb-4">
			<span className="text-4xl @md:text-5xl font-bold">{price}</span>
			<span className="text-muted-foreground">{period}</span>
		</div>
		<div>
			<Button
				size="lg"
				asChild
				className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
			>
				<Link href={href}>
					<Zap className="size-4" />
					{ctaText}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

const Guarantee = ({ text }: { text: string }) => (
	<p className="text-sm text-muted-foreground">{text}</p>
);

const PremiumDecorative = () => (
	<>
		<div className="pointer-events-none absolute -top-40 left-1/4 size-80 rounded-full bg-amber-500/10 blur-3xl" />
		<div className="pointer-events-none absolute -bottom-40 right-1/4 size-80 rounded-full bg-orange-500/10 blur-3xl" />
	</>
);
