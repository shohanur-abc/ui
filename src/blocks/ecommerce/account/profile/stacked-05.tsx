import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	BarChart3,
	CreditCard,
	DollarSign,
	Eye,
	EyeOff,
	HelpCircle,
	LineChart,
	PieChart,
	Plus,
	RefreshCw,
	Send,
	TrendingDown,
	TrendingUp,
	Wallet,
} from 'lucide-react';

const FinanceHeader = ({
	name,
	netWorth,
	monthlyChange,
	positive,
}: {
	name: string;
	netWorth: string;
	monthlyChange: string;
	positive: boolean;
}) => (
	<Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
				<div>
					<p className="text-muted-foreground">Welcome back, {name}</p>
					<div className="flex items-center gap-2 mt-2">
						<h1 className="text-4xl font-bold">{netWorth}</h1>
						<Button variant="ghost" size="icon" className="size-8">
							<Eye className="size-4" />
						</Button>
					</div>
					<div
						className={`flex items-center gap-1 mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}
					>
						{positive ? (
							<TrendingUp className="size-4" />
						) : (
							<TrendingDown className="size-4" />
						)}
						<span className="text-sm font-medium">
							{monthlyChange} this month
						</span>
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
		</CardContent>
	</Card>
);

const AccountsSummary = ({
	accounts,
}: {
	accounts: {
		name: string;
		type: string;
		balance: string;
		change: string;
		positive: boolean;
		icon: React.ElementType;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Accounts</h2>
				<Button variant="ghost" size="sm" className="gap-1">
					<Plus className="size-4" />
					Add Account
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{accounts.map((account, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10">
							<account.icon className="size-5 text-primary" />
						</div>
						<div>
							<p className="font-medium">{account.name}</p>
							<p className="text-sm text-muted-foreground">{account.type}</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-semibold">{account.balance}</p>
						<p
							className={`text-xs ${account.positive ? 'text-green-500' : 'text-red-500'}`}
						>
							{account.change}
						</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const QuickActions = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; color: string }[];
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="grid grid-cols-4 gap-2">
				{actions.map((action, i) => (
					<button
						key={i}
						className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
					>
						<div className={`p-3 rounded-full ${action.color}`}>
							<action.icon className="size-5 text-white" />
						</div>
						<span className="text-xs font-medium">{action.label}</span>
					</button>
				))}
			</div>
		</CardContent>
	</Card>
);

const SpendingOverview = ({
	categories,
	total,
}: {
	categories: {
		name: string;
		amount: string;
		percentage: number;
		color: string;
	}[];
	total: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Spending This Month</h2>
				<Badge variant="secondary">{total}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{categories.map((cat, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span>{cat.name}</span>
						<span className="font-medium">{cat.amount}</span>
					</div>
					<div className="h-2 rounded-full bg-muted overflow-hidden">
						<div
							className={`h-full rounded-full ${cat.color}`}
							style={{ width: `${cat.percentage}%` }}
						/>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const RecentTransactions = ({
	transactions,
}: {
	transactions: {
		type: 'in' | 'out';
		title: string;
		category: string;
		amount: string;
		date: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Recent Transactions</h2>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{transactions.map((tx, i) => (
				<div key={i} className="flex items-center justify-between py-2">
					<div className="flex items-center gap-3">
						<div
							className={`p-2 rounded-full ${tx.type === 'in' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
						>
							{tx.type === 'in' ? (
								<ArrowDownToLine className="size-4 text-green-500" />
							) : (
								<ArrowUpFromLine className="size-4 text-red-500" />
							)}
						</div>
						<div>
							<p className="font-medium">{tx.title}</p>
							<p className="text-xs text-muted-foreground">{tx.category}</p>
						</div>
					</div>
					<div className="text-right">
						<p
							className={`font-medium ${tx.type === 'in' ? 'text-green-500' : ''}`}
						>
							{tx.type === 'in' ? '+' : '-'}
							{tx.amount}
						</p>
						<p className="text-xs text-muted-foreground">{tx.date}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const SavingsGoals = ({
	goals,
}: {
	goals: {
		name: string;
		current: string;
		target: string;
		progress: number;
		icon: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Savings Goals</h2>
		</CardHeader>
		<CardContent className="space-y-4">
			{goals.map((goal, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center gap-2">
						<span className="text-2xl">{goal.icon}</span>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<p className="font-medium">{goal.name}</p>
								<p className="text-sm">
									{goal.current} / {goal.target}
								</p>
							</div>
							<Progress value={goal.progress} className="h-2 mt-1" />
						</div>
					</div>
				</div>
			))}
			<Button variant="outline" className="w-full gap-2">
				<Plus className="size-4" />
				Add New Goal
			</Button>
		</CardContent>
	</Card>
);

const InsightsCard = ({
	insights,
}: {
	insights: {
		title: string;
		description: string;
		type: 'tip' | 'warning' | 'info';
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<HelpCircle className="size-5" />
				<h2 className="font-semibold">Insights</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{insights.map((insight, i) => (
				<div
					key={i}
					className={`p-4 rounded-lg ${
						insight.type === 'tip'
							? 'bg-green-500/10'
							: insight.type === 'warning'
								? 'bg-amber-500/10'
								: 'bg-blue-500/10'
					}`}
				>
					<p className="font-medium">{insight.title}</p>
					<p className="text-sm text-muted-foreground mt-1">
						{insight.description}
					</p>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			name: 'Alex',
			netWorth: '$124,580.00',
			monthlyChange: '+$2,450',
			positive: true,
		},
		accounts: [
			{
				name: 'Main Checking',
				type: 'Bank of America',
				balance: '$12,450.00',
				change: '+$1,200',
				positive: true,
				icon: Wallet,
			},
			{
				name: 'Investment Portfolio',
				type: 'Fidelity',
				balance: '$89,230.00',
				change: '+$3,450',
				positive: true,
				icon: LineChart,
			},
			{
				name: 'Credit Card',
				type: 'Chase Sapphire',
				balance: '-$2,100.00',
				change: '-$450',
				positive: false,
				icon: CreditCard,
			},
			{
				name: 'Savings',
				type: 'High Yield',
				balance: '$25,000.00',
				change: '+$250',
				positive: true,
				icon: DollarSign,
			},
		],
		quickActions: [
			{ icon: Send, label: 'Send', color: 'bg-blue-500' },
			{ icon: ArrowDownToLine, label: 'Request', color: 'bg-green-500' },
			{ icon: RefreshCw, label: 'Transfer', color: 'bg-purple-500' },
			{ icon: BarChart3, label: 'Invest', color: 'bg-orange-500' },
		],
		spending: {
			total: '$3,456',
			categories: [
				{
					name: 'Housing',
					amount: '$1,200',
					percentage: 35,
					color: 'bg-blue-500',
				},
				{
					name: 'Food & Dining',
					amount: '$650',
					percentage: 19,
					color: 'bg-green-500',
				},
				{
					name: 'Transportation',
					amount: '$420',
					percentage: 12,
					color: 'bg-purple-500',
				},
				{
					name: 'Shopping',
					amount: '$580',
					percentage: 17,
					color: 'bg-pink-500',
				},
				{ name: 'Other', amount: '$606', percentage: 17, color: 'bg-gray-500' },
			],
		},
		transactions: [
			{
				type: 'out' as const,
				title: 'Amazon',
				category: 'Shopping',
				amount: '$89.99',
				date: 'Today',
			},
			{
				type: 'in' as const,
				title: 'Direct Deposit',
				category: 'Income',
				amount: '$3,500.00',
				date: 'Yesterday',
			},
			{
				type: 'out' as const,
				title: 'Spotify',
				category: 'Entertainment',
				amount: '$9.99',
				date: 'Jan 28',
			},
			{
				type: 'out' as const,
				title: 'Uber Eats',
				category: 'Food',
				amount: '$34.50',
				date: 'Jan 27',
			},
		],
		savingsGoals: [
			{
				name: 'Emergency Fund',
				current: '$8,500',
				target: '$10,000',
				progress: 85,
				icon: '🛡️',
			},
			{
				name: 'Vacation',
				current: '$2,200',
				target: '$5,000',
				progress: 44,
				icon: '✈️',
			},
			{
				name: 'New Car',
				current: '$12,000',
				target: '$30,000',
				progress: 40,
				icon: '🚗',
			},
		],
		insights: [
			{
				title: 'Great job!',
				description: 'You spent 15% less on dining this month.',
				type: 'tip' as const,
			},
			{
				title: 'Bill reminder',
				description: 'Your electric bill is due in 3 days.',
				type: 'warning' as const,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<FinanceHeader {...profileData.header} />
				<QuickActions actions={profileData.quickActions} />
				<AccountsSummary accounts={profileData.accounts} />
				<SpendingOverview
					categories={profileData.spending.categories}
					total={profileData.spending.total}
				/>
				<RecentTransactions transactions={profileData.transactions} />
				<SavingsGoals goals={profileData.savingsGoals} />
				<InsightsCard insights={profileData.insights} />
			</div>
		</section>
	);
}
