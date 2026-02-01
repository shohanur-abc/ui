import {
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Globe,
	MapPin,
	MoreHorizontal,
	Search,
	ShoppingCart,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

interface RegionCustomer {
	id: string;
	region: string;
	country: string;
	flag: string;
	customers: number;
	revenue: string;
	growth: number;
	conversion: number;
	topProducts: string[];
}

const HeaderWithSearch = ({
	title,
	subtitle,
	searchPlaceholder,
}: {
	title: string;
	subtitle: string;
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-72" />
		</div>
	</div>
);

const MetricCards = ({
	metrics,
}: {
	metrics: {
		label: string;
		value: string;
		icon: React.ElementType;
		change: string;
	}[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
		{metrics.map((metric, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center gap-4 px-4">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<metric.icon className="size-5" />
					</div>
					<div>
						<p className="text-muted-foreground text-sm">{metric.label}</p>
						<div className="flex items-baseline gap-2">
							<p className="text-xl font-bold">{metric.value}</p>
							<span className="text-emerald-500 text-xs">{metric.change}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const GrowthIndicator = ({ value }: { value: number }) => {
	const isPositive = value >= 0;
	return (
		<div
			className={`inline-flex items-center gap-0.5 text-sm font-medium ${
				isPositive ? 'text-emerald-500' : 'text-red-500'
			}`}
		>
			<ArrowUpRight className={`size-3.5 ${!isPositive ? 'rotate-90' : ''}`} />
			{Math.abs(value)}%
		</div>
	);
};

const ConversionBar = ({ value }: { value: number }) => (
	<div className="flex items-center gap-2">
		<Progress value={value} className="h-1.5 w-16" />
		<span className="text-muted-foreground text-xs">{value}%</span>
	</div>
);

const RegionRow = ({ region }: { region: RegionCustomer }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<span className="text-2xl">{region.flag}</span>
				<div>
					<p className="font-medium">{region.country}</p>
					<p className="text-muted-foreground text-xs">{region.region}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="text-right font-semibold">
			{region.customers.toLocaleString()}
		</TableCell>
		<TableCell className="text-right font-semibold">{region.revenue}</TableCell>
		<TableCell className="hidden @md:table-cell text-right">
			<GrowthIndicator value={region.growth} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<ConversionBar value={region.conversion} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="flex flex-wrap gap-1">
				{region.topProducts.slice(0, 2).map((product, i) => (
					<Badge key={i} variant="secondary" className="text-xs">
						{product}
					</Badge>
				))}
			</div>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View customers</DropdownMenuItem>
					<DropdownMenuItem>View analytics</DropdownMenuItem>
					<DropdownMenuItem>Export data</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const TablePagination = ({
	showing,
	total,
}: {
	showing: string;
	total: number;
}) => (
	<div className="flex items-center justify-between border-t px-4 py-4">
		<p className="text-muted-foreground text-sm">
			Showing {showing} of {total} regions
		</p>
		<div className="flex items-center gap-1">
			<Button variant="outline" size="icon-sm">
				<ChevronLeft className="size-4" />
			</Button>
			<Button variant="outline" size="icon-sm">
				<ChevronRight className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const metrics = [
		{ label: 'Total Regions', value: '24', icon: Globe, change: '+3' },
		{ label: 'Total Customers', value: '45.2K', icon: Users, change: '+12%' },
		{ label: 'Avg. Revenue', value: '$892', icon: TrendingUp, change: '+8%' },
		{ label: 'Conversion', value: '4.2%', icon: ShoppingCart, change: '+0.5%' },
	];

	const regions: RegionCustomer[] = [
		{
			id: '1',
			region: 'North America',
			country: 'United States',
			flag: '🇺🇸',
			customers: 12450,
			revenue: '$2.4M',
			growth: 15,
			conversion: 5.2,
			topProducts: ['Electronics', 'Fashion'],
		},
		{
			id: '2',
			region: 'Europe',
			country: 'United Kingdom',
			flag: '🇬🇧',
			customers: 8920,
			revenue: '$1.8M',
			growth: 12,
			conversion: 4.8,
			topProducts: ['Home', 'Beauty'],
		},
		{
			id: '3',
			region: 'Europe',
			country: 'Germany',
			flag: '🇩🇪',
			customers: 7560,
			revenue: '$1.5M',
			growth: 8,
			conversion: 4.5,
			topProducts: ['Electronics', 'Sports'],
		},
		{
			id: '4',
			region: 'Asia Pacific',
			country: 'Japan',
			flag: '🇯🇵',
			customers: 6780,
			revenue: '$1.2M',
			growth: 22,
			conversion: 3.9,
			topProducts: ['Fashion', 'Tech'],
		},
		{
			id: '5',
			region: 'Asia Pacific',
			country: 'Australia',
			flag: '🇦🇺',
			customers: 4230,
			revenue: '$890K',
			growth: -3,
			conversion: 4.1,
			topProducts: ['Sports', 'Outdoor'],
		},
		{
			id: '6',
			region: 'North America',
			country: 'Canada',
			flag: '🇨🇦',
			customers: 3890,
			revenue: '$780K',
			growth: 10,
			conversion: 4.6,
			topProducts: ['Electronics', 'Home'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<HeaderWithSearch
					title="Geographic Analytics"
					subtitle="Customer distribution by region and country"
					searchPlaceholder="Search regions..."
				/>

				<MetricCards metrics={metrics} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Country</TableHead>
								<TableHead className="text-right">Customers</TableHead>
								<TableHead className="text-right">Revenue</TableHead>
								<TableHead className="hidden @md:table-cell text-right">
									Growth
								</TableHead>
								<TableHead className="hidden @lg:table-cell">
									Conversion
								</TableHead>
								<TableHead className="hidden @xl:table-cell">
									Top Products
								</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{regions.map((region) => (
								<RegionRow key={region.id} region={region} />
							))}
						</TableBody>
					</Table>
					<TablePagination showing="1-6" total={24} />
				</div>
			</div>
		</section>
	);
}
