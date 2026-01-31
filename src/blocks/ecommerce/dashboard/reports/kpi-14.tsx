'use client';

import { Clock, MessageCircle, CheckCircle, AlertCircle, ThumbsUp, Headphones } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type SupportMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	target: string;
	progress: number;
	status: 'exceeds' | 'meets' | 'below';
};

const SupportMetric = ({ icon: Icon, label, value, target, progress, status }: SupportMetricProps) => {
	const statusConfig = {
		exceeds: { text: 'Exceeds Target', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
		meets: { text: 'Meets Target', color: 'text-amber-500', bg: 'bg-amber-500/10' },
		below: { text: 'Below Target', color: 'text-rose-500', bg: 'bg-rose-500/10' },
	};

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-5">
				<div className="flex items-center justify-between">
					<div className={`rounded-lg p-2 ${statusConfig[status].bg}`}>
						<Icon className={`size-4 ${statusConfig[status].color}`} />
					</div>
					<span className={`text-xs ${statusConfig[status].color}`}>
						{statusConfig[status].text}
					</span>
				</div>
				<div className="mt-4">
					<p className="text-sm text-muted-foreground">{label}</p>
					<div className="mt-1 flex items-baseline gap-2">
						<span className="text-2xl font-bold">{value}</span>
						<span className="text-xs text-muted-foreground">Target: {target}</span>
					</div>
				</div>
				<Progress value={progress} className="mt-3 h-1.5" />
			</CardContent>
		</Card>
	);
};

type AgentPerformanceProps = {
	name: string;
	tickets: number;
	avgTime: string;
	satisfaction: number;
};

const AgentPerformance = ({ name, tickets, avgTime, satisfaction }: AgentPerformanceProps) => (
	<div className="flex items-center justify-between border-b border-border/30 py-3 last:border-0">
		<div className="flex items-center gap-3">
			<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
				{name.split(' ').map(n => n[0]).join('')}
			</div>
			<span className="font-medium">{name}</span>
		</div>
		<div className="flex items-center gap-6 text-sm">
			<span>{tickets} tickets</span>
			<span>{avgTime}</span>
			<div className="flex items-center gap-1">
				<ThumbsUp className="size-3.5 text-emerald-500" />
				<span className="font-medium">{satisfaction}%</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const metrics: SupportMetricProps[] = [
		{ icon: Clock, label: 'Avg Response Time', value: '2.4 hrs', target: '4 hrs', progress: 100, status: 'exceeds' },
		{ icon: MessageCircle, label: 'Open Tickets', value: '42', target: '<50', progress: 84, status: 'meets' },
		{ icon: CheckCircle, label: 'Resolution Rate', value: '94.2%', target: '95%', progress: 94, status: 'meets' },
		{ icon: AlertCircle, label: 'Escalation Rate', value: '8.5%', target: '<5%', progress: 170, status: 'below' },
		{ icon: ThumbsUp, label: 'CSAT Score', value: '4.6/5', target: '4.5/5', progress: 100, status: 'exceeds' },
		{ icon: Headphones, label: 'Calls Handled', value: '1,842', target: '1,500', progress: 100, status: 'exceeds' },
	];

	const agents: AgentPerformanceProps[] = [
		{ name: 'Sarah Miller', tickets: 145, avgTime: '1.8 hrs', satisfaction: 98 },
		{ name: 'John Smith', tickets: 132, avgTime: '2.1 hrs', satisfaction: 96 },
		{ name: 'Emily Chen', tickets: 128, avgTime: '2.4 hrs', satisfaction: 94 },
		{ name: 'Mike Johnson', tickets: 118, avgTime: '2.8 hrs', satisfaction: 92 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Support KPI Report
						</CardTitle>
						<CardDescription>
							Customer support performance and agent metrics
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{metrics.map((metric, i) => (
								<SupportMetric key={i} {...metric} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Top Performing Agents</CardTitle>
							</CardHeader>
							<CardContent>
								{agents.map((agent, i) => (
									<AgentPerformance key={i} {...agent} />
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
