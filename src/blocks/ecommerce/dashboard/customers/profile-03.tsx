import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	Calendar,
	DollarSign,
	Eye,
	Heart,
	MessageSquare,
	MoreHorizontal,
	Package,
	Repeat,
	ShoppingCart,
	Star,
	TrendingUp,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CustomerAnalytics {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	metrics: {
		ltv: { value: string; change: number };
		aov: { value: string; change: number };
		frequency: { value: string; change: number };
		recency: { value: string; status: 'good' | 'warning' | 'danger' };
	};
	segments: string[];
	behaviorScore: number;
	engagementLevel: 'low' | 'medium' | 'high' | 'very-high';
	purchaseHistory: Array<{
		month: string;
		amount: number;
	}>;
	categoryBreakdown: Array<{
		name: string;
		percentage: number;
		amount: string;
	}>;
	predictedChurn: number;
	nextPurchase: {
		likelihood: number;
		estimatedDate: string;
		estimatedValue: string;
	};
}

const TrendIndicator = ({ value }: { value: number }) => {
	const isPositive = value > 0;
	return (
		<span
			className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-500' : value < 0 ? 'text-red-500' : 'text-muted-foreground'}`}
		>
			{isPositive ? (
				<ArrowUpRight className="size-3" />
			) : value < 0 ? (
				<ArrowDownRight className="size-3" />
			) : null}
			{Math.abs(value)}%
		</span>
	);
};

const MetricCard = ({
	label,
	value,
	change,
	icon: Icon,
}: {
	label: string;
	value: string;
	change?: number;
	icon: React.ElementType;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-muted-foreground text-sm">{label}</span>
				<Icon className="size-4 text-muted-foreground" />
			</div>
			<div className="flex items-end gap-2">
				<span className="text-2xl font-bold">{value}</span>
				{change !== undefined && <TrendIndicator value={change} />}
			</div>
		</CardContent>
	</Card>
);

const EngagementBadge = ({
	level,
}: {
	level: CustomerAnalytics['engagementLevel'];
}) => {
	const config: Record<string, { label: string; className: string }> = {
		low: { label: 'Low', className: 'bg-red-500/10 text-red-500' },
		medium: { label: 'Medium', className: 'bg-amber-500/10 text-amber-500' },
		high: { label: 'High', className: 'bg-emerald-500/10 text-emerald-500' },
		'very-high': {
			label: 'Very High',
			className: 'bg-cyan-500/10 text-cyan-500',
		},
	};
	return (
		<Badge variant="outline" className={config[level].className}>
			{config[level].label}
		</Badge>
	);
};

const ChurnRiskBar = ({ value }: { value: number }) => {
	const getColor = (v: number) => {
		if (v >= 70) return '[&>div]:bg-red-500';
		if (v >= 40) return '[&>div]:bg-amber-500';
		return '[&>div]:bg-emerald-500';
	};
	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium">Churn Risk</span>
				<span
					className={`text-sm font-bold ${value >= 70 ? 'text-red-500' : value >= 40 ? 'text-amber-500' : 'text-emerald-500'}`}
				>
					{value}%
				</span>
			</div>
			<Progress value={value} className={`h-2 ${getColor(value)}`} />
		</div>
	);
};

const ProfileHeader = ({ customer }: { customer: CustomerAnalytics }) => (
	<div className="flex flex-col @md:flex-row gap-4 items-start">
		<Avatar className="size-16">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-xl">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-2 mb-2">
				<h1 className="text-2xl font-bold">{customer.name}</h1>
				<EngagementBadge level={customer.engagementLevel} />
			</div>
			<p className="text-muted-foreground text-sm mb-2">{customer.email}</p>
			<div className="flex flex-wrap gap-1.5">
				{customer.segments.map((segment) => (
					<Badge key={segment} variant="secondary" className="text-xs">
						{segment}
					</Badge>
				))}
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm">
				<BarChart3 className="size-4 mr-1.5" />
				Full Report
			</Button>
		</div>
	</div>
);

const CategoryBar = ({
	category,
}: {
	category: CustomerAnalytics['categoryBreakdown'][0];
}) => (
	<div>
		<div className="flex items-center justify-between mb-1 text-sm">
			<span>{category.name}</span>
			<span className="text-muted-foreground">{category.amount}</span>
		</div>
		<div className="h-2 rounded-full bg-muted overflow-hidden">
			<div
				className="h-full bg-primary rounded-full"
				style={{ width: `${category.percentage}%` }}
			/>
		</div>
	</div>
);

export default function Main() {
	const customer: CustomerAnalytics = {
		id: '1',
		name: 'Emily Richardson',
		email: 'emily.r@email.com',
		initials: 'ER',
		metrics: {
			ltv: { value: '$12,450', change: 15 },
			aov: { value: '$245', change: 8 },
			frequency: { value: '2.3/mo', change: -5 },
			recency: { value: '5 days', status: 'good' },
		},
		segments: [
			'High Value',
			'Fashion Enthusiast',
			'Mobile Shopper',
			'Early Adopter',
		],
		behaviorScore: 85,
		engagementLevel: 'very-high',
		purchaseHistory: [
			{ month: 'Aug', amount: 320 },
			{ month: 'Sep', amount: 450 },
			{ month: 'Oct', amount: 280 },
			{ month: 'Nov', amount: 890 },
			{ month: 'Dec', amount: 1200 },
			{ month: 'Jan', amount: 380 },
		],
		categoryBreakdown: [
			{ name: 'Fashion', percentage: 45, amount: '$5,602' },
			{ name: 'Electronics', percentage: 25, amount: '$3,112' },
			{ name: 'Home & Garden', percentage: 18, amount: '$2,241' },
			{ name: 'Beauty', percentage: 12, amount: '$1,494' },
		],
		predictedChurn: 12,
		nextPurchase: {
			likelihood: 78,
			estimatedDate: 'Next 7 days',
			estimatedValue: '$180-$250',
		},
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader customer={customer} />

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<MetricCard
						label="Lifetime Value"
						value={customer.metrics.ltv.value}
						change={customer.metrics.ltv.change}
						icon={DollarSign}
					/>
					<MetricCard
						label="Avg Order Value"
						value={customer.metrics.aov.value}
						change={customer.metrics.aov.change}
						icon={ShoppingCart}
					/>
					<MetricCard
						label="Purchase Frequency"
						value={customer.metrics.frequency.value}
						change={customer.metrics.frequency.change}
						icon={Repeat}
					/>
					<MetricCard
						label="Last Purchase"
						value={customer.metrics.recency.value}
						icon={Calendar}
					/>
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<TrendingUp className="size-4" />
								Category Spending
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{customer.categoryBreakdown.map((category) => (
								<CategoryBar key={category.name} category={category} />
							))}
						</CardContent>
					</Card>

					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<Activity className="size-4" />
									Risk Analysis
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ChurnRiskBar value={customer.predictedChurn} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<Eye className="size-4" />
									Next Purchase Prediction
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Likelihood
									</span>
									<span className="font-semibold text-emerald-500">
										{customer.nextPurchase.likelihood}%
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Expected
									</span>
									<span className="font-medium">
										{customer.nextPurchase.estimatedDate}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Est. Value
									</span>
									<span className="font-medium">
										{customer.nextPurchase.estimatedValue}
									</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
