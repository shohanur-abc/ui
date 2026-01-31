import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ArrowUpRight,
	Palette,
	MousePointer2,
	Zap,
	Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={MousePointer2} text="Interactive" />
					<Title text="Interactive Demos" />
					<Description text="Try interactive demonstrations of key project features." />
				</div>

				<InteractiveGrid
					items={[
						{
							preview: 'https://picsum.photos/seed/int1/600/400',
							title: 'Color System Builder',
							description: 'Generate accessible color palettes instantly.',
							icon: Palette,
							demoUrl: '#demo-color',
							href: '#',
						},
						{
							preview: 'https://picsum.photos/seed/int2/600/400',
							title: 'Animation Playground',
							description: 'Experiment with motion and timing curves.',
							icon: Zap,
							demoUrl: '#demo-animation',
							href: '#',
						},
						{
							preview: 'https://picsum.photos/seed/int3/600/400',
							title: 'Component Configurator',
							description: 'Customize and export UI components.',
							icon: Sparkles,
							demoUrl: '#demo-components',
							href: '#',
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
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface InteractiveItem {
	preview: string;
	title: string;
	description: string;
	icon: ComponentType<{ className?: string }>;
	demoUrl: string;
	href: string;
}

const InteractiveGrid = ({ items }: { items: InteractiveItem[] }) => (
	<div className="grid @lg:grid-cols-3 gap-6">
		{items.map(
			({ preview, title, description, icon: Icon, demoUrl, href }, i) => (
				<Card
					key={i}
					className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
				>
					<div className="relative aspect-video overflow-hidden bg-muted">
						<Image
							src={preview}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

						{/* Play overlay */}
						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
							<Button variant="secondary" className="gap-2">
								<MousePointer2 className="size-4" />
								Try Demo
							</Button>
						</div>

						{/* Icon badge */}
						<div className="absolute top-3 left-3 size-10 rounded-lg bg-primary/90 flex items-center justify-center backdrop-blur-sm">
							<Icon className="size-5 text-primary-foreground" />
						</div>
					</div>

					<CardContent className="p-5">
						<Link href={href} className="block">
							<h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{description}
							</p>

							<div className="flex items-center gap-2 text-sm">
								<Badge variant="outline" className="gap-1">
									<Zap className="size-3" />
									Interactive
								</Badge>
								<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
							</div>
						</Link>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
