import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Repeat,
	Calendar,
	TrendingUp,
	Pause,
	Edit,
	MoreHorizontal,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecurringOrder {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	product: string;
	frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
	amount: string;
	nextDate: string;
	totalOrders: number;
	status: 'active' | 'paused' | 'cancelled';
	lifetimeValue: string;
}

interface RecurringOrderRowProps {
	order: RecurringOrder;
	labels: {
		next: string;
		orders: string;
		ltv: string;
		pause: string;
		edit: string;
		cancel: string;
	};
}

const FrequencyBadge = ({
	frequency,
}: {
	frequency: RecurringOrder['frequency'];
}) => {
	const labels: Record<RecurringOrder['frequency'], string> = {
		weekly: 'Weekly',
		biweekly: 'Bi-weekly',
		monthly: 'Monthly',
		quarterly: 'Quarterly',
	};
	return (
		<Badge variant="outline" className="gap-1">
			<Repeat className="size-3" />
			{labels[frequency]}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: RecurringOrder['status'] }) => {
	const config: Record<
		RecurringOrder['status'],
		{ className: string; label: string }
	> = {
		active: {
			className: 'bg-accent/10 text-accent border-accent/30',
			label: 'Active',
		},
		paused: {
			className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
			label: 'Paused',
		},
		cancelled: {
			className: 'bg-muted text-muted-foreground',
			label: 'Cancelled',
		},
	};
	const { className, label } = config[status];
	return (
		<Badge variant="outline" className={className}>
			{label}
		</Badge>
	);
};

const RecurringOrderRow = ({ order, labels }: RecurringOrderRowProps) => (
	<div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors rounded-lg">
		<Avatar className="size-10">
			<AvatarImage src={order.customer.avatar} alt={order.customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-sm">
				{order.customer.initials}
			</AvatarFallback>
		</Avatar>

		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-0.5">
				<span className="font-semibold">{order.customer.name}</span>
				<span className="text-xs text-muted-foreground font-mono">
					{order.id}
				</span>
			</div>
			<p className="text-sm text-muted-foreground truncate">{order.product}</p>
		</div>

		<FrequencyBadge frequency={order.frequency} />

		<div className="text-center min-w-[80px]">
			<p className="font-semibold">{order.amount}</p>
			<p className="text-xs text-muted-foreground">per cycle</p>
		</div>

		<Separator orientation="vertical" className="h-10" />

		<div className="text-center min-w-[80px]">
			<div className="flex items-center gap-1 text-sm text-muted-foreground mb-0.5">
				<Calendar className="size-3" />
				{labels.next}
			</div>
			<p className="font-medium">{order.nextDate}</p>
		</div>

		<div className="text-center min-w-[60px]">
			<p className="font-semibold">{order.totalOrders}</p>
			<p className="text-xs text-muted-foreground">{labels.orders}</p>
		</div>

		<div className="text-center min-w-[80px]">
			<div className="flex items-center gap-1 text-sm text-accent justify-center">
				<TrendingUp className="size-3" />
				{order.lifetimeValue}
			</div>
			<p className="text-xs text-muted-foreground">{labels.ltv}</p>
		</div>

		<StatusBadge status={order.status} />

		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem className="gap-2">
					<Edit className="size-4" />
					{labels.edit}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2">
					<Pause className="size-4" />
					{labels.pause}
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2 text-destructive">
					{labels.cancel}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const labels = {
		next: 'Next',
		orders: 'orders',
		ltv: 'LTV',
		pause: 'Pause',
		edit: 'Edit',
		cancel: 'Cancel',
	};

	const orders: RecurringOrder[] = [
		{
			id: 'REC-001',
			customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
			product: 'Premium Coffee Subscription - Dark Roast',
			frequency: 'biweekly',
			amount: '$29.99',
			nextDate: 'Feb 3',
			totalOrders: 24,
			status: 'active',
			lifetimeValue: '$719.76',
		},
		{
			id: 'REC-002',
			customer: { name: 'Mike Chen', avatar: '', initials: 'MC' },
			product: 'Vitamin Bundle - Complete Daily',
			frequency: 'monthly',
			amount: '$49.99',
			nextDate: 'Feb 1',
			totalOrders: 12,
			status: 'active',
			lifetimeValue: '$599.88',
		},
		{
			id: 'REC-003',
			customer: { name: 'Emily Davis', avatar: '', initials: 'ED' },
			product: 'Healthy Snack Box - Family Size',
			frequency: 'weekly',
			amount: '$24.99',
			nextDate: 'On hold',
			totalOrders: 52,
			status: 'paused',
			lifetimeValue: '$1,299.48',
		},
		{
			id: 'REC-004',
			customer: { name: 'Alex Brown', avatar: '', initials: 'AB' },
			product: 'Organic Tea Collection',
			frequency: 'quarterly',
			amount: '$89.99',
			nextDate: 'Apr 1',
			totalOrders: 4,
			status: 'active',
			lifetimeValue: '$359.96',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm divide-y divide-border/50">
					{orders.map((order) => (
						<RecurringOrderRow key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
