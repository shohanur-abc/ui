import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, CreditCard, FileText, MapPin } from 'lucide-react';

interface BookingItem {
	name: string;
	date: string;
	time: string;
	duration: string;
	price: number;
}

interface ProviderInfoProps {
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	title: string;
	rating: number;
	reviews: number;
	location: string;
}

interface BookingMetaProps {
	bookingId: string;
	createdAt: string;
	status: string;
}

interface BookingItemCardProps {
	item: BookingItem;
	currency: string;
}

interface PaymentSummaryProps {
	items: BookingItem[];
	serviceFee: number;
	discount: number;
	total: number;
	currency: string;
}

interface PaymentMethodDisplayProps {
	method: string;
	last4: string;
	paidAt: string;
}

const ProviderInfo = ({
	avatarSrc,
	avatarFallback,
	name,
	title,
	rating,
	reviews,
	location,
}: ProviderInfoProps) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 space-y-4">
		<div className="flex items-center gap-4">
			<Avatar className="size-16 ring-4 ring-background">
				<AvatarImage src={avatarSrc} alt={name} />
				<AvatarFallback className="text-lg">{avatarFallback}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold text-lg">{name}</p>
				<p className="text-sm text-muted-foreground">{title}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 text-sm">
			<div className="flex items-center gap-1">
				<span className="text-amber-500">★</span>
				<span className="font-medium">{rating}</span>
				<span className="text-muted-foreground">({reviews} reviews)</span>
			</div>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<MapPin className="size-4" />
			<span>{location}</span>
		</div>
	</div>
);

const BookingMeta = ({ bookingId, createdAt, status }: BookingMetaProps) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/40">
		<div className="space-y-1">
			<p className="text-xs text-muted-foreground">Booking Reference</p>
			<p className="font-mono font-semibold">{bookingId}</p>
		</div>
		<div className="text-right space-y-1">
			<p className="text-xs text-muted-foreground">Booked {createdAt}</p>
			<Badge variant="default">{status}</Badge>
		</div>
	</div>
);

const BookingItemCard = ({ item, currency }: BookingItemCardProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-start justify-between">
			<p className="font-semibold">{item.name}</p>
			<p className="font-bold text-primary">
				{currency}
				{item.price.toFixed(2)}
			</p>
		</div>
		<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
			<span className="flex items-center gap-1">
				<Calendar className="size-3" />
				{item.date}
			</span>
			<span className="flex items-center gap-1">
				<Clock className="size-3" />
				{item.time}
			</span>
			<span>{item.duration}</span>
		</div>
	</div>
);

const PaymentSummary = ({
	items,
	serviceFee,
	discount,
	total,
	currency,
}: PaymentSummaryProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">Payment Summary</p>
		<div className="space-y-2 text-sm">
			{items.map((item, index) => (
				<div key={index} className="flex justify-between">
					<span className="text-muted-foreground">{item.name}</span>
					<span>
						{currency}
						{item.price.toFixed(2)}
					</span>
				</div>
			))}
			<div className="flex justify-between">
				<span className="text-muted-foreground">Service Fee</span>
				<span>
					{currency}
					{serviceFee.toFixed(2)}
				</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-green-600">
					<span>Discount</span>
					<span>
						-{currency}
						{discount.toFixed(2)}
					</span>
				</div>
			)}
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const PaymentMethodDisplay = ({
	method,
	last4,
	paidAt,
}: PaymentMethodDisplayProps) => (
	<div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-2">
		<div className="flex items-center gap-2 text-green-600">
			<CreditCard className="size-4" />
			<span className="font-semibold">Payment Successful</span>
		</div>
		<div className="text-sm text-muted-foreground">
			<p>
				{method} •••• {last4}
			</p>
			<p>Paid on {paidAt}</p>
		</div>
	</div>
);

export default function Main() {
	const provider: ProviderInfoProps = {
		avatarSrc: '',
		avatarFallback: 'DR',
		name: 'Dr. Sarah Mitchell',
		title: 'Licensed Therapist, PhD',
		rating: 4.9,
		reviews: 127,
		location: 'Virtual & In-Person Sessions',
	};

	const meta: BookingMetaProps = {
		bookingId: 'BK-2024-7891',
		createdAt: 'Feb 8, 2024',
		status: 'Confirmed',
	};

	const bookings: BookingItem[] = [
		{
			name: 'Initial Consultation',
			date: 'Feb 15, 2024',
			time: '10:00 AM',
			duration: '60 min',
			price: 150.0,
		},
		{
			name: 'Follow-up Session',
			date: 'Feb 22, 2024',
			time: '10:00 AM',
			duration: '45 min',
			price: 120.0,
		},
	];

	const paymentData = {
		items: bookings,
		serviceFee: 15.0,
		discount: 27.0,
		total: 258.0,
		currency: '$',
	};

	const paymentMethod: PaymentMethodDisplayProps = {
		method: 'Visa',
		last4: '4242',
		paidAt: 'February 8, 2024',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-5 gap-6">
							<div className="@lg:col-span-2 space-y-4">
								<ProviderInfo {...provider} />
								<div className="p-4 rounded-lg border space-y-2">
									<p className="text-sm font-semibold">Need to make changes?</p>
									<p className="text-sm text-muted-foreground">
										Reschedule or cancel up to 24 hours before your appointment.
									</p>
									<Button variant="outline" size="sm" className="w-full">
										Manage Booking
									</Button>
								</div>
							</div>
							<div className="@lg:col-span-3 space-y-4">
								<div className="flex items-center gap-2">
									<FileText className="size-5 text-primary" />
									<h2 className="text-xl font-bold">Booking Confirmation</h2>
								</div>
								<BookingMeta {...meta} />
								<div className="space-y-3">
									<p className="font-semibold">Scheduled Sessions</p>
									{bookings.map((booking, index) => (
										<BookingItemCard key={index} item={booking} currency="$" />
									))}
								</div>
								<PaymentSummary {...paymentData} />
								<PaymentMethodDisplay {...paymentMethod} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
