import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Package, Truck, CheckCircle2, CreditCard, MapPin } from 'lucide-react';

interface OrderStage {
	id: string;
	title: string;
	description: string;
	status: 'completed' | 'current' | 'upcoming';
	timestamp?: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface HorizontalTimelineProps {
	orderId: string;
	stages: OrderStage[];
	progress: number;
}

interface StageItemProps {
	stage: OrderStage;
	isFirst: boolean;
	isLast: boolean;
}

const StageItem = ({ stage, isFirst, isLast }: StageItemProps) => {
	const statusConfig = {
		completed: { className: 'bg-accent text-accent-foreground', iconClass: 'text-accent-foreground', lineClass: 'bg-accent' },
		current: { className: 'bg-primary text-primary-foreground ring-4 ring-primary/30', iconClass: 'text-primary-foreground', lineClass: 'bg-border' },
		upcoming: { className: 'bg-muted text-muted-foreground', iconClass: 'text-muted-foreground', lineClass: 'bg-border' },
	};
	const { className, iconClass, lineClass } = statusConfig[stage.status];

	return (
		<div className="flex-1 flex flex-col items-center relative">
			{!isFirst && (
				<div className={`absolute top-5 right-1/2 w-full h-0.5 ${stage.status === 'completed' || stage.status === 'current' ? 'bg-accent' : 'bg-border'}`} />
			)}
			{!isLast && (
				<div className={`absolute top-5 left-1/2 w-full h-0.5 ${stage.status === 'completed' ? 'bg-accent' : 'bg-border'}`} />
			)}

			<div className={`size-10 rounded-full flex items-center justify-center z-10 ${className}`}>
				<stage.icon className={`size-5 ${iconClass}`} />
			</div>

			<div className="mt-3 text-center">
				<p className={`font-medium text-sm ${stage.status === 'upcoming' ? 'text-muted-foreground' : ''}`}>{stage.title}</p>
				{stage.timestamp && (
					<p className="text-xs text-muted-foreground mt-0.5">{stage.timestamp}</p>
				)}
			</div>
		</div>
	);
};

const HorizontalTimeline = ({ orderId, stages, progress }: HorizontalTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader>
			<div className="flex items-center justify-between">
				<div>
					<CardTitle className="text-lg">Order Progress</CardTitle>
					<CardDescription>Track your order status</CardDescription>
				</div>
				<Badge variant="outline" className="font-mono">{orderId}</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-start mb-6">
				{stages.map((stage, i) => (
					<StageItem key={stage.id} stage={stage} isFirst={i === 0} isLast={i === stages.length - 1} />
				))}
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Overall Progress</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stages: OrderStage[] = [
		{ id: '1', title: 'Order Placed', status: 'completed', timestamp: 'Jan 26', icon: CreditCard },
		{ id: '2', title: 'Processing', status: 'completed', timestamp: 'Jan 27', icon: Package },
		{ id: '3', title: 'Shipped', status: 'current', timestamp: 'Jan 28', icon: Truck },
		{ id: '4', title: 'In Transit', status: 'upcoming', icon: MapPin },
		{ id: '5', title: 'Delivered', status: 'upcoming', icon: CheckCircle2 },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<HorizontalTimeline orderId="ORD-2024-001" stages={stages} progress={60} />
			</div>
		</section>
	);
}
