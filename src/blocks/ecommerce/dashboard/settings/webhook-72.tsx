import {
	AlertCircle,
	Check,
	Clock,
	Code,
	Copy,
	ExternalLink,
	Globe,
	Key,
	MoreVertical,
	Play,
	Plus,
	RefreshCw,
	Settings2,
	Trash2,
	Webhook,
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
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type WebhookEndpoint = {
	id: string;
	url: string;
	events: string[];
	status: 'active' | 'failing' | 'disabled';
	lastTriggered?: string;
	successRate?: string;
};

type WebhookEvent = {
	id: string;
	name: string;
	description: string;
	enabled: boolean;
};

const WebhookRow = ({
	url,
	events,
	status,
	lastTriggered,
	successRate,
}: WebhookEndpoint) => {
	const statusStyles = {
		active: 'bg-emerald-500/10 text-emerald-500',
		failing: 'bg-destructive/10 text-destructive',
		disabled: 'bg-muted text-muted-foreground',
	};

	return (
		<TableRow>
			<TableCell>
				<div className="max-w-xs">
					<code className="text-xs bg-muted px-2 py-1 rounded truncate block">
						{url}
					</code>
					<div className="flex flex-wrap gap-1 mt-2">
						{events.slice(0, 2).map((event) => (
							<Badge key={event} variant="outline" className="text-xs">
								{event}
							</Badge>
						))}
						{events.length > 2 && (
							<Badge variant="outline" className="text-xs">
								+{events.length - 2}
							</Badge>
						)}
					</div>
				</div>
			</TableCell>
			<TableCell>
				<Badge className={`${statusStyles[status]} border-0 text-xs`}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</TableCell>
			<TableCell className="text-muted-foreground text-sm">
				{lastTriggered || 'Never'}
			</TableCell>
			<TableCell className="font-medium">{successRate || '-'}</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Settings2 className="mr-2 size-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Play className="mr-2 size-4" />
							Send Test
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

const EventToggle = ({ name, description, enabled }: WebhookEvent) => (
	<div className="flex items-center gap-3 py-2">
		<Checkbox defaultChecked={enabled} />
		<div>
			<p className="font-medium text-sm">{name}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const webhooks: WebhookEndpoint[] = [
		{
			id: '1',
			url: 'https://api.example.com/webhooks/orders',
			events: ['order.created', 'order.updated', 'order.fulfilled'],
			status: 'active',
			lastTriggered: '5 min ago',
			successRate: '99.8%',
		},
		{
			id: '2',
			url: 'https://hooks.slack.com/services/xxx',
			events: ['order.created'],
			status: 'active',
			lastTriggered: '2 hours ago',
			successRate: '100%',
		},
		{
			id: '3',
			url: 'https://api.inventory.com/sync',
			events: ['product.updated', 'inventory.changed'],
			status: 'failing',
			lastTriggered: '1 day ago',
			successRate: '45%',
		},
	];

	const events: WebhookEvent[] = [
		{
			id: '1',
			name: 'order.created',
			description: 'When a new order is placed',
			enabled: true,
		},
		{
			id: '2',
			name: 'order.updated',
			description: 'When an order is modified',
			enabled: true,
		},
		{
			id: '3',
			name: 'order.fulfilled',
			description: 'When an order is shipped',
			enabled: true,
		},
		{
			id: '4',
			name: 'order.cancelled',
			description: 'When an order is cancelled',
			enabled: false,
		},
		{
			id: '5',
			name: 'product.created',
			description: 'When a product is added',
			enabled: false,
		},
		{
			id: '6',
			name: 'product.updated',
			description: 'When a product is modified',
			enabled: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Webhook className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Webhooks</CardTitle>
											<CardDescription>
												Receive real-time event notifications
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Add Endpoint
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Endpoint</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Last Triggered</TableHead>
											<TableHead>Success Rate</TableHead>
											<TableHead className="w-10" />
										</TableRow>
									</TableHeader>
									<TableBody>
										{webhooks.map((webhook) => (
											<WebhookRow key={webhook.id} {...webhook} />
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Webhook Events</CardTitle>
								<CardDescription>Select events to send</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{events.map((event) => (
									<EventToggle key={event.id} {...event} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Signing Secret</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex gap-2">
									<Input
										type="password"
										value="whsec_xxxxxxxxxxxxxx"
										readOnly
										className="font-mono text-sm"
									/>
									<Button variant="outline" size="icon">
										<Copy className="size-4" />
									</Button>
								</div>
								<p className="text-xs text-muted-foreground">
									Use this secret to verify webhook signatures
								</p>
								<Button variant="outline" size="sm" className="w-full gap-2">
									<RefreshCw className="size-4" />
									Rotate Secret
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
