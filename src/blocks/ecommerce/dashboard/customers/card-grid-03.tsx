import {
	ArrowDown,
	ArrowUp,
	Clock,
	DollarSign,
	ExternalLink,
	Eye,
	Heart,
	MoreHorizontal,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CustomerInsight {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	lifetimeValue: string;
	avgOrderValue: string;
	purchaseFrequency: string;
	lastPurchase: string;
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	preferredCategories: string[];
	engagementScore: number;
	riskLevel: 'low' | 'medium' | 'high';
	nextPredictedPurchase: string;
}

const SummaryStats = ({
	stats,
}: {
	stats: { label: string; value: string; icon: React.ElementType }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center gap-4 px-4">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<stat.icon className="size-5" />
					</div>
					<div>
						<p className="text-2xl font-bold">{stat.value}</p>
						<p className="text-muted-foreground text-sm">{stat.label}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const TrendIndicator = ({
	trend,
	value,
}: {
	trend: CustomerInsight['trend'];
	value: string;
}) => {
	const config = {
		up: { color: 'text-emerald-500', icon: ArrowUp },
		down: { color: 'text-red-500', icon: ArrowDown },
		stable: { color: 'text-muted-foreground', icon: TrendingUp },
	};
	const Icon = config[trend].icon;
	return (
		<div className={`flex items-center gap-1 text-xs ${config[trend].color}`}>
			<Icon className="size-3" />
			{value}
		</div>
	);
};

const EngagementBar = ({ score }: { score: number }) => {
	const getColor = (s: number) => {
		if (s >= 80) return 'bg-emerald-500';
		if (s >= 60) return 'bg-amber-500';
		return 'bg-red-500';
	};
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Engagement</span>
				<span className="font-medium">{score}%</span>
			</div>
			<div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
				<div
					className={`h-full rounded-full ${getColor(score)}`}
					style={{ width: `${score}%` }}
				/>
			</div>
		</div>
	);
};

const RiskBadge = ({ level }: { level: CustomerInsight['riskLevel'] }) => {
	const config = {
		low: { label: 'Low Risk', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		medium: { label: 'Medium Risk', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		high: { label: 'High Risk', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	return (
		<Badge variant="outline" className={config[level].className}>
			{config[level].label}
		</Badge>
	);
};

const MetricItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
}) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground flex items-center gap-1.5">
			<Icon className="size-3.5" />
			{label}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const InsightCard = ({ customer }: { customer: CustomerInsight }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
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
						<DropdownMenuItem>
							<Eye className="mr-2 size-4" />
							View full profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View orders
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-muted-foreground text-xs">Lifetime Value</p>
					<div className="flex items-center gap-2">
						<p className="text-xl font-bold">{customer.lifetimeValue}</p>
						<TrendIndicator trend={customer.trend} value={customer.trendValue} />
					</div>
				</div>
				<RiskBadge level={customer.riskLevel} />
			</div>
			<div className="space-y-2 border-t pt-3">
				<MetricItem icon={DollarSign} label="Avg Order" value={customer.avgOrderValue} />
				<MetricItem icon={Package} label="Frequency" value={customer.purchaseFrequency} />
				<MetricItem icon={Clock} label="Last Purchase" value={customer.lastPurchase} />
				<MetricItem icon={ShoppingCart} label="Next Purchase" value={customer.nextPredictedPurchase} />
			</div>
			<EngagementBar score={customer.engagementScore} />
			<div className="flex flex-wrap gap-1">
				{customer.preferredCategories.map((cat) => (
					<Badge key={cat} variant="secondary" className="text-xs">
						{cat}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const summaryStats = [
		{ label: 'Total Customers', value: '12,456', icon: Heart },
		{ label: 'Avg. LTV', value: '$1,234', icon: DollarSign },
		{ label: 'Avg. Engagement', value: '72%', icon: TrendingUp },
		{ label: 'At-Risk Customers', value: '156', icon: Clock },
	];

	const customers: CustomerInsight[] = [
		{
			id: '1',
			name: 'Sarah Mitchell',
			email: 'sarah.m@email.com',
			initials: 'SM',
			lifetimeValue: '$8,450',
			avgOrderValue: '$156',
			purchaseFrequency: '2.5x/month',
			lastPurchase: '3 days ago',
			trend: 'up',
			trendValue: '+12%',
			preferredCategories: ['Electronics', 'Home'],
			engagementScore: 92,
			riskLevel: 'low',
			nextPredictedPurchase: 'In 5 days',
		},
		{
			id: '2',
			name: 'Robert Taylor',
			email: 'robert.t@email.com',
			initials: 'RT',
			lifetimeValue: '$4,230',
			avgOrderValue: '$98',
			purchaseFrequency: '1.2x/month',
			lastPurchase: '2 weeks ago',
			trend: 'stable',
			trendValue: '0%',
			preferredCategories: ['Sports', 'Outdoor'],
			engagementScore: 65,
			riskLevel: 'medium',
			nextPredictedPurchase: 'In 12 days',
		},
		{
			id: '3',
			name: 'Jennifer Lee',
			email: 'jennifer.l@email.com',
			initials: 'JL',
			lifetimeValue: '$1,890',
			avgOrderValue: '$67',
			purchaseFrequency: '0.5x/month',
			lastPurchase: '45 days ago',
			trend: 'down',
			trendValue: '-8%',
			preferredCategories: ['Fashion'],
			engagementScore: 34,
			riskLevel: 'high',
			nextPredictedPurchase: 'Unknown',
		},
		{
			id: '4',
			name: 'David Park',
			email: 'david.p@email.com',
			initials: 'DP',
			lifetimeValue: '$12,780',
			avgOrderValue: '$245',
			purchaseFrequency: '3x/month',
			lastPurchase: 'Yesterday',
			trend: 'up',
			trendValue: '+24%',
			preferredCategories: ['Tech', 'Gaming', 'Audio'],
			engagementScore: 98,
			riskLevel: 'low',
			nextPredictedPurchase: 'In 2 days',
		},
		{
			id: '5',
			name: 'Amanda Cruz',
			email: 'amanda.c@email.com',
			initials: 'AC',
			lifetimeValue: '$3,560',
			avgOrderValue: '$89',
			purchaseFrequency: '1x/month',
			lastPurchase: '1 month ago',
			trend: 'down',
			trendValue: '-5%',
			preferredCategories: ['Beauty', 'Wellness'],
			engagementScore: 48,
			riskLevel: 'medium',
			nextPredictedPurchase: 'In 3 weeks',
		},
		{
			id: '6',
			name: 'Kevin Zhang',
			email: 'kevin.z@email.com',
			initials: 'KZ',
			lifetimeValue: '$6,890',
			avgOrderValue: '$178',
			purchaseFrequency: '2x/month',
			lastPurchase: '1 week ago',
			trend: 'up',
			trendValue: '+8%',
			preferredCategories: ['Electronics', 'Books'],
			engagementScore: 78,
			riskLevel: 'low',
			nextPredictedPurchase: 'In 8 days',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Customer Insights</h1>
					<p className="text-muted-foreground text-sm">
						Analyze customer behavior and lifetime value
					</p>
				</div>
				<SummaryStats stats={summaryStats} />
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<InsightCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
