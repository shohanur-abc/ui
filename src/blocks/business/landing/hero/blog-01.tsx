import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="slate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-4 mb-10 @md:mb-14">
					<div>
						<Eyebrow icon={Newspaper} text="Latest Insights" />
						<Title text="Stay Ahead of the Curve" />
						<Description text="Industry trends, best practices, and expert insights to help you make informed decisions." />
					</div>
					<Button variant="outline" className="gap-2 shrink-0" asChild>
						<Link href="#blog">
							View All Articles
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
				<ArticleGrid
					items={[
						{
							image:
								'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
							category: 'Industry Trends',
							title: 'The Future of Enterprise Software in 2024',
							excerpt:
								'Discover the key trends shaping how businesses operate and compete in the digital age.',
							author: 'Sarah Chen',
							date: 'Jan 15, 2024',
							readTime: '5 min read',
							featured: true,
						},
						{
							image:
								'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
							category: 'Case Study',
							title: 'How TechCorp Increased Revenue by 150%',
							excerpt:
								'A deep dive into the strategies that drove exceptional growth.',
							author: 'Mike Johnson',
							date: 'Jan 12, 2024',
							readTime: '8 min read',
							featured: false,
						},
						{
							image:
								'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
							category: 'Best Practices',
							title: 'Building a Data-Driven Culture',
							excerpt:
								'Steps to transform your organization with data analytics.',
							author: 'Emily Watson',
							date: 'Jan 10, 2024',
							readTime: '6 min read',
							featured: false,
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
	<Badge variant="outline" className="mb-4 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-xl leading-relaxed">
		{text}
	</p>
);

const ArticleGrid = ({
	items,
}: {
	items: {
		image: string;
		category: string;
		title: string;
		excerpt: string;
		author: string;
		date: string;
		readTime: string;
		featured: boolean;
	}[];
}) => (
	<div className="grid @xl:grid-cols-2 gap-6">
		{items.map(
			(
				{ image, category, title, excerpt, author, date, readTime, featured },
				i,
			) => (
				<article
					key={i}
					className={`group ${featured ? '@xl:row-span-2' : ''}`}
				>
					<Link href="#article" className="block h-full">
						<div
							className={`relative rounded-2xl overflow-hidden bg-card border border-border h-full hover:shadow-lg hover:border-primary/30 transition-all ${featured ? 'flex flex-col' : 'flex flex-col @sm:flex-row'}`}
						>
							<div
								className={`relative ${featured ? 'aspect-video' : 'aspect-video @sm:aspect-square @sm:w-48 shrink-0'}`}
							>
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover group-hover:scale-105 transition-transform"
								/>
							</div>
							<div
								className={`p-5 @md:p-6 flex flex-col ${featured ? 'flex-1' : ''}`}
							>
								<Badge variant="secondary" className="w-fit mb-3 text-xs">
									{category}
								</Badge>
								<h3
									className={`font-bold mb-2 group-hover:text-primary transition-colors ${featured ? 'text-xl @md:text-2xl' : 'text-lg'}`}
								>
									{title}
								</h3>
								<p
									className={`text-muted-foreground mb-4 ${featured ? '' : 'text-sm line-clamp-2'}`}
								>
									{excerpt}
								</p>
								<div className="flex items-center gap-4 mt-auto text-sm text-muted-foreground">
									<span className="flex items-center gap-1">
										<User className="size-3.5" />
										{author}
									</span>
									<span className="flex items-center gap-1">
										<Calendar className="size-3.5" />
										{date}
									</span>
									<span className="flex items-center gap-1">
										<Clock className="size-3.5" />
										{readTime}
									</span>
								</div>
							</div>
						</div>
					</Link>
				</article>
			),
		)}
	</div>
);
