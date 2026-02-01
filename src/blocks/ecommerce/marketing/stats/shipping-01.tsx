import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, CheckCircle, Package } from 'lucide-react';

interface ShippingStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

const ShippingStat = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: ShippingStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-start justify-between">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<Badge
				variant={positive ? 'default' : 'destructive'}
				className="text-[10px]"
			>
				{change}
			</Badge>
		</div>
		<div className="mt-4">
			<p className="text-2xl font-bold tracking-tight">{value}</p>
			<p className="mt-1 text-sm text-muted-foreground">{label}</p>
		</div>
	</Card>
);

export default function Main() {
	const stats: ShippingStatProps[] = [
		{
			icon: Package,
			label: 'Orders Shipped',
			value: '12,847',
			change: '+18%',
			positive: true,
		},
		{
			icon: Truck,
			label: 'In Transit',
			value: '2,847',
			change: '+12%',
			positive: true,
		},
		{
			icon: CheckCircle,
			label: 'Delivered',
			value: '9,284',
			change: '+24%',
			positive: true,
		},
		{
			icon: Clock,
			label: 'Avg. Delivery',
			value: '2.4 days',
			change: '-0.3d',
			positive: true,
		},
		{
			icon: MapPin,
			label: 'Zones Covered',
			value: '142',
			change: '+8',
			positive: true,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<ShippingStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
