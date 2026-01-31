import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	ListTodo,
	CheckCircle2,
	Clock,
	AlertCircle,
	Calendar,
	User,
	Tag,
	ChevronRight,
	Plus,
	type LucideIcon,
} from 'lucide-react';

interface Task {
	id: string;
	title: string;
	description?: string;
	status: 'todo' | 'in_progress' | 'review' | 'completed';
	priority: 'low' | 'medium' | 'high' | 'urgent';
	category: string;
	assignee?: {
		name: string;
		avatar?: string;
		initials: string;
	};
	dueDate?: string;
	progress?: number;
}

interface TaskTrackerProps {
	title: string;
	tasks: Task[];
	stats: {
		total: number;
		completed: number;
		inProgress: number;
		overdue: number;
	};
}

const StatusConfig: Record<
	Task['status'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	todo: {
		label: 'To Do',
		className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
		icon: ListTodo,
	},
	in_progress: {
		label: 'In Progress',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: Clock,
	},
	review: {
		label: 'In Review',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		icon: AlertCircle,
	},
	completed: {
		label: 'Completed',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: CheckCircle2,
	},
};

const PriorityConfig: Record<Task['priority'], { className: string }> = {
	low: { className: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
	medium: { className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
	high: { className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
	urgent: { className: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
};

const TaskCard = ({ task }: { task: Task }) => {
	const statusConfig = StatusConfig[task.status];
	const priorityConfig = PriorityConfig[task.priority];
	const StatusIcon = statusConfig.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				task.priority === 'urgent'
					? 'border-rose-500/30 bg-rose-500/5'
					: task.status === 'completed'
						? 'border-emerald-500/30 bg-emerald-500/5 opacity-75'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start gap-3">
				<div
					className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${statusConfig.className}`}
				>
					<StatusIcon className="size-4" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<h4
							className={`font-medium ${
								task.status === 'completed'
									? 'text-muted-foreground line-through'
									: 'text-foreground'
							}`}
						>
							{task.title}
						</h4>
						<Button variant="ghost" size="icon-sm" className="size-6">
							<ChevronRight className="size-4" />
						</Button>
					</div>

					{task.description && (
						<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
							{task.description}
						</p>
					)}

					<div className="flex flex-wrap items-center gap-2 mb-3">
						<Badge variant="outline" className={priorityConfig.className}>
							{task.priority}
						</Badge>
						<Badge variant="outline" className="text-xs">
							<Tag className="size-3 mr-1" />
							{task.category}
						</Badge>
					</div>

					{task.progress !== undefined && task.status === 'in_progress' && (
						<div className="mb-3">
							<div className="flex items-center justify-between text-xs mb-1">
								<span className="text-muted-foreground">Progress</span>
								<span className="text-foreground font-medium">
									{task.progress}%
								</span>
							</div>
							<Progress value={task.progress} className="h-1.5" />
						</div>
					)}

					<div className="flex items-center justify-between text-xs">
						{task.assignee ? (
							<div className="flex items-center gap-2">
								<Avatar className="size-5">
									<AvatarImage
										src={task.assignee.avatar}
										alt={task.assignee.name}
									/>
									<AvatarFallback className="text-[10px] bg-secondary">
										{task.assignee.initials}
									</AvatarFallback>
								</Avatar>
								<span className="text-muted-foreground">
									{task.assignee.name}
								</span>
							</div>
						) : (
							<span className="text-muted-foreground flex items-center gap-1">
								<User className="size-3" />
								Unassigned
							</span>
						)}
						{task.dueDate && (
							<span
								className={`flex items-center gap-1 ${
									task.dueDate === 'Overdue'
										? 'text-rose-400'
										: 'text-muted-foreground'
								}`}
							>
								<Calendar className="size-3" />
								{task.dueDate}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const TaskStats = ({ stats }: { stats: TaskTrackerProps['stats'] }) => {
	const completionRate =
		stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

	return (
		<div className="p-4 rounded-xl border border-border/50 bg-muted/30">
			<div className="flex items-center justify-between mb-3">
				<span className="text-sm font-medium text-foreground">
					Completion Rate
				</span>
				<span className="text-2xl font-bold text-primary">
					{completionRate}%
				</span>
			</div>
			<Progress value={completionRate} className="h-2 mb-4" />
			<div className="grid grid-cols-4 gap-2 text-center">
				<div>
					<span className="text-lg font-bold text-foreground block">
						{stats.total}
					</span>
					<span className="text-xs text-muted-foreground">Total</span>
				</div>
				<div>
					<span className="text-lg font-bold text-emerald-400 block">
						{stats.completed}
					</span>
					<span className="text-xs text-muted-foreground">Done</span>
				</div>
				<div>
					<span className="text-lg font-bold text-blue-400 block">
						{stats.inProgress}
					</span>
					<span className="text-xs text-muted-foreground">Active</span>
				</div>
				<div>
					<span className="text-lg font-bold text-rose-400 block">
						{stats.overdue}
					</span>
					<span className="text-xs text-muted-foreground">Overdue</span>
				</div>
			</div>
		</div>
	);
};

const TaskTracker = ({ title, tasks, stats }: TaskTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<ListTodo className="size-5" />
				{title}
				{stats.overdue > 0 && (
					<Badge className="bg-rose-500 text-white">
						{stats.overdue} Overdue
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm" className="gap-1">
				<Plus className="size-4" />
				Add Task
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<TaskStats stats={stats} />
			<ScrollArea className="h-[340px]">
				<div className="space-y-3 pr-4">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const tasks: Task[] = [
		{
			id: '1',
			title: 'Update product pricing',
			description: 'Review and update pricing for Q2 promotions',
			status: 'in_progress',
			priority: 'urgent',
			category: 'Products',
			assignee: { name: 'Sarah Chen', initials: 'SC' },
			dueDate: 'Today',
			progress: 65,
		},
		{
			id: '2',
			title: 'Review customer feedback',
			description: 'Analyze feedback from last month and create action items',
			status: 'todo',
			priority: 'high',
			category: 'Support',
			assignee: { name: 'Mike Johnson', initials: 'MJ' },
			dueDate: 'Tomorrow',
		},
		{
			id: '3',
			title: 'Process refund requests',
			status: 'in_progress',
			priority: 'medium',
			category: 'Orders',
			assignee: { name: 'Emily Davis', initials: 'ED' },
			dueDate: 'Mar 20',
			progress: 30,
		},
		{
			id: '4',
			title: 'Update inventory counts',
			status: 'review',
			priority: 'medium',
			category: 'Inventory',
			assignee: { name: 'Alex Kim', initials: 'AK' },
			dueDate: 'Mar 21',
		},
		{
			id: '5',
			title: 'Send newsletter campaign',
			status: 'completed',
			priority: 'low',
			category: 'Marketing',
			assignee: { name: 'Jordan Lee', initials: 'JL' },
			dueDate: 'Mar 15',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<TaskTracker
					title="Task Tracker"
					tasks={tasks}
					stats={{
						total: 24,
						completed: 15,
						inProgress: 6,
						overdue: 2,
					}}
				/>
			</div>
		</section>
	);
}
