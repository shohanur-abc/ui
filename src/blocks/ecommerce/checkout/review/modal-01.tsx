'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const ProductRow = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">
				×{product.qty}
			</Badge>
		</div>
	</div>
);

const InfoRow = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-muted-foreground" />
		<span className="text-sm text-muted-foreground">{label}:</span>
		<span className="text-sm font-medium">{value}</span>
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
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const [open, setOpen] = useState(true);

	const products: Product[] = [
		{
			id: '1',
			name: 'Sneakers',
			variant: 'Running / White',
			price: 129.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Socks Pack',
			variant: 'Athletic / 6-Pack',
			price: 24.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative min-h-[500px] overflow-hidden"
			data-theme="neon"
		>
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Your Cart
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review your order before checkout
					</p>
				</div>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button size="lg" className="mt-6 mx-auto flex gap-2">
							Review Order
							<ArrowRight className="size-4" />
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-md">
						<DialogHeader>
							<DialogTitle>Order Review</DialogTitle>
							<DialogDescription>
								Confirm your order details before checkout
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4">
							<div className="divide-y">
								{products.map((product) => (
									<ProductRow key={product.id} product={product} />
								))}
							</div>

							<Separator />

							<div className="space-y-2">
								<InfoRow icon={MapPin} label="Ship To" value="San Diego, CA" />
								<InfoRow icon={Truck} label="Delivery" value="Dec 19-20" />
								<InfoRow icon={CreditCard} label="Payment" value="•••• 5555" />
							</div>

							<Separator />

							<div className="space-y-2">
								<SummaryLine label="Subtotal" value="$154.98" />
								<SummaryLine label="Shipping" value="$7.99" />
								<SummaryLine label="Tax" value="$13.17" />
								<SummaryLine label="Discount" value="-$15.50" green />
								<Separator className="my-2" />
								<SummaryLine label="Total" value="$160.64" bold />
							</div>
						</div>

						<DialogFooter className="flex-col gap-3 sm:flex-col">
							<Button
								size="lg"
								className="w-full gap-2"
								onClick={() => setOpen(false)}
							>
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
