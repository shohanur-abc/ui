import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface ShowcaseItem {
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Star} text="Product Showcase" />
					<Title text="See Our Platform in" highlight="Action" />
					<Description text="Explore the key features that make our platform the choice of leading companies worldwide." />
				</div>

				<ShowcaseGrid
					items={[
						{
							title: 'Intuitive Dashboard',
							description:
								'A clean, powerful interface that puts everything at your fingertips.',
							imageSrc:
								'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
							imageAlt: 'Dashboard interface',
						},
						{
							title: 'Visual Workflow Builder',
							description:
								'Create complex automations with simple drag-and-drop actions.',
							imageSrc:
								'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
							imageAlt: 'Workflow builder',
						},
						{
							title: 'Real-time Analytics',
							description: 'Track performance metrics and KPIs as they happen.',
							imageSrc:
								'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
							imageAlt: 'Analytics dashboard',
						},
					]}
				/>

				<CTASection label="Start Free Trial" href="/signup" />
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

const ShowcaseGrid = ({ items }: { items: ShowcaseItem[] }) => (
	<div className="grid gap-6 @md:gap-8 @lg:grid-cols-3">
		{items.map((item) => (
			<div key={item.title} className="group">
				<div className="mb-4 overflow-hidden rounded-xl border border-border/50 shadow-lg transition-all group-hover:border-primary/30 group-hover:shadow-xl">
					<img
						src={item.imageSrc}
						alt={item.imageAlt}
						className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
				<p className="text-sm text-muted-foreground">{item.description}</p>
			</div>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-12 @md:mt-16 text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
