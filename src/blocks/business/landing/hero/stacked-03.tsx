import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Clock, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @md:mb-16">
					<Eyebrow icon={Sparkles} text="Premium Service" />
					<Title text="White-Glove Service for Every Client" />
					<Description text="Experience the difference of personalized attention and expert guidance at every step of your journey." />
					<CTA
						items={[
							{ label: 'Schedule Call', href: '#call', icon: ArrowRight },
							{ label: 'Learn More', href: '#learn', variant: 'outline' },
						]}
					/>
				</div>
				<FeatureGrid
					items={[
						{
							icon: Clock,
							title: 'Fast Response',
							description: 'Average response time under 2 hours',
						},
						{
							icon: Shield,
							title: 'Guaranteed Results',
							description: 'Or your money back, no questions asked',
						},
						{
							icon: Headphones,
							title: '24/7 Support',
							description: 'Round-the-clock assistance worldwide',
						},
						{
							icon: Sparkles,
							title: 'Custom Solutions',
							description: 'Tailored specifically for your needs',
						},
					]}
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
	<Badge variant="outline" className="mb-4 @md:mb-6 gap-2 mx-auto">
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

const FeatureGrid = ({
	items,
}: {
	items: {
		icon: ComponentType<{ className?: string }>;
		title: string;
		description: string;
	}[];
}) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description }, i) => (
			<Card
				key={i}
				className="group hover:shadow-lg hover:border-primary/30 transition-all"
			>
				<CardContent className="pt-6 text-center @xl:text-left">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto @xl:mx-0 mb-4 group-hover:bg-primary/20 transition-colors">
						<Icon className="size-6 text-primary" />
					</div>
					<h3 className="font-semibold text-lg mb-2">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
