import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Calendar,
	Clock,
	DollarSign,
	Gift,
	Heart,
	MapPin,
	Package,
	Plus,
	RefreshCw,
	ShoppingBag,
	Star,
	Truck,
	X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SubscriptionHeader = ({
	plan,
	price,
	nextBilling,
	memberSince,
}: {
	plan: string;
	price: string;
	nextBilling: string;
	memberSince: string;
}) => (
	<div className="flex flex-col @md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl">
		<div className="text-center @md:text-left">
			<Badge className="bg-purple-500/20 text-purple-600 mb-2">{plan}</Badge>
			<h1 className="text-3xl font-bold">{price}<span className="text-lg text-muted-foreground">/month</span></h1>
			<p className="text-muted-foreground mt-1">Member since {memberSince}</p>
			<p className="text-sm text-muted-foreground">Next billing: {nextBilling}</p>
		</div>
		<div className="flex gap-2">
			<Button variant="outline">Change Plan</Button>
			<Button>Manage Subscription</Button>
		</div>
	</div>
);

const BoxesTab = ({
	upcomingBox,
	pastBoxes,
}: {
	upcomingBox: { title: string; date: string; items: string[]; status: string };
	pastBoxes: { title: string; date: string; image: string; rating: number }[];
}) => (
	<div className="space-y-6">
		<Card className="border-purple-500/30">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Upcoming Box</h3>
					<Badge className="bg-purple-500/20 text-purple-600">{upcomingBox.status}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col @md:flex-row gap-6">
					<div className="w-full @md:w-48 aspect-square rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
						<Gift className="size-16 text-purple-500" />
					</div>
					<div className="flex-1">
						<h4 className="text-xl font-semibold">{upcomingBox.title}</h4>
						<p className="text-muted-foreground">Arriving {upcomingBox.date}</p>
						<div className="mt-4">
							<p className="text-sm font-medium mb-2">What's inside:</p>
							<ul className="space-y-1">
								{upcomingBox.items.map((item, i) => (
									<li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="size-1.5 rounded-full bg-purple-500" />
										{item}
									</li>
								))}
							</ul>
						</div>
						<div className="flex gap-2 mt-4">
							<Button variant="outline" size="sm">Skip This Box</Button>
							<Button variant="outline" size="sm">Customize</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
		<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
			{pastBoxes.map((box, i) => (
				<Card key={i}>
					<CardContent className="p-4">
						<div className="aspect-video rounded-lg bg-muted overflow-hidden relative">
							<Image src={box.image} alt={box.title} fill className="object-cover" />
						</div>
						<h4 className="font-medium mt-3">{box.title}</h4>
						<p className="text-sm text-muted-foreground">{box.date}</p>
						<div className="flex items-center gap-1 mt-2">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star key={j} className={`size-4 ${j < box.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

const PreferencesTab = ({
	preferences,
}: {
	preferences: { category: string; options: { label: string; selected: boolean }[] }[];
}) => (
	<div className="space-y-6">
		{preferences.map((pref, i) => (
			<Card key={i}>
				<CardHeader className="pb-3">
					<h3 className="font-semibold">{pref.category}</h3>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{pref.options.map((option, j) => (
							<Badge
								key={j}
								variant={option.selected ? 'default' : 'outline'}
								className="cursor-pointer hover:bg-primary/80"
							>
								{option.label}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		))}
		<div className="flex justify-end">
			<Button>Save Preferences</Button>
		</div>
	</div>
);

const ShippingTab = ({
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
			<Card key={i} className={address.isDefault ? 'border-purple-500/50' : ''}>
				<CardContent className="p-4">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-3">
							<MapPin className="size-5 text-muted-foreground mt-0.5" />
							<div>
								<div className="flex items-center gap-2">
									<p className="font-medium">{address.label}</p>
									{address.isDefault && <Badge className="bg-purple-500/20 text-purple-600">Default</Badge>}
								</div>
								<p className="text-sm text-muted-foreground">{address.address}</p>
								<p className="text-sm text-muted-foreground">{address.city}</p>
							</div>
						</div>
						<Button variant="ghost" size="sm">Edit</Button>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const BillingTab = ({
	paymentMethod,
	billingHistory,
}: {
	paymentMethod: { type: string; last4: string; expiry: string };
	billingHistory: { date: string; description: string; amount: string; status: string }[];
}) => (
	<div className="space-y-6">
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Payment Method</h3>
					<Button variant="outline" size="sm">Change</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
					<div className="p-2 rounded-lg bg-background">
						<DollarSign className="size-5" />
					</div>
					<div>
						<p className="font-medium">{paymentMethod.type} ending in {paymentMethod.last4}</p>
						<p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
					</div>
				</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Billing History</h3>
			</CardHeader>
			<CardContent className="space-y-3">
				{billingHistory.map((bill, i) => (
					<div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
						<div>
							<p className="font-medium">{bill.description}</p>
							<p className="text-sm text-muted-foreground">{bill.date}</p>
						</div>
						<div className="text-right">
							<p className="font-medium">{bill.amount}</p>
							<Badge variant="secondary">{bill.status}</Badge>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			plan: 'Premium Box',
			price: '$49.99',
			nextBilling: 'February 15, 2024',
			memberSince: 'June 2023',
		},
		upcomingBox: {
			title: 'February Mystery Box',
			date: 'Feb 10-15, 2024',
			items: ['Full-size skincare product', 'Limited edition accessory', 'Surprise beauty item', 'Exclusive sneak peek'],
			status: 'Preparing',
		},
		pastBoxes: [
			{ title: 'January Box', date: 'Jan 2024', image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300', rating: 5 },
			{ title: 'December Holiday', date: 'Dec 2023', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300', rating: 4 },
			{ title: 'November Box', date: 'Nov 2023', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300', rating: 5 },
		],
		preferences: [
			{
				category: 'Skin Type',
				options: [
					{ label: 'Dry', selected: false },
					{ label: 'Oily', selected: true },
					{ label: 'Combination', selected: false },
					{ label: 'Sensitive', selected: true },
				],
			},
			{
				category: 'Product Interests',
				options: [
					{ label: 'Skincare', selected: true },
					{ label: 'Makeup', selected: true },
					{ label: 'Haircare', selected: false },
					{ label: 'Fragrance', selected: true },
					{ label: 'Wellness', selected: false },
				],
			},
		],
		addresses: [
			{ label: 'Home', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', isDefault: true },
			{ label: 'Work', address: '456 Business Ave, Floor 12', city: 'New York, NY 10002', isDefault: false },
		],
		paymentMethod: { type: 'Visa', last4: '4242', expiry: '12/26' },
		billingHistory: [
			{ date: 'Jan 15, 2024', description: 'Premium Box - January', amount: '$49.99', status: 'Paid' },
			{ date: 'Dec 15, 2023', description: 'Premium Box - December', amount: '$49.99', status: 'Paid' },
			{ date: 'Nov 15, 2023', description: 'Premium Box - November', amount: '$49.99', status: 'Paid' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<SubscriptionHeader {...profileData.header} />
				<Tabs defaultValue="boxes" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="boxes" className="gap-2">
							<Gift className="size-4" />
							My Boxes
						</TabsTrigger>
						<TabsTrigger value="preferences" className="gap-2">
							<Heart className="size-4" />
							Preferences
						</TabsTrigger>
						<TabsTrigger value="shipping" className="gap-2">
							<Truck className="size-4" />
							Shipping
						</TabsTrigger>
						<TabsTrigger value="billing" className="gap-2">
							<DollarSign className="size-4" />
							Billing
						</TabsTrigger>
					</TabsList>
					<TabsContent value="boxes" className="mt-6">
						<BoxesTab upcomingBox={profileData.upcomingBox} pastBoxes={profileData.pastBoxes} />
					</TabsContent>
					<TabsContent value="preferences" className="mt-6">
						<PreferencesTab preferences={profileData.preferences} />
					</TabsContent>
					<TabsContent value="shipping" className="mt-6">
						<ShippingTab addresses={profileData.addresses} />
					</TabsContent>
					<TabsContent value="billing" className="mt-6">
						<BillingTab paymentMethod={profileData.paymentMethod} billingHistory={profileData.billingHistory} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
