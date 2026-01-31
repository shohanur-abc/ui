import {
	ArrowDownRight,
	ArrowUpRight,
	Eye,
	MousePointerClick,
	ShoppingCart,
	Target,
	type LucideIcon,
} from 'lucide-react';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	description: string;
};

const KpiBorderless = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	description,
}: KpiItem) => (
	<div className="group relative flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 hover:bg-card/50 @sm:p-6">
		<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
		<div className="flex items-center justify-between">
			<div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
				<Icon className="size-4 text-primary" />
			</div>
			<div
				className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="size-4" />
				) : (
					<ArrowDownRight className="size-4" />
				)}
				{change}
			</div>
		</div>
		<div>
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
		</div>
		<p className="text-xs text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Page Views',
			value: '284,521',
			change: '+32.5%',
			trend: 'up',
			icon: Eye,
			description: 'Total page views across all products',
		},
		{
			title: 'Click Rate',
			value: '4.82%',
			change: '+1.2%',
			trend: 'up',
			icon: MousePointerClick,
			description: 'Average click-through rate on listings',
		},
		{
			title: 'Cart Additions',
			value: '12,847',
			change: '-5.3%',
			trend: 'down',
			icon: ShoppingCart,
			description: 'Items added to cart this period',
		},
		{
			title: 'Conversion',
			value: '2.94%',
			change: '+0.4%',
			trend: 'up',
			icon: Target,
			description: 'Visitor to customer conversion rate',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="rounded-xl border bg-card/30">
					<div className="grid @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<KpiBorderless key={i} {...kpi} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
