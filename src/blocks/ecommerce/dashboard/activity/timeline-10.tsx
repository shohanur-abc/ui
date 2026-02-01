import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	Target,
	TrendingUp,
	Award,
	Zap,
	Calendar,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface Milestone {
	id: string;
	title: string;
	description: string;
	target: number;
	current: number;
	unit: string;
	category: 'revenue' | 'orders' | 'customers' | 'engagement';
	deadline: string;
	status: 'on-track' | 'at-risk' | 'completed' | 'behind';
	assignees?: {
		name: string;
		avatar?: string;
		initials: string;
	}[];
}

interface MilestoneTimelineProps {
	title: string;
	subtitle?: string;
	milestones: Milestone[];
}

const CategoryIcon = ({ category }: { category: Milestone['category'] }) => {
	const config: Record<
		Milestone['category'],
		{ icon: LucideIcon; className: string }
	> = {
		revenue: {
			icon: TrendingUp,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		orders: { icon: Target, className: 'bg-blue-500/20 text-blue-400' },
		customers: { icon: Award, className: 'bg-purple-500/20 text-purple-400' },
		engagement: { icon: Zap, className: 'bg-amber-500/20 text-amber-400' },
	};

	const { icon: Icon, className } = config[category];

	return (
		<div
			className={`flex size-12 items-center justify-center rounded-xl ${className}`}
		>
			<Icon className="size-6" />
		</div>
	);
};

const StatusBadge = ({ status }: { status: Milestone['status'] }) => {
	const config = {
		'on-track': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		'at-risk': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		completed: 'bg-primary/20 text-primary border-primary/30',
		behind: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	const labels = {
		'on-track': 'On Track',
		'at-risk': 'At Risk',
		completed: 'Completed',
		behind: 'Behind',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{labels[status]}
		</Badge>
	);
};

const ProgressDisplay = ({
	current,
	target,
	unit,
	status,
}: {
	current: number;
	target: number;
	unit: string;
	status: Milestone['status'];
}) => {
	const percentage = Math.min(Math.round((current / target) * 100), 100);
	const progressColor =
		status === 'completed'
			? 'bg-primary'
			: status === 'behind' || status === 'at-risk'
				? 'bg-amber-500'
				: 'bg-emerald-500';

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Progress</span>
				<span className="font-medium text-foreground">
					{current.toLocaleString()} / {target.toLocaleString()} {unit}
				</span>
			</div>
			<div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
				<div
					className={`h-full transition-all duration-500 ${progressColor}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span>{percentage}% complete</span>
				<span>
					{target - current > 0
						? `${(target - current).toLocaleString()} ${unit} remaining`
						: 'Target reached!'}
				</span>
			</div>
		</div>
	);
};

const AssigneeAvatars = ({
	assignees,
}: {
	assignees: Milestone['assignees'];
}) => {
	if (!assignees || assignees.length === 0) return null;

	return (
		<div className="flex items-center -space-x-2">
			{assignees.slice(0, 3).map((assignee, index) => (
				<Avatar key={index} className="size-7 border-2 border-card ring-0">
					<AvatarImage src={assignee.avatar} alt={assignee.name} />
					<AvatarFallback className="text-[10px] bg-secondary">
						{assignee.initials}
					</AvatarFallback>
				</Avatar>
			))}
			{assignees.length > 3 && (
				<div className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium">
					+{assignees.length - 3}
				</div>
			)}
		</div>
	);
};

const MilestoneCard = ({ milestone }: { milestone: Milestone }) => (
	<div className="group relative flex gap-4 pb-8 last:pb-0">
		<div className="relative flex flex-col items-center">
			<CategoryIcon category={milestone.category} />
			<div className="absolute top-12 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="rounded-xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
				<div className="flex flex-col gap-4">
					<div className="flex items-start justify-between gap-2">
						<div className="flex flex-col gap-1 min-w-0">
							<h4 className="font-semibold text-foreground">
								{milestone.title}
							</h4>
							<p className="text-sm text-muted-foreground line-clamp-2">
								{milestone.description}
							</p>
						</div>
						<StatusBadge status={milestone.status} />
					</div>
					<ProgressDisplay
						current={milestone.current}
						target={milestone.target}
						unit={milestone.unit}
						status={milestone.status}
					/>
					<div className="flex items-center justify-between pt-3 border-t border-border/50">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="size-4" />
							<span>Due: {milestone.deadline}</span>
						</div>
						<AssigneeAvatars assignees={milestone.assignees} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

const MilestoneTimeline = ({
	title,
	subtitle,
	milestones,
}: MilestoneTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<div>
				<CardTitle className="text-lg font-semibold">{title}</CardTitle>
				{subtitle && (
					<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
				)}
			</div>
			<Button variant="outline" size="sm" className="gap-2">
				<span>View All</span>
				<ArrowRight className="size-4" />
			</Button>
		</CardHeader>
		<CardContent className="pt-6">
			{milestones.map((milestone) => (
				<MilestoneCard key={milestone.id} milestone={milestone} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const milestones: Milestone[] = [
		{
			id: '1',
			title: 'Q1 Revenue Target',
			description: 'Achieve quarterly revenue goal for sustainable growth',
			target: 500000,
			current: 425000,
			unit: 'USD',
			category: 'revenue',
			deadline: 'Mar 31, 2024',
			status: 'on-track',
			assignees: [
				{ name: 'Sarah Chen', initials: 'SC' },
				{ name: 'Mike Johnson', initials: 'MJ' },
			],
		},
		{
			id: '2',
			title: '10,000 Orders Milestone',
			description: 'Process 10,000 orders to unlock enterprise tier benefits',
			target: 10000,
			current: 8742,
			unit: 'orders',
			category: 'orders',
			deadline: 'Apr 15, 2024',
			status: 'at-risk',
			assignees: [
				{ name: 'Emily Davis', initials: 'ED' },
				{ name: 'Alex Kim', initials: 'AK' },
				{ name: 'Jordan Lee', initials: 'JL' },
			],
		},
		{
			id: '3',
			title: 'Customer Acquisition Goal',
			description: 'Expand customer base to 5,000 active users',
			target: 5000,
			current: 5000,
			unit: 'customers',
			category: 'customers',
			deadline: 'Mar 20, 2024',
			status: 'completed',
			assignees: [{ name: 'Marketing Team', initials: 'MT' }],
		},
		{
			id: '4',
			title: 'Email Campaign Engagement',
			description: 'Achieve 25% open rate on promotional campaigns',
			target: 25,
			current: 18,
			unit: '%',
			category: 'engagement',
			deadline: 'Apr 1, 2024',
			status: 'behind',
			assignees: [
				{ name: 'Content Team', initials: 'CT' },
				{ name: 'Design Team', initials: 'DT' },
			],
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<MilestoneTimeline
					title="Milestones & Goals"
					subtitle="Track progress towards key business objectives"
					milestones={milestones}
				/>
			</div>
		</section>
	);
}
