'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { Users } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type SegmentProps = {
	segment: string;
	customers: string;
	percentage: number;
	revenue: string;
	avgOrder: string;
	color: string;
	description: string;
};

const SegmentCard = ({
	segment,
	customers,
	percentage,
	revenue,
	avgOrder,
	color,
	description,
}: SegmentProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className="size-3 rounded-full"
						style={{ backgroundColor: color }}
					/>
					<span className="font-medium">{segment}</span>
				</div>
				<Badge variant="outline" className="text-xs">
					{percentage}%
				</Badge>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">{description}</p>
			<Progress value={percentage} className="mt-3 h-1.5" />
			<div className="mt-3 grid grid-cols-3 gap-2 text-xs">
				<div>
					<p className="text-muted-foreground">Customers</p>
					<p className="font-medium">{customers}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Revenue</p>
					<p className="font-medium">{revenue}</p>
				</div>
				<div>
					<p className="text-muted-foreground">AOV</p>
					<p className="font-medium">{avgOrder}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	customers: {
		label: 'Customers',
	},
};

export default function Main() {
	const segments: SegmentProps[] = [
		{
			segment: 'VIP',
			customers: '2,450',
			percentage: 8,
			revenue: '$485,200',
			avgOrder: '$198',
			color: 'var(--chart-1)',
			description: 'High-value repeat customers',
		},
		{
			segment: 'Loyal',
			customers: '5,820',
			percentage: 19,
			revenue: '$342,800',
			avgOrder: '$59',
			color: 'var(--chart-2)',
			description: 'Regular purchasers, moderate spend',
		},
		{
			segment: 'Growing',
			customers: '8,450',
			percentage: 28,
			revenue: '$285,400',
			avgOrder: '$34',
			color: 'var(--chart-3)',
			description: 'Increasing purchase frequency',
		},
		{
			segment: 'New',
			customers: '9,200',
			percentage: 30,
			revenue: '$198,200',
			avgOrder: '$22',
			color: 'var(--chart-4)',
			description: 'First-time buyers (< 30 days)',
		},
		{
			segment: 'At Risk',
			customers: '3,180',
			percentage: 10,
			revenue: '$85,400',
			avgOrder: '$27',
			color: 'var(--chart-5)',
			description: 'Decreasing engagement',
		},
		{
			segment: 'Dormant',
			customers: '1,520',
			percentage: 5,
			revenue: '$12,800',
			avgOrder: '$8',
			color: 'var(--muted-foreground)',
			description: 'No purchase in 90+ days',
		},
	];

	const chartData = segments.map((s) => ({
		name: s.segment,
		value: s.percentage,
		fill: s.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Users className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Customer Segment Breakdown
								</CardTitle>
								<CardDescription>
									Distribution and metrics by customer segment
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">30,620 Total Customers</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[300px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={70}
										outerRadius={110}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="grid gap-3 @sm:grid-cols-2">
								{segments.map((s, i) => (
									<SegmentCard key={i} {...s} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
