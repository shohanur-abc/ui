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
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	ShoppingCart,
	Package,
	Clock,
	CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	addedAt: string;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div>
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<p className="mt-1 text-muted-foreground">{subtitle}</p>
	</div>
);

const TimelineConnector = ({ isLast }: { isLast: boolean }) =>
	!isLast ? (
		<div className="absolute left-5 top-14 bottom-0 w-0.5 bg-border" />
	) : null;

const TimelineIcon = ({
	icon: Icon,
}: {
	icon: React.ComponentType<{ className?: string }>;
}) => (
	<div className="relative z-10 size-10 rounded-full bg-primary/10 flex items-center justify-center">
		<Icon className="size-5 text-primary" />
	</div>
);

const TimelineTime = ({ time }: { time: string }) => (
	<div className="flex items-center gap-1 text-xs text-muted-foreground">
		<Clock className="size-3" />
		{time}
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h4 className="font-medium line-clamp-1">{name}</h4>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
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
		<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && (
			<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
		)}
	</div>
);

const RemoveItem = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
	</Button>
);

const TimelineItem = ({
	item,
	isLast,
}: {
	item: CartItem;
	isLast: boolean;
}) => (
	<div className="relative flex gap-4 pb-8">
		<TimelineConnector isLast={isLast} />
		<TimelineIcon icon={ShoppingCart} />
		<Card className="flex-1">
			<CardHeader className="p-4 pb-2">
				<div className="flex items-center justify-between">
					<Badge variant="secondary">Added to cart</Badge>
					<TimelineTime time={item.addedAt} />
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-2">
				<div className="flex items-center gap-4">
					<ItemThumb src={item.image} alt={item.name} />
					<ItemInfo name={item.name} variant={item.variant} />
					<QuantityControl quantity={item.quantity} />
					<ItemPrice price={item.price} quantity={item.quantity} />
					<RemoveItem />
				</div>
			</CardContent>
		</Card>
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
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; bold?: boolean }[];
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
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
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

const CheckoutPrompt = ({
	text,
	icon: Icon,
}: {
	text: string;
	icon: React.ComponentType<{ className?: string }>;
}) => (
	<div className="relative flex gap-4">
		<TimelineIcon icon={Icon} />
		<Card className="flex-1 border-dashed border-primary/30 bg-primary/5">
			<CardContent className="flex items-center justify-center p-6 text-center">
				<p className="text-muted-foreground">{text}</p>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Premium Running Shoes',
			variant: 'Red/Black • US 10',
			price: 179.99,
			quantity: 1,
			addedAt: '2 minutes ago',
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 149.99,
			quantity: 2,
			addedAt: '15 minutes ago',
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 299.99,
			quantity: 1,
			addedAt: '1 hour ago',
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
				<PageHeader
					title="Your Cart"
					subtitle="Items added recently appear first"
				/>

				<div className="mt-8 grid gap-8 @lg:grid-cols-5">
					<div className="@lg:col-span-3">
						{items.map((item, i) => (
							<TimelineItem
								key={item.id}
								item={item}
								isLast={i === items.length - 1}
							/>
						))}
						<CheckoutPrompt
							text="Ready to complete your order?"
							icon={CheckCircle}
						/>
					</div>

					<div className="@lg:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
