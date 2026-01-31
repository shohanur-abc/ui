import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Shield, BadgeCheck, Sparkles } from 'lucide-react';
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

const Certifications = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; issuer: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{items.map(({ icon: Icon, title, issuer }, i) => (
			<div
				key={i}
				className="flex items-center gap-4 p-4 rounded-xl border bg-card"
			>
				<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-6 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{issuer}</p>
				</div>
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

const QualityImage = ({
	src,
	alt,
	badges,
}: {
	src: string;
	alt: string;
	badges: string[];
}) => (
	<div className="relative">
		<div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
		<div className="absolute -left-4 top-1/4 space-y-3">
			{badges.map((badge, i) => (
				<Badge key={i} className="backdrop-blur bg-background/80 shadow-lg">
					{badge}
				</Badge>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Award} text="Quality Guaranteed" />
						<Title text="Certified" highlight="Excellence" />
						<Description text="Every product we sell meets the highest standards of quality. Our certifications guarantee authenticity, sustainability, and ethical production." />
						<Certifications
							items={[
								{
									icon: BadgeCheck,
									title: '100% Authentic',
									issuer: 'Verified Supplier Network',
								},
								{
									icon: Shield,
									title: 'Quality Tested',
									issuer: 'Independent Lab Certified',
								},
								{
									icon: Award,
									title: 'Eco-Certified',
									issuer: 'Global Sustainability Board',
								},
								{
									icon: Sparkles,
									title: 'Ethically Made',
									issuer: 'Fair Trade Association',
								},
							]}
						/>
						<CTA
							items={[
								{
									label: 'Shop Certified Products',
									href: '/certified',
									icon: BadgeCheck,
								},
								{
									label: 'Our Standards',
									href: '/quality',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<QualityImage
						src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=750&fit=crop"
						alt="Quality certified products"
						badges={['Certified Organic', 'Lab Tested', 'Fair Trade']}
					/>
				</div>
			</div>
		</section>
	);
}
