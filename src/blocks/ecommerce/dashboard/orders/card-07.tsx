import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, Package, AlertTriangle, Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

interface ReturnRequest {
	id: string;
	orderId: string;
	product: { name: string; variant: string; price: string };
	reason: string;
	description: string;
	status: 'pending' | 'approved' | 'rejected' | 'completed';
	requestDate: string;
	refundAmount: string;
}

interface ReturnCardProps {
	returnRequest: ReturnRequest;
	labels: {
		returnId: string;
		originalOrder: string;
		reason: string;
		description: string;
		refund: string;
		approve: string;
		reject: string;
		contact: string;
	};
}

interface StatusBadgeProps {
	status: ReturnRequest['status'];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<ReturnRequest['status'], { icon: typeof Clock; variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
		pending: { icon: Clock, variant: 'outline', label: 'Pending Review' },
		approved: { icon: CheckCircle, variant: 'secondary', label: 'Approved' },
		rejected: { icon: XCircle, variant: 'destructive', label: 'Rejected' },
		completed: { icon: CheckCircle, variant: 'default', label: 'Completed' },
	};
	const { icon: Icon, variant, label } = config[status];
	return (
		<Badge variant={variant} className="gap-1.5">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const ProductInfo = ({ product }: { product: ReturnRequest['product'] }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
		<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<span className="font-semibold">{product.price}</span>
	</div>
);

const InfoRow = ({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) => (
	<div className="flex items-start gap-2">
		{Icon && <Icon className="size-4 text-muted-foreground mt-0.5" />}
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm">{value}</p>
		</div>
	</div>
);

const ReturnCard = ({ returnRequest, labels }: ReturnCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div>
					<CardDescription className="flex items-center gap-2">
						<RotateCcw className="size-3" />
						{labels.returnId}: {returnRequest.id}
					</CardDescription>
					<CardTitle className="text-base font-mono mt-1">
						{labels.originalOrder}: {returnRequest.orderId}
					</CardTitle>
				</div>
				<StatusBadge status={returnRequest.status} />
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<ProductInfo product={returnRequest.product} />
			
			<div className="grid grid-cols-2 gap-4">
				<InfoRow icon={AlertTriangle} label={labels.reason} value={returnRequest.reason} />
				<InfoRow icon={Clock} label="Request Date" value={returnRequest.requestDate} />
			</div>

			<div>
				<p className="text-xs text-muted-foreground mb-1">{labels.description}</p>
				<p className="text-sm bg-muted/30 rounded-lg p-3 border border-border/50">{returnRequest.description}</p>
			</div>

			<Separator />

			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">{labels.refund}</span>
				<span className="text-xl font-bold text-accent">{returnRequest.refundAmount}</span>
			</div>
		</CardContent>
		{returnRequest.status === 'pending' && (
			<CardFooter className="gap-3 border-t border-border/50 bg-muted/10">
				<Button variant="outline" className="flex-1 gap-1.5">
					<MessageCircle className="size-4" />
					{labels.contact}
				</Button>
				<Button variant="destructive" className="flex-1">
					{labels.reject}
				</Button>
				<Button className="flex-1">
					{labels.approve}
				</Button>
			</CardFooter>
		)}
	</Card>
);

export default function Main() {
	const labels = {
		returnId: 'Return',
		originalOrder: 'Order',
		reason: 'Reason',
		description: 'Customer Note',
		refund: 'Refund Amount',
		approve: 'Approve',
		reject: 'Reject',
		contact: 'Contact',
	};

	const returnRequest: ReturnRequest = {
		id: 'RET-001',
		orderId: 'ORD-7891',
		product: { name: 'Wireless Headphones Pro', variant: 'Black / Over-ear', price: '$199.00' },
		reason: 'Defective Product',
		description: 'The left speaker stopped working after 2 weeks of normal use. I\'ve tried resetting and updating firmware but the issue persists.',
		status: 'pending',
		requestDate: 'Jan 28, 2026',
		refundAmount: '$199.00',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<ReturnCard returnRequest={returnRequest} labels={labels} />
			</div>
		</section>
	);
}
