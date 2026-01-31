import { 
	Check, 
	Copy, 
	Eye, 
	EyeOff, 
	Key, 
	Plus, 
	RefreshCw, 
	Settings, 
	Trash2,
	AlertTriangle,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ApiKey = {
	id: string;
	name: string;
	keyPreview: string;
	lastUsed: string;
	created: string;
	permissions: string[];
	status: 'active' | 'expired' | 'revoked';
};

type Webhook = {
	id: string;
	url: string;
	events: string[];
	status: 'active' | 'inactive';
	lastTriggered?: string;
};

const ApiKeyRow = ({
	name,
	keyPreview,
	lastUsed,
	created,
	permissions,
	status,
}: ApiKey) => (
	<TableRow>
		<TableCell>
			<div className="font-medium">{name}</div>
			<code className="text-xs text-muted-foreground">{keyPreview}</code>
		</TableCell>
		<TableCell>
			<div className="flex flex-wrap gap-1">
				{permissions.slice(0, 2).map((perm) => (
					<Badge key={perm} variant="secondary" className="text-xs">
						{perm}
					</Badge>
				))}
				{permissions.length > 2 && (
					<Badge variant="secondary" className="text-xs">
						+{permissions.length - 2}
					</Badge>
				)}
			</div>
		</TableCell>
		<TableCell className="text-muted-foreground">{lastUsed}</TableCell>
		<TableCell>
			<Badge
				variant={status === 'active' ? 'default' : 'secondary'}
				className={status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-0' : ''}
			>
				{status}
			</Badge>
		</TableCell>
		<TableCell className="text-right">
			<div className="flex justify-end gap-1">
				<Button variant="ghost" size="icon-sm">
					<Copy className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm">
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</div>
		</TableCell>
	</TableRow>
);

const WebhookRow = ({ url, events, status, lastTriggered }: Webhook) => (
	<div className="flex items-center justify-between gap-4 py-4">
		<div className="min-w-0 flex-1">
			<code className="text-sm font-medium truncate block">{url}</code>
			<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
				<span>{events.length} events</span>
				{lastTriggered && <span>• Last: {lastTriggered}</span>}
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Switch defaultChecked={status === 'active'} />
			<Button variant="ghost" size="icon-sm">
				<Settings className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const apiKeys: ApiKey[] = [
		{
			id: '1',
			name: 'Production API Key',
			keyPreview: 'sk_live_****...8f3d',
			lastUsed: '2 mins ago',
			created: 'Dec 15, 2025',
			permissions: ['read', 'write', 'delete'],
			status: 'active',
		},
		{
			id: '2',
			name: 'Development Key',
			keyPreview: 'sk_test_****...2a1b',
			lastUsed: '1 hour ago',
			created: 'Jan 10, 2026',
			permissions: ['read', 'write'],
			status: 'active',
		},
		{
			id: '3',
			name: 'Legacy Integration',
			keyPreview: 'sk_live_****...9c4e',
			lastUsed: '30 days ago',
			created: 'Mar 5, 2025',
			permissions: ['read'],
			status: 'expired',
		},
	];

	const webhooks: Webhook[] = [
		{
			id: '1',
			url: 'https://api.myapp.com/webhooks/orders',
			events: ['order.created', 'order.updated', 'order.fulfilled'],
			status: 'active',
			lastTriggered: '5 mins ago',
		},
		{
			id: '2',
			url: 'https://hooks.slack.com/services/...',
			events: ['order.created'],
			status: 'active',
			lastTriggered: '1 hour ago',
		},
		{
			id: '3',
			url: 'https://analytics.example.com/track',
			events: ['product.viewed', 'cart.updated'],
			status: 'inactive',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Developer Settings</h1>
					<p className="text-muted-foreground">
						API keys, webhooks, and developer tools
					</p>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Key className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle className="text-base">API Keys</CardTitle>
									<CardDescription>Manage your API credentials</CardDescription>
								</div>
							</div>
							<Button size="sm" className="gap-2">
								<Plus className="size-4" />
								Create Key
							</Button>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Permissions</TableHead>
										<TableHead>Last Used</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{apiKeys.map((key) => (
										<ApiKeyRow key={key.id} {...key} />
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle className="text-base">Webhooks</CardTitle>
								<CardDescription>Configure webhook endpoints</CardDescription>
							</div>
							<Button size="sm" variant="outline" className="gap-2">
								<Plus className="size-4" />
								Add Webhook
							</Button>
						</CardHeader>
						<CardContent className="divide-y">
							{webhooks.map((webhook) => (
								<WebhookRow key={webhook.id} {...webhook} />
							))}
						</CardContent>
					</Card>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertTriangle className="size-5 shrink-0 text-amber-500" />
							<div className="flex-1">
								<h4 className="font-medium">API Rate Limits</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									You have used 8,432 of 10,000 requests this month. Consider upgrading
									for higher limits.
								</p>
							</div>
							<Button variant="outline" size="sm">
								View Usage
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
