import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Ticket,
	QrCode,
	Calendar,
	MapPin,
	ArrowRight,
	Download,
	Share2,
	Users,
} from 'lucide-react';
import Link from 'next/link';

interface TicketInfoProps {
	type: string;
	quantity: number;
	price: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const TicketDisplay = ({
	eventName,
	date,
}: {
	eventName: string;
	date: string;
}) => (
	<div className="relative h-full min-h-[400px] @lg:min-h-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center overflow-hidden p-8">
		<div className="absolute inset-0">
			{[...Array(20)].map((_, i) => (
				<div
					key={i}
					className="absolute size-2 rounded-full bg-white/10"
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
					}}
				/>
			))}
		</div>
		<div className="relative w-full max-w-[280px]">
			<div className="bg-background rounded-2xl shadow-2xl overflow-hidden">
				<div className="p-6 text-center border-b border-dashed">
					<Ticket className="size-10 mx-auto mb-3 text-violet-600" />
					<h3 className="font-bold text-lg">{eventName}</h3>
					<p className="text-sm text-muted-foreground mt-1">{date}</p>
				</div>
				<div className="p-6 flex justify-center">
					<div className="size-32 rounded-xl bg-muted flex items-center justify-center">
						<QrCode className="size-20 text-muted-foreground" />
					</div>
				</div>
				<div className="px-6 pb-6">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Ticket ID</span>
						<span className="font-mono font-medium">TKT-78432</span>
					</div>
				</div>
			</div>
			<div className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-violet-600" />
			<div className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-violet-600" />
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @xl:text-3xl font-bold">{text}</h1>
);

const SuccessIndicator = () => (
	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600">
		<Ticket className="size-4" />
		<span className="font-medium text-sm">Tickets Confirmed</span>
	</div>
);

const EventDetails = ({
	name,
	date,
	time,
	location,
}: {
	name: string;
	date: string;
	time: string;
	location: string;
}) => (
	<Card className="border-violet-200 dark:border-violet-800/30 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
		<CardContent className="pt-6 space-y-4">
			<h3 className="font-bold text-lg">{name}</h3>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-violet-600" />
					<div>
						<p className="text-sm font-medium">{date}</p>
						<p className="text-xs text-muted-foreground">{time}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<MapPin className="size-4 text-violet-600" />
					<p className="text-sm font-medium">{location}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TicketInfo = ({ type, quantity, price, currency }: TicketInfoProps) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
				<Users className="size-5 text-violet-600" />
			</div>
			<div>
				<p className="font-medium text-sm">{type}</p>
				<p className="text-xs text-muted-foreground">x{quantity}</p>
			</div>
		</div>
		<p className="font-semibold">
			{currency}
			{(price * quantity).toFixed(2)}
		</p>
	</div>
);

const TicketsList = ({ tickets }: { tickets: TicketInfoProps[] }) => (
	<div className="space-y-3">
		<h3 className="font-semibold text-sm">Your Tickets</h3>
		<div className="space-y-2">
			{tickets.map((ticket, i) => (
				<TicketInfo key={i} {...ticket} />
			))}
		</div>
	</div>
);

const TotalSection = ({
	total,
	currency,
}: {
	total: number;
	currency: string;
}) => (
	<div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
		<div className="flex justify-between items-center">
			<span className="font-medium">Total Paid</span>
			<span className="text-2xl font-bold text-violet-600">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const TicketActions = () => (
	<div className="flex gap-3">
		<Button variant="outline" className="flex-1 gap-2">
			<Download className="size-4" />
			Download
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<Share2 className="size-4" />
			Share
		</Button>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
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
	const tickets: TicketInfoProps[] = [
		{ type: 'VIP Access', quantity: 2, price: 150.0, currency: '$' },
		{ type: 'General Admission', quantity: 1, price: 75.0, currency: '$' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
					<TicketDisplay
						eventName="Summer Music Festival"
						date="July 15, 2024"
					/>

					<div className="p-6 @lg:p-8 space-y-6">
						<div className="space-y-3">
							<Title text="You're all set!" />
							<SuccessIndicator />
						</div>

						<EventDetails
							name="Summer Music Festival 2024"
							date="Saturday, July 15"
							time="4:00 PM - 11:00 PM"
							location="Central Park, NYC"
						/>

						<TicketsList tickets={tickets} />

						<TotalSection total={375.0} currency="$" />

						<TicketActions />

						<CTA
							items={[
								{ label: 'View Tickets', href: '/tickets', icon: ArrowRight },
								{ label: 'Browse Events', href: '/events', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
