import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock, Code2, Rocket, TestTube } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface ZigzagItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	stat: string;
	statLabel: string;
	imageSrc: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-12 @md:mb-16 max-w-2xl">
					<Eyebrow icon={Rocket} text="Development Workflow" />
					<Title text="Ship Faster with Our" highlight="Streamlined Pipeline" />
					<Description text="From code to production in minutes, not days. Our platform handles the complexity so you can focus on building." />
				</div>

				<ZigzagLayout
					items={[
						{
							icon: Code2,
							title: 'Write Code',
							description:
								'Develop locally with hot reloading and instant feedback. Push to any branch to trigger the pipeline.',
							stat: '10x',
							statLabel: 'Faster iteration',
							imageSrc:
								'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
						},
						{
							icon: TestTube,
							title: 'Automated Testing',
							description:
								'Run your entire test suite in parallel across multiple environments. Get results in seconds.',
							stat: '90%',
							statLabel: 'Test coverage',
							imageSrc:
								'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
						},
						{
							icon: Rocket,
							title: 'Deploy Instantly',
							description:
								'Zero-downtime deployments with automatic rollback. Preview environments for every PR.',
							stat: '<30s',
							statLabel: 'Deploy time',
							imageSrc:
								'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
						},
					]}
				/>

				<CTASection
					label="Start Building"
					href="/signup"
					secondaryLabel="View Docs"
					secondaryHref="/docs"
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
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
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
	<div className="space-y-12 @md:space-y-16">
		{items.map((item, index) => (
			<div
				key={item.title}
				className={`grid gap-6 @xl:gap-10 @xl:grid-cols-2 items-center ${index % 2 === 1 ? '@xl:[&>*:first-child]:order-2' : ''}`}
			>
				<Card className="border-border/50 overflow-hidden">
					<CardContent className="p-0">
						<img
							src={item.imageSrc}
							alt={item.title}
							className="w-full aspect-video object-cover"
						/>
					</CardContent>
				</Card>
				<div>
					<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
						<item.icon className="size-6 text-primary" />
					</div>
					<h3 className="mb-2 text-xl @md:text-2xl font-bold">{item.title}</h3>
					<p className="mb-4 text-muted-foreground leading-relaxed">
						{item.description}
					</p>
					<div className="inline-flex items-center gap-3 rounded-lg bg-primary/5 px-4 py-2">
						<span className="text-2xl font-bold text-primary">{item.stat}</span>
						<span className="text-sm text-muted-foreground">
							{item.statLabel}
						</span>
					</div>
				</div>
			</div>
		))}
	</div>
);

const CTASection = ({
	label,
	href,
	secondaryLabel,
	secondaryHref,
}: {
	label: string;
	href: string;
	secondaryLabel: string;
	secondaryHref: string;
}) => (
	<div className="mt-12 @md:mt-16 flex flex-wrap gap-4">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
		<Button size="lg" variant="outline" asChild>
			<Link href={secondaryHref}>{secondaryLabel}</Link>
		</Button>
	</div>
);
