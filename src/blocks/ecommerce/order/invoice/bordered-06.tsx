import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Camera, Clock, FileImage, MapPin, Star, User } from 'lucide-react';

interface SessionProps {
	type: string;
	client: string;
	date: string;
	time: string;
	location: string;
}

interface PackageProps {
	name: string;
	description: string;
	hours: number;
	images: number;
	price: number;
}

interface AddOnProps {
	name: string;
	quantity: number;
	price: number;
}

interface TotalsProps {
	package: number;
	addOns: number;
	retainer: number;
	balance: number;
	currency: string;
}

const SessionHeader = ({
	type,
	client,
	date,
	time,
	location,
}: SessionProps) => (
	<div className="relative border-4 border-foreground p-6">
		<div className="absolute -top-3 left-4 bg-background px-3">
			<Badge variant="outline" className="rounded-none text-xs font-bold">
				{type}
			</Badge>
		</div>
		<div className="flex items-start justify-between pt-2">
			<div>
				<p className="text-sm text-muted-foreground flex items-center gap-2">
					<User className="size-3" />
					Client
				</p>
				<h1 className="text-2xl font-bold">{client}</h1>
			</div>
			<div className="text-right">
				<p className="font-medium">{date}</p>
				<p className="text-sm text-muted-foreground flex items-center gap-2 justify-end">
					<Clock className="size-3" />
					{time}
				</p>
				<p className="text-sm text-muted-foreground flex items-center gap-2 justify-end">
					<MapPin className="size-3" />
					{location}
				</p>
			</div>
		</div>
	</div>
);

const PackageCard = ({
	name,
	description,
	hours,
	images,
	price,
	currency,
}: PackageProps & { currency: string }) => (
	<div className="relative border-4 border-primary p-6">
		<div className="absolute -top-3 left-4 bg-background px-3">
			<Badge variant="default" className="rounded-none text-xs font-bold">
				Selected Package
			</Badge>
		</div>
		<div className="flex items-start gap-4 pt-2">
			<div className="size-14 border-2 border-primary flex items-center justify-center">
				<Camera className="size-7 text-primary" />
			</div>
			<div className="flex-1">
				<h2 className="text-xl font-bold">{name}</h2>
				<p className="text-sm text-muted-foreground mb-3">{description}</p>
				<div className="flex gap-6 text-sm">
					<span className="flex items-center gap-1">
						<Clock className="size-4 text-primary" />
						{hours} hours
					</span>
					<span className="flex items-center gap-1">
						<FileImage className="size-4 text-primary" />
						{images} edited images
					</span>
				</div>
			</div>
			<div className="text-right">
				<p className="text-2xl font-bold">
					{currency}
					{price.toLocaleString()}
				</p>
			</div>
		</div>
	</div>
);

const AddOnRow = ({
	addOn,
	currency,
}: {
	addOn: AddOnProps;
	currency: string;
}) => (
	<div className="flex items-center justify-between border-b-2 border-dashed border-foreground/30 py-3 last:border-0">
		<div className="flex items-center gap-2">
			<Star className="size-4 text-amber-500" />
			<span>{addOn.name}</span>
		</div>
		<div className="flex items-center gap-6">
			<span className="text-sm text-muted-foreground">×{addOn.quantity}</span>
			<span className="font-bold min-w-[80px] text-right">
				{currency}
				{(addOn.price * addOn.quantity).toFixed(2)}
			</span>
		</div>
	</div>
);

const TotalsSection = ({
	package: pkg,
	addOns,
	retainer,
	balance,
	currency,
}: TotalsProps) => (
	<div className="border-4 border-foreground">
		<div className="bg-foreground text-background p-4">
			<p className="text-xs font-bold uppercase tracking-widest">
				Payment Summary
			</p>
		</div>
		<div className="p-4 space-y-3">
			<div className="flex justify-between">
				<span>Package</span>
				<span className="font-medium">
					{currency}
					{pkg.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between">
				<span>Add-Ons</span>
				<span className="font-medium">
					{currency}
					{addOns.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold">
				<span>Total</span>
				<span>
					{currency}
					{(pkg + addOns).toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-green-600">
				<span>Retainer Paid</span>
				<span>
					-{currency}
					{retainer.toLocaleString()}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-xl font-bold">
				<span>Balance Due</span>
				<span className="text-primary">
					{currency}
					{balance.toLocaleString()}
				</span>
			</div>
			<p className="text-xs text-muted-foreground text-center pt-2">
				Balance due on day of session
			</p>
		</div>
	</div>
);

const TermsSection = () => (
	<div className="relative border-2 border-dashed border-foreground/50 p-4">
		<div className="absolute -top-2 left-4 bg-background px-2">
			<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
				Terms
			</p>
		</div>
		<ul className="text-sm text-muted-foreground space-y-2 pt-2">
			<li>• Retainer is non-refundable</li>
			<li>• Rescheduling requires 48-hour notice</li>
			<li>• Additional hours: $300/hour</li>
			<li>• Final images delivered within 3 weeks</li>
		</ul>
	</div>
);

export default function Main() {
	const session: SessionProps = {
		type: 'Family Portrait',
		client: 'The Martinez Family',
		date: 'Saturday, April 20, 2024',
		time: '10:00 AM - 1:00 PM',
		location: 'Golden Gate Park, San Francisco',
	};

	const selectedPackage: PackageProps = {
		name: 'Premium Portrait Package',
		description:
			'Perfect for families, includes indoor and outdoor shots with multiple outfit changes',
		hours: 3,
		images: 50,
		price: 895,
	};

	const addOns: AddOnProps[] = [
		{ name: 'Extra Edited Images (10 images)', quantity: 2, price: 75 },
		{ name: 'Rush Delivery (1 week)', quantity: 1, price: 150 },
		{ name: 'Print-Ready File Prep', quantity: 1, price: 50 },
		{ name: '8×10 Premium Print', quantity: 3, price: 35 },
	];

	const totals: TotalsProps = {
		package: 895,
		addOns: 455,
		retainer: 400,
		balance: 950,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<SessionHeader {...session} />
				<div className="mt-4">
					<PackageCard {...selectedPackage} currency="$" />
				</div>
				<div className="border-4 border-foreground border-t-0 p-4">
					<p className="text-xs font-bold uppercase tracking-widest mb-3">
						Add-On Services
					</p>
					{addOns.map((addOn, index) => (
						<AddOnRow key={index} addOn={addOn} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<TermsSection />
					<TotalsSection {...totals} />
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<Button variant="outline" className="rounded-none">
						Download Invoice
					</Button>
					<Button className="rounded-none">Pay Balance</Button>
				</div>
			</div>
		</section>
	);
}
