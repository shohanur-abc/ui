import {
	ArrowRight,
	Calendar,
	ChevronDown,
	Clock,
	DollarSign,
	Download,
	Filter,
	Mail,
	MoreHorizontal,
	Package,
	Percent,
	RefreshCw,
	Search,
	ShoppingCart,
	Tag,
	TrendingDown,
	TrendingUp,
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerRFM {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	recencyDays: number;
	frequency: number;
	monetary: string;
	rfmScore: number;
	segment: 'champions' | 'loyal' | 'potential' | 'new' | 'at-risk' | 'lost';
	trend: 'up' | 'down' | 'stable';
	lastOrder: string;
}

const SegmentSummary = ({
	segments,
}: {
	segments: { name: string; count: number; percentage: number; color: string }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
		{segments.map((segment, i) => (
			<Card key={i} className="py-3">
				<CardContent className="px-4">
					<div className="flex items-center justify-between mb-2">
						<div className={`size-3 rounded-full ${segment.color}`} />
						<span className="text-muted-foreground text-xs">{segment.percentage}%</span>
					</div>
					<p className="text-2xl font-bold">{segment.count}</p>
					<p className="text-muted-foreground text-xs">{segment.name}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const SearchAndFilter = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Filter className="size-4" />
						Segment
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Segments</DropdownMenuItem>
					<DropdownMenuItem>Champions</DropdownMenuItem>
					<DropdownMenuItem>Loyal</DropdownMenuItem>
					<DropdownMenuItem>Potential</DropdownMenuItem>
					<DropdownMenuItem>At Risk</DropdownMenuItem>
					<DropdownMenuItem>Lost</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<RefreshCw className="size-4" />
				Refresh
			</Button>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const SegmentBadge = ({ segment }: { segment: CustomerRFM['segment'] }) => {
	const config = {
		champions: { label: 'Champions', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		loyal: { label: 'Loyal', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		potential: { label: 'Potential', className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
		new: { label: 'New', className: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
		'at-risk': { label: 'At Risk', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		lost: { label: 'Lost', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	return (
		<Badge variant="outline" className={config[segment].className}>
			{config[segment].label}
		</Badge>
	);
};

const RFMScoreBar = ({ score }: { score: number }) => {
	const percentage = (score / 15) * 100;
	return (
		<div className="flex items-center gap-2">
			<Progress value={percentage} className="h-2 w-16" />
			<span className="text-sm font-medium">{score}</span>
		</div>
	);
};

const TrendIcon = ({ trend }: { trend: CustomerRFM['trend'] }) => {
	if (trend === 'up') return <TrendingUp className="size-4 text-emerald-500" />;
	if (trend === 'down') return <TrendingDown className="size-4 text-red-500" />;
	return <ArrowRight className="text-muted-foreground size-4" />;
};

const CustomerRow = ({ customer }: { customer: CustomerRFM }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={customer.customer.avatar} alt={customer.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{customer.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.customer.name}</p>
					<p className="text-muted-foreground text-xs">{customer.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell text-center">
			<div className="flex flex-col items-center">
				<span className="text-lg font-semibold">{customer.recencyDays}</span>
				<span className="text-muted-foreground text-xs">days</span>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell text-center">
			<div className="flex flex-col items-center">
				<span className="text-lg font-semibold">{customer.frequency}</span>
				<span className="text-muted-foreground text-xs">orders</span>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-center font-semibold">
			{customer.monetary}
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<RFMScoreBar score={customer.rfmScore} />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-2">
				<SegmentBadge segment={customer.segment} />
				<TrendIcon trend={customer.trend} />
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{customer.lastOrder}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Mail className="mr-2 size-4" />
						Send campaign
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Tag className="mr-2 size-4" />
						Apply discount
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Package className="mr-2 size-4" />
						View orders
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>View full profile</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const segments = [
		{ name: 'Champions', count: 234, percentage: 12, color: 'bg-emerald-500' },
		{ name: 'Loyal', count: 456, percentage: 24, color: 'bg-blue-500' },
		{ name: 'Potential', count: 312, percentage: 16, color: 'bg-violet-500' },
		{ name: 'New', count: 189, percentage: 10, color: 'bg-cyan-500' },
		{ name: 'At Risk', count: 423, percentage: 22, color: 'bg-amber-500' },
		{ name: 'Lost', count: 298, percentage: 16, color: 'bg-red-500' },
	];

	const customers: CustomerRFM[] = [
		{
			id: '1',
			customer: { name: 'Sophie Turner', email: 'sophie.t@email.com', initials: 'ST' },
			recencyDays: 3,
			frequency: 24,
			monetary: '$4,567',
			rfmScore: 14,
			segment: 'champions',
			trend: 'up',
			lastOrder: '3 days ago',
		},
		{
			id: '2',
			customer: { name: 'James Miller', email: 'james.m@email.com', initials: 'JM' },
			recencyDays: 12,
			frequency: 15,
			monetary: '$2,890',
			rfmScore: 11,
			segment: 'loyal',
			trend: 'stable',
			lastOrder: '12 days ago',
		},
		{
			id: '3',
			customer: { name: 'Emma Wilson', email: 'emma.w@email.com', initials: 'EW' },
			recencyDays: 8,
			frequency: 6,
			monetary: '$890',
			rfmScore: 9,
			segment: 'potential',
			trend: 'up',
			lastOrder: '8 days ago',
		},
		{
			id: '4',
			customer: { name: 'Lucas Brown', email: 'lucas.b@email.com', initials: 'LB' },
			recencyDays: 45,
			frequency: 12,
			monetary: '$1,890',
			rfmScore: 7,
			segment: 'at-risk',
			trend: 'down',
			lastOrder: '45 days ago',
		},
		{
			id: '5',
			customer: { name: 'Olivia Davis', email: 'olivia.d@email.com', initials: 'OD' },
			recencyDays: 120,
			frequency: 5,
			monetary: '$560',
			rfmScore: 4,
			segment: 'lost',
			trend: 'down',
			lastOrder: '4 months ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">RFM Analysis</h1>
					<p className="text-muted-foreground text-sm">
						Customer segmentation by Recency, Frequency, and Monetary value
					</p>
				</div>

				<SegmentSummary segments={segments} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<SearchAndFilter searchPlaceholder="Search customers..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Customer</TableHead>
								<TableHead className="hidden @md:table-cell text-center">
									<div className="flex flex-col items-center">
										<Clock className="size-4 mb-1" />
										<span>Recency</span>
									</div>
								</TableHead>
								<TableHead className="hidden @md:table-cell text-center">
									<div className="flex flex-col items-center">
										<ShoppingCart className="size-4 mb-1" />
										<span>Frequency</span>
									</div>
								</TableHead>
								<TableHead className="hidden @lg:table-cell text-center">
									<div className="flex flex-col items-center">
										<DollarSign className="size-4 mb-1" />
										<span>Monetary</span>
									</div>
								</TableHead>
								<TableHead className="hidden @lg:table-cell">RFM Score</TableHead>
								<TableHead>Segment</TableHead>
								<TableHead className="hidden @xl:table-cell">Last Order</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
