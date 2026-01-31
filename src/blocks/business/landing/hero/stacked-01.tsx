import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="amber">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14 @xl:mb-16">
					<Eyebrow icon={Layers} text="Multi-Layer Solutions" />
					<Title text="Everything You Need to Succeed" />
					<Description text="A comprehensive suite of tools designed to help your business thrive in the digital age." />
					<CTA
						items={[
							{ label: 'Get Started', href: '#start', icon: ArrowRight },
							{ label: 'View Pricing', href: '#pricing', variant: 'outline' },
						]}
					/>
				</div>
				<HeroImage
					src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
					alt="Dashboard overview"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
		{text}
	</p>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
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

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[16/9] @xl:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
	</div>
);
