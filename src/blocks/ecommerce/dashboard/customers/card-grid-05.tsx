import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	ChevronRight,
	Clock,
	DollarSign,
	Mail,
	MoreHorizontal,
	RefreshCcw,
	ShoppingCart,
	TrendingDown,
	UserMinus,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AtRiskCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	riskScore: number;
	riskLevel: 'medium' | 'high' | 'critical';
	riskFactors: string[];
	lastPurchase: string;
	daysSinceLastPurchase: number;
	lifetimeValue: string;
	potentialLoss: string;
	previousPurchaseFrequency: string;
	currentStatus: string;
	recommendedAction: string;
}

const RiskOverview = ({
	stats,
}: {
	stats: { title: string; value: string; change: string; changeType: 'up' | 'down'; icon: React.ElementType; color: string }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center justify-between px-4">
					<div>
						<p className="text-muted-foreground text-sm">{stat.title}</p>
						<p className="text-2xl font-bold">{stat.value}</p>
						<div
							className={`flex items-center gap-1 text-xs ${
								stat.changeType === 'up' ? 'text-red-500' : 'text-emerald-500'
							}`}
						>
							{stat.changeType === 'up' ? (
								<ArrowUp className="size-3" />
							) : (
								<ArrowDown className="size-3" />
							)}
							{stat.change}
						</div>
					</div>
					<div className={`rounded-lg p-2.5 ${stat.color}`}>
						<stat.icon className="size-5" />
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const RiskScoreBar = ({
	score,
	level,
}: {
	score: number;
	level: AtRiskCustomer['riskLevel'];
}) => {
	const colors = {
		medium: 'bg-amber-500',
		high: 'bg-orange-500',
		critical: 'bg-red-500',
	};
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Risk Score</span>
				<span className={`font-bold ${colors[level].replace('bg-', 'text-')}`}>{score}/100</span>
			</div>
			<div className="bg-muted h-2 w-full overflow-hidden rounded-full">
				<div
					className={`h-full rounded-full ${colors[level]}`}
					style={{ width: `${score}%` }}
				/>
			</div>
		</div>
	);
};

const RiskBadge = ({ level }: { level: AtRiskCustomer['riskLevel'] }) => {
	const config = {
		medium: { label: 'Medium Risk', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		high: { label: 'High Risk', className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
		critical: { label: 'Critical', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	return (
		<Badge variant="outline" className={`${config[level].className} gap-1`}>
			<AlertTriangle className="size-3" />
			{config[level].label}
		</Badge>
	);
};

const RiskFactorsList = ({ factors }: { factors: string[] }) => (
	<div className="space-y-1">
		<p className="text-muted-foreground text-xs font-medium">Risk Factors</p>
		<div className="flex flex-wrap gap-1">
			{factors.map((factor) => (
				<Badge key={factor} variant="secondary" className="text-xs">
					{factor}
				</Badge>
			))}
		</div>
	</div>
);

const MetricRow = ({
	label,
	value,
	icon: Icon,
}: {
	label: string;
	value: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground flex items-center gap-1.5">
			<Icon className="size-3.5" />
			{label}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const AtRiskCard = ({ customer }: { customer: AtRiskCustomer }) => (
	<Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
		<div
			className={`absolute inset-y-0 left-0 w-1 ${
				customer.riskLevel === 'critical'
					? 'bg-red-500'
					: customer.riskLevel === 'high'
						? 'bg-orange-500'
						: 'bg-amber-500'
			}`}
		/>
		<CardHeader className="pb-3 pl-5">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-11">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View profile</DropdownMenuItem>
						<DropdownMenuItem>Send win-back email</DropdownMenuItem>
						<DropdownMenuItem>Create offer</DropdownMenuItem>
						<DropdownMenuItem>Mark as contacted</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4 pl-5">
			<div className="flex items-center justify-between">
				<RiskBadge level={customer.riskLevel} />
				<span className="text-muted-foreground text-xs">{customer.currentStatus}</span>
			</div>
			<RiskScoreBar score={customer.riskScore} level={customer.riskLevel} />
			<div className="space-y-2 border-t pt-3">
				<MetricRow icon={Clock} label="Last Purchase" value={customer.lastPurchase} />
				<MetricRow icon={DollarSign} label="Lifetime Value" value={customer.lifetimeValue} />
				<MetricRow icon={TrendingDown} label="Potential Loss" value={customer.potentialLoss} />
			</div>
			<RiskFactorsList factors={customer.riskFactors} />
		</CardContent>
		<CardFooter className="border-t bg-muted/20 pl-5">
			<div className="flex w-full items-center justify-between">
				<div className="flex-1">
					<p className="text-muted-foreground text-xs">Recommended</p>
					<p className="text-sm font-medium">{customer.recommendedAction}</p>
				</div>
				<Button size="sm" className="gap-1">
					Take Action
					<ChevronRight className="size-3.5" />
				</Button>
			</div>
		</CardFooter>
	</Card>
);

export default function Main() {
	const riskStats = [
		{ title: 'At-Risk Customers', value: '234', change: '+12 this week', changeType: 'up' as const, icon: UserMinus, color: 'bg-red-500/10 text-red-500' },
		{ title: 'Potential Revenue Loss', value: '$45.8K', change: '+8%', changeType: 'up' as const, icon: DollarSign, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Avg. Days Inactive', value: '45', change: '-3 days', changeType: 'down' as const, icon: Clock, color: 'bg-blue-500/10 text-blue-500' },
		{ title: 'Win-Back Rate', value: '18%', change: '+2%', changeType: 'down' as const, icon: RefreshCcw, color: 'bg-emerald-500/10 text-emerald-500' },
	];

	const customers: AtRiskCustomer[] = [
		{
			id: '1',
			name: 'Marcus Johnson',
			email: 'marcus.j@email.com',
			initials: 'MJ',
			riskScore: 92,
			riskLevel: 'critical',
			riskFactors: ['90+ days inactive', 'Cart abandoned', 'Support issues'],
			lastPurchase: '95 days ago',
			daysSinceLastPurchase: 95,
			lifetimeValue: '$4,560',
			potentialLoss: '$1,200',
			previousPurchaseFrequency: 'Monthly',
			currentStatus: 'No response to emails',
			recommendedAction: 'Personal outreach call',
		},
		{
			id: '2',
			name: 'Rachel Green',
			email: 'rachel.g@email.com',
			initials: 'RG',
			riskScore: 78,
			riskLevel: 'high',
			riskFactors: ['60+ days inactive', 'Declined purchases'],
			lastPurchase: '68 days ago',
			daysSinceLastPurchase: 68,
			lifetimeValue: '$2,890',
			potentialLoss: '$720',
			previousPurchaseFrequency: 'Bi-weekly',
			currentStatus: 'Opened last email',
			recommendedAction: 'Send exclusive offer',
		},
		{
			id: '3',
			name: 'Steven Clark',
			email: 'steven.c@email.com',
			initials: 'SC',
			riskScore: 85,
			riskLevel: 'critical',
			riskFactors: ['Unsubscribed', 'Negative review', '80+ days'],
			lastPurchase: '82 days ago',
			daysSinceLastPurchase: 82,
			lifetimeValue: '$5,120',
			potentialLoss: '$1,500',
			previousPurchaseFrequency: 'Weekly',
			currentStatus: 'Left negative feedback',
			recommendedAction: 'Customer service follow-up',
		},
		{
			id: '4',
			name: 'Nicole Adams',
			email: 'nicole.a@email.com',
			initials: 'NA',
			riskScore: 55,
			riskLevel: 'medium',
			riskFactors: ['45+ days inactive', 'Reduced engagement'],
			lastPurchase: '47 days ago',
			daysSinceLastPurchase: 47,
			lifetimeValue: '$1,890',
			potentialLoss: '$450',
			previousPurchaseFrequency: 'Monthly',
			currentStatus: 'Low email engagement',
			recommendedAction: 'Re-engagement campaign',
		},
		{
			id: '5',
			name: 'Tyler Wright',
			email: 'tyler.w@email.com',
			initials: 'TW',
			riskScore: 72,
			riskLevel: 'high',
			riskFactors: ['Payment failed', '55+ days inactive'],
			lastPurchase: '58 days ago',
			daysSinceLastPurchase: 58,
			lifetimeValue: '$3,450',
			potentialLoss: '$890',
			previousPurchaseFrequency: 'Bi-weekly',
			currentStatus: 'Payment method expired',
			recommendedAction: 'Update payment reminder',
		},
		{
			id: '6',
			name: 'Megan Hill',
			email: 'megan.h@email.com',
			initials: 'MH',
			riskScore: 48,
			riskLevel: 'medium',
			riskFactors: ['Browsing only', '40+ days no purchase'],
			lastPurchase: '42 days ago',
			daysSinceLastPurchase: 42,
			lifetimeValue: '$980',
			potentialLoss: '$280',
			previousPurchaseFrequency: 'Monthly',
			currentStatus: 'Active browser',
			recommendedAction: 'Personalized recommendations',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">At-Risk Customers</h1>
					<p className="text-muted-foreground text-sm">
						Identify and re-engage customers at risk of churning
					</p>
				</div>
				<RiskOverview stats={riskStats} />
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<AtRiskCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
