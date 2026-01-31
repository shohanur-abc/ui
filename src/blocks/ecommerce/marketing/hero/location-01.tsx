import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="px-4">
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const StoreCard = ({
	image,
	name,
	address,
	phone,
	hours,
	href,
}: {
	image: { src: string; alt: string };
	name: string;
	address: string;
	phone: string;
	hours: string;
	href: string;
}) => (
	<div className="rounded-2xl border bg-card overflow-hidden group">
		<div className="relative aspect-[16/10] overflow-hidden">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
			/>
		</div>
		<div className="p-6 space-y-4">
			<h3 className="text-xl font-bold">{name}</h3>
			<div className="space-y-2 text-sm text-muted-foreground">
				<div className="flex items-start gap-3">
					<MapPin className="size-4 shrink-0 mt-0.5" />
					<span>{address}</span>
				</div>
				<div className="flex items-center gap-3">
					<Phone className="size-4 shrink-0" />
					<span>{phone}</span>
				</div>
				<div className="flex items-center gap-3">
					<Clock className="size-4 shrink-0" />
					<span>{hours}</span>
				</div>
			</div>
			<Button variant="outline" className="w-full gap-2" asChild>
				<Link href={href}>
					Get Directions
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="text-center space-y-4 mb-12">
					<Eyebrow text="Store Locator" />
					<Title text="Visit Our" highlight="Stores" />
					<Description text="Experience our collections in person. Find your nearest store and discover the difference of premium shopping." />
				</div>
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<StoreCard
						image={{
							src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
							alt: 'New York Store',
						}}
						name="New York Flagship"
						address="123 Fifth Avenue, New York, NY 10001"
						phone="+1 (212) 555-0123"
						hours="Mon-Sat: 10am-9pm, Sun: 11am-7pm"
						href="/stores/new-york"
					/>
					<StoreCard
						image={{
							src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop',
							alt: 'Los Angeles Store',
						}}
						name="Los Angeles"
						address="456 Rodeo Drive, Beverly Hills, CA 90210"
						phone="+1 (310) 555-0456"
						hours="Mon-Sat: 10am-8pm, Sun: 12pm-6pm"
						href="/stores/los-angeles"
					/>
					<StoreCard
						image={{
							src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop',
							alt: 'Miami Store',
						}}
						name="Miami Beach"
						address="789 Ocean Drive, Miami Beach, FL 33139"
						phone="+1 (305) 555-0789"
						hours="Mon-Sat: 10am-10pm, Sun: 11am-8pm"
						href="/stores/miami"
					/>
				</div>
			</div>
		</section>
	);
}
