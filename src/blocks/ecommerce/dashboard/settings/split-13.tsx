import {
	Bell,
	CreditCard,
	Globe,
	Key,
	Palette,
	Settings,
	Shield,
	Truck,
	User,
	Users,
	Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type NavItem = {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	active?: boolean;
};

type SettingRow = {
	label: string;
	description: string;
	type: 'toggle' | 'input';
	value?: string | boolean;
};

const SidebarNav = ({ items }: { items: NavItem[] }) => (
	<nav className="space-y-1">
		{items.map((item) => (
			<a
				key={item.id}
				href={`#${item.id}`}
				className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
					item.active
						? 'bg-primary/10 text-primary font-medium'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'
				}`}
			>
				<item.icon className="size-4" />
				{item.label}
			</a>
		))}
	</nav>
);

const SettingItem = ({ label, description, type, value }: SettingRow) => (
	<div className="flex items-center justify-between gap-4 py-4">
		<div className="space-y-0.5">
			<Label className="font-medium">{label}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		{type === 'toggle' ? (
			<Switch defaultChecked={value as boolean} />
		) : (
			<Input defaultValue={value as string} className="max-w-[200px]" />
		)}
	</div>
);

export default function Main() {
	const navItems: NavItem[] = [
		{ id: 'general', label: 'General', icon: Settings, active: true },
		{ id: 'profile', label: 'Profile', icon: User },
		{ id: 'security', label: 'Security', icon: Shield },
		{ id: 'notifications', label: 'Notifications', icon: Bell },
		{ id: 'billing', label: 'Billing', icon: CreditCard },
		{ id: 'team', label: 'Team', icon: Users },
		{ id: 'integrations', label: 'Integrations', icon: Zap },
		{ id: 'appearance', label: 'Appearance', icon: Palette },
	];

	const generalSettings: SettingRow[] = [
		{
			label: 'Store Name',
			description: 'Your store name visible to customers',
			type: 'input',
			value: 'My Awesome Store',
		},
		{
			label: 'Store URL',
			description: 'Your unique store URL',
			type: 'input',
			value: 'my-awesome-store',
		},
		{
			label: 'Maintenance Mode',
			description: 'Temporarily hide your store from customers',
			type: 'toggle',
			value: false,
		},
		{
			label: 'Guest Checkout',
			description: 'Allow customers to checkout without an account',
			type: 'toggle',
			value: true,
		},
		{
			label: 'Order Notifications',
			description: 'Receive email notifications for new orders',
			type: 'toggle',
			value: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-6xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="flex flex-col gap-8 @lg:flex-row">
					<aside className="w-full shrink-0 @lg:w-56">
						<Card className="sticky top-4">
							<CardContent className="p-4">
								<SidebarNav items={navItems} />
							</CardContent>
						</Card>
					</aside>

					<main className="flex-1">
						<Card>
							<CardContent className="p-6">
								<div className="mb-6">
									<h2 className="text-xl font-semibold">General Settings</h2>
									<p className="text-sm text-muted-foreground">
										Configure your store's basic settings
									</p>
								</div>
								<Separator />
								<div className="divide-y">
									{generalSettings.map((setting) => (
										<SettingItem key={setting.label} {...setting} />
									))}
								</div>
								<div className="mt-6 flex justify-end gap-3">
									<Button variant="outline">Reset</Button>
									<Button>Save Changes</Button>
								</div>
							</CardContent>
						</Card>
					</main>
				</div>
			</div>
		</section>
	);
}
