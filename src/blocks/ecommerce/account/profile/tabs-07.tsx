import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	Banknote,
	CreditCard,
	DollarSign,
	History,
	PieChart,
	Plus,
	Send,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const WalletHeader = ({
	src,
	fallback,
	name,
	balance,
	monthlySpending,
	monthlyIncome,
}: {
	src: string;
	fallback: string;
	name: string;
	balance: string;
	monthlySpending: string;
	monthlyIncome: string;
}) => (
	<div className="flex flex-col @md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
		<Avatar className="size-16">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
		</Avatar>
		<div className="text-center @md:text-left flex-1">
			<p className="text-muted-foreground">Total Balance</p>
			<h1 className="text-4xl font-bold mt-1">{balance}</h1>
			<div className="flex items-center justify-center @md:justify-start gap-6 mt-3">
				<div className="flex items-center gap-2 text-green-500">
					<ArrowDownToLine className="size-4" />
					<span className="text-sm font-medium">{monthlyIncome}</span>
				</div>
				<div className="flex items-center gap-2 text-red-500">
					<ArrowUpFromLine className="size-4" />
					<span className="text-sm font-medium">{monthlySpending}</span>
				</div>
			</div>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" className="gap-2">
				<Send className="size-4" />
				Send
			</Button>
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Money
			</Button>
		</div>
	</div>
);

const OverviewTab = ({
	quickActions,
	recentTransactions,
}: {
	quickActions: { icon: React.ElementType; label: string; color: string }[];
	recentTransactions: { type: 'in' | 'out'; title: string; description: string; amount: string; date: string }[];
}) => (
	<div className="space-y-6">
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Quick Actions</h3>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					{quickActions.map((action, i) => (
						<button key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
							<div className={`p-3 rounded-full ${action.color}`}>
								<action.icon className="size-5 text-white" />
							</div>
							<span className="text-sm font-medium">{action.label}</span>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
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
				{recentTransactions.map((tx, i) => (
					<div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
						<div className="flex items-center gap-3">
							<div className={`p-2 rounded-lg ${tx.type === 'in' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
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
	</div>
);

const CardsTab = ({
	cards,
}: {
	cards: { type: string; last4: string; expiry: string; balance: string; color: string }[];
}) => (
	<div className="space-y-4">
		<div className="flex justify-end">
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Card
			</Button>
		</div>
		<div className="grid @md:grid-cols-2 gap-4">
			{cards.map((card, i) => (
				<div key={i} className={`p-6 rounded-2xl text-white ${card.color}`}>
					<div className="flex items-center justify-between mb-8">
						<CreditCard className="size-10" />
						<span className="font-medium">{card.type}</span>
					</div>
					<p className="font-mono text-xl tracking-widest mb-4">•••• •••• •••• {card.last4}</p>
					<div className="flex justify-between">
						<div>
							<p className="text-xs opacity-70">Expires</p>
							<p className="font-medium">{card.expiry}</p>
						</div>
						<div className="text-right">
							<p className="text-xs opacity-70">Balance</p>
							<p className="font-medium">{card.balance}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

const AnalyticsTab = ({
	spending,
	monthlyTrend,
}: {
	spending: { category: string; amount: string; percentage: number; color: string }[];
	monthlyTrend: { month: string; income: number; expense: number }[];
}) => (
	<div className="space-y-6">
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold flex items-center gap-2">
					<PieChart className="size-5" />
					Spending by Category
				</h3>
			</CardHeader>
			<CardContent className="space-y-4">
				{spending.map((cat, i) => (
					<div key={i} className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>{cat.category}</span>
							<span className="font-medium">{cat.amount}</span>
						</div>
						<div className="h-2 rounded-full bg-muted overflow-hidden">
							<div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percentage}%` }} />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold flex items-center gap-2">
					<TrendingUp className="size-5" />
					Monthly Trend
				</h3>
			</CardHeader>
			<CardContent>
				<div className="flex items-end justify-between gap-4 h-48">
					{monthlyTrend.map((month, i) => (
						<div key={i} className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full flex gap-1 h-36">
								<div className="flex-1 flex flex-col justify-end">
									<div className="bg-green-500 rounded-t" style={{ height: `${month.income}%` }} />
								</div>
								<div className="flex-1 flex flex-col justify-end">
									<div className="bg-red-400 rounded-t" style={{ height: `${month.expense}%` }} />
								</div>
							</div>
							<span className="text-xs text-muted-foreground">{month.month}</span>
						</div>
					))}
				</div>
				<div className="flex justify-center gap-6 mt-4">
					<div className="flex items-center gap-2">
						<div className="size-3 rounded-full bg-green-500" />
						<span className="text-sm">Income</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="size-3 rounded-full bg-red-400" />
						<span className="text-sm">Expenses</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

const HistoryTab = ({
	transactions,
}: {
	transactions: { type: 'in' | 'out'; title: string; category: string; amount: string; date: string; time: string }[];
}) => (
	<Card>
		<CardContent className="p-6 space-y-3">
			{transactions.map((tx, i) => (
				<div key={i} className="flex items-center justify-between p-4 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg ${tx.type === 'in' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
							{tx.type === 'in' ? (
								<ArrowDownToLine className="size-5 text-green-500" />
							) : (
								<ArrowUpFromLine className="size-5 text-red-500" />
							)}
						</div>
						<div>
							<p className="font-medium">{tx.title}</p>
							<Badge variant="secondary" className="mt-1">{tx.category}</Badge>
						</div>
					</div>
					<div className="text-right">
						<p className={`font-semibold ${tx.type === 'in' ? 'text-green-500' : ''}`}>
							{tx.type === 'in' ? '+' : '-'}{tx.amount}
						</p>
						<p className="text-sm text-muted-foreground">{tx.date} • {tx.time}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'DK',
			name: 'David Kim',
			balance: '$12,485.50',
			monthlySpending: '$2,340',
			monthlyIncome: '$5,200',
		},
		quickActions: [
			{ icon: Send, label: 'Send', color: 'bg-blue-500' },
			{ icon: ArrowDownToLine, label: 'Receive', color: 'bg-green-500' },
			{ icon: Banknote, label: 'Pay Bills', color: 'bg-purple-500' },
			{ icon: Plus, label: 'Add Money', color: 'bg-orange-500' },
		],
		recentTransactions: [
			{ type: 'in' as const, title: 'Salary', description: 'Monthly salary', amount: '$5,200.00', date: 'Today' },
			{ type: 'out' as const, title: 'Netflix', description: 'Subscription', amount: '$15.99', date: 'Yesterday' },
			{ type: 'out' as const, title: 'Amazon', description: 'Shopping', amount: '$89.50', date: 'Jan 28' },
		],
		cards: [
			{ type: 'VISA', last4: '4829', expiry: '12/26', balance: '$8,245.00', color: 'bg-gradient-to-br from-blue-600 to-blue-800' },
			{ type: 'Mastercard', last4: '3156', expiry: '08/25', balance: '$4,240.50', color: 'bg-gradient-to-br from-orange-500 to-red-600' },
		],
		spending: [
			{ category: 'Shopping', amount: '$456', percentage: 35, color: 'bg-blue-500' },
			{ category: 'Food & Dining', amount: '$284', percentage: 22, color: 'bg-green-500' },
			{ category: 'Entertainment', amount: '$171', percentage: 13, color: 'bg-purple-500' },
			{ category: 'Transport', amount: '$114', percentage: 9, color: 'bg-orange-500' },
			{ category: 'Others', amount: '$275', percentage: 21, color: 'bg-gray-500' },
		],
		monthlyTrend: [
			{ month: 'Aug', income: 80, expense: 60 },
			{ month: 'Sep', income: 85, expense: 55 },
			{ month: 'Oct', income: 90, expense: 65 },
			{ month: 'Nov', income: 75, expense: 70 },
			{ month: 'Dec', income: 95, expense: 80 },
			{ month: 'Jan', income: 100, expense: 45 },
		],
		allTransactions: [
			{ type: 'in' as const, title: 'Salary', category: 'Income', amount: '$5,200.00', date: 'Jan 30', time: '9:00 AM' },
			{ type: 'out' as const, title: 'Netflix', category: 'Entertainment', amount: '$15.99', date: 'Jan 29', time: '3:45 PM' },
			{ type: 'out' as const, title: 'Uber Eats', category: 'Food', amount: '$28.50', date: 'Jan 28', time: '7:30 PM' },
			{ type: 'out' as const, title: 'Amazon', category: 'Shopping', amount: '$89.50', date: 'Jan 28', time: '2:15 PM' },
			{ type: 'in' as const, title: 'Refund', category: 'Refund', amount: '$34.00', date: 'Jan 27', time: '11:00 AM' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<WalletHeader {...profileData.header} />
				<Tabs defaultValue="overview" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="overview" className="gap-2">
							<Wallet className="size-4" />
							Overview
						</TabsTrigger>
						<TabsTrigger value="cards" className="gap-2">
							<CreditCard className="size-4" />
							Cards
						</TabsTrigger>
						<TabsTrigger value="analytics" className="gap-2">
							<PieChart className="size-4" />
							Analytics
						</TabsTrigger>
						<TabsTrigger value="history" className="gap-2">
							<History className="size-4" />
							History
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="mt-6">
						<OverviewTab quickActions={profileData.quickActions} recentTransactions={profileData.recentTransactions} />
					</TabsContent>
					<TabsContent value="cards" className="mt-6">
						<CardsTab cards={profileData.cards} />
					</TabsContent>
					<TabsContent value="analytics" className="mt-6">
						<AnalyticsTab spending={profileData.spending} monthlyTrend={profileData.monthlyTrend} />
					</TabsContent>
					<TabsContent value="history" className="mt-6">
						<HistoryTab transactions={profileData.allTransactions} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
