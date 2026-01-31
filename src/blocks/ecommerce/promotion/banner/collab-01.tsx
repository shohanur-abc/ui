import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CollaborationLogos = ({
	logos,
}: {
	logos: { src: string; alt: string }[];
}) => (
	<div className="flex items-center justify-center gap-4 @md:gap-8 mb-8">
		{logos.map((logo, i) => (
			<div key={i} className="flex items-center gap-4">
				<div className="size-16 @md:size-20 rounded-xl bg-card flex items-center justify-center p-3">
					<Image
						src={logo.src}
						alt={logo.alt}
						width={60}
						height={60}
						className="w-full h-auto object-contain"
					/>
				</div>
				{i < logos.length - 1 && (
					<span className="text-2xl @md:text-3xl font-bold text-muted-foreground">
						×
					</span>
				)}
			</div>
		))}
	</div>
);

const CollabContent = ({
	badge,
	headline,
	description,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="text-center max-w-2xl mx-auto">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-6"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold mb-4">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground mb-8">{description}</p>
		<Button size="lg" className="gap-2" asChild>
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
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-4xl mx-auto">
					<CollaborationLogos
						logos={[
							{
								src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
								alt: 'Brand A',
							},
							{
								src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
								alt: 'Brand B',
							},
						]}
					/>
					<CollabContent
						badge={{ icon: Crown, text: 'Exclusive Collaboration' }}
						headline={{ text: 'Limited Edition', highlight: 'Collection' }}
						description="Two iconic brands unite to create something extraordinary. Shop the exclusive collaboration before it's gone."
						cta={{ label: 'Shop the Collection', href: '/collab' }}
					/>
				</div>
			</div>
		</section>
	);
}
