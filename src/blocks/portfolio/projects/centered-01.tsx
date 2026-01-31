import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Star, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Trophy} text="Highlights" />
					<Title text="Top Projects" highlight="of 2024" />
					<Description text="The most impactful work delivered this year." />
				</div>

				<CenteredShowcase
					featured={{
						image: 'https://picsum.photos/seed/cent1a/1200/800',
						title: 'AI-Powered Design Tool',
						description:
							'Revolutionary design platform that uses machine learning to generate layouts, color schemes, and component variations based on user input and brand guidelines.',
						tags: ['React', 'Python', 'TensorFlow', 'Figma API'],
						stats: [
							{ value: '10K+', label: 'Users' },
							{ value: '1M+', label: 'Designs Created' },
							{ value: '4.9', label: 'Rating', icon: Star },
						],
						href: '#',
					}}
					secondary={[
						{
							image: 'https://picsum.photos/seed/cent1b/600/400',
							title: 'Sustainability Tracker',
							category: 'Environmental',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/cent1c/600/400',
							title: 'Mental Health App',
							category: 'Healthcare',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/cent1d/600/400',
							title: 'Remote Work Hub',
							category: 'Productivity',
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

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface FeaturedItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	stats: {
		value: string;
		label: string;
		icon?: ComponentType<{ className?: string }>;
	}[];
	href: string;
}

interface SecondaryItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

interface CenteredShowcaseProps {
	featured: FeaturedItem;
	secondary: SecondaryItem[];
}

const CenteredShowcase = ({ featured, secondary }: CenteredShowcaseProps) => (
	<div className="space-y-8">
		{/* Featured large card */}
		<div className="group relative rounded-2xl @md:rounded-3xl overflow-hidden bg-card border transition-all hover:shadow-2xl hover:shadow-primary/15">
			<div className="grid @lg:grid-cols-2">
				<div className="relative aspect-video @lg:aspect-auto @lg:min-h-[450px] overflow-hidden">
					<Image
						src={featured.image}
						alt={featured.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden @lg:block" />
				</div>

				<div className="p-6 @md:p-8 @xl:p-12 flex flex-col justify-center">
					<div className="flex flex-wrap gap-2 mb-4">
						{featured.tags.map((tag, i) => (
							<Badge key={i} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>

					<h3 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-4">
						{featured.title}
					</h3>
					<p className="text-muted-foreground mb-6 leading-relaxed">
						{featured.description}
					</p>

					{/* Stats */}
					<div className="flex flex-wrap gap-6 @md:gap-8 mb-8 pb-8 border-b border-border">
						{featured.stats.map(({ value, label, icon: Icon }, i) => (
							<div key={i}>
								<div className="flex items-center gap-1.5 text-2xl @md:text-3xl font-bold text-primary">
									{Icon && (
										<Icon className="size-5 text-yellow-500 fill-yellow-500" />
									)}
									{value}
								</div>
								<div className="text-sm text-muted-foreground">{label}</div>
							</div>
						))}
					</div>

					<Button className="w-fit gap-2" size="lg" asChild>
						<Link href={featured.href}>
							View Case Study <ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>

		{/* Secondary cards */}
		<div className="grid @md:grid-cols-3 gap-4 @md:gap-6">
			{secondary.map(({ image, title, category, href }, i) => (
				<Link
					key={i}
					href={href}
					className="group relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
				>
					<div className="relative aspect-[3/2] overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<Badge className="mb-2 bg-primary/90">{category}</Badge>
							<h3 className="text-white font-semibold flex items-center gap-2">
								{title}
								<ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
							</h3>
						</div>
					</div>
				</Link>
			))}
		</div>
	</div>
);
