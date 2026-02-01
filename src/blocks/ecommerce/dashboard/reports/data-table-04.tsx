'use client';

import {
	ArrowDownUp,
	Columns,
	Download,
	LayoutGrid,
	List,
	SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ShippingItem = {
	trackingId: string;
	orderId: string;
	destination: string;
	carrier: string;
	weight: string;
	cost: string;
	status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
	eta: string;
};

const statusConfig = {
	'in-transit': { label: 'In Transit', color: 'bg-blue-500/10 text-blue-500' },
	delivered: {
		label: 'Delivered',
		color: 'bg-emerald-500/10 text-emerald-500',
	},
	pending: { label: 'Pending', color: 'bg-amber-500/10 text-amber-500' },
	delayed: { label: 'Delayed', color: 'bg-rose-500/10 text-rose-500' },
};

type StatusBadgeProps = { status: ShippingItem['status'] };

const StatusBadge = ({ status }: StatusBadgeProps) => (
	<Badge
		variant="secondary"
		className={`border-0 ${statusConfig[status].color}`}
	>
		{statusConfig[status].label}
	</Badge>
);

type ShippingRowProps = ShippingItem;

const ShippingRow = ({
	trackingId,
	orderId,
	destination,
	carrier,
	weight,
	cost,
	status,
	eta,
}: ShippingRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-mono text-xs">{trackingId}</TableCell>
		<TableCell className="font-medium">{orderId}</TableCell>
		<TableCell className="max-w-[180px] truncate text-muted-foreground">
			{destination}
		</TableCell>
		<TableCell>{carrier}</TableCell>
		<TableCell className="text-right">{weight}</TableCell>
		<TableCell className="text-right font-medium">{cost}</TableCell>
		<TableCell>
			<StatusBadge status={status} />
		</TableCell>
		<TableCell className="text-right text-sm text-muted-foreground">
			{eta}
		</TableCell>
	</TableRow>
);

type ToolbarProps = {
	viewOptions: { value: string; icon: React.ElementType }[];
	sortOptions: { value: string; label: string }[];
};

const Toolbar = ({ viewOptions, sortOptions }: ToolbarProps) => (
	<div className="flex flex-col gap-3 @lg:flex-row @lg:items-center @lg:justify-between">
		<Tabs defaultValue="list">
			<TabsList className="h-9">
				{viewOptions.map((option) => (
					<TabsTrigger key={option.value} value={option.value} className="px-3">
						<option.icon className="size-4" />
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
		<div className="flex items-center gap-2">
			<Select defaultValue="newest">
				<SelectTrigger className="h-9 w-[160px]">
					<ArrowDownUp className="mr-2 size-3" />
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button variant="outline" size="sm">
				<SlidersHorizontal className="mr-2 size-4" />
				Filters
			</Button>
			<Button variant="outline" size="sm">
				<Download className="mr-2 size-4" />
				Export
			</Button>
		</div>
	</div>
);

export default function Main() {
	const viewOptions = [
		{ value: 'list', icon: List },
		{ value: 'grid', icon: LayoutGrid },
		{ value: 'columns', icon: Columns },
	];

	const sortOptions = [
		{ value: 'newest', label: 'Newest First' },
		{ value: 'oldest', label: 'Oldest First' },
		{ value: 'cost-high', label: 'Cost: High to Low' },
		{ value: 'cost-low', label: 'Cost: Low to High' },
	];

	const shipments: ShippingItem[] = [
		{
			trackingId: 'TRK-78234521',
			orderId: 'ORD-8921',
			destination: 'New York, NY 10001',
			carrier: 'FedEx',
			weight: '2.5 kg',
			cost: '$12.50',
			status: 'in-transit',
			eta: 'Jan 30',
		},
		{
			trackingId: 'TRK-78234520',
			orderId: 'ORD-8920',
			destination: 'Los Angeles, CA 90001',
			carrier: 'UPS',
			weight: '1.2 kg',
			cost: '$9.80',
			status: 'delivered',
			eta: 'Jan 28',
		},
		{
			trackingId: 'TRK-78234519',
			orderId: 'ORD-8919',
			destination: 'Chicago, IL 60601',
			carrier: 'USPS',
			weight: '0.8 kg',
			cost: '$7.25',
			status: 'pending',
			eta: 'Jan 31',
		},
		{
			trackingId: 'TRK-78234518',
			orderId: 'ORD-8918',
			destination: 'Houston, TX 77001',
			carrier: 'DHL',
			weight: '3.7 kg',
			cost: '$18.90',
			status: 'delayed',
			eta: 'Feb 2',
		},
		{
			trackingId: 'TRK-78234517',
			orderId: 'ORD-8917',
			destination: 'Phoenix, AZ 85001',
			carrier: 'FedEx',
			weight: '1.5 kg',
			cost: '$11.20',
			status: 'in-transit',
			eta: 'Jan 29',
		},
		{
			trackingId: 'TRK-78234516',
			orderId: 'ORD-8916',
			destination: 'Seattle, WA 98101',
			carrier: 'UPS',
			weight: '4.2 kg',
			cost: '$22.50',
			status: 'delivered',
			eta: 'Jan 27',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Shipping Report
						</CardTitle>
						<CardDescription>
							Track shipments and logistics across all carriers
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Toolbar viewOptions={viewOptions} sortOptions={sortOptions} />
						<div className="rounded-lg border border-border/50 overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow className="border-border/50 hover:bg-transparent">
										<TableHead>Tracking ID</TableHead>
										<TableHead>Order</TableHead>
										<TableHead>Destination</TableHead>
										<TableHead>Carrier</TableHead>
										<TableHead className="text-right">Weight</TableHead>
										<TableHead className="text-right">Cost</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">ETA</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{shipments.map((shipment) => (
										<ShippingRow key={shipment.trackingId} {...shipment} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
