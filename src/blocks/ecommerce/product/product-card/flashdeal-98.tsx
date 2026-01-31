import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	Heart,
	ShoppingCart,
	Star,
	Flame,
	Clock,
	Users,
	Zap,
	TrendingUp,
} from 'lucide-react';
import Image from 'next/image';

interface FlashDealProps {
	image: string;
	name: string;
	brand: string;
	originalPrice: number;
	salePrice: number;
	rating: number;
	reviews: number;
	hoursLeft: number;
	minutesLeft: number;
	claimed: number;
	totalAvailable: number;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950/30 dark:to-orange-950/30">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
		/>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const FlashBadge = () => (
	<Badge className="absolute left-3 top-3 animate-pulse gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white">
		<Flame className="size-3" />
		Flash Deal
	</Badge>
);

const DiscountBadge = ({
	original,
	sale,
}: {
	original: number;
	sale: number;
}) => {
	const discount = Math.round(((original - sale) / original) * 100);
	return (
		<Badge variant="destructive" className="gap-1 text-sm font-bold">
			-{discount}%
		</Badge>
	);
};

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ProductRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const CountdownTimer = ({
	hours,
	minutes,
}: {
	hours: number;
	minutes: number;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 dark:bg-red-950/50">
		<Clock className="size-4 text-red-500" />
		<span className="font-mono font-bold text-red-600 dark:text-red-400">
			{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
			:00
		</span>
		<span className="text-sm text-red-600/70 dark:text-red-400/70">left</span>
	</div>
);

const ClaimProgress = ({
	claimed,
	total,
}: {
	claimed: number;
	total: number;
}) => {
	const percent = (claimed / total) * 100;
	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-sm">
				<span className="flex items-center gap-1.5 text-muted-foreground">
					<Users className="size-4" />
					{claimed} claimed
				</span>
				<span
					className={`font-medium ${percent > 80 ? 'text-destructive' : 'text-foreground'}`}
				>
					{total - claimed} left
				</span>
			</div>
			<Progress
				value={percent}
				className="h-2 bg-red-100 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-orange-500"
			/>
		</div>
	);
};

const PriceDisplay = ({
	original,
	sale,
}: {
	original: number;
	sale: number;
}) => (
	<div className="flex items-baseline gap-2">
		<span className="text-2xl font-bold text-destructive">
			${sale.toFixed(2)}
		</span>
		<span className="text-sm text-muted-foreground line-through">
			${original.toFixed(2)}
		</span>
	</div>
);

const GrabButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600">
		<Zap className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const flash: FlashDealProps = {
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
		name: 'Wireless Noise-Cancelling Headphones',
		brand: 'SoundMax',
		originalPrice: 299.99,
		salePrice: 149.99,
		rating: 4.6,
		reviews: 2341,
		hoursLeft: 2,
		minutesLeft: 45,
		claimed: 847,
		totalAvailable: 1000,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-red-200/50 shadow-lg shadow-red-500/10 dark:border-red-800/30">
					<div className="relative">
						<ProductImage src={flash.image} alt={flash.name} />
						<FlashBadge />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<DiscountBadge
								original={flash.originalPrice}
								sale={flash.salePrice}
							/>
							<ProductRating rating={flash.rating} reviews={flash.reviews} />
						</div>
						<BrandLabel text={flash.brand} />
						<ProductName text={flash.name} />
						<CountdownTimer
							hours={flash.hoursLeft}
							minutes={flash.minutesLeft}
						/>
						<ClaimProgress
							claimed={flash.claimed}
							total={flash.totalAvailable}
						/>
						<Separator />
						<PriceDisplay
							original={flash.originalPrice}
							sale={flash.salePrice}
						/>
						<GrabButton label="Grab Deal Now" />
					</div>
				</Card>
			</div>
		</section>
	);
}
