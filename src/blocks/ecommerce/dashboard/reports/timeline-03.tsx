'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceLine,
} from 'recharts';
import { Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type InventoryData = {
	week: string;
	inbound: number;
	outbound: number;
	netChange: number;
};

const chartConfig: ChartConfig = {
	inbound: {
		label: 'Inbound',
		color: 'var(--chart-1)',
	},
	outbound: {
		label: 'Outbound',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const chartData: InventoryData[] = [
		{ week: 'W1', inbound: 4500, outbound: 3800, netChange: 700 },
		{ week: 'W2', inbound: 3200, outbound: 4200, netChange: -1000 },
		{ week: 'W3', inbound: 5800, outbound: 4500, netChange: 1300 },
		{ week: 'W4', inbound: 4200, outbound: 5100, netChange: -900 },
		{ week: 'W5', inbound: 6200, outbound: 4800, netChange: 1400 },
		{ week: 'W6', inbound: 3800, outbound: 4600, netChange: -800 },
		{ week: 'W7', inbound: 5500, outbound: 5200, netChange: 300 },
		{ week: 'W8', inbound: 4800, outbound: 4400, netChange: 400 },
	];

	const weeklyData = chartData.map((d) => ({
		...d,
		inboundStr: d.inbound.toLocaleString(),
		outboundStr: d.outbound.toLocaleString(),
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Package className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Inventory Movement Timeline
								</CardTitle>
								<CardDescription>
									Weekly inbound and outbound stock movements
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">Last 8 Weeks</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="week"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar
									dataKey="inbound"
									fill="var(--color-inbound)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="outbound"
									fill="var(--color-outbound)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ChartContainer>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Week</TableHead>
												<TableHead className="text-right">Inbound</TableHead>
												<TableHead className="text-right">Outbound</TableHead>
												<TableHead className="text-right">Net Change</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{weeklyData.map((d, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														{d.week}
													</TableCell>
													<TableCell className="text-right text-emerald-500">
														+{d.inboundStr}
													</TableCell>
													<TableCell className="text-right text-rose-500">
														-{d.outboundStr}
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className={
																d.netChange >= 0
																	? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
																	: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
															}
														>
															{d.netChange >= 0 ? (
																<ArrowUpRight className="mr-1 size-3" />
															) : (
																<ArrowDownRight className="mr-1 size-3" />
															)}
															{d.netChange >= 0 ? '+' : ''}
															{d.netChange.toLocaleString()}
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
