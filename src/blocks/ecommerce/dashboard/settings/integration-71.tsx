import {
	AlertCircle,
	Check,
	ChevronRight,
	Cloud,
	Code,
	ExternalLink,
	Layers,
	MoreVertical,
	Plus,
	RefreshCw,
	Settings2,
	Unplug,
	Zap,
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type Integration = {
	id: string;
	name: string;
	icon: string;
	description: string;
	category: string;
	status: 'connected' | 'disconnected' | 'error';
	lastSync?: string;
};

type Category = {
	name: string;
	count: number;
};

const IntegrationCard = ({
	name,
	icon,
	description,
	category,
	status,
	lastSync,
}: Integration) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			status === 'connected' ? 'border-primary/30' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-12 items-center justify-center rounded-lg text-2xl ${
						status === 'connected'
							? 'bg-primary/10'
							: status === 'error'
								? 'bg-destructive/10'
								: 'bg-muted'
					}`}
				>
					{icon}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold">{name}</h4>
						{status === 'connected' && (
							<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
								<Check className="mr-1 size-3" />
								Connected
							</Badge>
						)}
						{status === 'error' && (
							<Badge variant="destructive" className="text-xs">
								Error
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{description}</p>
					<Badge variant="outline" className="mt-2 text-xs">
						{category}
					</Badge>
					{lastSync && (
						<p className="mt-1 text-xs text-muted-foreground">
							Last sync: {lastSync}
						</p>
					)}
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{status === 'connected' ? (
						<>
							<DropdownMenuItem>
								<Settings2 className="mr-2 size-4" />
								Configure
							</DropdownMenuItem>
							<DropdownMenuItem>
								<RefreshCw className="mr-2 size-4" />
								Sync Now
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								<Unplug className="mr-2 size-4" />
								Disconnect
							</DropdownMenuItem>
						</>
					) : (
						<DropdownMenuItem>
							<Zap className="mr-2 size-4" />
							Connect
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const integrations: Integration[] = [
		{
			id: '1',
			name: 'Google Analytics',
			icon: '📊',
			description: 'Track website traffic and conversions',
			category: 'Analytics',
			status: 'connected',
			lastSync: '2 min ago',
		},
		{
			id: '2',
			name: 'Mailchimp',
			icon: '🐵',
			description: 'Email marketing automation',
			category: 'Marketing',
			status: 'connected',
			lastSync: '1 hour ago',
		},
		{
			id: '3',
			name: 'Slack',
			icon: '💬',
			description: 'Get order notifications in Slack',
			category: 'Communication',
			status: 'connected',
			lastSync: '5 min ago',
		},
		{
			id: '4',
			name: 'QuickBooks',
			icon: '📗',
			description: 'Sync orders and inventory',
			category: 'Accounting',
			status: 'error',
		},
		{
			id: '5',
			name: 'Shopify',
			icon: '🛍️',
			description: 'Multi-channel selling',
			category: 'Sales',
			status: 'disconnected',
		},
		{
			id: '6',
			name: 'Zapier',
			icon: '⚡',
			description: 'Connect 5000+ apps',
			category: 'Automation',
			status: 'disconnected',
		},
	];

	const categories: Category[] = [
		{ name: 'All', count: integrations.length },
		{
			name: 'Connected',
			count: integrations.filter((i) => i.status === 'connected').length,
		},
		{ name: 'Analytics', count: 1 },
		{ name: 'Marketing', count: 1 },
		{ name: 'Communication', count: 1 },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Layers className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Integrations</CardTitle>
										<CardDescription>
											Connect your favorite apps and services
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Browse Apps
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="flex flex-wrap gap-2 mb-6">
								{categories.map((cat) => (
									<Badge
										key={cat.name}
										variant={cat.name === 'All' ? 'default' : 'outline'}
										className="cursor-pointer hover:bg-primary/10"
									>
										{cat.name} ({cat.count})
									</Badge>
								))}
							</div>
							<div className="grid gap-4 @md:grid-cols-2">
								{integrations.map((integration) => (
									<IntegrationCard key={integration.id} {...integration} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="border-primary/20 bg-primary/5">
						<CardContent className="flex items-center justify-between pt-6">
							<div className="flex items-start gap-4">
								<Zap className="size-6 text-primary shrink-0" />
								<div>
									<h4 className="font-semibold">Build Custom Integrations</h4>
									<p className="mt-1 text-sm text-muted-foreground">
										Use our API and webhooks to build custom integrations
									</p>
								</div>
							</div>
							<Button variant="outline" className="gap-2">
								<Code className="size-4" />
								View API Docs
								<ExternalLink className="size-3" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
