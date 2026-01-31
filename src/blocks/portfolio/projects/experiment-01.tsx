import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowUpRight, Lightbulb, Beaker, FlaskConical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={FlaskConical} text="Labs" />
					<Title text="Experiments" />
					<Description text="Side projects and experimental prototypes exploring new ideas." />
				</div>

				<ExperimentGrid
					items={[
						{
							image: 'https://picsum.photos/seed/exp1/600/400',
							title: 'AI Art Generator',
							description: 'Generative art using diffusion models.',
							status: 'prototype',
							tech: ['Python', 'Stable Diffusion'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp2/600/400',
							title: 'Voice Assistant',
							description: 'Natural language interface experiment.',
							status: 'concept',
							tech: ['Whisper', 'GPT-4'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp3/600/400',
							title: 'AR Navigation',
							description: 'Augmented reality wayfinding app.',
							status: 'prototype',
							tech: ['ARKit', 'Swift'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp4/600/400',
							title: 'Motion Graphics',
							description: 'Procedural animation system.',
							status: 'exploring',
							tech: ['Three.js', 'GLSL'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp5/600/400',
							title: 'Smart Home Hub',
							description: 'Local-first home automation.',
							status: 'prototype',
							tech: ['Raspberry Pi', 'MQTT'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp6/600/400',
							title: 'Code Review Bot',
							description: 'AI-powered PR reviewer.',
							status: 'concept',
							tech: ['GitHub API', 'Claude'],
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

interface ExperimentItem {
	image: string;
	title: string;
	description: string;
	status: 'concept' | 'prototype' | 'exploring';
	tech: string[];
	href: string;
}

const statusConfig = {
	concept: { color: 'bg-purple-500', icon: Lightbulb },
	prototype: { color: 'bg-green-500', icon: Beaker },
	exploring: { color: 'bg-blue-500', icon: FlaskConical },
};

const ExperimentGrid = ({ items }: { items: ExperimentItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map(({ image, title, description, status, tech, href }, i) => {
			const config = statusConfig[status];
			const StatusIcon = config.icon;

			return (
				<Card
					key={i}
					className="group overflow-hidden border border-dashed transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:border-solid p-0"
				>
					<Link href={href} className="block">
						<div className="relative aspect-video overflow-hidden bg-muted">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

							{/* Status badge */}
							<Badge
								className={`absolute top-3 left-3 gap-1.5 ${config.color}`}
							>
								<StatusIcon className="size-3" />
								{status}
							</Badge>
						</div>

						<CardContent className="p-5">
							<h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{description}
							</p>
						</CardContent>

						<CardFooter className="pt-0 pb-5 px-5">
							<div className="flex items-center justify-between w-full">
								<div className="flex flex-wrap gap-1.5">
									{tech.map((t, j) => (
										<Badge key={j} variant="outline" className="text-xs">
											{t}
										</Badge>
									))}
								</div>
								<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</CardFooter>
					</Link>
				</Card>
			);
		})}
	</div>
);
