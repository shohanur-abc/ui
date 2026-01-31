import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Flame, Zap, Shield, Rocket } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center relative overflow-hidden"
			data-theme="amber"
		>
			<GradientDecorative />
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow icon={Flame} text="Hot Features" />
						<Title text="Power Up Your Productivity" highlight="Productivity" />
						<Description text="Supercharge your workflow with features designed for speed, security, and scale. Built for teams that move fast." />
						<CTA
							items={[
								{ label: 'Power Up Now', href: '#power', icon: ArrowRight },
								{ label: 'Feature Tour', href: '#tour', variant: 'outline' },
							]}
						/>
					</div>
					<FeatureCards
						items={[
							{
								icon: Zap,
								title: 'Lightning Speed',
								description: 'Sub-100ms response times globally',
								color: 'from-yellow-500/20 to-orange-500/20',
							},
							{
								icon: Shield,
								title: 'Bank-Level Security',
								description: 'SOC 2 Type II certified',
								color: 'from-blue-500/20 to-cyan-500/20',
							},
							{
								icon: Rocket,
								title: 'Infinite Scale',
								description: 'From 10 to 10 million users',
								color: 'from-purple-500/20 to-pink-500/20',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const GradientDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
		<div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text.split(highlight)[0]}
		<span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
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
	<div className="flex flex-wrap gap-3 @md:gap-4">
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

const FeatureCards = ({
	items,
}: {
	items: {
		icon: ComponentType<{ className?: string }>;
		title: string;
		description: string;
		color: string;
	}[];
}) => (
	<div className="space-y-4">
		{items.map(({ icon: Icon, title, description, color }, i) => (
			<Card
				key={i}
				className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/50"
			>
				<CardContent className="flex items-center gap-4 py-5">
					<div
						className={`size-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}
					>
						<Icon className="size-7 text-foreground" />
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
