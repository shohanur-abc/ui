import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Flame, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TrendingCard = ({
	image,
	title,
	category,
	change,
	href,
}: {
	image: string;
	title: string;
	category: string;
	change: string;
	href: string;
}) => (
	<Link href={href} className="group relative overflow-hidden rounded-2xl">
		<div className="aspect-[3/4] relative">
			<Image
				src={image}
				alt={title}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-4">
			<Badge className="bg-green-500/80 text-white border-0 gap-1 mb-2">
				<ArrowUp className="size-3" />
				{change}
			</Badge>
			<h3 className="font-bold text-white mb-1">{title}</h3>
			<p className="text-sm text-white/70">{category}</p>
		</div>
	</Link>
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
			<Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30 gap-1.5 mb-4">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
				{headline}
			</h2>
			<p className="text-muted-foreground">{subtext}</p>
		</div>
		<Button variant="outline" className="gap-2 shrink-0" asChild>
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
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<SectionHeader
						badge={{ icon: TrendingUp, text: 'Rising Stars' }}
						headline="Trending Categories"
						subtext="Discover the categories everyone's talking about"
						cta={{ label: 'View All', href: '/categories' }}
					/>
					<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
						<TrendingCard
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
							title="Smartwatches"
							category="Tech"
							change="+45%"
							href="/category/smartwatches"
						/>
						<TrendingCard
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
							title="Audio"
							category="Electronics"
							change="+32%"
							href="/category/audio"
						/>
						<TrendingCard
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
							title="Fitness"
							category="Health"
							change="+28%"
							href="/category/fitness"
						/>
						<TrendingCard
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
							title="Accessories"
							category="Lifestyle"
							change="+21%"
							href="/category/accessories"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
