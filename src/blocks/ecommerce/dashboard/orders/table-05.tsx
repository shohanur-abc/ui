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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Package,
	MapPin,
	Calendar,
	DollarSign,
	Eye,
	Edit2,
	Trash2,
} from 'lucide-react';

interface OrderItem {
	name: string;
	image: string;
	initials: string;
}

interface Order {
	id: string;
	items: OrderItem[];
	itemCount: number;
	destination: string;
	total: string;
	date: string;
	priority: 'high' | 'medium' | 'low';
}

interface ItemsPreviewProps {
	items: OrderItem[];
	totalCount: number;
}

interface PriorityIndicatorProps {
	priority: Order['priority'];
}

interface ActionButtonProps {
	icon: React.ComponentType<{ className?: string }>;
	tooltip: string;
	variant?: 'ghost' | 'destructive';
}

const ItemsPreview = ({ items, totalCount }: ItemsPreviewProps) => (
	<div className="flex items-center">
		<div className="flex -space-x-2">
			{items.slice(0, 3).map((item, i) => (
				<Avatar key={i} className="size-8 border-2 border-card">
					<AvatarImage src={item.image} alt={item.name} />
					<AvatarFallback className="bg-muted text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
		{totalCount > 3 && (
			<span className="ml-2 text-sm text-muted-foreground">
				+{totalCount - 3} more
			</span>
		)}
	</div>
);

const PriorityIndicator = ({ priority }: PriorityIndicatorProps) => {
	const config: Record<Order['priority'], { color: string; label: string }> = {
		high: { color: 'bg-destructive', label: 'High Priority' },
		medium: { color: 'bg-primary', label: 'Medium Priority' },
		low: { color: 'bg-muted-foreground', label: 'Low Priority' },
	};
	return (
		<Tooltip>
			<TooltipTrigger>
				<span
					className={`inline-block size-2.5 rounded-full ${config[priority].color}`}
				/>
			</TooltipTrigger>
			<TooltipContent>{config[priority].label}</TooltipContent>
		</Tooltip>
	);
};

const ActionButton = ({
	icon: Icon,
	tooltip,
	variant = 'ghost',
}: ActionButtonProps) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<Button
				variant={variant === 'destructive' ? 'ghost' : 'ghost'}
				size="icon-sm"
				className={
					variant === 'destructive'
						? 'hover:bg-destructive/10 hover:text-destructive'
						: 'hover:bg-muted'
				}
			>
				<Icon className="size-4" />
			</Button>
		</TooltipTrigger>
		<TooltipContent>{tooltip}</TooltipContent>
	</Tooltip>
);

const InfoCell = ({
	icon: Icon,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-muted-foreground" />
		<span>{value}</span>
	</div>
);

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="group hover:bg-muted/30 transition-colors">
		<TableCell className="w-8">
			<PriorityIndicator priority={order.priority} />
		</TableCell>
		<TableCell className="font-mono text-sm font-medium">{order.id}</TableCell>
		<TableCell>
			<ItemsPreview items={order.items} totalCount={order.itemCount} />
		</TableCell>
		<TableCell>
			<InfoCell icon={MapPin} value={order.destination} />
		</TableCell>
		<TableCell>
			<InfoCell icon={DollarSign} value={order.total} />
		</TableCell>
		<TableCell>
			<InfoCell icon={Calendar} value={order.date} />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
				<ActionButton icon={Eye} tooltip="View Details" />
				<ActionButton icon={Edit2} tooltip="Edit Order" />
				<ActionButton icon={Trash2} tooltip="Delete" variant="destructive" />
			</div>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{
			id: 'WH-001234',
			items: [
				{ name: 'Product A', image: '', initials: 'PA' },
				{ name: 'Product B', image: '', initials: 'PB' },
				{ name: 'Product C', image: '', initials: 'PC' },
			],
			itemCount: 5,
			destination: 'New York, USA',
			total: '$1,249.00',
			date: 'Jan 28, 2026',
			priority: 'high',
		},
		{
			id: 'WH-001235',
			items: [
				{ name: 'Product D', image: '', initials: 'PD' },
				{ name: 'Product E', image: '', initials: 'PE' },
			],
			itemCount: 2,
			destination: 'London, UK',
			total: '$567.00',
			date: 'Jan 27, 2026',
			priority: 'medium',
		},
		{
			id: 'WH-001236',
			items: [{ name: 'Product F', image: '', initials: 'PF' }],
			itemCount: 1,
			destination: 'Tokyo, Japan',
			total: '$299.00',
			date: 'Jan 27, 2026',
			priority: 'low',
		},
		{
			id: 'WH-001237',
			items: [
				{ name: 'Product G', image: '', initials: 'PG' },
				{ name: 'Product H', image: '', initials: 'PH' },
				{ name: 'Product I', image: '', initials: 'PI' },
				{ name: 'Product J', image: '', initials: 'PJ' },
			],
			itemCount: 8,
			destination: 'Sydney, Australia',
			total: '$2,890.00',
			date: 'Jan 26, 2026',
			priority: 'high',
		},
	];

	const headers = [
		'',
		'Order',
		'Items',
		'Destination',
		'Total',
		'Date',
		'Actions',
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="border-border/50 hover:bg-transparent">
								{headers.map((header) => (
									<TableHead
										key={header}
										className="text-xs uppercase tracking-wide text-muted-foreground"
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
				</div>
			</div>
		</section>
	);
}
