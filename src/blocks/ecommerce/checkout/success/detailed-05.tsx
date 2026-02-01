import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Ticket,
	Calendar,
	Clock,
	MapPin,
	Users,
	QrCode,
	Download,
	Share2,
	Info,
	ArrowRight,
	Navigation,
	Car,
	Ban,
} from 'lucide-react';
import Link from 'next/link';

interface EventDetailsProps {
	name: string;
	date: string;
	time: string;
	venue: string;
	address: string;
}

interface TicketProps {
	type: string;
	price: number;
	currency: string;
	quantity: number;
	seat?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	confirmationNumber,
	purchaseDate,
}: {
	confirmationNumber: string;
	purchaseDate: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-violet-500/10 flex items-center justify-center">
				<Ticket className="size-7 text-violet-500" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">Tickets Confirmed</h1>
				<p className="text-muted-foreground">
					Confirmation #{confirmationNumber} • {purchaseDate}
				</p>
			</div>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Download
			</Button>
			<Button variant="outline" size="sm" className="gap-2">
				<Share2 className="size-4" />
				Share
			</Button>
		</div>
	</div>
);

const EventCard = ({ name, date, time, venue, address }: EventDetailsProps) => (
	<Card className="overflow-hidden">
		<div className="h-48 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-end p-6">
			<div className="text-white">
				<h2 className="text-2xl @lg:text-3xl font-bold">{name}</h2>
			</div>
		</div>
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-4">
				<div className="flex items-start gap-3">
					<Calendar className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="font-medium">{date}</p>
						<p className="text-sm text-muted-foreground">Date</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Clock className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="font-medium">{time}</p>
						<p className="text-sm text-muted-foreground">Doors Open</p>
					</div>
				</div>
				<div className="@sm:col-span-2 flex items-start gap-3">
					<MapPin className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="font-medium">{venue}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TicketQRCard = ({ ticketCode }: { ticketCode: string }) => (
	<Card className="text-center">
		<CardHeader>
			<CardTitle className="text-base">Your Ticket</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="size-48 mx-auto bg-white dark:bg-slate-900 rounded-xl p-4 border mb-4">
				<div className="size-full bg-muted rounded-lg flex items-center justify-center">
					<QrCode className="size-28 text-muted-foreground/50" />
				</div>
			</div>
			<p className="font-mono text-xl font-bold tracking-wider">{ticketCode}</p>
			<p className="text-sm text-muted-foreground mt-2">
				Show this at the venue entrance
			</p>
		</CardContent>
	</Card>
);

const TicketDetailsCard = ({
	tickets,
	fees,
	total,
	currency,
}: {
	tickets: TicketProps[];
	fees: number;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Users className="size-4" />
				Ticket Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{tickets.map((ticket, i) => (
				<div key={i} className="flex items-center justify-between">
					<div>
						<p className="font-medium">{ticket.type}</p>
						{ticket.seat && (
							<p className="text-sm text-muted-foreground">
								Seat: {ticket.seat}
							</p>
						)}
						<p className="text-sm text-muted-foreground">×{ticket.quantity}</p>
					</div>
					<p className="font-semibold">
						{currency}
						{(ticket.price * ticket.quantity).toFixed(2)}
					</p>
				</div>
			))}
			<Separator />
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Service Fees</span>
				<span>
					{currency}
					{fees.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between font-semibold">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const VenueInfoCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Info className="size-4" />
				Venue Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="h-32 rounded-lg bg-muted flex items-center justify-center">
				<MapPin className="size-10 text-muted-foreground/50" />
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button variant="outline" size="sm" className="gap-2">
					<Navigation className="size-4" />
					Directions
				</Button>
				<Button variant="outline" size="sm" className="gap-2">
					<Car className="size-4" />
					Parking
				</Button>
			</div>
		</CardContent>
	</Card>
);

const ImportantInfoCard = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<Card className="bg-amber-500/5 border-amber-200 dark:border-amber-800/30">
		<CardHeader>
			<CardTitle className="text-base text-amber-700 dark:text-amber-400">
				Important Information
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ul className="space-y-3">
				{items.map((item, i) => (
					<li key={i} className="flex items-start gap-3 text-sm">
						<item.icon className="size-4 text-amber-500 mt-0.5 shrink-0" />
						<span>{item.text}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const tickets: TicketProps[] = [
		{ type: 'General Admission', price: 75, currency: '$', quantity: 2 },
		{ type: 'VIP Upgrade', price: 50, currency: '$', quantity: 1 },
	];

	const importantInfo = [
		{ icon: Clock, text: 'Arrive at least 30 minutes before doors open' },
		{ icon: Users, text: 'All attendees must be 18+ with valid photo ID' },
		{ icon: Ban, text: 'No professional cameras or recording equipment' },
		{ icon: Info, text: 'This is a standing event with limited seating' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					confirmationNumber="TKT-2024-78432"
					purchaseDate="January 15, 2024"
				/>

				<EventCard
					name="Summer Music Festival 2024"
					date="Saturday, June 15, 2024"
					time="6:00 PM"
					venue="Madison Square Garden"
					address="4 Pennsylvania Plaza, New York, NY 10001"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<TicketDetailsCard
							tickets={tickets}
							fees={15.0}
							total={215.0}
							currency="$"
						/>
						<ImportantInfoCard items={importantInfo} />
					</div>
					<div className="space-y-6">
						<TicketQRCard ticketCode="TKT-ABCD-1234-EFGH" />
						<VenueInfoCard />
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{
							label: 'Get Directions',
							href: '/directions',
							variant: 'outline',
							icon: Navigation,
						},
					]}
				/>
			</div>
		</section>
	);
}
