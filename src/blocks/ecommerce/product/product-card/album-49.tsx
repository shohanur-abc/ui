import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Heart,
	Music,
	Pause,
	Play,
	Share2,
	Star,
	Clock,
	Download,
} from 'lucide-react';
import Image from 'next/image';

interface AlbumProps {
	cover: string;
	title: string;
	artist: string;
	price: number;
	rating: number;
	reviews: number;
	tracks: number;
	duration: string;
	genre: string;
	releaseYear: number;
	isPlaying: boolean;
}

const AlbumCover = ({
	src,
	alt,
	isPlaying,
}: {
	src: string;
	alt: string;
	isPlaying: boolean;
}) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
			<div className="rounded-full bg-white/90 p-4 shadow-xl">
				{isPlaying ? (
					<Pause className="size-8 fill-primary text-primary" />
				) : (
					<Play className="size-8 fill-primary text-primary" />
				)}
			</div>
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 bg-black/50 text-white hover:bg-black/70"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const GenreBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Music className="size-3" />
		{text}
	</Badge>
);

const YearBadge = ({ year }: { year: number }) => (
	<Badge variant="outline" className="text-xs">
		{year}
	</Badge>
);

const AlbumTitle = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ArtistName = ({ name }: { name: string }) => (
	<p className="text-sm text-muted-foreground">{name}</p>
);

const AlbumRating = ({
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

const AlbumDetails = ({
	tracks,
	duration,
}: {
	tracks: number;
	duration: string;
}) => (
	<div className="flex gap-4 text-sm text-muted-foreground">
		<span>{tracks} tracks</span>
		<span className="flex items-center gap-1">
			<Clock className="size-4" />
			{duration}
		</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const ActionButtons = () => (
	<div className="flex gap-2">
		<Button variant="outline" size="icon">
			<Share2 className="size-4" />
		</Button>
		<Button className="flex-1 gap-2">
			<Download className="size-4" />
			Buy Album
		</Button>
	</div>
);

export default function Main() {
	const album: AlbumProps = {
		cover:
			'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
		title: 'Midnight Dreams',
		artist: 'Luna Wave',
		price: 9.99,
		rating: 4.8,
		reviews: 1234,
		tracks: 12,
		duration: '48 min',
		genre: 'Electronic',
		releaseYear: 2025,
		isPlaying: false,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<AlbumCover
						src={album.cover}
						alt={album.title}
						isPlaying={album.isPlaying}
					/>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<GenreBadge text={album.genre} />
								<YearBadge year={album.releaseYear} />
							</div>
							<AlbumRating rating={album.rating} reviews={album.reviews} />
						</div>
						<div className="space-y-0.5">
							<AlbumTitle text={album.title} />
							<ArtistName name={album.artist} />
						</div>
						<AlbumDetails tracks={album.tracks} duration={album.duration} />
					</div>
					<Separator />
					<div className="flex items-center gap-3">
						<PriceTag amount={album.price} />
						<div className="flex-1">
							<ActionButtons />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
