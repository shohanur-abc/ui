import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Boxes } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-3 gap-8 @lg:gap-12 mb-12 @md:mb-16">
					<div className="@lg:col-span-2">
						<Eyebrow icon={Boxes} text="Portfolio" />
						<Title text="Creative Solutions" highlight="that deliver results" />
					</div>
					<div className="flex @lg:justify-end @lg:items-end">
						<Stats
							items={[
								{ value: '50+', label: 'Projects' },
								{ value: '30+', label: 'Clients' },
							]}
						/>
					</div>
				</div>

				<AsymmetricBento
					primary={{
						image: 'https://picsum.photos/seed/bento3a/1000/1000',
						title: 'Product Design System',
						description:
							'Comprehensive design system powering multiple product lines with consistent UX.',
						category: 'Design Systems',
						metrics: [
							{ value: '200+', label: 'Components' },
							{ value: '5', label: 'Products' },
						],
						href: '#',
					}}
					items={[
						{
							image: 'https://picsum.photos/seed/bento3b/600/400',
							title: 'NFT Marketplace',
							category: 'Web3',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento3c/600/400',
							title: 'Cloud Infrastructure',
							category: 'DevOps',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento3d/600/400',
							title: 'Analytics Dashboard',
							category: 'Data',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento3e/600/400',
							title: 'IoT Platform',
							category: 'Hardware',
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
	<div className="flex items-center gap-2 mb-4 text-primary">
		<Icon className="size-5" />
		<span className="text-sm font-semibold uppercase tracking-wider">
			{text}
		</span>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="flex gap-8">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-3xl @md:text-4xl font-bold text-primary">
					{value}
				</div>
				<div className="text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

interface PrimaryItem {
	image: string;
	title: string;
	description: string;
	category: string;
	metrics: { value: string; label: string }[];
	href: string;
}

interface GridItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const AsymmetricBento = ({
	primary,
	items,
}: {
	primary: PrimaryItem;
	items: GridItem[];
}) => (
	<div className="grid @lg:grid-cols-2 gap-4 @md:gap-6">
		{/* Primary large card */}
		<Card className="group relative overflow-hidden border-0 bg-transparent @lg:row-span-2 p-0">
			<Link href={primary.href} className="block h-full">
				<div className="relative aspect-square @lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
					<Image
						src={primary.image}
						alt={primary.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

					{/* Glow effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
					</div>

					<div className="absolute top-4 left-4">
						<Badge className="bg-primary/90 backdrop-blur-sm">
							{primary.category}
						</Badge>
					</div>

					<div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
						<h3 className="text-white text-2xl @md:text-3xl @xl:text-4xl font-bold mb-2">
							{primary.title}
						</h3>
						<p className="text-white/80 mb-4 max-w-md">{primary.description}</p>
						<div className="flex gap-6 mb-4">
							{primary.metrics.map(({ value, label }, i) => (
								<div key={i}>
									<div className="text-white text-xl font-bold">{value}</div>
									<div className="text-white/60 text-sm">{label}</div>
								</div>
							))}
						</div>
						<Button variant="secondary" className="gap-2">
							View Case Study <ArrowUpRight className="size-4" />
						</Button>
					</div>
				</div>
			</Link>
		</Card>

		{/* Grid of smaller items */}
		<div className="grid @sm:grid-cols-2 gap-4 @md:gap-6">
			{items.map(({ image, title, category, href }, i) => (
				<Link
					key={i}
					href={href}
					className="group relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
				>
					<div className="relative aspect-[4/3]">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
						<div className="absolute top-3 left-3">
							<Badge
								variant="outline"
								className="bg-white/10 backdrop-blur-sm text-white border-white/20"
							>
								{category}
							</Badge>
						</div>
						<div className="absolute bottom-0 left-0 right-0 p-4">
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
