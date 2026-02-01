import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, Package, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	sku: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	selected: boolean;
}

const BulkActions = ({
	selectAllLabel,
	deleteLabel,
	selectedCount,
}: {
	selectAllLabel: string;
	deleteLabel: string;
	selectedCount: number;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
		<div className="flex items-center gap-3">
			<Checkbox id="select-all" />
			<label
				htmlFor="select-all"
				className="text-sm font-medium cursor-pointer"
			>
				{selectAllLabel}
			</label>
		</div>
		{selectedCount > 0 && (
			<Button
				variant="ghost"
				size="sm"
				className="gap-2 text-destructive hover:text-destructive"
			>
				<Trash2 className="size-4" />
				{deleteLabel} ({selectedCount})
			</Button>
		)}
	</div>
);

const ItemCheckbox = ({ checked, id }: { checked: boolean; id: string }) => (
	<Checkbox checked={checked} id={`item-${id}`} className="mt-1" />
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({
	name,
	sku,
	price,
	originalPrice,
}: {
	name: string;
	sku: string;
	price: number;
	originalPrice?: number;
}) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium leading-tight">{name}</h3>
		<p className="mt-1 text-xs text-muted-foreground">SKU: {sku}</p>
		<div className="mt-2 flex items-center gap-2">
			<span className="text-lg font-bold text-primary">
				${price.toFixed(2)}
			</span>
			{originalPrice && (
				<span className="text-sm text-muted-foreground line-through">
					${originalPrice.toFixed(2)}
				</span>
			)}
			{originalPrice && (
				<Badge variant="destructive" className="text-xs">
					{Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
				</Badge>
			)}
		</div>
	</div>
);

const QuantityAdjuster = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-3">
		<Button size="icon-sm" variant="outline">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="outline">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemSubtotal = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-sm text-muted-foreground">Subtotal</p>
		<p className="text-lg font-bold">${(price * quantity).toFixed(2)}</p>
	</div>
);

const CartRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-6">
		<ItemCheckbox checked={item.selected} id={item.id} />
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
			<ItemInfo
				name={item.name}
				sku={item.sku}
				price={item.price}
				originalPrice={item.originalPrice}
			/>
			<div className="flex items-center justify-between gap-6 @sm:flex-col @sm:items-end">
				<QuantityAdjuster quantity={item.quantity} />
				<ItemSubtotal price={item.price} quantity={item.quantity} />
			</div>
		</div>
	</div>
);

const SummaryItem = ({
	label,
	value,
	emphasis,
}: {
	label: string;
	value: string;
	emphasis?: boolean;
}) => (
	<div
		className={`flex justify-between ${emphasis ? 'text-xl font-bold' : ''}`}
	>
		<span className={emphasis ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={emphasis ? 'text-primary' : ''}>{value}</span>
	</div>
);

const ShippingNote = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Premium Wireless Headphones Pro Max',
			sku: 'WH-1000XM5',
			price: 279.99,
			originalPrice: 349.99,
			quantity: 1,
			selected: true,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
			name: 'Smart Fitness Watch Series 8',
			sku: 'SFW-S8-BLK',
			price: 399.99,
			quantity: 2,
			selected: true,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Portable Bluetooth Speaker',
			sku: 'PBS-MINI-GRY',
			price: 89.99,
			originalPrice: 119.99,
			quantity: 1,
			selected: false,
		},
	];

	const selectedItems = items.filter((item) => item.selected);
	const selectedTotal = selectedItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 flex items-center gap-3">
					<Package className="size-6 text-primary" />
					<h1 className="text-2xl font-bold @md:text-3xl">Shopping Cart</h1>
				</div>

				<Card>
					<CardHeader className="border-b">
						<BulkActions
							selectAllLabel="Select all items"
							deleteLabel="Delete selected"
							selectedCount={selectedItems.length}
						/>
					</CardHeader>
					<CardContent className="divide-y p-0">
						{items.map((item) => (
							<div key={item.id} className="px-6">
								<CartRow item={item} />
							</div>
						))}
					</CardContent>
					<CardFooter className="flex-col gap-6 border-t bg-muted/30 p-6">
						<div className="w-full space-y-3">
							<SummaryItem
								label="Subtotal"
								value={`$${selectedTotal.toFixed(2)}`}
							/>
							<SummaryItem label="Estimated Shipping" value="$12.99" />
							<SummaryItem
								label="Estimated Tax"
								value={`$${(selectedTotal * 0.08).toFixed(2)}`}
							/>
							<Separator />
							<SummaryItem
								label="Order Total"
								value={`$${(selectedTotal + 12.99 + selectedTotal * 0.08).toFixed(2)}`}
								emphasis
							/>
						</div>

						<ShippingNote
							icon={Package}
							text="Free shipping on orders over $500. You're almost there!"
						/>

						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								<CreditCard className="size-4" />
								Checkout ({selectedItems.length} items)
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
