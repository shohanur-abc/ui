import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Minus, Plus, X, Gift, Shield, Leaf, ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface AddOn {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: number;
	enabled: boolean;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="outline" className="text-base px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const ItemPhoto = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemText = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-semibold line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QtyControls = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1">
		<Button size="icon-sm" variant="outline" className="size-7 rounded-lg">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="outline" className="size-7 rounded-lg">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemAmount = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="text-lg font-bold">${(price * quantity).toFixed(2)}</p>
);

const DeleteBtn = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
		<X className="size-4" />
	</Button>
);

const CartRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-4">
		<ItemPhoto src={item.image} alt={item.name} />
		<div className="flex flex-1 flex-col gap-3 @sm:flex-row @sm:items-center @sm:justify-between">
			<ItemText name={item.name} variant={item.variant} />
			<div className="flex items-center justify-between gap-6">
				<QtyControls quantity={item.quantity} />
				<ItemAmount price={item.price} quantity={item.quantity} />
				<DeleteBtn />
			</div>
		</div>
	</div>
);

const AddOnToggle = ({ addon }: { addon: AddOn }) => {
	const Icon = addon.icon;
	return (
		<div className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<p className="font-medium">{addon.name}</p>
					{addon.price > 0 && (
						<Badge variant="secondary" className="text-xs">
							+${addon.price.toFixed(2)}
						</Badge>
					)}
				</div>
				<p className="text-sm text-muted-foreground">{addon.description}</p>
			</div>
			<Switch checked={addon.enabled} />
		</div>
	);
};

const AddOnsCard = ({ title, addons }: { title: string; addons: AddOn[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2 text-lg">
				{title}
				<Info className="size-4 text-muted-foreground" />
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{addons.map((addon) => (
				<AddOnToggle key={addon.id} addon={addon} />
			))}
		</CardContent>
	</Card>
);

const TotalRow = ({
	label,
	value,
	highlight,
	addon,
}: {
	label: string;
	value: string;
	highlight?: boolean;
	addon?: boolean;
}) => (
	<div className={`flex justify-between ${highlight ? 'text-xl font-bold' : ''}`}>
		<span className={`${highlight ? '' : 'text-muted-foreground'} ${addon ? 'text-sm' : ''}`}>
			{label}
		</span>
		<span className={highlight ? 'text-primary' : addon ? 'text-sm' : ''}>{value}</span>
	</div>
);

const SummaryCard = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
	secureNote,
}: {
	title: string;
	lines: { label: string; value: string; highlight?: boolean; addon?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
	secureNote: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{lines.map((line, i) => (
				<div key={i}>
					{line.highlight && <Separator className="my-3" />}
					<TotalRow {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter className="flex-col gap-3">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<Shield className="size-4" />
				<span>{secureNote}</span>
			</div>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Minimalist Analog Watch',
			variant: 'Rose Gold / Leather Band',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=300&h=300&fit=crop',
			name: 'Wireless Charging Pad',
			variant: 'Black / 15W Fast Charge',
			price: 49.99,
			quantity: 2,
		},
	];

	const addons: AddOn[] = [
		{
			id: 'gift',
			icon: Gift,
			name: 'Gift Wrapping',
			description: 'Premium gift wrap with personalized note',
			price: 5.99,
			enabled: false,
		},
		{
			id: 'warranty',
			icon: Shield,
			name: 'Extended Warranty',
			description: '2-year protection plan',
			price: 29.99,
			enabled: true,
		},
		{
			id: 'eco',
			icon: Leaf,
			name: 'Carbon Neutral Shipping',
			description: 'Offset your delivery footprint',
			price: 0,
			enabled: true,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const addonsTotal = addons.filter((a) => a.enabled).reduce((sum, a) => sum + a.price, 0);

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Extended Warranty', value: '+$29.99', addon: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${((subtotal + addonsTotal) * 0.08).toFixed(2)}` },
		{ label: 'Order Total', value: `$${((subtotal + addonsTotal) * 1.08).toFixed(2)}`, highlight: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-6 @xl:col-span-3">
						<Card>
							<CardContent className="divide-y p-4 @sm:p-6">
								{items.map((item) => (
									<CartRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						<AddOnsCard title="Extras & Add-ons" addons={addons} />
					</div>

					<div className="@xl:col-span-2">
						<SummaryCard
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout Now"
							checkoutHref="/checkout"
							secureNote="Secure 256-bit SSL encryption"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
