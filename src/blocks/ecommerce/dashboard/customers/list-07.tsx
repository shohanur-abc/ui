import {
	Bell,
	BellOff,
	ChevronRight,
	Globe,
	Mail,
	MessageSquare,
	MoreHorizontal,
	Phone,
	Settings,
	Smartphone,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
		emailMarketing: boolean;
		smsNotifications: boolean;
		pushNotifications: boolean;
		orderUpdates: boolean;
		promotions: boolean;
	};
	preferredChannel: 'email' | 'sms' | 'phone' | 'app';
	language: string;
	lastUpdated: string;
	optInDate?: string;
}

const ChannelIcon = ({ channel }: { channel: string }) => {
	const icons: Record<string, React.ElementType> = {
		email: Mail,
		sms: MessageSquare,
		phone: Phone,
		app: Smartphone,
	};
	const Icon = icons[channel] || Mail;
	return <Icon className="size-4" />;
};

const PreferenceIndicator = ({
	label,
	enabled,
	icon: Icon,
}: {
	label: string;
	enabled: boolean;
	icon: React.ElementType;
}) => (
	<div
		className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}
	>
		<Icon className="size-3" />
		<span className="hidden @md:inline">{label}</span>
	</div>
);

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<Settings className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const PreferencesListItem = ({
	customer,
}: {
	customer: PreferencesCustomer;
}) => {
	const activePrefs = Object.values(customer.preferences).filter(
		Boolean,
	).length;
	const totalPrefs = Object.values(customer.preferences).length;
	return (
		<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
			<div className="flex items-center gap-3 min-w-0">
				<Avatar className="size-11">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0">
					<p className="font-semibold truncate">{customer.name}</p>
					<div className="flex items-center gap-2 text-muted-foreground text-sm">
						<span className="truncate">{customer.email}</span>
					</div>
				</div>
			</div>
			<div className="flex-1 flex flex-wrap items-center gap-2">
				<PreferenceIndicator
					label="Email"
					enabled={customer.preferences.emailMarketing}
					icon={Mail}
				/>
				<PreferenceIndicator
					label="SMS"
					enabled={customer.preferences.smsNotifications}
					icon={MessageSquare}
				/>
				<PreferenceIndicator
					label="Push"
					enabled={customer.preferences.pushNotifications}
					icon={Bell}
				/>
				<PreferenceIndicator
					label="Orders"
					enabled={customer.preferences.orderUpdates}
					icon={Smartphone}
				/>
				<PreferenceIndicator
					label="Promos"
					enabled={customer.preferences.promotions}
					icon={Bell}
				/>
			</div>
			<div className="flex items-center gap-4 @lg:gap-6">
				<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
					<ChannelIcon channel={customer.preferredChannel} />
					<span className="text-sm font-medium capitalize">
						{customer.preferredChannel}
					</span>
				</div>
				<div className="hidden @md:flex items-center gap-2">
					<Globe className="text-muted-foreground size-4" />
					<span className="text-sm">{customer.language}</span>
				</div>
				<div className="hidden @lg:block text-center min-w-[100px]">
					<Badge variant="secondary" className="text-xs">
						{activePrefs}/{totalPrefs} active
					</Badge>
					<p className="text-muted-foreground text-xs mt-1">
						Updated {customer.lastUpdated}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						className="hidden @md:flex gap-1.5"
					>
						<Settings className="size-3.5" />
						Edit
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View profile</DropdownMenuItem>
							<DropdownMenuItem>Edit preferences</DropdownMenuItem>
							<DropdownMenuItem>View consent history</DropdownMenuItem>
							<DropdownMenuItem>Opt out all</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const customers: PreferencesCustomer[] = [
		{
			id: '1',
			name: 'Rachel Kim',
			email: 'rachel.k@email.com',
			phone: '+1 555-0401',
			initials: 'RK',
			preferences: {
				emailMarketing: true,
				smsNotifications: false,
				pushNotifications: true,
				orderUpdates: true,
				promotions: true,
			},
			preferredChannel: 'email',
			language: 'English',
			lastUpdated: '2d ago',
			optInDate: 'Jan 2023',
		},
		{
			id: '2',
			name: 'Steven Clark',
			email: 'steven.c@email.com',
			phone: '+1 555-0402',
			initials: 'SC',
			preferences: {
				emailMarketing: true,
				smsNotifications: true,
				pushNotifications: true,
				orderUpdates: true,
				promotions: false,
			},
			preferredChannel: 'sms',
			language: 'English',
			lastUpdated: '1w ago',
			optInDate: 'Mar 2022',
		},
		{
			id: '3',
			name: 'Tiffany Wong',
			email: 'tiffany.w@email.com',
			phone: '+1 555-0403',
			initials: 'TW',
			preferences: {
				emailMarketing: false,
				smsNotifications: false,
				pushNotifications: false,
				orderUpdates: true,
				promotions: false,
			},
			preferredChannel: 'app',
			language: 'Mandarin',
			lastUpdated: '3d ago',
		},
		{
			id: '4',
			name: 'Ulysses Grant',
			email: 'ulysses.g@email.com',
			phone: '+1 555-0404',
			initials: 'UG',
			preferences: {
				emailMarketing: true,
				smsNotifications: true,
				pushNotifications: true,
				orderUpdates: true,
				promotions: true,
			},
			preferredChannel: 'email',
			language: 'English',
			lastUpdated: '1d ago',
			optInDate: 'Nov 2021',
		},
		{
			id: '5',
			name: 'Valerie Stone',
			email: 'valerie.s@email.com',
			phone: '+1 555-0405',
			initials: 'VS',
			preferences: {
				emailMarketing: true,
				smsNotifications: false,
				pushNotifications: true,
				orderUpdates: true,
				promotions: true,
			},
			preferredChannel: 'phone',
			language: 'Spanish',
			lastUpdated: '5d ago',
			optInDate: 'Jun 2022',
		},
		{
			id: '6',
			name: 'William Park',
			email: 'william.p@email.com',
			phone: '+1 555-0406',
			initials: 'WP',
			preferences: {
				emailMarketing: false,
				smsNotifications: true,
				pushNotifications: false,
				orderUpdates: true,
				promotions: false,
			},
			preferredChannel: 'sms',
			language: 'Korean',
			lastUpdated: '2w ago',
		},
		{
			id: '7',
			name: 'Xena Roberts',
			email: 'xena.r@email.com',
			phone: '+1 555-0407',
			initials: 'XR',
			preferences: {
				emailMarketing: true,
				smsNotifications: true,
				pushNotifications: true,
				orderUpdates: true,
				promotions: true,
			},
			preferredChannel: 'app',
			language: 'English',
			lastUpdated: '1d ago',
			optInDate: 'Aug 2023',
		},
		{
			id: '8',
			name: 'Yusuf Ahmed',
			email: 'yusuf.a@email.com',
			phone: '+1 555-0408',
			initials: 'YA',
			preferences: {
				emailMarketing: false,
				smsNotifications: false,
				pushNotifications: true,
				orderUpdates: true,
				promotions: false,
			},
			preferredChannel: 'app',
			language: 'Arabic',
			lastUpdated: '4d ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Communication Preferences"
					subtitle="Customer notification and marketing settings"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<PreferencesListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
