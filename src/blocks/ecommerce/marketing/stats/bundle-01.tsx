import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Layers,
	Package,
	TrendingUp,
	ShoppingCart,
	DollarSign,
} from 'lucide-react';

interface BundleStatProps {
	name: string;
	products: number;
	soldCount: string;
	revenue: string;
	savings: string;
}

const BundleCard = ({
	name,
	products,
	soldCount,
	revenue,
	savings,
}: BundleStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Layers className="size-4 text-primary" />
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-xs text-muted-foreground">{products} products</p>
				</div>
			</div>
			<Badge variant="outline">{savings} savings</Badge>
		</div>
		<Separator className="my-4" />
		<div className="grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Units Sold</p>
				<p className="text-lg font-bold">{soldCount}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const summaryStats = [
		{ icon: Layers, label: 'Active Bundles', value: '24' },
		{ icon: Package, label: 'Bundle Orders', value: '8,294' },
		{ icon: DollarSign, label: 'Bundle Revenue', value: '$524K' },
		{ icon: TrendingUp, label: 'AOV Increase', value: '+42%' },
	];

	const bundles: BundleStatProps[] = [
		{
			name: 'Complete Home Office',
			products: 5,
			soldCount: '2,847',
			revenue: '$284K',
			savings: '25%',
		},
		{
			name: 'Starter Kit Pro',
			products: 3,
			soldCount: '4,284',
			revenue: '$128K',
			savings: '15%',
		},
		{
			name: 'Premium Bundle',
			products: 4,
			soldCount: '1,284',
			revenue: '$112K',
			savings: '30%',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6 grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{summaryStats.map((stat, i) => (
						<Card key={i} className="flex items-center gap-4 p-4">
							<div className="rounded-lg bg-primary/10 p-2">
								<stat.icon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xl font-bold">{stat.value}</p>
								<p className="text-xs text-muted-foreground">{stat.label}</p>
							</div>
						</Card>
					))}
				</div>
				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					{bundles.map((bundle, i) => (
						<BundleCard key={i} {...bundle} />
					))}
				</div>
			</div>
		</section>
	);
}
