'use client';

import {
	Target,
	TrendingUp,
	ArrowRight,
	CheckCircle2,
	Clock,
	AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Goal = {
	title: string;
	current: number;
	target: number;
	unit: string;
	status: 'on-track' | 'behind' | 'completed';
	dueDate: string;
};

type MilestoneData = {
	title: string;
	description: string;
	progress: number;
	milestones: { label: string; achieved: boolean }[];
};

type BentoLayout4Props = {
	goals: Goal[];
	milestone: MilestoneData;
};

const getStatusIcon = (status: Goal['status']) => {
	switch (status) {
		case 'completed':
			return <CheckCircle2 className="size-4 text-primary" />;
		case 'behind':
			return <AlertCircle className="size-4 text-destructive" />;
		default:
			return <Clock className="size-4 text-amber-500" />;
	}
};

const getStatusVariant = (status: Goal['status']) => {
	switch (status) {
		case 'completed':
			return 'default';
		case 'behind':
			return 'destructive';
		default:
			return 'secondary';
	}
};

const GoalCard = ({ goal }: { goal: Goal }) => {
	const progress = Math.min(100, (goal.current / goal.target) * 100);
	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardContent className="pt-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-2">
						<Target className="size-4 text-muted-foreground" />
						<span className="font-medium">{goal.title}</span>
					</div>
					<Badge variant={getStatusVariant(goal.status)} className="gap-1">
						{getStatusIcon(goal.status)}
						{goal.status.replace('-', ' ')}
					</Badge>
				</div>
				<div className="space-y-2">
					<div className="flex items-baseline gap-1">
						<span className="text-2xl font-bold">
							{goal.current.toLocaleString()}
						</span>
						<span className="text-muted-foreground">
							/ {goal.target.toLocaleString()} {goal.unit}
						</span>
					</div>
					<Progress value={progress} className="h-2" />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>{progress.toFixed(0)}% complete</span>
						<span>Due: {goal.dueDate}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const MilestoneCard = ({ milestone }: { milestone: MilestoneData }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @lg:col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
			<p className="text-xs text-muted-foreground">{milestone.description}</p>
		</CardHeader>
		<CardContent>
			<div className="mb-4">
				<div className="flex justify-between text-sm mb-2">
					<span>Overall Progress</span>
					<span className="font-medium">{milestone.progress}%</span>
				</div>
				<Progress value={milestone.progress} className="h-3" />
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-3">
				{milestone.milestones.map((m, idx) => (
					<div
						key={idx}
						className={`flex items-center gap-2 p-2 rounded-lg ${
							m.achieved ? 'bg-primary/10' : 'bg-muted'
						}`}
					>
						{m.achieved ? (
							<CheckCircle2 className="size-4 text-primary" />
						) : (
							<div className="size-4 rounded-full border-2 border-muted-foreground" />
						)}
						<span
							className={`text-xs ${m.achieved ? 'font-medium' : 'text-muted-foreground'}`}
						>
							{m.label}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const BentoLayout4 = ({ goals, milestone }: BentoLayout4Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		{goals.map((goal, idx) => (
			<GoalCard key={idx} goal={goal} />
		))}
		<MilestoneCard milestone={milestone} />
	</div>
);

export default function Main() {
	const goals: Goal[] = [
		{
			title: 'Revenue Target',
			current: 142580,
			target: 175000,
			unit: 'USD',
			status: 'on-track',
			dueDate: 'Jan 31',
		},
		{
			title: 'New Customers',
			current: 324,
			target: 400,
			unit: 'users',
			status: 'on-track',
			dueDate: 'Jan 31',
		},
		{
			title: 'Order Volume',
			current: 1284,
			target: 1500,
			unit: 'orders',
			status: 'behind',
			dueDate: 'Jan 31',
		},
		{
			title: 'Conversion Rate',
			current: 4.2,
			target: 5.0,
			unit: '%',
			status: 'completed',
			dueDate: 'Jan 31',
		},
	];

	const milestone: MilestoneData = {
		title: 'Q1 Sales Roadmap',
		description: 'Key milestones for Q1 2024 sales objectives',
		progress: 62,
		milestones: [
			{ label: 'Launch Campaign', achieved: true },
			{ label: '$50k Revenue', achieved: true },
			{ label: '$100k Revenue', achieved: true },
			{ label: '500 Orders', achieved: true },
			{ label: '1000 Orders', achieved: true },
			{ label: '$150k Revenue', achieved: false },
			{ label: '300 New Customers', achieved: true },
			{ label: '$175k Target', achieved: false },
		],
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout4 goals={goals} milestone={milestone} />
			</div>
		</section>
	);
}
