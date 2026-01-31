import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	Star,
	ShoppingCart,
	Heart,
	Share2,
	ChevronLeft,
	ChevronRight,
	Check,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CarouselImageProps {
	images: { src: string; alt: string }[];
	currentIndex: number;
}

interface BrandHeaderProps {
	logo: string;
	name: string;
	verified: boolean;
}

interface TitleBlockProps {
	title: string;
	subtitle: string;
}

interface RatingBreakdownProps {
	average: number;
	total: number;
	breakdown: { stars: number; percentage: number }[];
}

interface PriceBlockProps {
	current: string;
	original?: string;
	installment?: string;
}

interface StockIndicatorProps {
	available: number;
	total: number;
	text: string;
}

interface OptionSelectorProps {
	title: string;
	options: string[];
	selected: string;
}

interface ActionBarProps {
	actions: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const CarouselImage = ({ images, currentIndex }: CarouselImageProps) => (
	<div className="relative">
		<div className="aspect-square overflow-hidden rounded-xl bg-muted/30">
			<Image
				src={images[currentIndex].src}
				alt={images[currentIndex].alt}
				fill
				className="object-cover"
			/>
		</div>
		<button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
			<ChevronLeft className="size-5" />
		</button>
		<button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
			<ChevronRight className="size-5" />
		</button>
		<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
			{images.map((_, i) => (
				<div
					key={i}
					className={`size-2 rounded-full transition-colors ${i === currentIndex ? 'bg-primary' : 'bg-background/60'}`}
				/>
			))}
		</div>
	</div>
);

const BrandHeader = ({ logo, name, verified }: BrandHeaderProps) => (
	<div className="flex items-center gap-3">
		<div className="size-10 rounded-full overflow-hidden bg-muted">
			<Image
				src={logo}
				alt={name}
				width={40}
				height={40}
				className="object-cover"
			/>
		</div>
		<div className="flex items-center gap-2">
			<span className="font-medium">{name}</span>
			{verified && (
				<Badge variant="secondary" className="gap-1 text-xs">
					<Check className="size-3" /> Verified
				</Badge>
			)}
		</div>
	</div>
);

const TitleBlock = ({ title, subtitle }: TitleBlockProps) => (
	<div className="space-y-1">
		<h1 className="text-2xl @sm:text-3xl @xl:text-4xl font-bold tracking-tight leading-tight">
			{title}
		</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const RatingBreakdown = ({
	average,
	total,
	breakdown,
}: RatingBreakdownProps) => (
	<div className="grid @sm:grid-cols-[auto_1fr] gap-4 @sm:gap-6">
		<div className="text-center @sm:text-left">
			<div className="text-4xl font-bold">{average}</div>
			<div className="flex items-center justify-center @sm:justify-start gap-0.5 my-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < Math.floor(average) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
					/>
				))}
			</div>
			<p className="text-sm text-muted-foreground">
				{total.toLocaleString()} reviews
			</p>
		</div>
		<div className="space-y-1.5">
			{breakdown.map((item, i) => (
				<div key={i} className="flex items-center gap-2 text-sm">
					<span className="w-4">{item.stars}</span>
					<Star className="size-3 fill-yellow-400 text-yellow-400" />
					<Progress value={item.percentage} className="flex-1 h-2" />
					<span className="w-8 text-muted-foreground">{item.percentage}%</span>
				</div>
			))}
		</div>
	</div>
);

const PriceBlock = ({ current, original, installment }: PriceBlockProps) => (
	<div className="space-y-1">
		<div className="flex items-baseline gap-3">
			<span className="text-3xl font-bold text-primary">{current}</span>
			{original && (
				<span className="text-lg text-muted-foreground line-through">
					{original}
				</span>
			)}
		</div>
		{installment && (
			<p className="text-sm text-muted-foreground">{installment}</p>
		)}
	</div>
);

const StockIndicator = ({ available, total, text }: StockIndicatorProps) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">{text}</span>
			<span className="font-medium">{available} left</span>
		</div>
		<Progress value={(available / total) * 100} className="h-2" />
	</div>
);

const OptionSelector = ({ title, options, selected }: OptionSelectorProps) => (
	<div className="space-y-3">
		<span className="text-sm font-medium">
			{title}: <span className="text-muted-foreground">{selected}</span>
		</span>
		<div className="flex flex-wrap gap-2">
			{options.map((option, i) => (
				<button
					key={i}
					className={`px-4 py-2 text-sm border rounded-lg transition-all ${option === selected ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
				>
					{option}
				</button>
			))}
		</div>
	</div>
);

const ActionBar = ({ actions }: ActionBarProps) => (
	<div className="flex gap-2">
		{actions.map((action, i) => (
			<Button
				key={i}
				variant={action.variant || 'default'}
				size="lg"
				className="flex-1 gap-2"
				asChild
			>
				<Link href={action.href}>
					{action.icon && <action.icon className="size-4" />}
					{action.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					{/* Image Carousel */}
					<div className="space-y-4">
						<CarouselImage
							images={[
								{
									src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
									alt: 'Headphones front view',
								},
								{
									src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
									alt: 'Headphones side view',
								},
								{
									src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
									alt: 'Headphones back view',
								},
								{
									src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
									alt: 'Headphones detail',
								},
							]}
							currentIndex={0}
						/>
						<div className="flex justify-center gap-2">
							<Button variant="ghost" size="icon">
								<Heart className="size-5" />
							</Button>
							<Button variant="ghost" size="icon">
								<Share2 className="size-5" />
							</Button>
						</div>
					</div>

					{/* Product Info */}
					<div className="flex flex-col gap-6">
						<BrandHeader
							logo="https://avatars.githubusercontent.com/u/252440198?v=4"
							name="SoundTech Audio"
							verified={true}
						/>

						<TitleBlock
							title="Studio Pro Wireless Over-Ear Headphones"
							subtitle="Premium noise-cancelling headphones with Hi-Res Audio certification"
						/>

						<RatingBreakdown
							average={4.8}
							total={3249}
							breakdown={[
								{ stars: 5, percentage: 78 },
								{ stars: 4, percentage: 15 },
								{ stars: 3, percentage: 4 },
								{ stars: 2, percentage: 2 },
								{ stars: 1, percentage: 1 },
							]}
						/>

						<Separator />

						<PriceBlock
							current="$349"
							original="$449"
							installment="or 4 interest-free payments of $87.25"
						/>

						<StockIndicator available={12} total={50} text="Limited stock" />

						<OptionSelector
							title="Color"
							options={['Midnight Black', 'Silver', 'Rose Gold']}
							selected="Midnight Black"
						/>

						<ActionBar
							actions={[
								{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
								{ label: 'Buy Now', href: '#checkout' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
