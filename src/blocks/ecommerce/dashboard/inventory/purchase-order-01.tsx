'use client';

import * as React from 'react';
import {
	Package,
	Truck,
	Clock,
	Calendar,
	MapPin,
	FileText,
	ExternalLink,
	ChevronDown,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type PurchaseOrderStatus = 'draft' | 'pending' | 'ordered' | 'in-transit' | 'received' | 'partial';

type OrderItem = {
	sku: string;
	name: string;
	orderedQty: number;
	receivedQty: number;
	unitCost: number;
};

type PurchaseOrder = {
	id: string;
	poNumber: string;
	supplier: string;
	orderDate: string;
	expectedDate: string;
	status: PurchaseOrderStatus;
	items: OrderItem[];
	totalValue: number;
};

type StatusBadgeProps = {
	status: PurchaseOrderStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<PurchaseOrderStatus, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
		draft: { label: 'Draft', variant: 'outline' },
		pending: { label: 'Pending', variant: 'secondary' },
		ordered: { label: 'Ordered', variant: 'default' },
		'in-transit': { label: 'In Transit', variant: 'default' },
		received: { label: 'Received', variant: 'outline' },
		partial: { label: 'Partial', variant: 'secondary' },
	};

	const { label, variant } = config[status];
	return <Badge variant={variant}>{label}</Badge>;
};

type OrderRowProps = {
	order: PurchaseOrder;
};

const OrderRow = ({ order }: OrderRowProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const itemCount = order.items.length;
	const receivedItems = order.items.filter((i) => i.receivedQty >= i.orderedQty).length;

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className="rounded-lg border">
				<CollapsibleTrigger asChild>
					<div className="flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/50">
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
							<FileText className="size-5 text-primary" />
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<span className="font-mono font-medium">{order.poNumber}</span>
								<StatusBadge status={order.status} />
							</div>
							<p className="text-sm text-muted-foreground">{order.supplier}</p>
						</div>
						<div className="hidden text-center @sm:block">
							<p className="text-xs text-muted-foreground">Items</p>
							<p className="font-medium">{receivedItems}/{itemCount}</p>
						</div>
						<div className="hidden text-center @sm:block">
							<p className="text-xs text-muted-foreground">Order Date</p>
							<p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
						</div>
						<div className="text-center">
							<p className="text-xs text-muted-foreground">Expected</p>
							<p className="font-medium">{new Date(order.expectedDate).toLocaleDateString()}</p>
						</div>
						<div className="text-right">
							<p className="text-xs text-muted-foreground">Total Value</p>
							<p className="font-semibold">${order.totalValue.toLocaleString()}</p>
						</div>
						<ChevronDown
							className={`size-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
						/>
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t bg-muted/30 p-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>SKU</TableHead>
									<TableHead>Product</TableHead>
									<TableHead className="text-right">Ordered</TableHead>
									<TableHead className="text-right">Received</TableHead>
									<TableHead className="text-right">Unit Cost</TableHead>
									<TableHead className="text-right">Total</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{order.items.map((item) => (
									<TableRow key={item.sku}>
										<TableCell className="font-mono text-sm">{item.sku}</TableCell>
										<TableCell>{item.name}</TableCell>
										<TableCell className="text-right">{item.orderedQty}</TableCell>
										<TableCell className="text-right">
											<span className={item.receivedQty < item.orderedQty ? 'text-amber-500' : 'text-emerald-500'}>
												{item.receivedQty}
											</span>
										</TableCell>
										<TableCell className="text-right">${item.unitCost.toFixed(2)}</TableCell>
										<TableCell className="text-right font-medium">
											${(item.orderedQty * item.unitCost).toFixed(2)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<div className="mt-4 flex justify-end gap-2">
							<Button variant="outline" size="sm">
								<ExternalLink className="mr-2 size-4" />
								View Details
							</Button>
							{order.status !== 'received' && (
								<Button size="sm">Receive Items</Button>
							)}
						</div>
					</div>
				</CollapsibleContent>
			</div>
		</Collapsible>
	);
};

export default function Main() {
	const orders: PurchaseOrder[] = [
		{
			id: '1',
			poNumber: 'PO-2024-001',
			supplier: 'ABC Electronics Ltd.',
			orderDate: '2024-01-10',
			expectedDate: '2024-01-25',
			status: 'in-transit',
			totalValue: 12500,
			items: [
				{ sku: 'WH-001', name: 'Wireless Headphones', orderedQty: 100, receivedQty: 0, unitCost: 45.00 },
				{ sku: 'BS-001', name: 'Bluetooth Speaker', orderedQty: 50, receivedQty: 0, unitCost: 65.00 },
				{ sku: 'PB-001', name: 'Power Bank', orderedQty: 150, receivedQty: 0, unitCost: 25.00 },
			],
		},
		{
			id: '2',
			poNumber: 'PO-2024-002',
			supplier: 'Tech Supplies Inc.',
			orderDate: '2024-01-08',
			expectedDate: '2024-01-20',
			status: 'partial',
			totalValue: 8750,
			items: [
				{ sku: 'USB-001', name: 'USB-C Cable', orderedQty: 500, receivedQty: 350, unitCost: 8.50 },
				{ sku: 'HDMI-001', name: 'HDMI Cable', orderedQty: 200, receivedQty: 200, unitCost: 12.00 },
			],
		},
		{
			id: '3',
			poNumber: 'PO-2024-003',
			supplier: 'Global Accessories',
			orderDate: '2024-01-05',
			expectedDate: '2024-01-15',
			status: 'received',
			totalValue: 5200,
			items: [
				{ sku: 'PC-001', name: 'Phone Case', orderedQty: 400, receivedQty: 400, unitCost: 8.00 },
				{ sku: 'SP-001', name: 'Screen Protector', orderedQty: 300, receivedQty: 300, unitCost: 4.00 },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Purchase Orders</CardTitle>
								<CardDescription>Track and manage incoming inventory</CardDescription>
							</div>
							<Button>
								<FileText className="mr-2 size-4" />
								New Order
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						{orders.map((order) => (
							<OrderRow key={order.id} order={order} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
