import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Clock,
	CreditCard,
	Edit3,
	MapPin,
	Package,
	Percent,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	image: string;
	inStock: boolean;
}

interface ReviewCardProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	status: 'complete' | 'warning' | 'pending';
	children: React.ReactNode;
	onEdit?: () => void;
}

const StatusIcon = ({
	status,
}: {
	status: 'complete' | 'warning' | 'pending';
}) => {
	if (status === 'complete')
		return <CheckCircle2 className="size-4 text-green-500" />;
	if (status === 'warning')
		return <AlertCircle className="size-4 text-amber-500" />;
	return <Clock className="size-4 text-muted-foreground" />;
};

const ReviewCard = ({
	icon: Icon,
	title,
	status,
	children,
	onEdit,
}: ReviewCardProps) => (
	<Card className="group transition-all hover:shadow-md hover:shadow-primary/5">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-5 text-primary" />
					</div>
					<div>
						<CardTitle className="text-base">{title}</CardTitle>
						<div className="mt-0.5 flex items-center gap-1.5 text-xs">
							<StatusIcon status={status} />
							<span className="text-muted-foreground capitalize">{status}</span>
						</div>
					</div>
				</div>
				{onEdit && (
					<Button
						variant="ghost"
						size="sm"
						className="opacity-0 transition-opacity group-hover:opacity-100"
						onClick={onEdit}
					>
						<Edit3 className="size-3.5" />
					</Button>
				)}
			</div>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const ProductItem = ({ product }: { product: Product }) => (
	<div className="flex gap-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
			{!product.inStock && (
				<div className="absolute inset-0 flex items-center justify-center bg-background/80">
					<span className="text-xs font-medium text-destructive">
						Out of Stock
					</span>
				</div>
			)}
		</div>
		<div className="flex flex-1 flex-col">
			<p className="font-medium leading-tight">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.description}</p>
			<div className="mt-auto flex items-center justify-between">
				<span className="text-sm text-muted-foreground">
					Qty: {product.quantity}
				</span>
				<div className="flex items-center gap-2">
					{product.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${product.originalPrice.toFixed(2)}
						</span>
					)}
					<span className="font-semibold">${product.price.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
);

const SummaryRow = ({
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
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const ProgressIndicator = ({
	value,
	label,
}: {
	value: number;
	label: string;
}) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}%</span>
		</div>
		<Progress value={value} className="h-2" />
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Ergonomic Office Chair',
			description: 'Mesh Back / Black',
			price: 449.0,
			originalPrice: 549.0,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop',
			inStock: true,
		},
		{
			id: '2',
			name: 'Standing Desk',
			description: 'Electric / Walnut Top',
			price: 699.0,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop',
			inStock: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Step
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Review Your Order
					</h1>
					<p className="mx-auto mt-2 max-w-md text-muted-foreground">
						Verify all details are correct before completing your purchase
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-2 @xl:grid-cols-3">
					<ReviewCard
						icon={Package}
						title="Order Items"
						status="complete"
						onEdit={() => {}}
					>
						<div className="space-y-4">
							{products.map((product) => (
								<ProductItem key={product.id} product={product} />
							))}
						</div>
					</ReviewCard>

					<ReviewCard
						icon={MapPin}
						title="Shipping Address"
						status="complete"
						onEdit={() => {}}
					>
						<div className="space-y-1">
							<p className="font-medium">Michael Chen</p>
							<p className="text-sm text-muted-foreground">789 Pine Street</p>
							<p className="text-sm text-muted-foreground">Austin, TX 78701</p>
							<p className="text-sm text-muted-foreground">United States</p>
							<p className="mt-2 text-sm text-muted-foreground">
								+1 (512) 555-0123
							</p>
						</div>
					</ReviewCard>

					<ReviewCard
						icon={Truck}
						title="Delivery Method"
						status="complete"
						onEdit={() => {}}
					>
						<div className="rounded-lg bg-muted/50 p-3">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Standard Shipping</p>
									<p className="text-sm text-muted-foreground">
										5-7 business days
									</p>
								</div>
								<span className="font-medium">Free</span>
							</div>
						</div>
						<div className="mt-3 flex items-center gap-2 text-sm text-primary">
							<Clock className="size-4" />
							<span>Arrives by Dec 28-30</span>
						</div>
					</ReviewCard>

					<ReviewCard
						icon={CreditCard}
						title="Payment Method"
						status="complete"
						onEdit={() => {}}
					>
						<div className="flex items-center gap-3">
							<div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
								<CreditCard className="size-6 text-white" />
							</div>
							<div>
								<p className="font-medium">Visa •••• 1234</p>
								<p className="text-sm text-muted-foreground">Expires 08/26</p>
							</div>
						</div>
					</ReviewCard>

					<ReviewCard
						icon={Percent}
						title="Applied Discounts"
						status="complete"
					>
						<div className="space-y-2">
							<div className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2">
								<span className="text-sm font-medium text-green-600 dark:text-green-400">
									SAVE100
								</span>
								<span className="text-sm font-medium text-green-600 dark:text-green-400">
									-$100.00
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2">
								<span className="text-sm font-medium text-green-600 dark:text-green-400">
									Free Shipping
								</span>
								<span className="text-sm font-medium text-green-600 dark:text-green-400">
									-$29.99
								</span>
							</div>
						</div>
					</ReviewCard>

					<ReviewCard icon={Shield} title="Order Protection" status="complete">
						<div className="space-y-3">
							<ProgressIndicator value={100} label="Buyer Protection" />
							<div className="flex items-start gap-2 text-sm text-muted-foreground">
								<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
								<span>
									Full refund if item not received or not as described
								</span>
							</div>
						</div>
					</ReviewCard>
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
						<CardDescription>2 items in your order</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<SummaryRow label="Subtotal" value="$1,148.00" />
						<SummaryRow label="Shipping" value="$0.00" />
						<SummaryRow label="Tax" value="$94.19" />
						<SummaryRow label="Discounts" value="-$129.99" green />
						<Separator className="my-4" />
						<SummaryRow label="Total" value="$1,112.20" bold />
					</CardContent>
					<CardFooter className="flex-col gap-4 @md:flex-row">
						<Button variant="outline" className="w-full @md:w-auto">
							Continue Shopping
						</Button>
						<Button size="lg" className="w-full gap-2 @md:flex-1">
							Complete Order
							<ArrowRight className="size-4" />
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
