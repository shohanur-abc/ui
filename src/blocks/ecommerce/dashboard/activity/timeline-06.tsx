import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	GitBranch,
	GitCommit,
	GitMerge,
	GitPullRequest,
	AlertOctagon,
	Rocket,
	type LucideIcon,
} from 'lucide-react';

interface DeploymentEvent {
	id: string;
	type: 'deploy' | 'rollback' | 'hotfix' | 'merge' | 'release';
	title: string;
	description: string;
	environment: 'production' | 'staging' | 'development';
	timestamp: string;
	author: {
		name: string;
		avatar?: string;
		initials: string;
	};
	version?: string;
	status: 'success' | 'failed' | 'in-progress';
}

interface DeploymentTimelineProps {
	title: string;
	events: DeploymentEvent[];
}

const EventTypeIcon = ({ type }: { type: DeploymentEvent['type'] }) => {
	const config: Record<
		DeploymentEvent['type'],
		{ icon: LucideIcon; className: string }
	> = {
		deploy: { icon: Rocket, className: 'bg-emerald-500/20 text-emerald-400' },
		rollback: {
			icon: AlertOctagon,
			className: 'bg-rose-500/20 text-rose-400',
		},
		hotfix: { icon: GitCommit, className: 'bg-amber-500/20 text-amber-400' },
		merge: { icon: GitMerge, className: 'bg-purple-500/20 text-purple-400' },
		release: { icon: GitBranch, className: 'bg-blue-500/20 text-blue-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const EnvironmentBadge = ({
	environment,
}: {
	environment: DeploymentEvent['environment'];
}) => {
	const config = {
		production: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		staging: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	return (
		<Badge variant="outline" className={config[environment]}>
			{environment}
		</Badge>
	);
};

const StatusDot = ({ status }: { status: DeploymentEvent['status'] }) => {
	const config = {
		success: 'bg-emerald-400',
		failed: 'bg-rose-400',
		'in-progress': 'bg-amber-400 animate-pulse',
	};

	return <span className={`size-2 rounded-full ${config[status]}`} />;
};

const DeploymentEventCard = ({ event }: { event: DeploymentEvent }) => (
	<div className="group relative flex gap-4">
		<div className="relative flex flex-col items-center">
			<EventTypeIcon type={event.type} />
			<div className="absolute top-10 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
		</div>
		<div className="flex-1 pb-8">
			<div className="rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
				<div className="flex flex-col gap-3">
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex items-center gap-2">
							<StatusDot status={event.status} />
							<h4 className="font-medium text-foreground">{event.title}</h4>
						</div>
						<EnvironmentBadge environment={event.environment} />
						{event.version && (
							<Badge
								variant="outline"
								className="font-mono text-xs border-primary/30 text-primary"
							>
								{event.version}
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{event.description}</p>
					<div className="flex items-center justify-between pt-2 border-t border-border/50">
						<div className="flex items-center gap-2">
							<Avatar className="size-6">
								<AvatarImage
									src={event.author.avatar}
									alt={event.author.name}
								/>
								<AvatarFallback className="text-xs bg-secondary">
									{event.author.initials}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm text-muted-foreground">
								{event.author.name}
							</span>
						</div>
						<span className="text-xs text-muted-foreground">
							{event.timestamp}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const DeploymentTimeline = ({ title, events }: DeploymentTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm" className="gap-2">
				<GitPullRequest className="size-4" />
				<span>Deploy</span>
			</Button>
		</CardHeader>
		<CardContent className="pt-6">
			{events.map((event) => (
				<DeploymentEventCard key={event.id} event={event} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const deploymentEvents: DeploymentEvent[] = [
		{
			id: '1',
			type: 'deploy',
			title: 'Production deployment successful',
			description: 'Checkout flow optimization and payment gateway updates',
			environment: 'production',
			timestamp: '15 min ago',
			author: { name: 'DevOps Bot', initials: 'DO' },
			version: 'v2.4.1',
			status: 'success',
		},
		{
			id: '2',
			type: 'hotfix',
			title: 'Critical security patch applied',
			description: 'Fixed XSS vulnerability in product reviews',
			environment: 'production',
			timestamp: '2 hours ago',
			author: { name: 'Security Team', initials: 'ST' },
			version: 'v2.4.0-hotfix.1',
			status: 'success',
		},
		{
			id: '3',
			type: 'deploy',
			title: 'Staging deployment in progress',
			description: 'New inventory management features for testing',
			environment: 'staging',
			timestamp: '3 hours ago',
			author: { name: 'John Developer', initials: 'JD' },
			version: 'v2.5.0-beta',
			status: 'in-progress',
		},
		{
			id: '4',
			type: 'rollback',
			title: 'Rollback executed',
			description: 'Reverted due to performance degradation in cart service',
			environment: 'production',
			timestamp: 'Yesterday',
			author: { name: 'Ops Team', initials: 'OT' },
			version: 'v2.3.9',
			status: 'success',
		},
		{
			id: '5',
			type: 'release',
			title: 'New release tagged',
			description: 'Q1 feature release with enhanced analytics dashboard',
			environment: 'production',
			timestamp: '2 days ago',
			author: { name: 'Release Manager', initials: 'RM' },
			version: 'v2.4.0',
			status: 'success',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<DeploymentTimeline
					title="Deployment Activity"
					events={deploymentEvents}
				/>
			</div>
		</section>
	);
}
