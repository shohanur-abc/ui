import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Users, Utensils } from 'lucide-react';

interface ReservationProps {
	confirmationNumber: string;
	date: string;
	time: string;
	partySize: number;
	tableType: string;
}

interface RestaurantProps {
	name: string;
	address: string;
	phone: string;
}

interface ItemProps {
	name: string;
	modifiers?: string;
	quantity: number;
	price: number;
}

interface TotalsProps {
	subtotal: number;
	tax: number;
	tip: number;
	total: number;
	currency: string;
}

const RestaurantHeader = ({
	restaurant,
	reservation,
}: {
	restaurant: RestaurantProps;
	reservation: ReservationProps;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div>
				<div className="flex items-center gap-3 mb-2">
					<Utensils className="size-6 text-primary" />
					<h1 className="text-2xl font-bold">{restaurant.name}</h1>
				</div>
				<p className="text-sm text-muted-foreground flex items-center gap-2">
					<MapPin className="size-3" />
					{restaurant.address}
				</p>
				<p className="text-sm text-muted-foreground">{restaurant.phone}</p>
			</div>
			<div className="text-right">
				<Badge variant="default" className="mb-2">
					Confirmed
				</Badge>
				<p className="font-mono text-sm font-bold">
					{reservation.confirmationNumber}
				</p>
			</div>
		</div>
	</div>
);

const ReservationDetails = ({
	date,
	time,
	partySize,
	tableType,
}: Omit<ReservationProps, 'confirmationNumber'>) => (
	<div className="py-4 grid grid-cols-4 gap-4">
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
				<p className="text-xs text-muted-foreground">Party Size</p>
				<p className="text-sm font-medium">{partySize} guests</p>
			</div>
		</div>
		<div>
			<p className="text-xs text-muted-foreground">Table</p>
			<p className="text-sm font-medium">{tableType}</p>
		</div>
	</div>
);

const MenuSection = ({
	title,
	items,
	currency,
}: {
	title: string;
	items: ItemProps[];
	currency: string;
}) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			{title}
		</p>
		{items.map((item, index) => (
			<div key={index}>
				<div className="flex items-start justify-between py-3">
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{item.name}</span>
							{item.quantity > 1 && (
								<Badge variant="outline" className="text-xs">
									×{item.quantity}
								</Badge>
							)}
						</div>
						{item.modifiers && (
							<p className="text-xs text-muted-foreground mt-1">
								{item.modifiers}
							</p>
						)}
					</div>
					<span className="font-medium">
						{currency}
						{(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
				{index < items.length - 1 && <Separator />}
			</div>
		))}
	</div>
);

const TotalsSection = ({
	subtotal,
	tax,
	tip,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax (8.875%)</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tip (20%)</span>
			<span>
				{currency}
				{tip.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const restaurant: RestaurantProps = {
		name: 'Bella Cucina',
		address: '789 Gourmet Street, New York, NY 10012',
		phone: '(212) 555-8900',
	};

	const reservation: ReservationProps = {
		confirmationNumber: 'RES-789456',
		date: 'February 23, 2024',
		time: '7:30 PM',
		partySize: 4,
		tableType: 'Window Booth',
	};

	const appetizers: ItemProps[] = [
		{ name: 'Burrata Caprese', quantity: 1, price: 18.0 },
		{ name: 'Calamari Fritti', quantity: 1, price: 16.0 },
	];

	const mains: ItemProps[] = [
		{
			name: 'Filet Mignon',
			modifiers: 'Medium rare, truffle butter',
			quantity: 2,
			price: 52.0,
		},
		{ name: 'Lobster Risotto', quantity: 1, price: 42.0 },
		{
			name: 'Grilled Salmon',
			modifiers: 'Lemon herb, asparagus',
			quantity: 1,
			price: 38.0,
		},
	];

	const drinks: ItemProps[] = [
		{ name: 'Bottle of Chianti Classico', quantity: 1, price: 65.0 },
		{ name: 'Sparkling Water', quantity: 2, price: 8.0 },
		{ name: 'Espresso', quantity: 4, price: 4.5 },
	];

	const totals: TotalsProps = {
		subtotal: 361.0,
		tax: 32.04,
		tip: 72.2,
		total: 465.24,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<RestaurantHeader restaurant={restaurant} reservation={reservation} />
				<Separator />
				<ReservationDetails
					date={reservation.date}
					time={reservation.time}
					partySize={reservation.partySize}
					tableType={reservation.tableType}
				/>
				<Separator />
				<MenuSection title="Appetizers" items={appetizers} currency="$" />
				<Separator />
				<MenuSection title="Main Courses" items={mains} currency="$" />
				<Separator />
				<MenuSection title="Beverages" items={drinks} currency="$" />
				<Separator />
				<div className="grid @md:grid-cols-2 gap-8">
					<div className="py-4">
						<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
							Payment Method
						</p>
						<p className="text-sm font-medium">Visa ending in 4242</p>
						<p className="text-xs text-muted-foreground mt-2">
							Thank you for dining with us!
						</p>
					</div>
					<TotalsSection {...totals} />
				</div>
			</div>
		</section>
	);
}
