import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	ChevronRight,
	Clock,
	CreditCard,
	Edit2,
	Globe,
	Heart,
	Mail,
	MapPin,
	MoreHorizontal,
	Package,
	Phone,
	Settings,
	ShoppingBag,
	Star,
	Truck,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomerProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	status: 'active' | 'inactive';
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	memberSince: string;
	addresses: Array<{
		id: string;
		type: 'home' | 'work' | 'other';
		label: string;
		address: string;
		isDefault: boolean;
	}>;
	paymentMethods: Array<{
		id: string;
		type: 'visa' | 'mastercard' | 'amex' | 'paypal';
		last4?: string;
		expiry?: string;
		isDefault: boolean;
	}>;
	preferences: {
		language: string;
		currency: string;
		timezone: string;
		emailNotifications: boolean;
		smsNotifications: boolean;
	};
	recentOrders: Array<{
		id: string;
		date: string;
		status: 'processing' | 'shipped' | 'delivered';
		total: string;
		items: number;
	}>;
}

const TierBadge = ({ tier }: { tier: CustomerProfile['tier'] }) => {
	const config: Record<string, { label: string; className: string }> = {
		bronze: { label: 'Bronze', className: 'bg-orange-700/20 text-orange-400' },
		silver: { label: 'Silver', className: 'bg-slate-400/20 text-slate-300' },
		gold: { label: 'Gold', className: 'bg-amber-500/20 text-amber-400' },
		platinum: {
			label: 'Platinum',
			className: 'bg-violet-500/20 text-violet-300',
		},
	};
	const { label, className } = config[tier];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<Star className="size-3 fill-current" />
			{label}
		</Badge>
	);
};

const OrderStatusBadge = ({
	status,
}: {
	status: 'processing' | 'shipped' | 'delivered';
}) => {
	const config = {
		processing: {
			label: 'Processing',
			className: 'bg-blue-500/10 text-blue-500',
		},
		shipped: { label: 'Shipped', className: 'bg-amber-500/10 text-amber-500' },
		delivered: {
			label: 'Delivered',
			className: 'bg-emerald-500/10 text-emerald-500',
		},
	};
	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const PaymentIcon = ({ type }: { type: string }) => {
	const icons: Record<string, string> = {
		visa: '💳',
		mastercard: '💳',
		amex: '💳',
		paypal: '🅿️',
	};
	return <span className="text-lg">{icons[type] || '💳'}</span>;
};

const ProfileHeader = ({ customer }: { customer: CustomerProfile }) => (
	<div className="flex flex-col @md:flex-row gap-4 items-start @md:items-center">
		<Avatar className="size-20">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-2xl">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<h1 className="text-2xl font-bold">{customer.name}</h1>
				<TierBadge tier={customer.tier} />
			</div>
			<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<Mail className="size-3.5" />
					{customer.email}
				</span>
				<span className="flex items-center gap-1">
					<Phone className="size-3.5" />
					{customer.phone}
				</span>
				<span className="flex items-center gap-1">
					<Calendar className="size-3.5" />
					Since {customer.memberSince}
				</span>
			</div>
		</div>
		<Button variant="outline" size="sm" className="gap-1.5">
			<Edit2 className="size-3.5" />
			Edit Profile
		</Button>
	</div>
);

const AddressCard = ({
	address,
}: {
	address: CustomerProfile['addresses'][0];
}) => (
	<div
		className={`rounded-lg border p-4 ${address.isDefault ? 'border-primary bg-primary/5' : ''}`}
	>
		<div className="flex items-start justify-between mb-2">
			<div className="flex items-center gap-2">
				<Badge variant="secondary" className="capitalize">
					{address.type}
				</Badge>
				{address.isDefault && (
					<Badge variant="outline" className="text-primary">
						Default
					</Badge>
				)}
			</div>
			<Button variant="ghost" size="icon-sm">
				<Edit2 className="size-3.5" />
			</Button>
		</div>
		<p className="font-medium">{address.label}</p>
		<p className="text-sm text-muted-foreground">{address.address}</p>
	</div>
);

const PaymentMethodCard = ({
	method,
}: {
	method: CustomerProfile['paymentMethods'][0];
}) => (
	<div
		className={`flex items-center justify-between rounded-lg border p-4 ${method.isDefault ? 'border-primary bg-primary/5' : ''}`}
	>
		<div className="flex items-center gap-3">
			<PaymentIcon type={method.type} />
			<div>
				<p className="font-medium capitalize">
					{method.type} {method.last4 && `•••• ${method.last4}`}
				</p>
				{method.expiry && (
					<p className="text-sm text-muted-foreground">
						Expires {method.expiry}
					</p>
				)}
			</div>
		</div>
		<div className="flex items-center gap-2">
			{method.isDefault && (
				<Badge variant="outline" className="text-primary">
					Default
				</Badge>
			)}
			<Button variant="ghost" size="icon-sm">
				<Edit2 className="size-3.5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const customer: CustomerProfile = {
		id: '1',
		name: 'Marcus Thompson',
		email: 'marcus.t@email.com',
		phone: '+1 555-0456',
		initials: 'MT',
		status: 'active',
		tier: 'platinum',
		memberSince: 'Jan 2020',
		addresses: [
			{
				id: '1',
				type: 'home',
				label: 'Home Address',
				address: '123 Oak Street, San Francisco, CA 94102',
				isDefault: true,
			},
			{
				id: '2',
				type: 'work',
				label: 'Office',
				address: '456 Tech Park, Suite 100, San Jose, CA 95134',
				isDefault: false,
			},
		],
		paymentMethods: [
			{
				id: '1',
				type: 'visa',
				last4: '4242',
				expiry: '12/25',
				isDefault: true,
			},
			{
				id: '2',
				type: 'mastercard',
				last4: '8888',
				expiry: '06/24',
				isDefault: false,
			},
			{ id: '3', type: 'paypal', isDefault: false },
		],
		preferences: {
			language: 'English',
			currency: 'USD',
			timezone: 'PST',
			emailNotifications: true,
			smsNotifications: false,
		},
		recentOrders: [
			{
				id: 'ORD-9821',
				date: 'Jan 15, 2024',
				status: 'delivered',
				total: '$234.50',
				items: 3,
			},
			{
				id: 'ORD-9756',
				date: 'Jan 8, 2024',
				status: 'delivered',
				total: '$89.99',
				items: 1,
			},
			{
				id: 'ORD-9612',
				date: 'Dec 28, 2023',
				status: 'delivered',
				total: '$567.00',
				items: 5,
			},
		],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader customer={customer} />

				<Tabs defaultValue="addresses" className="w-full">
					<TabsList className="grid w-full grid-cols-4 @md:w-auto @md:inline-flex">
						<TabsTrigger value="addresses" className="gap-1.5">
							<MapPin className="size-4" />
							<span className="hidden @md:inline">Addresses</span>
						</TabsTrigger>
						<TabsTrigger value="payments" className="gap-1.5">
							<CreditCard className="size-4" />
							<span className="hidden @md:inline">Payments</span>
						</TabsTrigger>
						<TabsTrigger value="orders" className="gap-1.5">
							<Package className="size-4" />
							<span className="hidden @md:inline">Orders</span>
						</TabsTrigger>
						<TabsTrigger value="preferences" className="gap-1.5">
							<Settings className="size-4" />
							<span className="hidden @md:inline">Preferences</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="addresses" className="mt-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-semibold">Saved Addresses</h2>
							<Button variant="outline" size="sm">
								Add Address
							</Button>
						</div>
						<div className="grid @md:grid-cols-2 gap-4">
							{customer.addresses.map((address) => (
								<AddressCard key={address.id} address={address} />
							))}
						</div>
					</TabsContent>

					<TabsContent value="payments" className="mt-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-semibold">Payment Methods</h2>
							<Button variant="outline" size="sm">
								Add Payment
							</Button>
						</div>
						<div className="space-y-3">
							{customer.paymentMethods.map((method) => (
								<PaymentMethodCard key={method.id} method={method} />
							))}
						</div>
					</TabsContent>

					<TabsContent value="orders" className="mt-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-semibold">Recent Orders</h2>
							<Button variant="outline" size="sm">
								View All
							</Button>
						</div>
						<div className="space-y-3">
							{customer.recentOrders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between rounded-lg border p-4"
								>
									<div className="flex items-center gap-4">
										<div>
											<p className="font-medium">{order.id}</p>
											<p className="text-sm text-muted-foreground">
												{order.date}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<OrderStatusBadge status={order.status} />
										<div className="text-right">
											<p className="font-medium">{order.total}</p>
											<p className="text-sm text-muted-foreground">
												{order.items} items
											</p>
										</div>
										<ChevronRight className="size-4 text-muted-foreground" />
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					<TabsContent value="preferences" className="mt-6">
						<h2 className="font-semibold mb-4">Account Preferences</h2>
						<div className="space-y-4">
							<div className="grid @sm:grid-cols-3 gap-4">
								<div className="rounded-lg border p-4">
									<p className="text-sm text-muted-foreground mb-1">Language</p>
									<p className="font-medium flex items-center gap-2">
										<Globe className="size-4" />
										{customer.preferences.language}
									</p>
								</div>
								<div className="rounded-lg border p-4">
									<p className="text-sm text-muted-foreground mb-1">Currency</p>
									<p className="font-medium">{customer.preferences.currency}</p>
								</div>
								<div className="rounded-lg border p-4">
									<p className="text-sm text-muted-foreground mb-1">Timezone</p>
									<p className="font-medium">{customer.preferences.timezone}</p>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
