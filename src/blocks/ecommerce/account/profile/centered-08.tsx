import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Bell,
	CreditCard,
	Globe,
	Key,
	Lock,
	LogOut,
	Mail,
	Moon,
	Palette,
	Phone,
	Shield,
	Smartphone,
	User,
} from 'lucide-react';
import Link from 'next/link';

const ProfileSummary = ({
	src,
	fallback,
	name,
	email,
	phone,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	phone: string;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-20 mx-auto ring-4 ring-border shadow-lg">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h1 className="text-xl font-bold">{name}</h1>
			<div className="flex flex-col items-center gap-1 mt-2 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Mail className="size-4" />
					<span>{email}</span>
				</div>
				<div className="flex items-center gap-1">
					<Phone className="size-4" />
					<span>{phone}</span>
				</div>
			</div>
		</div>
		<Button variant="outline" size="sm" asChild>
			<Link href="/profile/edit">Edit Profile</Link>
		</Button>
	</div>
);

const SettingsGroup = ({
	title,
	settings,
}: {
	title: string;
	settings: { icon: React.ElementType; label: string; description?: string; enabled?: boolean; value?: string }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
			{title}
		</h3>
		<div className="space-y-2">
			{settings.map((setting, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div className="flex items-center gap-3">
						<setting.icon className="size-5 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">{setting.label}</p>
							{setting.description && (
								<p className="text-xs text-muted-foreground">{setting.description}</p>
							)}
						</div>
					</div>
					{setting.enabled !== undefined ? (
						<Switch defaultChecked={setting.enabled} />
					) : setting.value ? (
						<Badge variant="outline">{setting.value}</Badge>
					) : null}
				</div>
			))}
		</div>
	</div>
);

const SecurityStatus = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; status: 'enabled' | 'disabled' | 'warning' }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
			Security Status
		</h3>
		<div className="grid grid-cols-2 gap-2">
			{items.map((item, i) => (
				<div
					key={i}
					className={`p-3 rounded-lg text-center ${
						item.status === 'enabled'
							? 'bg-green-500/10 border border-green-500/20'
							: item.status === 'warning'
							? 'bg-amber-500/10 border border-amber-500/20'
							: 'bg-muted/30 border border-muted'
					}`}
				>
					<item.icon
						className={`size-5 mx-auto mb-1 ${
							item.status === 'enabled'
								? 'text-green-500'
								: item.status === 'warning'
								? 'text-amber-500'
								: 'text-muted-foreground'
						}`}
					/>
					<p className="text-xs font-medium">{item.label}</p>
					<Badge
						variant="outline"
						className={`mt-1 text-xs ${
							item.status === 'enabled'
								? 'border-green-500/30 text-green-600'
								: item.status === 'warning'
								? 'border-amber-500/30 text-amber-600'
								: 'text-muted-foreground'
						}`}
					>
						{item.status === 'enabled' ? 'Enabled' : item.status === 'warning' ? 'Action Needed' : 'Disabled'}
					</Badge>
				</div>
			))}
		</div>
	</div>
);

const DangerZone = () => (
	<div className="space-y-3">
		<h3 className="text-sm font-semibold text-destructive uppercase tracking-wider">
			Danger Zone
		</h3>
		<Button variant="destructive" className="w-full gap-2">
			<LogOut className="size-4" />
			Sign Out
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		summary: {
			src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
			fallback: 'LH',
			name: 'Lauren Hayes',
			email: 'lauren.h@example.com',
			phone: '+1 (555) 987-6543',
		},
		preferences: [
			{ icon: Bell, label: 'Push Notifications', description: 'Order updates & promotions', enabled: true },
			{ icon: Mail, label: 'Email Newsletter', description: 'Weekly deals & new arrivals', enabled: true },
			{ icon: Moon, label: 'Dark Mode', description: 'Use dark theme', enabled: false },
		],
		regional: [
			{ icon: Globe, label: 'Language', value: 'English' },
			{ icon: Palette, label: 'Currency', value: 'USD' },
		],
		security: [
			{ icon: Lock, label: 'Password', status: 'enabled' as const },
			{ icon: Shield, label: '2FA', status: 'enabled' as const },
			{ icon: Smartphone, label: 'Device', status: 'warning' as const },
			{ icon: Key, label: 'Recovery', status: 'disabled' as const },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6 space-y-6">
						<ProfileSummary {...profileData.summary} />
						<Separator />
						<SettingsGroup title="Notifications" settings={profileData.preferences} />
						<SettingsGroup title="Regional" settings={profileData.regional} />
						<Separator />
						<SecurityStatus items={profileData.security} />
						<Separator />
						<DangerZone />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
