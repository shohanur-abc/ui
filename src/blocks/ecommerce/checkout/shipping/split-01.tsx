import { Package, Truck, Clock, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const OrderItem = ({
	image,
	name,
	variant,
	quantity,
	price,
}: {
	image: string;
	name: string;
	variant: string;
	quantity: number;
	price: string;
}) => (
	<div className="flex gap-4">
		<div className="relative size-16 shrink-0 rounded-lg bg-muted overflow-hidden">
			<img src={image} alt={name} className="size-full object-cover" />
			<span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
				{quantity}
			</span>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">{variant}</p>
		</div>
		<p className="font-medium">{price}</p>
	</div>
);

const SummaryRow = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'font-semibold text-lg' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-foreground' : ''}>{value}</span>
	</div>
);

const InfoBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

export default function Main() {
	const orderItems = [
		{
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Premium Wireless Headphones',
			variant: 'Black / Large',
			quantity: 1,
			price: '$299.00',
		},
		{
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
			name: 'Smart Watch Series 5',
			variant: 'Silver / 42mm',
			quantity: 2,
			price: '$598.00',
		},
	];

	const summaryItems = [
		{ label: 'Subtotal', value: '$897.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$71.76' },
	];

	const infoBadges = [
		{ icon: Truck, text: 'Free shipping' },
		{ icon: Clock, text: '2-5 days delivery' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @xl:grid-cols-[1fr,400px] gap-8 @xl:gap-12">
					<div className="order-2 @xl:order-1">
						<div className="flex items-center gap-3 mb-8">
							<MapPin className="size-6 text-primary" />
							<h2 className="text-2xl font-bold">Shipping Address</h2>
						</div>

						<div className="space-y-5">
							<div className="grid @sm:grid-cols-2 gap-4">
								<FormField label="First Name" placeholder="John" />
								<FormField label="Last Name" placeholder="Doe" />
							</div>
							<FormField label="Email" placeholder="john@example.com" type="email" />
							<FormField label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
							<FormField label="Address" placeholder="123 Main Street" />
							<FormField label="Apartment, Suite, etc." placeholder="Apt 4B" />
							<div className="grid @sm:grid-cols-3 gap-4">
								<FormField label="City" placeholder="New York" />
								<FormField label="State" placeholder="NY" />
								<FormField label="ZIP Code" placeholder="10001" />
							</div>

							<div className="flex flex-col @sm:flex-row gap-3 pt-6">
								<Button variant="outline" className="flex-1">Back to Cart</Button>
								<Button className="flex-1">Continue to Payment</Button>
							</div>
						</div>
					</div>

					<div className="order-1 @xl:order-2">
						<div className="sticky top-6 rounded-2xl border bg-muted/30 p-6">
							<div className="flex items-center gap-2 mb-6">
								<Package className="size-5" />
								<h3 className="font-semibold">Order Summary</h3>
							</div>

							<div className="space-y-4 mb-6">
								{orderItems.map((item, i) => (
									<OrderItem key={i} {...item} />
								))}
							</div>

							<Separator className="my-6" />

							<div className="space-y-3">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>

							<Separator className="my-6" />

							<SummaryRow label="Total" value="$968.76" bold />

							<div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
								{infoBadges.map((badge, i) => (
									<InfoBadge key={i} {...badge} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
