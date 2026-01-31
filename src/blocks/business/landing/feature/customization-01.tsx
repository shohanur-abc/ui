import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Eye,
	Layout,
	Moon,
	Palette,
	Settings,
	Sparkles,
	Sun,
	Type,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface CustomizationOption {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<div>
						<Eyebrow icon={Palette} text="Customization" />
						<Title text="Make It Truly" highlight="Your Own" />
						<Description text="Personalize every aspect of the platform to match your brand, workflow, and preferences." />
						<CustomizationList
							items={[
								{
									icon: Palette,
									title: 'Custom Branding',
									description: 'Your logo, colors, and domain',
								},
								{
									icon: Layout,
									title: 'Flexible Layouts',
									description: 'Drag and drop interface builder',
								},
								{
									icon: Moon,
									title: 'Theme Options',
									description: 'Light, dark, or auto mode',
								},
								{
									icon: Type,
									title: 'Typography',
									description: 'Choose your preferred fonts',
								},
							]}
						/>
						<CTAButton
							label="Explore Customization"
							href="/features/customization"
						/>
					</div>

					<ThemePreview />
				</div>
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
	<h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const CustomizationList = ({ items }: { items: CustomizationOption[] }) => (
	<div className="grid gap-3 @sm:grid-cols-2 mb-6">
		{items.map((item) => (
			<div
				key={item.title}
				className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
			>
				<item.icon className="size-5 text-primary shrink-0" />
				<div>
					<h4 className="text-sm font-medium">{item.title}</h4>
					<p className="text-xs text-muted-foreground">{item.description}</p>
				</div>
			</div>
		))}
	</div>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

const ThemePreview = () => (
	<div className="relative">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl opacity-40" />
		<Card className="relative border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
			<CardContent className="p-6">
				{/* Theme switcher */}
				<div className="flex items-center justify-between mb-6">
					<span className="text-sm font-medium">Theme Preview</span>
					<div className="flex gap-2">
						<Button size="icon" variant="outline" className="size-8">
							<Sun className="size-4" />
						</Button>
						<Button size="icon" variant="default" className="size-8">
							<Moon className="size-4" />
						</Button>
					</div>
				</div>

				{/* Color palette */}
				<div className="mb-6">
					<span className="text-xs text-muted-foreground mb-2 block">
						Brand Colors
					</span>
					<div className="flex gap-2">
						<div className="size-10 rounded-lg bg-primary" />
						<div className="size-10 rounded-lg bg-accent" />
						<div className="size-10 rounded-lg bg-emerald-500" />
						<div className="size-10 rounded-lg bg-amber-500" />
						<div className="size-10 rounded-lg bg-rose-500" />
					</div>
				</div>

				{/* Mock UI */}
				<div className="space-y-3">
					<div className="h-4 rounded bg-muted/50 w-3/4" />
					<div className="h-4 rounded bg-muted/50 w-1/2" />
					<div className="flex gap-2 mt-4">
						<div className="h-8 w-20 rounded bg-primary" />
						<div className="h-8 w-20 rounded border border-border" />
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);
