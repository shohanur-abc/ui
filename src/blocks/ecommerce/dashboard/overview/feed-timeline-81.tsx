import {
	CheckCircle2,
	Clock,
	CreditCard,
	MessageSquare,
	Package,
	ShoppingCart,
	Star,
	Truck,
	User,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type ActivityItem = {
	id: string;
	type:
		| 'order'
		| 'payment'
		| 'review'
		| 'message'
		| 'delivery'
		| 'refund'
		| 'signup';
	title: string;
	description: string;
	time: string;
	user?: { name: string; initials: string };
};

const getActivityIcon = (type: ActivityItem['type']) => {
	switch (type) {
		case 'order':
			return { icon: ShoppingCart, color: 'bg-primary/10 text-primary' };
		case 'payment':
			return { icon: CreditCard, color: 'bg-emerald-500/10 text-emerald-500' };
		case 'review':
			return { icon: Star, color: 'bg-amber-500/10 text-amber-500' };
		case 'message':
			return { icon: MessageSquare, color: 'bg-blue-500/10 text-blue-500' };
		case 'delivery':
			return { icon: Truck, color: 'bg-violet-500/10 text-violet-500' };
		case 'refund':
			return { icon: XCircle, color: 'bg-red-500/10 text-red-500' };
		case 'signup':
			return { icon: User, color: 'bg-teal-500/10 text-teal-500' };
	}
};

const ActivityItemComponent = ({
	type,
	title,
	description,
	time,
	user,
}: ActivityItem) => {
	const config = getActivityIcon(type);
	const Icon = config.icon;

	return (
		<div className="flex gap-4">
			<div className="relative flex flex-col items-center">
				<div className={`rounded-full p-2 ${config.color}`}>
					<Icon className="size-4" />
				</div>
				<div className="absolute top-10 h-full w-px bg-border" />
			</div>
			<div className="flex-1 pb-6">
				<div className="flex items-start justify-between gap-2">
					<div>
						<p className="font-medium">{title}</p>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					<span className="shrink-0 text-xs text-muted-foreground">{time}</span>
				</div>
				{user && (
					<div className="mt-2 flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarFallback className="text-[10px]">
								{user.initials}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm">{user.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default function Main() {
	const activities: ActivityItem[] = [
		{
			id: '1',
			type: 'order',
			title: 'New order placed',
			description: 'Order #ORD-4521 for $234.50',
			time: '2m ago',
			user: { name: 'John Doe', initials: 'JD' },
		},
		{
			id: '2',
			type: 'payment',
			title: 'Payment received',
			description: 'Payment of $189.00 processed',
			time: '15m ago',
		},
		{
			id: '3',
			type: 'review',
			title: 'New 5-star review',
			description: 'Wireless Headphones Pro received a review',
			time: '32m ago',
			user: { name: 'Jane Smith', initials: 'JS' },
		},
		{
			id: '4',
			type: 'delivery',
			title: 'Order delivered',
			description: 'Order #ORD-4519 was delivered',
			time: '1h ago',
		},
		{
			id: '5',
			type: 'signup',
			title: 'New customer signup',
			description: 'Lisa Davis joined the platform',
			time: '2h ago',
			user: { name: 'Lisa Davis', initials: 'LD' },
		},
		{
			id: '6',
			type: 'message',
			title: 'Support ticket opened',
			description: 'Customer inquiry about shipping',
			time: '3h ago',
		},
		{
			id: '7',
			type: 'refund',
			title: 'Refund processed',
			description: 'Refund of $45.00 for order #ORD-4510',
			time: '4h ago',
		},
		{
			id: '8',
			type: 'order',
			title: 'New order placed',
			description: 'Order #ORD-4520 for $456.20',
			time: '5h ago',
			user: { name: 'Bob Wilson', initials: 'BW' },
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="size-5 text-primary" />
							Activity Timeline
						</CardTitle>
						<CardDescription>Recent activity across your store</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-0">
							{activities.map((activity) => (
								<ActivityItemComponent key={activity.id} {...activity} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
