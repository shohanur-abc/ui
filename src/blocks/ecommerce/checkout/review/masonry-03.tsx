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
	Package,
	Shield,
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
	span?: 'tall' | 'wide' | 'normal';
}

const MasonryItem = ({ product }: { product: Product }) => {
	const getSpanClass = () => {
		switch (product.span) {
			case 'tall':
				return 'row-span-2';
			case 'wide':
				return 'col-span-2';
			default:
				return '';
		}
	};

	return (
		<div className={`group overflow-hidden rounded-xl border bg-card ${getSpanClass()}`}>
			<div className={`relative overflow-hidden ${product.span === 'tall' ? 'aspect-[2/3]' : 'aspect-square'}`}>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover transition-transform group-hover:scale-105"
				/>
				<Badge className="absolute left-2 top-2 bg-background/80 backdrop-blur-sm">
					×{product.qty}
				</Badge>
			</div>
			<div className="p-3">
				<p className="font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.variant}</p>
				<p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
			</div>
		</div>
	);
};

const InfoBlock = ({
	icon: Icon,
	title,
	value,
	subValue,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
}) => (
	<div className="flex items-start gap-3 rounded-xl border bg-card p-4">
		<Icon className="size-5 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
		</div>
		<Check className="ml-auto size-4 text-green-500" />
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
			name: 'Sculpture',
			variant: 'Abstract / Bronze',
			price: 1299.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1582561833400-4b7e7b9ae9d3?w=400&h=600&fit=crop',
			span: 'tall',
		},
		{
			id: '2',
			name: 'Canvas Print',
			variant: 'Large / Framed',
			price: 249.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Art Book',
			variant: 'Collector Edition',
			price: 89.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
		},
		{
			id: '4',
			name: 'Ceramic Vase',
			variant: 'Handmade / Blue',
			price: 179.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Art Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Curated gallery pieces
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-3 @md:grid-cols-3">
							{products.map((product) => (
								<MasonryItem key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2">
							<InfoBlock
								icon={MapPin}
								title="Shipping"
								value="Isabella M., New York, NY"
							/>
							<InfoBlock
								icon={MapPin}
								title="Billing"
								value="Isabella M., New York, NY"
							/>
							<InfoBlock
								icon={Truck}
								title="Delivery"
								value="Art Courier"
								subValue="Dec 28-30, 2025"
							/>
							<InfoBlock
								icon={CreditCard}
								title="Payment"
								value="Mastercard •••• 3333"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (5 items)" value="$1,999.95" />
							<SummaryLine label="Shipping" value="$49.99" />
							<SummaryLine label="Tax" value="$170.00" />
							<SummaryLine label="Collector Discount" value="-$200.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$2,019.94" bold />
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
