import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Lock, Cpu, Cloud } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Cloud} text="Cloud Infrastructure" />
					<Title text="Infrastructure That Scales With You" />
					<Description text="Deploy globally, scale infinitely, and pay only for what you use. Enterprise-grade infrastructure made simple." />
					<CTA
						items={[
							{ label: 'Start Building', href: '#build', icon: ArrowRight },
							{ label: 'Contact Sales', href: '#sales', variant: 'outline' },
						]}
					/>
				</div>
				<FeatureBanner
					items={[
						{ icon: Database, label: 'Multi-Region DB' },
						{ icon: Lock, label: 'SOC 2 Compliant' },
						{ icon: Cpu, label: 'Edge Computing' },
						{ icon: Cloud, label: 'Auto-Scaling' },
					]}
				/>
				<HeroImage
					src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=500&fit=crop"
					alt="Server infrastructure"
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
	<Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
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
	<div className="flex flex-wrap justify-center gap-4 mb-10 @md:mb-14">
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

const FeatureBanner = ({
	items,
}: {
	items: { icon: ComponentType<{ className?: string }>; label: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-6 @md:gap-10 mb-10 @md:mb-14">
		{items.map(({ icon: Icon, label }, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm @md:text-base text-muted-foreground"
			>
				<Icon className="size-4 @md:size-5 text-primary" />
				<span>{label}</span>
			</div>
		))}
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-border/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
	</div>
);
