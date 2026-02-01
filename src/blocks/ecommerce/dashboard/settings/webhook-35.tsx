import {
	Bell,
	Check,
	Facebook,
	Globe,
	Instagram,
	Linkedin,
	Mail,
	MessageCircle,
	MessageSquare,
	Settings2,
	Slack,
	Twitter,
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type Integration = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	connected: boolean;
	notifications: boolean;
};

type WebhookEndpoint = {
	id: string;
	name: string;
	url: string;
	active: boolean;
	events: string[];
};

const IntegrationCard = ({
	name,
	description,
	icon: Icon,
	connected,
	notifications,
}: Integration) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
			connected ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div
			className={`flex size-12 items-center justify-center rounded-lg ${
				connected
					? 'bg-primary/10 text-primary'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<h4 className="font-medium">{name}</h4>
				{connected && (
					<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
						<Check className="mr-1 size-3" />
						Connected
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		{connected ? (
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<Bell className="size-4 text-muted-foreground" />
					<Switch defaultChecked={notifications} />
				</div>
				<Button variant="outline" size="sm">
					Configure
				</Button>
			</div>
		) : (
			<Button size="sm">Connect</Button>
		)}
	</div>
);

const WebhookRow = ({ name, url, active, events }: WebhookEndpoint) => (
	<div className="flex items-center gap-4 py-4">
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<h4 className="font-medium">{name}</h4>
				<Badge
					variant={active ? 'default' : 'secondary'}
					className={
						active ? 'bg-emerald-500/10 text-emerald-500 border-0' : ''
					}
				>
					{active ? 'Active' : 'Inactive'}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground truncate">{url}</p>
			<div className="mt-1 flex flex-wrap gap-1">
				{events.map((event) => (
					<Badge key={event} variant="outline" className="text-xs">
						{event}
					</Badge>
				))}
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="ghost" size="sm">
				Test
			</Button>
			<Button variant="outline" size="sm">
				Edit
			</Button>
		</div>
	</div>
);

export default function Main() {
	const integrations: Integration[] = [
		{
			id: 'slack',
			name: 'Slack',
			description: 'Get notifications in Slack channels',
			icon: Slack,
			connected: true,
			notifications: true,
		},
		{
			id: 'email',
			name: 'Email',
			description: 'Send notifications via email',
			icon: Mail,
			connected: true,
			notifications: true,
		},
		{
			id: 'discord',
			name: 'Discord',
			description: 'Post updates to Discord servers',
			icon: MessageCircle,
			connected: false,
			notifications: false,
		},
		{
			id: 'teams',
			name: 'Microsoft Teams',
			description: 'Integrate with Teams channels',
			icon: MessageSquare,
			connected: false,
			notifications: false,
		},
	];

	const webhooks: WebhookEndpoint[] = [
		{
			id: '1',
			name: 'Order Notifications',
			url: 'https://api.example.com/webhooks/orders',
			active: true,
			events: ['order.created', 'order.updated', 'order.shipped'],
		},
		{
			id: '2',
			name: 'Inventory Updates',
			url: 'https://api.example.com/webhooks/inventory',
			active: true,
			events: ['inventory.low', 'inventory.out'],
		},
		{
			id: '3',
			name: 'Customer Events',
			url: 'https://api.example.com/webhooks/customers',
			active: false,
			events: ['customer.created', 'customer.updated'],
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
									<Globe className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Notification Integrations</CardTitle>
									<CardDescription>
										Connect external services for notifications
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{integrations.map((integration) => (
								<IntegrationCard key={integration.id} {...integration} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">Webhooks</CardTitle>
									<CardDescription>
										HTTP callbacks for real-time event notifications
									</CardDescription>
								</div>
								<Button size="sm">Add Webhook</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y">
							{webhooks.map((webhook) => (
								<WebhookRow key={webhook.id} {...webhook} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Add New Webhook</CardTitle>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="webhookName">Webhook Name</Label>
									<Input id="webhookName" placeholder="e.g., Order Webhook" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="webhookUrl">Endpoint URL</Label>
									<Input id="webhookUrl" placeholder="https://..." />
								</div>
							</div>
							<div className="mt-4 flex justify-end">
								<Button>Create Webhook</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
