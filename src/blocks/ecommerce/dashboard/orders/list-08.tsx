import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Warehouse, Package, Truck, Clock, AlertCircle, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface BatchOrder {
	batchId: string;
	ordersCount: number;
	itemsCount: number;
	status: 'queued' | 'picking' | 'packing' | 'ready' | 'shipped';
	progress: number;
	assignedTo?: string;
	startedAt?: string;
	estimatedCompletion?: string;
	priority: 'normal' | 'rush' | 'express';
}

interface BatchOrderRowProps {
	batch: BatchOrder;
	labels: {
		orders: string;
		items: string;
		assignee: string;
		started: string;
		eta: string;
		process: string;
		view: string;
	};
}

const StatusConfig: Record<BatchOrder['status'], { icon: typeof Clock; className: string; label: string; bgClass: string }> = {
	queued: { icon: Clock, className: 'text-muted-foreground', label: 'Queued', bgClass: 'bg-muted' },
	picking: { icon: Package, className: 'text-blue-500', label: 'Picking', bgClass: 'bg-blue-500' },
	packing: { icon: Warehouse, className: 'text-purple-500', label: 'Packing', bgClass: 'bg-purple-500' },
	ready: { icon: CheckCircle, className: 'text-accent', label: 'Ready', bgClass: 'bg-accent' },
	shipped: { icon: Truck, className: 'text-primary', label: 'Shipped', bgClass: 'bg-primary' },
};

const PriorityIndicator = ({ priority }: { priority: BatchOrder['priority'] }) => {
	const config: Record<BatchOrder['priority'], { className: string; label: string }> = {
		normal: { className: 'bg-muted text-muted-foreground', label: 'Normal' },
		rush: { className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Rush' },
		express: { className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Express' },
	};
	const { className, label } = config[priority];
	return <Badge variant="outline" className={className}>{label}</Badge>;
};

const BatchOrderRow = ({ batch, labels }: BatchOrderRowProps) => {
	const { icon: Icon, className, label, bgClass } = StatusConfig[batch.status];
	return (
		<div className={`p-4 rounded-xl border transition-all ${batch.priority === 'express' ? 'border-destructive/30 bg-destructive/5' : 'border-border/50 bg-card/50'} hover:shadow-md`}>
			<div className="flex items-center gap-4 mb-3">
				<div className={`size-12 rounded-lg flex items-center justify-center ${className} bg-current/10`}>
					<Icon className="size-6" />
				</div>

				<div className="flex-1">
					<div className="flex items-center gap-2 mb-0.5">
						<span className="font-semibold font-mono">{batch.batchId}</span>
						<PriorityIndicator priority={batch.priority} />
					</div>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<span>{batch.ordersCount} {labels.orders}</span>
						<span>•</span>
						<span>{batch.itemsCount} {labels.items}</span>
						{batch.assignedTo && (
							<>
								<span>•</span>
								<span>{labels.assignee}: {batch.assignedTo}</span>
							</>
						)}
					</div>
				</div>

				<Badge variant="outline" className={`gap-1.5 ${className}`}>
					<Icon className="size-3" />
					{label}
				</Badge>
			</div>

			<div className="space-y-2 mb-3">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Progress</span>
					<span className="font-medium">{batch.progress}%</span>
				</div>
				<Progress value={batch.progress} className={`h-2 [&>div]:${bgClass}`} />
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					{batch.startedAt && (
						<span>{labels.started}: {batch.startedAt}</span>
					)}
					{batch.estimatedCompletion && (
						<span>{labels.eta}: {batch.estimatedCompletion}</span>
					)}
				</div>

				<div className="flex items-center gap-2">
					{batch.status === 'queued' && (
						<Button size="sm" className="gap-1.5">
							{labels.process}
							<ArrowRight className="size-4" />
						</Button>
					)}
					<Button variant="outline" size="sm" className="gap-1.5">
						{labels.view}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const labels = {
		orders: 'orders',
		items: 'items',
		assignee: 'Assigned',
		started: 'Started',
		eta: 'ETA',
		process: 'Start Processing',
		view: 'View Details',
	};

	const batches: BatchOrder[] = [
		{ batchId: 'BATCH-001', ordersCount: 24, itemsCount: 67, status: 'picking', progress: 45, assignedTo: 'John S.', startedAt: '10:30 AM', estimatedCompletion: '11:45 AM', priority: 'express' },
		{ batchId: 'BATCH-002', ordersCount: 18, itemsCount: 42, status: 'packing', progress: 78, assignedTo: 'Maria K.', startedAt: '09:15 AM', estimatedCompletion: '10:30 AM', priority: 'rush' },
		{ batchId: 'BATCH-003', ordersCount: 32, itemsCount: 95, status: 'ready', progress: 100, assignedTo: 'Alex B.', startedAt: '08:00 AM', priority: 'normal' },
		{ batchId: 'BATCH-004', ordersCount: 15, itemsCount: 38, status: 'queued', progress: 0, priority: 'normal' },
		{ batchId: 'BATCH-005', ordersCount: 28, itemsCount: 73, status: 'shipped', progress: 100, assignedTo: 'Team A', startedAt: 'Yesterday', priority: 'normal' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-3">
					{batches.map((batch) => (
						<BatchOrderRow key={batch.batchId} batch={batch} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
