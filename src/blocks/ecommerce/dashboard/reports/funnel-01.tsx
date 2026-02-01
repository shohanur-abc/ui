'use client';

import {
	ChevronDown,
	ShoppingCart,
	Users,
	MousePointer,
	CreditCard,
	CheckCircle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type FunnelStage = {
	id: string;
	name: string;
	icon: React.ElementType;
	count: number;
	percentage: number;
	dropoff: number;
};

type StageRowProps = {
	stage: FunnelStage;
	maxCount: number;
	isLast: boolean;
};

const StageRow = ({ stage, maxCount, isLast }: StageRowProps) => {
	const widthPercentage = (stage.count / maxCount) * 100;
	const Icon = stage.icon;

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="flex w-40 items-center gap-2 @sm:w-48">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-4 text-primary" />
					</div>
					<span className="text-sm font-medium">{stage.name}</span>
				</div>
				<div className="flex-1">
					<div className="relative h-10 w-full overflow-hidden rounded-lg bg-muted/30">
						<div
							className="absolute inset-y-0 left-0 flex items-center justify-end bg-gradient-to-r from-primary/80 to-primary/60 px-3 transition-all"
							style={{ width: `${widthPercentage}%` }}
						>
							<span className="text-sm font-semibold text-primary-foreground">
								{stage.count.toLocaleString()}
							</span>
						</div>
					</div>
				</div>
				<div className="w-20 text-right">
					<Badge variant="outline">{stage.percentage}%</Badge>
				</div>
			</div>
			{!isLast && (
				<div className="ml-20 flex items-center gap-2 py-2 @sm:ml-24">
					<ChevronDown className="size-4 text-muted-foreground" />
					<span className="text-sm text-rose-500">
						-{stage.dropoff}% dropoff
					</span>
				</div>
			)}
		</>
	);
};

export default function Main() {
	const stages: FunnelStage[] = [
		{
			id: '1',
			name: 'Visitors',
			icon: Users,
			count: 125000,
			percentage: 100,
			dropoff: 58,
		},
		{
			id: '2',
			name: 'Product Views',
			icon: MousePointer,
			count: 52500,
			percentage: 42,
			dropoff: 52,
		},
		{
			id: '3',
			name: 'Add to Cart',
			icon: ShoppingCart,
			count: 25200,
			percentage: 20.2,
			dropoff: 38,
		},
		{
			id: '4',
			name: 'Checkout',
			icon: CreditCard,
			count: 15624,
			percentage: 12.5,
			dropoff: 22,
		},
		{
			id: '5',
			name: 'Purchase',
			icon: CheckCircle,
			count: 12186,
			percentage: 9.75,
			dropoff: 0,
		},
	];

	const maxCount = stages[0].count;

	const metrics = [
		{ label: 'Total Visitors', value: '125K' },
		{ label: 'Conversions', value: '12,186' },
		{ label: 'Conversion Rate', value: '9.75%' },
		{ label: 'Avg Order Value', value: '$127' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<ShoppingCart className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Sales Conversion Funnel
								</CardTitle>
								<CardDescription>
									Visitor journey from landing to purchase
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
									</CardContent>
								</Card>
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="space-y-2 p-6">
								{stages.map((s, i) => (
									<StageRow
										key={s.id}
										stage={s}
										maxCount={maxCount}
										isLast={i === stages.length - 1}
									/>
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
