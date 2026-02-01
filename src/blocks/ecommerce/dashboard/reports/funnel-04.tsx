'use client';

import {
	Headphones,
	MessageCircle,
	Clock,
	CheckCircle,
	XCircle,
	AlertTriangle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type ResolutionStage = {
	id: string;
	name: string;
	count: number;
	percentage: number;
	avgTime: string;
	status: 'success' | 'warning' | 'danger';
};

type StageBlockProps = {
	stage: ResolutionStage;
	index: number;
	total: number;
};

const StageBlock = ({ stage, index, total }: StageBlockProps) => {
	const statusConfig = {
		success: 'border-emerald-500/30 bg-emerald-500/10',
		warning: 'border-amber-500/30 bg-amber-500/10',
		danger: 'border-rose-500/30 bg-rose-500/10',
	};

	const widthPercentage = 100 - index * 15;

	return (
		<div className="relative">
			<div
				className={`mx-auto rounded-lg border p-4 ${statusConfig[stage.status]}`}
				style={{ width: `${widthPercentage}%` }}
			>
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium">{stage.name}</p>
						<p className="text-sm text-muted-foreground">
							{stage.avgTime} avg time
						</p>
					</div>
					<div className="text-right">
						<p className="text-2xl font-bold">{stage.count.toLocaleString()}</p>
						<p className="text-sm text-muted-foreground">{stage.percentage}%</p>
					</div>
				</div>
			</div>
			{index < total - 1 && <div className="mx-auto h-4 w-px bg-border/50" />}
		</div>
	);
};

export default function Main() {
	const stages: ResolutionStage[] = [
		{
			id: '1',
			name: 'Tickets Opened',
			count: 4250,
			percentage: 100,
			avgTime: '—',
			status: 'success',
		},
		{
			id: '2',
			name: 'First Response',
			count: 4165,
			percentage: 98,
			avgTime: '12 min',
			status: 'success',
		},
		{
			id: '3',
			name: 'Under Investigation',
			count: 3740,
			percentage: 88,
			avgTime: '2.5 hrs',
			status: 'success',
		},
		{
			id: '4',
			name: 'Pending Customer',
			count: 850,
			percentage: 20,
			avgTime: '18 hrs',
			status: 'warning',
		},
		{
			id: '5',
			name: 'Resolved',
			count: 3825,
			percentage: 90,
			avgTime: '4.2 hrs',
			status: 'success',
		},
	];

	const metrics = [
		{
			label: 'Resolution Rate',
			value: '90%',
			icon: CheckCircle,
			color: 'text-emerald-500',
		},
		{
			label: 'Avg Resolution Time',
			value: '4.2 hrs',
			icon: Clock,
			color: 'text-primary',
		},
		{
			label: 'Escalation Rate',
			value: '8.5%',
			icon: AlertTriangle,
			color: 'text-amber-500',
		},
		{
			label: 'Reopened Rate',
			value: '3.2%',
			icon: XCircle,
			color: 'text-rose-500',
		},
	];

	const resolutionBreakdown = [
		{ label: 'First Contact Resolution', value: 62, target: 70 },
		{ label: 'Within SLA', value: 88, target: 95 },
		{ label: 'Customer Satisfaction', value: 94, target: 90 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Headphones className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Support Resolution Funnel
								</CardTitle>
								<CardDescription>
									Ticket lifecycle from open to resolved
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">This Week</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="flex items-center gap-3 p-4">
										<m.icon className={`size-8 ${m.color}`} />
										<div>
											<p className="text-sm text-muted-foreground">{m.label}</p>
											<p className="text-xl font-bold">{m.value}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="space-y-2 py-6">
								{stages.map((s, i) => (
									<StageBlock
										key={s.id}
										stage={s}
										index={i}
										total={stages.length}
									/>
								))}
							</CardContent>
						</Card>
						<div className="grid gap-4 @md:grid-cols-3">
							{resolutionBreakdown.map((r, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<div className="mb-2 flex items-center justify-between">
											<span className="text-sm text-muted-foreground">
												{r.label}
											</span>
											<Badge
												variant="outline"
												className={
													r.value >= r.target
														? 'text-emerald-500'
														: 'text-amber-500'
												}
											>
												Target: {r.target}%
											</Badge>
										</div>
										<div className="flex items-center gap-3">
											<Progress value={r.value} className="h-2 flex-1" />
											<span className="text-lg font-bold">{r.value}%</span>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
