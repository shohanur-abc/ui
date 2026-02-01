import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
	Minus,
	Plus,
	X,
	Ruler,
	Palette,
	Type,
	ArrowRight,
	Wand2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Customization {
	type: string;
	value: string;
	price?: number;
}

interface CartItem {
	id: string;
	image: string;
	name: string;
	basePrice: number;
	quantity: number;
	customizations: Customization[];
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-3">
			<Wand2 className="size-6 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const ProductPreview = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 shadow-inner @sm:w-36">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
	</div>
);

const ProductName = ({ name }: { name: string }) => (
	<h3 className="font-semibold text-lg leading-tight">{name}</h3>
);

const CustomizationBadge = ({ type, value, price }: Customization) => {
	const icons: Record<string, React.ReactNode> = {
		Size: <Ruler className="size-3" />,
		Color: <Palette className="size-3" />,
		Text: <Type className="size-3" />,
	};

	return (
		<Badge variant="secondary" className="gap-1.5 text-xs">
			{icons[type]}
			{type}: {value}
			{price && price > 0 && (
				<span className="text-primary font-medium">+${price.toFixed(2)}</span>
			)}
		</Badge>
	);
};

const EngravingPreview = ({ text }: { text: string }) => (
	<div className="rounded-lg border border-dashed bg-muted/30 p-3">
		<p className="text-xs text-muted-foreground mb-1">Engraving Preview:</p>
		<p className="font-serif italic text-center text-lg">{text}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2 rounded-xl border-2 bg-background p-1">
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-lg">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-semibold">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8 rounded-lg">
			<Plus className="size-3" />
		</Button>
	</div>
);

const EditCustomization = ({ label }: { label: string }) => (
	<Button variant="outline" size="sm" className="gap-1.5">
		<Wand2 className="size-3" />
		{label}
	</Button>
);

const ItemPricing = ({
	basePrice,
	customizations,
	quantity,
}: {
	basePrice: number;
	customizations: Customization[];
	quantity: number;
}) => {
	const customizationTotal = customizations.reduce(
		(sum, c) => sum + (c.price || 0),
		0,
	);
	const unitPrice = basePrice + customizationTotal;
	const total = unitPrice * quantity;

	return (
		<div className="text-right space-y-1">
			<div className="text-sm text-muted-foreground">
				${basePrice.toFixed(2)} + ${customizationTotal.toFixed(2)} customization
			</div>
			<div className="text-xl font-bold text-primary">${total.toFixed(2)}</div>
		</div>
	);
};

const RemoveItem = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
	</Button>
);

const CartItemCard = ({ item }: { item: CartItem }) => {
	const engravingCustomization = item.customizations.find(
		(c) => c.type === 'Text',
	);

	return (
		<Card className="relative overflow-hidden">
			<RemoveItem />
			<CardContent className="p-5">
				<div className="flex gap-5">
					<ProductPreview src={item.image} alt={item.name} />
					<div className="flex-1 min-w-0 space-y-4">
						<ProductName name={item.name} />
						<div className="flex flex-wrap gap-2">
							{item.customizations.map((c, i) => (
								<CustomizationBadge key={i} {...c} />
							))}
						</div>
						{engravingCustomization && (
							<EngravingPreview text={engravingCustomization.value} />
						)}
					</div>
				</div>
				<div className="flex items-center justify-between mt-5 pt-5 border-t">
					<div className="flex items-center gap-4">
						<QuantityControl quantity={item.quantity} />
						<EditCustomization label="Edit" />
					</div>
					<ItemPricing
						basePrice={item.basePrice}
						customizations={item.customizations}
						quantity={item.quantity}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

const SpecialInstructions = ({
	title,
	placeholder,
}: {
	title: string;
	placeholder: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<Textarea placeholder={placeholder} className="resize-none" rows={3} />
		</CardContent>
	</Card>
);

const PriceLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'secondary' | 'total';
}) => (
	<div
		className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}
	>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'secondary'
						? 'text-sm'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
	note,
}: {
	title: string;
	lines: {
		label: string;
		value: string;
		variant?: 'default' | 'secondary' | 'total';
	}[];
	checkoutLabel: string;
	checkoutHref: string;
	note: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.variant === 'total' && <Separator className="my-3" />}
					<PriceLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter className="flex-col gap-4">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<p className="text-xs text-center text-muted-foreground">{note}</p>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
			name: 'Custom Engraved Watch',
			basePrice: 299.99,
			quantity: 1,
			customizations: [
				{ type: 'Size', value: 'Medium' },
				{ type: 'Color', value: 'Rose Gold', price: 25 },
				{ type: 'Text', value: 'Forever Yours', price: 15 },
			],
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
			name: 'Personalized Leather Wallet',
			basePrice: 89.99,
			quantity: 1,
			customizations: [
				{ type: 'Color', value: 'Brown' },
				{ type: 'Text', value: 'JD', price: 10 },
			],
		},
	];

	const subtotal = items.reduce((sum, item) => {
		const customTotal = item.customizations.reduce(
			(s, c) => s + (c.price || 0),
			0,
		);
		return sum + (item.basePrice + customTotal) * item.quantity;
	}, 0);

	const summaryLines = [
		{ label: 'Base Products', value: '$389.98' },
		{
			label: 'Customizations',
			value: '+$50.00',
			variant: 'secondary' as const,
		},
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${(subtotal * 0.08).toFixed(2)}` },
		{
			label: 'Total',
			value: `$${(subtotal * 1.08).toFixed(2)}`,
			variant: 'total' as const,
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Custom Orders"
					subtitle="Review your personalized items"
				/>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemCard key={item.id} item={item} />
						))}
						<SpecialInstructions
							title="Special Instructions"
							placeholder="Add any special requests or notes for your order..."
						/>
					</div>

					<div className="@xl:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
							note="Custom items are made to order. Please allow 5-7 business days for production."
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
