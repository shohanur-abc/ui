import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Check, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const FeatureCard = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
}) => (
	<Card className="p-6 bg-card border-border/50 hover:border-primary/30 transition-all">
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
			<Icon className="size-6 text-primary" />
		</div>
		<h3 className="font-bold text-lg mb-2">{title}</h3>
		<p className="text-sm text-muted-foreground">{description}</p>
	</Card>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	subtext: string;
}) => (
	<div className="text-center mb-10 @md:mb-12">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-4"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<SectionHeader
						badge={{ icon: Sparkles, text: 'Product Features' }}
						headline={{ text: "Why You'll", highlight: 'Love It' }}
						subtext="Discover the key features that make our products stand out from the rest"
					/>
					<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-6 mb-10">
						<FeatureCard
							icon={Star}
							title="Premium Quality"
							description="Crafted with the finest materials for lasting durability"
						/>
						<FeatureCard
							icon={Package}
							title="Free Shipping"
							description="Complimentary delivery on all orders over $50"
						/>
						<FeatureCard
							icon={Check}
							title="Easy Returns"
							description="30-day hassle-free return policy guaranteed"
						/>
						<FeatureCard
							icon={Sparkles}
							title="Eco-Friendly"
							description="Sustainably sourced and environmentally conscious"
						/>
					</div>
					<div className="text-center">
						<Button size="lg" className="gap-2" asChild>
							<Link href="/features">
								Learn More
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
