import { Package, Truck, Clock, Check, MapPin, Warehouse, Home, ArrowRight, Circle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const TrackingTimeline = ({
	events,
}: {
	events: { icon: React.ComponentType<{ className?: string }>; title: string; location: string; time: string; completed: boolean; current?: boolean }[];
}) => (
	<div className="space-y-4">
		{events.map((event, i) => {
			const Icon = event.icon;
			return (
				<div key={i} className="flex gap-4">
					<div className="flex flex-col items-center">
						<div
							className={`
								flex size-10 shrink-0 items-center justify-center rounded-full
								${event.completed ? 'bg-primary text-primary-foreground' : ''}
								${event.current ? 'bg-primary/10 text-primary ring-2 ring-primary' : ''}
								${!event.completed && !event.current ? 'bg-muted text-muted-foreground' : ''}
							`}
						>
							<Icon className="size-5" />
						</div>
						{i < events.length - 1 && (
							<div className={`w-0.5 flex-1 min-h-[24px] ${event.completed ? 'bg-primary' : 'bg-muted'}`} />
						)}
					</div>
					<div className={event.current ? '' : event.completed ? '' : 'opacity-50'}>
						<div className="flex items-center gap-2">
							<h4 className="font-medium">{event.title}</h4>
							{event.current && <Badge>Current</Badge>}
						</div>
						<p className="text-sm text-muted-foreground">{event.location}</p>
						<p className="text-xs text-muted-foreground mt-1">{event.time}</p>
					</div>
				</div>
			);
		})}
	</div>
);

const SpeedOption = ({
	value,
	name,
	time,
	price,
	selected,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex-1 flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<span className="font-bold text-lg">{name}</span>
		<span className="text-sm opacity-70">{time}</span>
		<span className="font-bold text-lg mt-1">{price}</span>
	</Label>
);

export default function Main() {
	const trackingEvents = [
		{ icon: Package, title: 'Order Placed', location: 'Online', time: 'Jan 14, 2:30 PM', completed: true },
		{ icon: Warehouse, title: 'Processing at Warehouse', location: 'Distribution Center, NJ', time: 'Jan 14, 5:00 PM', completed: true },
		{ icon: Truck, title: 'In Transit', location: 'On the way to your area', time: 'Jan 15, 9:00 AM', current: true, completed: false },
		{ icon: MapPin, title: 'Out for Delivery', location: 'Local delivery hub', time: 'Expected Jan 17', completed: false },
		{ icon: Home, title: 'Delivered', location: '123 Main St, New York', time: 'Expected Jan 17, 2-6 PM', completed: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Order Tracking</h1>

				<div className="grid @lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<span className="flex items-center gap-2">
									<Truck className="size-5 text-primary" />
									Shipment Progress
								</span>
								<Badge variant="outline">In Transit</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<TrackingTimeline events={trackingEvents} />
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Upgrade Shipping</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Want faster delivery? Upgrade your shipping now.
								</p>
								<RadioGroup defaultValue="standard" className="flex gap-3">
									<SpeedOption value="standard" name="Standard" time="5-7 days" price="$0" />
									<SpeedOption value="express" name="Express" time="2-3 days" price="+$7" />
								</RadioGroup>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4">
								<div className="flex items-center gap-3 mb-3">
									<Package className="size-5 text-primary" />
									<span className="font-medium">Order #12345</span>
								</div>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Items</span>
										<span>3 items</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Carrier</span>
										<span>FedEx Ground</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Tracking #</span>
										<span className="font-mono">7894561230</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Button className="w-full">
							Continue Shopping
							<ArrowRight className="size-5 ml-2" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
