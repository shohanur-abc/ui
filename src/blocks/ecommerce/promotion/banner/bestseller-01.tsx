import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Medal, Trophy, Crown, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BestsellerRank = ({
	rank,
	image,
	title,
	price,
	sales,
}: {
	rank: number;
	image: string;
	title: string;
	price: string;
	sales: string;
}) => (
	<div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
		<div
			className={`size-10 rounded-full flex items-center justify-center font-bold ${
				rank === 1
					? 'bg-yellow-500 text-yellow-950'
					: rank === 2
						? 'bg-gray-300 text-gray-800'
						: rank === 3
							? 'bg-amber-600 text-white'
							: 'bg-muted text-muted-foreground'
			}`}
		>
			{rank}
		</div>
		<div className="size-14 rounded-lg overflow-hidden relative shrink-0">
			<Image src={image} alt={title} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="font-semibold line-clamp-1">{title}</h3>
			<p className="text-sm text-muted-foreground">{sales} sold</p>
		</div>
		<span className="font-bold text-primary shrink-0">{price}</span>
	</div>
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
	<div className="text-center mb-10">
		<Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 gap-1.5 mb-4">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-yellow-600"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-2xl mx-auto">
					<SectionHeader
						badge={{ icon: Trophy, text: 'Best Sellers' }}
						headline={{ text: 'Top', highlight: '10' }}
						subtext="Our most popular products this month"
					/>
					<div className="space-y-3">
						<BestsellerRank
							rank={1}
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
							title="Smart Watch Pro"
							price="$299"
							sales="5.2K"
						/>
						<BestsellerRank
							rank={2}
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200"
							title="Wireless Earbuds"
							price="$149"
							sales="4.1K"
						/>
						<BestsellerRank
							rank={3}
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200"
							title="Fitness Tracker"
							price="$199"
							sales="3.8K"
						/>
						<BestsellerRank
							rank={4}
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200"
							title="Power Bank Pro"
							price="$79"
							sales="3.2K"
						/>
						<BestsellerRank
							rank={5}
							image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
							title="Premium Headphones"
							price="$349"
							sales="2.9K"
						/>
					</div>
					<div className="mt-8 text-center">
						<Button variant="outline" className="gap-2" asChild>
							<Link href="/bestsellers">
								View All Best Sellers
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
