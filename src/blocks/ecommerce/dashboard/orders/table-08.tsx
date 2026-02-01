import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Calendar,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Package,
	ShoppingCart,
	Users,
} from 'lucide-react';

interface Order {
	id: string;
	items: number;
	revenue: string;
	margin: string;
	marginPercent: number;
	trend: 'up' | 'down';
	channel: string;
}

interface StatCardProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
}

interface PeriodSelectorProps {
	options: { value: string; label: string }[];
	defaultValue: string;
}

const StatCard = ({
	icon: Icon,
	label,
	value,
	change,
	trend,
}: StatCardProps) => (
	<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="p-2.5 rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
		<Badge
			variant="outline"
			className={
				trend === 'up'
					? 'text-accent border-accent/30 bg-accent/10'
					: 'text-destructive border-destructive/30 bg-destructive/10'
			}
		>
			{trend === 'up' ? (
				<TrendingUp className="size-3 mr-1" />
			) : (
				<TrendingDown className="size-3 mr-1" />
			)}
			{change}
		</Badge>
	</div>
);

const PeriodSelector = ({ options, defaultValue }: PeriodSelectorProps) => (
	<Select defaultValue={defaultValue}>
		<SelectTrigger className="w-40 bg-muted/50">
			<Calendar className="size-4 mr-2" />
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			{options.map((option) => (
				<SelectItem key={option.value} value={option.value}>
					{option.label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

const MarginCell = ({
	margin,
	marginPercent,
	trend,
}: {
	margin: string;
	marginPercent: number;
	trend: Order['trend'];
}) => (
	<div className="flex items-center gap-2">
		<span className="font-medium">{margin}</span>
		<span
			className={`text-xs ${trend === 'up' ? 'text-accent' : 'text-destructive'}`}
		>
			({marginPercent}%)
		</span>
	</div>
);

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell className="text-center">{order.items}</TableCell>
		<TableCell className="font-semibold">{order.revenue}</TableCell>
		<TableCell>
			<MarginCell
				margin={order.margin}
				marginPercent={order.marginPercent}
				trend={order.trend}
			/>
		</TableCell>
		<TableCell>
			<Badge variant="secondary" className="capitalize">
				{order.channel}
			</Badge>
		</TableCell>
		<TableCell>
			<Button variant="ghost" size="sm">
				Details
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const stats: StatCardProps[] = [
		{
			icon: DollarSign,
			label: 'Total Revenue',
			value: '$48,560',
			change: '+12.5%',
			trend: 'up',
		},
		{
			icon: ShoppingCart,
			label: 'Total Orders',
			value: '1,234',
			change: '+8.2%',
			trend: 'up',
		},
		{
			icon: Package,
			label: 'Avg Order Value',
			value: '$39.35',
			change: '-2.1%',
			trend: 'down',
		},
		{
			icon: Users,
			label: 'New Customers',
			value: '156',
			change: '+24.3%',
			trend: 'up',
		},
	];

	const periodOptions = [
		{ value: 'today', label: 'Today' },
		{ value: 'week', label: 'This Week' },
		{ value: 'month', label: 'This Month' },
		{ value: 'quarter', label: 'This Quarter' },
		{ value: 'year', label: 'This Year' },
	];

	const orders: Order[] = [
		{
			id: 'ORD-7701',
			items: 5,
			revenue: '$1,245.00',
			margin: '$312.50',
			marginPercent: 25.1,
			trend: 'up',
			channel: 'web',
		},
		{
			id: 'ORD-7702',
			items: 2,
			revenue: '$489.00',
			margin: '$97.80',
			marginPercent: 20.0,
			trend: 'down',
			channel: 'mobile',
		},
		{
			id: 'ORD-7703',
			items: 8,
			revenue: '$2,340.00',
			margin: '$702.00',
			marginPercent: 30.0,
			trend: 'up',
			channel: 'web',
		},
		{
			id: 'ORD-7704',
			items: 3,
			revenue: '$567.00',
			margin: '$141.75',
			marginPercent: 25.0,
			trend: 'up',
			channel: 'pos',
		},
		{
			id: 'ORD-7705',
			items: 1,
			revenue: '$199.00',
			margin: '$39.80',
			marginPercent: 20.0,
			trend: 'down',
			channel: 'mobile',
		},
	];

	const headers = ['Order', 'Items', 'Revenue', 'Margin', 'Channel', 'Action'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">Order Analytics</h2>
					<PeriodSelector options={periodOptions} defaultValue="week" />
				</div>

				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 mb-8">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>

				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg">Top Orders by Revenue</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
									{headers.map((header) => (
										<TableHead
											key={header}
											className={header === 'Items' ? 'text-center' : ''}
										>
											{header}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<OrderRow key={order.id} order={order} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
