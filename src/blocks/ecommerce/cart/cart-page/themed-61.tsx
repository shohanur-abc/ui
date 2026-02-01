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
	Palette,
	Sun,
	Moon,
	Monitor,
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
}

type Theme = 'light' | 'dark' | 'system';

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<Palette className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const ThemeSwitcher = ({ currentTheme }: { currentTheme: Theme }) => (
	<div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
		<span className="text-sm text-muted-foreground mr-2">Theme:</span>
		<Button
			size="sm"
			variant={currentTheme === 'light' ? 'default' : 'ghost'}
			className="gap-1"
		>
			<Sun className="size-4" />
			Light
		</Button>
		<Button
			size="sm"
			variant={currentTheme === 'dark' ? 'default' : 'ghost'}
			className="gap-1"
		>
			<Moon className="size-4" />
			Dark
		</Button>
		<Button
			size="sm"
			variant={currentTheme === 'system' ? 'default' : 'ghost'}
			className="gap-1"
		>
			<Monitor className="size-4" />
			System
		</Button>
	</div>
);

const ColorSchemePreview = () => (
	<div className="flex gap-2">
		<div className="flex gap-1">
			<div className="size-6 rounded-full bg-primary" title="Primary" />
			<div className="size-6 rounded-full bg-secondary" title="Secondary" />
			<div className="size-6 rounded-full bg-accent" title="Accent" />
			<div className="size-6 rounded-full bg-muted" title="Muted" />
			<div className="size-6 rounded-full bg-destructive" title="Destructive" />
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border border-primary/20">
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 text-primary hover:bg-primary/10"
		>
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-8 text-primary hover:bg-primary/10"
		>
			<Plus className="size-3" />
		</Button>
	</div>
);

const ThemedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4 hover:bg-accent/5 -mx-4 px-4 rounded-lg transition-colors">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1 text-foreground">
						{item.name}
					</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-bold text-primary text-lg">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const ThemeCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<Card className={`border-primary/10 shadow-lg shadow-primary/5 ${className}`}>
		{children}
	</Card>
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

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
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
		<section className="@container bg-background">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Themed Cart" count={items.length} />

				<div className="mt-6 flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
					<ThemeSwitcher currentTheme="light" />
					<ColorSchemePreview />
				</div>

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<ThemeCard>
							<CardHeader className="border-b border-primary/10">
								<CardTitle className="text-foreground">Your Items</CardTitle>
							</CardHeader>
							<CardContent className="divide-y divide-primary/10">
								{items.map((item) => (
									<ThemedItem key={item.id} item={item} />
								))}
							</CardContent>
						</ThemeCard>
					</div>

					<div>
						<ThemeCard className="sticky top-4">
							<CardHeader className="border-b border-primary/10">
								<CardTitle className="text-foreground">Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-3 bg-primary/10" />}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter className="border-t border-primary/10 pt-6">
								<Button
									className="w-full gap-2 bg-primary hover:bg-primary/90"
									size="lg"
									asChild
								>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</ThemeCard>
					</div>
				</div>
			</div>
		</section>
	);
}
