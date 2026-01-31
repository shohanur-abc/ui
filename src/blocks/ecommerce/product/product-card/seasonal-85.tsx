import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Heart,
	Leaf,
	ShoppingCart,
	Snowflake,
	Star,
	Sun,
	Clock,
} from 'lucide-react';
import Image from 'next/image';

interface SeasonalProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	originalPrice: number;
	rating: number;
	reviews: number;
	season: string;
	seasonIcon: string;
	endsIn: { days: number; hours: number };
	limitedStock: boolean;
	stockPercent: number;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const SeasonBadge = ({ season, icon }: { season: string; icon: string }) => {
	const icons: Record<string, React.ReactNode> = {
		winter: <Snowflake className="size-3" />,
		summer: <Sun className="size-3" />,
		spring: <Leaf className="size-3" />,
		fall: <Leaf className="size-3" />,
	};
	const colors: Record<string, string> = {
		winter: 'bg-blue-500',
		summer: 'bg-amber-500',
		spring: 'bg-green-500',
		fall: 'bg-orange-500',
	};
	return (
		<Badge
			className={`absolute left-3 top-3 gap-1 ${colors[icon] || 'bg-primary'}`}
		>
			{icons[icon] || <Calendar className="size-3" />}
			{season}
		</Badge>
	);
};

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-wider text-primary">
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

const CountdownTimer = ({ days, hours }: { days: number; hours: number }) => (
	<div className="rounded-lg bg-destructive/10 p-3">
		<div className="flex items-center justify-center gap-2 text-sm">
			<Clock className="size-4 text-destructive" />
			<span className="text-muted-foreground">Season ends in</span>
			<div className="flex items-center gap-1">
				<span className="rounded bg-destructive px-1.5 py-0.5 font-mono font-bold text-destructive-foreground">
					{days}d
				</span>
				<span className="rounded bg-destructive px-1.5 py-0.5 font-mono font-bold text-destructive-foreground">
					{hours}h
				</span>
			</div>
		</div>
	</div>
);

const StockIndicator = ({ percent }: { percent: number }) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">Seasonal stock</span>
			<span
				className={percent < 30 ? 'text-destructive' : 'text-muted-foreground'}
			>
				{percent}% remaining
			</span>
		</div>
		<Progress value={percent} className="h-2" />
	</div>
);

const PriceDisplay = ({
	price,
	original,
}: {
	price: number;
	original: number;
}) => (
	<div className="space-y-0.5">
		<div className="flex items-baseline gap-2">
			<span className="text-xl font-bold text-foreground">
				${price.toFixed(2)}
			</span>
			<span className="text-sm text-muted-foreground line-through">
				${original.toFixed(2)}
			</span>
		</div>
		<Badge variant="destructive" className="text-xs">
			Save ${(original - price).toFixed(0)}
		</Badge>
	</div>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const seasonal: SeasonalProps = {
		image:
			'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=400&fit=crop',
		name: 'Winter Essentials Kit',
		brand: 'Cozy Home',
		price: 49.99,
		originalPrice: 79.99,
		rating: 4.8,
		reviews: 567,
		season: 'Winter Collection',
		seasonIcon: 'winter',
		endsIn: { days: 12, hours: 8 },
		limitedStock: true,
		stockPercent: 23,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ProductImage src={seasonal.image} alt={seasonal.name} />
						<SeasonBadge season={seasonal.season} icon={seasonal.seasonIcon} />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={seasonal.brand} />
							<ProductRating
								rating={seasonal.rating}
								reviews={seasonal.reviews}
							/>
						</div>
						<ProductName text={seasonal.name} />
						<CountdownTimer
							days={seasonal.endsIn.days}
							hours={seasonal.endsIn.hours}
						/>
						{seasonal.limitedStock && (
							<StockIndicator percent={seasonal.stockPercent} />
						)}
						<Separator />
						<div className="flex items-center justify-between">
							<PriceDisplay
								price={seasonal.price}
								original={seasonal.originalPrice}
							/>
							<AddButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
