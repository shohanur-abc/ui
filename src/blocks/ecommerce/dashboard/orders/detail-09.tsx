import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
	Warehouse,
	Package,
	MapPin,
	User,
	Calendar,
	Clock,
	CheckCircle,
	Truck,
	AlertTriangle,
	BarChart3,
	Edit,
	Printer,
} from 'lucide-react';

interface FulfillmentDetailProps {
	fulfillment: {
		id: string;
		orderId: string;
		status: 'pending' | 'picking' | 'packing' | 'ready' | 'shipped';
		progress: number;
		warehouse: { name: string; code: string; location: string };
		assignee?: { name: string; initials: string; role: string };
		items: {
			name: string;
			sku: string;
			location: string;
			picked: boolean;
			quantity: number;
		}[];
		weight: string;
		packingSlip: boolean;
		priority: 'standard' | 'express' | 'same-day';
		timestamps: { created: string; started?: string; estimated: string };
		notes?: string;
	};
	labels: {
		warehouse: string;
		assignee: string;
		items: string;
		pickedCount: string;
		package: string;
		priority: string;
		printLabel: string;
		markReady: string;
		edit: string;
	};
}

const StatusConfig = {
	pending: {
		className: 'bg-muted text-muted-foreground border-border',
		label: 'Pending',
		progress: 0,
	},
	picking: {
		className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
		label: 'Picking',
		progress: 25,
	},
	packing: {
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
		label: 'Packing',
		progress: 50,
	},
	ready: {
		className: 'bg-primary/10 text-primary border-primary/30',
		label: 'Ready to Ship',
		progress: 75,
	},
	shipped: {
		className: 'bg-accent/10 text-accent border-accent/30',
		label: 'Shipped',
		progress: 100,
	},
};

const PriorityBadge = ({
	priority,
}: {
	priority: FulfillmentDetailProps['fulfillment']['priority'];
}) => {
	const config = {
		standard: {
			className: 'bg-muted text-muted-foreground',
			icon: null,
			label: 'Standard',
		},
		express: {
			className: 'bg-primary/10 text-primary',
			icon: Truck,
			label: 'Express',
		},
		'same-day': {
			className: 'bg-destructive text-white',
			icon: AlertTriangle,
			label: 'Same Day',
		},
	};
	const { className, icon: Icon, label } = config[priority];
	return (
		<Badge className={`gap-1 ${className}`}>
			{Icon && <Icon className="size-3" />}
			{label}
		</Badge>
	);
};

const PickItem = ({
	item,
}: {
	item: FulfillmentDetailProps['fulfillment']['items'][0];
}) => (
	<div
		className={`flex items-center gap-4 p-3 rounded-lg border ${item.picked ? 'bg-accent/5 border-accent/20' : 'bg-muted/20 border-border/50'}`}
	>
		<div
			className={`size-8 rounded-full flex items-center justify-center ${item.picked ? 'bg-accent text-white' : 'bg-muted'}`}
		>
			{item.picked ? (
				<CheckCircle className="size-4" />
			) : (
				<Package className="size-4 text-muted-foreground" />
			)}
		</div>
		<div className="flex-1">
			<p className="font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
		</div>
		<div className="text-right">
			<Badge variant="outline" className="text-xs mb-1">
				{item.location}
			</Badge>
			<p className="text-sm">Qty: {item.quantity}</p>
		</div>
	</div>
);

const FulfillmentDetail = ({ fulfillment, labels }: FulfillmentDetailProps) => {
	const { className: statusClassName, label: statusLabel } =
		StatusConfig[fulfillment.status];
	const pickedCount = fulfillment.items.filter((i) => i.picked).length;

	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Warehouse className="size-5 text-primary" />
						</div>
						<div>
							<CardTitle className="text-lg">{fulfillment.id}</CardTitle>
							<p className="text-sm text-muted-foreground">
								Order {fulfillment.orderId}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<PriorityBadge priority={fulfillment.priority} />
						<Badge variant="outline" className={statusClassName}>
							{statusLabel}
						</Badge>
					</div>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Fulfillment Progress</span>
						<span className="font-medium">{fulfillment.progress}%</span>
					</div>
					<Progress value={fulfillment.progress} className="h-2" />
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
						<div className="flex items-center gap-2 text-muted-foreground mb-2">
							<Warehouse className="size-4" />
							<span className="text-sm">{labels.warehouse}</span>
						</div>
						<p className="font-medium">{fulfillment.warehouse.name}</p>
						<p className="text-xs text-muted-foreground">
							{fulfillment.warehouse.code}
						</p>
						<div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
							<MapPin className="size-3" />
							{fulfillment.warehouse.location}
						</div>
					</div>

					{fulfillment.assignee && (
						<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
							<div className="flex items-center gap-2 text-muted-foreground mb-2">
								<User className="size-4" />
								<span className="text-sm">{labels.assignee}</span>
							</div>
							<div className="flex items-center gap-3">
								<Avatar className="size-10">
									<AvatarFallback className="bg-primary/10 text-primary">
										{fulfillment.assignee.initials}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{fulfillment.assignee.name}</p>
									<p className="text-xs text-muted-foreground">
										{fulfillment.assignee.role}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="p-3 rounded-lg bg-muted/30 text-center">
						<Calendar className="size-4 text-muted-foreground mx-auto mb-1" />
						<p className="text-xs text-muted-foreground">Created</p>
						<p className="font-medium text-sm">
							{fulfillment.timestamps.created}
						</p>
					</div>
					{fulfillment.timestamps.started && (
						<div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
							<Clock className="size-4 text-blue-500 mx-auto mb-1" />
							<p className="text-xs text-muted-foreground">Started</p>
							<p className="font-medium text-sm">
								{fulfillment.timestamps.started}
							</p>
						</div>
					)}
					<div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
						<Truck className="size-4 text-primary mx-auto mb-1" />
						<p className="text-xs text-muted-foreground">Estimated Ship</p>
						<p className="font-medium text-sm text-primary">
							{fulfillment.timestamps.estimated}
						</p>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between mb-3">
						<p className="text-sm font-semibold text-muted-foreground">
							{labels.items}
						</p>
						<Badge
							variant={
								pickedCount === fulfillment.items.length
									? 'default'
									: 'secondary'
							}
						>
							{pickedCount}/{fulfillment.items.length} picked
						</Badge>
					</div>
					<div className="space-y-2">
						{fulfillment.items.map((item, i) => (
							<PickItem key={i} item={item} />
						))}
					</div>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4">
					<div className="p-3 rounded-lg bg-muted/30">
						<p className="text-xs text-muted-foreground">{labels.package}</p>
						<p className="font-medium">Total Weight: {fulfillment.weight}</p>
					</div>
					<div className="p-3 rounded-lg bg-muted/30">
						<p className="text-xs text-muted-foreground">Packing Slip</p>
						<Badge variant={fulfillment.packingSlip ? 'default' : 'outline'}>
							{fulfillment.packingSlip ? 'Printed' : 'Not Printed'}
						</Badge>
					</div>
				</div>

				{fulfillment.notes && (
					<div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
						<p className="text-sm font-medium flex items-center gap-2 mb-1">
							<AlertTriangle className="size-4 text-yellow-600" />
							Special Instructions
						</p>
						<p className="text-sm text-muted-foreground">{fulfillment.notes}</p>
					</div>
				)}
			</CardContent>

			<CardFooter className="gap-3 border-t border-border/50">
				<Button variant="outline" className="gap-1.5">
					<Edit className="size-4" />
					{labels.edit}
				</Button>
				<Button variant="outline" className="flex-1 gap-1.5">
					<Printer className="size-4" />
					{labels.printLabel}
				</Button>
				<Button className="flex-1 gap-1.5">
					<CheckCircle className="size-4" />
					{labels.markReady}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const labels = {
		warehouse: 'Warehouse',
		assignee: 'Assigned To',
		items: 'Pick List',
		pickedCount: 'Picked',
		package: 'Package Info',
		priority: 'Priority',
		printLabel: 'Print Label',
		markReady: 'Mark Ready',
		edit: 'Edit',
	};

	const fulfillment = {
		id: 'FUL-2024-001',
		orderId: 'ORD-2024-001',
		status: 'picking' as const,
		progress: 40,
		warehouse: {
			name: 'East Coast Fulfillment',
			code: 'WH-NYC-001',
			location: 'Newark, NJ',
		},
		assignee: {
			name: 'Mike Johnson',
			initials: 'MJ',
			role: 'Warehouse Associate',
		},
		items: [
			{
				name: 'Wireless Bluetooth Headphones',
				sku: 'SKU-WBH-001',
				location: 'A-12-3',
				picked: true,
				quantity: 1,
			},
			{
				name: 'USB-C Charging Cable',
				sku: 'SKU-UCC-003',
				location: 'B-04-1',
				picked: true,
				quantity: 2,
			},
			{
				name: 'Headphone Case',
				sku: 'SKU-HC-002',
				location: 'C-08-5',
				picked: false,
				quantity: 1,
			},
		],
		weight: '2.4 lbs',
		packingSlip: false,
		priority: 'express' as const,
		timestamps: {
			created: 'Jan 27, 9:00 AM',
			started: 'Jan 27, 10:30 AM',
			estimated: 'Jan 27, 2:00 PM',
		},
		notes:
			'Handle with care - fragile electronics. Include complimentary cleaning cloth.',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<FulfillmentDetail fulfillment={fulfillment} labels={labels} />
			</div>
		</section>
	);
}
