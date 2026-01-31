import { Package, Truck, Clock, Leaf, Zap, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const GlowDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
		<div className="absolute top-0 right-0 size-[500px] rounded-full bg-primary/5 blur-3xl" />
		<div className="absolute bottom-0 left-0 size-[400px] rounded-full bg-primary/5 blur-3xl" />
	</div>
);

const DeliveryOption = ({
	value,
	icon: Icon,
	badge,
	badgeVariant,
	name,
	time,
	price,
	tagline,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
	badgeVariant?: 'default' | 'secondary' | 'outline';
	name: string;
	time: string;
	price: string;
	tagline?: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-semibold">{name}</span>
				{badge && <Badge variant={badgeVariant}>{badge}</Badge>}
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
				{tagline && (
					<>
						<span>•</span>
						<span>{tagline}</span>
					</>
				)}
			</div>
		</div>
		<span className="font-bold">{price}</span>
	</Label>
);

const FormInput = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<Input
			type={type}
			placeholder={placeholder}
			className="h-11 bg-muted/50 border-muted-foreground/20"
		/>
	</div>
);

const OrderProduct = ({
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
	<div className="flex gap-3">
		<div className="relative size-14 shrink-0 rounded-lg bg-muted overflow-hidden">
			<img src={image} alt={name} className="size-full object-cover" />
			<span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
				{quantity}
			</span>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{name}</p>
			<p className="text-xs text-muted-foreground">{variant}</p>
		</div>
		<p className="text-sm font-medium">{price}</p>
	</div>
);

export default function Main() {
	const deliveryOptions = [
		{ value: 'express', icon: Zap, name: 'Express', time: '1-2 days', price: '$14.99', badge: 'Fastest', badgeVariant: 'default' as const },
		{ value: 'standard', icon: Truck, name: 'Standard', time: '3-5 days', price: '$7.99' },
		{ value: 'eco', icon: Leaf, name: 'Eco-Friendly', time: '5-7 days', price: '$5.99', tagline: 'Carbon neutral', badge: 'Green', badgeVariant: 'secondary' as const },
	];

	const products = [
		{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100', name: 'Minimal Watch', variant: 'Silver / Medium', quantity: 1, price: '$189.00' },
		{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100', name: 'Leather Wallet', variant: 'Brown', quantity: 2, price: '$98.00' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<GlowDecorative />
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @xl:grid-cols-[1fr,400px] gap-8 @xl:gap-12">
					<div className="space-y-8">
						<div>
							<h1 className="text-3xl font-bold tracking-tight mb-2">Shipping</h1>
							<p className="text-muted-foreground">Complete your order details</p>
						</div>

						<div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-6 shadow-xl">
							<h3 className="font-semibold text-lg mb-5">Delivery Address</h3>
							<div className="space-y-4">
								<div className="grid @sm:grid-cols-2 gap-4">
									<FormInput label="First Name" placeholder="John" />
									<FormInput label="Last Name" placeholder="Doe" />
								</div>
								<FormInput label="Email" placeholder="john@example.com" type="email" />
								<FormInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
								<FormInput label="Address" placeholder="123 Main Street" />
								<div className="grid @sm:grid-cols-3 gap-4">
									<FormInput label="City" placeholder="New York" />
									<FormInput label="State" placeholder="NY" />
									<FormInput label="ZIP" placeholder="10001" />
								</div>
							</div>
						</div>

						<div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-6 shadow-xl">
							<h3 className="font-semibold text-lg mb-5">Delivery Speed</h3>
							<RadioGroup defaultValue="standard" className="space-y-3">
								{deliveryOptions.map((opt) => (
									<DeliveryOption key={opt.value} {...opt} />
								))}
							</RadioGroup>
						</div>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1">Back</Button>
							<Button className="flex-1 gap-2">
								Continue
								<ArrowRight className="size-4" />
							</Button>
						</div>
					</div>

					<div className="@xl:sticky @xl:top-6 @xl:self-start">
						<div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-6 shadow-xl">
							<div className="flex items-center gap-2 mb-5">
								<Package className="size-5" />
								<h3 className="font-semibold text-lg">Your Order</h3>
							</div>

							<div className="space-y-4 mb-6">
								{products.map((p, i) => (
									<OrderProduct key={i} {...p} />
								))}
							</div>

							<Separator className="my-4" />

							<div className="space-y-2 text-sm">
								<div className="flex justify-between text-muted-foreground">
									<span>Subtotal</span>
									<span>$287.00</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Shipping</span>
									<span>$7.99</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Tax</span>
									<span>$23.60</span>
								</div>
							</div>

							<Separator className="my-4" />

							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span className="text-primary">$318.59</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
