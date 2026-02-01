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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	GitCompare,
	ArrowRight,
	ArrowLeftRight,
	Clock,
	CheckCircle,
	XCircle,
	Package,
} from 'lucide-react';

interface ExchangeOrder {
	id: string;
	originalOrder: string;
	customer: { name: string; initials: string };
	originalItem: { name: string; variant: string };
	newItem: { name: string; variant: string };
	reason: string;
	priceDiff: string;
	status: 'pending' | 'approved' | 'shipped' | 'completed' | 'rejected';
	date: string;
}

interface ExchangeArrowProps {
	originalItem: ExchangeOrder['originalItem'];
	newItem: ExchangeOrder['newItem'];
}

interface StatusBadgeProps {
	status: ExchangeOrder['status'];
}

interface PriceDiffProps {
	diff: string;
}

const ExchangeArrow = ({ originalItem, newItem }: ExchangeArrowProps) => (
	<div className="flex items-center gap-3">
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium truncate">{originalItem.name}</p>
			<p className="text-xs text-muted-foreground">{originalItem.variant}</p>
		</div>
		<ArrowRight className="size-4 text-primary shrink-0" />
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium truncate">{newItem.name}</p>
			<p className="text-xs text-muted-foreground">{newItem.variant}</p>
		</div>
	</div>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<
		ExchangeOrder['status'],
		{
			icon: typeof Clock;
			variant: 'default' | 'secondary' | 'destructive' | 'outline';
			label: string;
		}
	> = {
		pending: { icon: Clock, variant: 'outline', label: 'Pending' },
		approved: { icon: CheckCircle, variant: 'secondary', label: 'Approved' },
		shipped: { icon: Package, variant: 'default', label: 'Shipped' },
		completed: { icon: CheckCircle, variant: 'default', label: 'Completed' },
		rejected: { icon: XCircle, variant: 'destructive', label: 'Rejected' },
	};
	const { icon: Icon, variant, label } = config[status];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const PriceDiff = ({ diff }: PriceDiffProps) => {
	const isPositive = diff.startsWith('+');
	const isNegative = diff.startsWith('-');
	return (
		<span
			className={`font-medium ${isPositive ? 'text-accent' : isNegative ? 'text-destructive' : 'text-muted-foreground'}`}
		>
			{diff}
		</span>
	);
};

const CustomerCell = ({
	customer,
}: {
	customer: ExchangeOrder['customer'];
}) => (
	<div className="flex items-center gap-2">
		<Avatar className="size-7">
			<AvatarFallback className="bg-primary/10 text-primary text-xs">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<span className="font-medium">{customer.name}</span>
	</div>
);

const ExchangeRow = ({ order }: { order: ExchangeOrder }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">
			<div>
				<span>{order.id}</span>
				<p className="text-xs text-muted-foreground">
					from {order.originalOrder}
				</p>
			</div>
		</TableCell>
		<TableCell>
			<CustomerCell customer={order.customer} />
		</TableCell>
		<TableCell className="min-w-80">
			<ExchangeArrow
				originalItem={order.originalItem}
				newItem={order.newItem}
			/>
		</TableCell>
		<TableCell className="max-w-32 truncate text-muted-foreground text-sm">
			{order.reason}
		</TableCell>
		<TableCell>
			<PriceDiff diff={order.priceDiff} />
		</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">
			{order.date}
		</TableCell>
		<TableCell>
			<Button variant="ghost" size="sm">
				Details
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const exchanges: ExchangeOrder[] = [
		{
			id: 'EXC-001',
			originalOrder: 'ORD-8901',
			customer: { name: 'Alice Chen', initials: 'AC' },
			originalItem: { name: 'Running Shoes', variant: 'Size 8 / Black' },
			newItem: { name: 'Running Shoes', variant: 'Size 9 / Black' },
			reason: 'Wrong size',
			priceDiff: '$0.00',
			status: 'completed',
			date: 'Jan 28',
		},
		{
			id: 'EXC-002',
			originalOrder: 'ORD-8912',
			customer: { name: 'Bob Martin', initials: 'BM' },
			originalItem: { name: 'Wireless Mouse', variant: 'Standard / Gray' },
			newItem: { name: 'Wireless Mouse Pro', variant: 'Ergonomic / Black' },
			reason: 'Upgrade requested',
			priceDiff: '+$29.00',
			status: 'approved',
			date: 'Jan 27',
		},
		{
			id: 'EXC-003',
			originalOrder: 'ORD-8923',
			customer: { name: 'Carol White', initials: 'CW' },
			originalItem: { name: 'Smart Watch Ultra', variant: '45mm / Titanium' },
			newItem: { name: 'Smart Watch', variant: '41mm / Aluminum' },
			reason: 'Too bulky',
			priceDiff: '-$150.00',
			status: 'shipped',
			date: 'Jan 27',
		},
		{
			id: 'EXC-004',
			originalOrder: 'ORD-8934',
			customer: { name: 'Dan Brown', initials: 'DB' },
			originalItem: { name: 'Laptop Bag', variant: '15" / Navy' },
			newItem: { name: 'Laptop Bag', variant: '15" / Black' },
			reason: 'Color preference',
			priceDiff: '$0.00',
			status: 'pending',
			date: 'Jan 26',
		},
		{
			id: 'EXC-005',
			originalOrder: 'ORD-8945',
			customer: { name: 'Eve Davis', initials: 'ED' },
			originalItem: { name: 'Headphones Max', variant: 'Silver' },
			newItem: { name: 'Headphones Max', variant: 'Space Gray' },
			reason: 'Defective unit',
			priceDiff: '$0.00',
			status: 'rejected',
			date: 'Jan 25',
		},
	];

	const headers = [
		'Exchange ID',
		'Customer',
		'Items',
		'Reason',
		'Price Diff',
		'Status',
		'Date',
		'',
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="p-2.5 rounded-lg bg-primary/10">
							<ArrowLeftRight className="size-5 text-primary" />
						</div>
						<div>
							<h2 className="text-xl font-semibold">Order Exchanges</h2>
							<p className="text-sm text-muted-foreground">
								Track product exchange requests
							</p>
						</div>
					</div>
				</div>
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
								{headers.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{exchanges.map((exchange) => (
								<ExchangeRow key={exchange.id} order={exchange} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
