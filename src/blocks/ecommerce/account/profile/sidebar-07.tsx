import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	Banknote,
	ChevronRight,
	CreditCard,
	History,
	LogOut,
	PieChart,
	Plus,
	Send,
	Settings,
	Shield,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const WalletSidebar = ({
	src,
	fallback,
	name,
	balance,
	accountNumber,
	verified,
}: {
	src: string;
	fallback: string;
	name: string;
	balance: string;
	accountNumber: string;
	verified: boolean;
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3">
			<Avatar className="size-12">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<h2 className="font-semibold truncate">{name}</h2>
					{verified && <Shield className="size-4 text-green-500" />}
				</div>
				<p className="text-sm text-muted-foreground">{accountNumber}</p>
			</div>
		</div>
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
			<p className="text-sm opacity-80">Total Balance</p>
			<p className="text-3xl font-bold mt-1">{balance}</p>
		</div>
	</div>
);

const QuickActions = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<div className="grid grid-cols-3 gap-2">
		{actions.map((action, i) => (
			<Link
				key={i}
				href={action.href}
				className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted transition-colors"
			>
				<div className="p-2 rounded-full bg-primary/10">
					<action.icon className="size-5 text-primary" />
				</div>
				<span className="text-xs font-medium">{action.label}</span>
			</Link>
		))}
	</div>
);

const WalletNav = ({
	items,
	activeHref,
}: {
	items: { icon: React.ElementType; label: string; href: string }[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="text-sm font-medium">{item.label}</span>
			</Link>
		))}
	</nav>
);

const AccountCards = ({
	cards,
}: {
	cards: { type: string; last4: string; expiry: string; color: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Cards</h3>
				<Button variant="ghost" size="sm">
					<Plus className="size-4 mr-1" />
					Add
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{cards.map((card, i) => (
				<div key={i} className={`p-4 rounded-xl text-white ${card.color}`}>
					<div className="flex items-center justify-between mb-8">
						<CreditCard className="size-8" />
						<span className="text-sm font-medium">{card.type}</span>
					</div>
					<p className="font-mono text-lg tracking-wider">•••• {card.last4}</p>
					<p className="text-sm opacity-80 mt-1">Expires {card.expiry}</p>
				</div>
			))}
		</CardContent>
	</Card>
);

const RecentTransactions = ({
	transactions,
}: {
	transactions: { type: 'in' | 'out'; title: string; description: string; amount: string; date: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Transactions</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/transactions">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{transactions.map((tx, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg ${
							tx.type === 'in' ? 'bg-green-500/10' : 'bg-red-500/10'
						}`}>
							{tx.type === 'in' ? (
								<ArrowDownToLine className="size-5 text-green-500" />
							) : (
								<ArrowUpFromLine className="size-5 text-red-500" />
							)}
						</div>
						<div>
							<p className="font-medium">{tx.title}</p>
							<p className="text-sm text-muted-foreground">{tx.description}</p>
						</div>
					</div>
					<div className="text-right">
						<p className={`font-medium ${tx.type === 'in' ? 'text-green-500' : ''}`}>
							{tx.type === 'in' ? '+' : '-'}{tx.amount}
						</p>
						<p className="text-xs text-muted-foreground">{tx.date}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const SpendingOverview = ({
	categories,
}: {
	categories: { name: string; amount: string; percentage: number; color: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold flex items-center gap-2">
				<PieChart className="size-5 text-primary" />
				This Month
			</h3>
		</CardHeader>
		<CardContent className="space-y-3">
			{categories.map((cat, i) => (
				<div key={i} className="space-y-1">
					<div className="flex justify-between text-sm">
						<span>{cat.name}</span>
						<span className="font-medium">{cat.amount}</span>
					</div>
					<div className="h-2 rounded-full bg-muted overflow-hidden">
						<div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percentage}%` }} />
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'DK',
			name: 'David Kim',
			balance: '$12,485.50',
			accountNumber: '•••• 4829',
			verified: true,
		},
		quickActions: [
			{ icon: Send, label: 'Send', href: '/send' },
			{ icon: ArrowDownToLine, label: 'Receive', href: '/receive' },
			{ icon: Plus, label: 'Add', href: '/add-money' },
		],
		nav: [
			{ icon: Wallet, label: 'Dashboard', href: '/wallet' },
			{ icon: History, label: 'Transactions', href: '/transactions' },
			{ icon: CreditCard, label: 'Cards', href: '/cards' },
			{ icon: TrendingUp, label: 'Investments', href: '/investments' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		cards: [
			{ type: 'VISA', last4: '4829', expiry: '12/26', color: 'bg-gradient-to-br from-blue-600 to-blue-800' },
			{ type: 'Mastercard', last4: '3156', expiry: '08/25', color: 'bg-gradient-to-br from-orange-500 to-red-600' },
		],
		transactions: [
			{ type: 'in' as const, title: 'Salary', description: 'Monthly salary', amount: '$5,200.00', date: 'Today' },
			{ type: 'out' as const, title: 'Netflix', description: 'Subscription', amount: '$15.99', date: 'Yesterday' },
			{ type: 'out' as const, title: 'Amazon', description: 'Shopping', amount: '$89.50', date: 'Jan 28' },
			{ type: 'in' as const, title: 'Refund', description: 'Order #48291', amount: '$34.00', date: 'Jan 27' },
		],
		spending: [
			{ name: 'Shopping', amount: '$456', percentage: 40, color: 'bg-blue-500' },
			{ name: 'Food & Dining', amount: '$284', percentage: 25, color: 'bg-green-500' },
			{ name: 'Entertainment', amount: '$171', percentage: 15, color: 'bg-purple-500' },
			{ name: 'Transport', amount: '$114', percentage: 10, color: 'bg-orange-500' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-72 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<WalletSidebar {...profileData.sidebar} />
								<QuickActions actions={profileData.quickActions} />
								<Separator />
								<WalletNav items={profileData.nav} activeHref="/wallet" />
								<Separator />
								<Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">My Wallet</h1>
						<AccountCards cards={profileData.cards} />
						<div className="grid @md:grid-cols-2 gap-6">
							<RecentTransactions transactions={profileData.transactions} />
							<SpendingOverview categories={profileData.spending} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
