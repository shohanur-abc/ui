import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ArrowUpRight,
	TrendingUp,
	BarChart3,
	Target,
	Award,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={TrendingUp} text="Results" />
					<Title text="Impact & Outcomes" />
					<Description text="Projects with measurable business results and KPIs." />
				</div>

				<ImpactGrid
					items={[
						{
							image: 'https://picsum.photos/seed/imp1/800/500',
							title: 'Revenue Optimization Platform',
							description: 'Pricing engine for subscription business.',
							stats: [
								{ label: 'Revenue Increase', value: '+45%', icon: TrendingUp },
								{ label: 'Churn Reduction', value: '-30%', icon: Target },
							],
							tags: ['SaaS', 'Analytics'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/imp2/800/500',
							title: 'Customer Support AI',
							description: 'Intelligent chatbot for support automation.',
							stats: [
								{
									label: 'Response Time',
									value: '85% faster',
									icon: BarChart3,
								},
								{ label: 'CSAT Score', value: '+25pts', icon: Award },
							],
							tags: ['AI', 'Support'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/imp3/800/500',
							title: 'E-Commerce Checkout Redesign',
							description: 'Streamlined checkout experience.',
							stats: [
								{ label: 'Conversion Rate', value: '+38%', icon: TrendingUp },
								{ label: 'Cart Abandonment', value: '-22%', icon: Target },
							],
							tags: ['E-Commerce', 'UX'],
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

interface Stat {
	label: string;
	value: string;
	icon: ComponentType<{ className?: string }>;
}

interface ImpactItem {
	image: string;
	title: string;
	description: string;
	stats: Stat[];
	tags: string[];
	href: string;
}

const ImpactGrid = ({ items }: { items: ImpactItem[] }) => (
	<div className="grid @lg:grid-cols-3 gap-6">
		{items.map(({ image, title, description, stats, tags, href }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<Link href={href} className="block">
					<div className="relative aspect-video overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
					</div>

					<CardContent className="p-5">
						<div className="flex flex-wrap gap-1.5 mb-3">
							{tags.map((tag, j) => (
								<Badge key={j} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>

						<h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground mb-5">{description}</p>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
							{stats.map(({ label, value, icon: StatIcon }, j) => (
								<div key={j} className="text-center">
									<div className="flex items-center justify-center gap-1.5 mb-1">
										<StatIcon className="size-4 text-green-500" />
										<span className="text-lg font-bold text-green-500">
											{value}
										</span>
									</div>
									<span className="text-xs text-muted-foreground">{label}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Link>
			</Card>
		))}
	</div>
);
