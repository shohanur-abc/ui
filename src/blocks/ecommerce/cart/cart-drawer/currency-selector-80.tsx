'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Globe, Minus, Plus, RefreshCw, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	priceUSD: number;
	quantity: number;
}

interface Currency {
	code: string;
	symbol: string;
	name: string;
	rate: number;
	flag: string;
}

interface CartDrawerProps {
	title: string;
	currencyLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	currencies: Currency[];
	selectedCurrency: string;
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

const CurrencySelector = ({
	label,
	currencies,
	selected,
}: {
	label: string;
	currencies: Currency[];
	selected: string;
}) => {
	const selectedCurrency = currencies.find((c) => c.code === selected);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Globe className="size-4 text-muted-foreground" />
					<span className="font-medium">{label}</span>
				</div>
				<Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
					<RefreshCw className="size-3" />
					Update Rates
				</Button>
			</div>
			<Select defaultValue={selected}>
				<SelectTrigger className="w-full">
					<SelectValue>
						{selectedCurrency && (
							<div className="flex items-center gap-2">
								<span>{selectedCurrency.flag}</span>
								<span>{selectedCurrency.code}</span>
								<span className="text-muted-foreground">
									- {selectedCurrency.name}
								</span>
							</div>
						)}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{currencies.map((currency) => (
						<SelectItem key={currency.code} value={currency.code}>
							<div className="flex items-center gap-2">
								<span>{currency.flag}</span>
								<span className="font-medium">{currency.code}</span>
								<span className="text-muted-foreground">{currency.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{selectedCurrency && selectedCurrency.code !== 'USD' && (
				<p className="text-xs text-muted-foreground text-center">
					1 USD = {selectedCurrency.rate} {selectedCurrency.code}
				</p>
			)}
		</div>
	);
};

const ItemRow = ({
	item,
	currency,
}: {
	item: CartItem;
	currency: Currency;
}) => {
	const convertedPrice = item.priceUSD * currency.rate;

	return (
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
					<div className="text-right">
						<span className="text-sm font-medium">
							{currency.symbol}
							{(convertedPrice * item.quantity).toFixed(2)}
						</span>
						{currency.code !== 'USD' && (
							<p className="text-xs text-muted-foreground">
								${(item.priceUSD * item.quantity).toFixed(2)} USD
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const Summary = ({
	totalUSD,
	currency,
	checkoutLabel,
}: {
	totalUSD: number;
	currency: Currency;
	checkoutLabel: string;
}) => {
	const convertedTotal = totalUSD * currency.rate;

	return (
		<div className="space-y-4 border-t border-border pt-4">
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<div className="text-right">
					<span className="font-bold">
						{currency.symbol}
						{convertedTotal.toFixed(2)}
					</span>
					{currency.code !== 'USD' && (
						<p className="text-xs text-muted-foreground">
							${totalUSD.toFixed(2)} USD
						</p>
					)}
				</div>
			</div>
			<Button className="w-full" size="lg">
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		currencyLabel: 'Select Currency',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				priceUSD: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				priceUSD: 179.99,
				quantity: 1,
			},
		],
		currencies: [
			{ code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, flag: '🇺🇸' },
			{ code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
			{
				code: 'GBP',
				symbol: '£',
				name: 'British Pound',
				rate: 0.79,
				flag: '🇬🇧',
			},
			{
				code: 'JPY',
				symbol: '¥',
				name: 'Japanese Yen',
				rate: 149.5,
				flag: '🇯🇵',
			},
			{
				code: 'CAD',
				symbol: 'C$',
				name: 'Canadian Dollar',
				rate: 1.36,
				flag: '🇨🇦',
			},
		],
		selectedCurrency: 'EUR',
	};

	const selectedCurrency =
		cartData.currencies.find((c) => c.code === cartData.selectedCurrency) ||
		cartData.currencies[0];
	const totalUSD = cartData.items.reduce(
		(sum, item) => sum + item.priceUSD * item.quantity,
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
						<CurrencySelector
							label={cartData.currencyLabel}
							currencies={cartData.currencies}
							selected={cartData.selectedCurrency}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow
										key={item.id}
										item={item}
										currency={selectedCurrency}
									/>
								))}
							</div>
						</ScrollArea>
						<Summary
							totalUSD={totalUSD}
							currency={selectedCurrency}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
