import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Clock, Heart, Percent, ShoppingCart, Tag, Zap } from 'lucide-react';
import Image from 'next/image';

interface DealProps {
	image: string;
	name: string;
	originalPrice: number;
	dealPrice: number;
	claimedPercent: number;
	expiresIn: string;
	couponCode: string;
}

const GlowBorder = () => (
	<div className="absolute -inset-0.5 animate-pulse rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur" />
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const DealBadge = () => (
	<Badge className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground">
		<Zap className="size-3" />
		Lightning Deal
	</Badge>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const PriceDisplay = ({
	original,
	deal,
}: {
	original: number;
	deal: number;
}) => {
	const discount = Math.round(((original - deal) / original) * 100);
	return (
		<div className="flex items-center gap-3">
			<span className="text-2xl font-bold text-primary">
				${deal.toFixed(2)}
			</span>
			<span className="text-lg text-muted-foreground line-through">
				${original.toFixed(2)}
			</span>
			<Badge variant="destructive" className="gap-1">
				<Percent className="size-3" />
				{discount}% OFF
			</Badge>
		</div>
	);
};

const ClaimProgress = ({ percent }: { percent: number }) => (
	<div className="space-y-1.5">
		<div className="flex justify-between text-xs">
			<span className="text-muted-foreground">{percent}% claimed</span>
			<span className="text-destructive">Hurry!</span>
		</div>
		<Progress value={percent} className="h-2" />
	</div>
);

const ExpiryTimer = ({ time }: { time: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Clock className="size-4 text-destructive" />
		<span>Ends in {time}</span>
	</div>
);

const CouponCode = ({ code }: { code: string }) => (
	<div className="flex items-center justify-between rounded-lg border border-dashed border-primary/50 bg-primary/5 px-3 py-2">
		<div className="flex items-center gap-2">
			<Tag className="size-4 text-primary" />
			<span className="font-mono text-sm font-medium text-primary">{code}</span>
		</div>
		<Button variant="ghost" size="sm" className="h-7 text-xs">
			Copy
		</Button>
	</div>
);

const ActionButtons = () => (
	<div className="flex gap-2">
		<Button variant="outline" size="icon">
			<Heart className="size-4" />
		</Button>
		<Button className="flex-1 gap-2">
			<ShoppingCart className="size-4" />
			Claim Deal
		</Button>
	</div>
);

export default function Main() {
	const deal: DealProps = {
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=340&fit=crop',
		name: 'Premium Wireless Headphones Pro',
		originalPrice: 349.99,
		dealPrice: 179.99,
		claimedPercent: 73,
		expiresIn: '2h 15m',
		couponCode: 'FLASH50',
	};

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-sm px-4 py-8">
				<div className="relative">
					<GlowBorder />
					<Card className="relative space-y-4 p-5">
						<DealBadge />
						<ProductImage src={deal.image} alt={deal.name} />
						<ProductName text={deal.name} />
						<PriceDisplay original={deal.originalPrice} deal={deal.dealPrice} />
						<ClaimProgress percent={deal.claimedPercent} />
						<Separator />
						<div className="flex items-center justify-between">
							<ExpiryTimer time={deal.expiresIn} />
						</div>
						<CouponCode code={deal.couponCode} />
						<ActionButtons />
					</Card>
				</div>
			</div>
		</section>
	);
}
