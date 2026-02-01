'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Minus, Plus, ShoppingBag, Wallet, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface WalletInfo {
	balance: number;
	pendingCashback: number;
	expiringAmount: number;
	expiringIn: string;
}

interface CartDrawerProps {
	title: string;
	walletLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	wallet: WalletInfo;
	useWallet: boolean;
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

const WalletSection = ({
	label,
	wallet,
	total,
	useWallet,
}: {
	label: string;
	wallet: WalletInfo;
	total: number;
	useWallet: boolean;
}) => {
	const canUse = Math.min(wallet.balance, total);
	const coverage = (canUse / total) * 100;

	return (
		<div className="rounded-xl border border-border p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="rounded-full bg-emerald-500/20 p-2">
						<Wallet className="size-4 text-emerald-600" />
					</div>
					<span className="font-medium">{label}</span>
				</div>
				<span className="text-lg font-bold text-emerald-600">
					${wallet.balance.toFixed(2)}
				</span>
			</div>
			{useWallet && (
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Apply to order</span>
						<span className="font-medium">-${canUse.toFixed(2)}</span>
					</div>
					<Progress value={coverage} className="h-2" />
					<p className="text-xs text-muted-foreground text-center">
						Covers {coverage.toFixed(0)}% of your order
					</p>
				</div>
			)}
			<div className="grid grid-cols-2 gap-2 text-sm">
				<div className="rounded-lg bg-muted p-2">
					<p className="text-xs text-muted-foreground">Pending Cashback</p>
					<span className="font-medium">
						+${wallet.pendingCashback.toFixed(2)}
					</span>
				</div>
				<div className="rounded-lg bg-amber-100 dark:bg-amber-950 p-2">
					<p className="text-xs text-amber-600">Expiring {wallet.expiringIn}</p>
					<span className="font-medium text-amber-600">
						${wallet.expiringAmount.toFixed(2)}
					</span>
				</div>
			</div>
			<Button variant="outline" className="w-full" size="sm">
				{useWallet ? "Don't Use Wallet" : 'Use Wallet Balance'}
			</Button>
		</div>
	);
};

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const Summary = ({
	subtotal,
	walletCredit,
	total,
	checkoutLabel,
}: {
	subtotal: number;
	walletCredit: number;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			{walletCredit > 0 && (
				<div className="flex justify-between text-emerald-600">
					<span className="flex items-center gap-1">
						<Wallet className="size-3" />
						Wallet Credit
					</span>
					<span>-${walletCredit.toFixed(2)}</span>
				</div>
			)}
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">To Pay</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		walletLabel: 'Wallet Balance',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
		],
		wallet: {
			balance: 45.5,
			pendingCashback: 12.3,
			expiringAmount: 15.0,
			expiringIn: '7 days',
		},
		useWallet: true,
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const walletCredit = cartData.useWallet
		? Math.min(cartData.wallet.balance, subtotal)
		: 0;
	const total = subtotal - walletCredit;
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
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<WalletSection
								label={cartData.walletLabel}
								wallet={cartData.wallet}
								total={subtotal}
								useWallet={cartData.useWallet}
							/>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							walletCredit={walletCredit}
							total={total}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
