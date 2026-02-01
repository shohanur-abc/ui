import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Users,
	UserPlus,
	UserCheck,
	UserX,
	TrendingUp,
	TrendingDown,
	Mail,
	ShoppingCart,
	Star,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';

interface CustomerJourney {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	stage: 'lead' | 'prospect' | 'first_purchase' | 'repeat' | 'vip' | 'at_risk';
	score: number;
	totalSpent: string;
	orderCount: number;
	lastActivity: string;
	trend: 'up' | 'down' | 'stable';
}

interface CustomerTrackerProps {
	title: string;
	customers: CustomerJourney[];
	stats: {
		totalCustomers: number;
		newThisMonth: number;
		atRisk: number;
		growthRate: string;
	};
}

const StageConfig: Record<
	CustomerJourney['stage'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	lead: {
		label: 'Lead',
		className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
		icon: Mail,
	},
	prospect: {
		label: 'Prospect',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: UserPlus,
	},
	first_purchase: {
		label: 'First Purchase',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: ShoppingCart,
	},
	repeat: {
		label: 'Repeat',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		icon: UserCheck,
	},
	vip: {
		label: 'VIP',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		icon: Star,
	},
	at_risk: {
		label: 'At Risk',
		className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		icon: UserX,
	},
};

const HealthScore = ({ score }: { score: number }) => {
	const color =
		score >= 80
			? 'text-emerald-400'
			: score >= 60
				? 'text-amber-400'
				: 'text-rose-400';

	return (
		<div className="flex items-center gap-2">
			<div
				className={`size-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${color} ${
					score >= 80
						? 'border-emerald-500/50'
						: score >= 60
							? 'border-amber-500/50'
							: 'border-rose-500/50'
				}`}
			>
				{score}
			</div>
		</div>
	);
};

const CustomerCard = ({ customer }: { customer: CustomerJourney }) => {
	const config = StageConfig[customer.stage];
	const StageIcon = config.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				customer.stage === 'at_risk'
					? 'border-rose-500/30 bg-rose-500/5'
					: customer.stage === 'vip'
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-center gap-4">
				<Avatar className="size-12">
					<AvatarImage
						src={customer.customer.avatar}
						alt={customer.customer.name}
					/>
					<AvatarFallback className="bg-secondary">
						{customer.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="font-medium text-foreground">
									{customer.customer.name}
								</span>
								<Badge variant="outline" className={config.className}>
									<StageIcon className="size-3 mr-1" />
									{config.label}
								</Badge>
							</div>
							<span className="text-xs text-muted-foreground">
								{customer.customer.email}
							</span>
						</div>
						<HealthScore score={customer.score} />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 mt-4 p-3 rounded-lg bg-muted/30">
				<div className="text-center">
					<span className="text-lg font-bold text-foreground block">
						{customer.totalSpent}
					</span>
					<span className="text-xs text-muted-foreground">Total Spent</span>
				</div>
				<div className="text-center border-x border-border/50">
					<span className="text-lg font-bold text-foreground block">
						{customer.orderCount}
					</span>
					<span className="text-xs text-muted-foreground">Orders</span>
				</div>
				<div className="text-center">
					<div className="flex items-center justify-center gap-1">
						{customer.trend === 'up' ? (
							<TrendingUp className="size-4 text-emerald-400" />
						) : customer.trend === 'down' ? (
							<TrendingDown className="size-4 text-rose-400" />
						) : (
							<span className="text-muted-foreground">—</span>
						)}
					</div>
					<span className="text-xs text-muted-foreground">Trend</span>
				</div>
			</div>

			<div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
				<span>Last activity: {customer.lastActivity}</span>
				<Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
					View Profile
					<ChevronRight className="size-3" />
				</Button>
			</div>
		</div>
	);
};

const CustomerStats = ({ stats }: { stats: CustomerTrackerProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-center">
			<Users className="size-4 text-muted-foreground mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.totalCustomers}
			</span>
			<span className="text-xs text-muted-foreground">Total</span>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
			<UserPlus className="size-4 text-emerald-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-emerald-400 block">
				{stats.newThisMonth}
			</span>
			<span className="text-xs text-muted-foreground">New</span>
		</div>
		<div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
			<UserX className="size-4 text-rose-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-rose-400 block">
				{stats.atRisk}
			</span>
			<span className="text-xs text-muted-foreground">At Risk</span>
		</div>
		<div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
			<TrendingUp className="size-4 text-primary mx-auto mb-1" />
			<span className="text-lg font-bold text-primary block">
				{stats.growthRate}
			</span>
			<span className="text-xs text-muted-foreground">Growth</span>
		</div>
	</div>
);

const CustomerTracker = ({ title, customers, stats }: CustomerTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Users className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<CustomerStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{customers.map((customer) => (
						<CustomerCard key={customer.id} customer={customer} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const customers: CustomerJourney[] = [
		{
			id: '1',
			customer: {
				name: 'Sarah Chen',
				email: 'sarah.chen@email.com',
				initials: 'SC',
			},
			stage: 'vip',
			score: 95,
			totalSpent: '$12,450',
			orderCount: 28,
			lastActivity: '2 hours ago',
			trend: 'up',
		},
		{
			id: '2',
			customer: {
				name: 'Mike Johnson',
				email: 'mike.j@company.com',
				initials: 'MJ',
			},
			stage: 'at_risk',
			score: 45,
			totalSpent: '$3,200',
			orderCount: 8,
			lastActivity: '45 days ago',
			trend: 'down',
		},
		{
			id: '3',
			customer: {
				name: 'Emily Davis',
				email: 'emily.davis@gmail.com',
				initials: 'ED',
			},
			stage: 'repeat',
			score: 78,
			totalSpent: '$2,890',
			orderCount: 5,
			lastActivity: '1 week ago',
			trend: 'stable',
		},
		{
			id: '4',
			customer: {
				name: 'Alex Kim',
				email: 'akim@business.co',
				initials: 'AK',
			},
			stage: 'first_purchase',
			score: 65,
			totalSpent: '$149',
			orderCount: 1,
			lastActivity: '3 days ago',
			trend: 'up',
		},
		{
			id: '5',
			customer: {
				name: 'Jordan Lee',
				email: 'jordan.lee@mail.com',
				initials: 'JL',
			},
			stage: 'prospect',
			score: 55,
			totalSpent: '$0',
			orderCount: 0,
			lastActivity: 'Yesterday',
			trend: 'up',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<CustomerTracker
					title="Customer Journey"
					customers={customers}
					stats={{
						totalCustomers: 2847,
						newThisMonth: 156,
						atRisk: 23,
						growthRate: '+8.5%',
					}}
				/>
			</div>
		</section>
	);
}
