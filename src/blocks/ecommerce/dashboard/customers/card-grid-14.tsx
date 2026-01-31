import {
	Award,
	Calendar,
	ChevronRight,
	Crown,
	Diamond,
	ExternalLink,
	Gift,
	Medal,
	MoreHorizontal,
	Sparkles,
	Star,
	Target,
	Trophy,
	Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GamifiedCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	level: number;
	xp: {
		current: number;
		nextLevel: number;
		percentage: number;
	};
	rank: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
	points: number;
	badges: Array<{
		name: string;
		icon: 'star' | 'trophy' | 'medal' | 'crown' | 'diamond' | 'zap';
		earned: string;
	}>;
	streaks: {
		current: number;
		longest: number;
		type: string;
	};
	achievements: {
		total: number;
		unlocked: number;
	};
	challenges: Array<{
		name: string;
		progress: number;
		reward: string;
	}>;
}

const RankConfig = {
	bronze: { label: 'Bronze', icon: Medal, color: 'text-amber-700', bg: 'bg-amber-700/10' },
	silver: { label: 'Silver', icon: Award, color: 'text-slate-400', bg: 'bg-slate-400/10' },
	gold: { label: 'Gold', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
	platinum: { label: 'Platinum', icon: Crown, color: 'text-violet-400', bg: 'bg-violet-400/10' },
	diamond: { label: 'Diamond', icon: Diamond, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
};

const BadgeIconMap = {
	star: Star,
	trophy: Trophy,
	medal: Medal,
	crown: Crown,
	diamond: Diamond,
	zap: Zap,
};

const RankBadge = ({ rank }: { rank: GamifiedCustomer['rank'] }) => {
	const config = RankConfig[rank];
	const Icon = config.icon;
	return (
		<Badge variant="outline" className={`${config.color} border-current/30 gap-1`}>
			<Icon className="size-3 fill-current" />
			{config.label}
		</Badge>
	);
};

const LevelDisplay = ({ level }: { level: number }) => (
	<div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1">
		<Sparkles className="text-primary size-3.5" />
		<span className="text-sm font-bold">Lv. {level}</span>
	</div>
);

const XPBar = ({
	current,
	nextLevel,
	percentage,
}: {
	current: number;
	nextLevel: number;
	percentage: number;
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">XP Progress</span>
			<span className="font-medium">{current.toLocaleString()} / {nextLevel.toLocaleString()}</span>
		</div>
		<Progress value={percentage} className="h-2" />
	</div>
);

const BadgeDisplay = ({ badges }: { badges: GamifiedCustomer['badges'] }) => (
	<div className="flex flex-wrap gap-1.5">
		{badges.slice(0, 5).map((badge) => {
			const Icon = BadgeIconMap[badge.icon];
			return (
				<div
					key={badge.name}
					className="group/badge relative flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/5 p-2"
					title={badge.name}
				>
					<Icon className="size-4 text-amber-500" />
				</div>
			);
		})}
		{badges.length > 5 && (
			<div className="flex items-center justify-center rounded-full bg-muted px-2 text-xs font-medium">
				+{badges.length - 5}
			</div>
		)}
	</div>
);

const StreakDisplay = ({
	current,
	longest,
	type,
}: {
	current: number;
	longest: number;
	type: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-2">
		<div className="flex items-center gap-1 text-orange-500">
			<Zap className="size-4 fill-current" />
			<span className="text-lg font-bold">{current}</span>
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{type}</p>
			<p className="text-muted-foreground text-xs">Best: {longest} days</p>
		</div>
	</div>
);

const ChallengeItem = ({
	challenge,
}: {
	challenge: GamifiedCustomer['challenges'][0];
}) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-xs">
			<span className="font-medium truncate max-w-[60%]">{challenge.name}</span>
			<Badge variant="secondary" className="text-xs">
				{challenge.reward}
			</Badge>
		</div>
		<Progress value={challenge.progress} className="h-1.5" />
	</div>
);

const GamifiedCard = ({ customer }: { customer: GamifiedCustomer }) => {
	const rankConfig = RankConfig[customer.rank];
	return (
		<Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
			<div className={`absolute inset-x-0 top-0 h-1 ${rankConfig.bg.replace('/10', '')}`} />
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="relative">
							<Avatar className="size-12 border-2 border-primary/30">
								<AvatarImage src={customer.avatar} alt={customer.name} />
								<AvatarFallback className="bg-primary/10 text-primary">
									{customer.initials}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
								<LevelDisplay level={customer.level} />
							</div>
						</div>
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
								<ExternalLink className="mr-2 size-4" />
								View profile
							</DropdownMenuItem>
							<DropdownMenuItem>View achievements</DropdownMenuItem>
							<DropdownMenuItem>Award bonus XP</DropdownMenuItem>
							<DropdownMenuItem>Unlock badge</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<RankBadge rank={customer.rank} />
					<div className="flex items-center gap-1 text-sm">
						<Star className="text-amber-500 size-4 fill-amber-500" />
						<span className="font-bold">{customer.points.toLocaleString()}</span>
						<span className="text-muted-foreground">pts</span>
					</div>
				</div>
				<XPBar
					current={customer.xp.current}
					nextLevel={customer.xp.nextLevel}
					percentage={customer.xp.percentage}
				/>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<p className="text-muted-foreground text-xs font-medium">Badges</p>
						<span className="text-xs text-muted-foreground">
							{customer.badges.length} earned
						</span>
					</div>
					<BadgeDisplay badges={customer.badges} />
				</div>
				<StreakDisplay
					current={customer.streaks.current}
					longest={customer.streaks.longest}
					type={customer.streaks.type}
				/>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<p className="text-muted-foreground text-xs font-medium">Active Challenges</p>
						<Badge variant="outline" className="text-xs">
							<Target className="mr-1 size-3" />
							{customer.achievements.unlocked}/{customer.achievements.total}
						</Badge>
					</div>
					{customer.challenges.slice(0, 2).map((challenge, index) => (
						<ChallengeItem key={index} challenge={challenge} />
					))}
				</div>
			</CardContent>
			<CardFooter className="border-t bg-muted/20 px-4 py-3">
				<Button variant="outline" size="sm" className="w-full gap-1.5">
					<Gift className="size-4" />
					View Rewards
					<ChevronRight className="ml-auto size-4" />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const customers: GamifiedCustomer[] = [
		{
			id: '1',
			name: 'Felix Armstrong',
			email: 'felix.a@email.com',
			initials: 'FA',
			level: 42,
			xp: { current: 8500, nextLevel: 10000, percentage: 85 },
			rank: 'diamond',
			points: 125000,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '2 years ago' },
				{ name: 'VIP Member', icon: 'crown', earned: '1 year ago' },
				{ name: 'Top Spender', icon: 'trophy', earned: '6 months ago' },
				{ name: 'Review Master', icon: 'medal', earned: '3 months ago' },
				{ name: 'Loyalty Legend', icon: 'diamond', earned: '1 month ago' },
				{ name: 'Early Bird', icon: 'zap', earned: '2 weeks ago' },
			],
			streaks: { current: 45, longest: 62, type: 'Daily Login' },
			achievements: { total: 50, unlocked: 42 },
			challenges: [
				{ name: 'Spend $500 this month', progress: 72, reward: '500 XP' },
				{ name: 'Refer 3 friends', progress: 33, reward: 'Gold Badge' },
			],
		},
		{
			id: '2',
			name: 'Grace Patterson',
			email: 'grace.p@email.com',
			initials: 'GP',
			level: 28,
			xp: { current: 3200, nextLevel: 5000, percentage: 64 },
			rank: 'platinum',
			points: 68000,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '1 year ago' },
				{ name: 'Social Sharer', icon: 'zap', earned: '8 months ago' },
				{ name: 'Review Writer', icon: 'medal', earned: '4 months ago' },
			],
			streaks: { current: 12, longest: 28, type: 'Weekly Purchase' },
			achievements: { total: 50, unlocked: 28 },
			challenges: [
				{ name: 'Complete your profile', progress: 80, reward: '200 XP' },
				{ name: 'Write 5 reviews', progress: 60, reward: 'Silver Badge' },
			],
		},
		{
			id: '3',
			name: 'Henry Crawford',
			email: 'henry.c@email.com',
			initials: 'HC',
			level: 35,
			xp: { current: 7800, nextLevel: 8000, percentage: 97 },
			rank: 'gold',
			points: 89000,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '18 months ago' },
				{ name: 'Loyal Customer', icon: 'trophy', earned: '1 year ago' },
				{ name: 'Big Spender', icon: 'crown', earned: '6 months ago' },
				{ name: 'Flash Sale Hero', icon: 'zap', earned: '2 months ago' },
			],
			streaks: { current: 8, longest: 45, type: 'Daily Login' },
			achievements: { total: 50, unlocked: 35 },
			challenges: [
				{ name: 'Level up to 36', progress: 97, reward: '1000 XP' },
				{ name: 'Buy from 3 categories', progress: 100, reward: 'Claim!' },
			],
		},
		{
			id: '4',
			name: 'Iris Mitchell',
			email: 'iris.m@email.com',
			initials: 'IM',
			level: 15,
			xp: { current: 1500, nextLevel: 3000, percentage: 50 },
			rank: 'silver',
			points: 22000,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '6 months ago' },
				{ name: 'App User', icon: 'zap', earned: '4 months ago' },
			],
			streaks: { current: 3, longest: 14, type: 'Daily Login' },
			achievements: { total: 50, unlocked: 12 },
			challenges: [
				{ name: 'Make 5 purchases', progress: 40, reward: '300 XP' },
				{ name: 'Invite a friend', progress: 0, reward: 'Bronze Badge' },
			],
		},
		{
			id: '5',
			name: 'Jack Reynolds',
			email: 'jack.r@email.com',
			initials: 'JR',
			level: 8,
			xp: { current: 800, nextLevel: 1500, percentage: 53 },
			rank: 'bronze',
			points: 8500,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '2 months ago' },
			],
			streaks: { current: 5, longest: 5, type: 'Daily Login' },
			achievements: { total: 50, unlocked: 5 },
			challenges: [
				{ name: 'Complete onboarding', progress: 75, reward: '100 XP' },
				{ name: 'Add payment method', progress: 100, reward: 'Claim!' },
			],
		},
		{
			id: '6',
			name: 'Katherine Liu',
			email: 'katherine.l@email.com',
			initials: 'KL',
			level: 22,
			xp: { current: 2100, nextLevel: 4000, percentage: 52 },
			rank: 'gold',
			points: 45000,
			badges: [
				{ name: 'First Purchase', icon: 'star', earned: '10 months ago' },
				{ name: 'Weekend Warrior', icon: 'zap', earned: '5 months ago' },
				{ name: 'Category Explorer', icon: 'medal', earned: '2 months ago' },
			],
			streaks: { current: 21, longest: 35, type: 'Weekly Purchase' },
			achievements: { total: 50, unlocked: 20 },
			challenges: [
				{ name: 'Earn 5000 points', progress: 90, reward: '500 XP' },
				{ name: 'Share on social', progress: 50, reward: 'Social Badge' },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Trophy className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Gamification Profiles</h1>
						<p className="text-muted-foreground text-sm">Customer progress, achievements, and rewards</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<GamifiedCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
