import {
	Ban,
	Check,
	Copy,
	Eye,
	EyeOff,
	Key,
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
	created: string;
	lastUsed: string;
	expiresAt: string;
	status: 'active' | 'expired' | 'revoked';
};

type Permission = {
	id: string;
	name: string;
	description: string;
	checked: boolean;
};

const KeyPreview = ({ keyValue }: { keyValue: string }) => (
	<div className="flex items-center gap-2">
		<code className="text-xs font-mono text-muted-foreground">
			{keyValue.substring(0, 12)}...
		</code>
		<Button variant="ghost" size="icon-sm">
			<Copy className="size-3.5" />
		</Button>
	</div>
);

const StatusBadge = ({ status }: { status: ApiKey['status'] }) => {
	const styles = {
		active: 'bg-emerald-500/10 text-emerald-500 border-0',
		expired: 'bg-amber-500/10 text-amber-500 border-0',
		revoked: 'bg-destructive/10 text-destructive border-0',
	};

	return (
		<Badge className={styles[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const ApiKeyRow = ({
	name,
	key: keyValue,
	permissions,
	created,
	lastUsed,
	status,
}: ApiKey) => (
	<TableRow>
		<TableCell>
			<div className="font-medium">{name}</div>
			<KeyPreview keyValue={keyValue} />
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
		<TableCell className="text-muted-foreground">{created}</TableCell>
		<TableCell className="text-muted-foreground">{lastUsed}</TableCell>
		<TableCell>
			<StatusBadge status={status} />
		</TableCell>
		<TableCell className="text-right">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Eye className="mr-2 size-4" />
						View Key
					</DropdownMenuItem>
					<DropdownMenuItem>
						<RefreshCw className="mr-2 size-4" />
						Regenerate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Revoke Key
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const PermissionCheckbox = ({ id, name, description, checked }: Permission) => (
	<div className="flex items-start gap-3 py-2">
		<Checkbox id={id} defaultChecked={checked} className="mt-1" />
		<div>
			<Label htmlFor={id} className="font-medium cursor-pointer">
				{name}
			</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const apiKeys: ApiKey[] = [
		{
			id: '1',
			name: 'Production API',
			key: 'sk_live_1234567890abcdef',
			permissions: ['read', 'write', 'delete'],
			created: 'Dec 15, 2025',
			lastUsed: '2 mins ago',
			expiresAt: 'Dec 15, 2026',
			status: 'active',
		},
		{
			id: '2',
			name: 'Development API',
			key: 'sk_test_abcdef1234567890',
			permissions: ['read', 'write'],
			created: 'Jan 5, 2026',
			lastUsed: '1 hour ago',
			expiresAt: 'Jan 5, 2027',
			status: 'active',
		},
		{
			id: '3',
			name: 'Legacy Integration',
			key: 'sk_live_legacy123456',
			permissions: ['read'],
			created: 'Mar 10, 2025',
			lastUsed: '30 days ago',
			expiresAt: 'Mar 10, 2026',
			status: 'expired',
		},
	];

	const permissions: Permission[] = [
		{ id: 'read', name: 'Read Access', description: 'View products, orders, and customers', checked: true },
		{ id: 'write', name: 'Write Access', description: 'Create and update resources', checked: true },
		{ id: 'delete', name: 'Delete Access', description: 'Remove resources permanently', checked: false },
		{ id: 'admin', name: 'Admin Access', description: 'Full administrative permissions', checked: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
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
											Manage API keys for external integrations
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Create API Key
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Permissions</TableHead>
										<TableHead>Created</TableHead>
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
						<CardHeader className="border-b">
							<CardTitle className="text-base">Create New API Key</CardTitle>
							<CardDescription>
								Generate a new API key with specific permissions
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-6 @lg:grid-cols-2">
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="keyName">Key Name</Label>
										<Input id="keyName" placeholder="e.g., Production API" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="expiry">Expiration</Label>
										<Input id="expiry" type="date" />
									</div>
								</div>
								<div>
									<Label className="mb-3 block">Permissions</Label>
									<div className="space-y-1">
										{permissions.map((perm) => (
											<PermissionCheckbox key={perm.id} {...perm} />
										))}
									</div>
								</div>
							</div>
							<div className="mt-6 flex justify-end gap-3">
								<Button variant="outline">Cancel</Button>
								<Button className="gap-2">
									<Key className="size-4" />
									Generate Key
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
