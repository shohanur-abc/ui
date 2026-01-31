import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
	Bell,
	CreditCard,
	Globe,
	Lock,
	Mail,
	Moon,
	Palette,
	Shield,
	Smartphone,
} from 'lucide-react';

const ProfileCompact = ({
	src,
	fallback,
	name,
	email,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
}) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<h2 className="font-semibold truncate">{name}</h2>
			<p className="text-sm text-muted-foreground truncate">{email}</p>
		</div>
		<Button variant="outline" size="sm">
			Edit
		</Button>
	</div>
);

const SettingsGroup = ({
	title,
	items,
}: {
	title: string;
	items: { icon: React.ElementType; label: string; description?: string; enabled?: boolean; badge?: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
		<div className="space-y-3">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center justify-between py-2"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-md bg-muted">
							<item.icon className="size-4 text-muted-foreground" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium">{item.label}</p>
								{item.badge && (
									<Badge variant="secondary" className="text-xs">
										{item.badge}
									</Badge>
								)}
							</div>
							{item.description && (
								<p className="text-xs text-muted-foreground">{item.description}</p>
							)}
						</div>
					</div>
					{typeof item.enabled === 'boolean' && (
						<Switch defaultChecked={item.enabled} />
					)}
				</div>
			))}
		</div>
	</div>
);

const SecurityStatus = ({
	items,
}: {
	items: { label: string; status: string; statusColor: string }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium text-muted-foreground">Security</h3>
		<div className="grid gap-2">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<span className="text-sm">{item.label}</span>
					<Badge variant="outline" className={item.statusColor}>
						{item.status}
					</Badge>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
			fallback: 'LM',
			name: 'Lisa Martinez',
			email: 'lisa.m@example.com',
		},
		notifications: {
			title: 'Notifications',
			items: [
				{ icon: Mail, label: 'Email Notifications', description: 'Order updates & promotions', enabled: true },
				{ icon: Smartphone, label: 'Push Notifications', description: 'Mobile app alerts', enabled: true },
				{ icon: Bell, label: 'SMS Alerts', description: 'Text message updates', enabled: false },
			],
		},
		preferences: {
			title: 'Preferences',
			items: [
				{ icon: Moon, label: 'Dark Mode', enabled: false },
				{ icon: Globe, label: 'Language', badge: 'English' },
				{ icon: Palette, label: 'Theme', badge: 'Default' },
			],
		},
		security: [
			{ label: 'Two-Factor Auth', status: 'Enabled', statusColor: 'bg-green-500/20 text-green-600 border-green-500/30' },
			{ label: 'Password', status: 'Strong', statusColor: 'bg-green-500/20 text-green-600 border-green-500/30' },
			{ label: 'Last Login', status: 'Today', statusColor: 'bg-muted text-muted-foreground' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<ProfileCompact {...profileData.profile} />
					</CardHeader>
					<CardContent className="space-y-6">
						<SettingsGroup {...profileData.notifications} />
						<SettingsGroup {...profileData.preferences} />
						<SecurityStatus items={profileData.security} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
