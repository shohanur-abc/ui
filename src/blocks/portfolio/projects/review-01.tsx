import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Quote} text="Reviews" />
					<Title text="Client Feedback" />
					<Description text="Projects with testimonials from satisfied clients." />
				</div>

				<ReviewGrid
					items={[
						{
							image: 'https://picsum.photos/seed/rev1/800/500',
							title: 'CRM Implementation',
							clientName: 'Sarah Johnson',
							clientRole: 'CEO, TechCorp',
							clientAvatar: 'https://i.pravatar.cc/150?img=10',
							quote:
								'Exceptional work that exceeded our expectations. The team delivered a solution that transformed our sales process.',
							rating: 5,
							tags: ['React', 'Node.js'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/rev2/800/500',
							title: 'E-Commerce Redesign',
							clientName: 'Michael Chen',
							clientRole: 'Founder, ShopWave',
							clientAvatar: 'https://i.pravatar.cc/150?img=11',
							quote:
								'Our conversion rate increased by 45% after the redesign. Incredible attention to detail.',
							rating: 5,
							tags: ['Next.js', 'Shopify'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/rev3/800/500',
							title: 'Mobile App Launch',
							clientName: 'Emily Roberts',
							clientRole: 'Product Manager, HealthTech',
							clientAvatar: 'https://i.pravatar.cc/150?img=12',
							quote:
								'From concept to App Store in 4 months. The app is now used by thousands of patients daily.',
							rating: 5,
							tags: ['React Native', 'Firebase'],
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

interface ReviewItem {
	image: string;
	title: string;
	clientName: string;
	clientRole: string;
	clientAvatar: string;
	quote: string;
	rating: number;
	tags: string[];
	href: string;
}

const ReviewGrid = ({ items }: { items: ReviewItem[] }) => (
	<div className="grid @lg:grid-cols-3 gap-6">
		{items.map(
			(
				{
					image,
					title,
					clientName,
					clientRole,
					clientAvatar,
					quote,
					rating,
					tags,
					href,
				},
				i,
			) => (
				<Card
					key={i}
					className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
				>
					<Link href={href} className="block">
						<div className="relative aspect-video overflow-hidden">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
							<Button
								variant="secondary"
								size="icon-sm"
								className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<ArrowUpRight className="size-4" />
							</Button>
						</div>

						<CardContent className="p-5">
							{/* Rating */}
							<div className="flex gap-0.5 mb-3">
								{Array.from({ length: rating }).map((_, j) => (
									<Star
										key={j}
										className="size-4 text-yellow-500 fill-yellow-500"
									/>
								))}
							</div>

							<h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
								{title}
							</h3>

							{/* Quote */}
							<p className="text-sm text-muted-foreground italic mb-4 line-clamp-3">
								&ldquo;{quote}&rdquo;
							</p>

							{/* Client info */}
							<div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
								<div className="size-10 rounded-full overflow-hidden bg-muted">
									<Image
										src={clientAvatar}
										alt={clientName}
										width={40}
										height={40}
										className="object-cover"
									/>
								</div>
								<div>
									<p className="font-medium text-sm">{clientName}</p>
									<p className="text-xs text-muted-foreground">{clientRole}</p>
								</div>
							</div>

							{/* Tags */}
							<div className="flex flex-wrap gap-1.5">
								{tags.map((tag, j) => (
									<Badge key={j} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
						</CardContent>
					</Link>
				</Card>
			),
		)}
	</div>
);
