import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Sparkles, Zap, Flame, Rocket, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Flame} text="Trending" />
					<Title text="Popular Projects" />
					<Description text="Most viewed and discussed projects from our portfolio." />
				</div>

				<TrendingGrid
					items={[
						{
							image: 'https://picsum.photos/seed/trend1/800/600',
							title: 'AI Content Platform',
							description:
								'Revolutionary content generation tool powered by GPT.',
							views: 12500,
							trend: '+240%',
							rank: 1,
							tags: ['AI', 'SaaS'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/trend2/800/600',
							title: 'Fintech Dashboard',
							description:
								'Real-time trading analytics and portfolio management.',
							views: 8900,
							trend: '+180%',
							rank: 2,
							tags: ['Fintech', 'Dashboard'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/trend3/800/600',
							title: 'Mobile Banking App',
							description: 'Award-winning mobile banking experience.',
							views: 7200,
							trend: '+120%',
							rank: 3,
							tags: ['Mobile', 'Fintech'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/trend4/800/600',
							title: 'E-Commerce Redesign',
							description: 'Complete overhaul of shopping experience.',
							views: 5600,
							trend: '+95%',
							rank: 4,
							tags: ['E-Commerce', 'UX'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/trend5/800/600',
							title: 'Healthcare Portal',
							description: 'Patient management and telehealth platform.',
							views: 4300,
							trend: '+78%',
							rank: 5,
							tags: ['Healthcare', 'Web'],
							href: '#',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface TrendingItem {
	image: string;
	title: string;
	description: string;
	views: number;
	trend: string;
	rank: number;
	tags: string[];
	href: string;
}

const rankStyles: Record<
	number,
	{ bg: string; text: string; icon: ComponentType<{ className?: string }> }
> = {
	1: {
		bg: 'bg-gradient-to-br from-yellow-400 to-amber-500',
		text: 'text-yellow-900',
		icon: Rocket,
	},
	2: {
		bg: 'bg-gradient-to-br from-gray-300 to-gray-400',
		text: 'text-gray-700',
		icon: Star,
	},
	3: {
		bg: 'bg-gradient-to-br from-orange-400 to-orange-500',
		text: 'text-orange-900',
		icon: Zap,
	},
	4: { bg: 'bg-muted', text: 'text-muted-foreground', icon: Sparkles },
	5: { bg: 'bg-muted', text: 'text-muted-foreground', icon: Sparkles },
};

const TrendingGrid = ({ items }: { items: TrendingItem[] }) => (
	<div className="space-y-4">
		{items.map(
			({ image, title, description, views, trend, rank, tags, href }, i) => {
				const style = rankStyles[rank] || rankStyles[5];
				const RankIcon = style.icon;

				return (
					<Card
						key={i}
						className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
					>
						<Link href={href} className="flex flex-col @md:flex-row">
							{/* Rank */}
							<div
								className={`@md:w-20 flex @md:flex-col items-center justify-center gap-2 p-3 @md:p-4 ${style.bg}`}
							>
								<span
									className={`text-2xl @md:text-3xl font-bold ${style.text}`}
								>
									#{rank}
								</span>
								<RankIcon className={`size-5 @md:size-6 ${style.text}`} />
							</div>

							{/* Image */}
							<div className="relative @md:w-48 aspect-video @md:aspect-auto overflow-hidden bg-muted">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Content */}
							<CardContent className="flex-1 p-4 @md:p-5 flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
								<div className="flex-1">
									<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground mb-3">
										{description}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{tags.map((tag, j) => (
											<Badge key={j} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
									</div>
								</div>

								{/* Stats */}
								<div className="flex @md:flex-col items-center @md:items-end gap-4 @md:gap-1 text-sm">
									<div className="text-muted-foreground">
										{views.toLocaleString()} views
									</div>
									<Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
										<Flame className="size-3 mr-1" />
										{trend}
									</Badge>
								</div>

								<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden @md:block" />
							</CardContent>
						</Link>
					</Card>
				);
			},
		)}
	</div>
);
