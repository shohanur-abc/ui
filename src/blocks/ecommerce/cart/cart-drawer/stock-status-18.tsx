'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { AlertCircle, Minus, Plus, RefreshCw, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	status: 'available' | 'low-stock' | 'out-of-stock' | 'backordered';
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
}

const StatusTrigger = ({ count, hasIssues }: { count: number; hasIssues: boolean }) => (
	<Button variant={hasIssues ? 'destructive' : 'outline'} size="icon" className="relative">
		<ShoppingCart className="size-4" />
		{count > 0 && (
			<Badge
				variant={hasIssues ? 'outline' : 'default'}
				className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]"
			>
				{count}
			</Badge>
		)}
		{hasIssues && (
			<AlertCircle className="absolute -bottom-1 -right-1 size-3 text-destructive animate-pulse" />
		)}
	</Button>
);

const StatusBadge = ({ status }: { status: CartItem['status'] }) => {
	const config = {
		available: { text: 'In Stock', variant: 'secondary' as const },
		'low-stock': { text: 'Only 3 left', variant: 'outline' as const },
		'out-of-stock': { text: 'Out of Stock', variant: 'destructive' as const },
		backordered: { text: 'Backordered', variant: 'outline' as const },
	};

	return (
		<Badge variant={config[status].variant} className="text-[10px]">
			{config[status].text}
		</Badge>
	);
};

const StatusItem = ({ item }: { item: CartItem }) => {
	const isUnavailable = item.status === 'out-of-stock';

	return (
		<div
			className={`flex gap-3 py-4 ${isUnavailable ? 'opacity-60' : ''}`}
		>
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image
					src={item.image}
					alt={item.name}
					fill
					className={`object-cover ${isUnavailable ? 'grayscale' : ''}`}
				/>
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="space-y-1">
					<div className="flex items-start justify-between gap-2">
						<h4 className="truncate text-sm font-medium">{item.name}</h4>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<X className="size-3" />
						</Button>
					</div>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
					<StatusBadge status={item.status} />
				</div>
				<div className="flex items-center justify-between pt-1">
					{isUnavailable ? (
						<Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
							<RefreshCw className="size-3" />
							Find Similar
						</Button>
					) : (
						<div className="flex items-center gap-1 rounded border border-border">
							<Button size="icon-sm" variant="ghost" className="size-6">
								<Minus className="size-3" />
							</Button>
							<span className="w-6 text-center text-xs">{item.quantity}</span>
							<Button
								size="icon-sm"
								variant="ghost"
								className="size-6"
								disabled={item.status === 'low-stock'}
							>
								<Plus className="size-3" />
							</Button>
						</div>
					)}
					<span className="text-sm font-bold">
						${(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

const IssuesBanner = ({ count }: { count: number }) => (
	<div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3">
		<AlertCircle className="size-4 text-destructive" />
		<span className="text-sm text-destructive">
			{count} {count === 1 ? 'item has' : 'items have'} availability issues
		</span>
	</div>
);

const Footer = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const availableItems = items.filter((item) => item.status !== 'out-of-stock');
	const total = availableItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const hasUnavailable = items.some((item) => item.status === 'out-of-stock');

	return (
		<div className="space-y-4 border-t border-border pt-4">
			<div className="flex justify-between text-lg">
				<span>Subtotal</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			{hasUnavailable && (
				<p className="text-xs text-muted-foreground">
					* Unavailable items will be removed at checkout
				</p>
			)}
			<Button className="w-full" size="lg" disabled={availableItems.length === 0}>
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Checkout Available Items',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Air Max 90',
				variant: 'Red / US 10',
				price: 149.99,
				quantity: 1,
				status: 'available',
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'React Element',
				variant: 'Blue / US 9',
				price: 169.99,
				quantity: 1,
				status: 'low-stock',
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				variant: 'White / US 11',
				price: 89.99,
				quantity: 1,
				status: 'out-of-stock',
			},
			{
				id: '4',
				image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Trail Runner',
				variant: 'Green / US 10',
				price: 129.99,
				quantity: 1,
				status: 'backordered',
			},
		],
	};

	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
	const issueCount = cartData.items.filter(
		(item) => item.status === 'out-of-stock',
	).length;

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<StatusTrigger count={itemCount} hasIssues={issueCount > 0} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						{issueCount > 0 && <IssuesBanner count={issueCount} />}
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<StatusItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Footer
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
