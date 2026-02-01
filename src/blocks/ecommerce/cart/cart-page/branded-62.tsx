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
import { Minus, Plus, X, ArrowRight, Crown, Shield, Award } from 'lucide-react';
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

const BrandLogo = () => (
	<div className="flex items-center gap-3">
		<div className="size-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
			<Crown className="size-6 text-white" />
		</div>
		<div>
			<h2 className="font-bold text-lg tracking-tight">LUXE STORE</h2>
			<p className="text-xs text-muted-foreground uppercase tracking-widest">
				Premium Shopping
			</p>
		</div>
	</div>
);

const PageHeader = ({ count }: { count: number }) => (
	<div className="flex items-center justify-between">
		<BrandLogo />
		<Badge className="bg-amber-500 text-white hover:bg-amber-600 px-3 py-1 gap-1">
			<Shield className="size-3" />
			{count} items secured
		</Badge>
	</div>
);

const BrandBanner = () => (
	<div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-xl p-6 border border-amber-500/20">
		<div className="flex items-center gap-3">
			<Award className="size-8 text-amber-500" />
			<div>
				<h3 className="font-semibold">Gold Member Benefits Applied</h3>
				<p className="text-sm text-muted-foreground">
					Free priority shipping + 10% off your order
				</p>
			</div>
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted border-2 border-amber-500/20">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute top-1 right-1">
			<Badge className="bg-amber-500 text-white text-[10px] px-1.5 py-0">
				Premium
			</Badge>
		</div>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border-2 border-amber-500/30">
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 text-amber-600 hover:bg-amber-500/10"
		>
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-semibold">{quantity}</span>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 text-amber-600 hover:bg-amber-500/10"
		>
			<Plus className="size-3" />
		</Button>
	</div>
);

const BrandedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-5 py-5 group">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					<div className="flex items-center gap-1 mt-2">
						<Shield className="size-3 text-green-500" />
						<span className="text-xs text-green-600">
							Authenticity Guaranteed
						</span>
					</div>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0 transition-opacity"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-4">
				<QuantityControl quantity={item.quantity} />
				<div className="text-right">
					<p className="font-bold text-xl text-amber-600">
						${(item.price * item.quantity).toFixed(2)}
					</p>
					<p className="text-xs text-muted-foreground line-through">
						${(item.price * item.quantity * 1.1).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
	highlight,
}: {
	label: string;
	value: string;
	bold?: boolean;
	highlight?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : ''} ${highlight ? 'text-amber-600' : 'text-muted-foreground'}`}
	>
		<span className={bold ? 'text-foreground' : ''}>{label}</span>
		<span className={bold ? 'text-amber-600' : ''}>{value}</span>
	</div>
);

const TrustBadges = () => (
	<div className="flex justify-center gap-6 py-4 border-t border-amber-500/20">
		<div className="flex items-center gap-1 text-xs text-muted-foreground">
			<Shield className="size-4 text-green-500" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1 text-xs text-muted-foreground">
			<Award className="size-4 text-amber-500" />
			<span>Authentic</span>
		</div>
		<div className="flex items-center gap-1 text-xs text-muted-foreground">
			<Crown className="size-4 text-amber-500" />
			<span>Premium</span>
		</div>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Obsidian Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Sterling Silver • Leather Band',
			price: 449.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			name: 'Italian Leather Bag',
			variant: 'Cognac Brown • Hand-stitched',
			price: 529.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const memberDiscount = subtotal * 0.1;
	const tax = (subtotal - memberDiscount) * 0.08;
	const total = subtotal - memberDiscount + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{
			label: 'Gold Member (-10%)',
			value: `-$${memberDiscount.toFixed(2)}`,
			highlight: true,
		},
		{ label: 'Priority Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader count={items.length} />

				<div className="mt-6">
					<BrandBanner />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card className="border-amber-500/20 overflow-hidden">
							<CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-amber-500/20">
								<CardTitle className="flex items-center gap-2">
									<Crown className="size-5 text-amber-500" />
									Your Premium Selection
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y divide-amber-500/10 pt-2">
								{items.map((item) => (
									<BrandedItem key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4 border-amber-500/20 overflow-hidden">
							<CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-amber-500/20">
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && (
											<Separator className="my-3 bg-amber-500/20" />
										)}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button
									className="w-full gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
									size="lg"
									asChild
								>
									<Link href="/checkout">
										<Crown className="size-4" />
										Premium Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
								<TrustBadges />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
