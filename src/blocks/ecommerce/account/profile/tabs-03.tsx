import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
	Bell,
	Camera,
	Check,
	CreditCard,
	Globe,
	Key,
	Lock,
	LogOut,
	Mail,
	MapPin,
	Moon,
	Phone,
	Plus,
	Shield,
	Smartphone,
	Trash2,
	User,
} from 'lucide-react';

const SettingsHeader = ({
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
	<div className="flex items-center gap-6 pb-6 border-b">
		<div className="relative">
			<Avatar className="size-20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
			</Avatar>
			<Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 size-8 rounded-full">
				<Camera className="size-4" />
			</Button>
		</div>
		<div>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">{email}</p>
		</div>
	</div>
);

const ProfileTab = ({
	data,
}: {
	data: { firstName: string; lastName: string; email: string; phone: string; birthDate: string };
}) => (
	<div className="space-y-6">
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
		<div className="grid @sm:grid-cols-2 gap-4">
			<div className="space-y-2">
				<label className="text-sm font-medium">Phone Number</label>
				<Input defaultValue={data.phone} type="tel" />
			</div>
			<div className="space-y-2">
				<label className="text-sm font-medium">Birth Date</label>
				<Input defaultValue={data.birthDate} type="date" />
			</div>
		</div>
		<div className="flex justify-end">
			<Button>Save Changes</Button>
		</div>
	</div>
);

const SecurityTab = ({
	settings,
}: {
	settings: { icon: React.ElementType; label: string; description: string; type: 'toggle' | 'action'; enabled?: boolean }[];
}) => (
	<div className="space-y-4">
		{settings.map((setting, i) => (
			<div key={i} className="flex items-center justify-between p-4 rounded-lg border">
				<div className="flex items-center gap-4">
					<div className="p-2 rounded-lg bg-muted">
						<setting.icon className="size-5" />
					</div>
					<div>
						<p className="font-medium">{setting.label}</p>
						<p className="text-sm text-muted-foreground">{setting.description}</p>
					</div>
				</div>
				{setting.type === 'toggle' ? (
					<Switch defaultChecked={setting.enabled} />
				) : (
					<Button variant="outline" size="sm">Update</Button>
				)}
			</div>
		))}
	</div>
);

const AddressesTab = ({
	addresses,
}: {
	addresses: { label: string; address: string; city: string; isDefault: boolean }[];
}) => (
	<div className="space-y-4">
		<div className="flex justify-end">
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Address
			</Button>
		</div>
		{addresses.map((address, i) => (
			<Card key={i} className={address.isDefault ? 'border-primary' : ''}>
				<CardContent className="p-4">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-3">
							<MapPin className="size-5 text-muted-foreground mt-0.5" />
							<div>
								<div className="flex items-center gap-2">
									<p className="font-medium">{address.label}</p>
									{address.isDefault && <Badge>Default</Badge>}
								</div>
								<p className="text-sm text-muted-foreground">{address.address}</p>
								<p className="text-sm text-muted-foreground">{address.city}</p>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="ghost" size="sm">Edit</Button>
							<Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
								<Trash2 className="size-4" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const PaymentTab = ({
	cards,
}: {
	cards: { type: string; last4: string; expiry: string; isDefault: boolean }[];
}) => (
	<div className="space-y-4">
		<div className="flex justify-end">
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Card
			</Button>
		</div>
		{cards.map((card, i) => (
			<Card key={i} className={card.isDefault ? 'border-primary' : ''}>
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-2 rounded-lg bg-muted">
								<CreditCard className="size-5" />
							</div>
							<div>
								<div className="flex items-center gap-2">
									<p className="font-medium">{card.type} ending in {card.last4}</p>
									{card.isDefault && <Badge>Default</Badge>}
								</div>
								<p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="ghost" size="sm">Edit</Button>
							<Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
								<Trash2 className="size-4" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const NotificationsTab = ({
	channels,
}: {
	channels: { icon: React.ElementType; label: string; notifications: { name: string; enabled: boolean }[] }[];
}) => (
	<div className="space-y-6">
		{channels.map((channel, i) => (
			<Card key={i}>
				<CardHeader className="pb-3">
					<h3 className="font-semibold flex items-center gap-2">
						<channel.icon className="size-5" />
						{channel.label}
					</h3>
				</CardHeader>
				<CardContent className="space-y-4">
					{channel.notifications.map((notif, j) => (
						<div key={j} className="flex items-center justify-between">
							<span className="text-sm">{notif.name}</span>
							<Switch defaultChecked={notif.enabled} />
						</div>
					))}
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
			fallback: 'MR',
			name: 'Michael Roberts',
			email: 'michael.r@example.com',
		},
		profile: {
			firstName: 'Michael',
			lastName: 'Roberts',
			email: 'michael.r@example.com',
			phone: '+1 (555) 123-4567',
			birthDate: '1990-05-15',
		},
		security: [
			{ icon: Key, label: 'Password', description: 'Last changed 3 months ago', type: 'action' as const },
			{ icon: Smartphone, label: 'Two-Factor Authentication', description: 'Add an extra layer of security', type: 'toggle' as const, enabled: true },
			{ icon: Lock, label: 'Login Alerts', description: 'Get notified of new sign-ins', type: 'toggle' as const, enabled: true },
			{ icon: Globe, label: 'Active Sessions', description: '3 devices currently signed in', type: 'action' as const },
		],
		addresses: [
			{ label: 'Home', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', isDefault: true },
			{ label: 'Work', address: '456 Business Ave, Floor 12', city: 'New York, NY 10002', isDefault: false },
		],
		cards: [
			{ type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
			{ type: 'Mastercard', last4: '5555', expiry: '08/25', isDefault: false },
		],
		notifications: [
			{
				icon: Mail,
				label: 'Email Notifications',
				notifications: [
					{ name: 'Order updates', enabled: true },
					{ name: 'Promotions and offers', enabled: true },
					{ name: 'Newsletter', enabled: false },
				],
			},
			{
				icon: Bell,
				label: 'Push Notifications',
				notifications: [
					{ name: 'Order shipped', enabled: true },
					{ name: 'Flash sales', enabled: true },
					{ name: 'Product back in stock', enabled: false },
				],
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<SettingsHeader {...profileData.header} />
				<Tabs defaultValue="profile" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="profile" className="gap-2">
							<User className="size-4" />
							Profile
						</TabsTrigger>
						<TabsTrigger value="security" className="gap-2">
							<Shield className="size-4" />
							Security
						</TabsTrigger>
						<TabsTrigger value="addresses" className="gap-2">
							<MapPin className="size-4" />
							Addresses
						</TabsTrigger>
						<TabsTrigger value="payment" className="gap-2">
							<CreditCard className="size-4" />
							Payment
						</TabsTrigger>
						<TabsTrigger value="notifications" className="gap-2">
							<Bell className="size-4" />
							Notifications
						</TabsTrigger>
					</TabsList>
					<TabsContent value="profile" className="mt-6">
						<ProfileTab data={profileData.profile} />
					</TabsContent>
					<TabsContent value="security" className="mt-6">
						<SecurityTab settings={profileData.security} />
					</TabsContent>
					<TabsContent value="addresses" className="mt-6">
						<AddressesTab addresses={profileData.addresses} />
					</TabsContent>
					<TabsContent value="payment" className="mt-6">
						<PaymentTab cards={profileData.cards} />
					</TabsContent>
					<TabsContent value="notifications" className="mt-6">
						<NotificationsTab channels={profileData.notifications} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
