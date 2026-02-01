'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Truck,
	X,
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

const OverlayProduct = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary">×{product.qty}</Badge>
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const OverlayPanel = ({
	open,
	onClose,
	products,
}: {
	open: boolean;
	onClose: () => void;
	products: Product[];
}) => {
	if (!open) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-background shadow-2xl">
				<div className="sticky top-0 flex items-center justify-between border-b bg-background p-4">
					<h2 className="text-lg font-semibold">Order Review</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="size-5" />
					</Button>
				</div>

				<div className="p-4 space-y-6">
					<div className="divide-y">
						{products.map((product) => (
							<OverlayProduct key={product.id} product={product} />
						))}
					</div>

					<Separator />

					<div className="space-y-3">
						<InfoRow icon={MapPin} label="Ship To" value="Phoenix, AZ" />
						<InfoRow icon={Truck} label="Delivery" value="Dec 20-21" />
						<InfoRow icon={CreditCard} label="Payment" value="•••• 4567" />
					</div>

					<Separator />

					<div className="space-y-2">
						<SummaryLine label="Subtotal" value="$134.97" />
						<SummaryLine label="Shipping" value="$7.99" />
						<SummaryLine label="Tax" value="$11.47" />
						<SummaryLine label="Discount" value="-$13.50" green />
						<Separator className="my-3" />
						<SummaryLine label="Total" value="$140.93" bold />
					</div>

					<Button size="lg" className="w-full gap-2">
						<Lock className="size-4" />
						Complete Order
						<ArrowRight className="size-4" />
					</Button>
					<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
						<Shield className="size-3" />
						<span>Secure checkout</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default function Main() {
	const [overlayOpen, setOverlayOpen] = useState(true);

	const products: Product[] = [
		{
			id: '1',
			name: 'Plant Pot',
			variant: 'Ceramic / Large',
			price: 44.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Succulent Set',
			variant: 'Mini / 3-Pack',
			price: 24.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Watering Can',
			variant: 'Copper / 2L',
			price: 19.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative min-h-[600px] overflow-hidden"
			data-theme="neon"
		>
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Your Shopping Cart
					</h1>
					<p className="mt-2 text-muted-foreground">
						Click the button below to review your order
					</p>
					<Button
						size="lg"
						className="mt-6 gap-2"
						onClick={() => setOverlayOpen(true)}
					>
						Review Order
						<ArrowRight className="size-4" />
					</Button>
				</div>

				<OverlayPanel
					open={overlayOpen}
					onClose={() => setOverlayOpen(false)}
					products={products}
				/>
			</div>
		</section>
	);
}
