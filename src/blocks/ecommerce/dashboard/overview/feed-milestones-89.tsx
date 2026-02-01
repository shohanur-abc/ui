import { Calendar, CheckCircle2, Circle, Clock, Target } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type MilestoneItem = {
	id: string;
	title: string;
	description: string;
	status: 'completed' | 'in-progress' | 'upcoming';
	dueDate: string;
	progress: number;
	tasks: { total: number; completed: number };
	team: { initials: string }[];
};

const getStatusConfig = (status: MilestoneItem['status']) => {
	switch (status) {
		case 'completed':
			return {
				icon: CheckCircle2,
				color: 'text-emerald-500',
				bgColor: 'bg-emerald-500/10',
				label: 'Completed',
			};
		case 'in-progress':
			return {
				icon: Clock,
				color: 'text-primary',
				bgColor: 'bg-primary/10',
				label: 'In Progress',
			};
		case 'upcoming':
			return {
				icon: Circle,
				color: 'text-muted-foreground',
				bgColor: 'bg-muted',
				label: 'Upcoming',
			};
	}
};

const MilestoneCard = ({
	title,
	description,
	status,
	dueDate,
	progress,
	tasks,
	team,
}: MilestoneItem) => {
	const config = getStatusConfig(status);
	const StatusIcon = config.icon;

	return (
		<div className="flex gap-4">
			<div className="relative flex flex-col items-center">
				<div className={`rounded-full p-2 ${config.bgColor}`}>
					<StatusIcon className={`size-4 ${config.color}`} />
				</div>
				<div className="absolute top-10 h-full w-px bg-border" />
			</div>
			<div className="flex-1 pb-6">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-medium">{title}</p>
								<p className="text-sm text-muted-foreground">{description}</p>
							</div>
							<Badge
								variant="secondary"
								className={`${config.bgColor} ${config.color}`}
							>
								{config.label}
							</Badge>
						</div>
						<div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="size-3.5" />
								{dueDate}
							</div>
							<div className="flex items-center gap-1">
								<Target className="size-3.5" />
								{tasks.completed}/{tasks.total} tasks
							</div>
						</div>
						{status !== 'upcoming' && (
							<div className="mt-4 space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Progress</span>
									<span className="font-medium">{progress}%</span>
								</div>
								<Progress value={progress} className="h-2" />
							</div>
						)}
						<div className="mt-4 flex items-center justify-between">
							<div className="flex -space-x-2">
								{team.map((member, i) => (
									<Avatar key={i} className="size-7 border-2 border-background">
										<AvatarFallback className="text-[10px]">
											{member.initials}
										</AvatarFallback>
									</Avatar>
								))}
							</div>
							{team.length > 3 && (
								<span className="text-xs text-muted-foreground">
									+{team.length - 3} more
								</span>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default function Main() {
	const milestones: MilestoneItem[] = [
		{
			id: '1',
			title: 'Q4 Revenue Target',
			description: 'Achieve $300K in monthly revenue',
			status: 'in-progress',
			dueDate: 'Dec 31, 2024',
			progress: 83,
			tasks: { total: 12, completed: 10 },
			team: [{ initials: 'SW' }, { initials: 'MC' }, { initials: 'EJ' }],
		},
		{
			id: '2',
			title: 'Holiday Campaign Launch',
			description: 'Launch holiday marketing campaign across all channels',
			status: 'completed',
			dueDate: 'Dec 10, 2024',
			progress: 100,
			tasks: { total: 8, completed: 8 },
			team: [{ initials: 'LD' }, { initials: 'MJ' }],
		},
		{
			id: '3',
			title: 'Inventory Optimization',
			description: 'Reduce overstock by 30% and improve turnover rate',
			status: 'in-progress',
			dueDate: 'Dec 20, 2024',
			progress: 65,
			tasks: { total: 6, completed: 4 },
			team: [{ initials: 'BW' }, { initials: 'AB' }, { initials: 'JB' }],
		},
		{
			id: '4',
			title: 'Customer Loyalty Program',
			description: 'Launch new customer loyalty rewards program',
			status: 'upcoming',
			dueDate: 'Jan 15, 2025',
			progress: 0,
			tasks: { total: 10, completed: 0 },
			team: [{ initials: 'SW' }, { initials: 'MC' }],
		},
		{
			id: '5',
			title: 'Mobile App V2 Release',
			description: 'Release major update with new features',
			status: 'upcoming',
			dueDate: 'Feb 1, 2025',
			progress: 0,
			tasks: { total: 15, completed: 0 },
			team: [{ initials: 'EJ' }, { initials: 'MJ' }, { initials: 'LD' }],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Target className="size-5 text-primary" />
							Project Milestones
						</CardTitle>
						<CardDescription>
							Track progress on major initiatives
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-0">
							{milestones.map((milestone) => (
								<MilestoneCard key={milestone.id} {...milestone} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
