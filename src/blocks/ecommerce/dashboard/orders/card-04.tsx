import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	TrendingUp,
	TrendingDown,
	ShoppingCart,
	DollarSign,
	Package,
	Users,
	ArrowUpRight,
} from 'lucide-react';

interface StatCard {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	description: string;
}

interface StatCardProps {
	stat: StatCard;
}

interface StatsSummaryProps {
	stats: StatCard[];
	title: string;
	viewAllLabel: string;
}

const TrendBadge = ({
	change,
	trend,
}: {
	change: string;
	trend: 'up' | 'down';
}) => (
	<Badge
		variant="outline"
		className={`gap-1 ${trend === 'up' ? 'text-accent border-accent/30 bg-accent/10' : 'text-destructive border-destructive/30 bg-destructive/10'}`}
	>
		{trend === 'up' ? (
			<TrendingUp className="size-3" />
		) : (
			<TrendingDown className="size-3" />
		)}
		{change}
	</Badge>
);

const StatCardItem = ({ stat }: StatCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
		<CardContent className="p-5">
			<div className="flex items-start justify-between mb-4">
				<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<stat.icon className="size-6 text-primary" />
				</div>
				<TrendBadge change={stat.change} trend={stat.trend} />
			</div>
			<div>
				<p className="text-3xl font-bold mb-1">{stat.value}</p>
				<p className="text-sm font-medium text-muted-foreground">
					{stat.label}
				</p>
				<p className="text-xs text-muted-foreground/70 mt-1">
					{stat.description}
				</p>
			</div>
		</CardContent>
	</Card>
);

const StatsSummary = ({ stats, title, viewAllLabel }: StatsSummaryProps) => (
	<div>
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-xl font-semibold">{title}</h2>
			<Button
				variant="ghost"
				size="sm"
				className="gap-1.5 text-muted-foreground hover:text-foreground"
			>
				{viewAllLabel}
				<ArrowUpRight className="size-4" />
			</Button>
		</div>
		<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<StatCardItem key={i} stat={stat} />
			))}
		</div>
	</div>
);

export default function Main() {
	const stats: StatCard[] = [
		{
			icon: ShoppingCart,
			label: 'Total Orders',
			value: '1,284',
			change: '+12.5%',
			trend: 'up',
			description: 'vs last month',
		},
		{
			icon: DollarSign,
			label: 'Revenue',
			value: '$48,560',
			change: '+8.2%',
			trend: 'up',
			description: 'vs last month',
		},
		{
			icon: Package,
			label: 'Pending Orders',
			value: '23',
			change: '-15.3%',
			trend: 'down',
			description: 'vs last month',
		},
		{
			icon: Users,
			label: 'New Customers',
			value: '156',
			change: '+24.1%',
			trend: 'up',
			description: 'vs last month',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<StatsSummary
					stats={stats}
					title="Order Statistics"
					viewAllLabel="View Report"
				/>
			</div>
		</section>
	);
}
