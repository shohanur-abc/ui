import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calendar, Heart, MapPin, Star, Users } from 'lucide-react';
import Image from 'next/image';

interface RentalProps {
	image: string;
	title: string;
	location: string;
	rating: number;
	reviews: number;
	guests: number;
	pricePerNight: number;
	dates: string;
	superhost: boolean;
}

const PropertyImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 bg-white/90 hover:bg-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const SuperhostBadge = () => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Star className="size-3 fill-primary text-primary" />
		Superhost
	</Badge>
);

const PropertyTitle = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const PropertyLocation = ({ text }: { text: string }) => (
	<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
		<MapPin className="size-4" />
		{text}
	</div>
);

const PropertyRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(2)}</span>
		<span className="text-muted-foreground">({reviews})</span>
	</div>
);

const PropertyDetails = ({
	guests,
	dates,
}: {
	guests: number;
	dates: string;
}) => (
	<div className="flex gap-4 text-sm text-muted-foreground">
		<span className="flex items-center gap-1.5">
			<Users className="size-4" />
			{guests} guests
		</span>
		<span className="flex items-center gap-1.5">
			<Calendar className="size-4" />
			{dates}
		</span>
	</div>
);

const PriceDisplay = ({ perNight }: { perNight: number }) => (
	<div className="flex items-baseline gap-1">
		<span className="text-xl font-bold text-foreground">${perNight}</span>
		<span className="text-sm text-muted-foreground">/ night</span>
	</div>
);

const BookButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const rental: RentalProps = {
		image:
			'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=450&fit=crop',
		title: 'Modern Loft with City Views',
		location: 'Manhattan, New York',
		rating: 4.92,
		reviews: 128,
		guests: 4,
		pricePerNight: 189,
		dates: 'Dec 20-25',
		superhost: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group cursor-pointer overflow-hidden">
					<PropertyImage src={rental.image} alt={rental.title} />
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							{rental.superhost && <SuperhostBadge />}
							<PropertyRating rating={rental.rating} reviews={rental.reviews} />
						</div>
						<PropertyTitle text={rental.title} />
						<PropertyLocation text={rental.location} />
						<PropertyDetails guests={rental.guests} dates={rental.dates} />
						<div className="flex items-center justify-between pt-2">
							<PriceDisplay perNight={rental.pricePerNight} />
							<BookButton label="Book" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
