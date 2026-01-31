import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Braces,
	Cloud,
	Database,
	Globe,
	Layers,
	Palette,
	Server,
	Smartphone,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Mosaic Layout"
					title="Variable Tiles"
					subtitle="A dynamic view of my skill set"
				/>

				<MasonryVariant
					items={[
						{
							icon: Braces,
							title: 'TypeScript',
							description: 'Type-safe development with advanced patterns',
							level: 95,
							size: 'lg',
						},
						{ icon: Globe, title: 'React', level: 95, size: 'sm' },
						{ icon: Server, title: 'Node.js', level: 88, size: 'sm' },
						{
							icon: Database,
							title: 'Database',
							description: 'PostgreSQL, MongoDB, Redis for various data needs',
							level: 85,
							size: 'md',
						},
						{ icon: Cloud, title: 'Cloud', level: 82, size: 'sm' },
						{
							icon: Layers,
							title: 'DevOps',
							description: 'CI/CD, Docker, Kubernetes',
							level: 80,
							size: 'md',
						},
						{ icon: Palette, title: 'Design', level: 78, size: 'sm' },
						{ icon: Smartphone, title: 'Mobile', level: 72, size: 'sm' },
						{
							icon: Zap,
							title: 'Performance',
							description: 'Core Web Vitals optimization',
							level: 85,
							size: 'md',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface SectionHeaderProps {
	badge: string;
	title: string;
	subtitle: string;
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface TileItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description?: string;
	level: number;
	size: 'sm' | 'md' | 'lg';
}

const MasonryVariant = ({ items }: { items: TileItem[] }) => (
	<div className="columns-1 @sm:columns-2 @lg:columns-3 gap-4 max-w-5xl mx-auto">
		{items.map((item, i) => (
			<VariableTile key={i} {...item} />
		))}
	</div>
);

const VariableTile = ({
	icon: Icon,
	title,
	description,
	level,
	size,
}: TileItem) => {
	const sizeClasses = {
		sm: 'p-4',
		md: 'p-5',
		lg: 'p-6',
	};

	return (
		<Card className="group hover:border-primary/50 transition-all mb-4 break-inside-avoid">
			<CardContent className={sizeClasses[size]}>
				<div className="flex items-center gap-3 mb-3">
					<div
						className={`rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${size === 'lg' ? 'size-12' : 'size-10'}`}
					>
						<Icon
							className={`text-primary ${size === 'lg' ? 'size-6' : 'size-5'}`}
						/>
					</div>
					<h4 className={`font-bold ${size === 'lg' ? 'text-lg' : ''}`}>
						{title}
					</h4>
				</div>
				{description && (
					<p className="text-sm text-muted-foreground mb-4">{description}</p>
				)}
				<div className="flex items-center gap-3">
					<Progress value={level} className="h-2 flex-1" />
					<span className="text-sm font-bold text-primary">{level}%</span>
				</div>
			</CardContent>
		</Card>
	);
};
