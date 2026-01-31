import {
	AlertCircle,
	CheckCircle2,
	Circle,
	Clock,
	Target,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type StepItem = {
	title: string;
	description: string;
	status: 'completed' | 'in-progress' | 'pending';
};

type PhaseItem = {
	name: string;
	status: 'completed' | 'in-progress' | 'pending';
	progress: number;
	steps: StepItem[];
};

const getStatusIcon = (status: StepItem['status']) => {
	switch (status) {
		case 'completed':
			return <CheckCircle2 className="size-5 text-emerald-500" />;
		case 'in-progress':
			return <Clock className="size-5 text-amber-500" />;
		case 'pending':
			return <Circle className="size-5 text-muted-foreground" />;
	}
};

const getStatusBadge = (status: PhaseItem['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'in-progress':
			return 'bg-amber-500/10 text-amber-500';
		case 'pending':
			return 'bg-muted text-muted-foreground';
	}
};

const PhaseCard = ({ name, status, progress, steps }: PhaseItem) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-base">{name}</CardTitle>
				<Badge variant="secondary" className={getStatusBadge(status)}>
					{status.replace('-', ' ')}
				</Badge>
			</div>
			<Progress value={progress} className="mt-2 h-2" />
		</CardHeader>
		<CardContent className="space-y-3 pt-0">
			{steps.map((step, i) => (
				<div key={i} className="flex items-start gap-3">
					{getStatusIcon(step.status)}
					<div className="flex-1">
						<p className={`text-sm font-medium ${step.status === 'pending' ? 'text-muted-foreground' : ''}`}>
							{step.title}
						</p>
						<p className="text-xs text-muted-foreground">{step.description}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const phases: PhaseItem[] = [
		{
			name: 'Phase 1: Setup',
			status: 'completed',
			progress: 100,
			steps: [
				{ title: 'Initial configuration', description: 'System setup and configuration', status: 'completed' },
				{ title: 'Team onboarding', description: 'Training and documentation', status: 'completed' },
				{ title: 'Integration testing', description: 'Connect external services', status: 'completed' },
			],
		},
		{
			name: 'Phase 2: Development',
			status: 'in-progress',
			progress: 65,
			steps: [
				{ title: 'Core features', description: 'Build primary functionality', status: 'completed' },
				{ title: 'User interface', description: 'Design and implement UI', status: 'in-progress' },
				{ title: 'API development', description: 'Backend services and endpoints', status: 'pending' },
			],
		},
		{
			name: 'Phase 3: Launch',
			status: 'pending',
			progress: 0,
			steps: [
				{ title: 'Beta testing', description: 'Internal and external testing', status: 'pending' },
				{ title: 'Marketing prep', description: 'Launch materials and campaigns', status: 'pending' },
				{ title: 'Go live', description: 'Production deployment', status: 'pending' },
			],
		},
	];

	const overallProgress = Math.round(
		phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length
	);

	const completedSteps = phases.reduce((acc, phase) =>
		acc + phase.steps.filter(s => s.status === 'completed').length, 0
	);

	const totalSteps = phases.reduce((acc, phase) => acc + phase.steps.length, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardContent className="flex flex-wrap items-center gap-8 p-6">
							<div className="flex items-center gap-4">
								<div className="rounded-xl bg-primary/10 p-3">
									<Target className="size-6 text-primary" />
								</div>
								<div>
									<p className="text-3xl font-bold">{overallProgress}%</p>
									<p className="text-sm text-muted-foreground">Overall Progress</p>
								</div>
							</div>
							<Separator orientation="vertical" className="h-12 hidden @sm:block" />
							<div className="flex items-center gap-4">
								<div className="rounded-xl bg-emerald-500/10 p-3">
									<CheckCircle2 className="size-6 text-emerald-500" />
								</div>
								<div>
									<p className="text-3xl font-bold">{completedSteps}/{totalSteps}</p>
									<p className="text-sm text-muted-foreground">Steps Completed</p>
								</div>
							</div>
							<Separator orientation="vertical" className="h-12 hidden @md:block" />
							<div className="flex-1">
								<p className="text-sm text-muted-foreground mb-2">Combined Progress</p>
								<Progress value={overallProgress} className="h-3" />
							</div>
						</CardContent>
					</Card>
					<div className="grid gap-6 @lg:grid-cols-3">
						{phases.map((phase, i) => (
							<PhaseCard key={i} {...phase} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
