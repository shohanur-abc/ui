import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Gamepad2,
	Cpu,
	Monitor,
	Zap,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroMediaProps {
	src: string;
	alt: string;
	live?: boolean;
}

interface GameHeaderProps {
	platform: string;
	title: string;
	studio: string;
}

interface RatingDisplayProps {
	rating: number;
	reviews: number;
	metacritic: number;
}

interface PriceDisplayProps {
	price: string;
	originalPrice?: string;
	discount?: string;
}

interface EditionSelectorProps {
	editions: {
		name: string;
		price: string;
		features: string;
		selected?: boolean;
	}[];
}

interface SpecBadgeProps {
	icon: LucideIcon;
	label: string;
	value: string;
}

interface PurchaseButtonsProps {
	primary: { label: string; href: string; icon?: LucideIcon };
	secondary: { label: string; href: string; icon?: LucideIcon };
}

interface FeatureTagsProps {
	tags: string[];
}

const HeroMedia = ({ src, alt, live }: HeroMediaProps) => (
	<div className="relative aspect-video @lg:aspect-[16/10] overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		{live && (
			<div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/90 text-white text-sm">
				<span className="size-2 rounded-full bg-white animate-pulse" />
				LIVE
			</div>
		)}
	</div>
);

const GameHeader = ({ platform, title, studio }: GameHeaderProps) => (
	<div className="space-y-1">
		<div className="flex items-center gap-2">
			<Badge variant="outline">{platform}</Badge>
			<span className="text-xs text-muted-foreground">by {studio}</span>
		</div>
		<h1 className="text-2xl @xl:text-3xl font-bold tracking-tight">{title}</h1>
	</div>
);

const RatingDisplay = ({ rating, reviews, metacritic }: RatingDisplayProps) => (
	<div className="flex flex-wrap items-center gap-4">
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
			<span className="ml-1 font-medium">{rating}</span>
		</div>
		<span className="text-sm text-muted-foreground">
			{reviews.toLocaleString()} reviews
		</span>
		<Badge className="bg-green-600">{metacritic} Metacritic</Badge>
	</div>
);

const PriceDisplay = ({
	price,
	originalPrice,
	discount,
}: PriceDisplayProps) => (
	<div className="flex items-center gap-3">
		<span className="text-3xl font-bold">{price}</span>
		{originalPrice && (
			<span className="text-lg text-muted-foreground line-through">
				{originalPrice}
			</span>
		)}
		{discount && <Badge variant="destructive">{discount}</Badge>}
	</div>
);

const EditionSelector = ({ editions }: EditionSelectorProps) => (
	<div className="space-y-3">
		<span className="text-sm font-medium">Select Edition</span>
		<div className="grid gap-3">
			{editions.map((edition, i) => (
				<button
					key={i}
					className={`p-4 text-left border rounded-xl transition-all ${
						edition.selected
							? 'border-primary bg-primary/10'
							: 'hover:border-primary'
					}`}
				>
					<div className="flex items-center justify-between">
						<p className="font-medium">{edition.name}</p>
						<p className="font-bold text-primary">{edition.price}</p>
					</div>
					<p className="text-xs text-muted-foreground mt-1">
						{edition.features}
					</p>
				</button>
			))}
		</div>
	</div>
);

const SpecBadge = ({ icon: Icon, label, value }: SpecBadgeProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-3 flex items-center gap-3">
			<Icon className="size-5 text-primary" />
			<div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-sm font-medium">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const PurchaseButtons = ({ primary, secondary }: PurchaseButtonsProps) => (
	<div className="flex gap-3">
		<Button size="lg" className="flex-1 gap-2" asChild>
			<Link href={primary.href}>
				{primary.icon && <primary.icon className="size-4" />}
				{primary.label}
			</Link>
		</Button>
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={secondary.href}>
				{secondary.icon && <secondary.icon className="size-4" />}
				{secondary.label}
			</Link>
		</Button>
	</div>
);

const FeatureTags = ({ tags }: FeatureTagsProps) => (
	<div className="flex flex-wrap gap-2">
		{tags.map((tag, i) => (
			<Badge key={i} variant="outline">
				{tag}
			</Badge>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-12 gap-6">
					{/* Video/Image Hero */}
					<div className="@lg:col-span-7">
						<HeroMedia
							src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800"
							alt="Game screenshot"
							live={true}
						/>
					</div>

					{/* Game Info */}
					<div className="@lg:col-span-5 @lg:row-span-2 flex flex-col gap-5 p-6 rounded-xl bg-card border">
						<GameHeader
							platform="PC / PS5 / Xbox"
							title="Celestial Odyssey: Infinite Horizons"
							studio="Nebula Games"
						/>

						<RatingDisplay rating={5} reviews={84729} metacritic={92} />

						<PriceDisplay
							price="$59.99"
							originalPrice="$69.99"
							discount="-15%"
						/>

						<Separator />

						<EditionSelector
							editions={[
								{
									name: 'Standard Edition',
									price: '$59.99',
									features: 'Base game + Day One patch',
									selected: true,
								},
								{
									name: 'Deluxe Edition',
									price: '$79.99',
									features: 'Base game + Season Pass + Bonus content',
								},
								{
									name: 'Ultimate Edition',
									price: '$99.99',
									features: "Everything + Collector's items + Early access",
								},
							]}
						/>

						<PurchaseButtons
							primary={{
								label: 'Buy Now',
								href: '#checkout',
								icon: ShoppingCart,
							}}
							secondary={{ label: 'Wishlist', href: '#wishlist', icon: Heart }}
						/>

						<FeatureTags
							tags={[
								'Open World',
								'RPG',
								'Multiplayer',
								'Co-op',
								'Ray Tracing',
							]}
						/>
					</div>

					{/* System Requirements */}
					<div className="@lg:col-span-7 grid grid-cols-2 @sm:grid-cols-4 gap-3">
						<SpecBadge
							icon={Cpu}
							label="Processor"
							value="Intel i7 / Ryzen 7"
						/>
						<SpecBadge
							icon={Monitor}
							label="Graphics"
							value="RTX 3070 / RX 6800"
						/>
						<SpecBadge icon={Zap} label="RAM" value="16 GB" />
						<SpecBadge icon={Gamepad2} label="Storage" value="120 GB SSD" />
					</div>
				</div>
			</div>
		</section>
	);
}
