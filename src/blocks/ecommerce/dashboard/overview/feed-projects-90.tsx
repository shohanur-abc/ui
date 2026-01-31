import {
	ArrowUpRight,
	Calendar,
	MessageSquare,
	Paperclip,
	Plus,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ProjectCard = {
	id: string;
	name: string;
	description: string;
	status: 'active' | 'on-hold' | 'completed';
	progress: number;
	dueDate: string;
	team: { initials: string }[];
	comments: number;
	attachments: number;
	category: string;
};

const getStatusStyle = (status: ProjectCard['status']) => {
	switch (status) {
		case 'active':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'on-hold':
			return 'bg-amber-500/10 text-amber-500';
		case 'completed':
			return 'bg-primary/10 text-primary';
	}
};

const ProjectCardComponent = ({ name, description, status, progress, dueDate, team, comments, attachments, category }: ProjectCard) => (
	<Card className="overflow-hidden">
		<CardContent className="p-4">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Badge variant="outline" className="mb-2 text-xs">
						{category}
					</Badge>
					<p className="font-medium">{name}</p>
					<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
				</div>
				<Badge variant="secondary" className={getStatusStyle(status)}>
					{status}
				</Badge>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Progress</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
			<div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Calendar className="size-3.5" />
					{dueDate}
				</div>
				<div className="flex items-center gap-1">
					<MessageSquare className="size-3.5" />
					{comments}
				</div>
				<div className="flex items-center gap-1">
					<Paperclip className="size-3.5" />
					{attachments}
				</div>
			</div>
			<div className="mt-4 flex items-center justify-between">
				<div className="flex -space-x-2">
					{team.slice(0, 4).map((member, i) => (
						<Avatar key={i} className="size-8 border-2 border-background">
							<AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
						</Avatar>
					))}
					{team.length > 4 && (
						<div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
							+{team.length - 4}
						</div>
					)}
				</div>
				<Button variant="ghost" size="sm" className="gap-1">
					View
					<ArrowUpRight className="size-3" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const projects: ProjectCard[] = [
		{ id: '1', name: 'Website Redesign', description: 'Complete overhaul of the e-commerce website with improved UX', status: 'active', progress: 75, dueDate: 'Dec 20', team: [{ initials: 'SW' }, { initials: 'MC' }, { initials: 'EJ' }, { initials: 'BW' }, { initials: 'LD' }], comments: 24, attachments: 12, category: 'Development' },
		{ id: '2', name: 'Mobile App V2', description: 'Major update with new features including AR try-on', status: 'active', progress: 45, dueDate: 'Jan 15', team: [{ initials: 'MJ' }, { initials: 'AB' }, { initials: 'JB' }], comments: 18, attachments: 8, category: 'Development' },
		{ id: '3', name: 'Holiday Marketing', description: 'Multi-channel marketing campaign for holiday season', status: 'completed', progress: 100, dueDate: 'Dec 10', team: [{ initials: 'LD' }, { initials: 'SW' }], comments: 32, attachments: 15, category: 'Marketing' },
		{ id: '4', name: 'Inventory System', description: 'Implement new AI-powered inventory management system', status: 'on-hold', progress: 30, dueDate: 'Feb 1', team: [{ initials: 'BW' }, { initials: 'MC' }, { initials: 'AB' }], comments: 8, attachments: 5, category: 'Operations' },
		{ id: '5', name: 'Customer Portal', description: 'Self-service customer portal with order tracking', status: 'active', progress: 60, dueDate: 'Dec 28', team: [{ initials: 'EJ' }, { initials: 'JB' }], comments: 15, attachments: 7, category: 'Development' },
		{ id: '6', name: 'Analytics Dashboard', description: 'Real-time analytics and reporting dashboard', status: 'active', progress: 85, dueDate: 'Dec 18', team: [{ initials: 'MC' }, { initials: 'SW' }, { initials: 'MJ' }], comments: 21, attachments: 10, category: 'Data' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Users className="size-5 text-primary" />
								Active Projects
							</CardTitle>
							<CardDescription>
								{projects.filter((p) => p.status === 'active').length} projects in progress
							</CardDescription>
						</div>
						<Button size="sm" className="gap-1">
							<Plus className="size-4" />
							New Project
						</Button>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{projects.map((project) => (
								<ProjectCardComponent key={project.id} {...project} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
