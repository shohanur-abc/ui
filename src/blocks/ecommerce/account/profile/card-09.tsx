import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	DollarSign,
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
	<div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 rounded-xl">
		<div className="flex items-center gap-3 mb-6">
			<Avatar className="size-10 ring-2 ring-primary-foreground/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary-foreground/20">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-sm opacity-80">Welcome back,</p>
				<p className="font-semibold">{name}</p>
			</div>
		</div>
		<div className="space-y-1">
			<p className="text-sm opacity-80">Available Balance</p>
			<div className="flex items-baseline gap-2">
				<span className="text-3xl font-bold">{balance}</span>
				<span className="text-sm opacity-80">{currency}</span>
			</div>
		</div>
	</div>
);

const QuickActions = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		color: string;
	}[];
}) => (
	<div className="grid grid-cols-4 gap-2">
		{items.map((action, i) => (
			<Button
				key={i}
				variant="ghost"
				className="flex-col h-auto py-4 gap-2"
				asChild
			>
				<Link href={action.href}>
					<div className={`p-2 rounded-full ${action.color}`}>
						<action.icon className="size-4" />
					</div>
					<span className="text-xs">{action.label}</span>
				</Link>
			</Button>
		))}
	</div>
);

const PaymentMethods = ({
	items,
}: {
	items: {
		type: string;
		last4: string;
		icon: React.ElementType;
		primary?: boolean;
	}[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">Payment Methods</h3>
			<Button variant="ghost" size="sm" className="text-xs gap-1">
				<Plus className="size-3" />
				Add
			</Button>
		</div>
		<div className="space-y-2">
			{items.map((method, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div className="p-2 rounded-md bg-background">
						<method.icon className="size-4" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">{method.type}</p>
						<p className="text-xs text-muted-foreground">•••• {method.last4}</p>
					</div>
					{method.primary && (
						<Badge variant="secondary" className="text-xs">
							Primary
						</Badge>
					)}
				</div>
			))}
		</div>
	</div>
);

const RecentTransactions = ({
	items,
}: {
	items: {
		title: string;
		amount: string;
		date: string;
		type: 'in' | 'out';
		category: string;
	}[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">Recent Transactions</h3>
			<Button variant="ghost" size="sm" className="text-xs gap-1" asChild>
				<Link href="/transactions">
					View All <History className="size-3" />
				</Link>
			</Button>
		</div>
		<div className="space-y-2">
			{items.map((tx, i) => (
				<div key={i} className="flex items-center gap-3 py-2">
					<div
						className={`p-2 rounded-full ${tx.type === 'in' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
					>
						{tx.type === 'in' ? (
							<ArrowDownRight className="size-4 text-green-500" />
						) : (
							<ArrowUpRight className="size-4 text-red-500" />
						)}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{tx.title}</p>
						<p className="text-xs text-muted-foreground">{tx.category}</p>
					</div>
					<div className="text-right">
						<p
							className={`text-sm font-medium ${tx.type === 'in' ? 'text-green-500' : ''}`}
						>
							{tx.type === 'in' ? '+' : '-'}
							{tx.amount}
						</p>
						<p className="text-xs text-muted-foreground">{tx.date}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		wallet: {
			src: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=400&h=400&fit=crop&crop=face',
			fallback: 'RK',
			name: 'Robert King',
			balance: '$2,458.50',
			currency: 'USD',
		},
		quickActions: [
			{
				icon: Plus,
				label: 'Add',
				href: '/wallet/add',
				color: 'bg-blue-500/10 text-blue-500',
			},
			{
				icon: Send,
				label: 'Send',
				href: '/wallet/send',
				color: 'bg-green-500/10 text-green-500',
			},
			{
				icon: Gift,
				label: 'Redeem',
				href: '/wallet/redeem',
				color: 'bg-purple-500/10 text-purple-500',
			},
			{
				icon: History,
				label: 'History',
				href: '/wallet/history',
				color: 'bg-amber-500/10 text-amber-500',
			},
		],
		paymentMethods: [
			{ type: 'Visa', last4: '4242', icon: CreditCard, primary: true },
			{ type: 'Mastercard', last4: '8888', icon: CreditCard },
		],
		transactions: [
			{
				title: 'Order #12847',
				amount: '$89.99',
				date: 'Today',
				type: 'out' as const,
				category: 'Shopping',
			},
			{
				title: 'Cashback Reward',
				amount: '$12.50',
				date: 'Yesterday',
				type: 'in' as const,
				category: 'Rewards',
			},
			{
				title: 'Wallet Top-up',
				amount: '$200.00',
				date: 'Jan 28',
				type: 'in' as const,
				category: 'Deposit',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="overflow-hidden p-0">
					<CardContent className="p-4 space-y-6">
						<WalletHeader {...profileData.wallet} />
						<QuickActions items={profileData.quickActions} />
						<Separator />
						<PaymentMethods items={profileData.paymentMethods} />
						<Separator />
						<RecentTransactions items={profileData.transactions} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
