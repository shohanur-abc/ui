import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	Copy,
	Mail,
	MapPin,
	CreditCard,
	ArrowRight,
	Home,
} from 'lucide-react';
import Link from 'next/link';

interface InfoRowProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

interface AddressProps {
	name: string;
	street: string;
	city: string;
	country: string;
	phone: string;
}

interface PaymentMethodProps {
	type: string;
	last4: string;
	expiry: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessBadge = ({ text }: { text: string }) => (
	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
		<CheckCircle2 className="size-5" />
		<span className="font-medium">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text}
	</h1>
);

const OrderNumber = ({
	orderNumber,
	onCopy,
}: {
	orderNumber: string;
	onCopy?: () => void;
}) => (
	<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border">
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">Order Number</p>
			<p className="font-mono text-lg font-semibold">{orderNumber}</p>
		</div>
		<Button variant="ghost" size="icon" className="shrink-0">
			<Copy className="size-4" />
		</Button>
	</div>
);

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
	<div className="flex items-start gap-3">
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
	</div>
);

const ShippingAddress = ({
	name,
	street,
	city,
	country,
	phone,
}: AddressProps) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<MapPin className="size-4 text-muted-foreground" />
			<h3 className="font-semibold">Shipping Address</h3>
		</div>
		<div className="pl-6 space-y-1 text-sm">
			<p className="font-medium">{name}</p>
			<p className="text-muted-foreground">{street}</p>
			<p className="text-muted-foreground">
				{city}, {country}
			</p>
			<p className="text-muted-foreground">{phone}</p>
		</div>
	</div>
);

const PaymentMethod = ({ type, last4, expiry }: PaymentMethodProps) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4 text-muted-foreground" />
			<h3 className="font-semibold">Payment Method</h3>
		</div>
		<div className="pl-6 space-y-1 text-sm">
			<p className="font-medium">{type}</p>
			<p className="text-muted-foreground">**** **** **** {last4}</p>
			<p className="text-muted-foreground">Expires {expiry}</p>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-md mx-auto">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

const EmailNotice = ({ email }: { email: string }) => (
	<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 text-sm">
		<Mail className="size-5 text-muted-foreground shrink-0" />
		<p className="text-muted-foreground">
			Confirmation email sent to{' '}
			<span className="font-medium text-foreground">{email}</span>
		</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8 text-center">
					<SuccessBadge text="Payment Successful" />

					<Title text="Your order is confirmed!" />

					<OrderNumber orderNumber="ORD-2024-78432-XY" />

					<div className="w-full space-y-6 text-left">
						<div className="grid gap-4">
							<InfoRow
								icon={Mail}
								label="Confirmation Email"
								value="customer@example.com"
							/>
							<InfoRow
								icon={MapPin}
								label="Estimated Delivery"
								value="January 22-25, 2024"
							/>
						</div>

						<Separator />

						<div className="grid @sm:grid-cols-2 gap-6">
							<ShippingAddress
								name="John Doe"
								street="123 Main Street, Apt 4B"
								city="New York, NY 10001"
								country="United States"
								phone="+1 (555) 123-4567"
							/>
							<PaymentMethod
								type="Visa Credit Card"
								last4="4242"
								expiry="12/25"
							/>
						</div>
					</div>

					<Separator className="w-full" />

					<CTA
						items={[
							{
								label: 'View Order',
								href: '/orders',
								icon: ArrowRight,
							},
							{
								label: 'Back to Home',
								href: '/',
								variant: 'outline',
								icon: Home,
							},
						]}
					/>

					<EmailNotice email="customer@example.com" />
				</div>
			</div>
		</section>
	);
}
