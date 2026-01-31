import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Layers, Code, Paintbrush, Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="neon"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Layers} text="Multiple Solutions" />
					<Title text="One Platform for Every Need" />
					<Description text="Whether you&apos;re a developer, designer, or business leader, we have the tools you need." />
				</div>
				<TabSection
					items={[
						{
							value: 'developers',
							icon: Code,
							label: 'Developers',
							title: 'Build Faster with Powerful APIs',
							description:
								'Comprehensive SDKs, extensive documentation, and developer-first tools that let you focus on building great products.',
							image:
								'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
							cta: { label: 'View Docs', href: '#docs' },
						},
						{
							value: 'designers',
							icon: Paintbrush,
							label: 'Designers',
							title: 'Design Systems That Scale',
							description:
								'Create consistent, beautiful interfaces with our design tokens, component library, and collaboration tools.',
							image:
								'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
							cta: { label: 'Explore Design', href: '#design' },
						},
						{
							value: 'business',
							icon: Rocket,
							label: 'Business',
							title: 'Insights That Drive Growth',
							description:
								'Real-time analytics, custom dashboards, and automated reports that help you make data-driven decisions.',
							image:
								'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
							cta: { label: 'See Analytics', href: '#analytics' },
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
	<Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const TabSection = ({
	items,
}: {
	items: {
		value: string;
		icon: ComponentType<{ className?: string }>;
		label: string;
		title: string;
		description: string;
		image: string;
		cta: { label: string; href: string };
	}[];
}) => (
	<Tabs defaultValue={items[0].value} className="w-full">
		<TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 @md:mb-10">
			{items.map(({ value, icon: Icon, label }) => (
				<TabsTrigger key={value} value={value} className="gap-2">
					<Icon className="size-4" />
					<span className="hidden @sm:inline">{label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		{items.map(({ value, title, description, image, cta }) => (
			<TabsContent key={value} value={value}>
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<div className="order-2 @xl:order-1">
						<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
							{title}
						</h2>
						<p className="text-muted-foreground mb-6 leading-relaxed">
							{description}
						</p>
						<Button size="lg" className="gap-2" asChild>
							<Link href={cta.href}>
								{cta.label}
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					<div className="order-1 @xl:order-2">
						<div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border border-border/50">
							<Image src={image} alt={title} fill className="object-cover" />
						</div>
					</div>
				</div>
			</TabsContent>
		))}
	</Tabs>
);
