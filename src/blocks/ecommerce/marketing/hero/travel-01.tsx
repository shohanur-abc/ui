import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Plane, Palmtree, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const DestinationTabs = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; active?: boolean }[];
}) => (
	<div className="flex flex-wrap justify-center gap-2">
		{items.map(({ icon: Icon, label, active }, i) => (
			<Button
				key={i}
				variant={active ? 'default' : 'outline'}
				className="gap-2"
			>
				<Icon className="size-4" />
				{label}
			</Button>
		))}
	</div>
);

const DestinationGrid = ({
	destinations,
}: {
	destinations: {
		image: string;
		location: string;
		collection: string;
		itemCount: string;
	}[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6">
		{destinations.map((dest, i) => (
			<div
				key={i}
				className={`group relative rounded-3xl overflow-hidden ${i === 0 ? '@md:col-span-2 @md:row-span-2 aspect-square @md:aspect-auto' : 'aspect-[4/5]'}`}
			>
				<Image
					src={dest.image}
					alt={dest.location}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
				<div className="absolute bottom-6 inset-x-6">
					<Badge className="mb-3" variant="secondary">
						<MapPin className="size-3 mr-1" />
						{dest.location}
					</Badge>
					<h3
						className={`font-bold text-white ${i === 0 ? 'text-2xl' : 'text-lg'}`}
					>
						{dest.collection}
					</h3>
					<p className="text-white/70 text-sm mt-1">{dest.itemCount}</p>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={Plane} text="Travel Edit" />
					<Title text="Pack for Your" highlight="Dream Destination" />
					<Description text="Curated collections inspired by the world's most beautiful destinations. Find the perfect pieces for your next adventure." />
				</div>
				<DestinationTabs
					items={[
						{ icon: Palmtree, label: 'Beach', active: true },
						{ icon: Mountain, label: 'Mountain' },
						{ icon: MapPin, label: 'City' },
						{ icon: Plane, label: 'Resort' },
					]}
				/>
				<DestinationGrid
					destinations={[
						{
							image:
								'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
							location: 'Maldives',
							collection: 'Tropical Paradise Edit',
							itemCount: '45 pieces',
						},
						{
							image:
								'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop',
							location: 'Swiss Alps',
							collection: 'Mountain Retreat',
							itemCount: '32 pieces',
						},
						{
							image:
								'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=500&fit=crop',
							location: 'Paris',
							collection: 'City Chic',
							itemCount: '28 pieces',
						},
					]}
				/>
				<CTA label="Explore All Destinations" href="/travel" />
			</div>
		</section>
	);
}
