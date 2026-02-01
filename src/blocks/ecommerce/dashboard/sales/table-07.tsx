'use client';

import { Truck, Package, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ShipmentData = {
	orderId: string;
	customer: string;
	destination: string;
	carrier: string;
	status: 'processing' | 'shipped' | 'in-transit' | 'delivered' | 'delayed';
	progress: number;
	estimatedDelivery: string;
	trackingNumber: string;
};

type ShipmentTableCardProps = {
	title: string;
	description: string;
	shipments: ShipmentData[];
};

const getStatusBadge = (status: ShipmentData['status']) => {
	const styles: Record<
		ShipmentData['status'],
		{
			variant: 'default' | 'secondary' | 'destructive' | 'outline';
			icon: typeof Package;
		}
	> = {
		processing: { variant: 'secondary', icon: Package },
		shipped: { variant: 'outline', icon: Truck },
		'in-transit': { variant: 'default', icon: Truck },
		delivered: { variant: 'default', icon: CheckCircle },
		delayed: { variant: 'destructive', icon: Clock },
	};
	const { variant, icon: Icon } = styles[status];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{status.replace('-', ' ')}
		</Badge>
	);
};

const ShipmentTableCard = ({
	title,
	description,
	shipments,
}: ShipmentTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Truck className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order</TableHead>
							<TableHead>Destination</TableHead>
							<TableHead>Carrier</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[150px]">Progress</TableHead>
							<TableHead>ETA</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{shipments.map((shipment) => (
							<TableRow
								key={shipment.orderId}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell>
									<div>
										<p className="font-mono font-medium">{shipment.orderId}</p>
										<p className="text-xs text-muted-foreground">
											{shipment.customer}
										</p>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<MapPin className="size-3 text-muted-foreground" />
										<span className="text-sm">{shipment.destination}</span>
									</div>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{shipment.carrier}
								</TableCell>
								<TableCell>{getStatusBadge(shipment.status)}</TableCell>
								<TableCell>
									<div className="space-y-1">
										<Progress value={shipment.progress} className="h-2" />
										<span className="text-xs text-muted-foreground">
											{shipment.progress}%
										</span>
									</div>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{shipment.estimatedDelivery}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const shipments: ShipmentData[] = [
		{
			orderId: 'ORD-2851',
			customer: 'John Doe',
			destination: 'New York, NY',
			carrier: 'FedEx',
			status: 'in-transit',
			progress: 65,
			estimatedDelivery: 'Tomorrow',
			trackingNumber: 'FX123456789',
		},
		{
			orderId: 'ORD-2850',
			customer: 'Jane Smith',
			destination: 'Los Angeles, CA',
			carrier: 'UPS',
			status: 'delivered',
			progress: 100,
			estimatedDelivery: 'Delivered',
			trackingNumber: 'UP987654321',
		},
		{
			orderId: 'ORD-2849',
			customer: 'Bob Wilson',
			destination: 'Chicago, IL',
			carrier: 'USPS',
			status: 'shipped',
			progress: 25,
			estimatedDelivery: 'In 3 days',
			trackingNumber: 'US456789123',
		},
		{
			orderId: 'ORD-2848',
			customer: 'Alice Brown',
			destination: 'Miami, FL',
			carrier: 'DHL',
			status: 'delayed',
			progress: 45,
			estimatedDelivery: 'TBD',
			trackingNumber: 'DH789123456',
		},
		{
			orderId: 'ORD-2847',
			customer: 'Charlie Davis',
			destination: 'Seattle, WA',
			carrier: 'FedEx',
			status: 'processing',
			progress: 10,
			estimatedDelivery: 'In 4 days',
			trackingNumber: 'FX321654987',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ShipmentTableCard
					title="Shipment Tracking"
					description="Active shipments and delivery status"
					shipments={shipments}
				/>
			</div>
		</section>
	);
}
