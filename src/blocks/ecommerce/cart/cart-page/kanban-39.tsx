import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Clock, CheckCircle2, Package, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	status: 'pending' | 'processing' | 'ready' | 'issue';
}

interface Column {
	id: string;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	items: CartItem[];
}

const PageHeader = ({ title }: { title: string }) => (
	<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
);

const ColumnHeader = ({
	title,
	icon: Icon,
	count,
	colorClass,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	count: number;
	colorClass: string;
}) => (
	<div className={`flex items-center gap-2 p-3 rounded-t-xl ${colorClass}`}>
		<Icon className="size-5" />
		<span className="font-semibold">{title}</span>
		<Badge variant="secondary" className="ml-auto">{count}</Badge>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h4 className="font-medium text-sm line-clamp-1">{name}</h4>
		<p className="text-xs text-muted-foreground">{variant}</p>
	</div>
);

const QuantityBadge = ({ quantity }: { quantity: number }) => (
	<Badge variant="outline" className="text-xs">×{quantity}</Badge>
);

const ItemPrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="font-semibold text-sm">${(price * quantity).toFixed(2)}</p>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="size-6 text-muted-foreground hover:text-destructive">
		<X className="size-3" />
	</Button>
);

const KanbanCard = ({ item }: { item: CartItem }) => (
	<Card className="shadow-sm hover:shadow-md transition-shadow cursor-grab">
		<CardContent className="p-3">
			<div className="flex items-start gap-3">
				<ItemThumb src={item.image} alt={item.name} />
				<div className="flex-1 min-w-0 space-y-2">
					<div className="flex items-start justify-between gap-1">
						<ItemInfo name={item.name} variant={item.variant} />
						<RemoveItem />
					</div>
					<div className="flex items-center justify-between">
						<QuantityBadge quantity={item.quantity} />
						<ItemPrice price={item.price} quantity={item.quantity} />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const KanbanColumn = ({ column }: { column: Column }) => (
	<div className="flex flex-col min-w-[280px] @lg:min-w-0 @lg:flex-1">
		<ColumnHeader
			title={column.title}
			icon={column.icon}
			count={column.items.length}
			colorClass={column.color}
		/>
		<div className="flex-1 space-y-3 p-3 bg-muted/30 rounded-b-xl min-h-[200px]">
			{column.items.map((item) => (
				<KanbanCard key={item.id} item={item} />
			))}
			{column.items.length === 0 && (
				<div className="flex items-center justify-center h-full text-muted-foreground text-sm">
					No items
				</div>
			)}
		</div>
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card>
		<CardContent className="pt-6 space-y-3">
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

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			status: 'ready',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			name: 'Headphones',
			variant: 'Black',
			price: 299.99,
			quantity: 1,
			status: 'processing',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
			status: 'pending',
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 179.99,
			quantity: 2,
			status: 'issue',
		},
		{
			id: '5',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy',
			price: 89.99,
			quantity: 1,
			status: 'ready',
		},
	];

	const columns: Column[] = [
		{
			id: 'pending',
			title: 'Pending',
			icon: Clock,
			color: 'bg-yellow-500/10 text-yellow-600',
			items: items.filter((i) => i.status === 'pending'),
		},
		{
			id: 'processing',
			title: 'Processing',
			icon: Package,
			color: 'bg-blue-500/10 text-blue-600',
			items: items.filter((i) => i.status === 'processing'),
		},
		{
			id: 'ready',
			title: 'Ready',
			icon: CheckCircle2,
			color: 'bg-green-500/10 text-green-600',
			items: items.filter((i) => i.status === 'ready'),
		},
		{
			id: 'issue',
			title: 'Needs Attention',
			icon: AlertCircle,
			color: 'bg-red-500/10 text-red-600',
			items: items.filter((i) => i.status === 'issue'),
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
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12">
				<PageHeader title="Cart Status Board" />

				<div className="mt-8 flex gap-4 overflow-x-auto pb-4 @lg:grid @lg:grid-cols-4 @lg:overflow-visible">
					{columns.map((column) => (
						<KanbanColumn key={column.id} column={column} />
					))}
				</div>

				<div className="mt-8 max-w-md mx-auto">
					<OrderSummary
						lines={summaryLines}
						checkoutLabel="Checkout"
						checkoutHref="/checkout"
					/>
				</div>
			</div>
		</section>
	);
}
