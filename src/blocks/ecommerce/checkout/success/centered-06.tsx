import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Sparkles,
	ShoppingBag,
	Truck,
	Clock,
	ArrowRight,
	Heart,
	Share,
} from 'lucide-react';
import Link from 'next/link';

interface ProductThumbProps {
	name: string;
	image?: string;
}

interface SummaryRowProps {
	label: string;
	value: string;
	highlight?: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessHeader = () => (
	<div className="relative">
		<div className="size-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
			<Sparkles className="size-10 text-white" />
		</div>
		<Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background border shadow-sm">
			Success
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center text-sm max-w-xs">
		{text}
	</p>
);

const ProductThumbnails = ({ products }: { products: ProductThumbProps[] }) => (
	<div className="flex items-center justify-center">
		<div className="flex -space-x-3">
			{products.map((product, i) => (
				<div
					key={i}
					className="size-14 rounded-xl bg-muted border-2 border-background flex items-center justify-center shadow-sm"
					title={product.name}
				>
					<ShoppingBag className="size-6 text-muted-foreground" />
				</div>
			))}
			{products.length > 3 && (
				<div className="size-14 rounded-xl bg-primary border-2 border-background flex items-center justify-center shadow-sm">
					<span className="text-sm font-semibold text-primary-foreground">
						+{products.length - 3}
					</span>
				</div>
			)}
		</div>
	</div>
);

const OrderCard = ({
	orderNumber,
	date,
}: {
	orderNumber: string;
	date: string;
}) => (
	<Card className="w-full max-w-sm">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between text-sm">
				<div>
					<p className="text-muted-foreground">Order Number</p>
					<p className="font-mono font-semibold">{orderNumber}</p>
				</div>
				<Separator orientation="vertical" className="h-10" />
				<div className="text-right">
					<p className="text-muted-foreground">Order Date</p>
					<p className="font-medium">{date}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div className="flex items-center justify-between">
		<span className={highlight ? 'font-semibold' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={highlight ? 'font-bold text-lg' : 'font-medium'}>
			{value}
		</span>
	</div>
);

const OrderSummaryCard = ({
	items,
}: {
	items: SummaryRowProps[];
}) => (
	<Card className="w-full max-w-sm">
		<CardContent className="pt-6 space-y-3">
			{items.map((item, i) => (
				<div key={i}>
					<SummaryRow {...item} />
					{i < items.length - 1 && !items[i + 1]?.highlight && (
						<Separator className="mt-3" />
					)}
					{items[i + 1]?.highlight && <Separator className="mt-3" />}
				</div>
			))}
		</CardContent>
	</Card>
);

const DeliveryInfo = ({
	method,
	estimate,
}: {
	method: string;
	estimate: string;
}) => (
	<div className="w-full max-w-sm flex items-center gap-4 p-4 rounded-xl bg-muted/50 border">
		<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
			<Truck className="size-6 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Clock className="size-3" />
				<span>{estimate}</span>
			</div>
		</div>
	</div>
);

const QuickActions = () => (
	<div className="flex items-center gap-2">
		<Button variant="ghost" size="icon" className="rounded-full">
			<Heart className="size-4" />
		</Button>
		<Button variant="ghost" size="icon" className="rounded-full">
			<Share className="size-4" />
		</Button>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-sm">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const products: ProductThumbProps[] = [
		{ name: 'Product 1' },
		{ name: 'Product 2' },
		{ name: 'Product 3' },
		{ name: 'Product 4' },
		{ name: 'Product 5' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$324.97' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$26.00' },
		{ label: 'Total', value: '$350.97', highlight: true },
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-6">
					<SuccessHeader />

					<div className="space-y-2">
						<Title text="Your order is on its way!" />
						<Description text="We've received your order and are preparing it for shipment. You'll receive tracking info soon." />
					</div>

					<ProductThumbnails products={products} />

					<OrderCard orderNumber="ORD-2024-78432" date="Jan 15, 2024" />

					<OrderSummaryCard items={summaryItems} />

					<DeliveryInfo
						method="Express Shipping"
						estimate="Arrives Jan 18-20, 2024"
					/>

					<QuickActions />

					<CTA
						items={[
							{
								label: 'Track Package',
								href: '/track',
								icon: ArrowRight,
							},
							{
								label: 'View Order',
								href: '/orders',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
