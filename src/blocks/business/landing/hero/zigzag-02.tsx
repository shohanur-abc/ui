import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers3, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<ZigzagLayout
					items={[
						{
							eyebrow: { icon: Layers3, text: 'Step 1' },
							title: 'Connect Your Data',
							description:
								'Seamlessly integrate with 200+ data sources in minutes, not months.',
							benefits: [
								'One-click integrations',
								'Real-time sync',
								'Data validation',
							],
							image:
								'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
							imageAlt: 'Data connection',
							reverse: false,
						},
						{
							eyebrow: { icon: Layers3, text: 'Step 2' },
							title: 'Analyze & Visualize',
							description:
								'Turn raw data into actionable insights with AI-powered analytics.',
							benefits: [
								'Custom dashboards',
								'Predictive models',
								'Automated reports',
							],
							image:
								'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
							imageAlt: 'Analytics dashboard',
							reverse: true,
						},
					]}
				/>
				<div className="text-center mt-12 @md:mt-16">
					<CTA
						items={[
							{ label: 'Get Started', href: '#start', icon: ArrowRight },
							{
								label: 'See All Features',
								href: '#features',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

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

const ZigzagLayout = ({
	items,
}: {
	items: {
		eyebrow: { icon: ComponentType<{ className?: string }>; text: string };
		title: string;
		description: string;
		benefits: string[];
		image: string;
		imageAlt: string;
		reverse: boolean;
	}[];
}) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			(
				{ eyebrow, title, description, benefits, image, imageAlt, reverse },
				i,
			) => (
				<div
					key={i}
					className={`grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center ${reverse ? '@xl:flex-row-reverse' : ''}`}
				>
					<div className={reverse ? '@xl:order-2' : ''}>
						<Badge variant="outline" className="mb-4 gap-2">
							<eyebrow.icon className="size-3.5" />
							<span>{eyebrow.text}</span>
						</Badge>
						<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
							{title}
						</h2>
						<p className="text-muted-foreground mb-6 leading-relaxed">
							{description}
						</p>
						<ul className="space-y-2">
							{benefits.map((benefit, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<CheckCircle className="size-4 text-primary" />
									<span>{benefit}</span>
								</li>
							))}
						</ul>
					</div>
					<div
						className={`relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl ${reverse ? '@xl:order-1' : ''}`}
					>
						<Image src={image} alt={imageAlt} fill className="object-cover" />
					</div>
				</div>
			),
		)}
	</div>
);
