import {
	Calendar,
	ChevronRight,
	Crown,
	Gift,
	MoreHorizontal,
	Star,
	Trophy,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LoyaltyMember {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	points: number;
	pointsToNextTier: number;
	nextTierProgress: number;
	memberSince: string;
	totalRewards: number;
	pendingRewards: number;
	lifetimeValue: string;
}

const TierConfig = {
	bronze: {
		label: 'Bronze',
		icon: Star,
		color: 'text-amber-700',
		bg: 'bg-amber-700/10',
	},
	silver: {
		label: 'Silver',
		icon: Trophy,
		color: 'text-slate-400',
		bg: 'bg-slate-400/10',
	},
	gold: {
		label: 'Gold',
		icon: Crown,
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
	},
	platinum: {
		label: 'Platinum',
		icon: Crown,
		color: 'text-violet-400',
		bg: 'bg-violet-400/10',
	},
};

const TierBadge = ({ tier }: { tier: LoyaltyMember['tier'] }) => {
	const config = TierConfig[tier];
	const Icon = config.icon;
	return (
		<Badge
			variant="outline"
			className={`${config.color} border-current/30 gap-1`}
		>
			<Icon className="size-3 fill-current" />
			{config.label}
		</Badge>
	);
};

const ProgressToNextTier = ({
	current,
	needed,
	progress,
	nextTier,
}: {
	current: number;
	needed: number;
	progress: number;
	nextTier?: string;
}) => (
	<div className="flex-1 space-y-1">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">Next tier progress</span>
			<span className="font-medium">
				{current.toLocaleString()} / {(current + needed).toLocaleString()}
			</span>
		</div>
		<Progress value={progress} className="h-1.5" />
		{nextTier && (
			<p className="text-muted-foreground text-xs">
				{needed.toLocaleString()} pts to {nextTier}
			</p>
		)}
	</div>
);

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-amber-500/10 text-amber-500 rounded-lg p-2.5">
			<Trophy className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const LoyaltyListItem = ({ member }: { member: LoyaltyMember }) => {
	const tierConfig = TierConfig[member.tier];
	const nextTierMap: Record<string, string> = {
		bronze: 'Silver',
		silver: 'Gold',
		gold: 'Platinum',
	};
	return (
		<div className="group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
			<div
				className={`absolute inset-y-0 left-0 w-1 rounded-l-lg ${tierConfig.bg.replace('/10', '')}`}
			/>
			<Avatar
				className="size-12 border-2"
				style={{
					borderColor: `hsl(var(--${member.tier === 'platinum' ? 'violet' : member.tier === 'gold' ? 'amber' : 'slate'}-500) / 0.3)`,
				}}
			>
				<AvatarImage src={member.avatar} alt={member.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{member.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{member.name}</p>
					<TierBadge tier={member.tier} />
				</div>
				<p className="text-muted-foreground mt-0.5 text-sm truncate">
					{member.email}
				</p>
			</div>
			<div className="hidden @lg:block min-w-[200px]">
				<ProgressToNextTier
					current={member.points}
					needed={member.pointsToNextTier}
					progress={member.nextTierProgress}
					nextTier={nextTierMap[member.tier]}
				/>
			</div>
			<div className="hidden items-center gap-6 text-sm @xl:flex">
				<div className="text-center">
					<div className="flex items-center gap-1 justify-center">
						<Star className="text-amber-500 size-4 fill-amber-500" />
						<span className="font-bold">{member.points.toLocaleString()}</span>
					</div>
					<p className="text-muted-foreground text-xs">Points</p>
				</div>
				<div className="text-center">
					<div className="flex items-center gap-1 justify-center">
						<Gift className="text-emerald-500 size-4" />
						<span className="font-semibold">{member.pendingRewards}</span>
					</div>
					<p className="text-muted-foreground text-xs">Available</p>
				</div>
				<div className="text-center">
					<p className="font-semibold">{member.lifetimeValue}</p>
					<p className="text-muted-foreground text-xs">LTV</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="hidden gap-1.5 @md:flex">
					<Gift className="size-4" />
					Rewards
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View profile</DropdownMenuItem>
						<DropdownMenuItem>View rewards history</DropdownMenuItem>
						<DropdownMenuItem>Add bonus points</DropdownMenuItem>
						<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default function Main() {
	const members: LoyaltyMember[] = [
		{
			id: '1',
			name: 'Victoria Sterling',
			email: 'victoria.s@email.com',
			initials: 'VS',
			tier: 'platinum',
			points: 125000,
			pointsToNextTier: 0,
			nextTierProgress: 100,
			memberSince: 'Jan 2021',
			totalRewards: 48,
			pendingRewards: 5,
			lifetimeValue: '$45,200',
		},
		{
			id: '2',
			name: 'Alexander Hayes',
			email: 'alex.h@email.com',
			initials: 'AH',
			tier: 'gold',
			points: 78000,
			pointsToNextTier: 22000,
			nextTierProgress: 78,
			memberSince: 'Mar 2021',
			totalRewards: 32,
			pendingRewards: 3,
			lifetimeValue: '$28,500',
		},
		{
			id: '3',
			name: 'Charlotte Moore',
			email: 'charlotte.m@email.com',
			initials: 'CM',
			tier: 'gold',
			points: 56000,
			pointsToNextTier: 44000,
			nextTierProgress: 56,
			memberSince: 'Jun 2022',
			totalRewards: 24,
			pendingRewards: 2,
			lifetimeValue: '$18,900',
		},
		{
			id: '4',
			name: 'William Foster',
			email: 'william.f@email.com',
			initials: 'WF',
			tier: 'silver',
			points: 34500,
			pointsToNextTier: 15500,
			nextTierProgress: 69,
			memberSince: 'Sep 2022',
			totalRewards: 15,
			pendingRewards: 1,
			lifetimeValue: '$12,400',
		},
		{
			id: '5',
			name: 'Isabella Clarke',
			email: 'isabella.c@email.com',
			initials: 'IC',
			tier: 'silver',
			points: 28000,
			pointsToNextTier: 22000,
			nextTierProgress: 56,
			memberSince: 'Nov 2022',
			totalRewards: 12,
			pendingRewards: 0,
			lifetimeValue: '$9,800',
		},
		{
			id: '6',
			name: 'James Richardson',
			email: 'james.r@email.com',
			initials: 'JR',
			tier: 'bronze',
			points: 8500,
			pointsToNextTier: 11500,
			nextTierProgress: 42,
			memberSince: 'Feb 2023',
			totalRewards: 4,
			pendingRewards: 1,
			lifetimeValue: '$3,200',
		},
		{
			id: '7',
			name: 'Emma Richardson',
			email: 'emma.r@email.com',
			initials: 'ER',
			tier: 'bronze',
			points: 5200,
			pointsToNextTier: 14800,
			nextTierProgress: 26,
			memberSince: 'May 2023',
			totalRewards: 2,
			pendingRewards: 0,
			lifetimeValue: '$1,850',
		},
		{
			id: '8',
			name: 'Lucas Thompson',
			email: 'lucas.t@email.com',
			initials: 'LT',
			tier: 'platinum',
			points: 156000,
			pointsToNextTier: 0,
			nextTierProgress: 100,
			memberSince: 'Dec 2020',
			totalRewards: 62,
			pendingRewards: 8,
			lifetimeValue: '$58,900',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Loyalty Members"
					subtitle="Track member tiers and rewards progress"
				/>
				<div className="space-y-3">
					{members.map((member) => (
						<LoyaltyListItem key={member.id} member={member} />
					))}
				</div>
			</div>
		</section>
	);
}
