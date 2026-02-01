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
import { Progress } from '@/components/ui/progress';
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	ShoppingCart,
	Package,
	Truck,
	CreditCard,
	TrendingUp,
	DollarSign,
	BarChart3,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface StatCard {
	label: string;
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	trend?: string;
	trendUp?: boolean;
}

const PageHeader = ({ title }: { title: string }) => (
	<div className="flex items-center gap-3">
		<BarChart3 className="size-7 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
	</div>
);

const StatCardComponent = ({ stat }: { stat: StatCard }) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{stat.label}</p>
					<p className="text-2xl font-bold mt-1">{stat.value}</p>
					{stat.trend && (
						<p
							className={`text-xs mt-1 ${
								stat.trendUp ? 'text-green-500' : 'text-red-500'
							}`}
						>
							{stat.trend}
						</p>
					)}
				</div>
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<stat.icon className="size-5 text-primary" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const ShippingProgress = ({
	current,
	goal,
	label,
}: {
	current: number;
	goal: number;
	label: string;
}) => {
	const remaining = goal - current;
	const percentage = Math.min((current / goal) * 100, 100);

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-3 mb-3">
					<Truck className="size-5 text-primary" />
					<span className="font-medium">{label}</span>
				</div>
				<Progress value={percentage} className="h-2" />
				<p className="text-sm text-muted-foreground mt-2">
					{remaining > 0
						? `$${remaining.toFixed(2)} away from free shipping`
						: 'You qualify for free shipping!'}
				</p>
			</CardContent>
		</Card>
	);
};

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<ItemThumb src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm line-clamp-1">{item.name}</p>
			<p className="text-xs text-muted-foreground">
				${item.price.toFixed(2)} × {item.quantity}
			</p>
		</div>
		<div className="flex items-center gap-2">
			<div className="flex items-center rounded border">
				<Button size="icon-sm" variant="ghost" className="size-6">
					<Minus className="size-3" />
				</Button>
				<span className="w-5 text-center text-xs">{item.quantity}</span>
				<Button size="icon-sm" variant="ghost" className="size-6">
					<Plus className="size-3" />
				</Button>
			</div>
			<p className="font-semibold text-sm w-16 text-right">
				${(item.price * item.quantity).toFixed(2)}
			</p>
			<Button
				size="icon-sm"
				variant="ghost"
				className="size-6 text-muted-foreground hover:text-destructive"
			>
				<X className="size-3" />
			</Button>
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
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const QuickStats = ({
	stats,
}: {
	stats: { label: string; value: string }[];
}) => (
	<div className="grid grid-cols-2 gap-3">
		{stats.map((stat, i) => (
			<div key={i} className="text-center p-3 rounded-lg bg-muted/50">
				<p className="text-2xl font-bold">{stat.value}</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Running Shoes Pro',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			name: 'Studio Headphones',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Watch',
			price: 249.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;
	const freeShippingGoal = 100;

	const stats: StatCard[] = [
		{ label: 'Cart Total', value: `$${subtotal.toFixed(2)}`, icon: DollarSign },
		{ label: 'Items', value: String(items.length), icon: ShoppingCart },
		{
			label: 'Savings',
			value: '$45.00',
			icon: TrendingUp,
			trend: '+15%',
			trendUp: true,
		},
		{ label: 'Est. Delivery', value: '3-5 days', icon: Package },
	];

	const quickStats = [
		{
			label: 'Items',
			value: String(items.reduce((sum, i) => sum + i.quantity, 0)),
		},
		{ label: 'Savings', value: '15%' },
		{ label: 'Points', value: '+350' },
		{ label: 'Shipping', value: 'Free' },
	];

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12">
				<PageHeader title="Cart Dashboard" />

				{/* Stats Row */}
				<div className="mt-8 grid grid-cols-2 @md:grid-cols-4 gap-4">
					{stats.map((stat, i) => (
						<StatCardComponent key={i} stat={stat} />
					))}
				</div>

				<div className="mt-8 grid gap-6 @lg:grid-cols-3">
					{/* Main Cart */}
					<div className="@lg:col-span-2 space-y-6">
						<ShippingProgress
							current={subtotal}
							goal={freeShippingGoal}
							label="Free Shipping Progress"
						/>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<ShoppingCart className="size-5" />
									Cart Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Quick Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<QuickStats stats={quickStats} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3" />}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter>
								<Button className="w-full gap-2" size="lg" asChild>
									<Link href="/checkout">
										<CreditCard className="size-4" />
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
