'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	CircleDollarSign,
	Minus,
	Plus,
	ShoppingBag,
	Wallet,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	cashbackRate: number;
}

interface CashbackInfo {
	totalCashback: number;
	walletBalance: number;
	pendingCashback: number;
	minCashbackToRedeem: number;
}

interface CartDrawerProps {
	title: string;
	cashbackLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	cashback: CashbackInfo;
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const CashbackBanner = ({
	label,
	cashback,
	orderCashback,
}: {
	label: string;
	cashback: CashbackInfo;
	orderCashback: number;
}) => (
	<div className="rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="rounded-full bg-green-500/20 p-1.5">
					<CircleDollarSign className="size-4 text-green-600" />
				</div>
				<span className="font-medium">{label}</span>
			</div>
			<div className="text-right">
				<span className="text-xl font-bold text-green-600">
					+${orderCashback.toFixed(2)}
				</span>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-2">
			<div className="rounded-lg bg-background/80 p-2.5">
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<Wallet className="size-3" />
					Wallet Balance
				</div>
				<span className="text-lg font-semibold">
					${cashback.walletBalance.toFixed(2)}
				</span>
			</div>
			<div className="rounded-lg bg-background/80 p-2.5">
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<CircleDollarSign className="size-3" />
					Pending
				</div>
				<span className="text-lg font-semibold">
					${cashback.pendingCashback.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => {
	const itemCashback = item.price * item.quantity * (item.cashbackRate / 100);

	return (
		<div className="flex gap-3 py-4">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-start justify-between gap-2">
					<h4 className="font-medium">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<X className="size-3.5" />
					</Button>
				</div>
				<div className="flex items-center gap-1.5 mt-0.5">
					<Badge
						variant="outline"
						className="text-[10px] border-green-500 text-green-600"
					>
						{item.cashbackRate}% cashback
					</Badge>
					<span className="text-xs text-green-600">
						+${itemCashback.toFixed(2)}
					</span>
				</div>
				<div className="mt-auto flex items-center justify-between">
					<div className="flex items-center gap-1 rounded border border-border">
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-sm">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Plus className="size-3" />
						</Button>
					</div>
					<span className="font-semibold">
						${(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		cashbackLabel: 'Earn Cashback',
		checkoutLabel: 'Checkout & Earn',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
				cashbackRate: 5,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
				cashbackRate: 8,
			},
		],
		cashback: {
			totalCashback: 20.9,
			walletBalance: 45.5,
			pendingCashback: 12.0,
			minCashbackToRedeem: 10,
		},
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const orderCashback = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity * (item.cashbackRate / 100),
		0,
	);
	const itemCount = cartData.items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<CashbackBanner
							label={cartData.cashbackLabel}
							cashback={cartData.cashback}
							orderCashback={orderCashback}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
