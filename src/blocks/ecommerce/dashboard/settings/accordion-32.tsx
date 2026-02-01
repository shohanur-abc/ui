import {
	Bell,
	Check,
	ChevronDown,
	ChevronRight,
	CreditCard,
	Mail,
	MessageCircle,
	Package,
	Settings2,
	Shield,
	ShoppingCart,
	Star,
	Truck,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type NotificationGroup = {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	count: number;
	items: {
		id: string;
		title: string;
		description: string;
		enabled: boolean;
	}[];
};

const NotificationGroupAccordion = ({
	name,
	icon: Icon,
	count,
	items,
}: NotificationGroup) => (
	<Collapsible className="group">
		<CollapsibleTrigger asChild>
			<div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:bg-muted/30 data-[state=open]:rounded-b-none">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-5" />
					</div>
					<div>
						<h4 className="font-medium">{name}</h4>
						<p className="text-sm text-muted-foreground">
							{count} notifications
						</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Badge variant="secondary">
						{items.filter((i) => i.enabled).length} active
					</Badge>
					<ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
				</div>
			</div>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="divide-y rounded-b-lg border border-t-0 bg-muted/10">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between px-4 py-3"
					>
						<div className="pl-13">
							<p className="text-sm font-medium">{item.title}</p>
							<p className="text-xs text-muted-foreground">
								{item.description}
							</p>
						</div>
						<Switch defaultChecked={item.enabled} />
					</div>
				))}
			</div>
		</CollapsibleContent>
	</Collapsible>
);

export default function Main() {
	const groups: NotificationGroup[] = [
		{
			id: 'orders',
			name: 'Orders & Shipping',
			icon: Package,
			count: 5,
			items: [
				{
					id: '1',
					title: 'New order received',
					description: 'When a customer places an order',
					enabled: true,
				},
				{
					id: '2',
					title: 'Order shipped',
					description: 'When an order is shipped',
					enabled: true,
				},
				{
					id: '3',
					title: 'Order delivered',
					description: 'When delivery is confirmed',
					enabled: true,
				},
				{
					id: '4',
					title: 'Order cancelled',
					description: 'When an order is cancelled',
					enabled: true,
				},
				{
					id: '5',
					title: 'Order refunded',
					description: 'When a refund is processed',
					enabled: false,
				},
			],
		},
		{
			id: 'customers',
			name: 'Customers',
			icon: Users,
			count: 4,
			items: [
				{
					id: '1',
					title: 'New customer signup',
					description: 'When a new customer registers',
					enabled: true,
				},
				{
					id: '2',
					title: 'Customer inquiry',
					description: 'Contact form submissions',
					enabled: true,
				},
				{
					id: '3',
					title: 'Cart abandonment',
					description: 'When customers leave items in cart',
					enabled: false,
				},
				{
					id: '4',
					title: 'Wishlist activity',
					description: 'Product added to wishlist',
					enabled: false,
				},
			],
		},
		{
			id: 'reviews',
			name: 'Reviews & Ratings',
			icon: Star,
			count: 3,
			items: [
				{
					id: '1',
					title: 'New review submitted',
					description: 'When a customer leaves a review',
					enabled: true,
				},
				{
					id: '2',
					title: 'Low rating alert',
					description: 'Reviews with 2 stars or less',
					enabled: true,
				},
				{
					id: '3',
					title: 'Review replies',
					description: 'When someone replies to reviews',
					enabled: false,
				},
			],
		},
		{
			id: 'payments',
			name: 'Payments',
			icon: CreditCard,
			count: 3,
			items: [
				{
					id: '1',
					title: 'Payment received',
					description: 'Successful payment confirmations',
					enabled: true,
				},
				{
					id: '2',
					title: 'Payment failed',
					description: 'Failed payment attempts',
					enabled: true,
				},
				{
					id: '3',
					title: 'Subscription renewal',
					description: 'Upcoming subscription charges',
					enabled: true,
				},
			],
		},
		{
			id: 'security',
			name: 'Security',
			icon: Shield,
			count: 4,
			items: [
				{
					id: '1',
					title: 'Login from new device',
					description: 'Sign in from unrecognized device',
					enabled: true,
				},
				{
					id: '2',
					title: 'Password changed',
					description: 'Password update confirmation',
					enabled: true,
				},
				{
					id: '3',
					title: 'Suspicious activity',
					description: 'Unusual account behavior',
					enabled: true,
				},
				{
					id: '4',
					title: '2FA enabled/disabled',
					description: 'Two-factor auth changes',
					enabled: true,
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Settings2 className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Notification Categories</CardTitle>
										<CardDescription>
											Manage notifications by category
										</CardDescription>
									</div>
								</div>
								<Button variant="outline" size="sm">
									Enable All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{groups.map((group) => (
								<NotificationGroupAccordion key={group.id} {...group} />
							))}
						</CardContent>
					</Card>

					<Card className="border-primary/20 bg-primary/5">
						<CardContent className="flex items-center justify-between pt-6">
							<div className="flex items-center gap-3">
								<Mail className="size-5 text-primary" />
								<div>
									<h4 className="font-medium">Email Digest</h4>
									<p className="text-sm text-muted-foreground">
										Receive a daily summary instead of individual emails
									</p>
								</div>
							</div>
							<Switch defaultChecked />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
