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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Minus,
	Plus,
	Trash2,
	Star,
	Package,
	Shield,
	RotateCcw,
	ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	seller: { name: string; avatar: string; rating: number };
	price: number;
	quantity: number;
	inStock: boolean;
}

interface Guarantee {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const Heading = ({ text, badge }: { text: string; badge?: string }) => (
	<div className="flex items-center gap-3">
		<h1 className="text-2xl font-bold @md:text-3xl">{text}</h1>
		{badge && (
			<Badge className="bg-gradient-to-r from-primary to-primary/80">
				{badge}
			</Badge>
		)}
	</div>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-xl bg-muted shadow-sm @sm:w-32">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const SellerInfo = ({
	name,
	avatar,
	rating,
}: {
	name: string;
	avatar: string;
	rating: number;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Avatar className="size-5">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback className="text-[10px]">{name.charAt(0)}</AvatarFallback>
		</Avatar>
		<span className="text-muted-foreground">{name}</span>
		<div className="flex items-center gap-1 text-amber-500">
			<Star className="size-3 fill-current" />
			<span className="text-xs">{rating}</span>
		</div>
	</div>
);

const ProductDetails = ({
	name,
	seller,
	inStock,
}: {
	name: string;
	seller: CartItem['seller'];
	inStock: boolean;
}) => (
	<div className="min-w-0 flex-1 space-y-2">
		<h3 className="font-semibold leading-tight line-clamp-2">{name}</h3>
		<SellerInfo
			name={seller.name}
			avatar={seller.avatar}
			rating={seller.rating}
		/>
		<Badge variant={inStock ? 'outline' : 'destructive'} className="text-xs">
			{inStock ? 'In Stock' : 'Low Stock'}
		</Badge>
	</div>
);

const QuantityPicker = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2 rounded-full border bg-muted/50 p-1">
		<Button size="icon-sm" variant="ghost" className="size-7 rounded-full">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7 rounded-full">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-xl font-bold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && (
			<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
		)}
	</div>
);

const DeleteAction = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<Trash2 className="size-4" />
	</Button>
);

const CartItemCard = ({ item }: { item: CartItem }) => (
	<Card className="transition-all hover:shadow-md hover:border-primary/20">
		<CardContent className="flex gap-4 p-4">
			<ProductImage src={item.image} alt={item.name} />
			<div className="flex min-w-0 flex-1 flex-col gap-4">
				<div className="flex items-start justify-between gap-2">
					<ProductDetails
						name={item.name}
						seller={item.seller}
						inStock={item.inStock}
					/>
					<DeleteAction />
				</div>
				<div className="flex items-center justify-between mt-auto">
					<QuantityPicker quantity={item.quantity} />
					<ItemPrice price={item.price} quantity={item.quantity} />
				</div>
			</div>
		</CardContent>
	</Card>
);

const GuaranteeItem = ({ guarantee }: { guarantee: Guarantee }) => {
	const Icon = guarantee.icon;
	return (
		<div className="flex items-start gap-3">
			<div className="rounded-lg bg-primary/10 p-2 shrink-0">
				<Icon className="size-4 text-primary" />
			</div>
			<div>
				<p className="text-sm font-medium">{guarantee.title}</p>
				<p className="text-xs text-muted-foreground">{guarantee.description}</p>
			</div>
		</div>
	);
};

const GuaranteesSection = ({
	title,
	items,
}: {
	title: string;
	items: Guarantee[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<GuaranteeItem key={i} guarantee={item} />
			))}
		</CardContent>
	</Card>
);

const PriceLine = ({
	label,
	value,
	isBold,
	isSuccess,
}: {
	label: string;
	value: string;
	isBold?: boolean;
	isSuccess?: boolean;
}) => (
	<div className={`flex justify-between ${isBold ? 'text-lg font-bold' : ''}`}>
		<span className={isBold ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={isBold ? 'text-primary' : isSuccess ? 'text-green-500' : ''}
		>
			{value}
		</span>
	</div>
);

const SummarySection = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: {
		label: string;
		value: string;
		isBold?: boolean;
		isSuccess?: boolean;
	}[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.isBold && <Separator className="my-3" />}
					<PriceLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Professional Studio Headphones with Active Noise Cancellation',
			seller: { name: 'AudioPro', avatar: '/avatars/seller1.jpg', rating: 4.9 },
			price: 349.99,
			quantity: 1,
			inStock: true,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=300&h=300&fit=crop',
			name: 'Mechanical Gaming Keyboard RGB Backlit',
			seller: { name: 'TechGear', avatar: '/avatars/seller2.jpg', rating: 4.7 },
			price: 159.99,
			quantity: 1,
			inStock: true,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
			name: 'Ergonomic Wireless Mouse Premium Edition',
			seller: {
				name: 'ComfortTech',
				avatar: '/avatars/seller3.jpg',
				rating: 4.8,
			},
			price: 89.99,
			quantity: 2,
			inStock: false,
		},
	];

	const guarantees: Guarantee[] = [
		{
			icon: Package,
			title: 'Free Shipping',
			description: 'On orders over $100',
		},
		{
			icon: Shield,
			title: 'Buyer Protection',
			description: 'Full refund if item not received',
		},
		{
			icon: RotateCcw,
			title: 'Easy Returns',
			description: '30-day hassle-free returns',
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free', isSuccess: true },
		{ label: 'Tax', value: `$${(subtotal * 0.08).toFixed(2)}` },
		{ label: 'Total', value: `$${(subtotal * 1.08).toFixed(2)}`, isBold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<Heading text="Shopping Cart" badge={`${items.length} items`} />

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartItemCard key={item.id} item={item} />
						))}
					</div>

					<div className="space-y-4 @xl:col-span-2">
						<SummarySection
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
						<GuaranteesSection title="Our Guarantees" items={guarantees} />
					</div>
				</div>
			</div>
		</section>
	);
}
