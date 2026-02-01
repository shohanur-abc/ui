import {
	ArrowDownRight,
	ArrowUpRight,
	Clock,
	DollarSign,
	Eye,
	MousePointerClick,
	Package,
	Percent,
	ShoppingCart,
	Target,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type CompactMetric = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	subMetrics: { label: string; value: string }[];
};

const CompactMetricCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	subMetrics,
}: CompactMetric) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-xs text-muted-foreground">{title}</p>
					<div className="flex items-center gap-2">
						<p className="text-xl font-bold">{value}</p>
						<Badge
							variant="secondary"
							className={`text-xs ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}
						>
							{trend === 'up' ? (
								<ArrowUpRight className="mr-0.5 size-2.5" />
							) : (
								<ArrowDownRight className="mr-0.5 size-2.5" />
							)}
							{change}
						</Badge>
					</div>
				</div>
			</div>
			<Separator className="my-3" />
			<div className="grid grid-cols-2 gap-2">
				{subMetrics.map((sub, i) => (
					<div key={i} className="text-center">
						<p className="text-sm font-medium">{sub.value}</p>
						<p className="text-xs text-muted-foreground">{sub.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: CompactMetric[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28%',
			trend: 'up',
			icon: DollarSign,
			subMetrics: [
				{ label: 'Avg Order', value: '$36.34' },
				{ label: 'Orders', value: '6,842' },
			],
		},
		{
			title: 'Conversion Rate',
			value: '3.2%',
			change: '+0.5%',
			trend: 'up',
			icon: Target,
			subMetrics: [
				{ label: 'Visitors', value: '45K' },
				{ label: 'Conversions', value: '1,440' },
			],
		},
		{
			title: 'Active Users',
			value: '12,456',
			change: '+18%',
			trend: 'up',
			icon: Users,
			subMetrics: [
				{ label: 'New', value: '847' },
				{ label: 'Returning', value: '11,609' },
			],
		},
		{
			title: 'Page Views',
			value: '284K',
			change: '+24%',
			trend: 'up',
			icon: Eye,
			subMetrics: [
				{ label: 'Unique', value: '45K' },
				{ label: 'Bounce', value: '32%' },
			],
		},
		{
			title: 'Products Sold',
			value: '12,456',
			change: '+24%',
			trend: 'up',
			icon: Package,
			subMetrics: [
				{ label: 'In Stock', value: '1,247' },
				{ label: 'Low Stock', value: '45' },
			],
		},
		{
			title: 'Avg Session',
			value: '4m 32s',
			change: '-8%',
			trend: 'down',
			icon: Clock,
			subMetrics: [
				{ label: 'Pages/Session', value: '3.2' },
				{ label: 'Sessions', value: '45K' },
			],
		},
		{
			title: 'Click Rate',
			value: '4.8%',
			change: '+0.3%',
			trend: 'up',
			icon: MousePointerClick,
			subMetrics: [
				{ label: 'Impressions', value: '2.4M' },
				{ label: 'Clicks', value: '115K' },
			],
		},
		{
			title: 'Growth Rate',
			value: '28%',
			change: '+8%',
			trend: 'up',
			icon: TrendingUp,
			subMetrics: [
				{ label: 'MoM', value: '+12%' },
				{ label: 'YoY', value: '+45%' },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
					{metrics.map((metric, i) => (
						<CompactMetricCard key={i} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
