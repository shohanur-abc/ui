import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Package,
	Clock,
	Truck,
	CheckCircle,
	XCircle,
	RotateCcw,
} from 'lucide-react';

interface Order {
	id: string;
	customer: string;
	items: string;
	total: string;
	date: string;
	eta?: string;
}

interface TabConfig {
	value: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	count: number;
}

interface StatusTabsProps {
	tabs: TabConfig[];
	children: React.ReactNode;
}

interface OrderTableProps {
	orders: Order[];
	headers: string[];
	showEta?: boolean;
	actionLabel: string;
	actionVariant?: 'default' | 'outline' | 'secondary';
}

const StatusTabs = ({ tabs, children }: StatusTabsProps) => (
	<Tabs defaultValue={tabs[0].value} className="w-full">
		<TabsList className="w-full justify-start bg-muted/30 p-1 h-auto flex-wrap gap-1">
			{tabs.map((tab) => (
				<TabsTrigger
					key={tab.value}
					value={tab.value}
					className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-4"
				>
					<tab.icon className="size-4" />
					{tab.label}
					<Badge variant="secondary" className="ml-1 bg-background/50 text-xs">
						{tab.count}
					</Badge>
				</TabsTrigger>
			))}
		</TabsList>
		{children}
	</Tabs>
);

const OrderTable = ({
	orders,
	headers,
	showEta,
	actionLabel,
	actionVariant = 'outline',
}: OrderTableProps) => (
	<Table>
		<TableHeader>
			<TableRow className="hover:bg-transparent border-border/50">
				{headers.map((header) => (
					<TableHead key={header}>{header}</TableHead>
				))}
			</TableRow>
		</TableHeader>
		<TableBody>
			{orders.map((order) => (
				<TableRow
					key={order.id}
					className="hover:bg-muted/30 transition-colors"
				>
					<TableCell className="font-mono text-sm">{order.id}</TableCell>
					<TableCell className="font-medium">{order.customer}</TableCell>
					<TableCell className="text-muted-foreground">{order.items}</TableCell>
					<TableCell className="font-semibold">{order.total}</TableCell>
					<TableCell className="text-muted-foreground">{order.date}</TableCell>
					{showEta && (
						<TableCell className="text-muted-foreground">
							{order.eta || '—'}
						</TableCell>
					)}
					<TableCell>
						<Button variant={actionVariant} size="sm">
							{actionLabel}
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

export default function Main() {
	const tabs: TabConfig[] = [
		{ value: 'all', label: 'All Orders', icon: Package, count: 156 },
		{ value: 'pending', label: 'Pending', icon: Clock, count: 23 },
		{ value: 'shipped', label: 'Shipped', icon: Truck, count: 45 },
		{ value: 'delivered', label: 'Delivered', icon: CheckCircle, count: 78 },
		{ value: 'cancelled', label: 'Cancelled', icon: XCircle, count: 8 },
		{ value: 'returns', label: 'Returns', icon: RotateCcw, count: 2 },
	];

	const allOrders: Order[] = [
		{
			id: 'ORD-9001',
			customer: 'James Wilson',
			items: '3 items',
			total: '$245.00',
			date: 'Jan 28',
		},
		{
			id: 'ORD-9002',
			customer: 'Maria Garcia',
			items: '1 item',
			total: '$89.99',
			date: 'Jan 28',
		},
		{
			id: 'ORD-9003',
			customer: 'Robert Chen',
			items: '5 items',
			total: '$567.50',
			date: 'Jan 27',
		},
	];

	const shippedOrders: Order[] = [
		{
			id: 'ORD-8901',
			customer: 'Lisa Anderson',
			items: '2 items',
			total: '$199.00',
			date: 'Jan 26',
			eta: 'Jan 30',
		},
		{
			id: 'ORD-8902',
			customer: 'Kevin Park',
			items: '4 items',
			total: '$412.00',
			date: 'Jan 25',
			eta: 'Jan 29',
		},
	];

	const headers = ['Order', 'Customer', 'Items', 'Total', 'Date', 'Action'];
	const headersWithEta = [
		'Order',
		'Customer',
		'Items',
		'Total',
		'Shipped',
		'ETA',
		'Action',
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<StatusTabs tabs={tabs}>
					<TabsContent value="all" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={allOrders}
								headers={headers}
								actionLabel="View"
							/>
						</div>
					</TabsContent>
					<TabsContent value="pending" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={allOrders.slice(0, 2)}
								headers={headers}
								actionLabel="Process"
								actionVariant="default"
							/>
						</div>
					</TabsContent>
					<TabsContent value="shipped" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={shippedOrders}
								headers={headersWithEta}
								showEta
								actionLabel="Track"
							/>
						</div>
					</TabsContent>
					<TabsContent value="delivered" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={allOrders}
								headers={headers}
								actionLabel="Details"
							/>
						</div>
					</TabsContent>
					<TabsContent value="cancelled" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={allOrders.slice(0, 1)}
								headers={headers}
								actionLabel="Review"
							/>
						</div>
					</TabsContent>
					<TabsContent value="returns" className="mt-4">
						<div className="rounded-lg border border-border/50 overflow-hidden bg-card/30">
							<OrderTable
								orders={allOrders.slice(0, 1)}
								headers={headers}
								actionLabel="Process"
								actionVariant="default"
							/>
						</div>
					</TabsContent>
				</StatusTabs>
			</div>
		</section>
	);
}
