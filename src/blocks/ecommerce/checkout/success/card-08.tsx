import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Store,
	MapPin,
	Clock,
	Phone,
	QrCode,
	ArrowRight,
	Copy,
	Navigation,
} from 'lucide-react';
import Link from 'next/link';

interface StoreInfoProps {
	name: string;
	address: string;
	city: string;
	phone: string;
	hours: string;
}

interface PickupDetailsProps {
	code: string;
	validUntil: string;
	items: number;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PickupReadyCard = ({
	orderNumber,
	status,
}: {
	orderNumber: string;
	status: string;
}) => (
	<Card className="bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-transparent border-emerald-200 dark:border-emerald-800/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
					<Store className="size-7 text-emerald-500" />
				</div>
				<div className="flex-1">
					<h1 className="text-xl @lg:text-2xl font-bold">Ready for Pickup!</h1>
					<p className="text-muted-foreground text-sm">Order #{orderNumber}</p>
				</div>
				<Badge className="bg-emerald-500">{status}</Badge>
			</div>
		</CardContent>
	</Card>
);

const QRCodeCard = ({ code, validUntil, items }: PickupDetailsProps) => (
	<Card>
		<CardContent className="pt-6 text-center">
			<div className="size-48 mx-auto bg-muted rounded-xl flex items-center justify-center mb-4">
				<QrCode className="size-32 text-muted-foreground/50" />
			</div>
			<div className="flex items-center justify-center gap-2 mb-2">
				<p className="font-mono text-2xl font-bold tracking-wider">{code}</p>
				<Button variant="ghost" size="icon" className="size-8">
					<Copy className="size-4" />
				</Button>
			</div>
			<p className="text-sm text-muted-foreground">
				Show this code at pickup counter • Valid until {validUntil}
			</p>
			<Badge variant="secondary" className="mt-4">
				{items} items ready
			</Badge>
		</CardContent>
	</Card>
);

const StoreInfoCard = ({
	name,
	address,
	city,
	phone,
	hours,
}: StoreInfoProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<MapPin className="size-4" />
				Pickup Location
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="font-semibold text-lg">{name}</p>
				<p className="text-muted-foreground">{address}</p>
				<p className="text-muted-foreground">{city}</p>
			</div>
			<Separator />
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-muted-foreground" />
					<span>{hours}</span>
				</div>
				<div className="flex items-center gap-2">
					<Phone className="size-4 text-muted-foreground" />
					<span>{phone}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MapPreviewCard = () => (
	<Card className="overflow-hidden">
		<div className="h-48 bg-muted flex items-center justify-center">
			<div className="text-center">
				<MapPin className="size-12 text-muted-foreground/50 mx-auto mb-2" />
				<p className="text-sm text-muted-foreground">Map Preview</p>
			</div>
		</div>
		<CardContent className="pt-4">
			<Button variant="outline" className="w-full gap-2">
				<Navigation className="size-4" />
				Get Directions
			</Button>
		</CardContent>
	</Card>
);

const PickupItemsCard = ({
	items,
}: {
	items: { name: string; quantity: number }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Items for Pickup</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex items-center justify-between">
					<span className="text-sm">{item.name}</span>
					<Badge variant="outline">×{item.quantity}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const InstructionsCard = ({ instructions }: { instructions: string[] }) => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-muted-foreground">
				Pickup Instructions
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ol className="list-decimal list-inside space-y-1 text-sm">
				{instructions.map((instruction, i) => (
					<li key={i}>{instruction}</li>
				))}
			</ol>
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
	const pickupItems = [
		{ name: 'Wireless Headphones', quantity: 1 },
		{ name: 'USB-C Cable', quantity: 2 },
		{ name: 'Phone Case', quantity: 1 },
	];

	const instructions = [
		'Go to the pickup counter on Floor 1',
		'Show your QR code or pickup number',
		'Collect your items and sign for receipt',
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<PickupReadyCard orderNumber="ORD-2024-78432" status="Ready" />

				<div className="grid @md:grid-cols-2 gap-6">
					<div className="space-y-6">
						<QRCodeCard code="PU-4527" validUntil="Jan 22, 6:00 PM" items={4} />
						<PickupItemsCard items={pickupItems} />
					</div>
					<div className="space-y-6">
						<StoreInfoCard
							name="Downtown Tech Store"
							address="123 Main Street"
							city="New York, NY 10001"
							phone="(555) 123-4567"
							hours="9 AM - 9 PM"
						/>
						<MapPreviewCard />
					</div>
				</div>

				<InstructionsCard instructions={instructions} />

				<CTA
					items={[
						{ label: 'Get Directions', href: '/directions', icon: Navigation },
						{ label: 'View Order', href: '/orders', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
