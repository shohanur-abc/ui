import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Star, Package, Truck } from 'lucide-react';
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const OfferDetails = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{items.map(({ icon: Icon, text }, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-4 rounded-xl border bg-card"
			>
				<Icon className="size-5 text-primary shrink-0" />
				<span className="text-sm">{text}</span>
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const PromoCode = ({
	code,
	description,
}: {
	code: string;
	description: string;
}) => (
	<div className="rounded-xl border border-dashed border-primary bg-primary/5 p-4 text-center">
		<p className="text-sm text-muted-foreground mb-1">{description}</p>
		<p className="text-2xl font-bold font-mono text-primary">{code}</p>
	</div>
);

const OfferImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square rounded-3xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute top-6 -right-6 rotate-12">
			<Badge className="text-lg px-4 py-2 bg-primary shadow-lg">20% OFF</Badge>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Zap} text="Special Offer" />
						<Title text="First Order?" highlight="Get 20% Off!" />
						<Description text="Welcome to our store! As a special thank you for joining us, enjoy 20% off your first order. No minimum purchase required." />
						<PromoCode code="WELCOME20" description="Use code at checkout:" />
						<OfferDetails
							items={[
								{ icon: Star, text: 'Valid for all products' },
								{ icon: Package, text: 'No minimum order' },
								{ icon: Truck, text: 'Free shipping over $50' },
								{ icon: Zap, text: 'Limited time offer' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Start Shopping', href: '/shop', icon: ArrowRight },
								{
									label: 'View Best Sellers',
									href: '/bestsellers',
									variant: 'outline',
								},
							]}
						/>
					</div>
					<OfferImage
						src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
						alt="Special offer"
					/>
				</div>
			</div>
		</section>
	);
}
