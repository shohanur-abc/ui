import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Blocks,
	Braces,
	Cloud,
	Database,
	Globe,
	Palette,
	Server,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Tech Stack"
					title="Skills Mosaic"
					description="A visual representation of my technical expertise"
				/>

				<MasonryLayout
					items={[
						{
							icon: Braces,
							title: 'TypeScript',
							level: 95,
							category: 'Language',
							height: 'tall',
						},
						{
							icon: Globe,
							title: 'React',
							level: 95,
							category: 'Framework',
							height: 'short',
						},
						{
							icon: Server,
							title: 'Node.js',
							level: 88,
							category: 'Runtime',
							height: 'medium',
						},
						{
							icon: Database,
							title: 'PostgreSQL',
							level: 85,
							category: 'Database',
							height: 'short',
						},
						{
							icon: Cloud,
							title: 'AWS',
							level: 82,
							category: 'Cloud',
							height: 'medium',
						},
						{
							icon: Blocks,
							title: 'Docker',
							level: 80,
							category: 'DevOps',
							height: 'short',
						},
						{
							icon: Palette,
							title: 'Tailwind',
							level: 95,
							category: 'CSS',
							height: 'tall',
						},
						{
							icon: Zap,
							title: 'Performance',
							level: 88,
							category: 'Skill',
							height: 'short',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface TitleSectionProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface MasonryItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	level: number;
	category: string;
	height: 'short' | 'medium' | 'tall';
}

const MasonryLayout = ({ items }: { items: MasonryItem[] }) => (
	<div className="columns-2 @lg:columns-3 @xl:columns-4 gap-4 max-w-5xl mx-auto">
		{items.map((item, i) => (
			<MosaicCard key={i} {...item} />
		))}
	</div>
);

const MosaicCard = ({
	icon: Icon,
	title,
	level,
	category,
	height,
}: MasonryItem) => {
	const heightClass = {
		short: 'min-h-32',
		medium: 'min-h-44',
		tall: 'min-h-56',
	}[height];

	return (
		<Card
			className={`group hover:border-primary/50 transition-all mb-4 break-inside-avoid ${heightClass}`}
		>
			<CardContent className="p-4 @md:p-5 h-full flex flex-col">
				<div className="flex items-center justify-between mb-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
						<Icon className="size-5 text-primary" />
					</div>
					<Badge variant="outline" className="text-xs">
						{category}
					</Badge>
				</div>
				<h4 className="font-bold mb-auto">{title}</h4>
				<div className="mt-4">
					<div className="flex justify-between text-sm mb-1">
						<span className="text-muted-foreground">Proficiency</span>
						<span className="font-bold text-primary">{level}%</span>
					</div>
					<Progress value={level} className="h-2" />
				</div>
			</CardContent>
		</Card>
	);
};
