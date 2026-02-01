import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	ArrowLeftRight,
	Package,
	TrendingUp,
	DollarSign,
	ShoppingBag,
} from 'lucide-react';

interface CrossSellStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
}

interface RecommendationStatProps {
	fromProduct: string;
	toProduct: string;
	conversionRate: string;
	revenue: string;
}

const CrossSellMetric = ({
	icon: Icon,
	label,
	value,
	change,
}: CrossSellStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<div className="mt-4 flex items-end justify-between">
			<p className="text-2xl font-bold">{value}</p>
			<Badge variant="outline">{change}</Badge>
		</div>
	</Card>
);

const RecommendationRow = ({
	fromProduct,
	toProduct,
	conversionRate,
	revenue,
}: RecommendationStatProps) => (
	<div className="flex items-center gap-3 py-3">
		<div className="flex-1">
			<p className="text-sm font-medium">{fromProduct}</p>
			<div className="flex items-center gap-1 text-xs text-muted-foreground">
				<ArrowLeftRight className="size-3" />
				<span>{toProduct}</span>
			</div>
		</div>
		<div className="text-right">
			<Badge>{conversionRate}</Badge>
			<p className="mt-1 text-xs text-muted-foreground">{revenue}</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: CrossSellStatProps[] = [
		{
			icon: ShoppingBag,
			label: 'Cross-sell Rate',
			value: '24%',
			change: '+4%',
		},
		{
			icon: DollarSign,
			label: 'Cross-sell Revenue',
			value: '$284K',
			change: '+18%',
		},
		{ icon: Package, label: 'Upsell Rate', value: '18%', change: '+2%' },
		{ icon: TrendingUp, label: 'AOV Lift', value: '+$42', change: '+$8' },
	];

	const recommendations: RecommendationStatProps[] = [
		{
			fromProduct: 'Laptop Pro 15"',
			toProduct: 'Laptop Stand',
			conversionRate: '42%',
			revenue: '$48K',
		},
		{
			fromProduct: 'Wireless Mouse',
			toProduct: 'Mouse Pad XL',
			conversionRate: '38%',
			revenue: '$24K',
		},
		{
			fromProduct: 'Mechanical Keyboard',
			toProduct: 'Wrist Rest',
			conversionRate: '35%',
			revenue: '$18K',
		},
		{
			fromProduct: 'Monitor 27"',
			toProduct: 'Monitor Arm',
			conversionRate: '28%',
			revenue: '$32K',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<CrossSellMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<h3 className="font-semibold">Top Recommendations</h3>
						<Separator className="my-4" />
						<div className="divide-y">
							{recommendations.map((rec, i) => (
								<RecommendationRow key={i} {...rec} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
