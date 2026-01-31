import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Eye, Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="grid @xl:grid-cols-2">
				<FeaturedArticle
					category="AI & Machine Learning"
					title="The Complete Guide to Building AI-Powered Applications"
					excerpt="From concept to production: Learn how to integrate LLMs, build RAG systems, and deploy intelligent applications at scale."
					image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
					readTime="35 min"
					views="45.2K"
					hot={true}
				/>
				<SecondaryArticle
					category="Architecture"
					title="Microservices Done Right"
					excerpt="Avoid common pitfalls and build resilient distributed systems."
					image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200"
					readTime="20 min"
					views="28.1K"
				/>
			</div>
		</section>
	);
}

interface ArticleProps {
	category: string;
	title: string;
	excerpt: string;
	image: string;
	readTime: string;
	views: string;
	hot?: boolean;
}

const FeaturedArticle = ({
	category,
	title,
	excerpt,
	image,
	readTime,
	views,
	hot,
}: ArticleProps) => (
	<Link href="#" className="group relative block min-h-[50vh] @xl:min-h-[85vh]">
		<Image
			src={image}
			alt={title}
			fill
			className="object-cover transition-transform group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
		<div className="absolute inset-0 flex flex-col justify-end p-6 @md:p-10 @xl:p-16">
			<div className="flex items-center gap-3 mb-4">
				<Badge className="bg-primary text-primary-foreground border-0">
					{category}
				</Badge>
				{hot && (
					<Badge className="bg-destructive text-destructive-foreground border-0">
						<Flame className="size-3 mr-1" />
						Hot
					</Badge>
				)}
			</div>
			<h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold text-white mb-4 max-w-xl">
				{title}
			</h2>
			<p className="text-white/80 mb-6 max-w-lg line-clamp-2">{excerpt}</p>
			<div className="flex items-center gap-6 text-white/60 text-sm mb-6">
				<span className="flex items-center gap-1">
					<Clock className="size-4" />
					{readTime}
				</span>
				<span className="flex items-center gap-1">
					<Eye className="size-4" />
					{views} views
				</span>
			</div>
			<Button className="w-fit group-hover:translate-x-1 transition-transform">
				Read Article
				<ArrowRight className="size-4 ml-2" />
			</Button>
		</div>
	</Link>
);

const SecondaryArticle = ({
	category,
	title,
	excerpt,
	image,
	readTime,
	views,
}: ArticleProps) => (
	<Link href="#" className="group relative block min-h-[40vh] @xl:min-h-[85vh]">
		<Image
			src={image}
			alt={title}
			fill
			className="object-cover transition-transform group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
		<div className="absolute inset-0 flex flex-col justify-end p-6 @md:p-10 @xl:p-12">
			<Badge
				variant="secondary"
				className="w-fit mb-4 bg-white/20 text-white border-0 backdrop-blur-sm"
			>
				{category}
			</Badge>
			<h2 className="text-xl @md:text-2xl @xl:text-3xl font-bold text-white mb-3">
				{title}
			</h2>
			<p className="text-white/70 mb-4 line-clamp-2">{excerpt}</p>
			<div className="flex items-center gap-4 text-white/50 text-sm">
				<span className="flex items-center gap-1">
					<Clock className="size-4" />
					{readTime}
				</span>
				<span className="flex items-center gap-1">
					<Eye className="size-4" />
					{views}
				</span>
			</div>
		</div>
	</Link>
);
