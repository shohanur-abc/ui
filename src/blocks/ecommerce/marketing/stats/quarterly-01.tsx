import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	DollarSign,
	ShoppingCart,
	TrendingUp,
	Users,
	Package,
	BarChart3,
} from 'lucide-react';

interface QuarterlyStatProps {
	quarter: string;
	revenue: string;
	orders: string;
	customers: string;
	growth: string;
	positive: boolean;
}

const QuarterlyCard = ({
	quarter,
	revenue,
	orders,
	customers,
	growth,
	positive,
}: QuarterlyStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="flex items-center justify-between p-4">
			<span className="font-semibold">{quarter}</span>
			<Badge variant={positive ? 'default' : 'destructive'}>{growth}</Badge>
		</div>
		<Separator />
		<div className="grid grid-cols-3 divide-x">
			<div className="p-4 text-center">
				<DollarSign className="mx-auto size-4 text-muted-foreground" />
				<p className="mt-2 text-lg font-bold">{revenue}</p>
				<p className="text-xs text-muted-foreground">Revenue</p>
			</div>
			<div className="p-4 text-center">
				<ShoppingCart className="mx-auto size-4 text-muted-foreground" />
				<p className="mt-2 text-lg font-bold">{orders}</p>
				<p className="text-xs text-muted-foreground">Orders</p>
			</div>
			<div className="p-4 text-center">
				<Users className="mx-auto size-4 text-muted-foreground" />
				<p className="mt-2 text-lg font-bold">{customers}</p>
				<p className="text-xs text-muted-foreground">Customers</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const quarters: QuarterlyStatProps[] = [
		{
			quarter: 'Q1 2024',
			revenue: '$2.4M',
			orders: '18,294',
			customers: '8,847',
			growth: '+18%',
			positive: true,
		},
		{
			quarter: 'Q2 2024',
			revenue: '$2.8M',
			orders: '21,847',
			customers: '10,284',
			growth: '+17%',
			positive: true,
		},
		{
			quarter: 'Q3 2024',
			revenue: '$3.2M',
			orders: '24,294',
			customers: '12,847',
			growth: '+14%',
			positive: true,
		},
		{
			quarter: 'Q4 2024',
			revenue: '$3.8M',
			orders: '28,847',
			customers: '15,284',
			growth: '+19%',
			positive: true,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{quarters.map((q, i) => (
						<QuarterlyCard key={i} {...q} />
					))}
				</div>
			</div>
		</section>
	);
}
