import Link from 'next/link';
import {
	ShoppingBag,
	ArrowRight,
	Star,
	Truck,
	Shield,
	RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight text-balance">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
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
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const Features = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-6 @md:gap-8 text-sm text-muted-foreground">
		{items.map(({ icon: Icon, text }, i) => (
			<div key={i} className="flex items-center gap-2">
				<Icon className="size-4 text-primary" />
				<span>{text}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
				<div className="max-w-4xl mx-auto text-center space-y-6 @md:space-y-8">
					<Eyebrow icon={Star} text="New Collection 2026" />
					<Title text="Discover Your" highlight="Perfect Style" />
					<Description text="Explore our curated collection of premium fashion essentials designed for the modern lifestyle. Quality meets comfort in every piece." />
					<CTA
						items={[
							{ label: 'Shop Now', href: '/shop', icon: ShoppingBag },
							{
								label: 'View Collection',
								href: '/collection',
								variant: 'outline',
								icon: ArrowRight,
							},
						]}
					/>
					<Features
						items={[
							{ icon: Truck, text: 'Free Shipping' },
							{ icon: Shield, text: 'Secure Payment' },
							{ icon: RotateCcw, text: 'Easy Returns' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
