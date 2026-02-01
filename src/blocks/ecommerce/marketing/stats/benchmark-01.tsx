import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Scale,
	TrendingUp,
	TrendingDown,
	DollarSign,
	BarChart3,
} from 'lucide-react';

interface CompetitorStatProps {
	name: string;
	marketShare: string;
	change: string;
	positive: boolean;
}

interface MetricCompareProps {
	metric: string;
	yours: string;
	industry: string;
	status: 'above' | 'below' | 'average';
}

const CompetitorRow = ({
	name,
	marketShare,
	change,
	positive,
}: CompetitorStatProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1">
			<p className="font-medium">{name}</p>
		</div>
		<div className="flex items-center gap-2">
			<span className="font-semibold">{marketShare}</span>
			<Badge
				variant={positive ? 'default' : 'destructive'}
				className="text-[10px]"
			>
				{positive ? (
					<TrendingUp className="mr-1 size-3" />
				) : (
					<TrendingDown className="mr-1 size-3" />
				)}
				{change}
			</Badge>
		</div>
	</div>
);

const MetricCompareRow = ({
	metric,
	yours,
	industry,
	status,
}: MetricCompareProps) => {
	const statusConfig = {
		above: { color: 'text-accent', label: 'Above' },
		below: { color: 'text-destructive', label: 'Below' },
		average: { color: 'text-muted-foreground', label: 'Average' },
	};

	return (
		<div className="flex items-center gap-4 py-3">
			<div className="flex-1">
				<p className="font-medium">{metric}</p>
			</div>
			<div className="w-24 text-right">
				<p className="font-semibold">{yours}</p>
				<p className="text-xs text-muted-foreground">You</p>
			</div>
			<div className="w-24 text-right">
				<p className="font-semibold">{industry}</p>
				<p className="text-xs text-muted-foreground">Industry</p>
			</div>
			<Badge
				variant="outline"
				className={`w-20 justify-center ${statusConfig[status].color}`}
			>
				{statusConfig[status].label}
			</Badge>
		</div>
	);
};

export default function Main() {
	const competitors: CompetitorStatProps[] = [
		{
			name: 'Your Store',
			marketShare: '12.4%',
			change: '+2.1%',
			positive: true,
		},
		{
			name: 'Competitor A',
			marketShare: '24.8%',
			change: '-0.8%',
			positive: false,
		},
		{
			name: 'Competitor B',
			marketShare: '18.2%',
			change: '+0.4%',
			positive: true,
		},
		{
			name: 'Competitor C',
			marketShare: '8.4%',
			change: '-1.2%',
			positive: false,
		},
	];

	const metrics: MetricCompareProps[] = [
		{
			metric: 'Conversion Rate',
			yours: '4.2%',
			industry: '2.8%',
			status: 'above',
		},
		{
			metric: 'Avg. Order Value',
			yours: '$124',
			industry: '$142',
			status: 'below',
		},
		{
			metric: 'Cart Abandonment',
			yours: '68%',
			industry: '70%',
			status: 'above',
		},
		{
			metric: 'Customer Retention',
			yours: '42%',
			industry: '38%',
			status: 'above',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<Scale className="size-4 text-primary" />
							<h3 className="font-semibold">Market Share</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{competitors.map((comp, i) => (
								<CompetitorRow key={i} {...comp} />
							))}
						</div>
					</Card>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<BarChart3 className="size-4 text-primary" />
							<h3 className="font-semibold">Industry Benchmarks</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{metrics.map((metric, i) => (
								<MetricCompareRow key={i} {...metric} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
