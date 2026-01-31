import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Download,
	Heart,
	Play,
	ShoppingCart,
	Star,
	Video,
	Clock,
	Film,
} from 'lucide-react';
import Image from 'next/image';

interface StockVideoProps {
	thumbnail: string;
	title: string;
	creator: string;
	price: number;
	rating: number;
	sales: number;
	duration: string;
	resolution: string;
	fps: number;
	category: string;
	license: string;
}

const VideoThumbnail = ({
	src,
	alt,
	duration,
}: {
	src: string;
	alt: string;
	duration: string;
}) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
			<button className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
				<Play className="size-6 fill-primary text-primary" />
			</button>
		</div>
		<div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
			{duration}
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-white hover:bg-white/20"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const CategoryBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Film className="size-3" />
		{text}
	</Badge>
);

const VideoTitle = ({ text }: { text: string }) => (
	<h3 className="line-clamp-2 font-semibold text-foreground">{text}</h3>
);

const CreatorName = ({ name }: { name: string }) => (
	<p className="text-sm text-muted-foreground">by {name}</p>
);

const VideoRating = ({ rating, sales }: { rating: number; sales: number }) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({sales} sales)</span>
	</div>
);

const VideoSpecs = ({
	resolution,
	fps,
}: {
	resolution: string;
	fps: number;
}) => (
	<div className="flex gap-2">
		<Badge variant="outline" className="text-xs">
			{resolution}
		</Badge>
		<Badge variant="outline" className="text-xs">
			{fps} fps
		</Badge>
	</div>
);

const LicenseInfo = ({ license }: { license: string }) => (
	<p className="text-xs text-muted-foreground">{license}</p>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">${amount}</span>
);

const DownloadButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Download className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const video: StockVideoProps = {
		thumbnail:
			'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=340&fit=crop',
		title: 'Aerial Drone Footage - City Skyline at Sunset',
		creator: 'SkyView Media',
		price: 79,
		rating: 4.9,
		sales: 1234,
		duration: '0:45',
		resolution: '4K',
		fps: 60,
		category: 'Aerial',
		license: 'Standard License • Commercial Use',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<VideoThumbnail
						src={video.thumbnail}
						alt={video.title}
						duration={video.duration}
					/>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<CategoryBadge text={video.category} />
							<VideoRating rating={video.rating} sales={video.sales} />
						</div>
						<div className="space-y-0.5">
							<VideoTitle text={video.title} />
							<CreatorName name={video.creator} />
						</div>
						<VideoSpecs resolution={video.resolution} fps={video.fps} />
						<LicenseInfo license={video.license} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={video.price} />
							<DownloadButton label="Buy" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
