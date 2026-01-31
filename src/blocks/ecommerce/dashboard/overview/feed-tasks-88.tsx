import {
	ArrowUpRight,
	CheckCircle2,
	Circle,
	Edit,
	Flag,
	MoreHorizontal,
	Plus,
	Trash2,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

type TaskItem = {
	id: string;
	title: string;
	description: string;
	priority: 'high' | 'medium' | 'low';
	dueDate: string;
	assignee?: { name: string; initials: string };
	completed: boolean;
	category: string;
};

const getPriorityConfig = (priority: TaskItem['priority']) => {
	switch (priority) {
		case 'high':
			return { color: 'text-red-500', bgColor: 'bg-red-500/10', label: 'High' };
		case 'medium':
			return { color: 'text-amber-500', bgColor: 'bg-amber-500/10', label: 'Medium' };
		case 'low':
			return { color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', label: 'Low' };
	}
};

const TaskCard = ({ title, description, priority, dueDate, assignee, completed, category }: TaskItem) => {
	const priorityConfig = getPriorityConfig(priority);

	return (
		<div className={`rounded-lg border bg-card p-4 ${completed ? 'opacity-60' : ''}`}>
			<div className="flex items-start gap-3">
				<Checkbox checked={completed} className="mt-1" />
				<div className="flex-1">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className={`font-medium ${completed ? 'line-through' : ''}`}>{title}</p>
							<p className="mt-1 text-sm text-muted-foreground">{description}</p>
						</div>
						<Button variant="ghost" size="icon" className="size-8">
							<MoreHorizontal className="size-4" />
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-center gap-2">
						<Badge variant="outline" className="text-xs">
							{category}
						</Badge>
						<Badge variant="secondary" className={`text-xs ${priorityConfig.bgColor} ${priorityConfig.color}`}>
							<Flag className="mr-1 size-3" />
							{priorityConfig.label}
						</Badge>
						<span className="text-xs text-muted-foreground">Due: {dueDate}</span>
						{assignee && (
							<div className="flex items-center gap-1.5 ml-auto">
								<Avatar className="size-5">
									<AvatarFallback className="text-[10px]">{assignee.initials}</AvatarFallback>
								</Avatar>
								<span className="text-xs">{assignee.name}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const tasks: TaskItem[] = [
		{ id: '1', title: 'Review Q4 sales report', description: 'Analyze sales data and prepare summary for stakeholders', priority: 'high', dueDate: 'Today', assignee: { name: 'Sarah', initials: 'SW' }, completed: false, category: 'Reports' },
		{ id: '2', title: 'Update product descriptions', description: 'Refresh SEO-optimized descriptions for top 20 products', priority: 'medium', dueDate: 'Dec 15', assignee: { name: 'Mike', initials: 'MJ' }, completed: false, category: 'Marketing' },
		{ id: '3', title: 'Inventory audit', description: 'Cross-check physical inventory with system records', priority: 'high', dueDate: 'Dec 14', assignee: { name: 'Bob', initials: 'BW' }, completed: false, category: 'Operations' },
		{ id: '4', title: 'Set up holiday promotions', description: 'Configure discount codes and banner ads for holiday sale', priority: 'medium', dueDate: 'Dec 16', assignee: { name: 'Lisa', initials: 'LD' }, completed: true, category: 'Marketing' },
		{ id: '5', title: 'Customer feedback analysis', description: 'Review recent customer feedback and identify improvement areas', priority: 'low', dueDate: 'Dec 18', completed: false, category: 'Support' },
		{ id: '6', title: 'Update shipping rates', description: 'Adjust shipping rates based on new carrier contracts', priority: 'low', dueDate: 'Dec 20', completed: true, category: 'Operations' },
	];

	const pendingCount = tasks.filter((t) => !t.completed).length;
	const completedCount = tasks.filter((t) => t.completed).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<div>
							<CardTitle>Task Manager</CardTitle>
							<CardDescription>
								{pendingCount} pending • {completedCount} completed
							</CardDescription>
						</div>
						<Button size="sm" className="gap-1">
							<Plus className="size-4" />
							Add Task
						</Button>
					</CardHeader>
					<CardContent className="space-y-3">
						{tasks.map((task) => (
							<TaskCard key={task.id} {...task} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
