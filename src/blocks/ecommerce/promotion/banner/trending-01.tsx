import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TrendingItem = ({
	rank,
	image,
	title,
	price,
	views,
}: {
	rank: number;
	image: string;
	title: string;
	price: string;
	views: string;
}) => (
	<div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 group hover:border-primary/30 transition-all">
		<span className="text-3xl font-black text-primary/30 w-8">{rank}</span>
		<div className="size-16 rounded-lg overflow-hidden relative shrink-0">
			<Image src={image} alt={title} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="font-semibold line-clamp-1">{title}</h3>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Eye className="size-3" />
				<span>{views} views</span>
			</div>
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
	<div className="mb-8">
		<Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30 gap-1.5 mb-4">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-orange-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-2xl mx-auto">
					<SectionHeader
						badge={{ icon: Flame, text: 'Trending Now' }}
						headline={{ text: "What's", highlight: 'Hot' }}
						subtext="See what everyone's shopping for right now"
					/>
					<div className="space-y-3">
						<TrendingItem
							rank={1}
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
							title="Smart Watch Pro"
							price="$299"
							views="12.5K"
						/>
						<TrendingItem
							rank={2}
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200"
							title="Wireless Earbuds"
							price="$149"
							views="9.2K"
						/>
						<TrendingItem
							rank={3}
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200"
							title="Fitness Band"
							price="$99"
							views="8.1K"
						/>
						<TrendingItem
							rank={4}
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200"
							title="Power Bank Pro"
							price="$79"
							views="6.8K"
						/>
					</div>
					<div className="mt-8 text-center">
						<Button variant="outline" className="gap-2" asChild>
							<Link href="/trending">
								View All Trending
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
