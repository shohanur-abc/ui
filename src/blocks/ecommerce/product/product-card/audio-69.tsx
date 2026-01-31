import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Download,
	Heart,
	Headphones,
	Play,
	ShoppingCart,
	Star,
	Clock,
	Music,
} from 'lucide-react';
import Image from 'next/image';

interface AudioProps {
	image: string;
	name: string;
	creator: string;
	price: number;
	rating: number;
	reviews: number;
	category: string;
	duration: string;
	bpm: number;
	key: string;
	format: string[];
	plays: number;
}

const AudioCover = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-purple-700">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-center justify-center">
			<button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
				<Play className="size-8 fill-white text-white" />
			</button>
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
		<Music className="size-3" />
		{text}
	</Badge>
);

const AudioName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const CreatorName = ({ name }: { name: string }) => (
	<p className="text-sm text-muted-foreground">by {name}</p>
);

const AudioRating = ({
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

const AudioDetails = ({
	duration,
	bpm,
	key,
}: {
	duration: string;
	bpm: number;
	key: string;
}) => (
	<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
		<span className="flex items-center gap-1">
			<Clock className="size-4" />
			{duration}
		</span>
		<span>{bpm} BPM</span>
		<span>Key: {key}</span>
	</div>
);

const FormatBadges = ({ formats }: { formats: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{formats.map((f, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{f}
			</Badge>
		))}
	</div>
);

const PlayCount = ({ count }: { count: number }) => (
	<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
		<Headphones className="size-4" />
		{count.toLocaleString()} plays
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const DownloadButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Download className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const audio: AudioProps = {
		image:
			'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
		name: 'Epic Cinematic Orchestra',
		creator: 'SoundWave Studio',
		price: 29.0,
		rating: 4.8,
		reviews: 567,
		category: 'Cinematic',
		duration: '3:24',
		bpm: 120,
		key: 'C Major',
		format: ['WAV', 'MP3', 'AIFF'],
		plays: 45230,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<AudioCover src={audio.image} alt={audio.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<CategoryBadge text={audio.category} />
							<AudioRating rating={audio.rating} reviews={audio.reviews} />
						</div>
						<div className="space-y-0.5">
							<AudioName text={audio.name} />
							<CreatorName name={audio.creator} />
						</div>
						<AudioDetails
							duration={audio.duration}
							bpm={audio.bpm}
							key={audio.key}
						/>
						<FormatBadges formats={audio.format} />
						<PlayCount count={audio.plays} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={audio.price} />
						<DownloadButton label="Buy" />
					</div>
				</Card>
			</div>
		</section>
	);
}
