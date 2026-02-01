import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Gallery" />
					<Title text="Our Work in Action" />
					<Description text="A visual showcase of projects we've delivered across industries." />
				</div>

				<PhotoMasonry
					items={[
						{
							image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
							title: 'Dashboard Design',
							tags: ['UI/UX', 'Web App'],
							size: 'large',
						},
						{
							image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
							title: 'Mobile Commerce',
							tags: ['Mobile', 'E-commerce'],
							size: 'small',
						},
						{
							image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop',
							title: 'Analytics Platform',
							tags: ['Data', 'SaaS'],
							size: 'tall',
						},
						{
							image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
							title: 'Team Collaboration',
							tags: ['Enterprise', 'Productivity'],
							size: 'medium',
						},
						{
							image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
							title: 'Cloud Infrastructure',
							tags: ['DevOps', 'Cloud'],
							size: 'small',
						},
						{
							image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=450&fit=crop',
							title: 'Healthcare Portal',
							tags: ['Healthcare', 'Portal'],
							size: 'medium',
						},
						{
							image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=500&fit=crop',
							title: 'FinTech App',
							tags: ['Finance', 'Mobile'],
							size: 'tall',
						},
						{
							image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=400&fit=crop',
							title: 'Marketing Website',
							tags: ['Web', 'Marketing'],
							size: 'wide',
						},
					]}
				/>

				<div className="text-center mt-10 @md:mt-14">
					<Button size="lg" asChild>
						<Link href="/portfolio">
							View Full Portfolio
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
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

interface PhotoItem {
	image: string;
	title: string;
	tags: string[];
	size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
}

const PhotoMasonry = ({ items }: { items: PhotoItem[] }) => {
	const getSizeClasses = (size: PhotoItem['size']) => {
		switch (size) {
			case 'large':
				return '@md:col-span-2 @md:row-span-2';
			case 'wide':
				return '@md:col-span-2';
			case 'tall':
				return '@md:row-span-2';
			case 'medium':
				return '';
			default:
				return '';
		}
	};

	const getAspect = (size: PhotoItem['size']) => {
		switch (size) {
			case 'large':
				return 'aspect-square';
			case 'wide':
				return 'aspect-[2/1]';
			case 'tall':
				return 'aspect-[3/4]';
			default:
				return 'aspect-[4/3]';
		}
	};

	return (
		<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4">
			{items.map((item, i) => (
				<div
					key={i}
					className={`relative group rounded-xl overflow-hidden ${getSizeClasses(item.size)}`}
				>
					<div className={`relative w-full h-full ${getAspect(item.size)}`}>
						<Image
							src={item.image}
							alt={item.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						{/* Overlay on hover */}
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end">
							<div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
								<h3 className="text-white font-bold mb-2">{item.title}</h3>
								<div className="flex flex-wrap gap-2">
									{item.tags.map((tag, j) => (
										<Badge
											key={j}
											className="bg-white/20 text-white text-xs"
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
