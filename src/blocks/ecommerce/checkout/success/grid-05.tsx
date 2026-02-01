import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Ticket,
	Calendar,
	Clock,
	MapPin,
	Users,
	QrCode,
	Download,
	Share2,
} from 'lucide-react';
import Link from 'next/link';

interface TicketInfoProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

interface TicketTypeProps {
	type: string;
	quantity: number;
	price: string;
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

const EventBanner = ({
	eventName,
	venue,
}: {
	eventName: string;
	venue: string;
}) => (
	<Card className="overflow-hidden">
		<div className="h-48 bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center text-white">
			<div className="text-center">
				<Badge className="bg-white/20 text-white mb-3">Tickets Confirmed</Badge>
				<h1 className="text-3xl @lg:text-4xl font-bold">{eventName}</h1>
				<p className="opacity-90 mt-2">{venue}</p>
			</div>
		</div>
	</Card>
);

const InfoGridCard = ({ icon: Icon, label, value }: TicketInfoProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-2">
				<div className="size-10 mx-auto rounded-lg bg-violet-500/10 flex items-center justify-center">
					<Icon className="size-5 text-violet-500" />
				</div>
				<p className="text-xs text-muted-foreground uppercase tracking-wide">
					{label}
				</p>
				<p className="font-semibold">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const TicketCard = ({ type, quantity, price, seat }: TicketTypeProps) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
					<Ticket className="size-6" />
				</div>
				<div className="flex-1">
					<p className="font-semibold">{type}</p>
					{seat && (
						<p className="text-sm text-muted-foreground">Seat: {seat}</p>
					)}
					<div className="flex items-center justify-between mt-2">
						<Badge variant="outline">×{quantity}</Badge>
						<p className="font-semibold">{price}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const QRCard = ({ ticketCode }: { ticketCode: string }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-4">
				<div className="size-40 mx-auto bg-white dark:bg-slate-900 rounded-xl p-3 border">
					<div className="size-full bg-muted rounded-lg flex items-center justify-center">
						<QrCode className="size-24 text-muted-foreground/50" />
					</div>
				</div>
				<div>
					<p className="font-mono text-xl font-bold">{ticketCode}</p>
					<p className="text-sm text-muted-foreground">Show at entrance</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" className="flex-1 gap-2">
						<Download className="size-4" />
						Save
					</Button>
					<Button variant="outline" size="sm" className="flex-1 gap-2">
						<Share2 className="size-4" />
						Share
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const VenueCard = ({
	name,
	address,
	directions,
}: {
	name: string;
	address: string;
	directions: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="space-y-4">
				<div className="h-24 rounded-lg bg-muted flex items-center justify-center">
					<MapPin className="size-10 text-muted-foreground/50" />
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
				</div>
				<Button variant="outline" className="w-full gap-2">
					<MapPin className="size-4" />
					{directions}
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
				asChild
			>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const eventInfo: TicketInfoProps[] = [
		{ icon: Calendar, label: 'Date', value: 'Sat, Jun 15' },
		{ icon: Clock, label: 'Doors', value: '6:00 PM' },
		{ icon: Users, label: 'Tickets', value: '2 Guests' },
		{ icon: Ticket, label: 'Type', value: 'VIP Access' },
	];

	const tickets: TicketTypeProps[] = [
		{ type: 'General Admission', quantity: 1, price: '$75.00' },
		{ type: 'VIP Upgrade', quantity: 1, price: '$50.00', seat: 'VIP-A12' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<EventBanner
					eventName="Summer Music Festival"
					venue="Madison Square Garden"
				/>

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					{eventInfo.map((info, i) => (
						<InfoGridCard key={i} {...info} />
					))}
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 grid @sm:grid-cols-2 gap-4">
						{tickets.map((ticket, i) => (
							<TicketCard key={i} {...ticket} />
						))}
						<VenueCard
							name="Madison Square Garden"
							address="4 Pennsylvania Plaza, New York, NY"
							directions="Get Directions"
						/>
					</div>
					<QRCard ticketCode="TKT-ABCD-1234" />
				</div>

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{ label: 'View All Tickets', href: '/tickets', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
