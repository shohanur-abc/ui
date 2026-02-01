import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
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

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<div className="size-12 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.8)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(50,50,50,0.2)] flex items-center justify-center">
				<ShoppingBag className="size-6 text-gray-600 dark:text-gray-300" />
			</div>
			<h1 className="text-2xl font-bold @md:text-3xl text-gray-700 dark:text-gray-200">
				{title}
			</h1>
		</div>
		<Badge className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-0 shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(50,50,50,0.2)] px-4 py-1">
			{count} items
		</Badge>
	</div>
);

const NeumorphicCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(50,50,50,0.2)] ${className}`}
	>
		{children}
	</div>
);

const NeumorphicInset = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`rounded-xl bg-gray-100 dark:bg-gray-800 p-4 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(50,50,50,0.2)] ${className}`}
	>
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-xl shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(50,50,50,0.2)]">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const NeumorphicButton = ({
	children,
	className = '',
	size = 'default',
}: {
	children: React.ReactNode;
	className?: string;
	size?: 'icon' | 'default';
}) => (
	<button
		className={`
      rounded-lg bg-gray-100 dark:bg-gray-800 
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] 
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(50,50,50,0.2)]
      hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(50,50,50,0.2)]
      transition-shadow duration-200
      ${size === 'icon' ? 'size-8' : 'px-6 py-3'}
      flex items-center justify-center
      text-gray-600 dark:text-gray-300
      ${className}
    `}
	>
		{children}
	</button>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2">
		<NeumorphicButton size="icon">
			<Minus className="size-3" />
		</NeumorphicButton>
		<div className="w-8 text-center font-medium">{quantity}</div>
		<NeumorphicButton size="icon">
			<Plus className="size-3" />
		</NeumorphicButton>
	</div>
);

const NeumorphicItem = ({ item }: { item: CartItem }) => (
	<NeumorphicInset className="mb-4 last:mb-0">
		<div className="flex gap-4">
			<ItemImage src={item.image} alt={item.name} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h3 className="font-semibold text-gray-700 dark:text-gray-200 line-clamp-1">
							{item.name}
						</h3>
						<p className="text-sm text-gray-500">{item.variant}</p>
					</div>
					<NeumorphicButton size="icon" className="size-6 shrink-0">
						<X className="size-3" />
					</NeumorphicButton>
				</div>
				<div className="flex items-center justify-between mt-3">
					<QuantityControl quantity={item.quantity} />
					<p className="font-bold text-lg text-gray-700 dark:text-gray-200">
						${(item.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	</NeumorphicInset>
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
		className={`flex justify-between ${bold ? 'text-xl font-bold text-gray-700 dark:text-gray-200' : 'text-gray-500'}`}
	>
		<span>{label}</span>
		<span>{value}</span>
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
		<section className="@container bg-gray-100 dark:bg-gray-800 min-h-screen">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<NeumorphicCard>
							<h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-4">
								Cart Items
							</h2>
							{items.map((item) => (
								<NeumorphicItem key={item.id} item={item} />
							))}
						</NeumorphicCard>
					</div>

					<div>
						<NeumorphicCard className="sticky top-4">
							<h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-4">
								Order Summary
							</h2>

							<NeumorphicInset className="mb-4">
								<div className="space-y-3">
									{summaryLines.map((line, i) => (
										<div key={i}>
											{line.bold && (
												<Separator className="my-3 bg-gray-300 dark:bg-gray-600" />
											)}
											<SummaryLine {...line} />
										</div>
									))}
								</div>
							</NeumorphicInset>

							<Button
								className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(50,50,50,0.2)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] dark:hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(50,50,50,0.2)] border-0 gap-2"
								size="lg"
								asChild
							>
								<Link href="/checkout">
									Checkout
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</NeumorphicCard>
					</div>
				</div>
			</div>
		</section>
	);
}
