import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowDownRight,
	ArrowUpRight,
	Banknote,
	Building2,
	ChevronRight,
	CreditCard,
	DollarSign,
	Eye,
	EyeOff,
	Globe,
	PiggyBank,
	Plus,
	Send,
	Settings,
	Target,
	TrendingDown,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const FinanceHeader = ({
	src,
	fallback,
	name,
	netWorth,
	change,
	positive,
}: {
	src: string;
	fallback: string;
	name: string;
	netWorth: string;
	change: string;
	positive: boolean;
}) => (
	<Card className="col-span-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
				<div className="flex items-center gap-4">
					<Avatar className="size-14">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback>{fallback}</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm text-muted-foreground">Welcome back,</p>
						<h1 className="text-xl font-bold">{name}</h1>
					</div>
				</div>
				<div className="text-left @md:text-right">
					<p className="text-sm text-muted-foreground">Net Worth</p>
					<div className="flex items-center gap-2 @md:justify-end">
						<p className="text-2xl font-bold">{netWorth}</p>
						<span className={`text-sm flex items-center gap-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
							{positive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
							{change}
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AccountCard = ({
	name,
	type,
	balance,
	number,
	icon: Icon,
	color,
}: {
	name: string;
	type: string;
	balance: string;
	number: string;
	icon: React.ElementType;
	color: string;
}) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className={`p-2 rounded-lg ${color}`}>
					<Icon className="size-5 text-white" />
				</div>
				<Button variant="ghost" size="icon" className="size-8">
					<Eye className="size-4" />
				</Button>
			</div>
			<p className="text-sm text-muted-foreground">{type}</p>
			<p className="font-medium">{name}</p>
			<p className="text-xl font-bold mt-2">{balance}</p>
			<p className="text-xs text-muted-foreground">•••• {number}</p>
		</CardContent>
	</Card>
);

const QuickActionsCard = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold">Quick Actions</h3>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-2">
				{actions.map((action, i) => (
					<Link
						key={i}
						href={action.href}
						className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
					>
						<div className="p-2 rounded-full bg-primary/10">
							<action.icon className="size-5 text-primary" />
						</div>
						<span className="text-xs font-medium">{action.label}</span>
					</Link>
				))}
			</div>
		</CardContent>
	</Card>
);

const SpendingCard = ({
	categories,
	total,
}: {
	categories: { name: string; amount: string; percentage: number; color: string }[];
	total: string;
}) => (
	<Card className="col-span-2 row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Monthly Spending</h3>
				<Badge variant="outline">{total}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{categories.map((cat, i) => (
				<div key={i} className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className={`size-3 rounded-full ${cat.color}`} />
							<span>{cat.name}</span>
						</div>
						<span className="font-medium">{cat.amount}</span>
					</div>
					<Progress value={cat.percentage} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

const TransactionCard = ({
	name,
	category,
	amount,
	date,
	positive,
}: {
	name: string;
	category: string;
	amount: string;
	date: string;
	positive: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className={`p-2 rounded-lg ${positive ? 'bg-green-500/10' : 'bg-muted'}`}>
					{positive ? (
						<ArrowDownRight className="size-4 text-green-500" />
					) : (
						<ArrowUpRight className="size-4 text-muted-foreground" />
					)}
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{name}</p>
					<p className="text-xs text-muted-foreground">{category} • {date}</p>
				</div>
				<p className={`font-semibold ${positive ? 'text-green-500' : ''}`}>
					{positive ? '+' : '-'}{amount}
				</p>
			</div>
		</CardContent>
	</Card>
);

const GoalCard = ({
	name,
	current,
	target,
	icon,
	dueDate,
}: {
	name: string;
	current: number;
	target: number;
	icon: string;
	dueDate: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-2">
				<span className="text-lg">{icon}</span>
				<span className="font-medium text-sm">{name}</span>
			</div>
			<div className="flex items-end justify-between">
				<div>
					<p className="text-xl font-bold">${current.toLocaleString()}</p>
					<p className="text-xs text-muted-foreground">of ${target.toLocaleString()}</p>
				</div>
				<Badge variant="secondary">{Math.round((current / target) * 100)}%</Badge>
			</div>
			<Progress value={(current / target) * 100} className="h-1.5 mt-2" />
			<p className="text-xs text-muted-foreground mt-2">Due: {dueDate}</p>
		</CardContent>
	</Card>
);

const CreditScoreCard = ({
	score,
	change,
	rating,
}: {
	score: number;
	change: number;
	rating: string;
}) => (
	<Card className="col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Credit Score</p>
					<div className="flex items-center gap-2">
						<p className="text-3xl font-bold">{score}</p>
						<span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
							{change > 0 ? '+' : ''}{change}
						</span>
					</div>
					<Badge className="bg-green-500/20 text-green-600 mt-1">{rating}</Badge>
				</div>
				<div className="relative size-20">
					<svg className="size-20 -rotate-90">
						<circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
						<circle
							cx="40" cy="40" r="34"
							fill="none" stroke="currentColor" strokeWidth="6"
							strokeDasharray={`${(score / 850) * 214} 214`}
							strokeLinecap="round"
							className="text-green-500"
						/>
					</svg>
				</div>
			</div>
		</CardContent>
	</Card>
);

const UpcomingBillsCard = ({
	bills,
}: {
	bills: { name: string; amount: string; dueDate: string; icon: React.ElementType }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Upcoming Bills</h3>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{bills.map((bill, i) => (
				<div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
					<div className="flex items-center gap-3">
						<bill.icon className="size-5 text-muted-foreground" />
						<div>
							<p className="font-medium text-sm">{bill.name}</p>
							<p className="text-xs text-muted-foreground">Due {bill.dueDate}</p>
						</div>
					</div>
					<p className="font-semibold">{bill.amount}</p>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
			fallback: 'DT',
			name: 'David Thompson',
			netWorth: '$142,580',
			change: '+$2,450 (1.7%)',
			positive: true,
		},
		accounts: [
			{ name: 'Primary Checking', type: 'Bank Account', balance: '$12,450', number: '4521', icon: Building2, color: 'bg-blue-500' },
			{ name: 'High-Yield Savings', type: 'Savings', balance: '$28,920', number: '8832', icon: PiggyBank, color: 'bg-emerald-500' },
			{ name: 'Investment Portfolio', type: 'Brokerage', balance: '$86,210', number: '1298', icon: TrendingUp, color: 'bg-violet-500' },
			{ name: 'Travel Rewards', type: 'Credit Card', balance: '-$2,340', number: '9012', icon: CreditCard, color: 'bg-amber-500' },
		],
		quickActions: [
			{ icon: Send, label: 'Transfer', href: '/transfer' },
			{ icon: Banknote, label: 'Pay Bills', href: '/bills' },
			{ icon: Globe, label: 'International', href: '/intl' },
			{ icon: Plus, label: 'Add Account', href: '/accounts/new' },
		],
		spending: {
			total: '$3,840',
			categories: [
				{ name: 'Housing', amount: '$1,500', percentage: 39, color: 'bg-blue-500' },
				{ name: 'Food & Dining', amount: '$680', percentage: 18, color: 'bg-amber-500' },
				{ name: 'Transportation', amount: '$420', percentage: 11, color: 'bg-green-500' },
				{ name: 'Shopping', amount: '$540', percentage: 14, color: 'bg-purple-500' },
				{ name: 'Entertainment', amount: '$320', percentage: 8, color: 'bg-pink-500' },
				{ name: 'Other', amount: '$380', percentage: 10, color: 'bg-gray-500' },
			],
		},
		transactions: [
			{ name: 'Salary Deposit', category: 'Income', amount: '$5,200', date: 'Today', positive: true },
			{ name: 'Amazon', category: 'Shopping', amount: '$156.99', date: 'Yesterday', positive: false },
		],
		goals: [
			{ name: 'Emergency Fund', current: 8500, target: 15000, icon: '🛡️', dueDate: 'Dec 2024' },
			{ name: 'Vacation', current: 2200, target: 5000, icon: '✈️', dueDate: 'Jun 2024' },
		],
		creditScore: { score: 752, change: 12, rating: 'Excellent' },
		bills: [
			{ name: 'Electric Bill', amount: '$142', dueDate: 'Feb 5', icon: Wallet },
			{ name: 'Internet', amount: '$89', dueDate: 'Feb 8', icon: Globe },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<FinanceHeader {...profileData.user} />
					{profileData.accounts.map((account, i) => (
						<AccountCard key={i} {...account} />
					))}
					<QuickActionsCard actions={profileData.quickActions} />
					<CreditScoreCard {...profileData.creditScore} />
					<SpendingCard {...profileData.spending} />
					{profileData.transactions.map((tx, i) => (
						<TransactionCard key={i} {...tx} />
					))}
					{profileData.goals.map((goal, i) => (
						<GoalCard key={i} {...goal} />
					))}
					<UpcomingBillsCard bills={profileData.bills} />
				</div>
			</div>
		</section>
	);
}
