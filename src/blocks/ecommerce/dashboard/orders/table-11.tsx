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
import { Progress } from '@/components/ui/progress';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle2, Timer } from 'lucide-react';

interface Order {
	id: string;
	customer: string;
	items: number;
	sla: {
		deadline: string;
		remaining: string;
		progress: number;
		status: 'on-track' | 'at-risk' | 'overdue';
	};
	priority: 'urgent' | 'high' | 'normal';
}

interface SlaIndicatorProps {
	sla: Order['sla'];
}

interface PriorityBadgeProps {
	priority: Order['priority'];
}

interface SummaryCardProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	iconClass: string;
}

const SummaryCard = ({
	icon: Icon,
	label,
	value,
	iconClass,
}: SummaryCardProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
		<div className={`p-2 rounded-lg ${iconClass}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</div>
	</div>
);

const SlaIndicator = ({ sla }: SlaIndicatorProps) => {
	const config: Record<
		Order['sla']['status'],
		{ color: string; icon: typeof Clock }
	> = {
		'on-track': { color: 'text-accent', icon: CheckCircle2 },
		'at-risk': { color: 'text-yellow-500', icon: AlertTriangle },
		overdue: { color: 'text-destructive', icon: Timer },
	};
	const { color, icon: Icon } = config[sla.status];

	return (
		<div className="flex items-center gap-3 min-w-48">
			<div className="flex-1">
				<div className="flex items-center justify-between text-xs mb-1">
					<span className={color}>{sla.remaining}</span>
					<span className="text-muted-foreground">{sla.deadline}</span>
				</div>
				<Progress
					value={sla.progress}
					className={`h-1.5 ${sla.status === 'overdue' ? '[&>div]:bg-destructive' : sla.status === 'at-risk' ? '[&>div]:bg-yellow-500' : ''}`}
				/>
			</div>
			<Icon className={`size-4 ${color}`} />
		</div>
	);
};

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
	const config: Record<
		Order['priority'],
		{ variant: 'default' | 'secondary' | 'destructive'; className?: string }
	> = {
		urgent: { variant: 'destructive' },
		high: { variant: 'default', className: 'bg-yellow-500/80 text-yellow-950' },
		normal: { variant: 'secondary' },
	};
	return (
		<Badge
			variant={config[priority].variant}
			className={`capitalize ${config[priority].className || ''}`}
		>
			{priority}
		</Badge>
	);
};

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell className="font-medium">{order.customer}</TableCell>
		<TableCell className="text-center">{order.items}</TableCell>
		<TableCell>
			<PriorityBadge priority={order.priority} />
		</TableCell>
		<TableCell>
			<SlaIndicator sla={order.sla} />
		</TableCell>
		<TableCell>
			<Button variant="outline" size="sm">
				Process
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const summaryCards: SummaryCardProps[] = [
		{
			icon: Timer,
			label: 'Pending Orders',
			value: '23',
			iconClass: 'bg-primary/10 text-primary',
		},
		{
			icon: AlertTriangle,
			label: 'At Risk',
			value: '5',
			iconClass: 'bg-yellow-500/10 text-yellow-500',
		},
		{
			icon: Clock,
			label: 'Overdue',
			value: '2',
			iconClass: 'bg-destructive/10 text-destructive',
		},
		{
			icon: CheckCircle2,
			label: 'On Track',
			value: '16',
			iconClass: 'bg-accent/10 text-accent',
		},
	];

	const orders: Order[] = [
		{
			id: 'SLA-001',
			customer: 'TechCorp Industries',
			items: 12,
			sla: {
				deadline: '2:00 PM',
				remaining: '45 min left',
				progress: 75,
				status: 'at-risk',
			},
			priority: 'urgent',
		},
		{
			id: 'SLA-002',
			customer: 'Global Solutions Ltd',
			items: 5,
			sla: {
				deadline: '4:00 PM',
				remaining: '2h 45min',
				progress: 45,
				status: 'on-track',
			},
			priority: 'high',
		},
		{
			id: 'SLA-003',
			customer: 'StartupXYZ Inc',
			items: 3,
			sla: {
				deadline: '11:00 AM',
				remaining: 'Overdue 30min',
				progress: 100,
				status: 'overdue',
			},
			priority: 'urgent',
		},
		{
			id: 'SLA-004',
			customer: 'RetailMax Chain',
			items: 8,
			sla: {
				deadline: '6:00 PM',
				remaining: '4h 45min',
				progress: 20,
				status: 'on-track',
			},
			priority: 'normal',
		},
		{
			id: 'SLA-005',
			customer: 'Enterprise Co',
			items: 15,
			sla: {
				deadline: '3:30 PM',
				remaining: '2h 15min',
				progress: 55,
				status: 'on-track',
			},
			priority: 'high',
		},
	];

	const headers = [
		'Order',
		'Customer',
		'Items',
		'Priority',
		'SLA Status',
		'Action',
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mb-6">
					{summaryCards.map((card, i) => (
						<SummaryCard key={i} {...card} />
					))}
				</div>

				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg">SLA Tracking</CardTitle>
						<CardDescription>
							Monitor order fulfillment deadlines
						</CardDescription>
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
