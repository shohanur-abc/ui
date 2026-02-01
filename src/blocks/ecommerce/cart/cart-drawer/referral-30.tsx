'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import {
	Check,
	Copy,
	Gift,
	Minus,
	Plus,
	Share2,
	ShoppingBag,
	Users,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface ReferralData {
	code: string;
	referrerDiscount: number;
	friendDiscount: number;
	earnedCredits: number;
	friendsReferred: number;
}

interface CartDrawerProps {
	title: string;
	referralTitle: string;
	shareLabel: string;
	yourCodeLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	referral: ReferralData;
}

const ReferralTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const ReferralCard = ({
	referral,
	title,
	shareLabel,
	yourCodeLabel,
}: {
	referral: ReferralData;
	title: string;
	shareLabel: string;
	yourCodeLabel: string;
}) => (
	<Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-950/50 dark:to-indigo-950/50">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Users className="size-5 text-blue-600" />
				<span className="font-medium text-blue-800 dark:text-blue-200">
					{title}
				</span>
			</div>
			<Badge
				variant="outline"
				className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300"
			>
				<Gift className="mr-1 size-3" />${referral.earnedCredits} earned
			</Badge>
		</div>
		<div className="mt-3 grid grid-cols-2 gap-2 text-center">
			<div className="rounded-lg bg-white/50 p-2 dark:bg-black/20">
				<p className="text-lg font-bold text-blue-600">
					{referral.referrerDiscount}%
				</p>
				<p className="text-xs text-muted-foreground">You get</p>
			</div>
			<div className="rounded-lg bg-white/50 p-2 dark:bg-black/20">
				<p className="text-lg font-bold text-blue-600">
					{referral.friendDiscount}%
				</p>
				<p className="text-xs text-muted-foreground">Friends get</p>
			</div>
		</div>
		<div className="mt-3">
			<label className="text-xs text-muted-foreground">{yourCodeLabel}</label>
			<div className="mt-1 flex gap-2">
				<div className="relative flex-1">
					<Input
						value={referral.code}
						readOnly
						className="bg-white font-mono dark:bg-black"
					/>
					<Button
						size="icon-sm"
						variant="ghost"
						className="absolute right-2 top-1/2 size-6 -translate-y-1/2"
					>
						<Copy className="size-3" />
					</Button>
				</div>
				<Button size="icon" variant="secondary">
					<Share2 className="size-4" />
				</Button>
			</div>
		</div>
		<p className="mt-2 text-xs text-muted-foreground text-center">
			{referral.friendsReferred} friends have used your code
		</p>
	</Card>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
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

const ReferralSummary = ({
	subtotal,
	credits,
	checkoutLabel,
}: {
	subtotal: number;
	credits: number;
	checkoutLabel: string;
}) => {
	const appliedCredits = Math.min(credits, subtotal);
	const total = subtotal - appliedCredits;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			{credits > 0 && (
				<div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 dark:bg-blue-950/30">
					<span className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
						<Check className="size-4" />
						Referral Credits Applied
					</span>
					<span className="font-medium text-blue-700 dark:text-blue-300">
						-${appliedCredits.toFixed(2)}
					</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Users className="size-4" />
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		referralTitle: 'Refer & Earn',
		shareLabel: 'Share',
		yourCodeLabel: 'Your referral code',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Smart Watch',
				price: 249.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				price: 149.99,
				quantity: 1,
			},
		],
		referral: {
			code: 'FRIEND15XYZ',
			referrerDiscount: 15,
			friendDiscount: 20,
			earnedCredits: 45.0,
			friendsReferred: 3,
		},
	};

	const subtotal = cartData.items.reduce(
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
						<ReferralTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ReferralCard
							referral={cartData.referral}
							title={cartData.referralTitle}
							shareLabel={cartData.shareLabel}
							yourCodeLabel={cartData.yourCodeLabel}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<CartItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<ReferralSummary
							subtotal={subtotal}
							credits={cartData.referral.earnedCredits}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
