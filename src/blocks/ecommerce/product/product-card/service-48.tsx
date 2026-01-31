import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Clock,
	Heart,
	Scissors,
	Star,
	User,
	MapPin,
} from 'lucide-react';
import Image from 'next/image';

interface ServiceProps {
	image: string;
	name: string;
	provider: string;
	location: string;
	price: number;
	duration: string;
	rating: number;
	reviews: number;
	availability: string[];
	featured: boolean;
}

const ServiceImage = ({ src, alt }: { src: string; alt: string }) => (
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
			className="absolute right-3 top-3 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const FeaturedBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-primary text-primary-foreground">
		<Star className="size-3 fill-current" />
		Featured
	</Badge>
);

const ServiceName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ProviderInfo = ({
	name,
	location,
}: {
	name: string;
	location: string;
}) => (
	<div className="space-y-1 text-sm text-muted-foreground">
		<div className="flex items-center gap-1.5">
			<User className="size-4" />
			{name}
		</div>
		<div className="flex items-center gap-1.5">
			<MapPin className="size-4" />
			{location}
		</div>
	</div>
);

const ServiceRating = ({
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

const ServiceDuration = ({ time }: { time: string }) => (
	<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
		<Clock className="size-4" />
		{time}
	</div>
);

const AvailabilitySlots = ({ slots }: { slots: string[] }) => (
	<div className="space-y-2">
		<p className="flex items-center gap-1 text-xs text-muted-foreground">
			<Calendar className="size-3" />
			Next Available
		</p>
		<div className="flex gap-2">
			{slots.map((slot, i) => (
				<Badge
					key={i}
					variant={i === 0 ? 'default' : 'outline'}
					className="text-xs"
				>
					{slot}
				</Badge>
			))}
		</div>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">${amount}</span>
);

const BookButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Scissors className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const service: ServiceProps = {
		image:
			'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop',
		name: 'Luxury Haircut & Styling',
		provider: "Sarah's Salon",
		location: 'Downtown LA',
		price: 85,
		duration: '1 hour',
		rating: 4.9,
		reviews: 234,
		availability: ['Today 2PM', 'Tomorrow 10AM', 'Fri 3PM'],
		featured: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<ServiceImage src={service.image} alt={service.name} />
						{service.featured && <FeaturedBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<ServiceDuration time={service.duration} />
							<ServiceRating
								rating={service.rating}
								reviews={service.reviews}
							/>
						</div>
						<ServiceName text={service.name} />
						<ProviderInfo name={service.provider} location={service.location} />
						<AvailabilitySlots slots={service.availability} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={service.price} />
							<BookButton label="Book" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
