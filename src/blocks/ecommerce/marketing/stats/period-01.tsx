import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PeriodStatProps {
	label: string;
	daily: { value: string; change: number };
	weekly: { value: string; change: number };
	monthly: { value: string; change: number };
}

const ChangeIndicator = ({ change }: { change: number }) => {
	const isPositive = change >= 0;
	const Icon = isPositive ? TrendingUp : TrendingDown;

	return (
		<span
			className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-accent' : 'text-destructive'}`}
		>
			<Icon className="size-3" />
			{Math.abs(change)}%
		</span>
	);
};

const PeriodStat = ({ label, daily, weekly, monthly }: PeriodStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="border-b p-4">
			<p className="font-medium">{label}</p>
		</div>
		<div className="grid grid-cols-3 divide-x">
			<div className="p-4 text-center">
				<p className="text-xs text-muted-foreground">Daily</p>
				<p className="mt-1 text-lg font-bold">{daily.value}</p>
				<ChangeIndicator change={daily.change} />
			</div>
			<div className="p-4 text-center">
				<p className="text-xs text-muted-foreground">Weekly</p>
				<p className="mt-1 text-lg font-bold">{weekly.value}</p>
				<ChangeIndicator change={weekly.change} />
			</div>
			<div className="p-4 text-center">
				<p className="text-xs text-muted-foreground">Monthly</p>
				<p className="mt-1 text-lg font-bold">{monthly.value}</p>
				<ChangeIndicator change={monthly.change} />
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: PeriodStatProps[] = [
		{
			label: 'Revenue',
			daily: { value: '$12.4K', change: 8.2 },
			weekly: { value: '$84.7K', change: 12.4 },
			monthly: { value: '$284K', change: 18.7 },
		},
		{
			label: 'Orders',
			daily: { value: '428', change: 4.2 },
			weekly: { value: '2,847', change: 8.7 },
			monthly: { value: '12,847', change: 14.2 },
		},
		{
			label: 'New Customers',
			daily: { value: '142', change: -2.4 },
			weekly: { value: '984', change: 6.8 },
			monthly: { value: '4,284', change: 12.4 },
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					{stats.map((stat, i) => (
						<PeriodStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
