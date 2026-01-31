import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart3, DollarSign, Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';

interface DashboardStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

const DashboardStat = ({ icon: Icon, label, value, change, positive }: DashboardStatProps) => (
	<div className="group flex items-center gap-4 p-4 transition-colors hover:bg-secondary/30">
		<div className="rounded-lg bg-primary/10 p-2.5">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
		<Badge variant={positive ? 'default' : 'destructive'} className="text-[10px]">
			{change}
		</Badge>
	</div>
);

export default function Main() {
	const stats: DashboardStatProps[] = [
		{ icon: DollarSign, label: 'Revenue', value: '$284,847', change: '+24%', positive: true },
		{ icon: ShoppingCart, label: 'Orders', value: '12,847', change: '+18%', positive: true },
		{ icon: Users, label: 'Customers', value: '48,294', change: '+12%', positive: true },
		{ icon: Package, label: 'Products', value: '2,847', change: '+8%', positive: true },
		{ icon: TrendingUp, label: 'Conversion', value: '3.8%', change: '+0.4%', positive: true },
		{ icon: BarChart3, label: 'Avg. Order', value: '$142', change: '-2%', positive: false },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="overflow-hidden">
					<div className="border-b p-4">
						<h3 className="font-semibold">Dashboard Overview</h3>
					</div>
					<div className="grid divide-x divide-y @lg:grid-cols-2 @xl:grid-cols-3">
						{stats.map((stat, i) => (
							<DashboardStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
