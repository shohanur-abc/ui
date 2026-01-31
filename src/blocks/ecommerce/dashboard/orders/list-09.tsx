import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, Package, DollarSign, Calendar, CheckCircle, XCircle, Clock, Eye, MessageSquare } from 'lucide-react';

interface RefundRequest {
	id: string;
	orderId: string;
	customer: { name: string; avatar: string; initials: string };
	reason: string;
	items: { name: string; quantity: number }[];
	refundAmount: string;
	originalAmount: string;
	requestedAt: string;
	status: 'pending' | 'approved' | 'rejected' | 'processing';
}

interface RefundRequestRowProps {
	request: RefundRequest;
	labels: {
		original: string;
		refund: string;
		approve: string;
		reject: string;
		view: string;
	};
}

const StatusBadge = ({ status }: { status: RefundRequest['status'] }) => {
	const config: Record<RefundRequest['status'], { icon: typeof Clock; className: string; label: string }> = {
		pending: { icon: Clock, className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Pending' },
		approved: { icon: CheckCircle, className: 'bg-accent/10 text-accent border-accent/30', label: 'Approved' },
		rejected: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Rejected' },
		processing: { icon: RotateCcw, className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Processing' },
	};
	const { icon: Icon, className, label } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const RefundRequestRow = ({ request, labels }: RefundRequestRowProps) => (
	<div className="p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all">
		<div className="flex items-start gap-4 mb-3">
			<Avatar className="size-10">
				<AvatarImage src={request.customer.avatar} alt={request.customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary text-sm">{request.customer.initials}</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-0.5">
					<span className="font-semibold">{request.customer.name}</span>
					<span className="text-xs text-muted-foreground font-mono">{request.id}</span>
				</div>
				<p className="text-sm text-muted-foreground">Order: {request.orderId}</p>
			</div>

			<StatusBadge status={request.status} />
		</div>

		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 mb-3">
			<p className="text-sm font-medium mb-2">Reason: {request.reason}</p>
			<div className="flex flex-wrap gap-2">
				{request.items.map((item, i) => (
					<Badge key={i} variant="secondary" className="gap-1">
						<Package className="size-3" />
						{item.name} × {item.quantity}
					</Badge>
				))}
			</div>
		</div>

		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4 text-sm">
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<Calendar className="size-4" />
					{request.requestedAt}
				</div>
				<Separator orientation="vertical" className="h-4" />
				<div>
					<span className="text-muted-foreground">{labels.original}: </span>
					<span className="line-through text-muted-foreground">{request.originalAmount}</span>
				</div>
				<div>
					<span className="text-muted-foreground">{labels.refund}: </span>
					<span className="font-semibold text-primary">{request.refundAmount}</span>
				</div>
			</div>

			{request.status === 'pending' ? (
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:bg-destructive/10">
						<XCircle className="size-4" />
						{labels.reject}
					</Button>
					<Button size="sm" className="gap-1.5">
						<CheckCircle className="size-4" />
						{labels.approve}
					</Button>
				</div>
			) : (
				<Button variant="outline" size="sm" className="gap-1.5">
					<Eye className="size-4" />
					{labels.view}
				</Button>
			)}
		</div>
	</div>
);

export default function Main() {
	const labels = {
		original: 'Original',
		refund: 'Refund',
		approve: 'Approve',
		reject: 'Reject',
		view: 'View Details',
	};

	const requests: RefundRequest[] = [
		{ id: 'REF-001', orderId: '#ORD-2024-156', customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' }, reason: 'Product arrived damaged', items: [{ name: 'Wireless Headphones', quantity: 1 }], refundAmount: '$159.00', originalAmount: '$179.00', requestedAt: '2 hours ago', status: 'pending' },
		{ id: 'REF-002', orderId: '#ORD-2024-142', customer: { name: 'Mike Chen', avatar: '', initials: 'MC' }, reason: 'Wrong size received', items: [{ name: 'T-Shirt XL', quantity: 2 }], refundAmount: '$59.98', originalAmount: '$59.98', requestedAt: 'Yesterday', status: 'approved' },
		{ id: 'REF-003', orderId: '#ORD-2024-138', customer: { name: 'Emily Davis', avatar: '', initials: 'ED' }, reason: 'Changed my mind', items: [{ name: 'Laptop Stand', quantity: 1 }, { name: 'Mouse Pad', quantity: 1 }], refundAmount: '$104.00', originalAmount: '$124.00', requestedAt: '3 days ago', status: 'processing' },
		{ id: 'REF-004', orderId: '#ORD-2024-125', customer: { name: 'Alex Brown', avatar: '', initials: 'AB' }, reason: 'Item not as described', items: [{ name: 'Smart Watch', quantity: 1 }], refundAmount: '$299.00', originalAmount: '$299.00', requestedAt: '5 days ago', status: 'rejected' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-3">
					{requests.map((request) => (
						<RefundRequestRow key={request.id} request={request} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
