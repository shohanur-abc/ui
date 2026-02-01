'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	ArrowRight,
	ArrowUpRight,
	Calendar,
	Download,
	FileText,
	MoreHorizontal,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ReportSummary = {
	title: string;
	value: string;
	change: string;
	period: string;
};

type ReportRow = {
	id: string;
	name: string;
	type: 'sales' | 'inventory' | 'customers' | 'analytics' | 'finance';
	period: string;
	generated: string;
	status: 'ready' | 'generating' | 'scheduled';
	size: string;
};

const ReportSummaryCard = ({ title, value, change, period }: ReportSummary) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">{title}</p>
				<Badge
					variant="secondary"
					className="bg-emerald-500/10 text-emerald-500 text-xs"
				>
					<ArrowUpRight className="mr-1 size-3" />
					{change}
				</Badge>
			</div>
			<p className="mt-2 text-2xl font-bold">{value}</p>
			<p className="mt-1 text-xs text-muted-foreground">{period}</p>
		</CardContent>
	</Card>
);

const getTypeBadge = (type: ReportRow['type']) => {
	switch (type) {
		case 'sales':
			return 'bg-primary/10 text-primary';
		case 'inventory':
			return 'bg-amber-500/10 text-amber-500';
		case 'customers':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'analytics':
			return 'bg-blue-500/10 text-blue-500';
		case 'finance':
			return 'bg-purple-500/10 text-purple-500';
	}
};

const getStatusBadge = (status: ReportRow['status']) => {
	switch (status) {
		case 'ready':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'generating':
			return 'bg-amber-500/10 text-amber-500';
		case 'scheduled':
			return 'bg-muted text-muted-foreground';
	}
};

const chartConfig: ChartConfig = {
	value: { label: 'Reports', color: 'var(--chart-1)' },
};

export default function Main() {
	const summaries: ReportSummary[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28%',
			period: 'This month',
		},
		{
			title: 'Orders Processed',
			value: '6,842',
			change: '+22%',
			period: 'This month',
		},
		{
			title: 'Avg Order Value',
			value: '$36.33',
			change: '+5%',
			period: 'vs last month',
		},
		{
			title: 'Customer Growth',
			value: '+234',
			change: '+18%',
			period: 'New customers',
		},
	];

	const reports: ReportRow[] = [
		{
			id: 'RPT-001',
			name: 'Monthly Sales Report',
			type: 'sales',
			period: 'December 2024',
			generated: 'Dec 12, 2024',
			status: 'ready',
			size: '2.4 MB',
		},
		{
			id: 'RPT-002',
			name: 'Inventory Status Report',
			type: 'inventory',
			period: 'December 2024',
			generated: 'Dec 12, 2024',
			status: 'ready',
			size: '1.8 MB',
		},
		{
			id: 'RPT-003',
			name: 'Customer Analytics',
			type: 'customers',
			period: 'Q4 2024',
			generated: 'Dec 11, 2024',
			status: 'ready',
			size: '3.2 MB',
		},
		{
			id: 'RPT-004',
			name: 'Traffic & Conversion',
			type: 'analytics',
			period: 'December 2024',
			generated: 'Generating...',
			status: 'generating',
			size: '-',
		},
		{
			id: 'RPT-005',
			name: 'Financial Summary',
			type: 'finance',
			period: 'November 2024',
			generated: 'Dec 01, 2024',
			status: 'ready',
			size: '4.1 MB',
		},
		{
			id: 'RPT-006',
			name: 'Weekly Sales Report',
			type: 'sales',
			period: 'Week 50, 2024',
			generated: 'Dec 15, 2024',
			status: 'scheduled',
			size: '-',
		},
	];

	const chartData = [
		{ month: 'Jul', value: 12 },
		{ month: 'Aug', value: 15 },
		{ month: 'Sep', value: 18 },
		{ month: 'Oct', value: 22 },
		{ month: 'Nov', value: 19 },
		{ month: 'Dec', value: 24 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{summaries.map((item, i) => (
							<ReportSummaryCard key={i} {...item} />
						))}
					</div>
					<div className="grid gap-6 @xl:grid-cols-3">
						<Card className="@xl:col-span-2">
							<CardHeader className="flex-row items-center justify-between pb-4">
								<CardTitle className="text-base">Available Reports</CardTitle>
								<Button variant="ghost" size="sm" className="gap-1" asChild>
									<Link href="/reports">
										View All
										<ArrowRight className="size-3" />
									</Link>
								</Button>
							</CardHeader>
							<CardContent className="pt-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Report</TableHead>
											<TableHead>Type</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Period
											</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Generated
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{reports.map((report) => (
											<TableRow key={report.id}>
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="rounded-lg bg-muted p-2">
															<FileText className="size-4 text-muted-foreground" />
														</div>
														<div>
															<p className="font-medium">{report.name}</p>
															<p className="text-xs text-muted-foreground">
																{report.size}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant="secondary"
														className={getTypeBadge(report.type)}
													>
														{report.type}
													</Badge>
												</TableCell>
												<TableCell className="hidden @lg:table-cell text-muted-foreground">
													{report.period}
												</TableCell>
												<TableCell className="hidden @xl:table-cell text-muted-foreground">
													{report.generated}
												</TableCell>
												<TableCell>
													<Badge
														variant="secondary"
														className={getStatusBadge(report.status)}
													>
														{report.status}
													</Badge>
												</TableCell>
												<TableCell>
													{report.status === 'ready' && (
														<Button
															variant="ghost"
															size="icon"
															className="size-8"
														>
															<Download className="size-4" />
														</Button>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Reports Generated</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={chartConfig}
									className="h-[280px] w-full"
								>
									<BarChart data={chartData}>
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<YAxis tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Bar
											dataKey="value"
											fill="var(--color-value)"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
