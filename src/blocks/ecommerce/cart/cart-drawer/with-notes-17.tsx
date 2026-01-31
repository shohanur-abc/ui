'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { MessageSquare, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	note?: string;
}

interface CartDrawerProps {
	title: string;
	notePlaceholder: string;
	addNoteLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const TriggerBtn = ({ count }: { count: number }) => (
	<Button variant="secondary" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-1 -top-1 size-4 rounded-full p-0 text-[9px]">
				{count}
			</Badge>
		)}
	</Button>
);

const NoteInput = ({
	note,
	placeholder,
}: {
	note?: string;
	placeholder: string;
}) => (
	<Textarea
		placeholder={placeholder}
		defaultValue={note}
		className="min-h-[60px] resize-none text-xs"
	/>
);

const ItemWithNote = ({
	item,
	notePlaceholder,
	addNoteLabel,
}: {
	item: CartItem;
	notePlaceholder: string;
	addNoteLabel: string;
}) => (
	<div className="space-y-3 py-4">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between">
					<h4 className="truncate font-medium">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<X className="size-3" />
					</Button>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 rounded border border-border">
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-xs">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Plus className="size-3" />
						</Button>
					</div>
					<span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
				</div>
			</div>
		</div>
		{item.note !== undefined ? (
			<NoteInput note={item.note} placeholder={notePlaceholder} />
		) : (
			<Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
				<MessageSquare className="size-3" />
				{addNoteLabel}
			</Button>
		)}
	</div>
);

const Footer = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span>Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Order',
		notePlaceholder: 'Add special instructions...',
		addNoteLabel: 'Add a note',
		checkoutLabel: 'Continue',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
				name: 'Margherita Pizza',
				price: 18.99,
				quantity: 2,
				note: 'Extra cheese, light sauce',
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
				name: 'Classic Burger',
				price: 14.99,
				quantity: 1,
				note: '',
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&h=200&fit=crop',
				name: 'Caesar Salad',
				price: 12.99,
				quantity: 1,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerBtn count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemWithNote
										key={item.id}
										item={item}
										notePlaceholder={cartData.notePlaceholder}
										addNoteLabel={cartData.addNoteLabel}
									/>
								))}
							</div>
						</ScrollArea>
						<Footer total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
