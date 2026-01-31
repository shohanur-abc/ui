import { Badge } from '@/components/ui/badge';
import {
	Aperture,
	Binary,
	CircuitBoard,
	Cpu,
	HardDrive,
	Network,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Tech Stack" />
					<Title text="Technologies I Use" />
					<Description text="Modern tools and frameworks for building performant applications." />
				</div>

				<MinimalGrid
					items={[
						{
							icon: Cpu,
							title: 'Processing',
							description: 'High-performance computing solutions.',
						},
						{
							icon: Network,
							title: 'Networking',
							description: 'Distributed systems architecture.',
						},
						{
							icon: HardDrive,
							title: 'Storage',
							description: 'Efficient data management.',
						},
						{
							icon: CircuitBoard,
							title: 'Hardware',
							description: 'IoT and embedded systems.',
						},
						{
							icon: Binary,
							title: 'Algorithms',
							description: 'Optimized computational logic.',
						},
						{
							icon: Aperture,
							title: 'Graphics',
							description: 'Visual computing and WebGL.',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface GridItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const MinimalGrid = ({ items }: { items: GridItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-8 @md:gap-10">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="group text-center">
				<div className="size-16 @md:size-20 rounded-full border-2 border-border flex items-center justify-center mx-auto mb-4 group-hover:border-primary group-hover:bg-primary/5 transition-all">
					<Icon className="size-7 @md:size-8 text-muted-foreground group-hover:text-primary transition-colors" />
				</div>
				<h3 className="font-bold text-lg @md:text-xl mb-2">{title}</h3>
				<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
					{description}
				</p>
			</div>
		))}
	</div>
);
