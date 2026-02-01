import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CreditCard,
	DollarSign,
	ArrowDownLeft,
	ArrowUpRight,
	CheckCircle,
	Clock,
	AlertCircle,
	XCircle,
} from 'lucide-react';

interface PaymentEvent {
	id: string;
	type: 'charge' | 'refund' | 'partial_refund' | 'chargeback' | 'payout';
	status: 'completed' | 'pending' | 'failed';
	amount: string;
	description: string;
	timestamp: string;
	reference?: string;
	method?: string;
}

interface PaymentTimelineProps {
	orderId: string;
	events: PaymentEvent[];
	totalPaid: string;
	totalRefunded: string;
	netAmount: string;
}

interface PaymentEventRowProps {
	event: PaymentEvent;
	isLast: boolean;
}

const TypeConfig: Record<
	PaymentEvent['type'],
	{ icon: typeof DollarSign; color: string; bg: string; label: string }
> = {
	charge: {
		icon: ArrowDownLeft,
		color: 'text-accent',
		bg: 'bg-accent/10',
		label: 'Payment',
	},
	refund: {
		icon: ArrowUpRight,
		color: 'text-destructive',
		bg: 'bg-destructive/10',
		label: 'Refund',
	},
	partial_refund: {
		icon: ArrowUpRight,
		color: 'text-yellow-500',
		bg: 'bg-yellow-500/10',
		label: 'Partial Refund',
	},
	chargeback: {
		icon: AlertCircle,
		color: 'text-destructive',
		bg: 'bg-destructive/10',
		label: 'Chargeback',
	},
	payout: {
		icon: DollarSign,
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
		label: 'Payout',
	},
};

const StatusBadge = ({ status }: { status: PaymentEvent['status'] }) => {
	const config: Record<
		PaymentEvent['status'],
		{ icon: typeof CheckCircle; className: string }
	> = {
		completed: {
			icon: CheckCircle,
			className: 'text-accent bg-accent/10 border-accent/30',
		},
		pending: {
			icon: Clock,
			className: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
		},
		failed: {
			icon: XCircle,
			className: 'text-destructive bg-destructive/10 border-destructive/30',
		},
	};
	const { icon: Icon, className } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 capitalize ${className}`}>
			<Icon className="size-3" />
			{status}
		</Badge>
	);
};

const PaymentEventRow = ({ event, isLast }: PaymentEventRowProps) => {
	const { icon: Icon, color, bg, label } = TypeConfig[event.type];
	const isNegative =
		event.type === 'refund' ||
		event.type === 'partial_refund' ||
		event.type === 'chargeback';

	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={`size-10 rounded-full flex items-center justify-center ${bg}`}
				>
					<Icon className={`size-5 ${color}`} />
				</div>
				{!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div className="flex items-start justify-between mb-1">
					<div>
						<p className="font-semibold">{label}</p>
						<p className="text-sm text-muted-foreground">{event.description}</p>
					</div>
					<div className="text-right">
						<p
							className={`font-bold ${isNegative ? 'text-destructive' : 'text-accent'}`}
						>
							{isNegative ? '-' : '+'}
							{event.amount}
						</p>
						<p className="text-xs text-muted-foreground">{event.timestamp}</p>
					</div>
				</div>

				<div className="flex items-center gap-2 mt-2">
					<StatusBadge status={event.status} />
					{event.method && (
						<Badge variant="secondary" className="gap-1 text-xs">
							<CreditCard className="size-3" />
							{event.method}
						</Badge>
					)}
					{event.reference && (
						<span className="text-xs text-muted-foreground font-mono">
							{event.reference}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const events: PaymentEvent[] = [
		{
			id: '1',
			type: 'refund',
			status: 'completed',
			amount: '$24.99',
			description: 'Partial refund for damaged item',
			timestamp: 'Jan 30',
			reference: 'REF-001',
			method: 'Visa ••4242',
		},
		{
			id: '2',
			type: 'charge',
			status: 'completed',
			amount: '$249.00',
			description: 'Order payment processed',
			timestamp: 'Jan 26',
			reference: 'CHG-001',
			method: 'Visa ••4242',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg">Payment History</CardTitle>
							<Badge variant="outline" className="font-mono">
								ORD-2024-001
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						{events.map((event, i) => (
							<PaymentEventRow
								key={event.id}
								event={event}
								isLast={i === events.length - 1}
							/>
						))}

						<Separator className="my-4" />

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Total Paid</span>
								<span className="text-accent font-medium">$249.00</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Total Refunded</span>
								<span className="text-destructive font-medium">-$24.99</span>
							</div>
							<Separator />
							<div className="flex justify-between font-bold">
								<span>Net Amount</span>
								<span>$224.01</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
