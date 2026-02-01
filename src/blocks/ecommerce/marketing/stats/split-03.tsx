import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	type LucideIcon,
} from 'lucide-react';

interface StatItemProps {
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
}

interface HighlightStatProps {
	icon: LucideIcon;
	label: string;
	value: string;
	subtitle: string;
}

const HighlightCard = ({
	icon: Icon,
	label,
	value,
	subtitle,
}: HighlightStatProps) => (
	<Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground @md:p-10">
		<div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-3xl" />
		<div className="relative space-y-6">
			<div className="inline-flex rounded-xl bg-white/20 p-3">
				<Icon className="size-6" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium opacity-80">{label}</p>
				<p className="text-5xl font-bold tracking-tighter @md:text-6xl">
					{value}
				</p>
				<p className="text-sm opacity-70">{subtitle}</p>
			</div>
		</div>
	</Card>
);

const StatItem = ({ label, value, change, trend }: StatItemProps) => (
	<div className="flex items-center justify-between py-4">
		<span className="text-sm text-muted-foreground">{label}</span>
		<div className="flex items-center gap-3">
			<span className="text-lg font-semibold">{value}</span>
			<Badge
				variant={trend === 'up' ? 'default' : 'destructive'}
				className="gap-1 text-[10px]"
			>
				{trend === 'up' ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{change}
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const highlight: HighlightStatProps = {
		icon: BarChart3,
		label: 'Total Revenue',
		value: '$4.8M',
		subtitle: 'Year to date performance',
	};

	const stats: StatItemProps[] = [
		{
			label: 'Average Order Value',
			value: '$247',
			change: '+12%',
			trend: 'up',
		},
		{ label: 'Conversion Rate', value: '3.8%', change: '+0.5%', trend: 'up' },
		{ label: 'Cart Abandonment', value: '68%', change: '-4%', trend: 'up' },
		{ label: 'Return Rate', value: '8.2%', change: '+1.2%', trend: 'down' },
		{ label: 'Customer LTV', value: '$1,847', change: '+18%', trend: 'up' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-8 @lg:grid-cols-2 @lg:gap-12">
					<HighlightCard {...highlight} />
					<Card className="p-6 @md:p-8">
						<div className="divide-y divide-border">
							{stats.map((stat, i) => (
								<StatItem key={i} {...stat} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
