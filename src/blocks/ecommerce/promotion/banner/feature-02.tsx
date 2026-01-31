import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
	</div>
);

const BenefitItem = ({ text }: { text: string }) => (
	<div className="flex items-center gap-3">
		<div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
			<Check className="size-4 text-primary" />
		</div>
		<span>{text}</span>
	</div>
);

const FeatureContent = ({
	badge,
	headline,
	description,
	benefits,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	benefits: string[];
	cta: { label: string; href: string };
}) => (
	<div className="space-y-6">
		<Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground">{description}</p>
		<div className="space-y-3">
			{benefits.map((benefit, i) => (
				<BenefitItem key={i} text={benefit} />
			))}
		</div>
		<Button size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
		<div className="relative aspect-square rounded-3xl overflow-hidden border border-border/50">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-5xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<FeatureContent
							badge={{ icon: Sparkles, text: 'Signature Feature' }}
							headline={{ text: 'Engineered for', highlight: 'Excellence' }}
							description="Every detail has been meticulously designed to deliver an unparalleled experience."
							benefits={[
								'Precision-crafted components for superior performance',
								'Advanced technology for seamless integration',
								'Sustainable materials with minimal environmental impact',
								'Backed by our industry-leading warranty',
							]}
							cta={{ label: 'Discover More', href: '/features' }}
						/>
						<FeatureImage
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
							alt="Product Feature"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
