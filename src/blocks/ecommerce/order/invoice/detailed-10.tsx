import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Calendar,
	Camera,
	Check,
	Clock,
	Download,
	FileImage,
	Heart,
	ImageIcon,
	MapPin,
	Package,
	Star,
	Users,
} from 'lucide-react';

interface EventInfoProps {
	eventType: string;
	eventDate: string;
	eventTime: string;
	venue: string;
	venueAddress: string;
	clientNames: string;
	guestCount: number;
}

interface PhotographerInfoProps {
	name: string;
	company: string;
	phone: string;
	email: string;
	website: string;
	licenseNumber: string;
}

interface PackageProps {
	name: string;
	description: string;
	hours: number;
	photographers: number;
	deliverables: string[];
	price: number;
}

interface AdditionalServiceProps {
	service: string;
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

interface MilestoneProps {
	name: string;
	date: string;
	status: string;
	amount: number;
}

interface DeliverableProps {
	item: string;
	quantity: number;
	format: string;
	deliveryDate: string;
	status: string;
}

interface InvoiceSummaryProps {
	packageTotal: number;
	additionalServices: number;
	travelFees: number;
	subtotal: number;
	depositPaid: number;
	balanceDue: number;
	currency: string;
}

const EventInfo = ({
	eventType,
	eventDate,
	eventTime,
	venue,
	venueAddress,
	clientNames,
	guestCount,
}: EventInfoProps) => (
	<Card className="bg-gradient-to-r from-pink-500/5 to-rose-500/5 border-pink-500/20">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="size-16 rounded-lg bg-pink-500/10 flex items-center justify-center">
						<Heart className="size-8 text-pink-500" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">{eventType}</h1>
						<p className="text-lg text-muted-foreground">{clientNames}</p>
					</div>
				</div>
				<Badge variant="default" className="text-sm">
					Confirmed
				</Badge>
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Date</p>
						<p className="font-medium">{eventDate}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Time</p>
						<p className="font-medium">{eventTime}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<MapPin className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Venue</p>
						<p className="font-medium">{venue}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Users className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Guest Count</p>
						<p className="font-medium">{guestCount} guests</p>
					</div>
				</div>
			</div>
			<div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
				<MapPin className="size-4 inline mr-2" />
				{venueAddress}
			</div>
		</CardContent>
	</Card>
);

const PhotographerInfo = ({
	name,
	company,
	phone,
	email,
	website,
	licenseNumber,
}: PhotographerInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<Camera className="size-4" />
				Photography Services By
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-3">
				<Avatar className="size-12">
					<AvatarFallback className="bg-primary/10 text-primary">
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{company}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-2 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Phone</p>
					<p>{phone}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Email</p>
					<p className="truncate">{email}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Website</p>
					<p className="text-primary">{website}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">License</p>
					<p className="font-mono text-xs">{licenseNumber}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PackageDetails = ({
	packageInfo,
	currency,
}: {
	packageInfo: PackageProps;
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-base flex items-center gap-2">
					<Package className="size-4" />
					Package Selected
				</CardTitle>
				<Badge variant="secondary" className="text-lg">
					{currency}
					{packageInfo.price.toLocaleString()}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<h3 className="text-xl font-bold">{packageInfo.name}</h3>
				<p className="text-sm text-muted-foreground">
					{packageInfo.description}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-muted-foreground" />
					<span>{packageInfo.hours} hours of coverage</span>
				</div>
				<div className="flex items-center gap-2">
					<Users className="size-4 text-muted-foreground" />
					<span>{packageInfo.photographers} photographer(s)</span>
				</div>
			</div>
			<Separator />
			<div>
				<p className="text-sm font-medium mb-2">Package Includes:</p>
				<div className="grid @md:grid-cols-2 gap-2">
					{packageInfo.deliverables.map((item, index) => (
						<div key={index} className="flex items-center gap-2 text-sm">
							<Check className="size-4 text-green-500" />
							<span>{item}</span>
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

const AdditionalServicesTable = ({
	services,
	currency,
}: {
	services: AdditionalServiceProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Star className="size-4" />
				Additional Services
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Service</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center">Qty</TableHead>
						<TableHead className="text-right">Unit Price</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{services.map((service, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{service.service}</TableCell>
							<TableCell className="text-muted-foreground text-sm">
								{service.description}
							</TableCell>
							<TableCell className="text-center">{service.quantity}</TableCell>
							<TableCell className="text-right">
								{currency}
								{service.unitPrice}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{service.total}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const PaymentMilestones = ({
	milestones,
	currency,
}: {
	milestones: MilestoneProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Calendar className="size-4" />
				Payment Schedule
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				{milestones.map((milestone, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
					>
						<div className="flex items-center gap-3">
							<div
								className={`size-8 rounded-full flex items-center justify-center ${milestone.status === 'Paid' ? 'bg-green-500' : milestone.status === 'Due' ? 'bg-yellow-500' : 'bg-muted'}`}
							>
								{milestone.status === 'Paid' ? (
									<Check className="size-4 text-white" />
								) : (
									<Clock className="size-4 text-white" />
								)}
							</div>
							<div>
								<p className="font-medium">{milestone.name}</p>
								<p className="text-xs text-muted-foreground">
									{milestone.date}
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-bold">
								{currency}
								{milestone.amount.toLocaleString()}
							</p>
							<Badge
								variant={
									milestone.status === 'Paid'
										? 'default'
										: milestone.status === 'Due'
											? 'destructive'
											: 'secondary'
								}
							>
								{milestone.status}
							</Badge>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const DeliverablesTable = ({
	deliverables,
}: {
	deliverables: DeliverableProps[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<ImageIcon className="size-4" />
				Deliverables
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Item</TableHead>
						<TableHead className="text-center">Quantity</TableHead>
						<TableHead>Format</TableHead>
						<TableHead>Est. Delivery</TableHead>
						<TableHead className="text-center">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{deliverables.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{item.item}</TableCell>
							<TableCell className="text-center">{item.quantity}</TableCell>
							<TableCell>
								<Badge variant="outline">{item.format}</Badge>
							</TableCell>
							<TableCell>{item.deliveryDate}</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										item.status === 'Delivered' ? 'default' : 'secondary'
									}
								>
									{item.status}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const InvoiceSummary = ({
	packageTotal,
	additionalServices,
	travelFees,
	subtotal,
	depositPaid,
	balanceDue,
	currency,
}: InvoiceSummaryProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-3">
			<CardTitle className="text-base text-primary-foreground">
				Invoice Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Photography Package</span>
					<span>
						{currency}
						{packageTotal.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Additional Services</span>
					<span>
						{currency}
						{additionalServices.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Travel Fees</span>
					<span>
						{currency}
						{travelFees.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-medium">
				<span>Total Contract</span>
				<span>
					{currency}
					{subtotal.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-green-300">
				<span>Deposit Paid</span>
				<span>
					-{currency}
					{depositPaid.toLocaleString()}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-2xl">
				<span>Balance Due</span>
				<span>
					{currency}
					{balanceDue.toLocaleString()}
				</span>
			</div>
			<p className="text-xs opacity-80 text-center">
				Due 7 days before event date
			</p>
			<Button variant="secondary" className="w-full">
				Pay Balance
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const event: EventInfoProps = {
		eventType: 'Wedding Photography',
		eventDate: 'Saturday, June 15, 2024',
		eventTime: '2:00 PM - 11:00 PM',
		venue: 'The Grand Estate',
		venueAddress: '1500 Vineyard Lane, Napa Valley, CA 94558',
		clientNames: 'Sarah Mitchell & James Anderson',
		guestCount: 150,
	};

	const photographer: PhotographerInfoProps = {
		name: 'Emily Rose Photography',
		company: 'Rose Creative Studios',
		phone: '(555) 234-5678',
		email: 'hello@emilyrosephoto.com',
		website: 'emilyrosephoto.com',
		licenseNumber: 'BUS-2024-78901',
	};

	const packageInfo: PackageProps = {
		name: 'Premium Wedding Collection',
		description:
			'Our most popular package for couples who want comprehensive coverage of their special day',
		hours: 9,
		photographers: 2,
		deliverables: [
			'500+ edited digital images',
			'Online gallery with download',
			'Engagement session (2 hours)',
			'Second photographer',
			'Print release',
			'Custom wedding timeline',
			'Highlight slideshow',
			'30 premium prints (8x10)',
		],
		price: 5500,
	};

	const additionalServices: AdditionalServiceProps[] = [
		{
			service: 'Album Design',
			description: '12x12 Premium Leather Album, 40 pages',
			quantity: 1,
			unitPrice: 850,
			total: 850,
		},
		{
			service: 'Parent Albums',
			description: '8x8 Duplicate albums for parents',
			quantity: 2,
			unitPrice: 350,
			total: 700,
		},
		{
			service: 'Extra Coverage',
			description: 'Additional hour of photography',
			quantity: 2,
			unitPrice: 350,
			total: 700,
		},
		{
			service: 'Rush Editing',
			description: 'Delivery within 2 weeks',
			quantity: 1,
			unitPrice: 500,
			total: 500,
		},
	];

	const milestones: MilestoneProps[] = [
		{
			name: 'Booking Deposit (25%)',
			date: 'February 15, 2024',
			status: 'Paid',
			amount: 2063,
		},
		{
			name: 'Mid-Payment (25%)',
			date: 'April 15, 2024',
			status: 'Due',
			amount: 2063,
		},
		{
			name: 'Final Balance (50%)',
			date: 'June 8, 2024',
			status: 'Upcoming',
			amount: 4124,
		},
	];

	const deliverables: DeliverableProps[] = [
		{
			item: 'Engagement Photos',
			quantity: 75,
			format: 'Digital',
			deliveryDate: 'Mar 15, 2024',
			status: 'Delivered',
		},
		{
			item: 'Wedding Day Photos',
			quantity: 500,
			format: 'Digital',
			deliveryDate: 'Jul 15, 2024',
			status: 'Pending',
		},
		{
			item: 'Wedding Album',
			quantity: 1,
			format: 'Physical',
			deliveryDate: 'Aug 30, 2024',
			status: 'Pending',
		},
		{
			item: 'Parent Albums',
			quantity: 2,
			format: 'Physical',
			deliveryDate: 'Aug 30, 2024',
			status: 'Pending',
		},
		{
			item: 'Premium Prints',
			quantity: 30,
			format: 'Physical',
			deliveryDate: 'Jul 30, 2024',
			status: 'Pending',
		},
		{
			item: 'Highlight Slideshow',
			quantity: 1,
			format: 'Video',
			deliveryDate: 'Jul 15, 2024',
			status: 'Pending',
		},
	];

	const summary: InvoiceSummaryProps = {
		packageTotal: 5500,
		additionalServices: 2750,
		travelFees: 0,
		subtotal: 8250,
		depositPaid: 2063,
		balanceDue: 6187,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<EventInfo {...event} />
					<div className="grid @md:grid-cols-2 gap-4">
						<PhotographerInfo {...photographer} />
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-semibold">Contract Details</h3>
									<Badge variant="default">Signed</Badge>
								</div>
								<div className="space-y-3 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Invoice Number
										</span>
										<span className="font-mono">INV-2024-W-0156</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Contract Date</span>
										<span>February 15, 2024</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Contract Status
										</span>
										<span className="text-green-600 font-medium">
											Fully Executed
										</span>
									</div>
								</div>
								<Button variant="outline" className="w-full mt-4 gap-2">
									<Download className="size-4" />
									Download Contract
								</Button>
							</CardContent>
						</Card>
					</div>
					<PackageDetails packageInfo={packageInfo} currency="$" />
					<AdditionalServicesTable services={additionalServices} currency="$" />
					<div className="grid @md:grid-cols-2 gap-4">
						<PaymentMilestones milestones={milestones} currency="$" />
						<InvoiceSummary {...summary} />
					</div>
					<DeliverablesTable deliverables={deliverables} />
					<Card>
						<CardContent className="pt-6 text-sm text-muted-foreground">
							<p className="font-medium text-foreground mb-2">
								Terms & Conditions Summary:
							</p>
							<ul className="list-disc list-inside space-y-1 text-xs">
								<li>Final balance due 7 days prior to event date</li>
								<li>
									Cancellation within 30 days of event forfeits all payments
								</li>
								<li>Images delivered within 6-8 weeks of event date</li>
								<li>
									Copyright remains with photographer; client receives print
									release
								</li>
								<li>
									Rescheduling available with 60+ days notice, subject to
									availability
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
