import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, CheckCircle2, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-start">
					{/* Left - Sticky content */}
					<div className="@lg:sticky @lg:top-24">
						<Eyebrow icon={Rocket} text="Case Study" />
						<Title text="SaaS Analytics Platform" />
						<Description text="Complete redesign and development of a B2B analytics platform, improving user engagement by 65% and reducing churn by 40%." />

						<HighlightsList
							items={[
								'Real-time data visualization',
								'Custom dashboard builder',
								'Team collaboration features',
								'API integrations with 50+ tools',
								'White-label solutions',
							]}
						/>

						<TechStack
							items={['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS']}
						/>

						<div className="flex flex-wrap gap-3 mt-8">
							<Button className="gap-2" asChild>
								<Link href="#">
									View Live <ArrowUpRight className="size-4" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="#">Read Full Case Study</Link>
							</Button>
						</div>
					</div>

					{/* Right - Scrollable gallery */}
					<ImageGallery
						items={[
							{
								image: 'https://picsum.photos/seed/split2a/800/600',
								caption: 'Dashboard Overview',
							},
							{
								image: 'https://picsum.photos/seed/split2b/800/600',
								caption: 'Analytics Charts',
							},
							{
								image: 'https://picsum.photos/seed/split2c/800/600',
								caption: 'User Management',
							},
							{
								image: 'https://picsum.photos/seed/split2d/800/600',
								caption: 'Settings Panel',
							},
						]}
					/>
				</div>
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

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground mb-8 leading-relaxed">{text}</p>
);

const HighlightsList = ({ items }: { items: string[] }) => (
	<ul className="space-y-3 mb-6">
		{items.map((item, i) => (
			<li key={i} className="flex items-center gap-3 text-muted-foreground">
				<CheckCircle2 className="size-5 text-primary shrink-0" />
				<span>{item}</span>
			</li>
		))}
	</ul>
);

const TechStack = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-2">
		{items.map((tech, i) => (
			<Badge key={i} variant="secondary">
				{tech}
			</Badge>
		))}
	</div>
);

interface GalleryItem {
	image: string;
	caption: string;
}

const ImageGallery = ({ items }: { items: GalleryItem[] }) => (
	<div className="space-y-4 @md:space-y-6">
		{items.map(({ image, caption }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={image}
						alt={caption}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				</div>
				<CardContent className="py-4">
					<p className="text-sm text-muted-foreground">{caption}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
