import {
	AlertCircle,
	Check,
	ChevronRight,
	Facebook,
	Github,
	Globe,
	Link2,
	Link2Off,
	Linkedin,
	MoreVertical,
	Shield,
	Twitter,
	type LucideIcon,
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
import { Switch } from '@/components/ui/switch';

type ConnectedAccount = {
	id: string;
	name: string;
	icon: LucideIcon;
	connected: boolean;
	username?: string;
	lastSync?: string;
	permissions: string[];
};

type DataSharing = {
	id: string;
	service: string;
	description: string;
	enabled: boolean;
};

const ConnectedAccountCard = ({
	name,
	icon: Icon,
	connected,
	username,
	lastSync,
	permissions,
}: ConnectedAccount) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			connected ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div
					className={`flex size-12 items-center justify-center rounded-lg ${
						connected
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					<Icon className="size-6" />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-medium">{name}</h4>
						{connected && (
							<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
								<Check className="mr-1 size-3" />
								Connected
							</Badge>
						)}
					</div>
					{connected && username && (
						<p className="text-sm text-muted-foreground">@{username}</p>
					)}
					{connected && lastSync && (
						<p className="text-xs text-muted-foreground">
							Last sync: {lastSync}
						</p>
					)}
				</div>
			</div>
			{connected ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Shield className="mr-2 size-4" />
							Manage Permissions
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Globe className="mr-2 size-4" />
							View Profile
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Link2Off className="mr-2 size-4" />
							Disconnect
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button size="sm">Connect</Button>
			)}
		</div>
		{connected && permissions.length > 0 && (
			<div className="mt-3 flex flex-wrap gap-1">
				{permissions.map((perm) => (
					<Badge key={perm} variant="outline" className="text-xs">
						{perm}
					</Badge>
				))}
			</div>
		)}
	</div>
);

const DataSharingRow = ({ service, description, enabled }: DataSharing) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<h4 className="font-medium">{service}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const accounts: ConnectedAccount[] = [
		{
			id: 'google',
			name: 'Google',
			icon: Globe,
			connected: true,
			username: 'john.doe',
			lastSync: '2 hours ago',
			permissions: ['Profile', 'Email', 'Calendar'],
		},
		{
			id: 'github',
			name: 'GitHub',
			icon: Github,
			connected: true,
			username: 'johndoe',
			lastSync: '1 day ago',
			permissions: ['Profile', 'Repositories'],
		},
		{
			id: 'facebook',
			name: 'Facebook',
			icon: Facebook,
			connected: false,
			permissions: [],
		},
		{
			id: 'twitter',
			name: 'Twitter/X',
			icon: Twitter,
			connected: false,
			permissions: [],
		},
		{
			id: 'linkedin',
			name: 'LinkedIn',
			icon: Linkedin,
			connected: false,
			permissions: [],
		},
	];

	const dataSharing: DataSharing[] = [
		{
			id: '1',
			service: 'Share purchase history with Google',
			description: 'For personalized recommendations',
			enabled: false,
		},
		{
			id: '2',
			service: 'Share activity with connected apps',
			description: 'Allow apps to see your activity',
			enabled: true,
		},
		{
			id: '3',
			service: 'Social media posting',
			description: 'Allow auto-posting reviews and purchases',
			enabled: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Link2 className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Connected Accounts</CardTitle>
									<CardDescription>
										Manage third-party account connections
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{accounts.map((account) => (
								<ConnectedAccountCard key={account.id} {...account} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Data Sharing</CardTitle>
							<CardDescription>
								Control what data connected accounts can access
							</CardDescription>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{dataSharing.map((item) => (
								<DataSharingRow key={item.id} {...item} />
							))}
						</CardContent>
					</Card>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertCircle className="size-5 shrink-0 text-amber-500" />
							<div>
								<h4 className="font-medium">Third-Party Access</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Connected accounts may have access to your personal
									information. Review permissions regularly and disconnect
									unused accounts.
								</p>
								<Button variant="link" size="sm" className="mt-2 h-auto p-0">
									Review all permissions
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
