import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const LocationSearch = () => (
	<div className="flex gap-2 max-w-md">
		<Input placeholder="Enter ZIP code or city" className="flex-1" />
		<Button className="gap-2">
			<Navigation className="size-4" />
			Find
		</Button>
	</div>
);

const NearbyStores = ({
	stores,
}: {
	stores: { name: string; address: string; distance: string; hours: string }[];
}) => (
	<div className="space-y-4">
		{stores.map((store, i) => (
			<div
				key={i}
				className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:border-primary transition-colors"
			>
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<MapPin className="size-5 text-primary" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<h3 className="font-semibold">{store.name}</h3>
						<Badge variant="outline" className="text-xs">
							{store.distance}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground truncate">
						{store.address}
					</p>
					<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
						<Clock className="size-3" />
						{store.hours}
					</div>
				</div>
				<Button variant="outline" size="sm" className="shrink-0 gap-1">
					<Phone className="size-3" />
					Call
				</Button>
			</div>
		))}
	</div>
);

const MapImage = ({ src }: { src: string }) => (
	<div className="relative aspect-[4/3] rounded-3xl overflow-hidden border">
		<Image src={src} alt="Store locations map" fill className="object-cover" />
		<div className="absolute top-4 left-4">
			<Badge>5 stores nearby</Badge>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={MapPin} text="Store Finder" />
						<Title text="Find a Store" highlight="Near You" />
						<Description text="Visit one of our locations for a personalized shopping experience. Try on products, get expert advice, and shop in style." />
						<LocationSearch />
						<NearbyStores
							stores={[
								{
									name: 'StyleHub Downtown',
									address: '123 Main Street, New York, NY',
									distance: '0.5 mi',
									hours: 'Open until 9 PM',
								},
								{
									name: 'StyleHub Mall',
									address: '456 Shopping Center Dr',
									distance: '2.1 mi',
									hours: 'Open until 10 PM',
								},
								{
									name: 'StyleHub Outlet',
									address: '789 Outlet Way',
									distance: '5.3 mi',
									hours: 'Open until 8 PM',
								},
							]}
						/>
					</div>
					<MapImage src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop" />
				</div>
			</div>
		</section>
	);
}
