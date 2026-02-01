import {
	AlertTriangle,
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	ChevronRight,
	Clock,
	DollarSign,
	Eye,
	Heart,
	HeartCrack,
	Mail,
	MessageSquare,
	MoreHorizontal,
	Package,
	Phone,
	RefreshCw,
	ShoppingCart,
	TrendingDown,
	TrendingUp,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChurnProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	riskLevel: 'low' | 'medium' | 'high' | 'critical';
	churnProbability: number;
	churnReasons: Array<{
		reason: string;
		impact: number;
	}>;
	metrics: {
		daysSinceLastOrder: number;
		orderFrequencyChange: number;
		spendingChange: number;
		engagementChange: number;
	};
	history: {
		previousTier: string;
		currentTier: string;
		peakSpending: string;
		currentSpending: string;
	};
	recommendations: Array<{
		id: string;
		action: string;
		priority: 'low' | 'medium' | 'high';
		impact: string;
	}>;
	timeline: Array<{
		date: string;
		event: string;
		type: 'positive' | 'negative' | 'neutral';
	}>;
	winbackAttempts: number;
	lastContact: string;
}

const RiskBadge = ({ level }: { level: ChurnProfile['riskLevel'] }) => {
	const config: Record<
		string,
		{ label: string; className: string; icon: React.ElementType }
	> = {
		low: {
			label: 'Low Risk',
			className: 'bg-emerald-500/10 text-emerald-500',
			icon: TrendingUp,
		},
		medium: {
			label: 'Medium Risk',
			className: 'bg-amber-500/10 text-amber-500',
			icon: AlertTriangle,
		},
		high: {
			label: 'High Risk',
			className: 'bg-orange-500/10 text-orange-500',
			icon: TrendingDown,
		},
		critical: {
			label: 'Critical',
			className: 'bg-red-500/10 text-red-500',
			icon: XCircle,
		},
	};
	const { label, className, icon: Icon } = config[level];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const ChurnMeter = ({ probability }: { probability: number }) => {
	const getColor = (p: number) => {
		if (p >= 75) return 'text-red-500';
		if (p >= 50) return 'text-orange-500';
		if (p >= 25) return 'text-amber-500';
		return 'text-emerald-500';
	};
	return (
		<div className="text-center">
			<div className="relative inline-flex items-center justify-center">
				<svg className="size-28">
					<circle
						cx="56"
						cy="56"
						r="48"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						className="text-muted"
					/>
					<circle
						cx="56"
						cy="56"
						r="48"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						strokeDasharray={`${probability * 3.02} 302`}
						strokeLinecap="round"
						className={`${getColor(probability)} -rotate-90 origin-center`}
					/>
				</svg>
				<div className="absolute">
					<p className={`text-2xl font-bold ${getColor(probability)}`}>
						{probability}%
					</p>
					<p className="text-xs text-muted-foreground">Churn Risk</p>
				</div>
			</div>
		</div>
	);
};

const MetricChange = ({ value, label }: { value: number; label: string }) => {
	const isNegative = value < 0;
	return (
		<div className="text-center">
			<div
				className={`flex items-center justify-center gap-1 ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}
			>
				{isNegative ? (
					<ArrowDownRight className="size-4" />
				) : (
					<ArrowUpRight className="size-4" />
				)}
				<span className="text-xl font-bold">{Math.abs(value)}%</span>
			</div>
			<p className="text-xs text-muted-foreground mt-1">{label}</p>
		</div>
	);
};

const ReasonBar = ({ reason }: { reason: ChurnProfile['churnReasons'][0] }) => (
	<div>
		<div className="flex items-center justify-between mb-1 text-sm">
			<span>{reason.reason}</span>
			<span className="text-red-500 font-medium">{reason.impact}%</span>
		</div>
		<Progress value={reason.impact} className="h-1.5 [&>div]:bg-red-500" />
	</div>
);

const RecommendationCard = ({
	recommendation,
}: {
	recommendation: ChurnProfile['recommendations'][0];
}) => {
	const priorityConfig: Record<string, string> = {
		low: 'bg-blue-500/10 text-blue-500',
		medium: 'bg-amber-500/10 text-amber-500',
		high: 'bg-red-500/10 text-red-500',
	};
	return (
		<div className="flex items-start gap-3 rounded-lg border p-3">
			<div className="flex-1 min-w-0">
				<p className="font-medium text-sm">{recommendation.action}</p>
				<p className="text-xs text-muted-foreground">
					Expected impact: {recommendation.impact}
				</p>
			</div>
			<Badge
				variant="outline"
				className={`${priorityConfig[recommendation.priority]} text-xs capitalize`}
			>
				{recommendation.priority}
			</Badge>
		</div>
	);
};

const ProfileHeader = ({ profile }: { profile: ChurnProfile }) => (
	<div className="flex flex-col @md:flex-row gap-4 items-start">
		<Avatar className="size-16">
			<AvatarImage src={profile.avatar} alt={profile.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-xl">
				{profile.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-3 mb-1">
				<h1 className="text-2xl font-bold">{profile.name}</h1>
				<RiskBadge level={profile.riskLevel} />
			</div>
			<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<Mail className="size-3.5" />
					{profile.email}
				</span>
				<span className="flex items-center gap-1">
					<Phone className="size-3.5" />
					{profile.phone}
				</span>
			</div>
			<div className="flex items-center gap-4 mt-2 text-sm">
				<span className="text-muted-foreground">
					Last order:{' '}
					<span className="text-foreground font-medium">
						{profile.metrics.daysSinceLastOrder} days ago
					</span>
				</span>
				<span className="text-muted-foreground">
					Winback attempts:{' '}
					<span className="text-foreground font-medium">
						{profile.winbackAttempts}
					</span>
				</span>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="default" size="sm" className="gap-1.5">
				<RefreshCw className="size-3.5" />
				Start Winback
			</Button>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Mail className="size-3.5" />
				Contact
			</Button>
		</div>
	</div>
);

export default function Main() {
	const profile: ChurnProfile = {
		id: '1',
		name: 'Daniel Porter',
		email: 'daniel.p@email.com',
		phone: '+1 555-0789',
		initials: 'DP',
		riskLevel: 'high',
		churnProbability: 72,
		churnReasons: [
			{ reason: 'Decreased purchase frequency', impact: 35 },
			{ reason: 'Lower order values', impact: 28 },
			{ reason: 'Reduced site visits', impact: 22 },
			{ reason: 'No email engagement', impact: 15 },
		],
		metrics: {
			daysSinceLastOrder: 45,
			orderFrequencyChange: -58,
			spendingChange: -42,
			engagementChange: -65,
		},
		history: {
			previousTier: 'Gold',
			currentTier: 'Bronze',
			peakSpending: '$450/month',
			currentSpending: '$85/month',
		},
		recommendations: [
			{
				id: '1',
				action: 'Send personalized win-back email with 20% discount',
				priority: 'high',
				impact: '+35% recovery chance',
			},
			{
				id: '2',
				action: 'Schedule a call to understand concerns',
				priority: 'medium',
				impact: '+25% recovery chance',
			},
			{
				id: '3',
				action: 'Offer free shipping on next order',
				priority: 'medium',
				impact: '+20% recovery chance',
			},
		],
		timeline: [
			{ date: 'Today', event: 'Marked as high risk', type: 'negative' },
			{
				date: '1 week ago',
				event: 'Opened but ignored win-back email',
				type: 'neutral',
			},
			{ date: '3 weeks ago', event: 'Last site visit', type: 'neutral' },
			{ date: '45 days ago', event: 'Last purchase', type: 'positive' },
		],
		winbackAttempts: 2,
		lastContact: '1 week ago',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card>
						<CardContent className="p-6 flex justify-center">
							<ChurnMeter probability={profile.churnProbability} />
						</CardContent>
					</Card>
					<Card className="@lg:col-span-2">
						<CardContent className="p-6">
							<div className="grid grid-cols-3 gap-6">
								<MetricChange
									value={profile.metrics.orderFrequencyChange}
									label="Order Frequency"
								/>
								<MetricChange
									value={profile.metrics.spendingChange}
									label="Spending"
								/>
								<MetricChange
									value={profile.metrics.engagementChange}
									label="Engagement"
								/>
							</div>
							<div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
								<div>
									<span className="text-muted-foreground">Tier change: </span>
									<span className="text-amber-500">
										{profile.history.previousTier}
									</span>
									<span className="text-muted-foreground"> → </span>
									<span>{profile.history.currentTier}</span>
								</div>
								<div>
									<span className="text-muted-foreground">Spending: </span>
									<span className="text-amber-500">
										{profile.history.peakSpending}
									</span>
									<span className="text-muted-foreground"> → </span>
									<span>{profile.history.currentSpending}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<AlertTriangle className="size-4 text-amber-500" />
								Churn Reasons
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{profile.churnReasons.map((reason, index) => (
								<ReasonBar key={index} reason={reason} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<RefreshCw className="size-4" />
								Recommended Actions
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{profile.recommendations.map((rec) => (
								<RecommendationCard key={rec.id} recommendation={rec} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
