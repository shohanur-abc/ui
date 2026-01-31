import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Brain,
	LineChart,
	MessageSquareText,
	Search,
	Sparkles,
	Wand2,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface AIFeature {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	tag: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<GlowBackground />
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Brain} text="AI Features" />
					<Title text="Supercharged with" highlight="Artificial Intelligence" />
					<Description text="Our AI assistant helps you work smarter, not harder. Automate tasks, get insights, and save hours every week." />
				</div>

				<AIFeatureGrid
					items={[
						{
							icon: Wand2,
							title: 'Smart Automation',
							description:
								'AI learns your patterns and suggests workflow optimizations.',
							tag: 'Popular',
						},
						{
							icon: MessageSquareText,
							title: 'Natural Language',
							description:
								'Ask questions in plain English, get instant answers.',
							tag: 'New',
						},
						{
							icon: LineChart,
							title: 'Predictive Analytics',
							description:
								'Forecast trends and identify opportunities before they happen.',
							tag: 'Beta',
						},
						{
							icon: Search,
							title: 'Intelligent Search',
							description:
								'Find anything instantly with semantic understanding.',
							tag: '',
						},
					]}
				/>

				<CTASection label="Explore AI Features" href="/features/ai" />
			</div>
		</section>
	);
}

const GlowBackground = () => (
	<>
		<div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
		<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
	</>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge className="gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-accent border-0 text-primary-foreground">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text}{' '}
		<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
			{highlight}
		</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const AIFeatureGrid = ({ items }: { items: AIFeature[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 max-w-4xl mx-auto">
		{items.map((item) => (
			<Card
				key={item.title}
				className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all group-hover:scale-105">
							<item.icon className="size-6 text-primary" />
						</div>
						{item.tag && (
							<Badge variant="secondary" className="text-xs">
								{item.tag}
							</Badge>
						)}
					</div>
					<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
					<p className="text-sm text-muted-foreground">{item.description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
