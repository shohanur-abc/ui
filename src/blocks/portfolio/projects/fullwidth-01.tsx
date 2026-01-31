import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10 @md:mb-14">
					<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6">
						<div className="max-w-2xl">
							<Eyebrow icon={Maximize} text="Showcase" />
							<Title text="Full-Width Projects" />
							<Description text="Edge-to-edge project display for maximum visual impact." />
						</div>
						<Button variant="outline" className="gap-2 w-fit" asChild>
							<Link href="#grid">
								<Minimize className="size-4" />
								Compact View
							</Link>
						</Button>
					</div>
				</div>

				<FullWidthStack
					items={[
						{
							image: 'https://picsum.photos/seed/fw1/1600/600',
							title: 'Automotive Configurator',
							description:
								'3D vehicle customization tool with real-time rendering.',
							tags: ['Three.js', 'React', 'WebGL'],
							metrics: { label: 'Configurations', value: '2M+' },
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/fw2/1600/600',
							title: 'Music Production Suite',
							description: 'Browser-based DAW with plugin ecosystem.',
							tags: ['Web Audio', 'React', 'WebAssembly'],
							metrics: { label: 'Tracks Created', value: '500K+' },
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/fw3/1600/600',
							title: 'Satellite Imagery Platform',
							description: 'AI-powered geospatial analysis tool.',
							tags: ['Python', 'TensorFlow', 'MapboxGL'],
							metrics: { label: 'Area Analyzed', value: '1M km²' },
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
	<div className="flex items-center gap-2 mb-3 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium uppercase tracking-wider">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface FullWidthItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	metrics: { label: string; value: string };
	href: string;
}

const FullWidthStack = ({ items }: { items: FullWidthItem[] }) => (
	<div className="space-y-4">
		{items.map(({ image, title, description, tags, metrics, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group block relative overflow-hidden"
			>
				<div className="relative h-[300px] @md:h-[400px] @xl:h-[500px]">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform duration-1000 group-hover:scale-105"
					/>

					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

					{/* Glow effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					{/* Content */}
					<div className="absolute inset-0 flex items-center">
						<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full">
							<div className="max-w-2xl">
								<div className="flex flex-wrap gap-2 mb-4">
									{tags.map((tag, j) => (
										<Badge
											key={j}
											variant="outline"
											className="bg-white/10 text-white border-white/30 backdrop-blur-sm"
										>
											{tag}
										</Badge>
									))}
								</div>

								<h3 className="text-white text-2xl @md:text-3xl @xl:text-4xl font-bold mb-3">
									{title}
								</h3>
								<p className="text-white/80 mb-6 max-w-xl">{description}</p>

								<div className="flex items-center gap-8">
									<div>
										<div className="text-2xl @md:text-3xl font-bold text-primary">
											{metrics.value}
										</div>
										<div className="text-sm text-white/60">{metrics.label}</div>
									</div>

									<Button variant="secondary" className="gap-2">
										View Project <ArrowUpRight className="size-4" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		))}
	</div>
);
