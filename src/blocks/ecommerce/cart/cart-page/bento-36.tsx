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
import { Minus, Plus, X, ArrowRight, Grid3X3 } from 'lucide-react';
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

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="rounded-lg bg-primary/10 p-2">
			<Grid3X3 className="size-5 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const BentoLarge = ({ item }: { item: CartItem }) => (
	<Card className="row-span-2 col-span-2 overflow-hidden group">
		<div className="relative h-full flex flex-col">
			<div className="relative flex-1 min-h-[200px] bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				<Button
					size="icon-sm"
					variant="secondary"
					className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<X className="size-4" />
				</Button>
			</div>
			<CardContent className="p-4 space-y-3">
				<div>
					<h3 className="font-semibold text-lg">{item.name}</h3>
					<p className="text-muted-foreground">{item.variant}</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center rounded-xl border-2">
						<Button size="icon" variant="ghost" className="size-10">
							<Minus className="size-4" />
						</Button>
						<span className="w-8 text-center font-medium">{item.quantity}</span>
						<Button size="icon" variant="ghost" className="size-10">
							<Plus className="size-4" />
						</Button>
					</div>
					<p className="text-2xl font-bold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</CardContent>
		</div>
	</Card>
);

const BentoMedium = ({ item }: { item: CartItem }) => (
	<Card className="col-span-2 overflow-hidden group">
		<CardContent className="p-0 flex">
			<div className="relative w-32 shrink-0 bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 p-4 flex flex-col justify-between">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{item.name}</h3>
						<p className="text-sm text-muted-foreground">{item.variant}</p>
					</div>
					<Button
						size="icon-sm"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive"
					>
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-3">
					<div className="flex items-center rounded-lg border">
						<Button size="icon-sm" variant="ghost" className="size-8">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-sm">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-8">
							<Plus className="size-3" />
						</Button>
					</div>
					<p className="text-lg font-bold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BentoSmall = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden group">
		<div className="relative aspect-square bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 size-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-3" />
			</Button>
		</div>
		<CardContent className="p-3">
			<h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
			<div className="flex items-center justify-between mt-2">
				<div className="flex items-center rounded border text-xs">
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Minus className="size-2" />
					</Button>
					<span className="w-4 text-center">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Plus className="size-2" />
					</Button>
				</div>
				<p className="font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</CardContent>
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

const SummaryCard = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="col-span-2 @lg:col-span-1 row-span-2">
		<CardHeader>
			<CardTitle>Summary</CardTitle>
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

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			name: 'Studio Headphones Pro',
			variant: 'Midnight Black • Wireless',
			price: 349.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • Active Noise Cancellation',
			price: 199.99,
			quantity: 2,
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
				<PageHeader title="Your Cart" subtitle="A curated collection" />

				<div className="mt-8 grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 auto-rows-auto">
					{/* Large featured item */}
					<BentoLarge item={items[0]} />

					{/* Summary card */}
					<SummaryCard
						lines={summaryLines}
						checkoutLabel="Checkout"
						checkoutHref="/checkout"
					/>

					{/* Small items */}
					<BentoSmall item={items[1]} />
					<BentoSmall item={items[2]} />

					{/* Medium horizontal item */}
					<BentoMedium item={items[3]} />
				</div>
			</div>
		</section>
	);
}
