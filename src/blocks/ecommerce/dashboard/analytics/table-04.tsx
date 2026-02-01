'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

type TrafficSource = {
	source: string;
	visitors: number;
	percentage: number;
	bounceRate: number;
	avgDuration: string;
	trend: number;
};

const SourceRow = ({ source }: { source: TrafficSource }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell className="font-medium">{source.source}</TableCell>
		<TableCell>
			<div className="flex items-center gap-2">
				<span>{source.visitors.toLocaleString()}</span>
				<div className="w-20">
					<Progress value={source.percentage} className="h-1.5" />
				</div>
			</div>
		</TableCell>
		<TableCell>{source.percentage}%</TableCell>
		<TableCell>{source.bounceRate}%</TableCell>
		<TableCell>{source.avgDuration}</TableCell>
		<TableCell>
			<div
				className={`flex items-center gap-1 ${source.trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
			>
				{source.trend >= 0 ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				<span className="text-sm">
					{source.trend >= 0 ? '+' : ''}
					{source.trend}%
				</span>
			</div>
		</TableCell>
	</TableRow>
);

const trafficSources: TrafficSource[] = [
	{
		source: 'Google Search',
		visitors: 45280,
		percentage: 42,
		bounceRate: 32,
		avgDuration: '3m 45s',
		trend: 12.5,
	},
	{
		source: 'Direct',
		visitors: 28450,
		percentage: 26,
		bounceRate: 28,
		avgDuration: '4m 12s',
		trend: 5.2,
	},
	{
		source: 'Facebook',
		visitors: 12890,
		percentage: 12,
		bounceRate: 45,
		avgDuration: '2m 30s',
		trend: -3.8,
	},
	{
		source: 'Twitter',
		visitors: 8920,
		percentage: 8,
		bounceRate: 52,
		avgDuration: '1m 45s',
		trend: 8.4,
	},
	{
		source: 'Email',
		visitors: 6540,
		percentage: 6,
		bounceRate: 22,
		avgDuration: '5m 20s',
		trend: 15.2,
	},
	{
		source: 'Referral',
		visitors: 6120,
		percentage: 6,
		bounceRate: 38,
		avgDuration: '3m 10s',
		trend: -1.2,
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Traffic Sources
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Visitor acquisition channels
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Source</TableHead>
										<TableHead>Visitors</TableHead>
										<TableHead>Share</TableHead>
										<TableHead>Bounce Rate</TableHead>
										<TableHead>Avg. Duration</TableHead>
										<TableHead>Trend</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{trafficSources.map((source, i) => (
										<SourceRow key={i} source={source} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
