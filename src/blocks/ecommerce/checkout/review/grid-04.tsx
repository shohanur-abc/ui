import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const GridProduct = ({ product }: { product: Product }) => (
	<div className="group overflow-hidden rounded-xl border bg-card">
		<div className="relative aspect-[4/3] overflow-hidden">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<Badge className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm">
				×{product.qty}
			</Badge>
		</div>
		<div className="p-3">
			<p className="text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
			<p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
		</div>
	</div>
);

const InfoTile = ({
	icon: Icon,
	title,
	value,
	subValue,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
	verified?: boolean;
}) => (
	<div className="flex items-start gap-3 rounded-xl border bg-card p-4">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
		</div>
		{verified && <Check className="size-5 text-green-500" />}
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Coffee Table Book',
			variant: 'Architecture / Hardcover',
			price: 54.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
		},
		{
			id: '2',
			name: 'Novel Set',
			variant: 'Bestseller / 3-Pack',
			price: 44.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
		},
		{
			id: '3',
			name: 'Cookbook',
			variant: 'Italian Cuisine',
			price: 39.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop',
		},
		{
			id: '4',
			name: 'Bookmark Set',
			variant: 'Leather / 5-Pack',
			price: 14.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop',
		},
		{
			id: '5',
			name: 'Reading Light',
			variant: 'LED / Rechargeable',
			price: 24.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
		},
		{
			id: '6',
			name: 'Book Ends',
			variant: 'Marble / Pair',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Book Lover's Bundle
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Your curated reading collection
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-3 @md:grid-cols-3">
							{products.map((product) => (
								<GridProduct key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2">
							<InfoTile
								icon={MapPin}
								title="Shipping"
								value="Hannah R., Austin, TX"
								verified
							/>
							<InfoTile
								icon={MapPin}
								title="Billing"
								value="Hannah R., Austin, TX"
								verified
							/>
							<InfoTile
								icon={Truck}
								title="Delivery"
								value="Media Mail"
								subValue="Dec 24-28, 2025"
								verified
							/>
							<InfoTile
								icon={CreditCard}
								title="Payment"
								value="Visa •••• 8888"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (7 items)" value="$244.93" />
							<SummaryLine label="Shipping" value="$4.99" />
							<SummaryLine label="Tax" value="$20.82" />
							<SummaryLine label="Book Bundle" value="-$24.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$246.24" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
