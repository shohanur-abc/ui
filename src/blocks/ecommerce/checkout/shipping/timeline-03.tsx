import { Package, Truck, Clock, Check, MapPin, Calendar, ArrowRight, Circle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const DeliveryTimeline = ({
	events,
}: {
	events: { date: string; time: string; title: string; description: string; completed: boolean; current?: boolean }[];
}) => (
	<div className="space-y-0">
		{events.map((event, i) => (
			<div key={i} className="flex gap-4">
				<div className="flex flex-col items-center">
					<div
						className={`
							flex size-8 shrink-0 items-center justify-center rounded-full border-2
							${event.completed ? 'bg-primary border-primary text-primary-foreground' : ''}
							${event.current ? 'border-primary bg-primary/10 text-primary' : ''}
							${!event.completed && !event.current ? 'border-muted bg-background' : ''}
						`}
					>
						{event.completed ? <Check className="size-4" /> : <Circle className="size-3" />}
					</div>
					{i < events.length - 1 && (
						<div className={`w-0.5 h-12 ${event.completed ? 'bg-primary' : 'bg-muted'}`} />
					)}
				</div>
				<div className="pb-4">
					<div className="flex items-center gap-2 mb-1">
						<span className="text-sm font-medium text-muted-foreground">{event.date}</span>
						<span className="text-sm text-muted-foreground">•</span>
						<span className="text-sm text-muted-foreground">{event.time}</span>
						{event.current && <Badge className="text-xs">Next</Badge>}
					</div>
					<h4 className={`font-medium ${!event.completed && !event.current ? 'text-muted-foreground' : ''}`}>
						{event.title}
					</h4>
					<p className="text-sm text-muted-foreground">{event.description}</p>
				</div>
			</div>
		))}
	</div>
);

const ShippingOption = ({
	value,
	name,
	time,
	price,
	eta,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	eta: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<div className="flex items-center gap-2">
					<span className="font-medium">{name}</span>
					<Badge variant="secondary" className="text-xs">{time}</Badge>
				</div>
				<p className="text-sm text-muted-foreground">Est. delivery: {eta}</p>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const deliveryEvents = [
		{ date: 'Today', time: '2:30 PM', title: 'Order Placed', description: 'Your order has been confirmed', completed: true },
		{ date: 'Today', time: '5:00 PM', title: 'Processing', description: 'Order is being prepared', completed: true },
		{ date: 'Jan 15', time: '9:00 AM', title: 'Shipped', description: 'Package handed to carrier', current: true, completed: false },
		{ date: 'Jan 17', time: '2:00 PM', title: 'Out for Delivery', description: 'Package is on the way', completed: false },
		{ date: 'Jan 17', time: '6:00 PM', title: 'Delivered', description: 'Package delivered to your address', completed: false },
	];

	const options = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99', eta: 'Jan 20' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99', eta: 'Jan 17' },
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99', eta: 'Jan 15' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Shipping & Delivery</h1>

				<div className="grid @lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Truck className="size-5 text-primary" />
								Shipping Method
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="express" className="space-y-3">
								{options.map((option) => (
									<ShippingOption key={option.value} {...option} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Calendar className="size-5 text-primary" />
								Delivery Timeline
							</CardTitle>
						</CardHeader>
						<CardContent>
							<DeliveryTimeline events={deliveryEvents} />
						</CardContent>
					</Card>
				</div>

				<div className="flex gap-3 justify-center pt-8">
					<Button variant="outline">Back</Button>
					<Button>
						Continue
						<ArrowRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
