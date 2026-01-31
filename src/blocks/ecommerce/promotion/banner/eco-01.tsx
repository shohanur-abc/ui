import Link from 'next/link';
import { ArrowRight, Leaf, Recycle, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
		<div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
	</div>
);

const SustainabilityIcon = () => (
	<div className="relative size-20 @md:size-24 mx-auto mb-6">
		<div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 opacity-20 animate-pulse" />
		<div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
			<Leaf className="size-10 @md:size-12 text-white" />
		</div>
	</div>
);

const ImpactStats = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-6 @md:gap-10 mb-8">
		{items.map(({ icon: Icon, value, label }, i) => (
			<div key={i} className="text-center">
				<Icon className="size-5 text-green-500 mx-auto mb-1" />
				<span className="text-2xl @md:text-3xl font-bold">{value}</span>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

const SustainabilityContent = ({
	badge,
	headline,
	description,
	stats,
	cta,
}: {
	badge: string;
	headline: { text: string; highlight: string };
	description: string;
	stats: { icon: React.ElementType; value: string; label: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="relative text-center max-w-2xl mx-auto">
		<Badge
			variant="outline"
			className="border-green-500/50 text-green-500 gap-1.5 mb-4"
		>
			<Leaf className="size-3" />
			{badge}
		</Badge>
		<SustainabilityIcon />
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
			{headline.text}
			<span className="text-green-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground mb-8">{description}</p>
		<ImpactStats items={stats} />
		<Button className="gap-2 bg-green-600 hover:bg-green-700" asChild>
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
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<SustainabilityContent
					badge="Sustainability"
					headline={{ text: 'Shop', highlight: 'Sustainably' }}
					description="We're committed to reducing our environmental impact. Every purchase contributes to a greener future."
					stats={[
						{ icon: Recycle, value: '100%', label: 'Recyclable Packaging' },
						{ icon: Leaf, value: '50K', label: 'Trees Planted' },
						{ icon: Globe, value: 'Carbon', label: 'Neutral Shipping' },
					]}
					cta={{ label: 'Learn About Our Mission', href: '/sustainability' }}
				/>
			</div>
		</section>
	);
}
