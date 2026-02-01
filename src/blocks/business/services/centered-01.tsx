import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Shield, Globe, Code, Palette, Cloud, Star } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<CenteredHero
					eyebrow="Digital Agency"
					title="We Build Products That Make a Difference"
					description="From concept to launch, we partner with ambitious companies to create digital products that transform industries and delight users."
					stats={[
						{ value: '500+', label: 'Projects Delivered' },
						{ value: '98%', label: 'Client Satisfaction' },
						{ value: '12+', label: 'Years Experience' },
					]}
					primaryCta={{ label: 'Start Your Project', href: '/contact' }}
					secondaryCta={{ label: 'View Our Work', href: '/portfolio' }}
					services={[
						{ icon: Code, label: 'Development' },
						{ icon: Palette, label: 'Design' },
						{ icon: Cloud, label: 'Cloud' },
						{ icon: Shield, label: 'Security' },
						{ icon: Zap, label: 'Performance' },
						{ icon: Globe, label: 'Consulting' },
					]}
				/>
			</div>
		</section>
	);
}

interface Stat {
	value: string;
	label: string;
}

interface Service {
	icon: ComponentType<{ className?: string }>;
	label: string;
}

interface CTA {
	label: string;
	href: string;
}

const CenteredHero = ({
	eyebrow,
	title,
	description,
	stats,
	primaryCta,
	secondaryCta,
	services,
}: {
	eyebrow: string;
	title: string;
	description: string;
	stats: Stat[];
	primaryCta: CTA;
	secondaryCta: CTA;
	services: Service[];
}) => (
	<div className="text-center max-w-4xl mx-auto">
		{/* Eyebrow */}
		<Badge variant="outline" className="mb-4 @md:mb-6">
			<Star className="size-3 fill-primary text-primary mr-1" />
			{eyebrow}
		</Badge>

		{/* Title */}
		<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-6 @md:mb-8">
			{title}
		</h1>

		{/* Description */}
		<p className="text-lg @md:text-xl text-muted-foreground leading-relaxed mb-8 @md:mb-10 max-w-2xl mx-auto">
			{description}
		</p>

		{/* CTAs */}
		<div className="flex flex-col @sm:flex-row items-center justify-center gap-4 mb-10 @md:mb-14">
			<Button size="lg" asChild>
				<Link href={primaryCta.href}>
					{primaryCta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<Button size="lg" variant="outline" asChild>
				<Link href={secondaryCta.href}>{secondaryCta.label}</Link>
			</Button>
		</div>

		{/* Stats */}
		<div className="grid grid-cols-3 gap-6 @md:gap-12 p-6 @md:p-8 bg-muted/50 rounded-2xl mb-10 @md:mb-14">
			{stats.map((stat, i) => (
				<div key={i}>
					<div className="text-2xl @sm:text-3xl @md:text-4xl font-bold text-primary">
						{stat.value}
					</div>
					<div className="text-sm text-muted-foreground">{stat.label}</div>
				</div>
			))}
		</div>

		{/* Services */}
		<div>
			<p className="text-sm text-muted-foreground mb-4">Our core capabilities</p>
			<div className="flex flex-wrap items-center justify-center gap-3 @md:gap-4">
				{services.map(({ icon: Icon, label }, i) => (
					<div
						key={i}
						className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full"
					>
						<Icon className="size-4 text-primary" />
						<span className="text-sm font-medium">{label}</span>
					</div>
				))}
			</div>
		</div>
	</div>
);
