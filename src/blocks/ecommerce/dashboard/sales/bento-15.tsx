'use client';

import {
	Trophy,
	Medal,
	Star,
	Crown,
	TrendingUp,
	Target,
	Award,
	Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type TopPerformer = {
	name: string;
	avatar: string;
	role: string;
	sales: number;
	target: number;
	deals: number;
	rank: number;
};

type Achievement = {
	title: string;
	description: string;
	icon: React.ReactNode;
	progress: number;
	unlocked: boolean;
};

type TeamStat = {
	label: string;
	value: string;
	target: string;
	progress: number;
};

type BentoLayout15Props = {
	performers: TopPerformer[];
	achievements: Achievement[];
	teamStats: TeamStat[];
};

const getRankIcon = (rank: number) => {
	switch (rank) {
		case 1:
			return <Crown className="size-5 text-amber-500" />;
		case 2:
			return <Medal className="size-5 text-gray-400" />;
		case 3:
			return <Medal className="size-5 text-amber-700" />;
		default:
			return (
				<span className="text-sm font-bold text-muted-foreground">#{rank}</span>
			);
	}
};

const LeaderboardCard = ({ performers }: { performers: TopPerformer[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Trophy className="size-4 text-amber-500" />
				<CardTitle className="text-sm font-medium">Sales Leaderboard</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{performers.map((performer, idx) => (
				<div
					key={idx}
					className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
						performer.rank === 1
							? 'bg-amber-500/10 border border-amber-500/20'
							: 'hover:bg-muted/50'
					}`}
				>
					<div className="w-8 flex justify-center">
						{getRankIcon(performer.rank)}
					</div>
					<Avatar className="size-10">
						<AvatarImage src={performer.avatar} alt={performer.name} />
						<AvatarFallback>
							{performer.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<p className="font-medium">{performer.name}</p>
						<p className="text-xs text-muted-foreground">{performer.role}</p>
					</div>
					<div className="text-right">
						<p className="font-bold">${performer.sales.toLocaleString()}</p>
						<div className="flex items-center gap-1 text-xs">
							<Progress
								value={(performer.sales / performer.target) * 100}
								className="h-1 w-16"
							/>
							<span className="text-muted-foreground">
								{performer.deals} deals
							</span>
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const AchievementsCard = ({
	achievements,
}: {
	achievements: Achievement[];
}) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Award className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Achievements</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{achievements.map((achievement, idx) => (
				<div
					key={idx}
					className={`flex items-center gap-3 p-2 rounded-lg ${
						achievement.unlocked ? 'bg-primary/10' : 'bg-muted/30 opacity-60'
					}`}
				>
					<div
						className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted'}`}
					>
						{achievement.icon}
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">{achievement.title}</p>
						<p className="text-xs text-muted-foreground">
							{achievement.description}
						</p>
						{!achievement.unlocked && (
							<Progress value={achievement.progress} className="h-1 mt-2" />
						)}
					</div>
					{achievement.unlocked && (
						<Star className="size-4 fill-amber-500 text-amber-500" />
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const TeamStatsCard = ({ stats }: { stats: TeamStat[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Target className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Team Goals</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{stats.map((stat, idx) => (
				<div key={idx} className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>{stat.label}</span>
						<span className="font-medium">
							{stat.value} / {stat.target}
						</span>
					</div>
					<Progress value={stat.progress} className="h-2" />
				</div>
			))}
		</CardContent>
	</Card>
);

const BentoLayout15 = ({
	performers,
	achievements,
	teamStats,
}: BentoLayout15Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		<LeaderboardCard performers={performers} />
		<AchievementsCard achievements={achievements} />
		<TeamStatsCard stats={teamStats} />
	</div>
);

export default function Main() {
	const performers: TopPerformer[] = [
		{
			name: 'Sarah Johnson',
			avatar: '/placeholder.svg',
			role: 'Senior Sales Rep',
			sales: 285000,
			target: 250000,
			deals: 42,
			rank: 1,
		},
		{
			name: 'Michael Chen',
			avatar: '/placeholder.svg',
			role: 'Sales Rep',
			sales: 248000,
			target: 250000,
			deals: 38,
			rank: 2,
		},
		{
			name: 'Emily Davis',
			avatar: '/placeholder.svg',
			role: 'Sales Rep',
			sales: 195000,
			target: 200000,
			deals: 31,
			rank: 3,
		},
		{
			name: 'James Wilson',
			avatar: '/placeholder.svg',
			role: 'Junior Sales Rep',
			sales: 168000,
			target: 200000,
			deals: 28,
			rank: 4,
		},
	];

	const achievements: Achievement[] = [
		{
			title: 'First $100K',
			description: 'Reach $100K in monthly sales',
			icon: <Zap className="size-4" />,
			progress: 100,
			unlocked: true,
		},
		{
			title: 'Deal Closer',
			description: 'Close 50 deals in a month',
			icon: <Target className="size-4" />,
			progress: 100,
			unlocked: true,
		},
		{
			title: 'Top Performer',
			description: 'Rank #1 for 3 months',
			icon: <Trophy className="size-4" />,
			progress: 66,
			unlocked: false,
		},
	];

	const teamStats: TeamStat[] = [
		{ label: 'Revenue Target', value: '$896K', target: '$1M', progress: 89.6 },
		{ label: 'Deals Closed', value: '139', target: '150', progress: 92.7 },
		{ label: 'New Customers', value: '324', target: '400', progress: 81 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout15
					performers={performers}
					achievements={achievements}
					teamStats={teamStats}
				/>
			</div>
		</section>
	);
}
