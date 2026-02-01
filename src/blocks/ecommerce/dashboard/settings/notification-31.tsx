import {
	Bell,
	BellOff,
	ChevronRight,
	Mail,
	MessageSquare,
	Monitor,
	Phone,
	Settings,
	Smartphone,
	Volume2,
	VolumeX,
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type NotificationChannel = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
};

type NotificationCategory = {
	id: string;
	name: string;
	description: string;
	email: boolean;
	push: boolean;
	sms: boolean;
};

const ChannelCard = ({
	name,
	description,
	icon: Icon,
	enabled,
}: NotificationChannel) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
			enabled ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div
			className={`flex size-12 items-center justify-center rounded-lg ${
				enabled
					? 'bg-primary/10 text-primary'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<h4 className="font-medium">{name}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const CategoryRow = ({
	name,
	description,
	email,
	push,
	sms,
}: NotificationCategory) => (
	<div className="flex flex-col gap-4 py-4 @md:flex-row @md:items-center">
		<div className="flex-1">
			<h4 className="font-medium">{name}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="flex items-center gap-6">
			<div className="flex items-center gap-2">
				<Mail className="size-4 text-muted-foreground" />
				<Switch defaultChecked={email} />
			</div>
			<div className="flex items-center gap-2">
				<Bell className="size-4 text-muted-foreground" />
				<Switch defaultChecked={push} />
			</div>
			<div className="flex items-center gap-2">
				<Phone className="size-4 text-muted-foreground" />
				<Switch defaultChecked={sms} />
			</div>
		</div>
	</div>
);

export default function Main() {
	const channels: NotificationChannel[] = [
		{
			id: 'email',
			name: 'Email Notifications',
			description: 'Receive updates via email',
			icon: Mail,
			enabled: true,
		},
		{
			id: 'push',
			name: 'Push Notifications',
			description: 'Browser and mobile alerts',
			icon: Bell,
			enabled: true,
		},
		{
			id: 'sms',
			name: 'SMS Notifications',
			description: 'Text message alerts',
			icon: Smartphone,
			enabled: false,
		},
		{
			id: 'desktop',
			name: 'Desktop Notifications',
			description: 'System notifications on desktop',
			icon: Monitor,
			enabled: true,
		},
	];

	const categories: NotificationCategory[] = [
		{
			id: 'orders',
			name: 'Order Updates',
			description: 'Status changes, shipping, and delivery',
			email: true,
			push: true,
			sms: true,
		},
		{
			id: 'marketing',
			name: 'Marketing',
			description: 'Promotions, sales, and new products',
			email: true,
			push: false,
			sms: false,
		},
		{
			id: 'security',
			name: 'Security Alerts',
			description: 'Login attempts and password changes',
			email: true,
			push: true,
			sms: true,
		},
		{
			id: 'reviews',
			name: 'Reviews & Feedback',
			description: 'Product reviews and responses',
			email: true,
			push: false,
			sms: false,
		},
		{
			id: 'inventory',
			name: 'Inventory Alerts',
			description: 'Stock levels and reorder reminders',
			email: true,
			push: true,
			sms: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Bell className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Notification Channels</CardTitle>
									<CardDescription>
										Choose how you want to receive notifications
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="grid gap-3 pt-6 @lg:grid-cols-2">
							{channels.map((channel) => (
								<ChannelCard key={channel.id} {...channel} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">
										Notification Preferences
									</CardTitle>
									<CardDescription>
										Customize notifications by category
									</CardDescription>
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<span className="flex items-center gap-1">
										<Mail className="size-4" /> Email
									</span>
									<span className="flex items-center gap-1">
										<Bell className="size-4" /> Push
									</span>
									<span className="flex items-center gap-1">
										<Phone className="size-4" /> SMS
									</span>
								</div>
							</div>
						</CardHeader>
						<CardContent className="divide-y">
							{categories.map((category) => (
								<CategoryRow key={category.id} {...category} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardContent className="flex items-center justify-between pt-6">
							<div className="flex items-center gap-3">
								<BellOff className="size-5 text-muted-foreground" />
								<div>
									<h4 className="font-medium">Quiet Hours</h4>
									<p className="text-sm text-muted-foreground">
										No notifications from 10 PM to 8 AM
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Button variant="outline" size="sm">
									Configure
								</Button>
								<Switch defaultChecked />
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Defaults</Button>
						<Button>Save Preferences</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
