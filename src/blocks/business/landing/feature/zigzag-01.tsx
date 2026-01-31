import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface ZigzagItem {
	title: string;
	description: string;
	features: string[];
	imageSrc: string;
	imageAlt: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-12 @md:mb-16 @xl:mb-20 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Layers} text="How It Works" />
					<Title text="Simple Steps to" highlight="Transform Your Business" />
					<Description text="Our streamlined process gets you from setup to success in record time." />
				</div>

				<ZigzagLayout
					items={[
						{
							title: 'Connect Your Data Sources',
							description:
								'Seamlessly integrate with your existing tools and databases. Our platform supports 200+ integrations out of the box.',
							features: [
								'One-click integrations',
								'Custom API support',
								'Real-time sync',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
							imageAlt: 'Data integration dashboard',
						},
						{
							title: 'Configure Your Workflows',
							description:
								'Use our visual builder to create custom automations that match your business logic perfectly.',
							features: [
								'Drag-and-drop editor',
								'Conditional logic',
								'Pre-built templates',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
							imageAlt: 'Workflow builder interface',
						},
						{
							title: 'Monitor and Optimize',
							description:
								'Track performance in real-time and let AI suggest optimizations to improve efficiency.',
							features: [
								'Live dashboards',
								'AI recommendations',
								'Automated alerts',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
							imageAlt: 'Analytics monitoring dashboard',
						},
					]}
				/>

				<CTASection label="Get Started Today" href="/signup" />
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
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const ZigzagLayout = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @md:space-y-20 @xl:space-y-24">
		{items.map((item, index) => (
			<div
				key={item.title}
				className={`grid gap-8 @xl:gap-12 @xl:grid-cols-2 items-center ${index % 2 === 1 ? '@xl:[&>*:first-child]:order-2' : ''}`}
			>
				<div>
					<div className="mb-3 flex items-center gap-3">
						<span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
							{index + 1}
						</span>
						<h3 className="text-xl @md:text-2xl font-bold">{item.title}</h3>
					</div>
					<p className="mb-4 text-muted-foreground leading-relaxed">
						{item.description}
					</p>
					<ul className="space-y-2">
						{item.features.map((feature) => (
							<li key={feature} className="flex items-center gap-2 text-sm">
								<CheckCircle2 className="size-4 text-primary" />
								{feature}
							</li>
						))}
					</ul>
				</div>
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-2xl blur-2xl opacity-50" />
					<div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-xl">
						<img
							src={item.imageSrc}
							alt={item.imageAlt}
							className="w-full aspect-[4/3] object-cover"
						/>
					</div>
				</div>
			</div>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-16 @md:mt-20 text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
