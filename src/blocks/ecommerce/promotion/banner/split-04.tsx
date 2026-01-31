import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GradientOverlayDecorative = () => (
	<div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent pointer-events-none z-10" />
);

const BackgroundImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="absolute inset-0">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const BenefitsList = ({ items }: { items: string[] }) => (
	<ul className="space-y-3">
		{items.map((item, i) => (
			<li key={i} className="flex items-center gap-3">
				<div className="size-5 rounded-full bg-primary/20 flex items-center justify-center">
					<Check className="size-3 text-primary" />
				</div>
				<span className="text-foreground">{item}</span>
			</li>
		))}
	</ul>
);

const MembershipCard = ({
	badge,
	headline,
	description,
	benefits,
	cta,
}: {
	badge: string;
	headline: string;
	description: string;
	benefits: string[];
	cta: { label: string; href: string };
}) => (
	<div className="relative z-20 max-w-lg space-y-6">
		<Badge className="shadow-lg">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
			{headline}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
		<BenefitsList items={benefits} />
		<Button size="lg" className="gap-2 mt-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative min-h-[500px] @md:min-h-[600px] flex items-center py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<BackgroundImage
					src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
					alt="VIP Membership"
				/>
				<GradientOverlayDecorative />
				<div className="relative max-w-7xl mx-auto w-full">
					<MembershipCard
						badge="VIP Membership"
						headline="Join the Inner Circle"
						description="Unlock exclusive benefits and become part of our most valued customer community."
						benefits={[
							'Early access to new arrivals',
							'Exclusive member-only discounts',
							'Free priority shipping',
							'Birthday rewards & surprises',
						]}
						cta={{ label: 'Become a VIP', href: '/membership' }}
					/>
				</div>
			</div>
		</section>
	);
}
