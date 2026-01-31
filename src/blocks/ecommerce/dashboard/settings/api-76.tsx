import {
	AlertCircle,
	Check,
	Clock,
	Copy,
	Database,
	Download,
	ExternalLink,
	FileJson,
	Key,
	Loader2,
	MoreVertical,
	Plus,
	RefreshCw,
	Shield,
	Trash2,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
	key: string;
	permissions: string[];
	lastUsed: string;
	status: 'active' | 'revoked';
};

type Endpoint = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	description: string;
};

const ApiKeyRow = ({
	name,
	key,
	permissions,
	lastUsed,
	status,
}: ApiKey) => (
	<TableRow>
		<TableCell>
			<div>
				<p className="font-medium">{name}</p>
				<div className="flex items-center gap-2 mt-1">
					<code className="text-xs bg-muted px-2 py-0.5 rounded">
						{key.slice(0, 12)}...{key.slice(-4)}
					</code>
					<Button variant="ghost" size="icon-sm" className="size-6">
						<Copy className="size-3" />
					</Button>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div className="flex flex-wrap gap-1">
				{permissions.slice(0, 2).map((perm) => (
					<Badge key={perm} variant="outline" className="text-xs">
						{perm}
					</Badge>
				))}
				{permissions.length > 2 && (
					<Badge variant="outline" className="text-xs">
						+{permissions.length - 2}
					</Badge>
				)}
			</div>
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">{lastUsed}</TableCell>
		<TableCell>
			<Badge
				className={`text-xs border-0 ${
					status === 'active'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-destructive/10 text-destructive'
				}`}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Copy className="mr-2 size-4" />
						Copy Key
					</DropdownMenuItem>
					<DropdownMenuItem>
						<RefreshCw className="mr-2 size-4" />
						Regenerate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Revoke
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const EndpointRow = ({ method, path, description }: Endpoint) => {
	const methodStyles = {
		GET: 'bg-emerald-500/10 text-emerald-500',
		POST: 'bg-primary/10 text-primary',
		PUT: 'bg-amber-500/10 text-amber-500',
		DELETE: 'bg-destructive/10 text-destructive',
	};

	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex items-center gap-3">
				<Badge className={`${methodStyles[method]} border-0 text-xs font-mono`}>
					{method}
				</Badge>
				<code className="text-sm">{path}</code>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
};

export default function Main() {
	const apiKeys: ApiKey[] = [
		{ id: '1', name: 'Production Key', key: 'pk_live_example_key_123456', permissions: ['read', 'write', 'delete'], lastUsed: '2 min ago', status: 'active' },
		{ id: '2', name: 'Mobile App', key: 'pk_live_example_key_789012', permissions: ['read'], lastUsed: '1 hour ago', status: 'active' },
		{ id: '3', name: 'Test Key', key: 'pk_test_example_key_345678', permissions: ['read', 'write'], lastUsed: '5 days ago', status: 'revoked' },
	];

	const endpoints: Endpoint[] = [
		{ method: 'GET', path: '/api/v1/products', description: 'List all products' },
		{ method: 'POST', path: '/api/v1/orders', description: 'Create an order' },
		{ method: 'PUT', path: '/api/v1/inventory/:id', description: 'Update inventory' },
		{ method: 'DELETE', path: '/api/v1/products/:id', description: 'Delete a product' },
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
											<Key className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>API Keys</CardTitle>
											<CardDescription>
												Manage your API keys for integrations
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Create Key
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Permissions</TableHead>
											<TableHead>Last Used</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10" />
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
							<CardHeader className="border-b">
								<CardTitle className="text-base">API Endpoints</CardTitle>
								<CardDescription>Available REST API endpoints</CardDescription>
							</CardHeader>
							<CardContent className="divide-y pt-4">
								{endpoints.map((endpoint) => (
									<EndpointRow key={endpoint.path} {...endpoint} />
								))}
								<Button variant="link" className="w-full mt-4 gap-2">
									View Full API Documentation
									<ExternalLink className="size-3" />
								</Button>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">API Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label>Rate Limit</Label>
									<Select defaultValue="1000">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="100">100 req/min</SelectItem>
											<SelectItem value="1000">1,000 req/min</SelectItem>
											<SelectItem value="10000">10,000 req/min</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>API Version</Label>
									<Select defaultValue="v1">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="v1">v1 (Stable)</SelectItem>
											<SelectItem value="v2">v2 (Beta)</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Base URL</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex gap-2">
									<Input
										value="https://api.yourstore.com"
										readOnly
										className="font-mono text-sm"
									/>
									<Button variant="outline" size="icon">
										<Copy className="size-4" />
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<FileJson className="size-5 text-primary shrink-0" />
									<div>
										<h4 className="font-semibold">API Documentation</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											Explore our comprehensive API docs with examples.
										</p>
										<Button variant="link" size="sm" className="mt-2 h-auto p-0 gap-2">
											View Docs
											<ExternalLink className="size-3" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
