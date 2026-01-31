import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Star, Users, Utensils } from 'lucide-react';

interface VenueInfoProps {
	name: string;
	date: string;
	time: string;
	guests: number;
	location: string;
}

interface ServiceItemProps {
	category: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	icon: React.ReactNode;
}

interface TotalsProps {
	subtotal: number;
	serviceCharge: number;
	tax: number;
	deposit: number;
	balance: number;
	currency: string;
}

const VenueCard = ({ name, date, time, guests, location }: VenueInfoProps) => (
	<Card className="@md:col-span-2">
		<CardContent className="pt-4">
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-xl font-bold">{name}</h2>
					<p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
						<MapPin className="size-3" />
						{location}
					</p>
				</div>
				<Badge variant="default">Confirmed</Badge>
			</div>
			<div className="grid grid-cols-3 gap-4 mt-4">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Date</p>
						<p className="text-sm font-medium">{date}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Time</p>
						<p className="text-sm font-medium">{time}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Users className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Guests</p>
						<p className="text-sm font-medium">{guests}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	item,
	currency,
}: {
	item: ServiceItemProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					{item.icon}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="text-[10px]">
							{item.category}
						</Badge>
					</div>
					<p className="font-medium text-sm mt-1">{item.name}</p>
					<p className="text-xs text-muted-foreground">{item.description}</p>
				</div>
			</div>
			<div className="flex items-center justify-between mt-3 pt-3 border-t">
				<span className="text-xs text-muted-foreground">
					Qty: {item.quantity}
				</span>
				<span className="font-bold">
					{currency}
					{item.price.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

const TotalsCard = ({
	subtotal,
	serviceCharge,
	tax,
	deposit,
	balance,
	currency,
}: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-4 space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Subtotal</span>
				<span>
					{currency}
					{subtotal.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Service Charge (18%)</span>
				<span>
					{currency}
					{serviceCharge.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toLocaleString()}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-medium">
				<span>Total</span>
				<span>
					{currency}
					{(subtotal + serviceCharge + tax).toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-300">
				<span>Deposit Paid</span>
				<span>
					-{currency}
					{deposit.toLocaleString()}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Balance Due</span>
				<span>
					{currency}
					{balance.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const venue: VenueInfoProps = {
		name: 'Grand Ballroom - Wedding Reception',
		date: 'Saturday, June 15, 2024',
		time: '5:00 PM - 11:00 PM',
		guests: 150,
		location: 'The Plaza Hotel, New York',
	};

	const services: ServiceItemProps[] = [
		{
			category: 'Venue',
			name: 'Grand Ballroom Rental',
			description: '6-hour venue rental with setup',
			quantity: 1,
			price: 8500,
			icon: <Star className="size-4 text-primary" />,
		},
		{
			category: 'Catering',
			name: 'Plated Dinner Package',
			description: '3-course dinner for 150 guests',
			quantity: 150,
			price: 12750,
			icon: <Utensils className="size-4 text-primary" />,
		},
		{
			category: 'Bar',
			name: 'Premium Open Bar',
			description: '5-hour open bar service',
			quantity: 150,
			price: 7500,
			icon: <Utensils className="size-4 text-primary" />,
		},
		{
			category: 'Decor',
			name: 'Floral Arrangements',
			description: 'Centerpieces and ceremony decor',
			quantity: 1,
			price: 3500,
			icon: <Star className="size-4 text-primary" />,
		},
		{
			category: 'Music',
			name: 'Live Band',
			description: '5-piece band for 4 hours',
			quantity: 1,
			price: 4500,
			icon: <Star className="size-4 text-primary" />,
		},
		{
			category: 'Photo',
			name: 'Photography Package',
			description: '8 hours coverage, 2 photographers',
			quantity: 1,
			price: 5500,
			icon: <Star className="size-4 text-primary" />,
		},
	];

	const totals: TotalsProps = {
		subtotal: 42250,
		serviceCharge: 7605,
		tax: 4486,
		deposit: 15000,
		balance: 39341,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-3 gap-4">
					<VenueCard {...venue} />
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-xs text-muted-foreground">Contract #</p>
							<p className="font-mono font-bold">EVT-2024-0156</p>
							<p className="text-xs text-muted-foreground mt-2">
								Event Coordinator
							</p>
							<p className="text-sm font-medium">Sarah Mitchell</p>
							<p className="text-xs text-muted-foreground">(555) 234-5678</p>
						</CardContent>
					</Card>
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-4">
					{services.map((service, index) => (
						<ServiceCard key={index} item={service} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<div className="@md:col-span-2 flex items-end gap-4">
						<Button variant="outline">Download Contract</Button>
						<Button>Pay Balance</Button>
					</div>
					<TotalsCard {...totals} />
				</div>
			</div>
		</section>
	);
}
