import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Blend, Split, Columns } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Blend} text="Overlap" />
					<Title text="Overlapping Cards" />
					<Description text="Dynamic card layout with overlapping elements." />
				</div>

				<OverlapGrid
					items={[
						{
							mainImage: 'https://picsum.photos/seed/over1/800/600',
							secondaryImage: 'https://picsum.photos/seed/over1b/400/300',
							title: 'Financial Dashboard',
							description: 'Real-time analytics and portfolio management.',
							category: 'Fintech',
							year: '2025',
							href: '#',
						},
						{
							mainImage: 'https://picsum.photos/seed/over2/800/600',
							secondaryImage: 'https://picsum.photos/seed/over2b/400/300',
							title: 'Healthcare Platform',
							description: 'Patient management and telehealth solution.',
							category: 'Healthcare',
							year: '2024',
							href: '#',
						},
						{
							mainImage: 'https://picsum.photos/seed/over3/800/600',
							secondaryImage: 'https://picsum.photos/seed/over3b/400/300',
							title: 'E-Learning System',
							description: 'Interactive courses and progress tracking.',
							category: 'Education',
							year: '2024',
							href: '#',
						},
						{
							mainImage: 'https://picsum.photos/seed/over4/800/600',
							secondaryImage: 'https://picsum.photos/seed/over4b/400/300',
							title: 'Social Network',
							description: 'Community platform with rich media support.',
							category: 'Social',
							year: '2024',
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

interface OverlapItem {
	mainImage: string;
	secondaryImage: string;
	title: string;
	description: string;
	category: string;
	year: string;
	href: string;
}

const OverlapGrid = ({ items }: { items: OverlapItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-x-6 gap-y-16">
		{items.map(
			(
				{ mainImage, secondaryImage, title, description, category, year, href },
				i,
			) => (
				<Link key={i} href={href} className="group block relative">
					{/* Main image */}
					<div className="relative rounded-2xl overflow-hidden shadow-xl">
						<div className="relative aspect-[4/3]">
							<Image
								src={mainImage}
								alt={title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						</div>

						{/* Badges */}
						<div className="absolute top-4 left-4 flex gap-2">
							<Badge>{category}</Badge>
							<Badge variant="secondary">{year}</Badge>
						</div>
					</div>

					{/* Overlapping card */}
					<Card className="absolute -bottom-10 right-4 @md:right-8 w-3/4 @md:w-2/3 shadow-2xl border transition-all duration-300 group-hover:translate-y-[-8px] group-hover:shadow-primary/20 p-0">
						<div className="flex gap-3 p-3 @md:p-4">
							{/* Secondary image */}
							<div className="relative size-16 @md:size-20 rounded-lg overflow-hidden bg-muted shrink-0">
								<Image
									src={secondaryImage}
									alt={`${title} Detail`}
									fill
									className="object-cover"
								/>
							</div>

							{/* Content */}
							<div className="flex-1 min-w-0">
								<h3 className="font-bold text-sm @md:text-base group-hover:text-primary transition-colors truncate">
									{title}
								</h3>
								<p className="text-xs @md:text-sm text-muted-foreground line-clamp-2">
									{description}
								</p>
							</div>

							<ArrowUpRight className="size-4 @md:size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
						</div>
					</Card>
				</Link>
			),
		)}
	</div>
);
