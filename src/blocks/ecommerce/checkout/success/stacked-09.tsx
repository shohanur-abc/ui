import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Store,
	MapPin,
	Clock,
	QrCode,
	ArrowRight,
	Navigation,
	Package,
	Phone,
} from 'lucide-react';
import Link from 'next/link';

interface PickupDetailsProps {
	code: string;
	items: number;
	validUntil: string;
}

interface StoreProps {
	name: string;
	address: string;
	city: string;
	phone: string;
	hours: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PickupHeader = ({
	orderNumber,
	status,
}: {
	orderNumber: string;
	status: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
			<Store className="size-10 text-emerald-500" />
		</div>
		<div>
			<Badge className="bg-emerald-500 mb-3">{status}</Badge>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Ready for Pickup!
			</h1>
			<p className="text-muted-foreground mt-2">Order #{orderNumber}</p>
		</div>
	</div>
);

const QRSection = ({ code, items, validUntil }: PickupDetailsProps) => (
	<div className="text-center space-y-4">
		<div className="inline-block p-6 rounded-2xl bg-white dark:bg-slate-900 border">
			<div className="size-48 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
				<QrCode className="size-32 text-muted-foreground/50" />
			</div>
			<p className="font-mono text-2xl font-bold tracking-wider">{code}</p>
		</div>
		<div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
			<span>{items} items</span>
			<span>•</span>
			<span>Valid until {validUntil}</span>
		</div>
	</div>
);

const StoreSection = ({ name, address, city, phone, hours }: StoreProps) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<MapPin className="size-5" />
			Pickup Location
		</h2>
		<div className="p-4 rounded-xl bg-muted/30 space-y-4">
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
		</div>
	</div>
);

const MapPreview = () => (
	<div className="space-y-3">
		<div className="h-48 rounded-xl bg-muted flex items-center justify-center">
			<div className="text-center">
				<MapPin className="size-10 text-muted-foreground/50 mx-auto mb-2" />
				<p className="text-sm text-muted-foreground">Map Preview</p>
			</div>
		</div>
		<Button variant="outline" className="w-full gap-2">
			<Navigation className="size-4" />
			Get Directions
		</Button>
	</div>
);

const ItemsList = ({
	items,
}: {
	items: { name: string; quantity: number }[];
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Package className="size-5" />
			Items for Pickup
		</h2>
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex items-center justify-between">
					<span className="text-sm">{item.name}</span>
					<Badge variant="outline">×{item.quantity}</Badge>
				</div>
			))}
		</div>
	</div>
);

const Instructions = ({ steps }: { steps: string[] }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
		<h3 className="font-semibold mb-3">Pickup Instructions</h3>
		<ol className="space-y-2">
			{steps.map((step, i) => (
				<li key={i} className="flex items-start gap-3 text-sm">
					<span className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
						{i + 1}
					</span>
					{step}
				</li>
			))}
		</ol>
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
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PickupHeader orderNumber="ORD-2024-78432" status="Ready" />

				<QRSection code="PU-4527" items={4} validUntil="Jan 22, 6:00 PM" />

				<Separator />

				<StoreSection
					name="Downtown Tech Store"
					address="123 Main Street"
					city="New York, NY 10001"
					phone="(555) 123-4567"
					hours="9 AM - 9 PM"
				/>

				<MapPreview />

				<ItemsList items={pickupItems} />

				<Instructions steps={instructions} />

				<CTA
					items={[
						{ label: 'Get Directions', href: '/directions', icon: Navigation },
						{
							label: 'View Order',
							href: '/orders',
							variant: 'outline',
							icon: ArrowRight,
						},
					]}
				/>
			</div>
		</section>
	);
}
