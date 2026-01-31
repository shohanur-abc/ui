import { Bell, Clock, Mail, MessageSquare, Smartphone } from 'lucide-react';

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
import { Switch } from '@/components/ui/switch';

type NotificationChannel = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
	badge?: string;
};

type NotificationPreference = {
	id: string;
	label: string;
	description: string;
	enabled: boolean;
};

const ChannelCard = ({
	title,
	description,
	icon: Icon,
	enabled,
	badge,
}: NotificationChannel) => (
	<div className="group flex items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/50">
		<div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
			<Icon className="size-6 text-primary" />
		</div>
		<div className="flex-1 space-y-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{title}</span>
				{badge && (
					<Badge variant="secondary\" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const PreferenceRow = ({
	label,
	description,
	enabled,
}: NotificationPreference) => (
	<div className="flex items-center justify-between gap-4 py-3">
		<div className="space-y-0.5">
			<Label className="font-medium">{label}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const channels: NotificationChannel[] = [
		{
			id: 'email',
			title: 'Email Notifications',
			description: 'Receive updates via email',
			icon: Mail,
			enabled: true,
		},
		{
			id: 'push',
			title: 'Push Notifications',
			description: 'Browser and mobile alerts',
			icon: Bell,
			enabled: true,
			badge: 'Recommended',
		},
		{
			id: 'sms',
			title: 'SMS Notifications',
			description: 'Text message alerts',
			icon: Smartphone,
			enabled: false,
		},
		{
			id: 'slack',
			title: 'Slack Integration',
			description: 'Team channel updates',
			icon: MessageSquare,
			enabled: false,
		},
	];

	const preferences: NotificationPreference[] = [
		{
			id: 'orders',
			label: 'Order Updates',
			description: 'Get notified about order status changes',
			enabled: true,
		},
		{
			id: 'inventory',
			label: 'Low Stock Alerts',
			description: 'Alert when inventory is running low',
			enabled: true,
		},
		{
			id: 'reviews',
			label: 'Customer Reviews',
			description: 'Notify when customers leave reviews',
			enabled: false,
		},
		{
			id: 'reports',
			label: 'Weekly Reports',
			description: 'Receive weekly performance summaries',
			enabled: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card className="overflow-hidden">
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Bell className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Notification Channels</CardTitle>
									<CardDescription>Choose how you want to receive notifications</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-3 @md:grid-cols-2">
								{channels.map((channel) => (
									<ChannelCard key={channel.id} {...channel} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden">
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Clock className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Notification Preferences</CardTitle>
									<CardDescription>Configure what notifications you receive</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{preferences.map((pref) => (
								<PreferenceRow key={pref.id} {...pref} />
							))}
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Default</Button>
						<Button>Save Preferences</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
