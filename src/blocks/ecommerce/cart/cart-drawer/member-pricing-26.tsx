'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Crown, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	originalPrice: number;
	memberPrice: number;
	quantity: number;
}

interface MembershipInfo {
	tier: string;
	discountPercent: number;
	pointsEarned: number;
	pointsToNextTier: number;
}

interface CartDrawerProps {
	title: string;
	memberLabel: string;
	pointsLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	membership: MembershipInfo;
}

const MemberTrigger = ({
	count,
	tier,
}: {
	count: number;
	tier: string;
}) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
		{tier === 'Gold' && (
			<Crown className="absolute -bottom-1 -right-1 size-3 text-yellow-500" />
		)}
	</Button>
);

const MembershipBanner = ({
	membership,
	memberLabel,
	pointsLabel,
}: {
	membership: MembershipInfo;
	memberLabel: string;
	pointsLabel: string;
}) => (
	<div className="rounded-xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 p-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Crown className="size-5 text-yellow-500" />
				<span className="font-medium">{memberLabel}</span>
				<Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300">
					{membership.tier}
				</Badge>
			</div>
			<Badge variant="secondary">{membership.discountPercent}% off</Badge>
		</div>
		<div className="mt-3 flex items-center gap-2">
			<Star className="size-4 text-amber-500" fill="currentColor" />
			<span className="text-sm">
				{pointsLabel}: <strong>{membership.pointsEarned}</strong>
			</span>
		</div>
		<div className="mt-2 h-1.5 rounded-full bg-muted">
			<div
				className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
				style={{ width: `${(membership.pointsEarned / (membership.pointsEarned + membership.pointsToNextTier)) * 100}%` }}
			/>
		</div>
		<p className="mt-1 text-xs text-muted-foreground">
			{membership.pointsToNextTier} points to next tier
		</p>
	</div>
);

const MemberItem = ({ item }: { item: CartItem }) => {
	const savings = (item.originalPrice - item.memberPrice) * item.quantity;

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
				<div className="flex items-center gap-2">
					<span className="text-sm font-bold text-primary">
						${item.memberPrice.toFixed(2)}
					</span>
					<span className="text-xs text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
					<Badge variant="outline" className="text-[10px] text-green-600">
						Save ${savings.toFixed(2)}
					</Badge>
				</div>
				<div className="flex items-center justify-between pt-1">
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
						${(item.memberPrice * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

const MemberSummary = ({
	regularTotal,
	memberTotal,
	checkoutLabel,
}: {
	regularTotal: number;
	memberTotal: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Regular Price</span>
			<span className="text-muted-foreground line-through">
				${regularTotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-sm text-green-600">
			<span className="flex items-center gap-1">
				<Crown className="size-3" />
				Member Savings
			</span>
			<span>-${(regularTotal - memberTotal).toFixed(2)}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Member Total</span>
			<span className="font-bold">${memberTotal.toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			<Crown className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Member Cart',
		memberLabel: 'Member',
		pointsLabel: 'Points earned',
		checkoutLabel: 'Member Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Premium Watch',
				originalPrice: 299.99,
				memberPrice: 254.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds Pro',
				originalPrice: 199.99,
				memberPrice: 169.99,
				quantity: 1,
			},
		],
		membership: {
			tier: 'Gold',
			discountPercent: 15,
			pointsEarned: 425,
			pointsToNextTier: 575,
		},
	};

	const regularTotal = cartData.items.reduce(
		(sum, item) => sum + item.originalPrice * item.quantity,
		0,
	);
	const memberTotal = cartData.items.reduce(
		(sum, item) => sum + item.memberPrice * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<MemberTrigger count={itemCount} tier={cartData.membership.tier} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<MembershipBanner
							membership={cartData.membership}
							memberLabel={cartData.memberLabel}
							pointsLabel={cartData.pointsLabel}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<MemberItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<MemberSummary
							regularTotal={regularTotal}
							memberTotal={memberTotal}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
