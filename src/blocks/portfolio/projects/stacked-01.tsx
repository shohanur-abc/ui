import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Layers} text="Case Studies" />
					<Title text="In-Depth Projects" />
					<Description text="Detailed case studies with problem-solving approaches and results." />
				</div>

				<StackedCards
					items={[
						{
							image: 'https://picsum.photos/seed/stack1/1000/600',
							title: 'Healthcare Platform Redesign',
							client: 'MedTech Solutions',
							challenge: 'Legacy system modernization for 500K+ users.',
							result: '60% improvement in user satisfaction scores.',
							tags: ['UX Research', 'React', 'PostgreSQL'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stack2/1000/600',
							title: 'Fintech Mobile Application',
							client: 'PayFlow Inc.',
							challenge: 'Building trust through transparent financial UX.',
							result: '3x increase in monthly active users.',
							tags: ['React Native', 'Node.js', 'Stripe'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stack3/1000/600',
							title: 'E-Learning Platform',
							client: 'EduTech Global',
							challenge: 'Scaling interactive content delivery.',
							result: '100K+ students enrolled in first quarter.',
							tags: ['Next.js', 'AWS', 'Video Streaming'],
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

interface StackedItem {
	image: string;
	title: string;
	client: string;
	challenge: string;
	result: string;
	tags: string[];
	href: string;
}

const StackedCards = ({ items }: { items: StackedItem[] }) => (
	<div className="space-y-6 @md:space-y-8">
		{items.map(({ image, title, client, challenge, result, tags, href }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<div className="grid @lg:grid-cols-2">
					{/* Image */}
					<div className="relative aspect-video @lg:aspect-auto @lg:min-h-[350px] overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 hidden @lg:block" />
					</div>

					{/* Content */}
					<CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
						<Badge variant="secondary" className="w-fit mb-4">
							{client}
						</Badge>
						<h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-4">
							{title}
						</h3>

						<div className="space-y-4 mb-6">
							<div>
								<p className="text-sm text-muted-foreground mb-1">Challenge</p>
								<p className="text-foreground">{challenge}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">Result</p>
								<p className="text-primary font-medium">{result}</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-2 mb-6">
							{tags.map((tag, j) => (
								<Badge key={j} variant="outline">
									{tag}
								</Badge>
							))}
						</div>

						<div className="flex gap-3">
							<Button className="gap-2" asChild>
								<Link href={href}>
									Read Case Study <ArrowUpRight className="size-4" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</div>
			</Card>
		))}

		{/* Navigation */}
		<div className="flex justify-center gap-4 pt-4">
			<Button variant="outline" size="icon">
				<ArrowLeft className="size-4" />
			</Button>
			<Button variant="outline" size="icon">
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);
