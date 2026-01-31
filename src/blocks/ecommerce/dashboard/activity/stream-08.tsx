import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Zap,
	CheckCircle2,
	Clock,
	AlertCircle,
	XCircle,
	Play,
	RotateCw,
	MoreVertical,
	type LucideIcon,
} from 'lucide-react';

interface Job {
	id: string;
	name: string;
	type: 'sync' | 'export' | 'import' | 'report' | 'email' | 'backup';
	status: 'running' | 'completed' | 'queued' | 'failed' | 'cancelled';
	progress: number;
	startedAt?: string;
	completedAt?: string;
	duration?: string;
	items?: {
		processed: number;
		total: number;
	};
	error?: string;
}

interface JobStreamProps {
	title: string;
	jobs: Job[];
	stats: {
		running: number;
		queued: number;
		completedToday: number;
		failedToday: number;
	};
}

const StatusIcon = ({ status }: { status: Job['status'] }) => {
	const config: Record<
		Job['status'],
		{ icon: LucideIcon; className: string }
	> = {
		running: { icon: RotateCw, className: 'text-blue-400 animate-spin' },
		completed: { icon: CheckCircle2, className: 'text-emerald-400' },
		queued: { icon: Clock, className: 'text-amber-400' },
		failed: { icon: XCircle, className: 'text-rose-400' },
		cancelled: { icon: AlertCircle, className: 'text-muted-foreground' },
	};

	const { icon: Icon, className } = config[status];
	return <Icon className={`size-5 ${className}`} />;
};

const TypeBadge = ({ type }: { type: Job['type'] }) => {
	const config = {
		sync: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		export: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		import: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		report: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		email: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
		backup: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs uppercase ${config[type]}`}>
			{type}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: Job['status'] }) => {
	const config = {
		running: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		queued: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		failed: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		cancelled: 'bg-muted text-muted-foreground border-border',
	};

	return (
		<Badge variant="outline" className={`capitalize ${config[status]}`}>
			{status}
		</Badge>
	);
};

const JobCard = ({ job }: { job: Job }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all ${
			job.status === 'failed'
				? 'border-rose-500/30 bg-rose-500/5'
				: job.status === 'running'
					? 'border-blue-500/30 bg-blue-500/5'
					: 'border-border/50 bg-card/80'
		}`}
	>
		<div className="flex items-start gap-4">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
				<StatusIcon status={job.status} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h4 className="font-medium text-foreground truncate">
								{job.name}
							</h4>
							<TypeBadge type={job.type} />
						</div>
						<p className="text-xs text-muted-foreground font-mono">
							Job ID: {job.id}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<StatusBadge status={job.status} />
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</div>
				</div>

				{job.status === 'running' && (
					<div className="space-y-2 mb-3">
						<div className="flex items-center justify-between text-xs">
							<span className="text-muted-foreground">Progress</span>
							<span className="text-foreground">{job.progress}%</span>
						</div>
						<Progress value={job.progress} className="h-1.5" />
						{job.items && (
							<p className="text-xs text-muted-foreground">
								{job.items.processed.toLocaleString()} /{' '}
								{job.items.total.toLocaleString()} items processed
							</p>
						)}
					</div>
				)}

				{job.status === 'failed' && job.error && (
					<div className="p-2 rounded-md bg-rose-500/10 mb-3">
						<p className="text-xs text-rose-400 font-mono">{job.error}</p>
					</div>
				)}

				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<div className="flex items-center gap-3">
						{job.startedAt && (
							<span>Started: {job.startedAt}</span>
						)}
						{job.completedAt && (
							<span>Completed: {job.completedAt}</span>
						)}
					</div>
					{job.duration && (
						<div className="flex items-center gap-1">
							<Clock className="size-3" />
							<span>{job.duration}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	</div>
);

const JobStats = ({ stats }: { stats: JobStreamProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-3">
		<div className="flex flex-col p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<RotateCw className="size-4 text-blue-400 mb-1" />
			<span className="text-xl font-bold text-blue-400">{stats.running}</span>
			<span className="text-xs text-muted-foreground">Running</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<Clock className="size-4 text-amber-400 mb-1" />
			<span className="text-xl font-bold text-amber-400">{stats.queued}</span>
			<span className="text-xs text-muted-foreground">Queued</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-1" />
			<span className="text-xl font-bold text-emerald-400">
				{stats.completedToday}
			</span>
			<span className="text-xs text-muted-foreground">Completed</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<XCircle className="size-4 text-rose-400 mb-1" />
			<span className="text-xl font-bold text-rose-400">
				{stats.failedToday}
			</span>
			<span className="text-xs text-muted-foreground">Failed</span>
		</div>
	</div>
);

const JobStream = ({ title, jobs, stats }: JobStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Zap className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm" className="gap-1">
				<Play className="size-4" />
				Run Job
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<JobStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{jobs.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const jobs: Job[] = [
		{
			id: 'job_001',
			name: 'Product catalog sync',
			type: 'sync',
			status: 'running',
			progress: 67,
			startedAt: '2 min ago',
			items: { processed: 3420, total: 5100 },
		},
		{
			id: 'job_002',
			name: 'Daily sales report',
			type: 'report',
			status: 'queued',
			progress: 0,
		},
		{
			id: 'job_003',
			name: 'Order export to warehouse',
			type: 'export',
			status: 'completed',
			progress: 100,
			startedAt: '15 min ago',
			completedAt: '10 min ago',
			duration: '5m 23s',
			items: { processed: 847, total: 847 },
		},
		{
			id: 'job_004',
			name: 'Customer import from CRM',
			type: 'import',
			status: 'failed',
			progress: 34,
			startedAt: '1 hour ago',
			duration: '12m 45s',
			error: 'Connection timeout: Unable to connect to CRM API after 3 retries',
		},
		{
			id: 'job_005',
			name: 'Weekly newsletter campaign',
			type: 'email',
			status: 'completed',
			progress: 100,
			startedAt: '3 hours ago',
			completedAt: '2 hours ago',
			duration: '47m 12s',
			items: { processed: 12500, total: 12500 },
		},
		{
			id: 'job_006',
			name: 'Database backup',
			type: 'backup',
			status: 'running',
			progress: 23,
			startedAt: '1 min ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<JobStream
					title="Background Jobs"
					jobs={jobs}
					stats={{
						running: 2,
						queued: 5,
						completedToday: 47,
						failedToday: 3,
					}}
				/>
			</div>
		</section>
	);
}
