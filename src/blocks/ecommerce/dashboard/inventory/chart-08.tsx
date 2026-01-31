'use client';

import * as React from 'react';
import {
	Package,
	Calendar,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type DataPoint = {
	label: string;
	incoming: number;
	outgoing: number;
};

type DualBarChartProps = {
	data: DataPoint[];
};

const DualBarChart = ({ data }: DualBarChartProps) => {
	const maxValue = Math.max(...data.flatMap((d) => [d.incoming, d.outgoing]));

	return (
		<div className="space-y-4">
			<div className="flex gap-6 text-sm">
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-primary" />
					<span className="text-muted-foreground">Incoming</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-emerald-500" />
					<span className="text-muted-foreground">Outgoing</span>
				</div>
			</div>
			<div className="space-y-3">
				{data.map((point, index) => {
					const incomingWidth = (point.incoming / maxValue) * 100;
					const outgoingWidth = (point.outgoing / maxValue) * 100;

					return (
						<div key={index} className="grid grid-cols-[80px_1fr] gap-4 items-center">
							<span className="text-sm font-medium">{point.label}</span>
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
										<div
											className="absolute inset-y-0 left-0 bg-primary rounded transition-all"
											style={{ width: `${incomingWidth}%` }}
										/>
									</div>
									<span className="w-16 text-right text-sm tabular-nums">{point.incoming.toLocaleString()}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
										<div
											className="absolute inset-y-0 left-0 bg-emerald-500 rounded transition-all"
											style={{ width: `${outgoingWidth}%` }}
										/>
									</div>
									<span className="w-16 text-right text-sm tabular-nums">{point.outgoing.toLocaleString()}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

type SummaryProps = {
	totalIncoming: number;
	totalOutgoing: number;
};

const Summary = ({ totalIncoming, totalOutgoing }: SummaryProps) => {
	const netChange = totalIncoming - totalOutgoing;

	return (
		<div className="grid gap-4 @sm:grid-cols-3">
			<div className="rounded-lg border p-4">
				<div className="flex items-center gap-2">
					<TrendingUp className="size-5 text-primary" />
					<span className="text-sm text-muted-foreground">Total Incoming</span>
				</div>
				<p className="mt-2 text-2xl font-bold">{totalIncoming.toLocaleString()}</p>
			</div>
			<div className="rounded-lg border p-4">
				<div className="flex items-center gap-2">
					<TrendingDown className="size-5 text-emerald-500" />
					<span className="text-sm text-muted-foreground">Total Outgoing</span>
				</div>
				<p className="mt-2 text-2xl font-bold">{totalOutgoing.toLocaleString()}</p>
			</div>
			<div className={`rounded-lg border p-4 ${netChange >= 0 ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-destructive/30 bg-destructive/5'}`}>
				<div className="flex items-center gap-2">
					<Package className={`size-5 ${netChange >= 0 ? 'text-emerald-500' : 'text-destructive'}`} />
					<span className="text-sm text-muted-foreground">Net Change</span>
				</div>
				<p className={`mt-2 text-2xl font-bold ${netChange >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
					{netChange >= 0 ? '+' : ''}{netChange.toLocaleString()}
				</p>
			</div>
		</div>
	);
};

export default function Main() {
	const [period, setPeriod] = React.useState('week');

	const data: DataPoint[] = [
		{ label: 'Mon', incoming: 1250, outgoing: 980 },
		{ label: 'Tue', incoming: 890, outgoing: 1120 },
		{ label: 'Wed', incoming: 1450, outgoing: 1380 },
		{ label: 'Thu', incoming: 2100, outgoing: 1650 },
		{ label: 'Fri', incoming: 1780, outgoing: 2100 },
		{ label: 'Sat', incoming: 650, outgoing: 890 },
		{ label: 'Sun', incoming: 320, outgoing: 420 },
	];

	const totalIncoming = data.reduce((sum, d) => sum + d.incoming, 0);
	const totalOutgoing = data.reduce((sum, d) => sum + d.outgoing, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Stock Flow</CardTitle>
								<CardDescription>Incoming vs outgoing inventory</CardDescription>
							</div>
							<Select value={period} onValueChange={setPeriod}>
								<SelectTrigger className="w-32">
									<Calendar className="mr-2 size-4" />
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="week">This Week</SelectItem>
									<SelectItem value="month">This Month</SelectItem>
									<SelectItem value="quarter">This Quarter</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary totalIncoming={totalIncoming} totalOutgoing={totalOutgoing} />
						<DualBarChart data={data} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
