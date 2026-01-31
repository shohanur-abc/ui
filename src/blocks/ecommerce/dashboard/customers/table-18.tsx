import {
	ArrowDown,
	ArrowUp,
	Ban,
	ChevronDown,
	Clock,
	DollarSign,
	Download,
	ExternalLink,
	FileText,
	MoreHorizontal,
	Package,
	RefreshCw,
	RotateCcw,
	Search,
	Truck,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomerReturn {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	orderNumber: string;
	product: string;
	reason: string;
	status: 'pending' | 'approved' | 'shipped' | 'received' | 'refunded' | 'rejected';
	refundAmount: string;
	refundMethod: 'original' | 'store_credit' | 'exchange';
	requestDate: string;
	type: 'return' | 'exchange' | 'refund';
}

const ReturnMetrics = ({
	metrics,
}: {
	metrics: { title: string; value: string; change: string; changeType: 'up' | 'down'; icon: React.ElementType }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{metrics.map((metric, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center justify-between px-4">
					<div>
						<p className="text-muted-foreground text-sm">{metric.title}</p>
						<p className="text-2xl font-bold">{metric.value}</p>
						<div
							className={`flex items-center gap-1 text-xs ${
								metric.changeType === 'up' ? 'text-red-500' : 'text-emerald-500'
							}`}
						>
							{metric.changeType === 'up' ? (
								<ArrowUp className="size-3" />
							) : (
								<ArrowDown className="size-3" />
							)}
							{metric.change}
						</div>
					</div>
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<metric.icon className="size-5" />
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const TabHeader = ({
	tabs,
}: {
	tabs: { value: string; label: string; count: number }[];
}) => (
	<div className="border-b px-6 py-4">
		<TabsList className="h-9">
			{tabs.map((tab) => (
				<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
					{tab.label}
					<Badge variant="secondary" className="h-5 px-1.5 text-xs">
						{tab.count}
					</Badge>
				</TabsTrigger>
			))}
		</TabsList>
	</div>
);

const SearchBar = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Reason
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Reasons</DropdownMenuItem>
					<DropdownMenuItem>Wrong Item</DropdownMenuItem>
					<DropdownMenuItem>Defective</DropdownMenuItem>
					<DropdownMenuItem>Changed Mind</DropdownMenuItem>
					<DropdownMenuItem>Not as Described</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: CustomerReturn['status'] }) => {
	const config = {
		pending: { label: 'Pending', icon: Clock, className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		approved: { label: 'Approved', icon: RefreshCw, className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		shipped: { label: 'Shipped', icon: Truck, className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
		received: { label: 'Received', icon: Package, className: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
		refunded: { label: 'Refunded', icon: DollarSign, className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		rejected: { label: 'Rejected', icon: XCircle, className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	const Icon = config[status].icon;
	return (
		<Badge variant="outline" className={`${config[status].className} gap-1`}>
			<Icon className="size-3" />
			{config[status].label}
		</Badge>
	);
};

const TypeBadge = ({ type }: { type: CustomerReturn['type'] }) => {
	const config = {
		return: { label: 'Return', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
		exchange: { label: 'Exchange', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		refund: { label: 'Refund', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
	};
	return (
		<Badge variant="outline" className={config[type].className}>
			{config[type].label}
		</Badge>
	);
};

const RefundMethodBadge = ({ method }: { method: CustomerReturn['refundMethod'] }) => {
	const labels = {
		original: 'Original Payment',
		store_credit: 'Store Credit',
		exchange: 'Exchange',
	};
	return (
		<span className="text-muted-foreground text-sm">{labels[method]}</span>
	);
};

const ReturnRow = ({ item }: { item: CustomerReturn }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={item.customer.avatar} alt={item.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{item.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{item.customer.name}</p>
					<p className="text-muted-foreground text-xs">{item.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div>
				<p className="font-medium text-sm">#{item.orderNumber}</p>
				<p className="text-muted-foreground max-w-[120px] truncate text-xs">{item.product}</p>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<TypeBadge type={item.type} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<StatusBadge status={item.status} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<p className="max-w-[120px] truncate text-sm">{item.reason}</p>
		</TableCell>
		<TableCell className="hidden @xl:table-cell font-semibold">{item.refundAmount}</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<RefundMethodBadge method={item.refundMethod} />
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-muted-foreground text-sm">
			{item.requestDate}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View details
					</DropdownMenuItem>
					<DropdownMenuItem>
						<FileText className="mr-2 size-4" />
						View order
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{item.status === 'pending' && (
						<>
							<DropdownMenuItem className="text-emerald-500">
								Approve return
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-500">
								Reject return
							</DropdownMenuItem>
						</>
					)}
					{item.status === 'received' && (
						<DropdownMenuItem className="text-emerald-500">
							<DollarSign className="mr-2 size-4" />
							Process refund
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const metrics = [
		{ title: 'Total Returns', value: '234', change: '+8% this month', changeType: 'up' as const, icon: RotateCcw },
		{ title: 'Pending Approval', value: '18', change: '-3 from last week', changeType: 'down' as const, icon: Clock },
		{ title: 'Total Refunded', value: '$12.4K', change: '+12% this month', changeType: 'up' as const, icon: DollarSign },
		{ title: 'Return Rate', value: '3.2%', change: '-0.5% this month', changeType: 'down' as const, icon: RefreshCw },
	];

	const tabs = [
		{ value: 'all', label: 'All', count: 234 },
		{ value: 'pending', label: 'Pending', count: 18 },
		{ value: 'processing', label: 'Processing', count: 45 },
		{ value: 'completed', label: 'Completed', count: 171 },
	];

	const returns: CustomerReturn[] = [
		{
			id: '1',
			customer: { name: 'Alice Morgan', email: 'alice.m@email.com', initials: 'AM' },
			orderNumber: 'ORD-2024-001',
			product: 'Wireless Bluetooth Headphones',
			reason: 'Defective product',
			status: 'pending',
			refundAmount: '$149.99',
			refundMethod: 'original',
			requestDate: 'Jan 20, 2024',
			type: 'return',
		},
		{
			id: '2',
			customer: { name: 'Bob Wilson', email: 'bob.w@email.com', initials: 'BW' },
			orderNumber: 'ORD-2024-002',
			product: 'Smart Watch Series 5',
			reason: 'Wrong size',
			status: 'approved',
			refundAmount: '$299.99',
			refundMethod: 'exchange',
			requestDate: 'Jan 18, 2024',
			type: 'exchange',
		},
		{
			id: '3',
			customer: { name: 'Carol Davis', email: 'carol.d@email.com', initials: 'CD' },
			orderNumber: 'ORD-2024-003',
			product: 'Running Shoes Pro',
			reason: 'Changed mind',
			status: 'shipped',
			refundAmount: '$129.99',
			refundMethod: 'store_credit',
			requestDate: 'Jan 15, 2024',
			type: 'return',
		},
		{
			id: '4',
			customer: { name: 'David Lee', email: 'david.l@email.com', initials: 'DL' },
			orderNumber: 'ORD-2024-004',
			product: 'Laptop Stand Adjustable',
			reason: 'Not as described',
			status: 'refunded',
			refundAmount: '$79.99',
			refundMethod: 'original',
			requestDate: 'Jan 10, 2024',
			type: 'refund',
		},
		{
			id: '5',
			customer: { name: 'Emma Thompson', email: 'emma.t@email.com', initials: 'ET' },
			orderNumber: 'ORD-2024-005',
			product: 'Mechanical Keyboard RGB',
			reason: 'Received damaged',
			status: 'received',
			refundAmount: '$159.99',
			refundMethod: 'original',
			requestDate: 'Jan 8, 2024',
			type: 'return',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Returns & Refunds</h1>
					<p className="text-muted-foreground text-sm">
						Manage customer returns, exchanges, and refund requests
					</p>
				</div>

				<ReturnMetrics metrics={metrics} />

				<Tabs defaultValue="all" className="w-full">
					<div className="overflow-hidden rounded-xl border bg-card">
						<TabHeader tabs={tabs} />
						<SearchBar searchPlaceholder="Search returns..." />
						<TabsContent value="all" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-12">
											<Checkbox />
										</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Order</TableHead>
										<TableHead className="hidden @md:table-cell">Type</TableHead>
										<TableHead className="hidden @lg:table-cell">Status</TableHead>
										<TableHead className="hidden @lg:table-cell">Reason</TableHead>
										<TableHead className="hidden @xl:table-cell">Amount</TableHead>
										<TableHead className="hidden @xl:table-cell">Method</TableHead>
										<TableHead className="hidden @2xl:table-cell">Requested</TableHead>
										<TableHead className="w-12" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{returns.map((item) => (
										<ReturnRow key={item.id} item={item} />
									))}
								</TableBody>
							</Table>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</section>
	);
}
