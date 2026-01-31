import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Dog,
	Calendar,
	Clock,
	Heart,
	MapPin,
	Phone,
	Scissors,
	Sparkles,
} from 'lucide-react';

interface PetProps {
	name: string;
	breed: string;
	weight: string;
	age: string;
	owner: string;
	phone: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	name: string;
	duration: string;
	price: number;
}

interface TotalsProps {
	services: number;
	products: number;
	tax: number;
	tip: number;
	total: number;
	currency: string;
}

const AppointmentHeader = ({
	date,
	time,
	groomer,
}: {
	date: string;
	time: string;
	groomer: string;
}) => (
	<div className="border-8 border-double border-primary">
		<div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Sparkles className="size-8" />
				<div>
					<p className="text-xs uppercase tracking-widest opacity-80">
						Pet Grooming
					</p>
					<h1 className="text-xl font-bold">Paws & Claws Spa</h1>
				</div>
			</div>
			<Badge variant="secondary" className="rounded-none">
				Completed
			</Badge>
		</div>
		<div className="p-4 grid grid-cols-3 gap-4 text-sm">
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-primary" />
				<div>
					<p className="text-xs text-muted-foreground">Date</p>
					<p className="font-medium">{date}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-primary" />
				<div>
					<p className="text-xs text-muted-foreground">Time</p>
					<p className="font-medium">{time}</p>
				</div>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Groomer</p>
				<p className="font-medium">{groomer}</p>
			</div>
		</div>
	</div>
);

const PetCard = ({ pet }: { pet: PetProps }) => (
	<div className="border-4 border-foreground relative">
		<div className="absolute -top-3 left-4 bg-background px-2">
			<Badge variant="outline" className="rounded-none">
				<Heart className="size-3 mr-1 fill-red-500 text-red-500" />
				Patient Info
			</Badge>
		</div>
		<div className="p-4 pt-6">
			<div className="flex items-center gap-4 mb-3">
				<div className="size-16 border-4 border-primary rounded-full flex items-center justify-center">
					<Dog className="size-8 text-primary" />
				</div>
				<div>
					<h2 className="text-2xl font-bold">{pet.name}</h2>
					<p className="text-muted-foreground">{pet.breed}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm border-t-2 border-foreground/30 pt-3">
				<div>
					<p className="text-xs text-muted-foreground">Weight</p>
					<p className="font-medium">{pet.weight}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Age</p>
					<p className="font-medium">{pet.age}</p>
				</div>
				<div className="col-span-2">
					<p className="text-xs text-muted-foreground">Owner</p>
					<p className="font-medium">{pet.owner}</p>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						<Phone className="size-3" />
						{pet.phone}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const ServiceRow = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<div className="flex items-center justify-between p-4 border-b-2 border-foreground last:border-0">
		<div className="flex items-center gap-3">
			<div className="size-10 border-2 border-foreground flex items-center justify-center">
				{service.icon}
			</div>
			<div>
				<p className="font-medium">{service.name}</p>
				<p className="text-xs text-muted-foreground flex items-center gap-1">
					<Clock className="size-3" />
					{service.duration}
				</p>
			</div>
		</div>
		<span className="font-bold">
			{currency}
			{service.price.toFixed(2)}
		</span>
	</div>
);

const TotalsBox = ({
	services,
	products,
	tax,
	tip,
	total,
	currency,
}: TotalsProps) => (
	<div className="border-4 border-foreground">
		<div className="bg-foreground text-background p-3">
			<p className="text-xs font-bold uppercase tracking-widest">
				Invoice Total
			</p>
		</div>
		<div className="p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span>Grooming Services</span>
				<span>
					{currency}
					{services.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Products</span>
				<span>
					{currency}
					{products.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-600">
				<span>Tip</span>
				<span>
					{currency}
					{tip.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-xl font-bold">
				<span>Total</span>
				<span className="text-primary">
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const NotesSection = ({ notes }: { notes: string[] }) => (
	<div className="border-2 border-dashed border-foreground/50 p-4">
		<p className="text-xs font-bold uppercase tracking-widest mb-2">
			Groomer Notes
		</p>
		<ul className="text-sm text-muted-foreground space-y-1">
			{notes.map((note, index) => (
				<li key={index}>• {note}</li>
			))}
		</ul>
	</div>
);

export default function Main() {
	const pet: PetProps = {
		name: 'Max',
		breed: 'Golden Retriever',
		weight: '72 lbs',
		age: '4 years',
		owner: 'Sarah Johnson',
		phone: '(555) 234-5678',
	};

	const services: ServiceProps[] = [
		{
			icon: <Scissors className="size-4" />,
			name: 'Full Groom & Haircut',
			duration: '90 min',
			price: 75.0,
		},
		{
			icon: <Sparkles className="size-4" />,
			name: 'De-shedding Treatment',
			duration: '30 min',
			price: 35.0,
		},
		{
			icon: <Heart className="size-4" />,
			name: 'Nail Trim & Filing',
			duration: '15 min',
			price: 18.0,
		},
		{
			icon: <Sparkles className="size-4" />,
			name: 'Teeth Brushing',
			duration: '10 min',
			price: 12.0,
		},
		{
			icon: <Sparkles className="size-4" />,
			name: 'Ear Cleaning',
			duration: '10 min',
			price: 10.0,
		},
	];

	const products = [
		{ name: 'Oatmeal Shampoo (take-home)', price: 16.0 },
		{ name: 'Dental Chews (3-pack)', price: 12.0 },
	];

	const totals: TotalsProps = {
		services: 150.0,
		products: 28.0,
		tax: 15.66,
		tip: 30.0,
		total: 223.66,
		currency: '$',
	};

	const notes = [
		'Coat in good condition, no matting found',
		'Slight ear redness - recommend vet check if persists',
		'Very well behaved! Such a good boy!',
		'Next appointment recommended in 6-8 weeks',
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<AppointmentHeader
					date="February 24, 2024"
					time="10:00 AM"
					groomer="Emily"
				/>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<PetCard pet={pet} />
					<div className="border-2 border-foreground">
						<div className="bg-muted px-4 py-2 border-b-2 border-foreground">
							<p className="text-xs font-bold uppercase tracking-widest">
								Services Performed
							</p>
						</div>
						{services.map((service, index) => (
							<ServiceRow key={index} service={service} currency="$" />
						))}
					</div>
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<NotesSection notes={notes} />
					<TotalsBox {...totals} />
				</div>
				<div className="mt-4 border-t-4 border-primary pt-4 flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Thank you for choosing Paws & Claws Spa!
					</p>
					<Button className="rounded-none">Book Next Appointment</Button>
				</div>
			</div>
		</section>
	);
}
