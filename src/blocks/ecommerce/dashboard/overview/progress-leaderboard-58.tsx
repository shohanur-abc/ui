'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	Award,
	CheckCircle2,
	Medal,
	Star,
	Target,
	Trophy,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type TeamMember = {
	name: string;
	role: string;
	initials: string;
	progress: number;
	target: string;
	completed: string;
	rank: number;
};

type AchievementItem = {
	title: string;
	description: string;
	icon: LucideIcon;
	color: string;
	unlocked: boolean;
};

const TeamMemberRow = ({
	name,
	role,
	initials,
	progress,
	target,
	completed,
	rank,
}: TeamMember) => (
	<div className="flex items-center gap-4">
		<span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
			{rank}
		</span>
		<Avatar className="size-10">
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-xs text-muted-foreground">{role}</p>
				</div>
				<div className="text-right">
					<p className="text-sm font-medium">{completed}</p>
					<p className="text-xs text-muted-foreground">of {target}</p>
				</div>
			</div>
			<Progress value={progress} className="mt-2 h-2" />
		</div>
	</div>
);

const AchievementCard = ({
	title,
	description,
	icon: Icon,
	color,
	unlocked,
}: AchievementItem) => (
	<div
		className={`flex items-center gap-3 rounded-xl border p-3 ${unlocked ? 'bg-card' : 'bg-muted/50 opacity-60'}`}
	>
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		{unlocked && <CheckCircle2 className="size-4 text-emerald-500" />}
	</div>
);

const chartConfig: ChartConfig = {
	progress: { label: 'Progress', color: 'var(--chart-1)' },
};

export default function Main() {
	const teamMembers: TeamMember[] = [
		{
			name: 'Sarah Wilson',
			role: 'Sales Lead',
			initials: 'SW',
			progress: 95,
			target: '$50K',
			completed: '$47.5K',
			rank: 1,
		},
		{
			name: 'Michael Chen',
			role: 'Account Executive',
			initials: 'MC',
			progress: 88,
			target: '$40K',
			completed: '$35.2K',
			rank: 2,
		},
		{
			name: 'Emma Johnson',
			role: 'Account Executive',
			initials: 'EJ',
			progress: 82,
			target: '$40K',
			completed: '$32.8K',
			rank: 3,
		},
		{
			name: 'James Brown',
			role: 'Sales Rep',
			initials: 'JB',
			progress: 75,
			target: '$30K',
			completed: '$22.5K',
			rank: 4,
		},
		{
			name: 'Lisa Davis',
			role: 'Sales Rep',
			initials: 'LD',
			progress: 68,
			target: '$30K',
			completed: '$20.4K',
			rank: 5,
		},
	];

	const achievements: AchievementItem[] = [
		{
			title: 'First Sale',
			description: 'Close your first deal',
			icon: Star,
			color: 'bg-amber-500/10 text-amber-500',
			unlocked: true,
		},
		{
			title: 'Top Performer',
			description: 'Reach 100% of target',
			icon: Trophy,
			color: 'bg-primary/10 text-primary',
			unlocked: true,
		},
		{
			title: 'Team Player',
			description: 'Help 5 colleagues',
			icon: Users,
			color: 'bg-emerald-500/10 text-emerald-500',
			unlocked: true,
		},
		{
			title: 'Overachiever',
			description: 'Exceed target by 20%',
			icon: Medal,
			color: 'bg-purple-500/10 text-purple-500',
			unlocked: false,
		},
	];

	const chartData = teamMembers.map((member) => ({
		name: member.initials,
		progress: member.progress,
	}));

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-3">
					<Card className="@xl:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Trophy className="size-5 text-amber-500" />
								Team Leaderboard
							</CardTitle>
							<CardDescription>Monthly sales target progress</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{teamMembers.map((member, i) => (
								<TeamMemberRow key={i} {...member} />
							))}
						</CardContent>
					</Card>
					<div className="space-y-6">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Progress Chart</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={chartConfig}
									className="h-[160px] w-full"
								>
									<BarChart data={chartData} layout="vertical">
										<XAxis
											type="number"
											domain={[0, 100]}
											tickLine={false}
											axisLine={false}
										/>
										<YAxis
											dataKey="name"
											type="category"
											tickLine={false}
											axisLine={false}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<Bar
											dataKey="progress"
											fill="var(--color-progress)"
											radius={[0, 4, 4, 0]}
										/>
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm flex items-center gap-2">
									<Award className="size-4 text-primary" />
									Achievements
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{achievements.map((achievement, i) => (
									<AchievementCard key={i} {...achievement} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
