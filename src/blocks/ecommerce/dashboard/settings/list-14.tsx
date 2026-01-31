import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
	Bell,
	CreditCard,
	Globe,
	Key,
	Laptop,
	Lock,
	Mail,
	MessageSquare,
	Palette,
	Settings,
	Shield,
	Smartphone,
	User,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

type SettingGroup = {
	title: string;
	description: string;
	items: SettingItem[];
};

type SettingItem = {
	id: string;
	label: string;
	description: string;
	icon: LucideIcon;
	type: 'toggle' | 'link';
	value?: boolean;
	badge?: string;
};

const SettingRow = ({
	label,
	description,
	icon: Icon,
	type,
	value,
	badge,
}: SettingItem) => (
	<div className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
			<Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<span className="font-medium">{label}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground truncate">{description}</p>
		</div>
		{type === 'toggle' ? (
			<Switch defaultChecked={value} />
		) : (
			<ChevronRight className="size-5 text-muted-foreground" />
		)}
	</div>
);

const SettingSection = ({ title, description, items }: SettingGroup) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent className="space-y-1">
			{items.map((item) => (
				<SettingRow key={item.id} {...item} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const settingGroups: SettingGroup[] = [
		{
			title: 'Account',
			description: 'Manage your account settings',
			items: [
				{
					id: 'profile',
					label: 'Edit Profile',
					description: 'Update your personal information',
					icon: User,
					type: 'link',
				},
				{
					id: 'email',
					label: 'Email Settings',
					description: 'Manage email preferences',
					icon: Mail,
					type: 'link',
				},
				{
					id: 'password',
					label: 'Change Password',
					description: 'Update your password',
					icon: Key,
					type: 'link',
				},
			],
		},
		{
			title: 'Notifications',
			description: 'Configure notification preferences',
			items: [
				{
					id: 'pushNotif',
					label: 'Push Notifications',
					description: 'Receive push notifications',
					icon: Bell,
					type: 'toggle',
					value: true,
				},
				{
					id: 'emailNotif',
					label: 'Email Notifications',
					description: 'Receive email updates',
					icon: Mail,
					type: 'toggle',
					value: true,
				},
				{
					id: 'smsNotif',
					label: 'SMS Notifications',
					description: 'Receive text messages',
					icon: MessageSquare,
					type: 'toggle',
					value: false,
					badge: 'Premium',
				},
			],
		},
		{
			title: 'Security',
			description: 'Protect your account',
			items: [
				{
					id: '2fa',
					label: 'Two-Factor Auth',
					description: 'Add extra security layer',
					icon: Shield,
					type: 'toggle',
					value: true,
				},
				{
					id: 'sessions',
					label: 'Active Sessions',
					description: 'Manage logged-in devices',
					icon: Laptop,
					type: 'link',
					badge: '3 devices',
				},
				{
					id: 'loginAlerts',
					label: 'Login Alerts',
					description: 'Get notified of new logins',
					icon: Lock,
					type: 'toggle',
					value: true,
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Settings</h1>
					<p className="text-muted-foreground">
						Manage your preferences and account settings
					</p>
				</div>
				<div className="space-y-6">
					{settingGroups.map((group) => (
						<SettingSection key={group.title} {...group} />
					))}
				</div>
			</div>
		</section>
	);
}
