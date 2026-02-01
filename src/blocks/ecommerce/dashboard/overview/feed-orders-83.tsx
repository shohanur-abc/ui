import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Package,
	ShoppingCart,
	Truck,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type OrderUpdate = {
	id: string;
	orderId: string;
	customer: { name: string; initials: string };
	status:
		| 'placed'
		| 'paid'
		| 'processing'
		| 'shipped'
		| 'delivered'
		| 'cancelled';
	amount: string;
	items: number;
	time: string;
};

const getStatusConfig = (status: OrderUpdate['status']) => {
	switch (status) {
		case 'placed':
			return {
				icon: ShoppingCart,
				color: 'bg-primary/10 text-primary',
				label: 'Order Placed',
			};
		case 'paid':
			return {
				icon: CreditCard,
				color: 'bg-emerald-500/10 text-emerald-500',
				label: 'Payment Received',
			};
		case 'processing':
			return {
				icon: Package,
				color: 'bg-blue-500/10 text-blue-500',
				label: 'Processing',
			};
		case 'shipped':
			return {
				icon: Truck,
				color: 'bg-violet-500/10 text-violet-500',
				label: 'Shipped',
			};
		case 'delivered':
			return {
				icon: CheckCircle2,
				color: 'bg-emerald-500/10 text-emerald-500',
				label: 'Delivered',
			};
		case 'cancelled':
			return {
				icon: XCircle,
				color: 'bg-red-500/10 text-red-500',
				label: 'Cancelled',
			};
	}
};

const OrderUpdateCard = ({
	orderId,
	customer,
	status,
	amount,
	items,
	time,
}: OrderUpdate) => {
	const config = getStatusConfig(status);
	const Icon = config.icon;

	return (
		<div className="flex items-center gap-4 rounded-lg border bg-card p-4">
			<div className={`rounded-lg p-2.5 ${config.color}`}>
				<Icon className="size-5" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<p className="font-medium">{orderId}</p>
					<Badge variant="secondary" className={config.color}>
						{config.label}
					</Badge>
				</div>
				<div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
					<div className="flex items-center gap-1.5">
						<Avatar className="size-5">
							<AvatarFallback className="text-[10px]">
								{customer.initials}
							</AvatarFallback>
						</Avatar>
						{customer.name}
					</div>
					<span>•</span>
					<span>{items} items</span>
					<span>•</span>
					<span className="font-medium text-foreground">{amount}</span>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<span className="text-xs text-muted-foreground">{time}</span>
				<Button variant="ghost" size="icon" className="size-8">
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const orderUpdates: OrderUpdate[] = [
		{
			id: '1',
			orderId: 'ORD-4521',
			customer: { name: 'John Doe', initials: 'JD' },
			status: 'placed',
			amount: '$234.50',
			items: 3,
			time: '2m ago',
		},
		{
			id: '2',
			orderId: 'ORD-4520',
			customer: { name: 'Jane Smith', initials: 'JS' },
			status: 'paid',
			amount: '$189.00',
			items: 2,
			time: '15m ago',
		},
		{
			id: '3',
			orderId: 'ORD-4519',
			customer: { name: 'Bob Wilson', initials: 'BW' },
			status: 'processing',
			amount: '$456.20',
			items: 5,
			time: '32m ago',
		},
		{
			id: '4',
			orderId: 'ORD-4518',
			customer: { name: 'Alice Brown', initials: 'AB' },
			status: 'shipped',
			amount: '$78.90',
			items: 1,
			time: '1h ago',
		},
		{
			id: '5',
			orderId: 'ORD-4517',
			customer: { name: 'Mike Johnson', initials: 'MJ' },
			status: 'delivered',
			amount: '$321.00',
			items: 4,
			time: '2h ago',
		},
		{
			id: '6',
			orderId: 'ORD-4516',
			customer: { name: 'Sarah Davis', initials: 'SD' },
			status: 'cancelled',
			amount: '$145.50',
			items: 2,
			time: '3h ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle>Order Updates</CardTitle>
						<CardDescription>Real-time order status changes</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{orderUpdates.map((update) => (
							<OrderUpdateCard key={update.id} {...update} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
