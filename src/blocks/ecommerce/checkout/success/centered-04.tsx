import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	PartyPopper,
	Gift,
	Star,
	ArrowRight,
	Share2,
	Download,
	Receipt,
} from 'lucide-react';
import Link from 'next/link';

interface RewardProps {
	points: number;
	nextTierPoints: number;
	currentTier: string;
	nextTier: string;
}

interface QuickActionProps {
	icon: React.ElementType;
	label: string;
	href: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const CelebrationIcon = () => (
	<div className="relative inline-flex">
		<div className="size-20 @md:size-24 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center rotate-3 shadow-xl">
			<PartyPopper className="size-10 @md:size-12 text-white" />
		</div>
		<div className="absolute -top-2 -right-2 size-8 rounded-full bg-primary flex items-center justify-center">
			<Star className="size-4 text-primary-foreground fill-current" />
		</div>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight text-center">
		{text}{' '}
		{highlight && (
			<span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">
				{highlight}
			</span>
		)}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center text-sm @md:text-base max-w-sm">
		{text}
	</p>
);

const OrderBadge = ({
	orderNumber,
	amount,
	currency,
}: {
	orderNumber: string;
	amount: number;
	currency: string;
}) => (
	<div className="inline-flex items-center gap-4 px-5 py-3 rounded-full bg-muted border">
		<div className="text-left">
			<p className="text-xs text-muted-foreground">Order</p>
			<p className="font-mono font-semibold text-sm">{orderNumber}</p>
		</div>
		<Separator orientation="vertical" className="h-8" />
		<div className="text-right">
			<p className="text-xs text-muted-foreground">Total</p>
			<p className="font-semibold text-sm">
				{currency}
				{amount.toFixed(2)}
			</p>
		</div>
	</div>
);

const RewardsCard = ({
	points,
	nextTierPoints,
	currentTier,
	nextTier,
}: RewardProps) => (
	<Card className="w-full max-w-sm border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
					<Gift className="size-5 text-amber-500" />
				</div>
				<div>
					<p className="font-semibold">Rewards Earned!</p>
					<p className="text-sm text-muted-foreground">
						+{points} points added
					</p>
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">{currentTier}</span>
					<span className="text-muted-foreground">{nextTier}</span>
				</div>
				<div className="h-2 rounded-full bg-muted overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
						style={{ width: `${(points / nextTierPoints) * 100}%` }}
					/>
				</div>
				<p className="text-xs text-muted-foreground text-center">
					{nextTierPoints - points} points to {nextTier}
				</p>
			</div>
		</CardContent>
	</Card>
);

const QuickAction = ({ icon: Icon, label, href }: QuickActionProps) => (
	<Link
		href={href}
		className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
	>
		<div className="size-10 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<span className="text-sm font-medium">{label}</span>
	</Link>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-sm">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8">
					<CelebrationIcon />

					<div className="space-y-3">
						<Title text="Woohoo!" highlight="Order Complete!" />
						<Description text="Your order has been placed successfully. We're preparing your items for shipment." />
					</div>

					<OrderBadge orderNumber="ORD-78432" amount={249.99} currency="$" />

					<RewardsCard
						points={250}
						nextTierPoints={1000}
						currentTier="Silver Member"
						nextTier="Gold Member"
					/>

					<div className="w-full">
						<p className="text-sm text-muted-foreground text-center mb-4">
							Quick Actions
						</p>
						<div className="grid grid-cols-3 gap-3">
							<QuickAction icon={Receipt} label="Receipt" href="/receipt" />
							<QuickAction icon={Share2} label="Share" href="/share" />
							<QuickAction icon={Download} label="Invoice" href="/invoice" />
						</div>
					</div>

					<CTA
						items={[
							{
								label: 'Track Order',
								href: '/orders/track',
								icon: ArrowRight,
							},
							{
								label: 'Shop More',
								href: '/shop',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
