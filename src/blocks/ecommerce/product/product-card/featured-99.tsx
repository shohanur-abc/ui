import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Heart,
	Star,
	MessageCircle,
	Share2,
	Eye,
	Bookmark,
	Award,
} from 'lucide-react';
import Image from 'next/image';

interface FeaturedProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	description: string;
	curator: {
		name: string;
		avatar: string;
		title: string;
	};
	views: number;
	saves: number;
	featured: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const FeaturedBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
		<Award className="size-3" />
		Featured
	</Badge>
);

const CuratorSection = ({
	name,
	avatar,
	title,
}: {
	name: string;
	avatar: string;
	title: string;
}) => (
	<div className="flex items-center gap-2">
		<Avatar className="size-8">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{name[0]}</AvatarFallback>
		</Avatar>
		<div className="flex flex-col">
			<span className="text-xs font-medium text-foreground">{name}</span>
			<span className="text-[10px] text-muted-foreground">{title}</span>
		</div>
	</div>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-bold uppercase tracking-wider text-primary">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold text-foreground">{text}</h3>
);

const ProductDescription = ({ text }: { text: string }) => (
	<p className="line-clamp-2 text-sm text-muted-foreground">{text}</p>
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

const EngagementStats = ({
	views,
	saves,
}: {
	views: number;
	saves: number;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
			<Eye className="size-4" />
			{views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
		</div>
		<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
			<Bookmark className="size-4" />
			{saves >= 1000 ? `${(saves / 1000).toFixed(1)}k` : saves}
		</div>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const ActionButtons = () => (
	<div className="flex items-center gap-2">
		<Button size="icon-sm" variant="outline">
			<Share2 className="size-4" />
		</Button>
		<Button size="icon-sm" variant="outline">
			<Bookmark className="size-4" />
		</Button>
		<Button className="gap-2">View Details</Button>
	</div>
);

export default function Main() {
	const featured: FeaturedProps = {
		image:
			'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=450&fit=crop',
		name: 'Artisan Leather Messenger Bag',
		brand: 'Heritage Craft',
		price: 389.0,
		rating: 4.9,
		reviews: 234,
		description:
			'Handcrafted from full-grain Italian leather, this timeless messenger bag combines classic design with modern functionality.',
		curator: {
			name: 'Sarah Chen',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			title: 'Style Editor',
		},
		views: 12400,
		saves: 892,
		featured: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden border-violet-200/50 shadow-xl shadow-violet-500/5 dark:border-violet-800/30">
					<div className="relative">
						<ProductImage src={featured.image} alt={featured.name} />
						{featured.featured && <FeaturedBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<CuratorSection {...featured.curator} />
							<ProductRating
								rating={featured.rating}
								reviews={featured.reviews}
							/>
						</div>
						<BrandLabel text={featured.brand} />
						<ProductName text={featured.name} />
						<ProductDescription text={featured.description} />
						<EngagementStats views={featured.views} saves={featured.saves} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={featured.price} />
							<ActionButtons />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
