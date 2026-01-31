'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	AlertTriangle,
	CheckCircle,
	XCircle,
	RefreshCw,
	ArrowUpRight,
	ArrowDownRight,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type HealthMetric = {
	id: string;
	name: string;
	value: number;
	target: number;
	status: 'good' | 'warning' | 'critical';
	change: number;
	description: string;
};

type MetricCardProps = {
	metric: HealthMetric;
};

const MetricCard = ({ metric }: MetricCardProps) => {
	const statusConfig = {
		good: { icon: <CheckCircle className="size-5 text-emerald-500" />, color: 'bg-emerald-500' },
		warning: { icon: <AlertTriangle className="size-5 text-amber-500" />, color: 'bg-amber-500' },
		critical: { icon: <XCircle className="size-5 text-destructive" />, color: 'bg-destructive' },
	};

	const { icon, color } = statusConfig[metric.status];
	const progress = Math.min((metric.value / metric.target) * 100, 100);

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					{icon}
					<Badge variant={metric.change >= 0 ? 'default' : 'destructive'} className="flex items-center gap-1">
						{metric.change >= 0 ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{Math.abs(metric.change)}%
					</Badge>
				</div>
				<div className="mt-4">
					<p className="text-sm font-medium">{metric.name}</p>
					<p className="text-2xl font-bold">{metric.value}%</p>
				</div>
				<div className="mt-4 space-y-2">
					<div className="flex justify-between text-xs">
						<span className="text-muted-foreground">Progress to target</span>
						<span className="font-medium">{metric.target}%</span>
					</div>
					<Progress value={progress} className="h-2" indicatorClassName={color} />
				</div>
				<p className="mt-3 text-xs text-muted-foreground">{metric.description}</p>
			</CardContent>
		</Card>
	);
};

type OverallScoreProps = {
	score: number;
};

const OverallScore = ({ score }: OverallScoreProps) => {
	const circumference = 2 * Math.PI * 45;
	const offset = circumference - (score / 100) * circumference;

	const getColor = (score: number) => {
		if (score >= 80) return 'stroke-emerald-500';
		if (score >= 60) return 'stroke-amber-500';
		return 'stroke-destructive';
	};

	return (
		<div className="flex items-center justify-center">
			<div className="relative">
				<svg className="size-40 -rotate-90">
					<circle
						cx="80"
						cy="80"
						r="45"
						fill="none"
						className="stroke-muted"
						strokeWidth="10"
					/>
					<circle
						cx="80"
						cy="80"
						r="45"
						fill="none"
						className={getColor(score)}
						strokeWidth="10"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-3xl font-bold">{score}</span>
					<span className="text-sm text-muted-foreground">Health Score</span>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const metrics: HealthMetric[] = [
		{ id: '1', name: 'Stock Accuracy', value: 94, target: 98, status: 'warning', change: 2.3, description: 'Physical vs system match rate' },
		{ id: '2', name: 'Fill Rate', value: 87, target: 95, status: 'warning', change: -1.5, description: 'Orders fulfilled from stock' },
		{ id: '3', name: 'Carrying Cost Ratio', value: 22, target: 25, status: 'good', change: 4.2, description: 'Inventory holding costs' },
		{ id: '4', name: 'Stockout Rate', value: 3, target: 2, status: 'critical', change: -15, description: 'Percentage of stockouts' },
	];

	const overallScore = Math.round(metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Inventory Health</CardTitle>
						<CardDescription>Performance metrics and health indicators</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 @lg:grid-cols-5">
							<div className="flex items-center justify-center @lg:col-span-1">
								<OverallScore score={overallScore} />
							</div>
							<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-4">
								{metrics.map((metric) => (
									<MetricCard key={metric.id} metric={metric} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
