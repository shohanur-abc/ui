'use client';

import {
	RotateCcw,
	Package,
	Search,
	FileCheck,
	Truck,
	Wallet,
	TrendingDown,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ReturnStage = {
	id: string;
	name: string;
	icon: React.ElementType;
	count: number;
	percentage: number;
	value: string;
	timeframe: string;
};

type StageCardProps = {
	stage: ReturnStage;
	prevCount: number;
};

const StageCard = ({ stage, prevCount }: StageCardProps) => {
	const Icon = stage.icon;
	const dropoffRate =
		prevCount > 0
			? Math.round(((prevCount - stage.count) / prevCount) * 100)
			: 0;

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-5 text-primary" />
					</div>
					{dropoffRate > 0 && (
						<Badge variant="outline" className="text-emerald-500">
							<TrendingDown className="mr-1 size-3" />-{dropoffRate}%
						</Badge>
					)}
				</div>
				<div className="mt-3">
					<p className="text-sm text-muted-foreground">{stage.name}</p>
					<p className="text-2xl font-bold">{stage.count.toLocaleString()}</p>
					<div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
						<span>{stage.value}</span>
						<span>{stage.timeframe}</span>
					</div>
				</div>
				<div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/30">
					<div
						className="h-full rounded-full bg-primary/70"
						style={{ width: `${stage.percentage}%` }}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const stages: ReturnStage[] = [
		{
			id: '1',
			name: 'Return Requested',
			icon: RotateCcw,
			count: 1250,
			percentage: 100,
			value: '$156,250',
			timeframe: 'Instant',
		},
		{
			id: '2',
			name: 'Return Approved',
			icon: FileCheck,
			count: 1125,
			percentage: 90,
			value: '$140,625',
			timeframe: '< 24 hrs',
		},
		{
			id: '3',
			name: 'Item Shipped',
			icon: Truck,
			count: 1012,
			percentage: 81,
			value: '$126,500',
			timeframe: '2-3 days',
		},
		{
			id: '4',
			name: 'Item Received',
			icon: Package,
			count: 988,
			percentage: 79,
			value: '$123,500',
			timeframe: '5-7 days',
		},
		{
			id: '5',
			name: 'Inspection Done',
			icon: Search,
			count: 965,
			percentage: 77,
			value: '$120,625',
			timeframe: '1-2 days',
		},
		{
			id: '6',
			name: 'Refund Issued',
			icon: Wallet,
			count: 940,
			percentage: 75,
			value: '$117,500',
			timeframe: '< 24 hrs',
		},
	];

	const metrics = [
		{ label: 'Total Returns', value: '1,250', subtext: 'This month' },
		{ label: 'Approval Rate', value: '90%', subtext: 'Above target' },
		{ label: 'Completion Rate', value: '75%', subtext: '940 refunded' },
		{ label: 'Avg Processing', value: '9.2 days', subtext: 'End-to-end' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<RotateCcw className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Return Process Funnel
								</CardTitle>
								<CardDescription>
									End-to-end return and refund processing
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">Last 30 Days</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{m.label}</p>
										<p className="mt-1 text-2xl font-bold">{m.value}</p>
										<p className="text-xs text-muted-foreground">{m.subtext}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
							{stages.map((s, i) => (
								<StageCard
									key={s.id}
									stage={s}
									prevCount={i > 0 ? stages[i - 1].count : s.count}
								/>
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="flex flex-col gap-4 @md:flex-row @md:items-center @md:justify-between">
									<div>
										<p className="font-medium">Pending Returns</p>
										<p className="text-sm text-muted-foreground">
											310 returns in progress
										</p>
									</div>
									<div className="flex gap-6">
										<div>
											<p className="text-sm text-muted-foreground">
												Awaiting Shipment
											</p>
											<p className="text-lg font-bold">113</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												In Transit
											</p>
											<p className="text-lg font-bold">24</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Under Inspection
											</p>
											<p className="text-lg font-bold">23</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Processing Refund
											</p>
											<p className="text-lg font-bold">25</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
