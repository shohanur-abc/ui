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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X, Calendar, MapPin, CreditCard } from 'lucide-react';

interface Order {
	id: string;
	customer: string;
	location: string;
	payment: string;
	amount: string;
	status: 'completed' | 'processing' | 'failed' | 'refunded';
	date: string;
}

interface FilterChipProps {
	label: string;
	value: string;
	onRemove: () => void;
}

interface ActiveFiltersProps {
	filters: { label: string; value: string }[];
	clearLabel: string;
}

interface FilterBarProps {
	searchPlaceholder: string;
	filters: { icon: React.ComponentType<{ className?: string }>; placeholder: string; options: { value: string; label: string }[] }[];
}

const FilterChip = ({ label, value, onRemove }: FilterChipProps) => (
	<Badge variant="secondary" className="gap-1.5 pr-1.5 pl-2.5 py-1">
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
		<button
			onClick={onRemove}
			className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
		>
			<X className="size-3" />
		</button>
	</Badge>
);

const ActiveFilters = ({ filters, clearLabel }: ActiveFiltersProps) => (
	<div className="flex items-center gap-2 flex-wrap">
		{filters.map((filter, i) => (
			<FilterChip key={i} label={filter.label} value={filter.value} onRemove={() => {}} />
		))}
		<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
			{clearLabel}
		</Button>
	</div>
);

const FilterBar = ({ searchPlaceholder, filters }: FilterBarProps) => (
	<div className="flex flex-col @lg:flex-row gap-3 p-4 border-b border-border/50">
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="pl-9 bg-muted/30" />
		</div>
		<div className="flex items-center gap-2 flex-wrap">
			{filters.map((filter, i) => (
				<Select key={i}>
					<SelectTrigger className="w-40 bg-muted/30">
						<filter.icon className="size-4 mr-2 text-muted-foreground" />
						<SelectValue placeholder={filter.placeholder} />
					</SelectTrigger>
					<SelectContent>
						{filter.options.map((option) => (
							<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			))}
			<Button variant="outline" size="icon" className="shrink-0">
				<SlidersHorizontal className="size-4" />
			</Button>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const config: Record<Order['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
		completed: { variant: 'default', className: 'bg-accent text-accent-foreground' },
		processing: { variant: 'secondary' },
		failed: { variant: 'destructive' },
		refunded: { variant: 'outline' },
	};
	return (
		<Badge variant={config[status].variant} className={`capitalize ${config[status].className || ''}`}>
			{status}
		</Badge>
	);
};

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell className="font-medium">{order.customer}</TableCell>
		<TableCell className="text-muted-foreground">{order.location}</TableCell>
		<TableCell className="text-muted-foreground">{order.payment}</TableCell>
		<TableCell className="font-semibold">{order.amount}</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
		<TableCell className="text-muted-foreground">{order.date}</TableCell>
	</TableRow>
);

export default function Main() {
	const filterConfig = [
		{
			icon: Calendar,
			placeholder: 'Date Range',
			options: [
				{ value: 'today', label: 'Today' },
				{ value: 'week', label: 'This Week' },
				{ value: 'month', label: 'This Month' },
				{ value: 'custom', label: 'Custom Range' },
			],
		},
		{
			icon: MapPin,
			placeholder: 'Location',
			options: [
				{ value: 'all', label: 'All Locations' },
				{ value: 'us', label: 'United States' },
				{ value: 'eu', label: 'Europe' },
				{ value: 'asia', label: 'Asia Pacific' },
			],
		},
		{
			icon: CreditCard,
			placeholder: 'Payment',
			options: [
				{ value: 'all', label: 'All Methods' },
				{ value: 'card', label: 'Credit Card' },
				{ value: 'paypal', label: 'PayPal' },
				{ value: 'crypto', label: 'Crypto' },
			],
		},
	];

	const activeFilters = [
		{ label: 'Status', value: 'Completed' },
		{ label: 'Date', value: 'This Month' },
		{ label: 'Payment', value: 'Credit Card' },
	];

	const orders: Order[] = [
		{ id: 'TXN-001234', customer: 'Jennifer Adams', location: 'New York, US', payment: 'Visa •••• 4242', amount: '$1,250.00', status: 'completed', date: 'Jan 28, 2026' },
		{ id: 'TXN-001235', customer: 'Marcus Chen', location: 'London, UK', payment: 'PayPal', amount: '$890.50', status: 'processing', date: 'Jan 28, 2026' },
		{ id: 'TXN-001236', customer: 'Sophia Rodriguez', location: 'Tokyo, JP', payment: 'Mastercard •••• 5555', amount: '$2,340.00', status: 'completed', date: 'Jan 27, 2026' },
		{ id: 'TXN-001237', customer: 'Alexander Kim', location: 'Seoul, KR', payment: 'Crypto (BTC)', amount: '$567.00', status: 'failed', date: 'Jan 27, 2026' },
		{ id: 'TXN-001238', customer: 'Emma Wilson', location: 'Sydney, AU', payment: 'Visa •••• 1234', amount: '$445.00', status: 'refunded', date: 'Jan 26, 2026' },
	];

	const headers = ['Transaction', 'Customer', 'Location', 'Payment', 'Amount', 'Status', 'Date'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
					<FilterBar searchPlaceholder="Search transactions..." filters={filterConfig} />
					<div className="px-4 py-3 border-b border-border/50 bg-muted/10">
						<ActiveFilters filters={activeFilters} clearLabel="Clear all" />
					</div>
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
								<OrderRow key={order.id} order={order} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
