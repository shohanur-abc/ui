import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Eye,
	MoreHorizontal,
	ArrowUpRight,
	ArrowDownRight,
	RefreshCw,
	type LucideIcon,
} from 'lucide-react';

interface TransactionActivity {
	id: string;
	type: 'incoming' | 'outgoing' | 'refund';
	title: string;
	description: string;
	amount: string;
	timestamp: string;
	user?: {
		name: string;
		avatar?: string;
		initials: string;
	};
}

interface HorizontalTimelineProps {
	title: string;
	subtitle?: string;
	items: TransactionActivity[];
}

const TransactionIcon = ({ type }: { type: TransactionActivity['type'] }) => {
	const config = {
		incoming: {
			icon: ArrowDownRight,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		outgoing: {
			icon: ArrowUpRight,
			className: 'bg-rose-500/20 text-rose-400',
		},
		refund: {
			icon: RefreshCw,
			className: 'bg-amber-500/20 text-amber-400',
		},
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 items-center justify-center rounded-full ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const AmountDisplay = ({
	amount,
	type,
}: { amount: string; type: TransactionActivity['type'] }) => {
	const colorClass =
		type === 'incoming'
			? 'text-emerald-400'
			: type === 'outgoing'
				? 'text-rose-400'
				: 'text-amber-400';
	const prefix = type === 'incoming' ? '+' : type === 'outgoing' ? '-' : '';

	return (
		<span className={`font-semibold tabular-nums ${colorClass}`}>
			{prefix}
			{amount}
		</span>
	);
};

const TransactionCard = ({ item }: { item: TransactionActivity }) => (
	<div className="group relative flex min-w-[280px] flex-col gap-3 rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 @sm:min-w-[320px]">
		<div className="flex items-start justify-between">
			<TransactionIcon type={item.type} />
			<Button variant="ghost" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
				<MoreHorizontal className="size-4" />
			</Button>
		</div>
		<div className="flex flex-col gap-1">
			<h4 className="font-medium text-foreground">{item.title}</h4>
			<p className="text-sm text-muted-foreground line-clamp-2">
				{item.description}
			</p>
		</div>
		<div className="flex items-center justify-between border-t border-border/50 pt-3">
			<AmountDisplay amount={item.amount} type={item.type} />
			<span className="text-xs text-muted-foreground">{item.timestamp}</span>
		</div>
		{item.user && (
			<div className="flex items-center gap-2 text-sm">
				<Avatar className="size-5">
					<AvatarImage src={item.user.avatar} alt={item.user.name} />
					<AvatarFallback className="text-[10px] bg-secondary">
						{item.user.initials}
					</AvatarFallback>
				</Avatar>
				<span className="text-muted-foreground">{item.user.name}</span>
			</div>
		)}
	</div>
);

const HorizontalTimeline = ({
	title,
	subtitle,
	items,
}: HorizontalTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
		<CardHeader className="flex-row items-center justify-between">
			<div className="flex flex-col gap-1">
				<CardTitle className="text-lg font-semibold">{title}</CardTitle>
				{subtitle && (
					<p className="text-sm text-muted-foreground">{subtitle}</p>
				)}
			</div>
			<Button variant="outline" size="sm" className="gap-2">
				<Eye className="size-4" />
				<span>View All</span>
			</Button>
		</CardHeader>
		<CardContent className="px-0 pb-6">
			<div className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
				{items.map((item) => (
					<TransactionCard key={item.id} item={item} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const transactions: TransactionActivity[] = [
		{
			id: '1',
			type: 'incoming',
			title: 'Payment Received',
			description: 'Order #ORD-2024-001 payment completed via Stripe',
			amount: '$1,249.00',
			timestamp: '5 min ago',
			user: { name: 'Sarah Chen', initials: 'SC' },
		},
		{
			id: '2',
			type: 'outgoing',
			title: 'Supplier Payment',
			description: 'Monthly inventory restock payment to TechSupply Co.',
			amount: '$4,820.00',
			timestamp: '1 hour ago',
		},
		{
			id: '3',
			type: 'refund',
			title: 'Customer Refund',
			description: 'Refund processed for order #ORD-2024-089',
			amount: '$299.00',
			timestamp: '2 hours ago',
			user: { name: 'Mike Johnson', initials: 'MJ' },
		},
		{
			id: '4',
			type: 'incoming',
			title: 'Bulk Order',
			description: 'Enterprise bulk order from Acme Corporation',
			amount: '$12,500.00',
			timestamp: '4 hours ago',
			user: { name: 'Corporate Sales', initials: 'CS' },
		},
		{
			id: '5',
			type: 'outgoing',
			title: 'Marketing Spend',
			description: 'Facebook Ads campaign budget allocation',
			amount: '$2,000.00',
			timestamp: '6 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-6xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<HorizontalTimeline
					title="Transaction Activity"
					subtitle="Recent financial transactions and movements"
					items={transactions}
				/>
			</div>
		</section>
	);
}
