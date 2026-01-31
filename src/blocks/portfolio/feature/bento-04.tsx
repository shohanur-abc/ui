import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Brain,
	Cloud,
	Cog,
	Layers,
	MonitorSmartphone,
	Palette,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Skills" />
					<Title text="Full-Stack Expertise" />
					<Description text="A comprehensive skill set spanning design, development, and deployment." />
				</div>

				<AsymmetricGrid
					items={[
						{
							icon: Palette,
							title: 'UI Design',
							description:
								'Creating intuitive and visually stunning interfaces that users love.',
							size: 'tall',
						},
						{
							icon: MonitorSmartphone,
							title: 'Responsive',
							description: 'Pixel-perfect on every device.',
							size: 'normal',
						},
						{
							icon: Brain,
							title: 'AI Integration',
							description: 'Machine learning solutions.',
							size: 'normal',
						},
						{
							icon: Layers,
							title: 'Architecture',
							description:
								'Scalable system design patterns for enterprise applications.',
							size: 'wide',
						},
						{
							icon: Cloud,
							title: 'DevOps',
							description: 'Infrastructure automation.',
							size: 'normal',
						},
						{
							icon: Cog,
							title: 'Backend',
							description: 'Robust server solutions.',
							size: 'normal',
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
	size: 'normal' | 'tall' | 'wide';
}

const AsymmetricGrid = ({ items }: { items: GridItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5 auto-rows-fr">
		{items.map(({ icon: Icon, title, description, size }, i) => (
			<Card
				key={i}
				className={`py-0 group hover:shadow-lg transition-all hover:-translate-y-0.5 ${
					size === 'tall'
						? '@xl:row-span-2'
						: size === 'wide'
							? '@xl:col-span-2'
							: ''
				}`}
			>
				<CardContent
					className={`p-5 @md:p-6 h-full flex flex-col ${size === 'tall' ? 'justify-between' : ''}`}
				>
					<div>
						<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon
								className={
									size === 'tall' ? 'size-6 @md:size-7' : 'size-5 @md:size-6'
								}
							/>
						</div>
						<h3
							className={`font-bold mb-2 ${size === 'tall' || size === 'wide' ? 'text-lg @md:text-xl' : 'text-base @md:text-lg'}`}
						>
							{title}
						</h3>
					</div>
					<p
						className={`text-muted-foreground leading-relaxed ${size === 'tall' || size === 'wide' ? 'text-sm @md:text-base' : 'text-sm'}`}
					>
						{description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
