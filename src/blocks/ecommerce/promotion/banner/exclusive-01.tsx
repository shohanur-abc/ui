import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star, Gift, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
	</div>
);

const ExclusiveContent = ({
	badge,
	headline,
	description,
	features,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	features: { icon: React.ElementType; text: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="space-y-6">
		<Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold">
			{headline.text}
			<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
				{' '}
				{headline.highlight}
			</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
		<div className="space-y-3">
			{features.map(({ icon: Icon, text }, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
						<Icon className="size-4 text-amber-500" />
					</div>
					<span>{text}</span>
				</div>
			))}
		</div>
		<Button
			size="lg"
			className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
			asChild
		>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const ExclusiveImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-3xl blur-2xl" />
		<div className="relative aspect-square rounded-3xl overflow-hidden ring-2 ring-amber-500/30">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-6xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<ExclusiveContent
							badge={{ icon: Crown, text: 'Exclusive Drop' }}
							headline={{ text: 'Members', highlight: 'Only' }}
							description="Get exclusive early access to our limited edition collection. Only available to our VIP members."
							features={[
								{ icon: Star, text: 'Limited to 500 pieces worldwide' },
								{ icon: Gift, text: 'Includes exclusive packaging & extras' },
								{
									icon: Sparkles,
									text: 'Certificate of authenticity included',
								},
							]}
							cta={{ label: 'Shop Exclusive', href: '/exclusive' }}
						/>
						<ExclusiveImage
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
							alt="Exclusive Product"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
