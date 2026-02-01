'use client';

import * as React from 'react';
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	Target,
	Clock,
	Calendar,
	Download,
	Filter,
	ChevronDown,
	ChevronUp,
	AlertCircle,
	CheckCircle2,
	ArrowUp,
	ArrowDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface KPICardProps {
	label: string;
	value: string;
	target: string;
	progress: number;
	trend: number;
	status: 'on-track' | 'at-risk' | 'off-track';
}

const KPICard = ({
	label,
	value,
	target,
	progress,
	trend,
	status,
}: KPICardProps) => {
	const statusConfig = {
		'on-track': {
			color: 'text-emerald-500',
			bg: 'bg-emerald-500',
			icon: CheckCircle2,
		},
		'at-risk': {
			color: 'text-amber-500',
			bg: 'bg-amber-500',
			icon: AlertCircle,
		},
		'off-track': { color: 'text-red-500', bg: 'bg-red-500', icon: AlertCircle },
	};

	const { color, bg, icon: StatusIcon } = statusConfig[status];

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm text-muted-foreground">{label}</span>
				<StatusIcon className={`size-4 ${color}`} />
			</div>
			<p className="text-2xl font-bold">{value}</p>
			<div className="mb-2 mt-1 flex items-center gap-2 text-sm">
				<span className="text-muted-foreground">Target: {target}</span>
				<span className={trend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
					{trend >= 0 ? (
						<ArrowUp className="inline size-3" />
					) : (
						<ArrowDown className="inline size-3" />
					)}
					{Math.abs(trend)}%
				</span>
			</div>
			<div className="space-y-1">
				<div className="flex justify-between text-xs">
					<span>{progress}% of target</span>
				</div>
				<div className="h-2 overflow-hidden rounded-full bg-muted">
					<div
						className={`h-full ${bg}`}
						style={{ width: `${Math.min(progress, 100)}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

interface MetricBreakdownProps {
	title: string;
	breakdown: { name: string; value: number; percent: number }[];
	isOpen: boolean;
	onToggle: () => void;
}

const MetricBreakdown = ({
	title,
	breakdown,
	isOpen,
	onToggle,
}: MetricBreakdownProps) => (
	<Collapsible open={isOpen} onOpenChange={onToggle}>
		<CollapsibleTrigger asChild>
			<button className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-accent">
				<span className="font-medium">{title}</span>
				{isOpen ? (
					<ChevronUp className="size-4 text-muted-foreground" />
				) : (
					<ChevronDown className="size-4 text-muted-foreground" />
				)}
			</button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="space-y-3 rounded-b-lg border-x border-b bg-muted/30 p-4">
				{breakdown.map((item) => (
					<div key={item.name}>
						<div className="mb-1 flex items-center justify-between text-sm">
							<span>{item.name}</span>
							<span className="font-medium">
								${item.value.toLocaleString()}
							</span>
						</div>
						<Progress value={item.percent} className="h-2" />
					</div>
				))}
			</div>
		</CollapsibleContent>
	</Collapsible>
);

interface PerformanceTableProps {
	products: {
		name: string;
		revenue: number;
		target: number;
		status: 'on-track' | 'at-risk' | 'off-track';
		variance: number;
	}[];
}

const PerformanceTable = ({ products }: PerformanceTableProps) => (
	<div className="rounded-lg border bg-card">
		<div className="border-b p-4">
			<h3 className="font-semibold">Product Performance vs Targets</h3>
		</div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product</TableHead>
					<TableHead className="text-right">Revenue</TableHead>
					<TableHead className="text-right">Target</TableHead>
					<TableHead className="text-right">Variance</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.name}>
						<TableCell className="font-medium">{product.name}</TableCell>
						<TableCell className="text-right">
							${product.revenue.toLocaleString()}
						</TableCell>
						<TableCell className="text-right">
							${product.target.toLocaleString()}
						</TableCell>
						<TableCell className="text-right">
							<span
								className={
									product.variance >= 0 ? 'text-emerald-500' : 'text-red-500'
								}
							>
								{product.variance >= 0 ? '+' : ''}
								{product.variance}%
							</span>
						</TableCell>
						<TableCell>
							<Badge
								variant="secondary"
								className={
									product.status === 'on-track'
										? 'bg-emerald-500/10 text-emerald-500'
										: product.status === 'at-risk'
											? 'bg-amber-500/10 text-amber-500'
											: 'bg-red-500/10 text-red-500'
								}
							>
								{product.status.replace('-', ' ')}
							</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

export default function Main() {
	const [period, setPeriod] = React.useState('month');
	const [openBreakdown, setOpenBreakdown] = React.useState<string | null>(null);

	const kpis = [
		{
			label: 'Total Revenue',
			value: '$125,450',
			target: '$150,000',
			progress: 83,
			trend: 15.2,
			status: 'at-risk' as const,
		},
		{
			label: 'Units Sold',
			value: '1,234',
			target: '1,500',
			progress: 82,
			trend: 8.5,
			status: 'at-risk' as const,
		},
		{
			label: 'Avg Order Value',
			value: '$98.50',
			target: '$100',
			progress: 98,
			trend: 3.2,
			status: 'on-track' as const,
		},
		{
			label: 'Conversion Rate',
			value: '3.2%',
			target: '3.5%',
			progress: 91,
			trend: -2.1,
			status: 'on-track' as const,
		},
	];

	const breakdowns = [
		{
			title: 'Revenue by Category',
			breakdown: [
				{ name: 'Electronics', value: 45000, percent: 36 },
				{ name: 'Clothing', value: 35000, percent: 28 },
				{ name: 'Home & Garden', value: 25450, percent: 20 },
				{ name: 'Sports', value: 20000, percent: 16 },
			],
		},
		{
			title: 'Revenue by Channel',
			breakdown: [
				{ name: 'Direct', value: 62725, percent: 50 },
				{ name: 'Marketplace', value: 37635, percent: 30 },
				{ name: 'Wholesale', value: 25090, percent: 20 },
			],
		},
	];

	const products = [
		{
			name: 'Premium Headphones',
			revenue: 45678,
			target: 40000,
			status: 'on-track' as const,
			variance: 14.2,
		},
		{
			name: 'Sport Earbuds',
			revenue: 28500,
			target: 35000,
			status: 'at-risk' as const,
			variance: -18.6,
		},
		{
			name: 'Studio Monitor',
			revenue: 18900,
			target: 20000,
			status: 'at-risk' as const,
			variance: -5.5,
		},
		{
			name: 'Gaming Headset',
			revenue: 15000,
			target: 25000,
			status: 'off-track' as const,
			variance: -40,
		},
		{
			name: 'Travel Case',
			revenue: 17372,
			target: 15000,
			status: 'on-track' as const,
			variance: 15.8,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Target className="size-5" />
						<h2 className="text-xl font-semibold">Performance Report</h2>
					</div>
					<div className="flex items-center gap-2">
						<Select value={period} onValueChange={setPeriod}>
							<SelectTrigger className="w-36">
								<Calendar className="mr-2 size-4" />
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="week">This Week</SelectItem>
								<SelectItem value="month">This Month</SelectItem>
								<SelectItem value="quarter">This Quarter</SelectItem>
								<SelectItem value="year">This Year</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" className="gap-2">
							<Download className="size-4" />
							Export
						</Button>
					</div>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{kpis.map((kpi) => (
						<KPICard key={kpi.label} {...kpi} />
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<div className="space-y-3">
						{breakdowns.map((b) => (
							<MetricBreakdown
								key={b.title}
								title={b.title}
								breakdown={b.breakdown}
								isOpen={openBreakdown === b.title}
								onToggle={() =>
									setOpenBreakdown(openBreakdown === b.title ? null : b.title)
								}
							/>
						))}
					</div>
					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-4 font-semibold">Goal Progress</h3>
						<div className="flex h-48 items-center justify-center rounded-lg bg-muted/30">
							<BarChart3 className="size-12 text-muted-foreground" />
						</div>
					</div>
				</div>

				<PerformanceTable products={products} />
			</div>
		</section>
	);
}
