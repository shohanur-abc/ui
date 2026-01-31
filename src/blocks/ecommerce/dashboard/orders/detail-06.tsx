import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Package, Calendar, DollarSign, Camera, Clock, CheckCircle, XCircle, AlertTriangle, MessageSquare, Truck } from 'lucide-react';

interface ReturnDetailProps {
	returnRequest: {
		id: string;
		orderId: string;
		status: 'pending' | 'approved' | 'shipped' | 'received' | 'refunded' | 'rejected';
		progress: number;
		reason: string;
		description: string;
		items: { name: string; sku: string; quantity: number; condition: string; price: string }[];
		refundAmount: string;
		refundMethod: string;
		dates: { requested: string; approved?: string; received?: string; refunded?: string };
		returnLabel?: { carrier: string; tracking: string };
		photos?: number;
	};
	labels: {
		reason: string;
		items: string;
		refund: string;
		timeline: string;
		returnLabel: string;
		viewPhotos: string;
		contact: string;
		approve: string;
		reject: string;
	};
}

const StatusConfig = {
	pending: { icon: Clock, className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Pending Review' },
	approved: { icon: CheckCircle, className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Approved' },
	shipped: { icon: Truck, className: 'bg-primary/10 text-primary border-primary/30', label: 'Return Shipped' },
	received: { icon: Package, className: 'bg-accent/10 text-accent border-accent/30', label: 'Item Received' },
	refunded: { icon: DollarSign, className: 'bg-accent/10 text-accent border-accent/30', label: 'Refunded' },
	rejected: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Rejected' },
};

const TimelineStep = ({ step, date, active, completed }: { step: string; date?: string; active?: boolean; completed?: boolean }) => (
	<div className="flex-1 text-center">
		<div className={`size-8 rounded-full mx-auto mb-2 flex items-center justify-center ${completed ? 'bg-accent text-white' : active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
			{completed ? <CheckCircle className="size-4" /> : <div className="size-2 rounded-full bg-current" />}
		</div>
		<p className={`text-xs font-medium ${active || completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</p>
		{date && <p className="text-xs text-muted-foreground mt-0.5">{date}</p>}
	</div>
);

const ReturnDetail = ({ returnRequest, labels }: ReturnDetailProps) => {
	const { icon: StatusIcon, className: statusClassName, label: statusLabel } = StatusConfig[returnRequest.status];
	const steps = ['Requested', 'Approved', 'Shipped', 'Received', 'Refunded'];
	const currentStep = ['pending', 'approved', 'shipped', 'received', 'refunded'].indexOf(returnRequest.status);

	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<RotateCcw className="size-5 text-primary" />
						</div>
						<div>
							<CardTitle className="text-lg">{returnRequest.id}</CardTitle>
							<p className="text-sm text-muted-foreground">Order {returnRequest.orderId}</p>
						</div>
					</div>
					<Badge variant="outline" className={`gap-1 ${statusClassName}`}>
						<StatusIcon className="size-3" />
						{statusLabel}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				{returnRequest.status !== 'rejected' && (
					<div className="p-4 rounded-xl bg-muted/20">
						<div className="flex items-center justify-between mb-4">
							{steps.map((step, i) => (
								<TimelineStep key={step} step={step} completed={i < currentStep} active={i === currentStep} date={i === 0 ? returnRequest.dates.requested : i === currentStep ? 'Now' : undefined} />
							))}
						</div>
						<Progress value={returnRequest.progress} className="h-1" />
					</div>
				)}

				<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
					<div className="flex items-center gap-2 mb-2">
						<AlertTriangle className="size-4 text-primary" />
						<p className="font-semibold">{labels.reason}</p>
					</div>
					<Badge variant="secondary" className="mb-2">{returnRequest.reason}</Badge>
					<p className="text-sm text-muted-foreground">{returnRequest.description}</p>
					{returnRequest.photos && (
						<Button variant="link" className="text-xs p-0 h-auto mt-2 gap-1">
							<Camera className="size-3" />
							{returnRequest.photos} photos attached
						</Button>
					)}
				</div>

				<div>
					<p className="text-sm font-semibold text-muted-foreground mb-3">{labels.items}</p>
					<div className="space-y-3">
						{returnRequest.items.map((item, i) => (
							<div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
								<Package className="size-8 text-muted-foreground" />
								<div className="flex-1">
									<p className="font-medium">{item.name}</p>
									<p className="text-xs text-muted-foreground">SKU: {item.sku} • Qty: {item.quantity}</p>
								</div>
								<div className="text-right">
									<p className="font-semibold">{item.price}</p>
									<Badge variant="outline" className="text-xs">{item.condition}</Badge>
								</div>
							</div>
						))}
					</div>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
						<p className="text-sm text-muted-foreground mb-1">{labels.refund}</p>
						<p className="text-2xl font-bold text-accent">{returnRequest.refundAmount}</p>
						<p className="text-xs text-muted-foreground">{returnRequest.refundMethod}</p>
					</div>

					{returnRequest.returnLabel && (
						<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
							<p className="text-sm text-muted-foreground mb-1">{labels.returnLabel}</p>
							<p className="font-medium">{returnRequest.returnLabel.carrier}</p>
							<code className="text-xs text-muted-foreground">{returnRequest.returnLabel.tracking}</code>
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="gap-3 border-t border-border/50">
				<Button variant="outline" className="flex-1 gap-1.5">
					<MessageSquare className="size-4" />
					{labels.contact}
				</Button>
				{returnRequest.status === 'pending' && (
					<>
						<Button variant="destructive" className="flex-1 gap-1.5">
							<XCircle className="size-4" />
							{labels.reject}
						</Button>
						<Button className="flex-1 gap-1.5">
							<CheckCircle className="size-4" />
							{labels.approve}
						</Button>
					</>
				)}
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const labels = {
		reason: 'Return Reason',
		items: 'Items Being Returned',
		refund: 'Refund Amount',
		timeline: 'Timeline',
		returnLabel: 'Return Label',
		viewPhotos: 'View Photos',
		contact: 'Contact Customer',
		approve: 'Approve',
		reject: 'Reject',
	};

	const returnRequest = {
		id: 'RET-2024-001',
		orderId: 'ORD-2024-001',
		status: 'approved' as const,
		progress: 40,
		reason: 'Item Not as Described',
		description: 'The color shown in the photos does not match the actual product. Expected navy blue but received a lighter shade.',
		items: [
			{ name: 'Wireless Bluetooth Headphones', sku: 'SKU-WBH-001', quantity: 1, condition: 'Good', price: '$159.00' },
		],
		refundAmount: '$159.00',
		refundMethod: 'Original payment method (Visa •••• 4242)',
		dates: { requested: 'Jan 30, 2024', approved: 'Jan 31, 2024' },
		returnLabel: { carrier: 'USPS', tracking: '9400111899223456789012' },
		photos: 3,
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<ReturnDetail returnRequest={returnRequest} labels={labels} />
			</div>
		</section>
	);
}
