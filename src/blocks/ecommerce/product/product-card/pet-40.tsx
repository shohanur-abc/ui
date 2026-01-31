import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dog, Heart, MapPin, Phone, Star, Clock, PawPrint } from 'lucide-react';
import Image from 'next/image';

interface PetProps {
	image: string;
	name: string;
	breed: string;
	age: string;
	gender: string;
	location: string;
	price: number;
	vaccinated: boolean;
	rating: number;
	reviews: number;
}

const PetImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
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

const PetBadges = ({
	vaccinated,
	gender,
}: {
	vaccinated: boolean;
	gender: string;
}) => (
	<div className="flex gap-2">
		<Badge variant="secondary">{gender}</Badge>
		{vaccinated && (
			<Badge className="gap-1 bg-green-600 text-white">
				<PawPrint className="size-3" />
				Vaccinated
			</Badge>
		)}
	</div>
);

const PetName = ({ name, breed }: { name: string; breed: string }) => (
	<div className="space-y-0.5">
		<h3 className="text-lg font-bold text-foreground">{name}</h3>
		<p className="text-sm text-muted-foreground">{breed}</p>
	</div>
);

const PetDetails = ({ age, location }: { age: string; location: string }) => (
	<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
		<span className="flex items-center gap-1.5">
			<Clock className="size-4" />
			{age}
		</span>
		<span className="flex items-center gap-1.5">
			<MapPin className="size-4" />
			{location}
		</span>
	</div>
);

const BreederRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<div className="space-y-0.5">
		<p className="text-xs text-muted-foreground">Adoption Fee</p>
		<span className="text-xl font-bold text-foreground">${amount}</span>
	</div>
);

const ContactButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Phone className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const pet: PetProps = {
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
		name: 'Max',
		breed: 'Golden Retriever',
		age: '8 months',
		gender: 'Male',
		location: 'San Francisco, CA',
		price: 1200,
		vaccinated: true,
		rating: 4.9,
		reviews: 47,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<PetImage src={pet.image} alt={pet.name} />
					<div className="space-y-3">
						<PetBadges vaccinated={pet.vaccinated} gender={pet.gender} />
						<PetName name={pet.name} breed={pet.breed} />
						<PetDetails age={pet.age} location={pet.location} />
						<BreederRating rating={pet.rating} reviews={pet.reviews} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={pet.price} />
						<ContactButton label="Contact" />
					</div>
				</Card>
			</div>
		</section>
	);
}
