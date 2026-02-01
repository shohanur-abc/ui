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
	Gift,
	Minus,
	Plus,
	ShoppingBag,
	Star,
	Trophy,
	Zap,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	xpEarned: number;
}

interface Achievement {
	id: string;
	name: string;
	icon: 'trophy' | 'star' | 'zap' | 'gift';
	progress: number;
	target: number;
	reward: string;
}

interface GamificationInfo {
	level: number;
	currentXp: number;
	nextLevelXp: number;
	streak: number;
	achievements: Achievement[];
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
	gamification: GamificationInfo;
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

const AchievementIcon = ({ icon }: { icon: Achievement['icon'] }) => {
	const icons = { trophy: Trophy, star: Star, zap: Zap, gift: Gift };
	const Icon = icons[icon];
	return <Icon className="size-4" />;
};

const GamificationBanner = ({
	gamification,
	xpToEarn,
}: {
	gamification: GamificationInfo;
	xpToEarn: number;
}) => {
	const levelProgress =
		(gamification.currentXp / gamification.nextLevelXp) * 100;

	return (
		<div className="rounded-xl bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-purple-500/20 p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="size-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
							{gamification.level}
						</div>
						<div className="absolute -right-1 -bottom-1 size-5 rounded-full bg-orange-500 flex items-center justify-center">
							<Zap className="size-3 text-white" />
						</div>
					</div>
					<div>
						<span className="font-semibold">Level {gamification.level}</span>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<span>🔥 {gamification.streak} day streak</span>
						</div>
					</div>
				</div>
				<div className="text-right">
					<span className="text-lg font-bold text-purple-600">
						+{xpToEarn} XP
					</span>
					<p className="text-xs text-muted-foreground">This order</p>
				</div>
			</div>
			<div className="space-y-1.5">
				<div className="flex justify-between text-xs">
					<span>Level {gamification.level}</span>
					<span>
						{gamification.currentXp} / {gamification.nextLevelXp} XP
					</span>
				</div>
				<Progress
					value={levelProgress}
					className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500"
				/>
			</div>
			<div className="space-y-2">
				<span className="text-xs font-medium text-muted-foreground">
					Active Challenges
				</span>
				<div className="space-y-1.5">
					{gamification.achievements.slice(0, 2).map((achievement) => (
						<div
							key={achievement.id}
							className="flex items-center gap-2 rounded-lg bg-background/60 p-2"
						>
							<div className="rounded-full bg-purple-500/20 p-1.5 text-purple-600">
								<AchievementIcon icon={achievement.icon} />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<span className="text-xs font-medium truncate">
										{achievement.name}
									</span>
									<span className="text-[10px] text-muted-foreground">
										{achievement.progress}/{achievement.target}
									</span>
								</div>
								<Progress
									value={(achievement.progress / achievement.target) * 100}
									className="h-1 mt-1"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const ItemRow = ({ item }: { item: CartItem }) => (
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
				<Zap className="size-3 text-purple-500" />
				<span className="text-xs text-purple-600">+{item.xpEarned} XP</span>
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
		<Button
			className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
			size="lg"
		>
			<Zap className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Checkout & Earn XP',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
				xpEarned: 130,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
				xpEarned: 180,
			},
		],
		gamification: {
			level: 12,
			currentXp: 850,
			nextLevelXp: 1000,
			streak: 7,
			achievements: [
				{
					id: '1',
					name: 'Shoe Collector',
					icon: 'trophy',
					progress: 4,
					target: 5,
					reward: '$10 coupon',
				},
				{
					id: '2',
					name: 'Weekly Warrior',
					icon: 'zap',
					progress: 2,
					target: 3,
					reward: '2x XP',
				},
			],
		},
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const xpToEarn = cartData.items.reduce(
		(sum, item) => sum + item.xpEarned * item.quantity,
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
						<GamificationBanner
							gamification={cartData.gamification}
							xpToEarn={xpToEarn}
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
