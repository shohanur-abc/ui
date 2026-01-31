import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface StatItemProps {
	value: string;
	label: string;
	change: string;
}

interface ContentProps {
	badge: string;
	title: string;
	description: string;
	cta: { label: string; href: string };
}

const Content = ({ badge, title, description, cta }: ContentProps) => (
	<div className="flex flex-col justify-center space-y-6">
		<Badge variant="secondary" className="w-fit gap-1.5">
			<TrendingUp className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl font-bold tracking-tight @sm:text-4xl @xl:text-5xl">{title}</h2>
		<p className="text-muted-foreground leading-relaxed">{description}</p>
		<Button asChild className="w-fit gap-2">
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const StatCard = ({ value, label, change }: StatItemProps) => (
	<Card className="group p-6 transition-all duration-300 hover:shadow-md">
		<div className="flex items-start justify-between">
			<div className="space-y-2">
				<p className="text-3xl font-bold tracking-tight @sm:text-4xl">{value}</p>
				<p className="text-sm text-muted-foreground">{label}</p>
			</div>
			<Badge variant="outline" className="text-xs text-accent">{change}</Badge>
		</div>
	</Card>
);

export default function Main() {
	const content: ContentProps = {
		badge: 'Performance Metrics',
		title: 'Growing faster than ever',
		description: 'Our platform has seen unprecedented growth this quarter. Join thousands of merchants who trust us with their business.',
		cta: { label: 'Start Selling', href: '/signup' },
	};

	const stats: StatItemProps[] = [
		{ value: '$2.4M', label: 'Monthly Revenue', change: '+24%' },
		{ value: '18.2K', label: 'New Customers', change: '+32%' },
		{ value: '94%', label: 'Retention Rate', change: '+8%' },
		{ value: '4.2s', label: 'Avg. Load Time', change: '-40%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-12 @lg:grid-cols-2 @lg:gap-16">
					<Content {...content} />
					<div className="grid gap-4 @sm:grid-cols-2">
						{stats.map((stat, i) => (
							<StatCard key={i} {...stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
