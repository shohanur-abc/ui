import {
	Calendar,
	Clock,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface EventProps {
	title: string;
	date: string;
	time: string;
	location: string;
	image: string;
	initials: string;
}

interface TicketProps {
	type: string;
	description: string;
	price: string;
	quantity: number;
}

interface AttendeesProps {
	count: number;
	avatars: { src: string; initials: string }[];
}

interface PriceLineProps {
	label: string;
	value: string;
	isTotal?: boolean;
}

const EventHeader = ({
	title,
	date,
	time,
	location,
	image,
	initials,
}: EventProps) => (
	<div className="space-y-4">
		<div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent overflow-hidden flex items-center justify-center">
			<Avatar className="size-24">
				<AvatarImage src={image} alt={title} />
				<AvatarFallback className="text-3xl bg-primary/10">
					{initials}
				</AvatarFallback>
			</Avatar>
		</div>
		<div className="space-y-3">
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
			<div className="flex flex-wrap gap-3">
				<Badge variant="secondary" className="gap-1.5">
					<Calendar className="size-3" />
					{date}
				</Badge>
				<Badge variant="secondary" className="gap-1.5">
					<Clock className="size-3" />
					{time}
				</Badge>
				<Badge variant="outline" className="gap-1.5">
					<MapPin className="size-3" />
					{location}
				</Badge>
			</div>
		</div>
	</div>
);

const TicketItem = ({ type, description, price, quantity }: TicketProps) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
		<div>
			<h4 className="font-medium">{type}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{price}</p>
			<p className="text-sm text-muted-foreground">x{quantity}</p>
		</div>
	</div>
);

const TicketsList = ({ tickets }: { tickets: TicketProps[] }) => (
	<div className="space-y-3">
		<h3 className="font-semibold">Your Tickets</h3>
		{tickets.map((ticket, index) => (
			<TicketItem key={index} {...ticket} />
		))}
	</div>
);

const AttendeesPreview = ({ count, avatars }: AttendeesProps) => (
	<div className="flex items-center gap-3">
		<div className="flex -space-x-2">
			{avatars.map((avatar, index) => (
				<Avatar key={index} className="size-8 border-2 border-background">
					<AvatarImage src={avatar.src} />
					<AvatarFallback className="text-xs">{avatar.initials}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<div className="flex items-center gap-1 text-sm text-muted-foreground">
			<Users className="size-4" />
			<span>{count}+ attending</span>
		</div>
	</div>
);

const PriceLine = ({ label, value, isTotal }: PriceLineProps) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-semibold' : 'text-sm'}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

const PriceSummary = ({ lines }: { lines: PriceLineProps[] }) => (
	<div className="space-y-2 p-4 rounded-xl bg-muted/30">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<PriceLine {...line} />
			</div>
		))}
	</div>
);

const PaymentInput = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const PayButton = ({ amount }: { amount: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		Pay {amount}
	</Button>
);

const GuaranteeFooter = ({ text }: { text: string }) => (
	<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
		<Shield className="size-3.5" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	const event: EventProps = {
		title: 'Tech Conference 2026',
		date: 'Mar 15, 2026',
		time: '9:00 AM - 6:00 PM',
		location: 'San Francisco, CA',
		image: '',
		initials: 'TC',
	};

	const tickets: TicketProps[] = [
		{
			type: 'VIP Pass',
			description: 'All access + backstage',
			price: '$299',
			quantity: 2,
		},
		{
			type: 'Workshop Add-on',
			description: 'Hands-on sessions',
			price: '$99',
			quantity: 1,
		},
	];

	const attendees: AttendeesProps = {
		count: 500,
		avatars: [
			{ src: '', initials: 'JD' },
			{ src: '', initials: 'MK' },
			{ src: '', initials: 'AS' },
			{ src: '', initials: 'RB' },
		],
	};

	const priceLines: PriceLineProps[] = [
		{ label: 'VIP Pass x2', value: '$598.00' },
		{ label: 'Workshop x1', value: '$99.00' },
		{ label: 'Service Fee', value: '$17.43' },
		{ label: 'Total', value: '$714.43', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<EventHeader {...event} />
						<Separator />
						<AttendeesPreview {...attendees} />
						<Separator />
						<TicketsList tickets={tickets} />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Payment Details</h3>
							</CardHeader>
							<CardContent className="space-y-6">
								<PriceSummary lines={priceLines} />
								<Separator />
								<div className="space-y-4">
									<PaymentInput
										id="email"
										label="Email for tickets"
										placeholder="john@example.com"
									/>
									<PaymentInput
										id="card"
										label="Card Number"
										placeholder="1234 5678 9012 3456"
										icon={CreditCard}
									/>
									<div className="grid grid-cols-2 gap-4">
										<PaymentInput id="exp" label="Expiry" placeholder="MM/YY" />
										<PaymentInput
											id="cvc"
											label="CVC"
											placeholder="123"
											type="password"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<PayButton amount="$714.43" />
								<GuaranteeFooter text="100% money-back guarantee if event is cancelled" />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
