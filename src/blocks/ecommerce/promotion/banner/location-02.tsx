import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StoreInfo = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-muted-foreground shrink-0" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
);

const LocationBanner = ({
	badge,
	storeName,
	details,
	cta,
}: {
	badge: string;
	storeName: string;
	details: { icon: React.ElementType; label: string; value: string }[];
	cta: { label: string; href: string }[];
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-6">
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Badge
					variant="outline"
					className="border-primary/50 text-primary gap-1"
				>
					<MapPin className="size-3" />
					{badge}
				</Badge>
			</div>
			<h2 className="text-xl @sm:text-2xl font-bold">{storeName}</h2>
			<div className="flex flex-wrap gap-4 @md:gap-6">
				{details.map((detail, i) => (
					<StoreInfo key={i} {...detail} />
				))}
			</div>
		</div>
		<div className="flex gap-3">
			{cta.map(({ label, href }, i) => (
				<Button
					key={i}
					variant={i === 0 ? 'default' : 'outline'}
					className="gap-2"
					asChild
				>
					<Link href={href}>
						{i === 0 && <Navigation className="size-4" />}
						{label}
					</Link>
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card border-y border-border py-6 @md:py-8 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<LocationBanner
						badge="Nearest Store"
						storeName="SoHo Flagship Store"
						details={[
							{ icon: Clock, label: 'Hours', value: '10AM - 9PM' },
							{ icon: Phone, label: 'Call', value: '(555) 123-4567' },
							{ icon: MapPin, label: 'Distance', value: '0.3 mi' },
						]}
						cta={[
							{ label: 'Get Directions', href: '/directions' },
							{ label: 'Store Details', href: '/store/soho' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
