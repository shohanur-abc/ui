import { Badge } from '@/components/ui/badge';

interface StatItemProps {
	value: string;
	label: string;
	badge?: string;
}

const StatItem = ({ value, label, badge }: StatItemProps) => (
	<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-secondary/50 p-6 ring-1 ring-border transition-all duration-300 hover:ring-primary/30 @md:p-8">
		<div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
		<div className="relative flex items-start justify-between">
			<div>
				<p className="text-3xl font-bold tracking-tight @sm:text-4xl">
					{value}
				</p>
				<p className="mt-2 text-sm text-muted-foreground">{label}</p>
			</div>
			{badge && <Badge variant="secondary">{badge}</Badge>}
		</div>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ value: '$1.2B', label: 'Total Transaction Volume', badge: 'YTD' },
		{ value: '8.4M', label: 'Orders Fulfilled', badge: 'YTD' },
		{ value: '142', label: 'Countries Reached', badge: 'Global' },
		{ value: '99.97%', label: 'Platform Uptime', badge: 'SLA' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
