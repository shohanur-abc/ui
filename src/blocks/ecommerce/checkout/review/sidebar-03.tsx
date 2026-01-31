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

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const ProductCard = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card p-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-md">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">×{item.qty}</Badge>
		</div>
	</div>
);

const SidebarItem = ({
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
	<div className="flex items-start gap-3 py-3">
		<Icon className="size-4 mt-0.5 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-sm font-medium">{value}</p>
			{subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Standing Desk',
			variant: 'Electric / White Oak',
			price: 699.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Ergonomic Chair',
			variant: 'Mesh / Black',
			price: 499.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Monitor Arm',
			variant: 'Dual / Adjustable',
			price: 149.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
		},
		{
			id: '4',
			name: 'Desk Mat',
			variant: 'Leather / Large',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Home Office
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Checkout Review
					</h1>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[280px_1fr_340px]">
					<Card className="@lg:sticky @lg:top-8 @lg:self-start">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Order Info</CardTitle>
						</CardHeader>
						<CardContent className="divide-y">
							<SidebarItem
								icon={MapPin}
								title="Ship To"
								value="Marcus L."
								subValue="Denver, CO 80201"
							/>
							<SidebarItem
								icon={MapPin}
								title="Bill To"
								value="Marcus L."
								subValue="Denver, CO 80201"
							/>
							<SidebarItem
								icon={Truck}
								title="Delivery"
								value="White Glove"
								subValue="Dec 28-30, 2025"
							/>
							<SidebarItem
								icon={CreditCard}
								title="Payment"
								value="Visa •••• 4242"
							/>
						</CardContent>
					</Card>

					<div className="space-y-3">
						<h2 className="flex items-center gap-2 font-semibold">
							<Package className="size-4 text-primary" />
							Order Items
						</h2>
						{items.map((item) => (
							<ProductCard key={item.id} item={item} />
						))}
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<SummaryLine label="Subtotal (4 items)" value="$1,409.96" />
							<SummaryLine label="White Glove" value="$99.99" />
							<SummaryLine label="Tax" value="$119.85" />
							<SummaryLine label="Bundle Discount" value="-$140.00" green />
							<Separator className="my-3" />
							<SummaryLine label="Total" value="$1,489.80" bold />
						</CardContent>
						<CardFooter className="flex-col gap-2">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Place Order
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
