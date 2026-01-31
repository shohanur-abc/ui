import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	Share2,
	Instagram,
	Twitter,
	Facebook,
	ArrowRight,
	Camera,
	Gift,
} from 'lucide-react';
import Link from 'next/link';

interface SocialShareProps {
	platform: string;
	icon: React.ElementType;
	color: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const ProductShowcase = () => (
	<div className="relative h-full min-h-[350px] @lg:min-h-0 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/20 dark:to-pink-950/30 flex items-center justify-center overflow-hidden">
		<div className="absolute inset-0">
			<div className="absolute top-1/4 right-1/4 size-64 rounded-full bg-rose-200/50 dark:bg-rose-800/20 blur-3xl" />
			<div className="absolute bottom-1/4 left-1/4 size-48 rounded-full bg-pink-200/50 dark:bg-pink-800/20 blur-3xl" />
		</div>
		<div className="relative">
			<div className="size-48 @xl:size-56 rounded-2xl bg-background shadow-2xl flex items-center justify-center rotate-3 border">
				<Gift className="size-20 text-rose-400" />
			</div>
			<div className="absolute -bottom-4 -right-4 size-20 rounded-xl bg-background shadow-lg flex items-center justify-center -rotate-6 border">
				<Heart className="size-8 text-rose-500 fill-rose-500" />
			</div>
		</div>
	</div>
);

const Title = ({ text, emoji }: { text: string; emoji?: string }) => (
	<h1 className="text-2xl @xl:text-3xl font-bold">
		{text} {emoji && <span>{emoji}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground">{text}</p>
);

const OrderConfirmation = ({
	orderNumber,
	itemCount,
}: {
	orderNumber: string;
	itemCount: number;
}) => (
	<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted border">
		<Badge variant="secondary">{itemCount} items</Badge>
		<span className="font-mono font-semibold text-sm">{orderNumber}</span>
	</div>
);

const SocialShareButton = ({
	platform,
	icon: Icon,
	color,
}: SocialShareProps) => (
	<button
		className={`size-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color}`}
	>
		<Icon className="size-5" />
	</button>
);

const SocialShare = ({ platforms }: { platforms: SocialShareProps[] }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<Share2 className="size-4 text-muted-foreground" />
			<p className="text-sm font-medium">Share Your Purchase</p>
		</div>
		<div className="flex items-center gap-3">
			{platforms.map((platform, i) => (
				<SocialShareButton key={i} {...platform} />
			))}
		</div>
	</div>
);

const PhotoContest = () => (
	<Card className="border-rose-200 dark:border-rose-800/30 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
					<Camera className="size-6 text-rose-500" />
				</div>
				<div>
					<p className="font-semibold">Share & Win!</p>
					<p className="text-sm text-muted-foreground mt-1">
						Post a photo with your order and tag us for a chance to win a $100
						gift card!
					</p>
					<div className="flex items-center gap-2 mt-3">
						<Badge variant="outline" className="text-rose-600 border-rose-300">
							#MyPurchase
						</Badge>
						<Badge variant="outline" className="text-rose-600 border-rose-300">
							#ShopWithUs
						</Badge>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ReferralOffer = () => (
	<div className="p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-center gap-3">
			<Gift className="size-6 text-primary" />
			<div className="flex-1">
				<p className="font-medium">Give $10, Get $10</p>
				<p className="text-sm text-muted-foreground">
					Share your referral code with friends
				</p>
			</div>
			<Button variant="outline" size="sm">
				Share
			</Button>
		</div>
	</div>
);

const TotalSaved = ({
	saved,
	currency,
}: {
	saved: number;
	currency: string;
}) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
		<p className="text-sm text-muted-foreground">You saved</p>
		<p className="text-2xl font-bold text-primary">
			{currency}
			{saved.toFixed(2)}
		</p>
		<p className="text-xs text-muted-foreground mt-1">on this order</p>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
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
	const socialPlatforms: SocialShareProps[] = [
		{
			platform: 'Instagram',
			icon: Instagram,
			color: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
		},
		{
			platform: 'Twitter',
			icon: Twitter,
			color: 'bg-sky-500 text-white',
		},
		{
			platform: 'Facebook',
			icon: Facebook,
			color: 'bg-blue-600 text-white',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<ProductShowcase />

					<div className="space-y-6">
						<div className="space-y-3">
							<Title text="Thanks for your order!" emoji="🎉" />
							<Description text="We're so excited for you! Your items are being prepared with love." />
						</div>

						<OrderConfirmation orderNumber="ORD-2024-78432" itemCount={3} />

						<TotalSaved saved={45.0} currency="$" />

						<SocialShare platforms={socialPlatforms} />

						<PhotoContest />

						<ReferralOffer />

						<CTA
							items={[
								{ label: 'Track Order', href: '/track', icon: ArrowRight },
								{ label: 'Shop More', href: '/shop', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
