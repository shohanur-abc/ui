import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	MapPin,
	CreditCard,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type CartItemProps = {
	image: string;
	name: string;
	variant: string;
	price: string;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

type AddressCardProps = {
	icon: LucideIcon;
	title: string;
	lines: string[];
	editHref: string;
};

const CartItemCompact = ({ image, name, variant, price }: CartItemProps) => (
	<div className="flex items-center gap-3 py-2">
		<Avatar className="size-10 rounded-md">
			<AvatarImage src={image} alt={name} className="object-cover" />
			<AvatarFallback className="rounded-md text-xs">
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{variant}</p>
		</div>
		<span className="text-sm font-semibold">{price}</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-xl font-bold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const AddressCard = ({
	icon: Icon,
	title,
	lines,
	editHref,
}: AddressCardProps) => (
	<div className="rounded-lg border p-4">
		<div className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-primary" />
				<span className="text-sm font-medium">{title}</span>
			</div>
			<Link href={editHref} className="text-xs text-primary hover:underline">
				Edit
			</Link>
		</div>
		<div className="space-y-0.5">
			{lines.map((line, i) => (
				<p key={i} className="text-sm text-muted-foreground">
					{line}
				</p>
			))}
		</div>
	</div>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
			name: 'Running Shoes Pro',
			variant: 'Size 10 / Black',
			price: '$179.00',
		},
		{
			image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=200',
			name: 'Sport Watch Elite',
			variant: 'GPS / Black',
			price: '$299.00',
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$478.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$38.24' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Shipping Address</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<AddressCard
									icon={MapPin}
									title="Delivery Address"
									lines={[
										'John Smith',
										'123 Main Street, Apt 4B',
										'New York, NY 10001',
										'+1 (555) 123-4567',
									]}
									editHref="/checkout/address"
								/>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Payment Method</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<AddressCard
									icon={CreditCard}
									title="Credit Card"
									lines={['Visa ending in 4242', 'Expires 12/26']}
									editHref="/checkout/payment"
								/>
							</CardContent>
						</Card>
					</div>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle className="text-base">Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-1">
								{cartItems.map((item, i) => (
									<CartItemCompact key={i} {...item} />
								))}
							</div>
							<Separator />
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$516.24" />
							<Button className="w-full" size="lg" asChild>
								<Link href="/checkout/confirm">Place Order</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
