import { ChevronDown, type LucideIcon } from 'lucide-react';
import {
	Bell,
	CreditCard,
	Globe,
	HelpCircle,
	Key,
	Lock,
	Mail,
	Palette,
	Shield,
	Smartphone,
	User,
	Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type CollapsibleSection = {
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
	defaultOpen?: boolean;
	content: React.ReactNode;
};

const ProfileContent = () => (
	<div className="grid gap-4 pt-4 @sm:grid-cols-2">
		<div className="space-y-2">
			<Label htmlFor="displayName">Display Name</Label>
			<Input id="displayName" defaultValue="John Doe" />
		</div>
		<div className="space-y-2">
			<Label htmlFor="username">Username</Label>
			<Input id="username" defaultValue="johndoe" />
		</div>
		<div className="space-y-2 @sm:col-span-2">
			<Label htmlFor="bio">Bio</Label>
			<Input id="bio" placeholder="Tell us about yourself" />
		</div>
		<div className="@sm:col-span-2 flex justify-end">
			<Button size="sm">Update Profile</Button>
		</div>
	</div>
);

const NotificationContent = () => (
	<div className="space-y-4 pt-4">
		{[
			{ id: 'orderUpdates', label: 'Order Updates', enabled: true },
			{ id: 'promotions', label: 'Promotional Emails', enabled: false },
			{ id: 'newsletter', label: 'Newsletter', enabled: true },
			{ id: 'productAlerts', label: 'Product Alerts', enabled: true },
		].map((item) => (
			<div key={item.id} className="flex items-center justify-between">
				<Label htmlFor={item.id}>{item.label}</Label>
				<Switch id={item.id} defaultChecked={item.enabled} />
			</div>
		))}
	</div>
);

const SecurityContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center justify-between rounded-lg border p-4">
			<div className="flex items-center gap-3">
				<Smartphone className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium">Two-Factor Authentication</p>
					<p className="text-sm text-muted-foreground">Add extra security</p>
				</div>
			</div>
			<Button variant="outline" size="sm">Enable</Button>
		</div>
		<div className="flex items-center justify-between rounded-lg border p-4">
			<div className="flex items-center gap-3">
				<Key className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium">Change Password</p>
					<p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
				</div>
			</div>
			<Button variant="outline" size="sm">Update</Button>
		</div>
	</div>
);

const CollapsibleCard = ({
	title,
	description,
	icon: Icon,
	defaultOpen,
	content,
}: CollapsibleSection) => (
	<Collapsible defaultOpen={defaultOpen}>
		<Card>
			<CollapsibleTrigger className="w-full text-left">
				<CardHeader className="flex flex-row items-center gap-4 space-y-0 pr-4">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-5 text-primary" />
					</div>
					<div className="flex-1">
						<CardTitle className="text-base">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</div>
					<ChevronDown className="size-5 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
				</CardHeader>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<CardContent className="border-t pt-0">{content}</CardContent>
			</CollapsibleContent>
		</Card>
	</Collapsible>
);

export default function Main() {
	const sections: CollapsibleSection[] = [
		{
			id: 'profile',
			title: 'Profile Settings',
			description: 'Manage your personal information',
			icon: User,
			defaultOpen: true,
			content: <ProfileContent />,
		},
		{
			id: 'notifications',
			title: 'Notification Preferences',
			description: 'Control how you receive notifications',
			icon: Bell,
			content: <NotificationContent />,
		},
		{
			id: 'security',
			title: 'Security Settings',
			description: 'Protect your account with additional security',
			icon: Shield,
			content: <SecurityContent />,
		},
		{
			id: 'billing',
			title: 'Billing & Payments',
			description: 'Manage payment methods and billing info',
			icon: CreditCard,
			content: (
				<div className="pt-4 text-center text-muted-foreground">
					Billing settings coming soon
				</div>
			),
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Account Settings</h1>
					<p className="text-muted-foreground">
						Configure your account preferences
					</p>
				</div>
				<div className="space-y-4">
					{sections.map((section) => (
						<CollapsibleCard key={section.id} {...section} />
					))}
				</div>
			</div>
		</section>
	);
}
