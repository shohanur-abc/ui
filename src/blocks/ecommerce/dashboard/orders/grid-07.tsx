import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Clock,
	AlertCircle,
	CheckCircle,
	XCircle,
	Package,
	Truck,
	AlertTriangle,
} from 'lucide-react';

interface SLACard {
	title: string;
	description: string;
	current: number;
	target: number;
	unit: string;
	status: 'on-track' | 'at-risk' | 'breached';
	icon: React.ComponentType<{ className?: string }>;
	trend: string;
}

interface SLAGridCardProps {
	sla: SLACard;
	labels: { target: string; current: string; status: string };
}

const StatusConfig: Record<
	SLACard['status'],
	{
		className: string;
		bgClass: string;
		label: string;
		icon: typeof CheckCircle;
	}
> = {
	'on-track': {
		className: 'text-accent',
		bgClass: 'bg-accent/10',
		label: 'On Track',
		icon: CheckCircle,
	},
	'at-risk': {
		className: 'text-yellow-500',
		bgClass: 'bg-yellow-500/10',
		label: 'At Risk',
		icon: AlertTriangle,
	},
	breached: {
		className: 'text-destructive',
		bgClass: 'bg-destructive/10',
		label: 'Breached',
		icon: XCircle,
	},
};

const SLAGridCard = ({ sla, labels }: SLAGridCardProps) => {
	const {
		className,
		bgClass,
		label,
		icon: StatusIcon,
	} = StatusConfig[sla.status];
	const progress = Math.min((sla.current / sla.target) * 100, 100);
	const isOverTarget = sla.current > sla.target;

	return (
		<Card
			className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all ${sla.status === 'breached' ? 'border-destructive/30' : 'hover:border-primary/30'}`}
		>
			<CardContent className="p-4">
				<div className="flex items-start justify-between mb-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<sla.icon className="size-5 text-primary" />
					</div>
					<Badge
						variant="outline"
						className={`gap-1 ${className} ${bgClass} border-current/30`}
					>
						<StatusIcon className="size-3" />
						{label}
					</Badge>
				</div>

				<p className="font-semibold mb-1">{sla.title}</p>
				<p className="text-xs text-muted-foreground mb-4">{sla.description}</p>

				<div className="flex items-end gap-2 mb-3">
					<span
						className={`text-3xl font-bold ${isOverTarget ? 'text-destructive' : ''}`}
					>
						{sla.current}
					</span>
					<span className="text-muted-foreground mb-1">
						/ {sla.target} {sla.unit}
					</span>
				</div>

				<Progress
					value={progress}
					className={`h-2 mb-2 ${sla.status === 'breached' ? '[&>div]:bg-destructive' : sla.status === 'at-risk' ? '[&>div]:bg-yellow-500' : ''}`}
				/>

				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>
						{labels.target}: {sla.target} {sla.unit}
					</span>
					<span className={className}>{sla.trend}</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const labels = { target: 'Target', current: 'Current', status: 'Status' };

	const slas: SLACard[] = [
		{
			title: 'Order Processing',
			description: 'Time to process new orders',
			current: 1.8,
			target: 2,
			unit: 'hrs',
			status: 'on-track',
			icon: Clock,
			trend: '↓ 0.2h from yesterday',
		},
		{
			title: 'Shipping Time',
			description: 'Time from order to shipment',
			current: 23,
			target: 24,
			unit: 'hrs',
			status: 'at-risk',
			icon: Package,
			trend: '↑ 2h from yesterday',
		},
		{
			title: 'Delivery SLA',
			description: 'On-time delivery rate',
			current: 94,
			target: 95,
			unit: '%',
			status: 'at-risk',
			icon: Truck,
			trend: '↓ 1% from last week',
		},
		{
			title: 'Return Processing',
			description: 'Time to process returns',
			current: 52,
			target: 48,
			unit: 'hrs',
			status: 'breached',
			icon: AlertCircle,
			trend: '↑ 4h - immediate action needed',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{slas.map((sla, i) => (
						<SLAGridCard key={i} sla={sla} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
