import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ArrowUpRight, Ban, Clock, XCircle } from 'lucide-react';

interface RefundItem {
	name: string;
	reason: string;
	originalPrice: number;
	refundAmount: number;
}

interface RefundHeaderProps {
	title: string;
	refundNumber: string;
	originalOrder: string;
	status: 'processing' | 'completed' | 'rejected';
}

interface RefundTimelineProps {
	steps: {
		label: string;
		date: string;
		status: 'done' | 'current' | 'pending';
	}[];
}

interface RefundItemCardProps {
	item: RefundItem;
	currency: string;
}

interface RefundSummaryProps {
	subtotal: number;
	restockingFee: number;
	refundTotal: number;
	currency: string;
	method: string;
}

interface CustomerNoteProps {
	title: string;
	note: string;
}

const RefundHeader = ({
	title,
	refundNumber,
	originalOrder,
	status,
}: RefundHeaderProps) => {
	const statusConfig = {
		processing: {
			variant: 'secondary' as const,
			icon: Clock,
			label: 'Processing',
		},
		completed: {
			variant: 'default' as const,
			icon: ArrowUpRight,
			label: 'Refunded',
		},
		rejected: {
			variant: 'destructive' as const,
			icon: XCircle,
			label: 'Rejected',
		},
	};
	const config = statusConfig[status];

	return (
		<div className="space-y-3">
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-xl font-bold">{title}</h1>
					<p className="text-sm text-muted-foreground font-mono">
						{refundNumber}
					</p>
				</div>
				<Badge variant={config.variant} className="gap-1">
					<config.icon className="size-3" />
					{config.label}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground">
				Original Order: <span className="font-mono">{originalOrder}</span>
			</p>
		</div>
	);
};

const RefundTimeline = ({ steps }: RefundTimelineProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center gap-3">
				<div
					className={`size-2 rounded-full ${
						step.status === 'done'
							? 'bg-green-500'
							: step.status === 'current'
								? 'bg-primary animate-pulse'
								: 'bg-muted-foreground/30'
					}`}
				/>
				<div className="flex-1">
					<p
						className={
							step.status === 'pending'
								? 'text-muted-foreground'
								: 'font-medium'
						}
					>
						{step.label}
					</p>
				</div>
				<p className="text-sm text-muted-foreground">{step.date}</p>
			</div>
		))}
	</div>
);

const RefundItemCard = ({ item, currency }: RefundItemCardProps) => (
	<div className="p-4 rounded-lg border space-y-2">
		<div className="flex items-start justify-between">
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.reason}</p>
			</div>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">
				Original: {currency}
				{item.originalPrice.toFixed(2)}
			</span>
			<span className="font-semibold text-green-600">
				Refund: {currency}
				{item.refundAmount.toFixed(2)}
			</span>
		</div>
	</div>
);

const RefundSummary = ({
	subtotal,
	restockingFee,
	refundTotal,
	currency,
	method,
}: RefundSummaryProps) => (
	<div className="p-4 rounded-lg border-2 border-green-500/20 bg-green-500/5 space-y-3">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Refund Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			{restockingFee > 0 && (
				<div className="flex justify-between text-amber-600">
					<span>Restocking Fee</span>
					<span>
						-{currency}
						{restockingFee.toFixed(2)}
					</span>
				</div>
			)}
		</div>
		<Separator />
		<div className="flex justify-between text-lg font-bold text-green-600">
			<span>Total Refund</span>
			<span>
				{currency}
				{refundTotal.toFixed(2)}
			</span>
		</div>
		<p className="text-sm text-muted-foreground">Refund to: {method}</p>
	</div>
);

const CustomerNote = ({ title, note }: CustomerNoteProps) => (
	<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-2">
		<div className="flex items-center gap-2 text-amber-600">
			<AlertTriangle className="size-4" />
			<p className="font-semibold">{title}</p>
		</div>
		<p className="text-sm text-muted-foreground">{note}</p>
	</div>
);

export default function Main() {
	const header: RefundHeaderProps = {
		title: 'Refund Request',
		refundNumber: 'REF-2024-0034',
		originalOrder: '#ORD-2024-1892',
		status: 'processing',
	};

	const timeline = [
		{ label: 'Refund Requested', date: 'Feb 1, 2024', status: 'done' as const },
		{ label: 'Under Review', date: 'Feb 2, 2024', status: 'current' as const },
		{ label: 'Refund Approved', date: 'Pending', status: 'pending' as const },
		{ label: 'Amount Credited', date: 'Pending', status: 'pending' as const },
	];

	const items: RefundItem[] = [
		{
			name: 'Premium Backpack',
			reason: 'Wrong color received',
			originalPrice: 129.99,
			refundAmount: 129.99,
		},
		{
			name: 'Travel Organizer Set',
			reason: 'Damaged in shipping',
			originalPrice: 49.99,
			refundAmount: 49.99,
		},
	];

	const summary: RefundSummaryProps = {
		subtotal: 179.98,
		restockingFee: 0,
		refundTotal: 179.98,
		currency: '$',
		method: 'Visa •••• 4242',
	};

	const note: CustomerNoteProps = {
		title: 'Customer Note',
		note: 'The backpack color was navy instead of the black I ordered. The organizer set had a broken zipper on arrival.',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<RefundHeader {...header} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<RefundTimeline steps={timeline} />
						<div className="space-y-3">
							<p className="text-sm font-semibold">Items Being Refunded</p>
							{items.map((item, index) => (
								<RefundItemCard key={index} item={item} currency="$" />
							))}
						</div>
						<RefundSummary {...summary} />
						<CustomerNote {...note} />
					</CardContent>
					<CardFooter className="border-t pt-6 flex flex-wrap gap-3">
						<Button variant="outline">View Original Order</Button>
						<Button variant="ghost">Contact Support</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
