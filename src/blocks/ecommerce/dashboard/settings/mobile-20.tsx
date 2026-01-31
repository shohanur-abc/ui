import {
	Bell,
	Check,
	ChevronRight,
	Globe,
	Laptop,
	LogOut,
	Mail,
	Moon,
	Shield,
	Smartphone,
	Sun,
	User,
	type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MenuItem = {
	icon: LucideIcon;
	label: string;
	description?: string;
	value?: string | boolean;
	type: 'link' | 'toggle' | 'select';
	badge?: string;
};

type Session = {
	device: string;
	location: string;
	lastActive: string;
	current: boolean;
	icon: LucideIcon;
};

const MenuRow = ({ icon: Icon, label, description, value, type, badge }: MenuItem) => (
	<div className="flex items-center justify-between py-3 px-1 rounded-lg transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3">
			<Icon className="size-5 text-muted-foreground" />
			<div>
				<div className="flex items-center gap-2">
					<span className="font-medium">{label}</span>
					{badge && (
						<Badge variant="secondary" className="text-xs">
							{badge}
						</Badge>
					)}
				</div>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
		</div>
		{type === 'toggle' ? (
			<Switch defaultChecked={value as boolean} />
		) : type === 'select' ? (
			<span className="text-sm text-muted-foreground">{value}</span>
		) : (
			<ChevronRight className="size-5 text-muted-foreground" />
		)}
	</div>
);

const SessionRow = ({ device, location, lastActive, current, icon: Icon }: Session) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<div>
				<div className="flex items-center gap-2">
					<span className="font-medium">{device}</span>
					{current && (
						<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
							Current
						</Badge>
					)}
				</div>
				<p className="text-sm text-muted-foreground">
					{location} • {lastActive}
				</p>
			</div>
		</div>
		{!current && (
			<Button variant="ghost" size="sm" className="text-destructive">
				Revoke
			</Button>
		)}
	</div>
);

export default function Main() {
	const profile = {
		name: 'John Doe',
		email: 'john@example.com',
		avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4',
		plan: 'Pro',
	};

	const accountSettings: MenuItem[] = [
		{ icon: User, label: 'Edit Profile', description: 'Update your info', type: 'link' },
		{ icon: Mail, label: 'Email', description: profile.email, type: 'link' },
		{ icon: Globe, label: 'Language', value: 'English', type: 'select' },
		{ icon: Moon, label: 'Dark Mode', value: true, type: 'toggle' },
	];

	const notificationSettings: MenuItem[] = [
		{ icon: Bell, label: 'Push Notifications', value: true, type: 'toggle' },
		{ icon: Mail, label: 'Email Updates', value: true, type: 'toggle' },
		{ icon: Bell, label: 'Order Alerts', value: true, type: 'toggle' },
		{ icon: Bell, label: 'Marketing', value: false, type: 'toggle', badge: 'Off' },
	];

	const sessions: Session[] = [
		{ device: 'MacBook Pro', location: 'San Francisco, US', lastActive: 'Active now', current: true, icon: Laptop },
		{ device: 'iPhone 15 Pro', location: 'San Francisco, US', lastActive: '2 hours ago', current: false, icon: Smartphone },
		{ device: 'Windows PC', location: 'New York, US', lastActive: '3 days ago', current: false, icon: Laptop },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-lg px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="flex flex-col items-center text-center">
							<Avatar className="size-20 ring-4 ring-border">
								<AvatarImage src={profile.avatar} />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
							<h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
							<p className="text-muted-foreground">{profile.email}</p>
							<Badge className="mt-2">{profile.plan} Plan</Badge>
						</div>

						<Tabs defaultValue="account" className="mt-8">
							<TabsList className="w-full">
								<TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
								<TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
								<TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
							</TabsList>

							<TabsContent value="account" className="mt-6 space-y-1">
								{accountSettings.map((item) => (
									<MenuRow key={item.label} {...item} />
								))}
							</TabsContent>

							<TabsContent value="notifications" className="mt-6 space-y-1">
								{notificationSettings.map((item) => (
									<MenuRow key={item.label} {...item} />
								))}
							</TabsContent>

							<TabsContent value="security" className="mt-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between rounded-lg border p-4">
										<div className="flex items-center gap-3">
											<Shield className="size-5 text-primary" />
											<div>
												<p className="font-medium">Two-Factor Auth</p>
												<p className="text-sm text-muted-foreground">Extra security</p>
											</div>
										</div>
										<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
											<Check className="mr-1 size-3" />
											Enabled
										</Badge>
									</div>

									<Separator />

									<div>
										<h4 className="mb-3 font-medium">Active Sessions</h4>
										<div className="space-y-1">
											{sessions.map((session) => (
												<SessionRow key={session.device} {...session} />
											))}
										</div>
									</div>
								</div>
							</TabsContent>
						</Tabs>

						<Separator className="my-6" />

						<Button variant="destructive" className="w-full gap-2">
							<LogOut className="size-4" />
							Sign Out
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
