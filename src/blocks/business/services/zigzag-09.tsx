import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Users } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="What We Offer" />
					<Title text="Engagement Models" />
					<Description text="Flexible partnership options designed to meet your unique needs and budget." />
				</div>

				<EngagementZigzag
					items={[
						{
							image: 'https://picsum.photos/seed/eng1/800/600',
							title: 'Project-Based',
							description:
								'Fixed-scope projects with clear deliverables and timelines. Ideal for well-defined initiatives with specific goals.',
							rating: 4.9,
							clients: 150,
							features: [
								'Fixed price',
								'Defined scope',
								'Clear timeline',
								'Milestone payments',
							],
							ctaHref: '/contact?model=project',
						},
						{
							image: 'https://picsum.photos/seed/eng2/800/600',
							title: 'Dedicated Team',
							description:
								'Your own team of experts working exclusively on your projects. Scale up or down as needed.',
							rating: 4.8,
							clients: 75,
							features: [
								'Dedicated resources',
								'Flexible scaling',
								'Deep integration',
								'Long-term partnership',
							],
							ctaHref: '/contact?model=team',
						},
						{
							image: 'https://picsum.photos/seed/eng3/800/600',
							title: 'Staff Augmentation',
							description:
								'Add skilled professionals to your existing team. Fill skill gaps quickly without long-term commitment.',
							rating: 4.9,
							clients: 200,
							features: [
								'Quick onboarding',
								'Your management',
								'Flexible duration',
								'Cost effective',
							],
							ctaHref: '/contact?model=staff',
						},
					]}
				/>
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

interface EngagementItem {
	image: string;
	title: string;
	description: string;
	rating: number;
	clients: number;
	features: string[];
	ctaHref: string;
}

const EngagementZigzag = ({ items }: { items: EngagementItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			(
				{ image, title, description, rating, clients, features, ctaHref },
				i,
			) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-2">
							{title}
						</h3>
						<div className="flex items-center gap-4 mb-4">
							<div className="flex items-center gap-1">
								<Star className="size-4 fill-primary text-primary" />
								<span className="font-medium">{rating}</span>
							</div>
							<div className="flex items-center gap-1 text-muted-foreground">
								<Users className="size-4" />
								<span className="text-sm">{clients}+ clients</span>
							</div>
						</div>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>

						<div className="grid grid-cols-2 gap-3 mb-6">
							{features.map((feature, j) => (
								<div key={j} className="flex items-center gap-2 text-sm">
									<div className="size-1.5 rounded-full bg-primary shrink-0" />
									{feature}
								</div>
							))}
						</div>

						<Button asChild>
							<Link href={ctaHref}>
								Get Started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					<div
						className={`relative aspect-4/3 rounded-2xl overflow-hidden ${
							i % 2 === 1 ? '@xl:order-1' : ''
						}`}
					>
						<Image src={image} alt={title} fill className="object-cover" />
					</div>
				</div>
			),
		)}
	</div>
);
