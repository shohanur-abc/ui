import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Columns3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={Columns3} text="Portfolio" />
						<Title text="Column Layout" />
						<Description text="Three-column asymmetric project presentation." />
					</div>
				</div>

				<ColumnsLayout
					left={[
						{
							image: 'https://picsum.photos/seed/col1a/600/800',
							title: 'Mobile Commerce',
							description: 'Shopping app with AR try-on.',
							tags: ['React Native', 'ARKit'],
							href: '#',
							size: 'tall',
						},
						{
							image: 'https://picsum.photos/seed/col1b/600/400',
							title: 'Weather App',
							description: 'Hyperlocal forecasts.',
							tags: ['Flutter', 'Weather API'],
							href: '#',
							size: 'normal',
						},
					]}
					center={[
						{
							image: 'https://picsum.photos/seed/col2a/600/500',
							title: 'Design System',
							description: 'Enterprise component library.',
							tags: ['React', 'Storybook'],
							href: '#',
							size: 'featured',
						},
						{
							image: 'https://picsum.photos/seed/col2b/600/600',
							title: 'Analytics Platform',
							description: 'Real-time data visualization.',
							tags: ['Next.js', 'D3.js'],
							href: '#',
							size: 'large',
						},
					]}
					right={[
						{
							image: 'https://picsum.photos/seed/col3a/600/400',
							title: 'Task Manager',
							description: 'Kanban project tool.',
							tags: ['Vue.js', 'Supabase'],
							href: '#',
							size: 'normal',
						},
						{
							image: 'https://picsum.photos/seed/col3b/600/700',
							title: 'Fitness Tracker',
							description: 'Health monitoring app.',
							tags: ['React Native', 'HealthKit'],
							href: '#',
							size: 'tall',
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

interface ColumnItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	href: string;
	size: 'normal' | 'tall' | 'featured' | 'large';
}

interface ColumnsLayoutProps {
	left: ColumnItem[];
	center: ColumnItem[];
	right: ColumnItem[];
}

const ColumnsLayout = ({ left, center, right }: ColumnsLayoutProps) => {
	const renderItem = ({
		image,
		title,
		description,
		tags,
		href,
		size,
	}: ColumnItem) => {
		const aspectClasses = {
			normal: 'aspect-[3/2]',
			tall: 'aspect-[3/4]',
			featured: 'aspect-[4/3]',
			large: 'aspect-square',
		};

		return (
			<Card
				key={title}
				className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<Link href={href} className="block">
					<div className={`relative ${aspectClasses[size]} overflow-hidden`}>
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
						<Button
							variant="secondary"
							size="icon-sm"
							className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<ArrowUpRight className="size-4" />
						</Button>
					</div>
					<CardHeader className="pb-2">
						<CardTitle className="text-base group-hover:text-primary transition-colors">
							{title}
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-0">
						<p className="text-sm text-muted-foreground mb-3">{description}</p>
						<div className="flex flex-wrap gap-1.5">
							{tags.map((tag, i) => (
								<Badge key={i} variant="outline" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				</Link>
			</Card>
		);
	};

	return (
		<div className="grid @lg:grid-cols-3 gap-4 @md:gap-6">
			<div className="space-y-4 @md:space-y-6">{left.map(renderItem)}</div>
			<div className="space-y-4 @md:space-y-6 @lg:pt-12">
				{center.map(renderItem)}
			</div>
			<div className="space-y-4 @md:space-y-6 @lg:pt-6">
				{right.map(renderItem)}
			</div>
		</div>
	);
};
