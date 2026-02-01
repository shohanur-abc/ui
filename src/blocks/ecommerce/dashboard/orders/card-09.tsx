import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Zap,
	Clock,
	AlertTriangle,
	Flame,
	ArrowRight,
	Package,
} from 'lucide-react';

interface UrgentOrder {
	id: string;
	customer: string;
	items: number;
	total: string;
	deadline: string;
	timeLeft: string;
	priority: 'critical' | 'high' | 'medium';
}

interface UrgentOrderCardProps {
	order: UrgentOrder;
	labels: { process: string; timeRemaining: string };
}

interface UrgentOrdersHeaderProps {
	title: string;
	subtitle: string;
	count: number;
}

const PriorityIndicator = ({
	priority,
}: {
	priority: UrgentOrder['priority'];
}) => {
	const config: Record<
		UrgentOrder['priority'],
		{ icon: typeof Flame; className: string; bgClass: string; label: string }
	> = {
		critical: {
			icon: Flame,
			className: 'text-destructive',
			bgClass: 'bg-destructive/10 border-destructive/30',
			label: 'Critical',
		},
		high: {
			icon: AlertTriangle,
			className: 'text-yellow-500',
			bgClass: 'bg-yellow-500/10 border-yellow-500/30',
			label: 'High',
		},
		medium: {
			icon: Clock,
			className: 'text-primary',
			bgClass: 'bg-primary/10 border-primary/30',
			label: 'Medium',
		},
	};
	const { icon: Icon, className, bgClass, label } = config[priority];
	return (
		<Badge variant="outline" className={`gap-1 ${bgClass} ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const TimeLeftIndicator = ({
	timeLeft,
	priority,
}: {
	timeLeft: string;
	priority: UrgentOrder['priority'];
}) => {
	const textColor =
		priority === 'critical'
			? 'text-destructive'
			: priority === 'high'
				? 'text-yellow-500'
				: 'text-muted-foreground';
	return (
		<div
			className={`flex items-center gap-1.5 text-sm font-medium ${textColor}`}
		>
			<Clock className="size-4" />
			{timeLeft}
		</div>
	);
};

const UrgentOrderCard = ({ order, labels }: UrgentOrderCardProps) => (
	<Card
		className={`border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg ${
			order.priority === 'critical'
				? 'border-destructive/30 hover:border-destructive/50'
				: 'hover:border-primary/30'
		}`}
	>
		<CardContent className="p-4">
			<div className="flex items-start justify-between mb-3">
				<div>
					<p className="font-mono text-sm text-muted-foreground">{order.id}</p>
					<p className="font-semibold">{order.customer}</p>
				</div>
				<PriorityIndicator priority={order.priority} />
			</div>

			<div className="flex items-center gap-4 text-sm mb-3">
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<Package className="size-4" />
					{order.items} items
				</div>
				<div className="font-semibold">{order.total}</div>
			</div>

			<Separator className="mb-3" />

			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs text-muted-foreground">
						{labels.timeRemaining}
					</p>
					<TimeLeftIndicator
						timeLeft={order.timeLeft}
						priority={order.priority}
					/>
				</div>
				<Button
					size="sm"
					className="gap-1.5"
					variant={order.priority === 'critical' ? 'destructive' : 'default'}
				>
					{labels.process}
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const UrgentOrdersHeader = ({
	title,
	subtitle,
	count,
}: UrgentOrdersHeaderProps) => (
	<div className="flex items-center gap-3 mb-6">
		<div className="size-10 rounded-lg bg-destructive/10 flex items-center justify-center relative">
			<Zap className="size-5 text-destructive" />
			<span className="absolute -top-1 -right-1 size-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
				{count}
			</span>
		</div>
		<div>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

export default function Main() {
	const labels = { process: 'Process Now', timeRemaining: 'Time Remaining' };

	const urgentOrders: UrgentOrder[] = [
		{
			id: 'ORD-9001',
			customer: 'Express Logistics',
			items: 5,
			total: '$1,245.00',
			deadline: '11:00 AM',
			timeLeft: '23 min',
			priority: 'critical',
		},
		{
			id: 'ORD-9002',
			customer: 'Quick Ship Co.',
			items: 3,
			total: '$567.00',
			deadline: '12:00 PM',
			timeLeft: '1h 23min',
			priority: 'critical',
		},
		{
			id: 'ORD-9003',
			customer: 'Prime Delivery',
			items: 8,
			total: '$2,340.00',
			deadline: '2:00 PM',
			timeLeft: '3h 23min',
			priority: 'high',
		},
		{
			id: 'ORD-9004',
			customer: 'FastTrack Inc.',
			items: 2,
			total: '$189.00',
			deadline: '4:00 PM',
			timeLeft: '5h 23min',
			priority: 'medium',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<UrgentOrdersHeader
					title="Urgent Orders"
					subtitle="Requires immediate attention"
					count={urgentOrders.length}
				/>
				<div className="space-y-3">
					{urgentOrders.map((order) => (
						<UrgentOrderCard key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
