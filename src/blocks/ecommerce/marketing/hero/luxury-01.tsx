import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gem, Crown, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge className="gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-serif font-bold tracking-tight">
		{text}{' '}
		{highlight && (
			<span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
				{highlight}
			</span>
		)}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const Features = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap gap-4">
		{items.map(({ icon: Icon, text }, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<Icon className="size-4 text-amber-500" />
				<span>{text}</span>
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
			<Button
				key={i}
				size="lg"
				variant={variant}
				className={`gap-2 ${variant === 'default' ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-black hover:from-amber-700 hover:to-yellow-600' : 'border-amber-500/50 hover:bg-amber-500/10'}`}
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const LuxuryProduct = ({ image, alt }: { image: string; alt: string }) => (
	<div className="relative">
		<div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-[2rem] blur-2xl" />
		<div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-500/20">
			<Image src={image} alt={alt} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
			<Badge className="absolute top-6 left-6 bg-black/50 backdrop-blur border-amber-500/50">
				<Gem className="size-3 mr-1" />
				18K Gold
			</Badge>
			<div className="absolute bottom-6 inset-x-6 text-white">
				<p className="text-sm text-amber-300 uppercase tracking-wider">
					Limited Edition
				</p>
				<p className="text-2xl font-serif font-bold mt-1">Artisan Collection</p>
				<p className="text-amber-400 font-bold text-xl mt-2">$2,499</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Crown} text="Luxury Collection" />
						<Title text="Timeless" highlight="Elegance" />
						<Description text="Discover our curated selection of luxury pieces crafted by world-renowned artisans. Each item tells a story of exceptional craftsmanship and timeless design." />
						<Features
							items={[
								{ icon: Gem, text: 'Authentic Materials' },
								{ icon: Star, text: 'Handcrafted' },
								{ icon: Sparkles, text: 'Limited Edition' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Explore Luxury', href: '/luxury', icon: Crown },
								{
									label: 'Book Consultation',
									href: '/consultation',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<LuxuryProduct
						image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=750&fit=crop"
						alt="Luxury jewelry"
					/>
				</div>
			</div>
		</section>
	);
}
