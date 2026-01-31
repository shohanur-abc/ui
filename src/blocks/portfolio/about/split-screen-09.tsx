import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Rocket, Target, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<ImageWithStats
						src="https://picsum.photos/seed/split9/800/800"
						alt="Jennifer Taylor"
						stats={[
							{ value: '15+', label: 'Years' },
							{ value: '$50M+', label: 'Revenue' },
							{ value: '3', label: 'Exits' },
						]}
					/>
					<ContentSection
						eyebrow="Growth Expert"
						title="Jennifer Taylor"
						role="Fractional CMO"
						description="I help B2B SaaS companies go from $1M to $10M ARR. With 15 years of marketing leadership experience, I've developed playbooks that consistently deliver results."
						services={[
							{
								icon: Target,
								title: 'Strategy',
								description: 'Go-to-market planning',
							},
							{
								icon: Rocket,
								title: 'Execution',
								description: 'Hands-on implementation',
							},
							{
								icon: Zap,
								title: 'Optimization',
								description: 'Data-driven improvements',
							},
						]}
						cta={{ label: 'Book a Call', href: '/book', icon: ArrowRight }}
					/>
				</div>
			</div>
		</section>
	);
}

interface StatItem {
	value: string;
	label: string;
}

interface ImageWithStatsProps {
	src: string;
	alt: string;
	stats: StatItem[];
}

const ImageWithStats = ({ src, alt, stats }: ImageWithStatsProps) => (
	<div className="relative">
		<div className="relative aspect-square rounded-2xl overflow-hidden">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
		<div className="absolute -bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border">
			<div className="flex justify-around">
				{stats.map(({ value, label }, i) => (
					<div key={i} className="text-center">
						<div className="text-xl @md:text-2xl font-bold">{value}</div>
						<div className="text-xs text-muted-foreground">{label}</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

interface ServiceItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	eyebrow: string;
	title: string;
	role: string;
	description: string;
	services: ServiceItem[];
	cta: CTAData;
}

const ContentSection = ({
	eyebrow,
	title,
	role,
	description,
	services,
	cta,
}: ContentSectionProps) => (
	<div className="@lg:pt-6">
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
			{title}
		</h1>
		<p className="text-lg text-primary font-medium mb-6">{role}</p>
		<p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
		<div className="grid grid-cols-3 gap-4 mb-8">
			{services.map(({ icon: Icon, title, description }) => (
				<Card key={title} className="bg-muted/50 border-none">
					<CardContent className="p-4 text-center">
						<Icon className="size-6 text-primary mx-auto mb-2" />
						<h3 className="font-semibold text-sm mb-1">{title}</h3>
						<p className="text-xs text-muted-foreground">{description}</p>
					</CardContent>
				</Card>
			))}
		</div>
		<Button size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
