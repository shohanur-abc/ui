import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[85vh]"
			data-theme="slate"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					title="Find Your Next Read"
					trendingSearches={[
						'React 20',
						'TypeScript',
						'AI',
						'Next.js',
						'Tailwind',
					]}
					recentAuthors={[
						{ name: 'Sarah', avatar: 'https://i.pravatar.cc/100?img=40' },
						{ name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=50' },
						{ name: 'Maria', avatar: 'https://i.pravatar.cc/100?img=60' },
						{ name: 'John', avatar: 'https://i.pravatar.cc/100?img=33' },
					]}
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
		<div className="absolute inset-0 bg-black/80" />
	</>
);

interface Author {
	name: string;
	avatar: string;
}

interface ContentProps {
	title: string;
	trendingSearches: string[];
	recentAuthors: Author[];
}

const Content = ({ title, trendingSearches, recentAuthors }: ContentProps) => (
	<div className="max-w-3xl mx-auto text-center">
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold text-white mb-10">
			{title}
		</h1>
		<form className="relative max-w-xl mx-auto mb-8">
			<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search articles, topics, authors..."
				className="pl-12 pr-24 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary rounded-full"
			/>
			<Button
				type="submit"
				className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full"
			>
				Search
			</Button>
		</form>
		<div className="mb-10">
			<div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-3">
				<TrendingUp className="size-4" />
				<span>Trending:</span>
			</div>
			<div className="flex flex-wrap justify-center gap-2">
				{trendingSearches.map((search) => (
					<Link key={search} href="#">
						<Badge
							variant="secondary"
							className="bg-white/10 text-white border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
						>
							{search}
						</Badge>
					</Link>
				))}
			</div>
		</div>
		<div>
			<p className="text-white/60 text-sm mb-4">Popular authors:</p>
			<div className="flex justify-center -space-x-2">
				{recentAuthors.map((author) => (
					<Avatar key={author.name} className="size-10 ring-2 ring-black">
						<AvatarImage src={author.avatar} alt={author.name} />
						<AvatarFallback>{author.name[0]}</AvatarFallback>
					</Avatar>
				))}
				<div className="size-10 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground ring-2 ring-black">
					+20
				</div>
			</div>
		</div>
	</div>
);
