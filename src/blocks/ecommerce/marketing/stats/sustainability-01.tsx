import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, Recycle, Package, Truck, TreeDeciduous } from 'lucide-react';

interface SustainabilityStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	target: string;
	progress: number;
	unit: string;
}

const SustainabilityStat = ({
	icon: Icon,
	label,
	value,
	target,
	progress,
	unit,
}: SustainabilityStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-accent/20 p-2">
				<Icon className="size-4 text-accent" />
			</div>
			<span className="font-medium">{label}</span>
		</div>
		<div className="mt-4">
			<div className="flex items-baseline gap-1">
				<span className="text-3xl font-bold">{value}</span>
				<span className="text-sm text-muted-foreground">{unit}</span>
			</div>
			<p className="text-xs text-muted-foreground">Target: {target}</p>
		</div>
		<Progress value={progress} className="mt-4 h-1.5" />
		<p className="mt-2 text-right text-xs text-muted-foreground">
			{progress}% of goal
		</p>
	</Card>
);

export default function Main() {
	const stats: SustainabilityStatProps[] = [
		{
			icon: Leaf,
			label: 'Carbon Offset',
			value: '847',
			target: '1,000 tons',
			progress: 85,
			unit: 'tons CO₂',
		},
		{
			icon: Recycle,
			label: 'Recycled Materials',
			value: '68%',
			target: '80%',
			progress: 85,
			unit: 'of products',
		},
		{
			icon: Package,
			label: 'Eco Packaging',
			value: '92%',
			target: '100%',
			progress: 92,
			unit: 'of orders',
		},
		{
			icon: Truck,
			label: 'Carbon-Free Delivery',
			value: '42%',
			target: '60%',
			progress: 70,
			unit: 'of shipments',
		},
		{
			icon: TreeDeciduous,
			label: 'Trees Planted',
			value: '12,847',
			target: '15,000',
			progress: 86,
			unit: 'trees',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<SustainabilityStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
