import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCheck,
	MapPin,
	Calendar,
	Package,
	ArrowRight,
	Printer,
	FileText,
} from 'lucide-react';
import Link from 'next/link';

interface DeliverySlotProps {
	date: string;
	time: string;
	type: string;
}

interface AddressCardProps {
	type: string;
	name: string;
	address: string;
	city: string;
	phone: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessCheckmark = () => (
	<div className="flex items-center justify-center gap-3">
		<div className="size-12 rounded-full bg-primary flex items-center justify-center">
			<CheckCheck className="size-6 text-primary-foreground" />
		</div>
		<div className="text-left">
			<p className="text-sm text-muted-foreground">Order Status</p>
			<p className="font-semibold text-primary">Confirmed</p>
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-xl @sm:text-2xl @lg:text-3xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const OrderNumber = ({ number }: { number: string }) => (
	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
		<span className="text-sm text-muted-foreground">Order ID:</span>
		<span className="font-mono font-semibold">{number}</span>
	</div>
);

const DeliverySlot = ({ date, time, type }: DeliverySlotProps) => (
	<Card className="w-full max-w-md border-primary/20">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
					<Calendar className="size-7 text-primary" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<p className="font-semibold">{date}</p>
						<Badge variant="secondary" className="text-xs">
							{type}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{time}</p>
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
	<div className="p-4 rounded-xl bg-muted/50 space-y-2">
		<div className="flex items-center gap-2">
			<MapPin className="size-4 text-muted-foreground" />
			<p className="text-sm font-medium text-muted-foreground">{type}</p>
		</div>
		<div className="pl-6 space-y-1 text-sm">
			<p className="font-semibold">{name}</p>
			<p className="text-muted-foreground">{address}</p>
			<p className="text-muted-foreground">{city}</p>
			<p className="text-muted-foreground">{phone}</p>
		</div>
	</div>
);

const ItemsSummary = ({
	itemCount,
	total,
	currency,
}: {
	itemCount: number;
	total: number;
	currency: string;
}) => (
	<div className="w-full max-w-md p-4 rounded-xl bg-muted/30 border">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Package className="size-5 text-muted-foreground" />
				<span className="text-sm text-muted-foreground">
					{itemCount} item{itemCount > 1 ? 's' : ''}
				</span>
			</div>
			<p className="font-bold text-lg">
				{currency}
				{total.toFixed(2)}
			</p>
		</div>
	</div>
);

const SecondaryActions = () => (
	<div className="flex items-center gap-3">
		<Button variant="ghost" size="sm" className="gap-2">
			<Printer className="size-4" />
			Print
		</Button>
		<Button variant="ghost" size="sm" className="gap-2">
			<FileText className="size-4" />
			Invoice
		</Button>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
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
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-6">
					<SuccessCheckmark />

					<div className="space-y-3 text-center">
						<Title text="Thank you for your order!" />
						<OrderNumber number="ORD-2024-78432-XYZ" />
					</div>

					<DeliverySlot
						date="Saturday, January 20"
						time="Between 2:00 PM - 6:00 PM"
						type="Scheduled"
					/>

					<div className="w-full max-w-md grid @sm:grid-cols-2 gap-4">
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

					<ItemsSummary itemCount={3} total={287.45} currency="$" />

					<SecondaryActions />

					<Separator className="w-full max-w-md" />

					<CTA
						items={[
							{
								label: 'Track Order',
								href: '/track',
								icon: ArrowRight,
							},
							{
								label: 'Back to Shop',
								href: '/shop',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
