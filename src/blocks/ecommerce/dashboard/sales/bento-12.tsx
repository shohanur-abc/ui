'use client';

import { Filter, ArrowUpDown, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type FilterOption = {
	label: string;
	value: string;
	active: boolean;
};

type DataRow = {
	name: string;
	value: number;
	change: number;
	progress: number;
	status: 'up' | 'down' | 'stable';
};

type BentoLayout12Props = {
	title: string;
	description: string;
	filters: FilterOption[];
	data: DataRow[];
	onFilterChange: (value: string) => void;
	onExport: () => void;
};

const FilterBar = ({ filters, onFilterChange }: { filters: FilterOption[]; onFilterChange: (value: string) => void }) => (
	<div className="flex flex-wrap gap-2">
		{filters.map((filter, idx) => (
			<Button
				key={idx}
				variant={filter.active ? 'default' : 'outline'}
				size="sm"
				onClick={() => onFilterChange(filter.value)}
			>
				{filter.label}
			</Button>
		))}
	</div>
);

const DataCard = ({ data }: { data: DataRow[] }) => (
	<div className="space-y-4">
		{data.map((row, idx) => (
			<div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{row.name}</p>
					<div className="flex items-center gap-2 mt-1">
						<Progress value={row.progress} className="h-1.5 w-24" />
						<span className="text-xs text-muted-foreground">{row.progress}%</span>
					</div>
				</div>
				<div className="text-right">
					<p className="text-lg font-bold">${row.value.toLocaleString()}</p>
					<Badge
						variant={row.status === 'up' ? 'default' : row.status === 'down' ? 'destructive' : 'secondary'}
						className="text-xs"
					>
						{row.change >= 0 ? '+' : ''}{row.change}%
					</Badge>
				</div>
			</div>
		))}
	</div>
);

const BentoLayout12 = ({
	title,
	description,
	filters,
	data,
	onFilterChange,
	onExport,
}: BentoLayout12Props) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader>
			<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
				<div>
					<CardTitle className="text-lg font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="gap-1">
						<Calendar className="size-4" />
						<span className="hidden @sm:inline">Date Range</span>
					</Button>
					<Button variant="outline" size="sm" className="gap-1" onClick={onExport}>
						<Download className="size-4" />
						<span className="hidden @sm:inline">Export</span>
					</Button>
				</div>
			</div>
			<div className="mt-4">
				<FilterBar filters={filters} onFilterChange={onFilterChange} />
			</div>
		</CardHeader>
		<CardContent>
			<DataCard data={data} />
		</CardContent>
	</Card>
);

export default function Main() {
	const filters: FilterOption[] = [
		{ label: 'All', value: 'all', active: true },
		{ label: 'Electronics', value: 'electronics', active: false },
		{ label: 'Clothing', value: 'clothing', active: false },
		{ label: 'Home', value: 'home', active: false },
		{ label: 'Sports', value: 'sports', active: false },
	];

	const data: DataRow[] = [
		{ name: 'Wireless Headphones Pro', value: 248750, change: 12.5, progress: 85, status: 'up' },
		{ name: 'Smart Watch Ultra', value: 198600, change: 8.3, progress: 72, status: 'up' },
		{ name: 'Premium Laptop Stand', value: 165900, change: -2.1, progress: 58, status: 'down' },
		{ name: 'USB-C Hub Professional', value: 142800, change: 15.7, progress: 48, status: 'up' },
		{ name: 'Mechanical Keyboard RGB', value: 107280, change: 0, progress: 35, status: 'stable' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout12
					title="Sales by Product"
					description="Revenue breakdown by top products"
					filters={filters}
					data={data}
					onFilterChange={(value) => console.log('Filter:', value)}
					onExport={() => console.log('Export')}
				/>
			</div>
		</section>
	);
}
