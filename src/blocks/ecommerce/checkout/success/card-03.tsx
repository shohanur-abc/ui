import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	MapPin,
	Truck,
	CreditCard,
	ArrowRight,
	User,
	Phone,
} from 'lucide-react';
import Link from 'next/link';

interface AddressCardProps {
	type: string;
	name: string;
	address: string;
	city: string;
	phone: string;
}

interface PaymentCardProps {
	method: string;
	last4: string;
	expiry: string;
	amount: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessBanner = ({
	orderNumber,
	date,
}: {
	orderNumber: string;
	date: string;
}) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
					<CheckCircle2 className="size-7" />
				</div>
				<div className="flex-1">
					<h1 className="text-xl @lg:text-2xl font-bold">Order Confirmed!</h1>
					<p className="opacity-80">Thank you for your purchase</p>
				</div>
				<div className="text-right hidden @sm:block">
					<p className="text-sm opacity-80">Order Number</p>
					<p className="font-mono font-bold">{orderNumber}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AddressCard = ({
	type,
	name,
	address,
	city,
	phone,
}: AddressCardProps) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<MapPin className="size-4" />
				{type}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2 text-sm">
			<div className="flex items-center gap-2">
				<User className="size-4 text-muted-foreground" />
				<span className="font-medium">{name}</span>
			</div>
			<p className="text-muted-foreground pl-6">{address}</p>
			<p className="text-muted-foreground pl-6">{city}</p>
			<div className="flex items-center gap-2 pt-1">
				<Phone className="size-4 text-muted-foreground" />
				<span>{phone}</span>
			</div>
		</CardContent>
	</Card>
);

const PaymentCard = ({
	method,
	last4,
	expiry,
	amount,
	currency,
}: PaymentCardProps) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<CreditCard className="size-4" />
				Payment Method
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Card</span>
				<span className="font-medium">
					{method} •••• {last4}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Expiry</span>
				<span>{expiry}</span>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<span className="font-medium">Amount Charged</span>
				<span className="text-lg font-bold">
					{currency}
					{amount.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const DeliveryCard = ({
	method,
	estimate,
	tracking,
}: {
	method: string;
	estimate: string;
	tracking?: string;
}) => (
	<Card className="border-primary/20 bg-primary/5">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<Truck className="size-4 text-primary" />
				Delivery Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Method</span>
				<Badge variant="secondary">{method}</Badge>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Estimated Arrival</span>
				<span className="font-semibold text-primary">{estimate}</span>
			</div>
			{tracking && (
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Tracking</span>
					<span className="font-mono text-xs">{tracking}</span>
				</div>
			)}
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<SuccessBanner orderNumber="ORD-2024-78432" date="Jan 15, 2024" />

				<div className="grid @md:grid-cols-2 gap-4">
					<AddressCard
						type="Shipping Address"
						name="John Doe"
						address="123 Main Street, Apt 4B"
						city="New York, NY 10001"
						phone="+1 (555) 123-4567"
					/>
					<AddressCard
						type="Billing Address"
						name="John Doe"
						address="123 Main Street, Apt 4B"
						city="New York, NY 10001"
						phone="+1 (555) 123-4567"
					/>
				</div>

				<div className="grid @md:grid-cols-2 gap-4">
					<PaymentCard
						method="Visa"
						last4="4242"
						expiry="12/25"
						amount={349.99}
						currency="$"
					/>
					<DeliveryCard
						method="Express"
						estimate="Jan 18-20, 2024"
						tracking="1Z999AA10123456784"
					/>
				</div>

				<CTA
					items={[
						{ label: 'Track Package', href: '/track', icon: ArrowRight },
						{ label: 'View Order', href: '/orders', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
