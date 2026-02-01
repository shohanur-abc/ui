import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart2,
	DollarSign,
	Eye,
	Package,
	Percent,
	ShoppingCart,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';

type MetricItem = {
	id: string;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: React.ElementType;
};

const MetricRow = ({ label, value, change, trend, icon: Icon }: MetricItem) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-2">
			<Icon className="size-4 text-muted-foreground" />
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<div className="flex items-center gap-3">
			<span className="font-semibold">{value}</span>
			<span
				className={`flex items-center text-xs ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="size-3" />
				) : (
					<ArrowDownRight className="size-3" />
				)}
				{change}
			</span>
		</div>
	</div>
);

export default function Main() {
	const metrics: MetricItem[] = [
		{
			id: '1',
			label: 'Total Revenue',
			value: '$48,235.00',
			change: '12.5%',
			trend: 'up',
			icon: DollarSign,
		},
		{
			id: '2',
			label: 'Total Orders',
			value: '1,284',
			change: '8.2%',
			trend: 'up',
			icon: ShoppingCart,
		},
		{
			id: '3',
			label: 'Active Customers',
			value: '3,845',
			change: '4.1%',
			trend: 'up',
			icon: Users,
		},
		{
			id: '4',
			label: 'Products Sold',
			value: '2,156',
			change: '15.3%',
			trend: 'up',
			icon: Package,
		},
		{
			id: '5',
			label: 'Avg Order Value',
			value: '$87.50',
			change: '5.4%',
			trend: 'up',
			icon: TrendingUp,
		},
		{
			id: '6',
			label: 'Conversion Rate',
			value: '3.24%',
			change: '0.8%',
			trend: 'up',
			icon: Percent,
		},
		{
			id: '7',
			label: 'Page Views',
			value: '145.2K',
			change: '22.1%',
			trend: 'up',
			icon: Eye,
		},
		{
			id: '8',
			label: 'Bounce Rate',
			value: '32.4%',
			change: '3.2%',
			trend: 'down',
			icon: BarChart2,
		},
		{
			id: '9',
			label: 'Return Rate',
			value: '2.8%',
			change: '0.5%',
			trend: 'down',
			icon: Package,
		},
		{
			id: '10',
			label: 'Avg Rating',
			value: '4.72',
			change: '0.12',
			trend: 'up',
			icon: Star,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="rounded-xl border bg-card p-4">
					<h2 className="mb-4 text-lg font-semibold">Key Metrics</h2>
					<div className="grid gap-x-8 @lg:grid-cols-2">
						<div className="divide-y">
							{metrics.slice(0, 5).map((metric) => (
								<MetricRow key={metric.id} {...metric} />
							))}
						</div>
						<div className="divide-y border-t @lg:border-t-0">
							{metrics.slice(5).map((metric) => (
								<MetricRow key={metric.id} {...metric} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
