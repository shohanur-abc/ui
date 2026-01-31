import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingBag,
	Heart,
	Truck,
	RotateCcw,
	CreditCard,
	Award,
	MapPin,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductMediaProps {
	main: { src: string; alt: string };
	thumbnails: { src: string; alt: string }[];
}

interface LabelGroupProps {
	labels: {
		text: string;
		variant?: 'default' | 'secondary' | 'outline' | 'destructive';
	}[];
}

interface ProductTitleProps {
	name: string;
	tagline: string;
}

interface ReviewSummaryProps {
	rating: number;
	count: number;
	recommendation: number;
}

interface PriceDisplayProps {
	amount: string;
	currency: string;
	period?: string;
}

interface BenefitListProps {
	items: { icon: LucideIcon; text: string }[];
}

interface VariantGridProps {
	title: string;
	variants: { id: string; label: string; image?: string; price?: string }[];
}

interface DeliveryInfoProps {
	location: string;
	date: string;
	cost: string;
}

interface PurchaseActionsProps {
	primary: { label: string; href: string };
	secondary: { label: string; href: string; icon: LucideIcon };
}

const ProductMedia = ({ main, thumbnails }: ProductMediaProps) => (
	<div className="space-y-4">
		<div className="relative aspect-[4/3] @lg:aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50">
			<Image src={main.src} alt={main.alt} fill className="object-cover" />
		</div>
		<div className="flex gap-2 overflow-x-auto pb-2">
			{thumbnails.map((thumb, i) => (
				<div
					key={i}
					className="relative shrink-0 size-16 @sm:size-20 rounded-lg overflow-hidden bg-muted cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all"
				>
					<Image
						src={thumb.src}
						alt={thumb.alt}
						fill
						className="object-cover"
					/>
				</div>
			))}
		</div>
	</div>
);

const LabelGroup = ({ labels }: LabelGroupProps) => (
	<div className="flex flex-wrap gap-2">
		{labels.map((label, i) => (
			<Badge key={i} variant={label.variant || 'default'}>
				{label.text}
			</Badge>
		))}
	</div>
);

const ProductTitle = ({ name, tagline }: ProductTitleProps) => (
	<div className="space-y-1">
		<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{name}
		</h1>
		<p className="text-muted-foreground">{tagline}</p>
	</div>
);

const ReviewSummary = ({
	rating,
	count,
	recommendation,
}: ReviewSummaryProps) => (
	<div className="flex flex-wrap items-center gap-4">
		<div className="flex items-center gap-1.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
			<span className="ml-1 font-medium">{rating}</span>
		</div>
		<span className="text-sm text-muted-foreground">
			{count.toLocaleString()} reviews
		</span>
		<Badge variant="outline" className="gap-1">
			<Award className="size-3" />
			{recommendation}% recommend
		</Badge>
	</div>
);

const PriceDisplay = ({ amount, currency, period }: PriceDisplayProps) => (
	<div className="flex items-baseline gap-1">
		<span className="text-sm text-muted-foreground">{currency}</span>
		<span className="text-4xl @xl:text-5xl font-bold">{amount}</span>
		{period && <span className="text-sm text-muted-foreground">/{period}</span>}
	</div>
);

const BenefitList = ({ items }: BenefitListProps) => (
	<div className="grid @sm:grid-cols-2 gap-2">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<item.icon className="size-4 text-primary" />
				<span>{item.text}</span>
			</div>
		))}
	</div>
);

const VariantGrid = ({ title, variants }: VariantGridProps) => (
	<div className="space-y-3">
		<h3 className="font-medium">{title}</h3>
		<div className="grid grid-cols-2 @sm:grid-cols-3 gap-2">
			{variants.map((variant, i) => (
				<Card
					key={i}
					className="cursor-pointer hover:border-primary transition-colors bg-muted/30"
				>
					<CardContent className="p-3 text-center">
						{variant.image && (
							<div className="relative aspect-square mb-2 rounded-md overflow-hidden bg-muted">
								<Image
									src={variant.image}
									alt={variant.label}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<p className="text-sm font-medium">{variant.label}</p>
						{variant.price && (
							<p className="text-xs text-muted-foreground">{variant.price}</p>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

const DeliveryInfo = ({ location, date, cost }: DeliveryInfoProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-4">
			<div className="flex items-start gap-3">
				<Truck className="size-5 text-primary shrink-0 mt-0.5" />
				<div className="flex-1 space-y-1">
					<div className="flex items-center gap-2 text-sm">
						<MapPin className="size-3" />
						<span>Deliver to {location}</span>
					</div>
					<p className="font-medium">{date}</p>
					<p className="text-sm text-muted-foreground">{cost}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PurchaseActions = ({ primary, secondary }: PurchaseActionsProps) => (
	<div className="grid @sm:grid-cols-2 gap-3">
		<Button size="lg" className="w-full" asChild>
			<Link href={primary.href}>{primary.label}</Link>
		</Button>
		<Button size="lg" variant="outline" className="w-full gap-2" asChild>
			<Link href={secondary.href}>
				<secondary.icon className="size-4" />
				{secondary.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-start">
					{/* Media Column */}
					<div className="@lg:sticky @lg:top-8">
						<ProductMedia
							main={{
								src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
								alt: 'Smart watch on wrist',
							}}
							thumbnails={[
								{
									src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									alt: 'Watch front',
								},
								{
									src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									alt: 'Watch side',
								},
								{
									src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									alt: 'Watch back',
								},
								{
									src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									alt: 'Watch band',
								},
								{
									src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									alt: 'Watch box',
								},
							]}
						/>
					</div>

					{/* Details Column */}
					<div className="flex flex-col gap-6">
						<LabelGroup
							labels={[
								{ text: 'New Release' },
								{ text: 'Bestseller', variant: 'secondary' },
							]}
						/>

						<ProductTitle
							name="Apex Series 8 Pro Smart Watch"
							tagline="Advanced health monitoring with titanium build"
						/>

						<ReviewSummary rating={5} count={8472} recommendation={96} />

						<PriceDisplay amount="599" currency="$" />

						<Separator />

						<BenefitList
							items={[
								{ icon: Truck, text: 'Free express shipping' },
								{ icon: RotateCcw, text: '60-day free returns' },
								{ icon: CreditCard, text: '0% APR financing' },
								{ icon: Award, text: '2-year warranty' },
							]}
						/>

						<Separator />

						<VariantGrid
							title="Choose your style"
							variants={[
								{
									id: '1',
									label: 'Space Black',
									image:
										'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									price: '$599',
								},
								{
									id: '2',
									label: 'Silver',
									image:
										'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									price: '$599',
								},
								{
									id: '3',
									label: 'Gold',
									image:
										'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
									price: '$649',
								},
							]}
						/>

						<DeliveryInfo
							location="New York, NY"
							date="Get it by Tomorrow, Feb 2"
							cost="FREE delivery on orders over $50"
						/>

						<PurchaseActions
							primary={{ label: 'Buy Now', href: '#checkout' }}
							secondary={{
								label: 'Add to Bag',
								href: '#cart',
								icon: ShoppingBag,
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
