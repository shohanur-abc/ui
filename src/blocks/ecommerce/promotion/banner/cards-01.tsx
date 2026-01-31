import Link from 'next/link';
import { ArrowRight, Flame, Tag, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const GlowDecorative = () => (
	<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
);

const OfferCard = ({
	icon: Icon,
	title,
	description,
	code,
	href,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	code?: string;
	href: string;
}) => (
	<Card className="group relative p-6 bg-card hover:bg-card/80 border-border/50 hover:border-primary/30 transition-all">
		<Link href={href} className="absolute inset-0" />
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
			<Icon className="size-6 text-primary" />
		</div>
		<h3 className="font-semibold text-lg mb-1">{title}</h3>
		<p className="text-sm text-muted-foreground mb-3">{description}</p>
		{code && (
			<span className="inline-block font-mono text-sm bg-muted px-2 py-1 rounded text-primary">
				{code}
			</span>
		)}
		<ArrowRight className="absolute top-6 right-6 size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
	</Card>
);

const SectionHeader = ({
	headline,
	subtext,
}: {
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-8 @md:mb-12">
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline}
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-6xl mx-auto">
					<SectionHeader
						headline="Today's Best Offers"
						subtext="Don't miss out on these exclusive deals and promotions"
					/>
					<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
						<OfferCard
							icon={Flame}
							title="Hot Deal"
							description="50% off selected items"
							href="/hot-deals"
						/>
						<OfferCard
							icon={Tag}
							title="Promo Code"
							description="Extra 15% off sitewide"
							code="SAVE15"
							href="/promo"
						/>
						<OfferCard
							icon={Gift}
							title="Free Gift"
							description="With orders over $100"
							href="/free-gift"
						/>
						<OfferCard
							icon={Star}
							title="VIP Exclusive"
							description="Members get 2x points"
							href="/vip"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
