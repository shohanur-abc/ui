import {
	Check,
	CreditCard,
	Lock,
	Minus,
	Plus,
	ShoppingBag,
	Trash2,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CartProductProps {
	id: string;
	name: string;
	variant: string;
	price: string;
	quantity: number;
	inStock: boolean;
}

interface DeliveryOptionProps {
	id: string;
	label: string;
	estimate: string;
	price: string;
	selected?: boolean;
}

interface PromoCodeProps {
	placeholder: string;
	buttonLabel: string;
}

const CartProduct = ({
	name,
	variant,
	price,
	quantity,
	inStock,
}: CartProductProps) => (
	<div className="flex gap-4 p-4 rounded-xl bg-muted/30">
		<div className="size-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<ShoppingBag className="size-8 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0 space-y-2">
			<div>
				<h4 className="font-medium truncate">{name}</h4>
				<p className="text-sm text-muted-foreground">{variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon-sm" className="size-7">
						<Minus className="size-3" />
					</Button>
					<span className="w-8 text-center text-sm">{quantity}</span>
					<Button variant="outline" size="icon-sm" className="size-7">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-semibold">{price}</span>
			</div>
			<div className="flex items-center justify-between">
				{inStock ? (
					<Badge variant="secondary" className="gap-1 text-xs">
						<Check className="size-3" />
						In Stock
					</Badge>
				) : (
					<Badge
						variant="outline"
						className="text-xs text-amber-500 border-amber-500/30"
					>
						Low Stock
					</Badge>
				)}
				<Button
					variant="ghost"
					size="sm"
					className="text-destructive hover:text-destructive gap-1 h-7 text-xs"
				>
					<Trash2 className="size-3" />
					Remove
				</Button>
			</div>
		</div>
	</div>
);

const CartProducts = ({ products }: { products: CartProductProps[] }) => (
	<div className="space-y-4">
		{products.map((product) => (
			<CartProduct key={product.id} {...product} />
		))}
	</div>
);

const DeliveryOption = ({
	label,
	estimate,
	price,
	selected,
}: DeliveryOptionProps) => (
	<div
		className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
			selected
				? 'border-primary bg-primary/5'
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="flex items-center gap-3">
			<Truck className="size-4 text-muted-foreground" />
			<div>
				<p className="text-sm font-medium">{label}</p>
				<p className="text-xs text-muted-foreground">{estimate}</p>
			</div>
		</div>
		<span className="text-sm font-medium">{price}</span>
	</div>
);

const DeliveryOptions = ({ options }: { options: DeliveryOptionProps[] }) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">Delivery</Label>
		{options.map((option) => (
			<DeliveryOption key={option.id} {...option} />
		))}
	</div>
);

const PromoCode = ({ placeholder, buttonLabel }: PromoCodeProps) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="flex-1" />
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const SummaryLine = ({
	label,
	value,
	isTotal,
	isDiscount,
}: {
	label: string;
	value: string;
	isTotal?: boolean;
	isDiscount?: boolean;
}) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-semibold' : 'text-sm'}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isDiscount ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isDiscount?: boolean;
	}[];
}) => (
	<div className="space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-3" />}
				<SummaryLine {...line} />
			</div>
		))}
	</div>
);

const CardField = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const CheckoutButton = ({ amount }: { amount: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		Checkout {amount}
	</Button>
);

export default function Main() {
	const products: CartProductProps[] = [
		{
			id: '1',
			name: 'Leather Backpack',
			variant: 'Brown / Large',
			price: '$149.00',
			quantity: 1,
			inStock: true,
		},
		{
			id: '2',
			name: 'Classic Watch',
			variant: 'Silver',
			price: '$299.00',
			quantity: 1,
			inStock: false,
		},
	];

	const deliveryOptions: DeliveryOptionProps[] = [
		{
			id: 'standard',
			label: 'Standard',
			estimate: '5-7 business days',
			price: 'Free',
			selected: true,
		},
		{
			id: 'express',
			label: 'Express',
			estimate: '2-3 business days',
			price: '$12.00',
		},
	];

	const summaryLines = [
		{ label: 'Subtotal', value: '$448.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$35.84' },
		{ label: 'Total', value: '$483.84', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-bold">Your Cart</h1>
							<Badge variant="secondary">{products.length} items</Badge>
						</div>
						<CartProducts products={products} />
						<DeliveryOptions options={deliveryOptions} />
						<PromoCode placeholder="Enter promo code" buttonLabel="Apply" />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Order Summary</h3>
							</CardHeader>
							<CardContent className="space-y-6">
								<OrderSummary lines={summaryLines} />
								<Separator />
								<div className="space-y-4">
									<CardField
										id="card"
										label="Card Number"
										placeholder="1234 5678 9012 3456"
										icon={CreditCard}
									/>
									<CardField
										id="name"
										label="Name on Card"
										placeholder="John Doe"
									/>
									<div className="grid grid-cols-2 gap-4">
										<CardField id="exp" label="Expiry" placeholder="MM/YY" />
										<CardField
											id="cvc"
											label="CVC"
											placeholder="123"
											type="password"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<CheckoutButton amount="$483.84" />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
