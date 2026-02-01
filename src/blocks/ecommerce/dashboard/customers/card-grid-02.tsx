import {
	ArrowRight,
	Award,
	Calendar,
	Gift,
	MoreHorizontal,
	Star,
	TrendingUp,
	Trophy,
	Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LoyaltyCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
	points: number;
	pointsToNextTier: number;
	progress: number;
	rewardsAvailable: number;
	memberSince: string;
	lastActivity: string;
	totalRedeemed: number;
}

const TierConfig = {
	bronze: {
		color: 'text-amber-700',
		bg: 'bg-amber-700/10',
		border: 'border-amber-700/20',
		icon: Award,
	},
	silver: {
		color: 'text-slate-400',
		bg: 'bg-slate-400/10',
		border: 'border-slate-400/20',
		icon: Award,
	},
	gold: {
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/20',
		icon: Trophy,
	},
	platinum: {
		color: 'text-violet-500',
		bg: 'bg-violet-500/10',
		border: 'border-violet-500/20',
		icon: Trophy,
	},
	diamond: {
		color: 'text-cyan-400',
		bg: 'bg-cyan-400/10',
		border: 'border-cyan-400/20',
		icon: Zap,
	},
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-primary/10 text-primary rounded-lg p-2.5">
				<Trophy className="size-5" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			View All
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

const TierBadge = ({ tier }: { tier: LoyaltyCustomer['tier'] }) => {
	const config = TierConfig[tier];
	const Icon = config.icon;
	return (
		<Badge
			variant="outline"
			className={`${config.color} ${config.border} gap-1 capitalize`}
		>
			<Icon className="size-3" />
			{tier}
		</Badge>
	);
};

const PointsDisplay = ({
	points,
	pointsToNext,
	progress,
	tier,
}: {
	points: number;
	pointsToNext: number;
	progress: number;
	tier: LoyaltyCustomer['tier'];
}) => {
	const config = TierConfig[tier];
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className={`font-bold ${config.color}`}>
					{points.toLocaleString()} pts
				</span>
				<span className="text-muted-foreground">
					{pointsToNext.toLocaleString()} to next
				</span>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	);
};

const StatItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string | number;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="text-muted-foreground size-4" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
);

const LoyaltyCard = ({ customer }: { customer: LoyaltyCustomer }) => {
	const config = TierConfig[customer.tier];
	return (
		<Card
			className={`group relative overflow-hidden transition-shadow hover:shadow-lg`}
		>
			<div
				className={`absolute inset-x-0 top-0 h-1 ${config.bg.replace('/10', '')}`}
			/>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="relative">
							<Avatar className="size-12">
								<AvatarImage src={customer.avatar} alt={customer.name} />
								<AvatarFallback className="bg-primary/10 text-primary">
									{customer.initials}
								</AvatarFallback>
							</Avatar>
							<div
								className={`absolute -right-1 -bottom-1 rounded-full p-1 ${config.bg}`}
							>
								{(() => {
									const Icon = config.icon;
									return <Icon className={`size-3 ${config.color}`} />;
								})()}
							</div>
						</div>
						<div>
							<p className="font-semibold">{customer.name}</p>
							<p className="text-muted-foreground text-xs">{customer.email}</p>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-sm"
								className="opacity-0 group-hover:opacity-100"
							>
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View profile</DropdownMenuItem>
							<DropdownMenuItem>Add points</DropdownMenuItem>
							<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<TierBadge tier={customer.tier} />
					{customer.rewardsAvailable > 0 && (
						<Badge className="gap-1 bg-emerald-500/10 text-emerald-500">
							<Gift className="size-3" />
							{customer.rewardsAvailable} rewards
						</Badge>
					)}
				</div>
				<PointsDisplay
					points={customer.points}
					pointsToNext={customer.pointsToNextTier}
					progress={customer.progress}
					tier={customer.tier}
				/>
				<div className="space-y-1.5 border-t pt-3">
					<StatItem
						icon={Calendar}
						label="Member since"
						value={customer.memberSince}
					/>
					<StatItem
						icon={Gift}
						label="Redeemed"
						value={customer.totalRedeemed}
					/>
					<StatItem
						icon={TrendingUp}
						label="Last activity"
						value={customer.lastActivity}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const customers: LoyaltyCustomer[] = [
		{
			id: '1',
			name: 'Sophie Anderson',
			email: 'sophie.a@email.com',
			initials: 'SA',
			tier: 'diamond',
			points: 45200,
			pointsToNextTier: 0,
			progress: 100,
			rewardsAvailable: 5,
			memberSince: 'Jan 2021',
			lastActivity: '2 hours ago',
			totalRedeemed: 24,
		},
		{
			id: '2',
			name: 'Michael Chen',
			email: 'michael.c@email.com',
			initials: 'MC',
			tier: 'platinum',
			points: 28500,
			pointsToNextTier: 6500,
			progress: 82,
			rewardsAvailable: 3,
			memberSince: 'Mar 2022',
			lastActivity: '1 day ago',
			totalRedeemed: 12,
		},
		{
			id: '3',
			name: 'Emily Watson',
			email: 'emily.w@email.com',
			initials: 'EW',
			tier: 'gold',
			points: 15800,
			pointsToNextTier: 4200,
			progress: 79,
			rewardsAvailable: 2,
			memberSince: 'Jun 2022',
			lastActivity: '3 days ago',
			totalRedeemed: 8,
		},
		{
			id: '4',
			name: 'James Wilson',
			email: 'james.w@email.com',
			initials: 'JW',
			tier: 'silver',
			points: 7200,
			pointsToNextTier: 2800,
			progress: 72,
			rewardsAvailable: 1,
			memberSince: 'Sep 2023',
			lastActivity: '1 week ago',
			totalRedeemed: 3,
		},
		{
			id: '5',
			name: 'Olivia Brown',
			email: 'olivia.b@email.com',
			initials: 'OB',
			tier: 'bronze',
			points: 2400,
			pointsToNextTier: 2600,
			progress: 48,
			rewardsAvailable: 0,
			memberSince: 'Dec 2023',
			lastActivity: '2 weeks ago',
			totalRedeemed: 1,
		},
		{
			id: '6',
			name: 'Daniel Kim',
			email: 'daniel.k@email.com',
			initials: 'DK',
			tier: 'gold',
			points: 18200,
			pointsToNextTier: 1800,
			progress: 91,
			rewardsAvailable: 4,
			memberSince: 'Apr 2022',
			lastActivity: '5 hours ago',
			totalRedeemed: 15,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Loyalty Members"
					subtitle="Track customer loyalty tiers and rewards"
				/>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<LoyaltyCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
