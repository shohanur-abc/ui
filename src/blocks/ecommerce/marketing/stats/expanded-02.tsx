import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ExpandedStatProps {
	label: string;
	value: string;
	progress: number;
	breakdown: { label: string; value: string; percentage: number }[];
}

const ExpandedStat = ({
	label,
	value,
	progress,
	breakdown,
}: ExpandedStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="p-6">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-muted-foreground">
						{label}
					</span>
					<Badge variant="secondary">{progress}%</Badge>
				</div>
				<p className="text-4xl font-bold tracking-tight">{value}</p>
				<Progress value={progress} className="h-2" />
			</div>
		</div>
		<Separator />
		<div className="space-y-3 p-6">
			{breakdown.map((item, i) => (
				<div key={i} className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<div className="flex items-center gap-2">
						<span className="font-medium">{item.value}</span>
						<span className="text-xs text-muted-foreground">
							({item.percentage}%)
						</span>
					</div>
				</div>
			))}
		</div>
	</Card>
);

export default function Main() {
	const stats: ExpandedStatProps[] = [
		{
			label: 'Total Revenue',
			value: '$1.24M',
			progress: 82,
			breakdown: [
				{ label: 'Product Sales', value: '$984K', percentage: 79 },
				{ label: 'Subscriptions', value: '$186K', percentage: 15 },
				{ label: 'Services', value: '$74K', percentage: 6 },
			],
		},
		{
			label: 'Customer Segments',
			value: '48,294',
			progress: 68,
			breakdown: [
				{ label: 'Enterprise', value: '2,847', percentage: 6 },
				{ label: 'Business', value: '12,847', percentage: 27 },
				{ label: 'Individual', value: '32,600', percentage: 67 },
			],
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					{stats.map((stat, i) => (
						<ExpandedStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
