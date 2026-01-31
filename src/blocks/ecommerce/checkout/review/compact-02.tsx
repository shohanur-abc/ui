import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

interface CartProduct {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CompactItem = ({ product }: { product: CartProduct }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{product.name}</p>
			<p className="truncate text-xs text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
			<p className="text-xs text-muted-foreground">×{product.qty}</p>
		</div>
	</div>
);

const InfoChip = ({
	icon: Icon,
	label,
	value,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	verified?: boolean;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
		<Icon className="size-4 text-primary" />
		<div className="flex-1 min-w-0">
			<p className="truncate text-xs text-muted-foreground">{label}</p>
			<p className="truncate text-sm font-medium">{value}</p>
		</div>
		{verified && <CheckCircle2 className="size-4 text-green-500" />}
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: CartProduct[] = [
		{
			id: '1',
			name: 'Smartwatch',
			variant: 'Series 8 / Black',
			price: 399.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Watch Band',
			variant: 'Sport / Navy',
			price: 49.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Charging Dock',
			variant: 'USB-C / White',
			price: 39.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-lg px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<Card className="bg-gradient-to-br from-card to-muted/30">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2">
								<Zap className="size-5 text-primary" />
								Quick Review
							</CardTitle>
							<Badge variant="secondary">4 items</Badge>
						</div>
					</CardHeader>

					<CardContent className="space-y-5">
						<div className="divide-y">
							{products.map((product) => (
								<CompactItem key={product.id} product={product} />
							))}
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-2">
							<InfoChip
								icon={MapPin}
								label="Ship to"
								value="Austin, TX"
								verified
							/>
							<InfoChip
								icon={Truck}
								label="Delivery"
								value="Express · Dec 19"
								verified
							/>
							<InfoChip
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 1234"
								verified
							/>
							<InfoChip
								icon={Package}
								label="Status"
								value="Ready"
								verified
							/>
						</div>

						<Separator />

						<div className="space-y-2">
							<SummaryLine label="Subtotal" value="$539.96" />
							<SummaryLine label="Shipping" value="$9.99" />
							<SummaryLine label="Tax" value="$45.90" />
							<SummaryLine label="Discount" value="-$54.00" green />
							<Separator className="my-3" />
							<SummaryLine label="Total" value="$541.85" bold />
						</div>
					</CardContent>

					<CardFooter className="flex-col gap-3">
						<Button size="lg" className="w-full gap-2">
							<Lock className="size-4" />
							Complete Purchase
							<ArrowRight className="size-4" />
						</Button>
						<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
