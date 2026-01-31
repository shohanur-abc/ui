import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Minus, Plus, X, ArrowRight, ShoppingCart, Settings2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	selected: boolean;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Settings2 className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantitySlider = ({ quantity, max }: { quantity: number; max: number }) => (
	<div className="flex items-center gap-3 flex-1">
		<Slider
			defaultValue={[quantity]}
			max={max}
			min={1}
			step={1}
			className="flex-1"
		/>
		<span className="text-sm font-medium w-6 text-center">{quantity}</span>
	</div>
);

const SelectableItem = ({ item }: { item: CartItem }) => (
	<div className={`flex gap-4 py-4 ${!item.selected ? 'opacity-50' : ''}`}>
		<div className="flex items-center">
			<Checkbox defaultChecked={item.selected} id={`item-${item.id}`} />
		</div>
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<Label htmlFor={`item-${item.id}`} className="cursor-pointer">
				<h3 className="font-semibold line-clamp-1">{item.name}</h3>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
			</Label>
			<div className="mt-3">
				<QuantitySlider quantity={item.quantity} max={10} />
			</div>
		</div>
		<div className="flex flex-col items-end justify-between">
			<Button
				size="icon-sm"
				variant="ghost"
				className="text-muted-foreground hover:text-destructive"
			>
				<X className="size-4" />
			</Button>
			<p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
		</div>
	</div>
);

const BulkActions = ({ selectedCount, totalCount }: { selectedCount: number; totalCount: number }) => (
	<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
		<div className="flex items-center gap-3">
			<Checkbox
				id="select-all"
				defaultChecked={selectedCount === totalCount}
			/>
			<Label htmlFor="select-all" className="text-sm cursor-pointer">
				Select all ({selectedCount}/{totalCount})
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" disabled={selectedCount === 0}>
				<Trash2 className="size-4 mr-1" />
				Remove selected
			</Button>
		</div>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const PromoInput = () => (
	<div className="space-y-2">
		<Label htmlFor="promo">Promo Code</Label>
		<div className="flex gap-2">
			<Input id="promo" placeholder="Enter code" />
			<Button variant="outline">Apply</Button>
		</div>
	</div>
);

const ShippingOption = ({ enabled }: { enabled: boolean }) => (
	<div className="flex items-center justify-between p-3 border rounded-lg">
		<div>
			<Label htmlFor="express" className="cursor-pointer">Express Shipping</Label>
			<p className="text-xs text-muted-foreground">Get it in 1-2 days (+$9.99)</p>
		</div>
		<Switch id="express" defaultChecked={enabled} />
	</div>
);

const GiftOption = ({ enabled }: { enabled: boolean }) => (
	<div className="flex items-center justify-between p-3 border rounded-lg">
		<div>
			<Label htmlFor="gift" className="cursor-pointer">Gift Wrap</Label>
			<p className="text-xs text-muted-foreground">Add a special touch (+$4.99)</p>
		</div>
		<Switch id="gift" defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			selected: true,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 2,
			selected: true,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
			selected: false,
		},
	];

	const selectedItems = items.filter((i) => i.selected);
	const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Interactive Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<BulkActions selectedCount={selectedItems.length} totalCount={items.length} />
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<SelectableItem key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-4">
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Options</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<PromoInput />
								<Separator />
								<ShippingOption enabled={false} />
								<GiftOption enabled={false} />
								<Separator />
								<div className="space-y-3">
									{summaryLines.map((line, i) => (
										<div key={i}>
											{line.bold && <Separator className="my-3" />}
											<SummaryLine {...line} />
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full gap-2"
									size="lg"
									disabled={selectedItems.length === 0}
									asChild
								>
									<Link href="/checkout">
										Checkout ({selectedItems.length} items)
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
