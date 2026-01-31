import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Play, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const TutorialGrid = ({
	tutorials,
}: {
	tutorials: {
		image: string;
		title: string;
		duration: string;
		level: string;
	}[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6">
		{tutorials.map((tutorial, i) => (
			<div key={i} className="group rounded-2xl border bg-card overflow-hidden">
				<div className="relative aspect-video overflow-hidden">
					<Image
						src={tutorial.image}
						alt={tutorial.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform"
					/>
					<div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
						<div className="size-14 rounded-full bg-primary flex items-center justify-center">
							<Play className="size-6 text-primary-foreground fill-current ml-1" />
						</div>
					</div>
					<Badge className="absolute top-3 left-3" variant="secondary">
						{tutorial.level}
					</Badge>
				</div>
				<div className="p-4 space-y-2">
					<h3 className="font-medium">{tutorial.title}</h3>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="size-4" />
						<span>{tutorial.duration}</span>
					</div>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={BookOpen} text="Style Tips" />
					<Title text="Learn to Style" highlight="Like a Pro" />
					<Description text="Watch our styling tutorials and learn expert tips to elevate your wardrobe. From basics to advanced techniques." />
				</div>
				<TutorialGrid
					tutorials={[
						{
							image:
								'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=225&fit=crop',
							title: '5 Ways to Style a White Shirt',
							duration: '8 min',
							level: 'Beginner',
						},
						{
							image:
								'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=225&fit=crop',
							title: 'Sneaker Styling 101',
							duration: '12 min',
							level: 'Intermediate',
						},
						{
							image:
								'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=225&fit=crop',
							title: 'Accessory Layering',
							duration: '15 min',
							level: 'Advanced',
						},
					]}
				/>
				<CTA label="View All Tutorials" href="/tutorials" />
			</div>
		</section>
	);
}
