import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Scissors, User } from 'lucide-react';

interface AppointmentProps {
	salon: string;
	address: string;
	phone: string;
	date: string;
	time: string;
}

interface ClientProps {
	name: string;
	phone: string;
	email: string;
}

interface ServiceProps {
	name: string;
	stylist: string;
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

const SalonHeader = ({
	salon,
	address,
	phone,
	date,
	time,
}: AppointmentProps) => (
	<div className="border-b-8 border-primary pb-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div className="size-14 border-4 border-primary flex items-center justify-center">
					<Scissors className="size-7 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold">{salon}</h1>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						<MapPin className="size-3" />
						{address}
					</p>
					<p className="text-sm text-muted-foreground">{phone}</p>
				</div>
			</div>
			<div className="text-right border-l-4 border-primary pl-4">
				<p className="text-xs uppercase tracking-widest text-muted-foreground">
					Appointment
				</p>
				<p className="font-bold flex items-center gap-2 justify-end">
					<Calendar className="size-4" />
					{date}
				</p>
				<p className="text-sm text-muted-foreground flex items-center gap-2 justify-end">
					<Clock className="size-4" />
					{time}
				</p>
			</div>
		</div>
	</div>
);

const ClientBox = ({ client }: { client: ClientProps }) => (
	<div className="border-l-4 border-foreground p-4 bg-muted/30">
		<p className="text-xs font-bold uppercase tracking-widest mb-2">Client</p>
		<p className="font-bold flex items-center gap-2">
			<User className="size-4" />
			{client.name}
		</p>
		<p className="text-sm text-muted-foreground">{client.phone}</p>
		<p className="text-sm text-muted-foreground">{client.email}</p>
	</div>
);

const ServiceRow = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<div className="border-2 border-foreground p-4">
		<div className="flex items-start justify-between">
			<div>
				<h3 className="font-bold">{service.name}</h3>
				<p className="text-sm text-muted-foreground">
					Stylist: {service.stylist}
				</p>
				<p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
					<Clock className="size-3" />
					{service.duration}
				</p>
			</div>
			<span className="text-xl font-bold">
				{currency}
				{service.price.toFixed(2)}
			</span>
		</div>
	</div>
);

const ProductRow = ({
	name,
	price,
	currency,
}: {
	name: string;
	price: number;
	currency: string;
}) => (
	<div className="flex items-center justify-between border-b-2 border-dashed border-foreground/30 py-2 last:border-0">
		<span className="text-sm">{name}</span>
		<span className="font-medium">
			{currency}
			{price.toFixed(2)}
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
				Receipt Total
			</p>
		</div>
		<div className="p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span>Services</span>
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
				<span>Tip (20%)</span>
				<span>
					{currency}
					{tip.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-xl font-bold">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const appointment: AppointmentProps = {
		salon: 'Luxe Hair Studio',
		address: '456 Style Ave, Beverly Hills, CA',
		phone: '(310) 555-7890',
		date: 'February 25, 2024',
		time: '2:00 PM',
	};

	const client: ClientProps = {
		name: 'Jessica Thompson',
		phone: '(555) 123-4567',
		email: 'jessica.t@email.com',
	};

	const services: ServiceProps[] = [
		{
			name: 'Haircut & Style',
			stylist: 'Maria',
			duration: '45 min',
			price: 85.0,
		},
		{
			name: 'Full Highlights',
			stylist: 'Maria',
			duration: '2 hrs',
			price: 175.0,
		},
		{
			name: 'Deep Conditioning Treatment',
			stylist: 'Maria',
			duration: '30 min',
			price: 45.0,
		},
		{ name: 'Blowout', stylist: 'Maria', duration: '30 min', price: 55.0 },
	];

	const products = [
		{ name: 'Olaplex No. 3 Treatment', price: 28.0 },
		{ name: 'Moroccan Oil Serum', price: 46.0 },
	];

	const totals: TotalsProps = {
		services: 360.0,
		products: 74.0,
		tax: 38.29,
		tip: 72.0,
		total: 544.29,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<SalonHeader {...appointment} />
				<div className="mt-4">
					<ClientBox client={client} />
				</div>
				<div className="mt-4">
					<p className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 border-foreground pb-2">
						Services
					</p>
					<div className="space-y-2">
						{services.map((service, index) => (
							<ServiceRow key={index} service={service} currency="$" />
						))}
					</div>
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<div className="border-2 border-foreground p-4">
						<p className="text-xs font-bold uppercase tracking-widest mb-3 border-b-2 border-foreground pb-2">
							Products Purchased
						</p>
						{products.map((product, index) => (
							<ProductRow
								key={index}
								name={product.name}
								price={product.price}
								currency="$"
							/>
						))}
					</div>
					<TotalsBox {...totals} />
				</div>
				<div className="mt-4 border-t-4 border-primary pt-4 text-center">
					<p className="text-sm text-muted-foreground">
						Thank you for visiting Luxe Hair Studio!
					</p>
					<p className="text-xs text-muted-foreground">
						Book your next appointment at luxehairstudio.com
					</p>
				</div>
			</div>
		</section>
	);
}
