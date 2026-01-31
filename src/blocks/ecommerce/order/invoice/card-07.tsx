import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Camera,
	Check,
	Clock,
	Image,
	Package,
	Palette,
	Printer,
	User,
} from 'lucide-react';

interface PhotographerCardProps {
	name: string;
	specialty: string;
	email: string;
	phone: string;
}

interface ClientCardProps {
	name: string;
	email: string;
	eventDate: string;
	eventType: string;
}

interface PackageCardProps {
	name: string;
	description: string;
	includes: string[];
	price: number;
	currency: string;
}

interface AddOnCardProps {
	name: string;
	description: string;
	quantity: number;
	unitPrice: number;
	currency: string;
}

interface PaymentTermsCardProps {
	depositAmount: number;
	depositPaid: boolean;
	depositDate: string;
	balanceDue: number;
	balanceDueDate: string;
	currency: string;
}

const PhotographerCard = ({
	name,
	specialty,
	email,
	phone,
}: PhotographerCardProps) => (
	<Card className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 border-pink-500/20">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Camera className="size-4" />
				Photographer
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-center gap-3">
				<div className="size-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
					<User className="size-6 text-white" />
				</div>
				<div>
					<p className="font-semibold">{name}</p>
					<Badge variant="secondary">{specialty}</Badge>
				</div>
			</div>
			<div className="text-sm text-muted-foreground space-y-1">
				<p>{email}</p>
				<p>{phone}</p>
			</div>
		</CardContent>
	</Card>
);

const ClientCard = ({ name, email, eventDate, eventType }: ClientCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<User className="size-4" />
				Client Details
			</CardTitle>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Client Name</p>
				<p className="font-medium">{name}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Email</p>
				<p className="font-medium">{email}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Event Date</p>
				<p className="font-medium">{eventDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Event Type</p>
				<Badge variant="outline">{eventType}</Badge>
			</div>
		</CardContent>
	</Card>
);

const PackageCard = ({
	name,
	description,
	includes,
	price,
	currency,
}: PackageCardProps) => (
	<Card className="border-primary">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Award className="size-4 text-primary" />
					<CardTitle className="text-base">{name}</CardTitle>
				</div>
				<p className="text-xl font-bold text-primary">
					{currency}
					{price.toLocaleString()}
				</p>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="grid grid-cols-2 gap-2">
				{includes.map((item, index) => (
					<div key={index} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-green-500" />
						<span>{item}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const AddOnCard = ({
	name,
	description,
	quantity,
	unitPrice,
	currency,
}: AddOnCardProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						{name.includes('Print') ? (
							<Printer className="size-5" />
						) : name.includes('Album') ? (
							<Image className="size-5" />
						) : (
							<Package className="size-5" />
						)}
					</div>
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>
				<div className="text-right">
					<p className="font-bold">
						{currency}
						{(quantity * unitPrice).toFixed(2)}
					</p>
					<p className="text-xs text-muted-foreground">
						{quantity} × {currency}
						{unitPrice}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PaymentTermsCard = ({
	depositAmount,
	depositPaid,
	depositDate,
	balanceDue,
	balanceDueDate,
	currency,
}: PaymentTermsCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm opacity-80">Deposit</p>
					<p className="text-xl font-bold">
						{currency}
						{depositAmount.toLocaleString()}
					</p>
				</div>
				{depositPaid ? (
					<Badge variant="secondary" className="gap-1">
						<Check className="size-3" />
						Paid {depositDate}
					</Badge>
				) : (
					<Badge variant="destructive">Due</Badge>
				)}
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div>
				<p className="text-sm opacity-80">Balance Due by {balanceDueDate}</p>
				<p className="text-3xl font-bold">
					{currency}
					{balanceDue.toLocaleString()}
				</p>
			</div>
			<Button variant="secondary" className="w-full">
				Pay Balance
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const photographer: PhotographerCardProps = {
		name: 'Jessica Lane Photography',
		specialty: 'Wedding & Portrait',
		email: 'hello@jessicalane.com',
		phone: '(555) 234-5678',
	};

	const client: ClientCardProps = {
		name: 'David & Rachel Thompson',
		email: 'thompson.wedding@email.com',
		eventDate: 'June 15, 2024',
		eventType: 'Wedding',
	};

	const photographyPackage: PackageCardProps = {
		name: 'Premium Wedding Package',
		description:
			'Full-day coverage with two photographers for your special day',
		includes: [
			'8 hours coverage',
			'Second photographer',
			'500+ edited photos',
			'Online gallery',
			'Engagement session',
			'Print release',
		],
		price: 3500,
		currency: '$',
	};

	const addOns: AddOnCardProps[] = [
		{
			name: 'Premium Photo Album',
			description: '12x12 leather-bound, 40 pages',
			quantity: 1,
			unitPrice: 450,
			currency: '$',
		},
		{
			name: 'Canvas Prints',
			description: '16x20 gallery-wrapped canvas',
			quantity: 2,
			unitPrice: 175,
			currency: '$',
		},
		{
			name: 'Parent Albums',
			description: '8x8 linen album',
			quantity: 2,
			unitPrice: 225,
			currency: '$',
		},
	];

	const payment: PaymentTermsCardProps = {
		depositAmount: 1000,
		depositPaid: true,
		depositDate: 'Feb 1, 2024',
		balanceDue: 3500,
		balanceDueDate: 'June 1, 2024',
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<Camera className="size-5 text-primary" />
							<h1 className="text-xl font-bold">Photography Invoice</h1>
						</div>
						<Badge variant="outline" className="font-mono">
							INV-2024-0234
						</Badge>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<PhotographerCard {...photographer} />
						<ClientCard {...client} />
					</div>
					<PackageCard {...photographyPackage} />
					<div className="space-y-3">
						<h3 className="font-semibold text-sm text-muted-foreground">
							Add-Ons & Prints
						</h3>
						{addOns.map((addOn, index) => (
							<AddOnCard key={index} {...addOn} />
						))}
					</div>
					<PaymentTermsCard {...payment} />
				</div>
			</div>
		</section>
	);
}
