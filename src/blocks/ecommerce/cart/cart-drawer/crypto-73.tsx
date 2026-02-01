'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Bitcoin, Minus, Plus, ShoppingBag, Wallet, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface CryptoOption {
	id: string;
	name: string;
	symbol: string;
	icon: string;
	rate: number;
	discount?: number;
}

interface CartDrawerProps {
	title: string;
	cryptoLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	cryptoOptions: CryptoOption[];
	selectedCrypto: string;
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

const CryptoSection = ({
	label,
	options,
	selectedCrypto,
	total,
}: {
	label: string;
	options: CryptoOption[];
	selectedCrypto: string;
	total: number;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Wallet className="size-4 text-muted-foreground" />
			<span className="font-medium">{label}</span>
		</div>
		<RadioGroup defaultValue={selectedCrypto} className="space-y-2">
			{options.map((crypto) => {
				const cryptoAmount = total / crypto.rate;
				const discountedAmount = crypto.discount
					? cryptoAmount * (1 - crypto.discount / 100)
					: cryptoAmount;

				return (
					<div key={crypto.id} className="flex items-center">
						<RadioGroupItem
							value={crypto.id}
							id={crypto.id}
							className="peer sr-only"
						/>
						<Label
							htmlFor={crypto.id}
							className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-input bg-background p-3 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
						>
							<div className="flex items-center gap-3">
								<div className="size-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
									<Image
										src={crypto.icon}
										alt={crypto.name}
										width={24}
										height={24}
										className="rounded-full"
									/>
								</div>
								<div>
									<p className="font-medium">{crypto.name}</p>
									<p className="text-xs text-muted-foreground">
										{crypto.symbol}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-medium">
									{discountedAmount.toFixed(6)} {crypto.symbol}
								</p>
								{crypto.discount && (
									<Badge className="bg-green-500 text-xs">
										{crypto.discount}% off
									</Badge>
								)}
							</div>
						</Label>
					</div>
				);
			})}
		</RadioGroup>
		<p className="text-xs text-muted-foreground text-center">
			Rates updated every 30 seconds
		</p>
	</div>
);

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
		<Button className="w-full" size="lg">
			<Bitcoin className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		cryptoLabel: 'Pay with Crypto',
		checkoutLabel: 'Pay with Crypto',
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
		cryptoOptions: [
			{
				id: '1',
				name: 'Bitcoin',
				symbol: 'BTC',
				icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=48&h=48&fit=crop',
				rate: 43250,
				discount: 5,
			},
			{
				id: '2',
				name: 'Ethereum',
				symbol: 'ETH',
				icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=48&h=48&fit=crop',
				rate: 2280,
			},
			{
				id: '3',
				name: 'USDC',
				symbol: 'USDC',
				icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=48&h=48&fit=crop',
				rate: 1,
			},
		],
		selectedCrypto: '1',
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
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
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<CryptoSection
								label={cartData.cryptoLabel}
								options={cartData.cryptoOptions}
								selectedCrypto={cartData.selectedCrypto}
								total={total}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
