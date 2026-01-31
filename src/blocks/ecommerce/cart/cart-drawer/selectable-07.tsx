'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	sku: string;
	price: number;
	quantity: number;
	selected: boolean;
}

interface CartDrawerProps {
	title: string;
	selectAllLabel: string;
	deleteSelectedLabel: string;
	checkoutLabel: string;
	selectedLabel: string;
	items: CartItem[];
}

const TriggerWithCount = ({ count }: { count: number }) => (
	<Button variant="ghost" size="icon" className="relative">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
				{count}
			</span>
		)}
	</Button>
);

const SelectableItem = ({
	item,
	selected,
}: {
	item: CartItem;
	selected: boolean;
}) => (
	<div
		className={`flex gap-3 rounded-lg border p-3 transition-colors ${
			selected ? 'border-primary bg-primary/5' : 'border-border'
		}`}
	>
		<div className="flex items-center">
			<Checkbox checked={selected} />
		</div>
		<div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 shrink-0 text-muted-foreground hover:text-destructive"
				>
					<Trash2 className="size-3" />
				</Button>
			</div>
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center gap-1">
					<Button size="icon-sm" variant="outline" className="size-6">
						<Minus className="size-3" />
					</Button>
					<span className="w-8 text-center text-sm">{item.quantity}</span>
					<Button size="icon-sm" variant="outline" className="size-6">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="text-sm font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const BulkActions = ({
	selectAllLabel,
	deleteSelectedLabel,
	selectedCount,
	totalCount,
}: {
	selectAllLabel: string;
	deleteSelectedLabel: string;
	selectedCount: number;
	totalCount: number;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
		<div className="flex items-center gap-2">
			<Checkbox checked={selectedCount === totalCount} />
			<span className="text-sm">{selectAllLabel}</span>
		</div>
		{selectedCount > 0 && (
			<Button variant="ghost" size="sm" className="h-7 text-destructive gap-1">
				<Trash2 className="size-3" />
				{deleteSelectedLabel}
			</Button>
		)}
	</div>
);

const CheckoutFooter = ({
	selectedCount,
	selectedLabel,
	total,
	checkoutLabel,
}: {
	selectedCount: number;
	selectedLabel: string;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Badge variant="secondary">{selectedCount}</Badge>
				<span className="text-sm text-muted-foreground">{selectedLabel}</span>
			</div>
			<span className="text-xl font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg" disabled={selectedCount === 0}>
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Shopping Cart',
		selectAllLabel: 'Select All',
		deleteSelectedLabel: 'Delete',
		checkoutLabel: 'Checkout Selected Items',
		selectedLabel: 'items selected',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
				name: 'Premium Headphones',
				sku: 'HP-001',
				price: 299.99,
				quantity: 1,
				selected: true,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
				name: 'Phone Case Pro',
				sku: 'PC-042',
				price: 29.99,
				quantity: 2,
				selected: true,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop',
				name: 'Portable Charger',
				sku: 'CH-103',
				price: 49.99,
				quantity: 1,
				selected: false,
			},
		],
	};

	const selectedItems = cartData.items.filter((item) => item.selected);
	const selectedTotal = selectedItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerWithCount count={totalQuantity} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<BulkActions
							selectAllLabel={cartData.selectAllLabel}
							deleteSelectedLabel={cartData.deleteSelectedLabel}
							selectedCount={selectedItems.length}
							totalCount={cartData.items.length}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="space-y-3 py-4">
								{cartData.items.map((item) => (
									<SelectableItem
										key={item.id}
										item={item}
										selected={item.selected}
									/>
								))}
							</div>
						</ScrollArea>
						<CheckoutFooter
							selectedCount={selectedItems.length}
							selectedLabel={cartData.selectedLabel}
							total={selectedTotal}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
