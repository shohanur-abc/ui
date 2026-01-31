import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accessibility,
	CheckCircle2,
	Eye,
	Headphones,
	Keyboard,
	Monitor,
	MousePointer,
	Sparkles,
} from 'lucide-react';
import { ComponentType } from 'react';

interface AccessibilityFeature {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Accessibility} text="Accessibility" />
					<Title text="Built for" highlight="Everyone" />
					<Description text="We believe technology should be accessible to all. Our platform meets WCAG 2.1 AA standards." />
				</div>

				<AccessibilityGrid
					items={[
						{
							icon: Keyboard,
							title: 'Keyboard Navigation',
							description:
								'Full functionality without a mouse. Navigate everything with keyboard shortcuts.',
						},
						{
							icon: Eye,
							title: 'Screen Reader Support',
							description:
								'Optimized for NVDA, JAWS, and VoiceOver with proper ARIA labels.',
						},
						{
							icon: Monitor,
							title: 'High Contrast Mode',
							description:
								'Enhanced visibility options for users with visual impairments.',
						},
						{
							icon: MousePointer,
							title: 'Focus Indicators',
							description:
								'Clear visual focus states for all interactive elements.',
						},
						{
							icon: Headphones,
							title: 'Audio Descriptions',
							description:
								'Video content includes audio descriptions and captions.',
						},
						{
							icon: CheckCircle2,
							title: 'WCAG 2.1 AA',
							description:
								'Regularly audited to ensure compliance with accessibility standards.',
						},
					]}
				/>

				<ComplianceNote />
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

const AccessibilityGrid = ({ items }: { items: AccessibilityFeature[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3 max-w-5xl mx-auto mb-10">
		{items.map((item) => (
			<Card
				key={item.title}
				className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
					<h3 className="font-semibold mb-2">{item.title}</h3>
					<p className="text-sm text-muted-foreground">{item.description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const ComplianceNote = () => (
	<div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 max-w-2xl mx-auto">
		<p className="text-sm text-muted-foreground">
			Have accessibility feedback? We're committed to continuous improvement.
			<a href="/accessibility" className="text-primary hover:underline ml-1">
				Contact our accessibility team →
			</a>
		</p>
	</div>
);
