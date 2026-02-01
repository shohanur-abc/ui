import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	Clock,
	Truck,
	CheckCircle,
	AlertTriangle,
} from 'lucide-react';

interface InventoryStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	status: 'healthy' | 'warning' | 'critical';
	details: string;
}

const InventoryStat = ({
	icon: Icon,
	label,
	value,
	status,
	details,
}: InventoryStatProps) => {
	const statusConfig = {
		healthy: { color: 'text-accent', badge: 'Healthy' },
		warning: { color: 'text-yellow-500', badge: 'Warning' },
		critical: { color: 'text-destructive', badge: 'Critical' },
	};

	return (
		<Card className="group p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className={`size-4 ${statusConfig[status].color}`} />
				</div>
				<Badge
					variant="outline"
					className={`text-[10px] ${statusConfig[status].color}`}
				>
					{statusConfig[status].badge}
				</Badge>
			</div>
			<div className="mt-4 space-y-1">
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-2xl font-bold tracking-tight">{value}</p>
			</div>
			<Separator className="my-4" />
			<p className="text-xs text-muted-foreground">{details}</p>
		</Card>
	);
};

export default function Main() {
	const stats: InventoryStatProps[] = [
		{
			icon: Package,
			label: 'Total SKUs',
			value: '12,847',
			status: 'healthy',
			details: '284 new this month',
		},
		{
			icon: CheckCircle,
			label: 'In Stock',
			value: '11,294',
			status: 'healthy',
			details: '88% of total inventory',
		},
		{
			icon: AlertTriangle,
			label: 'Low Stock',
			value: '847',
			status: 'warning',
			details: 'Below reorder point',
		},
		{
			icon: Clock,
			label: 'Out of Stock',
			value: '428',
			status: 'critical',
			details: 'Restock needed',
		},
		{
			icon: Truck,
			label: 'On Order',
			value: '1,284',
			status: 'healthy',
			details: 'Expected within 7 days',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<InventoryStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
