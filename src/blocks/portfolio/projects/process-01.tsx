import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Figma, Code2, Layers, Paintbrush } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Paintbrush} text="Process" />
					<Title text="Design to Code" />
					<Description text="From initial design concepts to production-ready code." />
				</div>

				<ProcessShowcase
					items={[
						{
							design: 'https://picsum.photos/seed/proc1a/600/400',
							code: 'https://picsum.photos/seed/proc1b/600/400',
							title: 'Dashboard Interface',
							tools: ['Figma', 'React', 'Tailwind'],
							designLink: '#figma',
							codeLink: '#github',
						},
						{
							design: 'https://picsum.photos/seed/proc2a/600/400',
							code: 'https://picsum.photos/seed/proc2b/600/400',
							title: 'Mobile App Screens',
							tools: ['Sketch', 'React Native', 'Expo'],
							designLink: '#sketch',
							codeLink: '#github',
						},
						{
							design: 'https://picsum.photos/seed/proc3a/600/400',
							code: 'https://picsum.photos/seed/proc3b/600/400',
							title: 'Marketing Website',
							tools: ['Figma', 'Next.js', 'Framer Motion'],
							designLink: '#figma',
							codeLink: '#github',
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

interface ProcessItem {
	design: string;
	code: string;
	title: string;
	tools: string[];
	designLink: string;
	codeLink: string;
}

const ProcessShowcase = ({ items }: { items: ProcessItem[] }) => (
	<div className="space-y-12">
		{items.map(({ design, code, title, tools, designLink, codeLink }, i) => (
			<div key={i} className="group">
				<Card className="overflow-hidden border transition-all group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/20 p-0">
					<div className="grid @lg:grid-cols-2">
						{/* Design Side */}
						<div className="relative">
							<div className="absolute top-4 left-4 z-10 flex items-center gap-2">
								<Badge className="gap-1.5 bg-purple-600">
									<Figma className="size-3" />
									Design
								</Badge>
							</div>
							<div className="relative aspect-[4/3] overflow-hidden bg-muted">
								<Image
									src={design}
									alt={`${title} Design`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card @lg:bg-gradient-to-r @lg:from-transparent @lg:via-transparent @lg:to-card" />
							</div>
							<Button
								variant="secondary"
								size="sm"
								className="absolute bottom-4 left-4 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
								asChild
							>
								<Link href={designLink}>
									<Layers className="size-3.5" />
									View Design
								</Link>
							</Button>
						</div>

						{/* Code Side */}
						<div className="relative">
							<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
								<Badge className="gap-1.5 bg-green-600">
									<Code2 className="size-3" />
									Code
								</Badge>
							</div>
							<div className="relative aspect-[4/3] overflow-hidden bg-muted">
								<Image
									src={code}
									alt={`${title} Code`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<Button
								variant="secondary"
								size="sm"
								className="absolute bottom-4 right-4 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
								asChild
							>
								<Link href={codeLink}>
									<Code2 className="size-3.5" />
									View Code
								</Link>
							</Button>
						</div>
					</div>

					{/* Info */}
					<CardContent className="p-5 border-t">
						<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
							<div>
								<h3 className="font-bold text-lg group-hover:text-primary transition-colors">
									{title}
								</h3>
								<div className="flex flex-wrap gap-1.5 mt-2">
									{tools.map((tool, j) => (
										<Badge key={j} variant="secondary" className="text-xs">
											{tool}
										</Badge>
									))}
								</div>
							</div>

							{/* Arrow connector */}
							<div className="hidden @md:flex items-center gap-3 text-muted-foreground">
								<div className="flex items-center gap-2">
									<Figma className="size-5" />
									<span className="text-sm">Design</span>
								</div>
								<div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 rounded-full" />
								<div className="flex items-center gap-2">
									<Code2 className="size-5" />
									<span className="text-sm">Code</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		))}
	</div>
);
