import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Package,
	AlertTriangle,
	TrendingUp,
	TrendingDown,
	RotateCcw,
	Truck,
	Archive,
	type LucideIcon,
} from 'lucide-react';

interface InventoryEvent {
	id: string;
	type:
		| 'restock'
		| 'low-stock'
		| 'out-of-stock'
		| 'return'
		| 'transfer'
		| 'adjustment';
	productName: string;
	sku: string;
	quantity: number;
	previousQuantity?: number;
	location?: string;
	timestamp: string;
	isUrgent?: boolean;
}

interface InventoryTimelineProps {
	title: string;
	events: InventoryEvent[];
}

const EventTypeConfig: Record<
	InventoryEvent['type'],
	{ icon: LucideIcon; label: string; className: string }
> = {
	restock: {
		icon: Package,
		label: 'Restocked',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
	},
	'low-stock': {
		icon: AlertTriangle,
		label: 'Low Stock',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	},
	'out-of-stock': {
		icon: AlertTriangle,
		label: 'Out of Stock',
		className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	},
	return: {
		icon: RotateCcw,
		label: 'Returned',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	},
	transfer: {
		icon: Truck,
		label: 'Transferred',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
	},
	adjustment: {
		icon: Archive,
		label: 'Adjusted',
		className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
	},
};

const EventIcon = ({
	type,
	isUrgent,
}: {
	type: InventoryEvent['type'];
	isUrgent?: boolean;
}) => {
	const config = EventTypeConfig[type];
	const Icon = config.icon;

	return (
		<div
			className={`relative flex size-10 items-center justify-center rounded-lg ${config.className.split(' ').slice(0, 2).join(' ')}`}
		>
			<Icon className={`size-5 ${config.className.split(' ')[2]}`} />
			{isUrgent && (
				<span className="absolute -right-1 -top-1 flex size-3 rounded-full bg-rose-500 animate-pulse" />
			)}
		</div>
	);
};

const QuantityChange = ({
	type,
	quantity,
	previousQuantity,
}: {
	type: InventoryEvent['type'];
	quantity: number;
	previousQuantity?: number;
}) => {
	const isIncrease = type === 'restock' || type === 'return';
	const showDelta =
		previousQuantity !== undefined &&
		(type === 'adjustment' || type === 'transfer');

	if (showDelta) {
		const delta = quantity - (previousQuantity || 0);
		const isPositive = delta > 0;
		return (
			<div
				className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
			>
				{isPositive ? (
					<TrendingUp className="size-4" />
				) : (
					<TrendingDown className="size-4" />
				)}
				<span>
					{isPositive ? '+' : ''}
					{delta}
				</span>
				<span className="text-muted-foreground">→ {quantity}</span>
			</div>
		);
	}

	return (
		<div
			className={`flex items-center gap-1 text-sm font-medium ${
				isIncrease
					? 'text-emerald-400'
					: type === 'out-of-stock'
						? 'text-rose-400'
						: 'text-amber-400'
			}`}
		>
			{isIncrease && <TrendingUp className="size-4" />}
			{type === 'low-stock' && <TrendingDown className="size-4" />}
			<span>
				{isIncrease ? '+' : ''}
				{quantity} units
			</span>
		</div>
	);
};

const EventCard = ({ event }: { event: InventoryEvent }) => {
	const config = EventTypeConfig[event.type];

	return (
		<div className="group relative flex gap-4 pb-6 last:pb-0">
			<div className="relative flex flex-col items-center">
				<EventIcon type={event.type} isUrgent={event.isUrgent} />
				<div className="absolute top-10 h-[calc(100%+0.5rem)] w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="rounded-lg border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between gap-2">
							<div className="flex flex-col gap-1 min-w-0">
								<h4 className="font-medium text-foreground truncate">
									{event.productName}
								</h4>
								<span className="text-xs font-mono text-muted-foreground">
									{event.sku}
								</span>
							</div>
							<Badge variant="outline" className={config.className}>
								{config.label}
							</Badge>
						</div>
						<div className="flex items-center justify-between pt-2 border-t border-border/50">
							<QuantityChange
								type={event.type}
								quantity={event.quantity}
								previousQuantity={event.previousQuantity}
							/>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								{event.location && <span>{event.location}</span>}
								<span>•</span>
								<span>{event.timestamp}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const InventoryTimeline = ({ title, events }: InventoryTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm">
					Export
				</Button>
				<Button size="sm">Add Stock</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const inventoryEvents: InventoryEvent[] = [
		{
			id: '1',
			type: 'out-of-stock',
			productName: 'Premium Wireless Earbuds',
			sku: 'SKU-WE-2847',
			quantity: 0,
			timestamp: '5 min ago',
			location: 'Warehouse A',
			isUrgent: true,
		},
		{
			id: '2',
			type: 'restock',
			productName: 'Smart Watch Pro Max',
			sku: 'SKU-SW-1293',
			quantity: 150,
			timestamp: '1 hour ago',
			location: 'Warehouse B',
		},
		{
			id: '3',
			type: 'low-stock',
			productName: 'Bluetooth Speaker XL',
			sku: 'SKU-BS-4521',
			quantity: 12,
			timestamp: '2 hours ago',
			location: 'Warehouse A',
			isUrgent: true,
		},
		{
			id: '4',
			type: 'return',
			productName: 'Noise Cancelling Headphones',
			sku: 'SKU-NC-8734',
			quantity: 5,
			timestamp: '3 hours ago',
			location: 'Returns Center',
		},
		{
			id: '5',
			type: 'transfer',
			productName: 'Portable Charger 20000mAh',
			sku: 'SKU-PC-6543',
			quantity: 80,
			previousQuantity: 100,
			timestamp: '4 hours ago',
			location: 'Warehouse A → B',
		},
		{
			id: '6',
			type: 'adjustment',
			productName: 'USB-C Cable 2m',
			sku: 'SKU-UC-9012',
			quantity: 245,
			previousQuantity: 250,
			timestamp: '6 hours ago',
			location: 'Warehouse C',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<InventoryTimeline
					title="Inventory Activity"
					events={inventoryEvents}
				/>
			</div>
		</section>
	);
}
