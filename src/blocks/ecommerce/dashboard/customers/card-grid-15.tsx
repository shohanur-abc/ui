import {
	Bell,
	Calendar,
	ChevronRight,
	Clock,
	ExternalLink,
	Globe,
	Laptop,
	Mail,
	MapPin,
	MessageSquare,
	MoreHorizontal,
	Phone,
	Settings,
	Shield,
	Smartphone,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PreferencesCustomer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	preferences: {
		marketing: {
			email: boolean;
			sms: boolean;
			push: boolean;
		};
		communication: {
			preferredChannel: 'email' | 'phone' | 'sms' | 'app';
			preferredTime: string;
			language: string;
		};
		privacy: {
			dataSharing: boolean;
			analytics: boolean;
			personalization: boolean;
		};
	};
	devices: Array<{
		type: 'mobile' | 'desktop' | 'tablet';
		name: string;
		lastActive: string;
	}>;
	location: {
		city: string;
		country: string;
		timezone: string;
	};
	lastUpdated: string;
}

const ChannelIcon = ({ channel }: { channel: string }) => {
	const icons: Record<string, React.ElementType> = {
		email: Mail,
		phone: Phone,
		sms: MessageSquare,
		app: Smartphone,
	};
	const Icon = icons[channel] || Mail;
	return <Icon className="size-4" />;
};

const DeviceIcon = ({ type }: { type: string }) => {
	const icons: Record<string, React.ElementType> = {
		mobile: Smartphone,
		desktop: Laptop,
		tablet: Laptop,
	};
	const Icon = icons[type] || Laptop;
	return <Icon className="size-4" />;
};

const PreferenceToggle = ({
	label,
	icon: Icon,
	enabled,
}: {
	label: string;
	icon: React.ElementType;
	enabled: boolean;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Icon className="text-muted-foreground size-3.5" />
			<span className="text-sm">{label}</span>
		</div>
		<Switch checked={enabled} disabled className="scale-75" />
	</div>
);

const DeviceItem = ({
	device,
}: {
	device: PreferencesCustomer['devices'][0];
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/30 px-2.5 py-2">
		<DeviceIcon type={device.type} />
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium truncate">{device.name}</p>
			<p className="text-muted-foreground text-xs">{device.lastActive}</p>
		</div>
	</div>
);

const PreferencesCard = ({ customer }: { customer: PreferencesCustomer }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-11">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="mr-2 size-4" />
							Edit preferences
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Reset to defaults</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<MapPin className="size-3.5" />
				<span>
					{customer.location.city}, {customer.location.country}
				</span>
				<span className="ml-auto text-xs">{customer.location.timezone}</span>
			</div>
			<div className="space-y-2">
				<p className="text-muted-foreground text-xs font-medium">
					Marketing Preferences
				</p>
				<div className="rounded-lg border bg-muted/20 p-3 space-y-2">
					<PreferenceToggle
						label="Email Marketing"
						icon={Mail}
						enabled={customer.preferences.marketing.email}
					/>
					<PreferenceToggle
						label="SMS Notifications"
						icon={MessageSquare}
						enabled={customer.preferences.marketing.sms}
					/>
					<PreferenceToggle
						label="Push Notifications"
						icon={Bell}
						enabled={customer.preferences.marketing.push}
					/>
				</div>
			</div>
			<div className="space-y-2">
				<p className="text-muted-foreground text-xs font-medium">
					Communication
				</p>
				<div className="grid grid-cols-2 gap-2 text-sm">
					<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
						<ChannelIcon
							channel={customer.preferences.communication.preferredChannel}
						/>
						<span className="capitalize">
							{customer.preferences.communication.preferredChannel}
						</span>
					</div>
					<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
						<Clock className="size-4 text-muted-foreground" />
						<span>{customer.preferences.communication.preferredTime}</span>
					</div>
					<div className="col-span-2 flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
						<Globe className="size-4 text-muted-foreground" />
						<span>{customer.preferences.communication.language}</span>
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<p className="text-muted-foreground text-xs font-medium">
					Privacy Settings
				</p>
				<div className="rounded-lg border bg-muted/20 p-3 space-y-2">
					<PreferenceToggle
						label="Data Sharing"
						icon={Shield}
						enabled={customer.preferences.privacy.dataSharing}
					/>
					<PreferenceToggle
						label="Analytics"
						icon={Settings}
						enabled={customer.preferences.privacy.analytics}
					/>
					<PreferenceToggle
						label="Personalization"
						icon={User}
						enabled={customer.preferences.privacy.personalization}
					/>
				</div>
			</div>
			<div className="space-y-2">
				<p className="text-muted-foreground text-xs font-medium">
					Active Devices
				</p>
				<div className="grid gap-2">
					{customer.devices.slice(0, 2).map((device, index) => (
						<DeviceItem key={index} device={device} />
					))}
				</div>
			</div>
			<div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
				<span>Last updated</span>
				<span>{customer.lastUpdated}</span>
			</div>
		</CardContent>
		<CardFooter className="border-t bg-muted/20 px-4 py-3">
			<Button variant="outline" size="sm" className="w-full gap-1.5">
				<Settings className="size-4" />
				Manage Preferences
				<ChevronRight className="ml-auto size-4" />
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: PreferencesCustomer[] = [
		{
			id: '1',
			name: 'Liam Henderson',
			email: 'liam.h@email.com',
			phone: '+1 555-0301',
			initials: 'LH',
			preferences: {
				marketing: { email: true, sms: false, push: true },
				communication: {
					preferredChannel: 'email',
					preferredTime: '9AM-5PM',
					language: 'English (US)',
				},
				privacy: { dataSharing: false, analytics: true, personalization: true },
			},
			devices: [
				{ type: 'mobile', name: 'iPhone 15 Pro', lastActive: 'Now' },
				{ type: 'desktop', name: 'MacBook Pro', lastActive: '2h ago' },
			],
			location: { city: 'San Francisco', country: 'USA', timezone: 'PST' },
			lastUpdated: 'Jan 20, 2024',
		},
		{
			id: '2',
			name: 'Maya Thompson',
			email: 'maya.t@email.com',
			phone: '+1 555-0302',
			initials: 'MT',
			preferences: {
				marketing: { email: true, sms: true, push: true },
				communication: {
					preferredChannel: 'sms',
					preferredTime: '12PM-8PM',
					language: 'English (UK)',
				},
				privacy: { dataSharing: true, analytics: true, personalization: true },
			},
			devices: [
				{ type: 'mobile', name: 'Samsung Galaxy S24', lastActive: '30m ago' },
				{ type: 'tablet', name: 'iPad Pro', lastActive: '1d ago' },
			],
			location: { city: 'London', country: 'UK', timezone: 'GMT' },
			lastUpdated: 'Jan 18, 2024',
		},
		{
			id: '3',
			name: 'Nathan Brooks',
			email: 'nathan.b@email.com',
			phone: '+1 555-0303',
			initials: 'NB',
			preferences: {
				marketing: { email: false, sms: false, push: false },
				communication: {
					preferredChannel: 'phone',
					preferredTime: '10AM-6PM',
					language: 'English (US)',
				},
				privacy: {
					dataSharing: false,
					analytics: false,
					personalization: false,
				},
			},
			devices: [{ type: 'desktop', name: 'Windows PC', lastActive: '5h ago' }],
			location: { city: 'New York', country: 'USA', timezone: 'EST' },
			lastUpdated: 'Jan 15, 2024',
		},
		{
			id: '4',
			name: 'Olivia Chen',
			email: 'olivia.c@email.com',
			phone: '+1 555-0304',
			initials: 'OC',
			preferences: {
				marketing: { email: true, sms: false, push: true },
				communication: {
					preferredChannel: 'app',
					preferredTime: 'Anytime',
					language: 'Mandarin',
				},
				privacy: { dataSharing: true, analytics: true, personalization: true },
			},
			devices: [
				{ type: 'mobile', name: 'iPhone 14', lastActive: '1h ago' },
				{ type: 'desktop', name: 'iMac', lastActive: '3h ago' },
			],
			location: { city: 'Toronto', country: 'Canada', timezone: 'EST' },
			lastUpdated: 'Jan 22, 2024',
		},
		{
			id: '5',
			name: 'Patrick Miller',
			email: 'patrick.m@email.com',
			phone: '+1 555-0305',
			initials: 'PM',
			preferences: {
				marketing: { email: true, sms: true, push: false },
				communication: {
					preferredChannel: 'email',
					preferredTime: '8AM-4PM',
					language: 'Spanish',
				},
				privacy: { dataSharing: false, analytics: true, personalization: true },
			},
			devices: [{ type: 'mobile', name: 'Pixel 8', lastActive: 'Now' }],
			location: { city: 'Miami', country: 'USA', timezone: 'EST' },
			lastUpdated: 'Jan 19, 2024',
		},
		{
			id: '6',
			name: 'Rachel Kim',
			email: 'rachel.k@email.com',
			phone: '+1 555-0306',
			initials: 'RK',
			preferences: {
				marketing: { email: true, sms: false, push: true },
				communication: {
					preferredChannel: 'email',
					preferredTime: '6PM-10PM',
					language: 'Korean',
				},
				privacy: { dataSharing: true, analytics: true, personalization: false },
			},
			devices: [
				{ type: 'mobile', name: 'iPhone 15', lastActive: '45m ago' },
				{ type: 'tablet', name: 'Galaxy Tab S9', lastActive: '2d ago' },
			],
			location: { city: 'Seattle', country: 'USA', timezone: 'PST' },
			lastUpdated: 'Jan 21, 2024',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Settings className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Customer Preferences
						</h1>
						<p className="text-muted-foreground text-sm">
							Communication and privacy settings overview
						</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<PreferencesCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
