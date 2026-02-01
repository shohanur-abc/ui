'use client';

import * as React from 'react';
import {
	Package,
	Box,
	Truck,
	CheckCircle2,
	Clock,
	MoreHorizontal,
	ArrowRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

type TransferStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

type TransferItem = {
	id: string;
	productName: string;
	productSku: string;
	productImage: string;
	quantity: number;
	fromLocation: string;
	toLocation: string;
	status: TransferStatus;
	initiatedDate: string;
	estimatedArrival: string;
};

type HeaderProps = {
	title: string;
	description: string;
	newTransferLabel: string;
};

const Header = ({ title, description, newTransferLabel }: HeaderProps) => (
	<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</div>
		<Button>
			<Truck className="size-4" />
			{newTransferLabel}
		</Button>
	</CardHeader>
);

type StatusBadgeProps = {
	status: TransferStatus;
	labels: Record<TransferStatus, string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const config: Record<
		TransferStatus,
		{
			variant: 'default' | 'secondary' | 'destructive' | 'outline';
			icon: React.ElementType;
		}
	> = {
		pending: { variant: 'secondary', icon: Clock },
		'in-transit': { variant: 'default', icon: Truck },
		delivered: { variant: 'outline', icon: CheckCircle2 },
		cancelled: { variant: 'destructive', icon: Package },
	};

	const { variant, icon: Icon } = config[status];

	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{labels[status]}
		</Badge>
	);
};

type LocationPathProps = {
	from: string;
	to: string;
};

const LocationPath = ({ from, to }: LocationPathProps) => (
	<div className="flex items-center gap-2 text-sm">
		<div className="flex items-center gap-1">
			<Box className="size-3.5 text-muted-foreground" />
			<span>{from}</span>
		</div>
		<ArrowRight className="size-3.5 text-muted-foreground" />
		<div className="flex items-center gap-1">
			<Box className="size-3.5 text-primary" />
			<span className="font-medium">{to}</span>
		</div>
	</div>
);

type TransferRowProps = {
	transfer: TransferItem;
	statusLabels: Record<TransferStatus, string>;
	actions: { label: string; onClick: (id: string) => void }[];
};

const TransferRow = ({ transfer, statusLabels, actions }: TransferRowProps) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
					{transfer.productImage ? (
						<img
							src={transfer.productImage}
							alt={transfer.productName}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div>
					<div className="font-medium">{transfer.productName}</div>
					<div className="text-xs text-muted-foreground">
						{transfer.productSku}
					</div>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-semibold tabular-nums">
			{transfer.quantity}
		</TableCell>
		<TableCell>
			<LocationPath from={transfer.fromLocation} to={transfer.toLocation} />
		</TableCell>
		<TableCell>
			<StatusBadge status={transfer.status} labels={statusLabels} />
		</TableCell>
		<TableCell className="text-sm text-muted-foreground">
			{new Date(transfer.initiatedDate).toLocaleDateString()}
		</TableCell>
		<TableCell className="text-sm">
			{transfer.status === 'delivered' ? (
				<span className="text-muted-foreground">Completed</span>
			) : (
				new Date(transfer.estimatedArrival).toLocaleDateString()
			)}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action) => (
						<DropdownMenuItem
							key={action.label}
							onClick={() => action.onClick(transfer.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const transfers: TransferItem[] = [
		{
			id: '1',
			productName: 'Wireless Mouse Pro',
			productSku: 'WMP-001',
			productImage: '',
			quantity: 100,
			fromLocation: 'Warehouse A',
			toLocation: 'Store NYC',
			status: 'in-transit',
			initiatedDate: '2024-01-15',
			estimatedArrival: '2024-01-18',
		},
		{
			id: '2',
			productName: 'USB-C Dock',
			productSku: 'UCD-002',
			productImage: '',
			quantity: 50,
			fromLocation: 'Warehouse B',
			toLocation: 'Store LA',
			status: 'pending',
			initiatedDate: '2024-01-16',
			estimatedArrival: '2024-01-20',
		},
		{
			id: '3',
			productName: 'Mechanical Keyboard',
			productSku: 'MK-003',
			productImage: '',
			quantity: 75,
			fromLocation: 'Warehouse A',
			toLocation: 'Store Chicago',
			status: 'delivered',
			initiatedDate: '2024-01-10',
			estimatedArrival: '2024-01-13',
		},
		{
			id: '4',
			productName: 'Monitor 27"',
			productSku: 'M27-004',
			productImage: '',
			quantity: 25,
			fromLocation: 'Store NYC',
			toLocation: 'Warehouse C',
			status: 'in-transit',
			initiatedDate: '2024-01-14',
			estimatedArrival: '2024-01-17',
		},
		{
			id: '5',
			productName: 'Webcam HD',
			productSku: 'WHD-005',
			productImage: '',
			quantity: 30,
			fromLocation: 'Warehouse C',
			toLocation: 'Store Miami',
			status: 'cancelled',
			initiatedDate: '2024-01-12',
			estimatedArrival: '2024-01-15',
		},
	];

	const statusLabels: Record<TransferStatus, string> = {
		pending: 'Pending',
		'in-transit': 'In Transit',
		delivered: 'Delivered',
		cancelled: 'Cancelled',
	};

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{
			label: 'Track Shipment',
			onClick: (id: string) => console.log('Track', id),
		},
		{
			label: 'Cancel Transfer',
			onClick: (id: string) => console.log('Cancel', id),
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Stock Transfers"
						description="Track inventory movements between locations"
						newTransferLabel="New Transfer"
					/>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Route</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Initiated</TableHead>
									<TableHead>ETA</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{transfers.map((transfer) => (
									<TransferRow
										key={transfer.id}
										transfer={transfer}
										statusLabels={statusLabels}
										actions={actions}
									/>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
