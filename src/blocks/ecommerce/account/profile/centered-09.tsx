import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	Calendar,
	CreditCard,
	DollarSign,
	Download,
	Gift,
	History,
	Plus,
	Send,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const WalletHeader = ({
	src,
	fallback,
	name,
	balance,
	currency,
}: {
	src: string;
	fallback: string;
	name: string;
	balance: string;
	currency: string;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-16 mx-auto ring-2 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="text-sm text-muted-foreground">{name}&apos;s Wallet</p>
			<div className="flex items-center justify-center gap-2 mt-1">
				<span className="text-4xl font-bold">{balance}</span>
				<Badge variant="outline">{currency}</Badge>
			</div>
		</div>
	</div>
);

const QuickActions = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; color: string }[];
}) => (
	<div className="flex justify-center gap-6">
		{actions.map((action, i) => (
			<button key={i} className="flex flex-col items-center gap-2 group">
				<div
					className={`p-4 rounded-full ${action.color} group-hover:scale-110 transition-transform`}
				>
					<action.icon className="size-6" />
				</div>
				<span className="text-sm font-medium">{action.label}</span>
			</button>
		))}
	</div>
);

const BalanceBreakdown = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		amount: string;
		color: string;
	}[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-semibold text-center">Balance Breakdown</h3>
		<div className="space-y-2">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg ${item.color}`}>
							<item.icon className="size-4" />
						</div>
						<span className="text-sm font-medium">{item.label}</span>
					</div>
					<span className="font-semibold">{item.amount}</span>
				</div>
			))}
		</div>
	</div>
);

const RecentTransactions = ({
	transactions,
}: {
	transactions: {
		type: 'credit' | 'debit';
		description: string;
		amount: string;
		date: string;
	}[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-semibold">Recent Activity</h3>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/wallet/history">View All</Link>
			</Button>
		</div>
		<div className="space-y-2">
			{transactions.map((tx, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
				>
					<div className="flex items-center gap-3">
						<div
							className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
						>
							{tx.type === 'credit' ? (
								<ArrowDownRight className="size-4 text-green-500" />
							) : (
								<ArrowUpRight className="size-4 text-red-500" />
							)}
						</div>
						<div>
							<p className="text-sm font-medium">{tx.description}</p>
							<p className="text-xs text-muted-foreground">{tx.date}</p>
						</div>
					</div>
					<span
						className={`font-semibold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}
					>
						{tx.type === 'credit' ? '+' : '-'}
						{tx.amount}
					</span>
				</div>
			))}
		</div>
	</div>
);

const PaymentMethods = ({
	methods,
}: {
	methods: { last4: string; type: string; expiry: string }[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-semibold">Payment Methods</h3>
			<Button variant="ghost" size="icon" className="size-8">
				<Plus className="size-4" />
			</Button>
		</div>
		<div className="space-y-2">
			{methods.map((method, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
				>
					<CreditCard className="size-5 text-muted-foreground" />
					<div className="flex-1">
						<p className="text-sm font-medium">•••• {method.last4}</p>
						<p className="text-xs text-muted-foreground">
							{method.type} • Expires {method.expiry}
						</p>
					</div>
					<Badge variant="outline">Default</Badge>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			fallback: 'RJ',
			name: 'Ryan Johnson',
			balance: '$1,247.50',
			currency: 'USD',
		},
		quickActions: [
			{ icon: Plus, label: 'Add', color: 'bg-green-500/20 text-green-500' },
			{ icon: Send, label: 'Send', color: 'bg-blue-500/20 text-blue-500' },
			{
				icon: History,
				label: 'History',
				color: 'bg-purple-500/20 text-purple-500',
			},
		],
		breakdown: [
			{
				icon: Wallet,
				label: 'Available Balance',
				amount: '$1,197.50',
				color: 'bg-primary/20 text-primary',
			},
			{
				icon: Gift,
				label: 'Store Credit',
				amount: '$50.00',
				color: 'bg-green-500/20 text-green-500',
			},
			{
				icon: DollarSign,
				label: 'Pending Refunds',
				amount: '$0.00',
				color: 'bg-amber-500/20 text-amber-500',
			},
		],
		transactions: [
			{
				type: 'debit' as const,
				description: 'Order #48291',
				amount: '$85.00',
				date: 'Today',
			},
			{
				type: 'credit' as const,
				description: 'Refund #47892',
				amount: '$24.50',
				date: 'Yesterday',
			},
			{
				type: 'credit' as const,
				description: 'Added funds',
				amount: '$200.00',
				date: '3 days ago',
			},
		],
		methods: [{ last4: '4242', type: 'Visa', expiry: '12/25' }],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card className="bg-gradient-to-b from-muted/30 to-background">
					<CardContent className="p-6 space-y-6">
						<WalletHeader {...profileData.header} />
						<QuickActions actions={profileData.quickActions} />
						<Separator />
						<BalanceBreakdown items={profileData.breakdown} />
						<Separator />
						<RecentTransactions transactions={profileData.transactions} />
						<Separator />
						<PaymentMethods methods={profileData.methods} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
