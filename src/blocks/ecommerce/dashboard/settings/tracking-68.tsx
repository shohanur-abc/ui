import {
	AlertCircle,
	Check,
	Clock,
	ExternalLink,
	MapPin,
	Package,
	Search,
	Settings2,
	Truck,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type TrackingEvent = {
	id: string;
	status: string;
	location: string;
	timestamp: string;
	isCompleted: boolean;
};

type NotificationTrigger = {
	id: string;
	event: string;
	description: string;
	enabled: boolean;
};

const TrackingTimeline = ({ events }: { events: TrackingEvent[] }) => (
	<div className="space-y-4">
		{events.map((event, index) => (
			<div key={event.id} className="flex gap-4">
				<div className="flex flex-col items-center">
					<div
						className={`flex size-8 items-center justify-center rounded-full ${
							event.isCompleted
								? 'bg-emerald-500/10 text-emerald-500'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						{event.isCompleted ? (
							<Check className="size-4" />
						) : (
							<Clock className="size-4" />
						)}
					</div>
					{index < events.length - 1 && (
						<div
							className={`w-0.5 flex-1 ${
								event.isCompleted ? 'bg-emerald-500/30' : 'bg-muted'
							}`}
						/>
					)}
				</div>
				<div className="flex-1 pb-4">
					<p className="font-medium">{event.status}</p>
					<p className="text-sm text-muted-foreground">{event.location}</p>
					<p className="text-xs text-muted-foreground mt-1">
						{event.timestamp}
					</p>
				</div>
			</div>
		))}
	</div>
);

const NotificationToggle = ({
	event,
	description,
	enabled,
}: NotificationTrigger) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<p className="font-medium">{event}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const trackingEvents: TrackingEvent[] = [
		{
			id: '1',
			status: 'Delivered',
			location: 'San Francisco, CA',
			timestamp: 'Jan 20, 2026 - 2:35 PM',
			isCompleted: true,
		},
		{
			id: '2',
			status: 'Out for Delivery',
			location: 'San Francisco, CA',
			timestamp: 'Jan 20, 2026 - 8:15 AM',
			isCompleted: true,
		},
		{
			id: '3',
			status: 'Arrived at Local Facility',
			location: 'San Francisco, CA',
			timestamp: 'Jan 19, 2026 - 11:42 PM',
			isCompleted: true,
		},
		{
			id: '4',
			status: 'In Transit',
			location: 'Los Angeles, CA',
			timestamp: 'Jan 18, 2026 - 6:20 PM',
			isCompleted: true,
		},
		{
			id: '5',
			status: 'Shipped',
			location: 'Los Angeles, CA',
			timestamp: 'Jan 17, 2026 - 3:00 PM',
			isCompleted: true,
		},
	];

	const notifications: NotificationTrigger[] = [
		{
			id: '1',
			event: 'Order Shipped',
			description: 'When order leaves warehouse',
			enabled: true,
		},
		{
			id: '2',
			event: 'In Transit',
			description: 'Updates during shipment',
			enabled: true,
		},
		{
			id: '3',
			event: 'Out for Delivery',
			description: 'When order is with courier',
			enabled: true,
		},
		{
			id: '4',
			event: 'Delivered',
			description: 'When order is delivered',
			enabled: true,
		},
		{
			id: '5',
			event: 'Delayed',
			description: 'When shipment is delayed',
			enabled: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Truck className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Tracking Settings</CardTitle>
									<CardDescription>
										Configure order tracking options
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="space-y-2">
								<Label>Track a Package</Label>
								<div className="flex gap-2">
									<div className="relative flex-1">
										<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input
											placeholder="Enter tracking number"
											className="pl-9"
										/>
									</div>
									<Button>Track</Button>
								</div>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<Label>Enable Tracking Page</Label>
									<p className="text-sm text-muted-foreground">
										Allow customers to track orders
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="flex items-center justify-between">
								<div>
									<Label>Share Tracking Link</Label>
									<p className="text-sm text-muted-foreground">
										Include tracking link in emails
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="flex items-center justify-between">
								<div>
									<Label>Real-time Updates</Label>
									<p className="text-sm text-muted-foreground">
										Live tracking updates on page
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<Separator />

							<div className="space-y-2">
								<Label>Tracking Page Theme</Label>
								<Select defaultValue="brand">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="brand">
											Branded (Match store theme)
										</SelectItem>
										<SelectItem value="minimal">Minimal</SelectItem>
										<SelectItem value="detailed">Detailed</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Tracking Notifications
								</CardTitle>
								<CardDescription>When to notify customers</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{notifications.map((notif) => (
									<NotificationToggle key={notif.id} {...notif} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Example Tracking</CardTitle>
							</CardHeader>
							<CardContent>
								<TrackingTimeline events={trackingEvents} />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
