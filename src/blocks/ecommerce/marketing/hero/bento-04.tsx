import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroCard = ({
	badge,
	title,
	subtitle,
	image,
	cta,
}: {
	badge: {
		icon: React.ElementType;
		text: string;
		variant?: 'default' | 'destructive';
	};
	title: string;
	subtitle: string;
	image: { src: string; alt: string };
	cta: { label: string; href: string };
}) => (
	<div className="relative rounded-3xl border bg-card overflow-hidden min-h-[350px] @lg:min-h-[450px] group">
		<div className="absolute inset-0">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-700"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
		</div>
		<div className="relative h-full p-6 @md:p-8 flex flex-col justify-end">
			<Badge variant={badge.variant} className="w-fit gap-1.5 mb-4">
				<badge.icon className="size-3.5" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-2">
				{title}
			</h2>
			<p className="text-muted-foreground mb-6 max-w-sm">{subtitle}</p>
			<Button size="lg" className="w-fit gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

const SmallCard = ({
	icon: Icon,
	title,
	description,
	href,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	href: string;
}) => (
	<Link
		href={href}
		className="rounded-2xl border bg-card p-6 flex items-start gap-4 group hover:border-primary/50 transition-colors"
	>
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
			<Icon className="size-6 text-primary" />
		</div>
		<div>
			<h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
				{title}
			</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-4 @md:gap-6">
					<HeroCard
						badge={{ icon: Flame, text: 'Hot Deal', variant: 'destructive' }}
						title="Flash Sale Weekend"
						subtitle="Grab exclusive deals before they're gone. Limited time offers on premium products."
						image={{
							src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
							alt: 'Flash sale',
						}}
						cta={{ label: 'Shop Deals', href: '/deals' }}
					/>
					<div className="grid gap-4 @md:gap-6">
						<HeroCard
							badge={{ icon: Sparkles, text: 'New In' }}
							title="Spring Essentials"
							subtitle="Refresh your style with our latest arrivals."
							image={{
								src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
								alt: 'Spring collection',
							}}
							cta={{ label: 'Explore', href: '/spring' }}
						/>
						<div className="grid @sm:grid-cols-2 gap-4 @md:gap-6">
							<SmallCard
								icon={Clock}
								title="Limited Drops"
								description="Exclusive weekly releases"
								href="/drops"
							/>
							<SmallCard
								icon={TrendingUp}
								title="Trending Now"
								description="Most popular this week"
								href="/trending"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
