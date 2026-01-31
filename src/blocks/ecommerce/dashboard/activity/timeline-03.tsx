import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Clock,
	Package,
	Truck,
	MapPin,
	CheckCircle2,
	type LucideIcon,
} from 'lucide-react';

interface OrderStage {
	id: string;
	label: string;
	description: string;
	timestamp: string;
	status: 'completed' | 'current' | 'upcoming';
	icon: LucideIcon;
}

interface OrderTimelineProps {
	orderId: string;
	customerName: string;
	customerAvatar?: string;
	customerInitials: string;
	progress: number;
	stages: OrderStage[];
}

const StageIcon = ({
	icon: Icon,
	status,
}: { icon: LucideIcon; status: OrderStage['status'] }) => {
	const statusStyles = {
		completed:
			'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20',
		current:
			'bg-primary/20 border-primary/50 text-primary shadow-primary/20 animate-pulse',
		upcoming: 'bg-muted border-border text-muted-foreground',
	};

	return (
		<div
			className={`flex size-12 items-center justify-center rounded-full border-2 shadow-lg transition-all ${statusStyles[status]}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const StageConnector = ({ status }: { status: OrderStage['status'] }) => {
	const lineColor =
		status === 'completed' ? 'bg-emerald-500/50' : 'bg-border';

	return (
		<div className="absolute left-6 top-12 h-[calc(100%-3rem)] w-0.5">
			<div className={`h-full w-full ${lineColor}`} />
		</div>
	);
};

const StageItem = ({
	stage,
	isLast,
}: { stage: OrderStage; isLast: boolean }) => (
	<div className="group relative flex gap-4 pb-8 last:pb-0">
		<div className="relative">
			<StageIcon icon={stage.icon} status={stage.status} />
			{!isLast && <StageConnector status={stage.status} />}
		</div>
		<div className="flex flex-1 flex-col gap-1 pt-2">
			<div className="flex items-center gap-2">
				<h4
					className={`font-medium ${stage.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}
				>
					{stage.label}
				</h4>
				{stage.status === 'current' && (
					<Badge className="bg-primary/20 text-primary border-primary/30">
						In Progress
					</Badge>
				)}
				{stage.status === 'completed' && (
					<CheckCircle2 className="size-4 text-emerald-400" />
				)}
			</div>
			<p className="text-sm text-muted-foreground">{stage.description}</p>
			<span className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
				<Clock className="size-3" />
				{stage.timestamp}
			</span>
		</div>
	</div>
);

const OrderHeader = ({
	orderId,
	customerName,
	customerAvatar,
	customerInitials,
	progress,
}: Omit<OrderTimelineProps, 'stages'>) => (
	<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
		<div className="flex items-center gap-3">
			<Avatar className="size-10 ring-2 ring-primary/20">
				<AvatarImage src={customerAvatar} alt={customerName} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customerInitials}
				</AvatarFallback>
			</Avatar>
			<div>
				<h3 className="font-semibold text-foreground">{customerName}</h3>
				<p className="text-sm text-muted-foreground">Order {orderId}</p>
			</div>
		</div>
		<div className="flex flex-col gap-1 @sm:items-end">
			<span className="text-sm font-medium text-foreground">
				{progress}% Complete
			</span>
			<Progress value={progress} className="h-2 w-32" />
		</div>
	</div>
);

const OrderTimeline = ({
	orderId,
	customerName,
	customerAvatar,
	customerInitials,
	progress,
	stages,
}: OrderTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="border-b border-border/50">
			<OrderHeader
				orderId={orderId}
				customerName={customerName}
				customerAvatar={customerAvatar}
				customerInitials={customerInitials}
				progress={progress}
			/>
		</CardHeader>
		<CardContent className="pt-6">
			<div>
				{stages.map((stage, index) => (
					<StageItem
						key={stage.id}
						stage={stage}
						isLast={index === stages.length - 1}
					/>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const orderStages: OrderStage[] = [
		{
			id: '1',
			label: 'Order Placed',
			description: 'Order confirmed and payment received',
			timestamp: 'Mar 15, 2024 - 10:30 AM',
			status: 'completed',
			icon: CheckCircle2,
		},
		{
			id: '2',
			label: 'Processing',
			description: 'Items being picked and packed at warehouse',
			timestamp: 'Mar 15, 2024 - 2:45 PM',
			status: 'completed',
			icon: Package,
		},
		{
			id: '3',
			label: 'Shipped',
			description: 'Package handed to carrier - FedEx Express',
			timestamp: 'Mar 16, 2024 - 9:00 AM',
			status: 'current',
			icon: Truck,
		},
		{
			id: '4',
			label: 'Out for Delivery',
			description: 'Package is on the delivery vehicle',
			timestamp: 'Expected: Mar 17, 2024',
			status: 'upcoming',
			icon: MapPin,
		},
		{
			id: '5',
			label: 'Delivered',
			description: 'Package delivered to destination',
			timestamp: 'Expected: Mar 17, 2024',
			status: 'upcoming',
			icon: CheckCircle2,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<OrderTimeline
					orderId="#ORD-2024-0847"
					customerName="Alexandra Mitchell"
					customerInitials="AM"
					progress={60}
					stages={orderStages}
				/>
			</div>
		</section>
	);
}
