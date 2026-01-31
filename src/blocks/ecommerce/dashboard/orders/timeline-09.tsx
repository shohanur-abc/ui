import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Warehouse, ScanLine, Box, Truck, CheckCircle2, Clock, User } from 'lucide-react';

interface FulfillmentStep {
	id: string;
	status: 'completed' | 'current' | 'upcoming';
	title: string;
	description: string;
	timestamp?: string;
	duration?: string;
	worker?: string;
	icon: React.ComponentType<{ className?: string }>;
	items?: { name: string; quantity: number }[];
}

interface FulfillmentTimelineProps {
	orderId: string;
	steps: FulfillmentStep[];
	totalTime?: string;
}

interface FulfillmentStepItemProps {
	step: FulfillmentStep;
	isLast: boolean;
}

const StatusColors = {
	completed: { icon: 'bg-accent text-white', line: 'bg-accent' },
	current: { icon: 'bg-primary text-white animate-pulse', line: 'bg-border' },
	upcoming: { icon: 'bg-muted text-muted-foreground', line: 'bg-border' },
};

const FulfillmentStepItem = ({ step, isLast }: FulfillmentStepItemProps) => {
	const { icon, line } = StatusColors[step.status];
	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div className={`size-12 rounded-xl flex items-center justify-center ${icon}`}>
					<step.icon className="size-6" />
				</div>
				{!isLast && <div className={`w-0.5 flex-1 my-2 ${step.status === 'completed' ? line : 'bg-border'}`} />}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div className={`p-4 rounded-xl border ${step.status === 'current' ? 'bg-primary/5 border-primary/30' : 'bg-muted/20 border-border/50'}`}>
					<div className="flex items-start justify-between mb-2">
						<div>
							<div className="flex items-center gap-2">
								<p className="font-semibold">{step.title}</p>
								{step.status === 'current' && (
									<Badge className="bg-primary text-primary-foreground text-xs">In Progress</Badge>
								)}
								{step.status === 'completed' && (
									<CheckCircle2 className="size-4 text-accent" />
								)}
							</div>
							<p className="text-sm text-muted-foreground">{step.description}</p>
						</div>
						<div className="text-right text-xs text-muted-foreground">
							{step.timestamp && <p>{step.timestamp}</p>}
							{step.duration && <p className="font-medium">{step.duration}</p>}
						</div>
					</div>

					{step.worker && (
						<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
							<User className="size-3" />
							{step.worker}
						</div>
					)}

					{step.items && step.items.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
							{step.items.map((item, i) => (
								<Badge key={i} variant="secondary" className="text-xs">
									{item.name} × {item.quantity}
								</Badge>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const steps: FulfillmentStep[] = [
		{ id: '1', status: 'completed', title: 'Order Received', description: 'Order entered into fulfillment queue', timestamp: '10:00 AM', duration: '0m', icon: Package },
		{ id: '2', status: 'completed', title: 'Picking', description: 'Items collected from warehouse shelves', timestamp: '10:15 AM', duration: '12m', worker: 'John S.', icon: ScanLine, items: [{ name: 'Headphones', quantity: 1 }, { name: 'USB Cable', quantity: 2 }] },
		{ id: '3', status: 'current', title: 'Packing', description: 'Items being packed for shipment', timestamp: '10:27 AM', worker: 'Maria G.', icon: Box },
		{ id: '4', status: 'upcoming', title: 'Quality Check', description: 'Final verification before shipping', icon: CheckCircle2 },
		{ id: '5', status: 'upcoming', title: 'Ready for Pickup', description: 'Waiting for carrier pickup', icon: Warehouse },
		{ id: '6', status: 'upcoming', title: 'Shipped', description: 'Handed off to shipping carrier', icon: Truck },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg">Fulfillment Progress</CardTitle>
								<Badge variant="outline" className="font-mono text-xs mt-1">ORD-2024-001</Badge>
							</div>
							<div className="text-right">
								<p className="text-xs text-muted-foreground">Est. Completion</p>
								<p className="font-semibold text-primary">~15 min</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{steps.map((step, i) => (
							<FulfillmentStepItem key={step.id} step={step} isLast={i === steps.length - 1} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
