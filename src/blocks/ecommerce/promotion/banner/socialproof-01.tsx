import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Star, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SocialProofCard = ({
	image,
	title,
	price,
	buyers,
	rating,
	reviews,
}: {
	image: string;
	title: string;
	price: string;
	buyers: string;
	rating: number;
	reviews: string;
}) => (
	<div className="bg-card rounded-2xl p-4 border border-border/50">
		<div className="flex gap-4">
			<div className="size-20 rounded-xl overflow-hidden relative shrink-0">
				<Image src={image} alt={title} fill className="object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<h3 className="font-semibold mb-1 line-clamp-1">{title}</h3>
				<div className="flex items-center gap-1 mb-2">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
						/>
					))}
					<span className="text-xs text-muted-foreground">({reviews})</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="font-bold text-primary">{price}</span>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Users className="size-3" />
						<span>{buyers} bought</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: string;
	subtext: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4 mb-8">
		<div>
			<Badge className="bg-green-500/10 text-green-500 border-green-500/30 gap-1.5 mb-4">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
				{headline}
			</h2>
			<p className="text-muted-foreground">{subtext}</p>
		</div>
		<Button className="gap-2 shrink-0" asChild>
			<Link href={cta.href}>
				<ShoppingBag className="size-4" />
				{cta.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={{ icon: TrendingUp, text: 'Most Popular' }}
						headline="People Are Buying"
						subtext="See what's flying off the shelves right now"
						cta={{ label: 'Shop Best Sellers', href: '/bestsellers' }}
					/>
					<div className="grid @md:grid-cols-2 gap-4">
						<SocialProofCard
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
							title="Smart Watch Pro"
							price="$299"
							buyers="2.5K"
							rating={5}
							reviews="1,234"
						/>
						<SocialProofCard
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
							title="Wireless Earbuds"
							price="$149"
							buyers="1.8K"
							rating={4}
							reviews="856"
						/>
						<SocialProofCard
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
							title="Fitness Tracker"
							price="$199"
							buyers="1.2K"
							rating={4}
							reviews="643"
						/>
						<SocialProofCard
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
							title="Power Bank"
							price="$79"
							buyers="3.1K"
							rating={5}
							reviews="2,156"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
