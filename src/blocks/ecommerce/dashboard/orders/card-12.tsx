import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Repeat, Calendar, CreditCard, Package, Settings, Pause, Play } from 'lucide-react';

interface Subscription {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	product: string;
	frequency: 'weekly' | 'biweekly' | 'monthly';
	amount: string;
	nextDelivery: string;
	status: 'active' | 'paused';
	deliveriesCompleted: number;
}

interface SubscriptionCardProps {
	subscription: Subscription;
	labels: { nextDelivery: string; deliveries: string; manage: string };
}

const FrequencyBadge = ({ frequency }: { frequency: Subscription['frequency'] }) => {
	const labels: Record<Subscription['frequency'], string> = {
		weekly: 'Weekly',
		biweekly: 'Bi-weekly',
		monthly: 'Monthly',
	};
	return (
		<Badge variant="secondary" className="gap-1">
			<Repeat className="size-3" />
			{labels[frequency]}
		</Badge>
	);
};

const StatusIndicator = ({ status }: { status: Subscription['status'] }) => (
	<span className={`inline-flex items-center gap-1.5 text-sm ${status === 'active' ? 'text-accent' : 'text-muted-foreground'}`}>
		<span className={`size-2 rounded-full ${status === 'active' ? 'bg-accent' : 'bg-muted-foreground'}`} />
		{status === 'active' ? 'Active' : 'Paused'}
	</span>
);

const SubscriptionCard = ({ subscription, labels }: SubscriptionCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
		<CardContent className="p-4">
			<div className="flex items-start gap-4">
				<Avatar className="size-12">
					<AvatarImage src={subscription.customer.avatar} alt={subscription.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">{subscription.customer.initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-1">
						<span className="font-semibold">{subscription.customer.name}</span>
						<StatusIndicator status={subscription.status} />
					</div>
					<p className="text-sm text-muted-foreground mb-2">{subscription.product}</p>
					<div className="flex items-center gap-3 flex-wrap">
						<FrequencyBadge frequency={subscription.frequency} />
						<span className="font-semibold">{subscription.amount}</span>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-sm">
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<Calendar className="size-4" />
					<span>{labels.nextDelivery}: {subscription.nextDelivery}</span>
				</div>
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<Package className="size-4" />
					<span>{subscription.deliveriesCompleted} {labels.deliveries}</span>
				</div>
			</div>

			<div className="flex items-center gap-2 mt-4">
				<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
					{subscription.status === 'active' ? <Pause className="size-4" /> : <Play className="size-4" />}
				</Button>
				<Button variant="ghost" size="icon-sm" className="hover:bg-muted">
					<Settings className="size-4" />
				</Button>
				<Button variant="outline" size="sm" className="ml-auto">
					{labels.manage}
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = { nextDelivery: 'Next', deliveries: 'deliveries', manage: 'Manage' };

	const subscriptions: Subscription[] = [
		{ id: 'SUB-001', customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' }, product: 'Coffee Bean Subscription - Dark Roast', frequency: 'biweekly', amount: '$29.99', nextDelivery: 'Feb 3', status: 'active', deliveriesCompleted: 12 },
		{ id: 'SUB-002', customer: { name: 'Mike Chen', avatar: '', initials: 'MC' }, product: 'Vitamin Pack - Complete Daily', frequency: 'monthly', amount: '$49.99', nextDelivery: 'Feb 1', status: 'active', deliveriesCompleted: 6 },
		{ id: 'SUB-003', customer: { name: 'Emily Davis', avatar: '', initials: 'ED' }, product: 'Snack Box - Healthy Mix', frequency: 'weekly', amount: '$14.99', nextDelivery: 'On Hold', status: 'paused', deliveriesCompleted: 24 },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-4">
					{subscriptions.map((subscription) => (
						<SubscriptionCard key={subscription.id} subscription={subscription} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
