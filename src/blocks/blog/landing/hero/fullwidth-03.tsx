import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[85vh]"
			data-theme="emerald"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					category="Featured Article"
					title="Building Production-Ready React Applications in 2026"
					excerpt="A comprehensive guide covering architecture patterns, performance optimization, testing strategies, and deployment best practices for enterprise applications."
					author={{
						name: 'Sarah Chen',
						avatar: 'https://i.pravatar.cc/100?img=40',
					}}
					readTime="25 min read"
					videoAvailable={true}
				/>
			</div>
		</section>
	);
}

interface BackgroundImageProps {
	src: string;
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
	<>
		<Image src={src} alt="Background" fill className="object-cover" priority />
		<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
	</>
);

interface Author {
	name: string;
	avatar: string;
}

interface ContentProps {
	category: string;
	title: string;
	excerpt: string;
	author: Author;
	readTime: string;
	videoAvailable: boolean;
}

const Content = ({
	category,
	title,
	excerpt,
	author,
	readTime,
	videoAvailable,
}: ContentProps) => (
	<div className="max-w-4xl mx-auto text-center">
		<Badge className="mb-6 bg-primary text-primary-foreground border-0">
			{category}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold text-white mb-6 leading-tight">
			{title}
		</h1>
		<p className="text-lg @md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
			{excerpt}
		</p>
		<div className="flex items-center justify-center gap-6 mb-10">
			<div className="flex items-center gap-3">
				<Image
					src={author.avatar}
					alt={author.name}
					width={40}
					height={40}
					className="rounded-full ring-2 ring-white/20"
				/>
				<span className="text-white font-medium">{author.name}</span>
			</div>
			<span className="text-white/50">•</span>
			<span className="text-white/70 flex items-center gap-1">
				<Clock className="size-4" />
				{readTime}
			</span>
		</div>
		<div className="flex flex-col @sm:flex-row gap-4 justify-center">
			<Button asChild size="lg" className="text-base px-8">
				<Link href="#">
					<BookOpen className="size-4 mr-2" />
					Read Article
				</Link>
			</Button>
			{videoAvailable && (
				<Button
					asChild
					size="lg"
					variant="outline"
					className="text-base px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
				>
					<Link href="#">
						<Play className="size-4 mr-2" />
						Watch Video
					</Link>
				</Button>
			)}
		</div>
	</div>
);
