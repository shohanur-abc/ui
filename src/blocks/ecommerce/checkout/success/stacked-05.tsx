import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Ticket,
	Calendar,
	Clock,
	MapPin,
	ArrowRight,
	QrCode,
	Download,
	Share2,
	Users,
} from 'lucide-react';
import Link from 'next/link';

interface TicketDetailsProps {
	eventName: string;
	date: string;
	time: string;
	venue: string;
	address: string;
	ticketType: string;
	quantity: number;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const TicketHeader = ({
	confirmationNumber,
}: {
	confirmationNumber: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto">
			<Ticket className="size-10 text-violet-500" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Tickets Confirmed!
			</h1>
			<p className="text-muted-foreground mt-2">
				Your tickets have been booked successfully
			</p>
		</div>
		<Badge variant="secondary" className="font-mono text-base px-4 py-1">
			Confirmation: {confirmationNumber}
		</Badge>
	</div>
);

const EventCard = ({
	eventName,
	date,
	time,
	venue,
	address,
}: Omit<TicketDetailsProps, 'ticketType' | 'quantity'>) => (
	<div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-pink-500/10 border border-violet-200 dark:border-violet-800/30">
		<h2 className="text-xl @lg:text-2xl font-bold mb-4">{eventName}</h2>
		<div className="grid @sm:grid-cols-2 gap-4">
			<div className="flex items-start gap-3">
				<Calendar className="size-5 text-violet-500 mt-0.5" />
				<div>
					<p className="font-medium">{date}</p>
					<p className="text-sm text-muted-foreground">Date</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<Clock className="size-5 text-violet-500 mt-0.5" />
				<div>
					<p className="font-medium">{time}</p>
					<p className="text-sm text-muted-foreground">Doors Open</p>
				</div>
			</div>
			<div className="@sm:col-span-2 flex items-start gap-3 pt-2">
				<MapPin className="size-5 text-violet-500 mt-0.5" />
				<div>
					<p className="font-medium">{venue}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
				</div>
			</div>
		</div>
	</div>
);

const QRCodeSection = ({ ticketCode }: { ticketCode: string }) => (
	<div className="text-center space-y-4">
		<h2 className="font-semibold text-lg">Your Ticket</h2>
		<div className="inline-block p-6 rounded-2xl bg-white dark:bg-slate-900 border">
			<div className="size-48 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
				<QrCode className="size-32 text-muted-foreground/50" />
			</div>
			<p className="font-mono font-bold text-lg">{ticketCode}</p>
		</div>
		<p className="text-sm text-muted-foreground">
			Show this QR code at the venue entrance
		</p>
	</div>
);

const TicketInfo = ({
	ticketType,
	quantity,
	price,
	currency,
}: {
	ticketType: string;
	quantity: number;
	price: number;
	currency: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">Ticket Details</h2>
		<div className="p-4 rounded-xl bg-muted/30">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
						<Users className="size-5 text-violet-500" />
					</div>
					<div>
						<p className="font-medium">{ticketType}</p>
						<p className="text-sm text-muted-foreground">
							{quantity} {quantity === 1 ? 'ticket' : 'tickets'}
						</p>
					</div>
				</div>
				<p className="font-semibold text-lg">
					{currency}
					{price.toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const QuickActions = () => (
	<div className="grid grid-cols-2 gap-3">
		<Button variant="outline" className="gap-2">
			<Download className="size-4" />
			Save Ticket
		</Button>
		<Button variant="outline" className="gap-2">
			<Share2 className="size-4" />
			Share
		</Button>
	</div>
);

const ImportantInfo = ({ items }: { items: string[] }) => (
	<div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-200 dark:border-amber-800/30">
		<h3 className="font-semibold mb-3 text-amber-700 dark:text-amber-400">
			Important Information
		</h3>
		<ul className="space-y-2 text-sm">
			{items.map((item, i) => (
				<li key={i} className="flex items-start gap-2">
					<span className="text-amber-500 mt-0.5">•</span>
					{item}
				</li>
			))}
		</ul>
	</div>
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
	const importantInfo = [
		'Arrive at least 30 minutes before the event starts',
		'Bring a valid photo ID matching the ticket holder name',
		'No professional cameras or recording equipment allowed',
		'Check venue website for parking information',
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<TicketHeader confirmationNumber="TKT-2024-78432" />

				<EventCard
					eventName="Summer Music Festival 2024"
					date="Saturday, June 15, 2024"
					time="6:00 PM"
					venue="Madison Square Garden"
					address="4 Pennsylvania Plaza, New York, NY 10001"
				/>

				<Separator />

				<QRCodeSection ticketCode="TKT-ABCD-1234-EFGH" />

				<TicketInfo
					ticketType="General Admission"
					quantity={2}
					price={199.98}
					currency="$"
				/>

				<QuickActions />

				<ImportantInfo items={importantInfo} />

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar', icon: Calendar },
						{ label: 'Get Directions', href: '/directions', variant: 'outline', icon: MapPin },
					]}
				/>
			</div>
		</section>
	);
}
