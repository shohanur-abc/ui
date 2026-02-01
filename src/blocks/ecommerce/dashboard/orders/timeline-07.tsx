import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	RotateCcw,
	Package,
	Camera,
	Truck,
	CheckCircle2,
	DollarSign,
	Clock,
	XCircle,
} from 'lucide-react';

interface ReturnEvent {
	id: string;
	status: 'completed' | 'current' | 'upcoming' | 'cancelled';
	title: string;
	description: string;
	timestamp: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ReturnTimelineProps {
	returnId: string;
	orderId: string;
	events: ReturnEvent[];
	refundAmount: string;
}

interface ReturnEventItemProps {
	event: ReturnEvent;
	isLast: boolean;
}

const StatusConfig = {
	completed: { color: 'text-accent', bg: 'bg-accent/10', iconBg: 'bg-accent' },
	current: { color: 'text-primary', bg: 'bg-primary/10', iconBg: 'bg-primary' },
	upcoming: {
		color: 'text-muted-foreground',
		bg: 'bg-muted',
		iconBg: 'bg-muted',
	},
	cancelled: {
		color: 'text-destructive',
		bg: 'bg-destructive/10',
		iconBg: 'bg-destructive',
	},
};

const ReturnEventItem = ({ event, isLast }: ReturnEventItemProps) => {
	const { color, bg, iconBg } = StatusConfig[event.status];
	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={`size-10 rounded-full flex items-center justify-center ${event.status === 'completed' || event.status === 'current' ? iconBg : 'bg-muted'} ${event.status === 'completed' || event.status === 'current' ? 'text-white' : 'text-muted-foreground'}`}
				>
					<event.icon className="size-5" />
				</div>
				{!isLast && (
					<div
						className={`w-0.5 flex-1 my-2 ${event.status === 'completed' ? 'bg-accent' : 'bg-border'}`}
					/>
				)}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div className="flex items-start justify-between">
					<div>
						<p
							className={`font-semibold ${event.status === 'upcoming' ? 'text-muted-foreground' : ''}`}
						>
							{event.title}
						</p>
						<p className="text-sm text-muted-foreground">{event.description}</p>
					</div>
					{event.timestamp && (
						<span className="text-xs text-muted-foreground">
							{event.timestamp}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const events: ReturnEvent[] = [
		{
			id: '1',
			status: 'completed',
			title: 'Return Initiated',
			description: 'Return request submitted by customer',
			timestamp: 'Jan 25',
			icon: RotateCcw,
		},
		{
			id: '2',
			status: 'completed',
			title: 'Return Approved',
			description: 'Return request approved by support team',
			timestamp: 'Jan 25',
			icon: CheckCircle2,
		},
		{
			id: '3',
			status: 'completed',
			title: 'Shipping Label Generated',
			description: 'Prepaid return label sent to customer',
			timestamp: 'Jan 26',
			icon: Package,
		},
		{
			id: '4',
			status: 'current',
			title: 'Item In Transit',
			description: 'Customer shipped item back',
			timestamp: 'Jan 28',
			icon: Truck,
		},
		{
			id: '5',
			status: 'upcoming',
			title: 'Item Received',
			description: 'Waiting for warehouse to receive item',
			timestamp: '',
			icon: Package,
		},
		{
			id: '6',
			status: 'upcoming',
			title: 'Quality Inspection',
			description: 'Item will be inspected for condition',
			timestamp: '',
			icon: Camera,
		},
		{
			id: '7',
			status: 'upcoming',
			title: 'Refund Processed',
			description: 'Refund will be issued to original payment method',
			timestamp: '',
			icon: DollarSign,
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg">Return Progress</CardTitle>
								<div className="flex items-center gap-2 mt-1">
									<Badge variant="outline" className="font-mono text-xs">
										RET-001
									</Badge>
									<span className="text-xs text-muted-foreground">
										Order #ORD-2024-156
									</span>
								</div>
							</div>
							<div className="text-right">
								<p className="text-xs text-muted-foreground">Refund Amount</p>
								<p className="text-lg font-bold text-accent">$89.99</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{events.map((event, i) => (
							<ReturnEventItem
								key={event.id}
								event={event}
								isLast={i === events.length - 1}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
