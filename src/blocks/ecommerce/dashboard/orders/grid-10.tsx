import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Warehouse,
	Package,
	MapPin,
	Truck,
	AlertTriangle,
	CheckCircle,
	Clock,
	ArrowRight,
} from 'lucide-react';

interface WarehouseCard {
	id: string;
	name: string;
	location: string;
	ordersInQueue: number;
	ordersProcessing: number;
	ordersShipped: number;
	capacity: number;
	currentLoad: number;
	status: 'operational' | 'busy' | 'critical';
	lastSync: string;
}

interface WarehouseGridCardProps {
	warehouse: WarehouseCard;
	labels: {
		queue: string;
		processing: string;
		shipped: string;
		capacity: string;
		manage: string;
	};
}

const StatusBadge = ({ status }: { status: WarehouseCard['status'] }) => {
	const config: Record<
		WarehouseCard['status'],
		{ className: string; icon: typeof CheckCircle; label: string }
	> = {
		operational: {
			className: 'bg-accent/10 text-accent border-accent/30',
			icon: CheckCircle,
			label: 'Operational',
		},
		busy: {
			className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
			icon: Clock,
			label: 'Busy',
		},
		critical: {
			className: 'bg-destructive/10 text-destructive border-destructive/30',
			icon: AlertTriangle,
			label: 'Critical',
		},
	};
	const { className, icon: Icon, label } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const CapacityBar = ({
	current,
	total,
}: {
	current: number;
	total: number;
}) => {
	const percentage = (current / total) * 100;
	const getColor = () => {
		if (percentage >= 90) return 'bg-destructive';
		if (percentage >= 70) return 'bg-yellow-500';
		return 'bg-accent';
	};
	return (
		<div>
			<div className="flex items-center justify-between text-xs mb-1">
				<span className="text-muted-foreground">Capacity</span>
				<span className="font-medium">{percentage.toFixed(0)}%</span>
			</div>
			<div className="h-2 bg-muted/50 rounded-full overflow-hidden">
				<div
					className={`h-full rounded-full transition-all ${getColor()}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

const WarehouseGridCard = ({ warehouse, labels }: WarehouseGridCardProps) => (
	<Card
		className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all ${warehouse.status === 'critical' ? 'border-destructive/30' : 'hover:border-primary/30'}`}
	>
		<CardContent className="p-4">
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Warehouse className="size-5 text-primary" />
					</div>
					<div>
						<p className="font-semibold">{warehouse.name}</p>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<MapPin className="size-3" />
							{warehouse.location}
						</div>
					</div>
				</div>
				<StatusBadge status={warehouse.status} />
			</div>

			<div className="grid grid-cols-3 gap-2 mb-4">
				<div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
					<p className="text-lg font-bold text-yellow-600">
						{warehouse.ordersInQueue}
					</p>
					<p className="text-xs text-muted-foreground">{labels.queue}</p>
				</div>
				<div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
					<p className="text-lg font-bold text-blue-600">
						{warehouse.ordersProcessing}
					</p>
					<p className="text-xs text-muted-foreground">{labels.processing}</p>
				</div>
				<div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-center">
					<p className="text-lg font-bold text-accent">
						{warehouse.ordersShipped}
					</p>
					<p className="text-xs text-muted-foreground">{labels.shipped}</p>
				</div>
			</div>

			<CapacityBar current={warehouse.currentLoad} total={warehouse.capacity} />

			<Separator className="my-3" />

			<div className="flex items-center justify-between">
				<span className="text-xs text-muted-foreground">
					Synced: {warehouse.lastSync}
				</span>
				<Button variant="ghost" size="sm" className="gap-1 text-primary">
					{labels.manage}
					<ArrowRight className="size-3" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		queue: 'Queue',
		processing: 'Processing',
		shipped: 'Shipped',
		capacity: 'Capacity',
		manage: 'Manage',
	};

	const warehouses: WarehouseCard[] = [
		{
			id: 'WH-001',
			name: 'East Coast Hub',
			location: 'New York, NY',
			ordersInQueue: 45,
			ordersProcessing: 23,
			ordersShipped: 156,
			capacity: 500,
			currentLoad: 325,
			status: 'operational',
			lastSync: '2 min ago',
		},
		{
			id: 'WH-002',
			name: 'West Coast Center',
			location: 'Los Angeles, CA',
			ordersInQueue: 78,
			ordersProcessing: 34,
			ordersShipped: 201,
			capacity: 600,
			currentLoad: 485,
			status: 'busy',
			lastSync: '1 min ago',
		},
		{
			id: 'WH-003',
			name: 'Central Warehouse',
			location: 'Chicago, IL',
			ordersInQueue: 23,
			ordersProcessing: 12,
			ordersShipped: 89,
			capacity: 300,
			currentLoad: 145,
			status: 'operational',
			lastSync: '5 min ago',
		},
		{
			id: 'WH-004',
			name: 'South Distribution',
			location: 'Miami, FL',
			ordersInQueue: 112,
			ordersProcessing: 45,
			ordersShipped: 67,
			capacity: 400,
			currentLoad: 380,
			status: 'critical',
			lastSync: '30 sec ago',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
					{warehouses.map((warehouse) => (
						<WarehouseGridCard
							key={warehouse.id}
							warehouse={warehouse}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
