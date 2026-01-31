import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<AsymmetricGallery
					header={{
						eyebrow: 'Portfolio',
						title: 'Recent Projects',
						description: 'A showcase of my latest work.',
					}}
					items={[
						{
							image: 'https://picsum.photos/seed/asym1/800/1000',
							title: 'E-Commerce Platform',
							category: 'Web Development',
							size: 'tall',
						},
						{
							image: 'https://picsum.photos/seed/asym2/600/400',
							title: 'Analytics Dashboard',
							category: 'UI Design',
							size: 'normal',
						},
						{
							image: 'https://picsum.photos/seed/asym3/600/400',
							title: 'Mobile Banking',
							category: 'Mobile App',
							size: 'normal',
						},
						{
							image: 'https://picsum.photos/seed/asym4/800/600',
							title: 'SaaS Platform',
							category: 'Full-Stack',
							size: 'wide',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

interface GalleryItem {
	image: string;
	title: string;
	category: string;
	size: 'normal' | 'tall' | 'wide';
}

interface AsymmetricGalleryProps {
	header: HeaderProps;
	items: GalleryItem[];
}

const AsymmetricGallery = ({ header, items }: AsymmetricGalleryProps) => (
	<div>
		<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-3 @md:mb-4">
				{header.eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{header.title}
			</h2>
			<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
				{header.description}
			</p>
		</div>

		<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
			{items.map(({ image, title, category, size }, i) => (
				<Card
					key={i}
					className={`py-0 overflow-hidden group cursor-pointer ${
						size === 'tall'
							? '@xl:row-span-2'
							: size === 'wide'
								? '@xl:col-span-2'
								: ''
					}`}
				>
					<CardContent className="p-0 relative h-full min-h-[250px]">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
							<Badge variant="secondary" className="mb-2 text-xs">
								{category}
							</Badge>
							<h3 className="font-bold text-lg @md:text-xl">{title}</h3>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);
