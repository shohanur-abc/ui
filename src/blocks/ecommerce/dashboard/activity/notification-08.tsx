import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Truck,
	Package,
	MapPin,
	Clock,
	AlertTriangle,
	CheckCircle2,
	XCircle,
	Phone,
	Navigation,
	type LucideIcon,
} from 'lucide-react';

interface ShippingAlert {
	id: string;
	orderId: string;
	type: 'delayed' | 'delivered' | 'exception' | 'out_for_delivery' | 'returned';
	carrier: string;
	trackingNumber: string;
	customer: string;
	destination: string;
	message: string;
	eta?: string;
	timestamp: string;
}

interface ShippingAlertsProps {
	title: string;
	alerts: ShippingAlert[];
	stats: {
		inTransit: number;
		delayed: number;
		delivered: number;
	};
}

const TypeConfig: Record<
	ShippingAlert['type'],
	{ icon: LucideIcon; className: string; badgeClass: string; label: string }
> = {
	delayed: {
		icon: AlertTriangle,
		className: 'bg-amber-500/20 text-amber-400',
		badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		label: 'Delayed',
	},
	delivered: {
		icon: CheckCircle2,
		className: 'bg-emerald-500/20 text-emerald-400',
		badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		label: 'Delivered',
	},
	exception: {
		icon: XCircle,
		className: 'bg-rose-500/20 text-rose-400',
		badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		label: 'Exception',
	},
	out_for_delivery: {
		icon: Truck,
		className: 'bg-blue-500/20 text-blue-400',
		badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		label: 'Out for Delivery',
	},
	returned: {
		icon: Package,
		className: 'bg-purple-500/20 text-purple-400',
		badgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		label: 'Returned',
	},
};

const AlertCard = ({ alert }: { alert: ShippingAlert }) => {
	const config = TypeConfig[alert.type];
	const Icon = config.icon;
	const isUrgent = ['delayed', 'exception', 'returned'].includes(alert.type);

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				alert.type === 'exception'
					? 'border-rose-500/30 bg-rose-500/5'
					: alert.type === 'delayed'
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="font-semibold text-foreground font-mono">
								{alert.orderId}
							</span>
							<Badge variant="outline" className={config.badgeClass}>
								{config.label}
							</Badge>
						</div>
						<span className="text-xs text-muted-foreground shrink-0">
							{alert.timestamp}
						</span>
					</div>
					<p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
					<div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
						<span className="flex items-center gap-1">
							<Truck className="size-3" />
							{alert.carrier}
						</span>
						<span className="font-mono">{alert.trackingNumber}</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<MapPin className="size-3" />
								{alert.destination}
							</span>
							{alert.eta && (
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									ETA: {alert.eta}
								</span>
							)}
						</div>
						{isUrgent && (
							<div className="flex gap-1">
								<Button
									size="sm"
									variant="outline"
									className="h-6 gap-1 text-xs"
								>
									<Navigation className="size-3" />
									Track
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="h-6 gap-1 text-xs"
								>
									<Phone className="size-3" />
									Contact
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const ShippingStats = ({ stats }: { stats: ShippingAlertsProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<Truck className="size-4 text-blue-400 mb-2" />
			<span className="text-2xl font-bold text-blue-400 block">
				{stats.inTransit}
			</span>
			<span className="text-xs text-muted-foreground">In Transit</span>
		</div>
		<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<AlertTriangle className="size-4 text-amber-400 mb-2" />
			<span className="text-2xl font-bold text-amber-400 block">
				{stats.delayed}
			</span>
			<span className="text-xs text-muted-foreground">Delayed</span>
		</div>
		<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-2" />
			<span className="text-2xl font-bold text-emerald-400 block">
				{stats.delivered}
			</span>
			<span className="text-xs text-muted-foreground">Delivered</span>
		</div>
	</div>
);

const ShippingAlerts = ({ title, alerts, stats }: ShippingAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Truck className="size-5" />
				{title}
				{stats.delayed > 0 && (
					<Badge className="bg-amber-500 text-white">
						{stats.delayed} Delayed
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ShippingStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: ShippingAlert[] = [
		{
			id: '1',
			orderId: 'ORD-2024-0892',
			type: 'exception',
			carrier: 'FedEx',
			trackingNumber: '789456123456',
			customer: 'Sarah Chen',
			destination: 'San Francisco, CA',
			message:
				'Package marked as undeliverable. Customer not available at delivery address.',
			timestamp: '10 min ago',
		},
		{
			id: '2',
			orderId: 'ORD-2024-0891',
			type: 'delayed',
			carrier: 'UPS',
			trackingNumber: '1Z999AA10123456784',
			customer: 'Mike Johnson',
			destination: 'Los Angeles, CA',
			message:
				'Weather delay - Package stuck at Denver hub due to snowstorm.',
			eta: 'Mar 20 (was Mar 18)',
			timestamp: '1 hour ago',
		},
		{
			id: '3',
			orderId: 'ORD-2024-0890',
			type: 'out_for_delivery',
			carrier: 'USPS',
			trackingNumber: '9400111899223100012345',
			customer: 'Emily Davis',
			destination: 'Chicago, IL',
			message: 'Package is out for delivery and will arrive today.',
			eta: 'Today by 5:00 PM',
			timestamp: '2 hours ago',
		},
		{
			id: '4',
			orderId: 'ORD-2024-0889',
			type: 'delivered',
			carrier: 'DHL',
			trackingNumber: '1234567890',
			customer: 'Alex Kim',
			destination: 'Miami, FL',
			message: 'Package delivered successfully. Signed by: A. Kim',
			timestamp: '3 hours ago',
		},
		{
			id: '5',
			orderId: 'ORD-2024-0888',
			type: 'returned',
			carrier: 'FedEx',
			trackingNumber: '111222333444',
			customer: 'Jordan Lee',
			destination: 'Seattle, WA',
			message:
				'Package returned to sender - Customer refused delivery.',
			timestamp: '5 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ShippingAlerts
					title="Shipping Alerts"
					alerts={alerts}
					stats={{
						inTransit: 47,
						delayed: 5,
						delivered: 23,
					}}
				/>
			</div>
		</section>
	);
}
