'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Copy, Gift, Minus, Plus, ShoppingBag, Users, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface ReferralInfo {
	referralCode: string;
	referrerReward: number;
	refereeDiscount: number;
	referralsCount: number;
	pendingRewards: number;
}

interface CartDrawerProps {
	title: string;
	referralLabel: string;
	copyLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	referral: ReferralInfo;
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

const ReferralSection = ({
	label,
	copyLabel,
	referral,
}: {
	label: string;
	copyLabel: string;
	referral: ReferralInfo;
}) => (
	<div className="rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-300/50 p-4 space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="rounded-full bg-blue-500/20 p-2">
					<Users className="size-4 text-blue-600" />
				</div>
				<span className="font-medium">{label}</span>
			</div>
			<Badge variant="outline" className="border-blue-500 text-blue-600">
				{referral.referralsCount} referred
			</Badge>
		</div>
		<div className="rounded-lg bg-background/80 p-3 space-y-2">
			<p className="text-xs text-muted-foreground">
				Share your code & earn rewards
			</p>
			<div className="flex gap-2">
				<Input
					value={referral.referralCode}
					readOnly
					className="font-mono text-center font-bold tracking-wider"
				/>
				<Button variant="outline">
					<Copy className="size-4" />
				</Button>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="rounded-lg bg-background/80 p-3 text-center">
				<Gift className="size-4 text-blue-500 mx-auto mb-1" />
				<p className="text-xs text-muted-foreground">You get</p>
				<span className="font-bold text-blue-600">
					${referral.referrerReward}
				</span>
			</div>
			<div className="rounded-lg bg-background/80 p-3 text-center">
				<Users className="size-4 text-blue-500 mx-auto mb-1" />
				<p className="text-xs text-muted-foreground">Friend gets</p>
				<span className="font-bold text-blue-600">
					{referral.refereeDiscount}% off
				</span>
			</div>
		</div>
		{referral.pendingRewards > 0 && (
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Pending Rewards</span>
				<span className="font-medium text-blue-600">
					${referral.pendingRewards.toFixed(2)}
				</span>
			</div>
		)}
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
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		referralLabel: 'Refer & Earn',
		copyLabel: 'Copy',
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
		referral: {
			referralCode: 'FRIEND25',
			referrerReward: 25,
			refereeDiscount: 20,
			referralsCount: 7,
			pendingRewards: 75,
		},
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
							<ReferralSection
								label={cartData.referralLabel}
								copyLabel={cartData.copyLabel}
								referral={cartData.referral}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
