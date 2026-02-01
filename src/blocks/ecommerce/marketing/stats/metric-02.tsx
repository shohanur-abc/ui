import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Activity, Zap, Target, TrendingUp } from 'lucide-react';

interface MetricStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	unit: string;
	benchmark: string;
	status: 'above' | 'below' | 'on-target';
}

const MetricStat = ({
	icon: Icon,
	label,
	value,
	unit,
	benchmark,
	status,
}: MetricStatProps) => {
	const statusConfig = {
		above: { color: 'text-accent', label: 'Above target' },
		below: { color: 'text-destructive', label: 'Below target' },
		'on-target': { color: 'text-primary', label: 'On target' },
	};

	return (
		<Card className="group p-6 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<Badge
					variant="outline"
					className={`text-[10px] ${statusConfig[status].color}`}
				>
					{statusConfig[status].label}
				</Badge>
			</div>
			<div className="mt-4 space-y-1">
				<p className="text-sm text-muted-foreground">{label}</p>
				<div className="flex items-baseline gap-1">
					<span className="text-3xl font-bold tracking-tight">{value}</span>
					<span className="text-sm text-muted-foreground">{unit}</span>
				</div>
			</div>
			<Separator className="my-4" />
			<p className="text-xs text-muted-foreground">
				Benchmark:{' '}
				<span className="font-medium text-foreground">{benchmark}</span>
			</p>
		</Card>
	);
};

export default function Main() {
	const stats: MetricStatProps[] = [
		{
			icon: Activity,
			label: 'Page Load Time',
			value: '1.2',
			unit: 'seconds',
			benchmark: '< 2.0s',
			status: 'above',
		},
		{
			icon: Zap,
			label: 'Time to First Byte',
			value: '284',
			unit: 'ms',
			benchmark: '< 300ms',
			status: 'on-target',
		},
		{
			icon: Target,
			label: 'Bounce Rate',
			value: '42',
			unit: '%',
			benchmark: '< 40%',
			status: 'below',
		},
		{
			icon: TrendingUp,
			label: 'Core Web Vitals',
			value: '92',
			unit: '/100',
			benchmark: '> 90',
			status: 'above',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<MetricStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
