import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TrendingBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="outline" className="gap-2 border-primary/50 text-primary">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
);

const Reviews = ({
	rating,
	count,
	avatars,
}: {
	rating: number;
	count: string;
	avatars: { src: string; fallback: string }[];
}) => (
	<div className="flex items-center gap-4">
		<div className="flex -space-x-2">
			{avatars.map(({ src, fallback }, i) => (
				<Avatar key={i} className="size-8 border-2 border-background">
					<AvatarImage src={src} />
					<AvatarFallback>{fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<div className="flex items-center gap-1.5">
			<div className="flex">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-3.5 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
					/>
				))}
			</div>
			<span className="text-sm text-muted-foreground">{count}</span>
		</div>
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const ProductShowcase = ({
	images,
	badge,
}: {
	images: { src: string; alt: string }[];
	badge?: string;
}) => (
	<div className="relative">
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-7 relative aspect-[3/4] rounded-2xl overflow-hidden">
				<Image
					src={images[0].src}
					alt={images[0].alt}
					fill
					className="object-cover"
				/>
				{badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
			</div>
			<div className="col-span-5 flex flex-col gap-4">
				{images.slice(1).map(({ src, alt }, i) => (
					<div key={i} className="relative flex-1 rounded-2xl overflow-hidden">
						<Image src={src} alt={alt} fill className="object-cover" />
					</div>
				))}
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<div className="space-y-6 @md:space-y-8">
						<TrendingBadge icon={TrendingUp} text="Trending Now" />
						<Title text="The Collection Everyone is Talking About" />
						<Description text="Discover the pieces that have captured the fashion world's attention. Limited quantities available – don't miss your chance to own these iconic designs." />
						<Reviews
							rating={5}
							count="4.9 (2.4k reviews)"
							avatars={[
								{ src: 'https://i.pravatar.cc/150?img=1', fallback: 'JD' },
								{ src: 'https://i.pravatar.cc/150?img=2', fallback: 'AS' },
								{ src: 'https://i.pravatar.cc/150?img=3', fallback: 'MK' },
								{ src: 'https://i.pravatar.cc/150?img=4', fallback: 'RL' },
							]}
						/>
						<CTA
							items={[
								{
									label: 'Shop Collection',
									href: '/collection',
									icon: ShoppingBag,
								},
								{
									label: 'View Lookbook',
									href: '/lookbook',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<ProductShowcase
						images={[
							{
								src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
								alt: 'Featured look',
							},
							{
								src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop',
								alt: 'Accessory',
							},
							{
								src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop',
								alt: 'Detail shot',
							},
						]}
						badge="New Season"
					/>
				</div>
			</div>
		</section>
	);
}
