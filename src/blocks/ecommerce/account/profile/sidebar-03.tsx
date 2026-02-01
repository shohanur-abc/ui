import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Bell,
	Camera,
	ChevronRight,
	CreditCard,
	Globe,
	Key,
	Lock,
	LogOut,
	Mail,
	MapPin,
	Moon,
	Phone,
	Shield,
	Smartphone,
	User,
} from 'lucide-react';
import Link from 'next/link';

const SettingsSidebar = ({
	src,
	fallback,
	name,
	email,
	activeSection,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	activeSection: string;
}) => (
	<div className="space-y-6">
		<div className="flex items-center gap-3">
			<Avatar className="size-12">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<h2 className="font-semibold truncate">{name}</h2>
				<p className="text-sm text-muted-foreground truncate">{email}</p>
			</div>
		</div>
	</div>
);

const SettingsNav = ({
	sections,
	activeSection,
}: {
	sections: { id: string; icon: React.ElementType; label: string }[];
	activeSection: string;
}) => (
	<nav className="space-y-1">
		{sections.map((section) => (
			<Link
				key={section.id}
				href={`#${section.id}`}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					section.id === activeSection
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'
				}`}
			>
				<section.icon className="size-5" />
				<span className="text-sm font-medium">{section.label}</span>
			</Link>
		))}
	</nav>
);

const PersonalInfoSection = ({
	data,
}: {
	data: { firstName: string; lastName: string; email: string; phone: string };
}) => (
	<Card>
		<CardHeader>
			<h3 className="font-semibold flex items-center gap-2">
				<User className="size-5" />
				Personal Information
			</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="grid @sm:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">First Name</label>
					<Input defaultValue={data.firstName} />
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Last Name</label>
					<Input defaultValue={data.lastName} />
				</div>
			</div>
			<div className="space-y-2">
				<label className="text-sm font-medium">Email</label>
				<Input defaultValue={data.email} type="email" />
			</div>
			<div className="space-y-2">
				<label className="text-sm font-medium">Phone</label>
				<Input defaultValue={data.phone} type="tel" />
			</div>
			<Button>Save Changes</Button>
		</CardContent>
	</Card>
);

const SecuritySection = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		description: string;
		status: 'enabled' | 'disabled' | 'action';
	}[];
}) => (
	<Card>
		<CardHeader>
			<h3 className="font-semibold flex items-center gap-2">
				<Shield className="size-5" />
				Security
			</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<item.icon className="size-5 text-muted-foreground" />
						<div>
							<p className="font-medium">{item.label}</p>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
					</div>
					{item.status === 'action' ? (
						<Button variant="outline" size="sm">
							Change
						</Button>
					) : (
						<Switch defaultChecked={item.status === 'enabled'} />
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const NotificationsSection = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; enabled: boolean }[];
}) => (
	<Card>
		<CardHeader>
			<h3 className="font-semibold flex items-center gap-2">
				<Bell className="size-5" />
				Notifications
			</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<div key={i} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<item.icon className="size-5 text-muted-foreground" />
						<span className="text-sm">{item.label}</span>
					</div>
					<Switch defaultChecked={item.enabled} />
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
			fallback: 'MR',
			name: 'Michael Rodriguez',
			email: 'michael.r@example.com',
			activeSection: 'personal',
		},
		sections: [
			{ id: 'personal', icon: User, label: 'Personal Info' },
			{ id: 'security', icon: Shield, label: 'Security' },
			{ id: 'notifications', icon: Bell, label: 'Notifications' },
			{ id: 'addresses', icon: MapPin, label: 'Addresses' },
			{ id: 'payment', icon: CreditCard, label: 'Payment' },
			{ id: 'preferences', icon: Globe, label: 'Preferences' },
		],
		personalInfo: {
			firstName: 'Michael',
			lastName: 'Rodriguez',
			email: 'michael.r@example.com',
			phone: '+1 (555) 123-4567',
		},
		security: [
			{
				icon: Key,
				label: 'Password',
				description: 'Last changed 3 months ago',
				status: 'action' as const,
			},
			{
				icon: Smartphone,
				label: 'Two-Factor Auth',
				description: 'Add extra security',
				status: 'enabled' as const,
			},
			{
				icon: Lock,
				label: 'Login Alerts',
				description: 'Get notified of new logins',
				status: 'enabled' as const,
			},
		],
		notifications: [
			{ icon: Mail, label: 'Email notifications', enabled: true },
			{ icon: Bell, label: 'Push notifications', enabled: true },
			{ icon: Phone, label: 'SMS notifications', enabled: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<SettingsSidebar {...profileData.sidebar} />
								<Separator />
								<SettingsNav
									sections={profileData.sections}
									activeSection="personal"
								/>
								<Separator />
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 text-destructive"
								>
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Settings</h1>
						<PersonalInfoSection data={profileData.personalInfo} />
						<SecuritySection items={profileData.security} />
						<NotificationsSection items={profileData.notifications} />
					</div>
				</div>
			</div>
		</section>
	);
}
