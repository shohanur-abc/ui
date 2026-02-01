'use client';

import {
	UserPlus,
	Mail,
	Users,
	CalendarCheck,
	CheckCircle2,
	ChevronRight,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type FunnelStage = {
	id: string;
	name: string;
	icon: React.ElementType;
	count: number;
	percentage: number;
	conversionFromPrev: number;
	color: string;
};

type StageCardProps = {
	stage: FunnelStage;
	isLast: boolean;
};

const StageCard = ({ stage, isLast }: StageCardProps) => {
	const Icon = stage.icon;

	return (
		<div className="flex items-center gap-2">
			<Card className={`flex-1 border-border/30 ${stage.color}`}>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-background/50 p-2">
							<Icon className="size-5" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium">{stage.name}</p>
							<p className="text-2xl font-bold">
								{stage.count.toLocaleString()}
							</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold">{stage.percentage}%</p>
							{stage.conversionFromPrev < 100 && (
								<p className="text-xs text-muted-foreground">
									{stage.conversionFromPrev}% from prev
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
			{!isLast && (
				<ChevronRight className="size-5 shrink-0 text-muted-foreground" />
			)}
		</div>
	);
};

export default function Main() {
	const stages: FunnelStage[] = [
		{
			id: '1',
			name: 'Signups',
			icon: UserPlus,
			count: 8500,
			percentage: 100,
			conversionFromPrev: 100,
			color: 'bg-blue-500/10 text-blue-600',
		},
		{
			id: '2',
			name: 'Email Verified',
			icon: Mail,
			count: 7225,
			percentage: 85,
			conversionFromPrev: 85,
			color: 'bg-indigo-500/10 text-indigo-600',
		},
		{
			id: '3',
			name: 'Profile Completed',
			icon: Users,
			count: 5058,
			percentage: 59.5,
			conversionFromPrev: 70,
			color: 'bg-violet-500/10 text-violet-600',
		},
		{
			id: '4',
			name: 'First Purchase',
			icon: CalendarCheck,
			count: 2529,
			percentage: 29.8,
			conversionFromPrev: 50,
			color: 'bg-purple-500/10 text-purple-600',
		},
		{
			id: '5',
			name: 'Active Customer',
			icon: CheckCircle2,
			count: 1770,
			percentage: 20.8,
			conversionFromPrev: 70,
			color: 'bg-primary/10 text-primary',
		},
	];

	const summaryStats = [
		{ label: 'Signup-to-Active Rate', value: '20.8%' },
		{ label: 'Avg Time to Activate', value: '12.5 days' },
		{ label: 'Drop-off Rate', value: '79.2%' },
		{ label: 'Active Customer LTV', value: '$485' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<UserPlus className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									User Onboarding Funnel
								</CardTitle>
								<CardDescription>
									New user journey from signup to active customer
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">This Month</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaryStats.map((s, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{s.label}</p>
										<p className="mt-1 text-2xl font-bold">{s.value}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="space-y-3">
							{stages.map((s, i) => (
								<StageCard
									key={s.id}
									stage={s}
									isLast={i === stages.length - 1}
								/>
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-3 text-sm font-medium">
									Overall Conversion Progress
								</p>
								<div className="flex items-center gap-4">
									<Progress value={20.8} className="h-3 flex-1" />
									<span className="text-lg font-bold">20.8%</span>
								</div>
								<p className="mt-2 text-xs text-muted-foreground">
									1,770 of 8,500 signups became active customers
								</p>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
