import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressStatProps {
	label: string;
	value: number;
	target: number;
	unit?: string;
}

const ProgressStat = ({
	label,
	value,
	target,
	unit = '',
}: ProgressStatProps) => {
	const percentage = Math.round((value / target) * 100);

	return (
		<Card className="group p-6 transition-all duration-300 hover:shadow-md">
			<div className="space-y-4">
				<div className="flex items-baseline justify-between">
					<span className="text-sm font-medium text-muted-foreground">
						{label}
					</span>
					<span className="text-xs text-muted-foreground">{percentage}%</span>
				</div>
				<div className="space-y-2">
					<div className="flex items-baseline gap-1">
						<span className="text-3xl font-bold tracking-tight">
							{value.toLocaleString()}
							{unit}
						</span>
						<span className="text-sm text-muted-foreground">
							/ {target.toLocaleString()}
							{unit}
						</span>
					</div>
					<Progress value={percentage} className="h-2" />
				</div>
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: ProgressStatProps[] = [
		{ label: 'Monthly Revenue', value: 847000, target: 1000000, unit: '' },
		{ label: 'New Signups', value: 8420, target: 10000 },
		{ label: 'Active Users', value: 42847, target: 50000 },
		{ label: 'Orders', value: 12847, target: 15000 },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<ProgressStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
