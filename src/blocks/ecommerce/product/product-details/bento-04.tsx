import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Star,
	ShoppingCart,
	Heart,
	Flame,
	Users,
	Clock,
	ChefHat,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroImageProps {
	src: string;
	alt: string;
	badges: string[];
}

interface ProductInfoProps {
	category: string;
	name: string;
	description: string;
}

interface RatingBlockProps {
	rating: number;
	reviews: number;
}

interface PriceTagProps {
	price: string;
	unit: string;
}

interface NutritionCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
	percentage: number;
}

interface QuantityPickerProps {
	label: string;
	options: number[];
	selected: number;
}

interface SubscriptionOptionProps {
	options: { label: string; discount: string; selected?: boolean }[];
}

interface CTAButtonsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const HeroImage = ({ src, alt, badges }: HeroImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute top-4 left-4 flex flex-wrap gap-2">
			{badges.map((badge, i) => (
				<Badge key={i} className="bg-primary/90 backdrop-blur-sm">
					{badge}
				</Badge>
			))}
		</div>
	</div>
);

const ProductInfo = ({ category, name, description }: ProductInfoProps) => (
	<div className="space-y-2">
		<p className="text-sm text-primary font-medium uppercase tracking-wider">
			{category}
		</p>
		<h1 className="text-2xl @lg:text-3xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

const RatingBlock = ({ rating, reviews }: RatingBlockProps) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium">{rating}</span>
		<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
	</div>
);

const PriceTag = ({ price, unit }: PriceTagProps) => (
	<div className="flex items-baseline gap-1">
		<span className="text-3xl font-bold text-primary">{price}</span>
		<span className="text-muted-foreground">/{unit}</span>
	</div>
);

const NutritionCard = ({
	icon: Icon,
	label,
	value,
	percentage,
}: NutritionCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-3 space-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-4 text-primary" />
					<span className="text-sm font-medium">{label}</span>
				</div>
				<span className="text-sm">{value}</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
		</CardContent>
	</Card>
);

const QuantityPicker = ({ label, options, selected }: QuantityPickerProps) => (
	<div className="space-y-2">
		<span className="text-sm font-medium">{label}</span>
		<div className="flex gap-2">
			{options.map((opt, i) => (
				<button
					key={i}
					className={`px-4 py-2 text-sm border rounded-lg transition-all ${
						opt === selected
							? 'border-primary bg-primary/10'
							: 'hover:border-primary'
					}`}
				>
					{opt}
				</button>
			))}
		</div>
	</div>
);

const SubscriptionOption = ({ options }: SubscriptionOptionProps) => (
	<div className="space-y-2">
		<span className="text-sm font-medium">Delivery</span>
		<div className="grid grid-cols-2 gap-2">
			{options.map((opt, i) => (
				<button
					key={i}
					className={`p-3 text-center border rounded-lg transition-all ${
						opt.selected
							? 'border-primary bg-primary/10'
							: 'hover:border-primary'
					}`}
				>
					<p className="text-sm font-medium">{opt.label}</p>
					<p className="text-xs text-green-600">{opt.discount}</p>
				</button>
			))}
		</div>
	</div>
);

const CTAButtons = ({ buttons }: CTAButtonsProps) => (
	<div className="flex gap-3">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className={`gap-2 ${i === 0 ? 'flex-1' : ''}`}
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-4" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-12 gap-4">
					{/* Main Image */}
					<div className="@lg:col-span-5 @lg:row-span-2">
						<HeroImage
							src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
							alt="Gourmet meal"
							badges={['Organic', "Chef's Pick"]}
						/>
					</div>

					{/* Product Details */}
					<div className="@lg:col-span-7 flex flex-col gap-4 p-6 rounded-xl bg-card border">
						<ProductInfo
							category="Gourmet Meals"
							name="Mediterranean Grilled Salmon Bowl"
							description="Fresh Atlantic salmon with quinoa, roasted vegetables, and house-made tzatziki. High in protein and omega-3 fatty acids."
						/>

						<RatingBlock rating={5} reviews={1247} />

						<PriceTag price="$24.99" unit="serving" />

						<div className="grid grid-cols-2 gap-3">
							<QuantityPicker
								label="Servings"
								options={[1, 2, 4, 6]}
								selected={2}
							/>
							<SubscriptionOption
								options={[
									{ label: 'One-time', discount: 'Standard price' },
									{ label: 'Subscribe', discount: 'Save 15%', selected: true },
								]}
							/>
						</div>

						<CTAButtons
							buttons={[
								{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
								{
									label: 'Save',
									href: '#wishlist',
									icon: Heart,
									variant: 'outline',
								},
							]}
						/>
					</div>

					{/* Nutrition Cards */}
					<div className="@lg:col-span-7 grid @sm:grid-cols-2 @lg:grid-cols-4 gap-3">
						<NutritionCard
							icon={Flame}
							label="Calories"
							value="450"
							percentage={23}
						/>
						<NutritionCard
							icon={Users}
							label="Protein"
							value="35g"
							percentage={70}
						/>
						<NutritionCard
							icon={Clock}
							label="Prep Time"
							value="15min"
							percentage={15}
						/>
						<NutritionCard
							icon={ChefHat}
							label="Skill Level"
							value="Easy"
							percentage={30}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
