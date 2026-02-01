'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock } from 'lucide-react';

type Task = {
	label: string;
	status: 'completed' | 'in-progress' | 'pending';
	dueDate: string;
};

type Project = {
	name: string;
	progress: number;
	tasks: Task[];
};

const projects: Project[] = [
	{
		name: 'Website Redesign',
		progress: 75,
		tasks: [
			{ label: 'Design mockups', status: 'completed', dueDate: 'Jan 5' },
			{ label: 'Frontend development', status: 'completed', dueDate: 'Jan 12' },
			{
				label: 'Backend integration',
				status: 'in-progress',
				dueDate: 'Jan 20',
			},
			{ label: 'Testing & QA', status: 'pending', dueDate: 'Jan 25' },
		],
	},
	{
		name: 'Mobile App Launch',
		progress: 40,
		tasks: [
			{ label: 'UI/UX Design', status: 'completed', dueDate: 'Jan 8' },
			{ label: 'Core features', status: 'in-progress', dueDate: 'Jan 22' },
			{ label: 'Push notifications', status: 'pending', dueDate: 'Jan 28' },
			{ label: 'App store submission', status: 'pending', dueDate: 'Feb 1' },
		],
	},
];

const StatusIcon = ({ status }: { status: Task['status'] }) => {
	if (status === 'completed')
		return <CheckCircle className="size-4 text-emerald-500" />;
	if (status === 'in-progress')
		return <Clock className="size-4 text-amber-500" />;
	return <Circle className="size-4 text-muted-foreground" />;
};

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
					{projects.map((project, i) => (
						<Card
							key={i}
							className="border-border/50 bg-card/80 backdrop-blur-sm"
						>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<CardTitle className="text-sm font-medium">
										{project.name}
									</CardTitle>
									<Badge variant="outline">{project.progress}%</Badge>
								</div>
							</CardHeader>
							<CardContent className="pt-2">
								<div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-4">
									<div
										className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
										style={{ width: `${project.progress}%` }}
									/>
								</div>

								<div className="space-y-3">
									{project.tasks.map((task, j) => (
										<div key={j} className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<StatusIcon status={task.status} />
												<span
													className={`text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}
												>
													{task.label}
												</span>
											</div>
											<span className="text-xs text-muted-foreground">
												{task.dueDate}
											</span>
										</div>
									))}
								</div>

								<div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
									<span>
										{
											project.tasks.filter((t) => t.status === 'completed')
												.length
										}{' '}
										of {project.tasks.length} tasks
									</span>
									<span>
										{
											project.tasks.filter((t) => t.status === 'in-progress')
												.length
										}{' '}
										in progress
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
