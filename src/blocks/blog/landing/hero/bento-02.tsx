import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Calendar,
	Clock,
	Play,
	Sparkles,
	Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @md:grid-cols-3 @xl:grid-cols-6 gap-4 auto-rows-[minmax(160px,auto)]">
					<MainCell
						title="Ideas That Shape Tomorrow"
						cta={{ label: 'Explore', href: '/explore' }}
						className="@md:col-span-2 @xl:col-span-3 @xl:row-span-2"
					/>
					<AuthorCell
						author={{
							name: 'Sarah Chen',
							avatar: 'https://i.pravatar.cc/100?img=40',
							initials: 'SC',
							articles: 127,
							label: 'Top Writer',
						}}
						className="@xl:col-span-2"
					/>
					<VideoCell
						title="Getting Started"
						duration="5:32"
						className="@xl:col-span-1"
					/>
					<PostCell
						post={{
							title: 'Modern CSS Techniques You Need to Know',
							image:
								'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
							date: 'Jan 28, 2026',
						}}
						className="@xl:col-span-2"
					/>
					<RatingCell rating={4.9} reviews={2340} className="@xl:col-span-1" />
				</div>
			</div>
		</section>
	);
}

interface MainCellProps {
	title: string;
	cta: { label: string; href: string };
	className?: string;
}

const MainCell = ({ title, cta, className }: MainCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-transparent border-primary/10 flex flex-col justify-end ${className}`}
	>
		<CardContent className="p-6 @md:p-8 @xl:p-10">
			<Badge className="mb-4" variant="secondary">
				<Sparkles className="size-3.5 mr-1.5" />
				Featured
			</Badge>
			<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h1>
			<Button size="lg" asChild className="gap-2">
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface Author {
	name: string;
	avatar: string;
	initials: string;
	articles: number;
	label: string;
}

interface AuthorCellProps {
	author: Author;
	className?: string;
}

const AuthorCell = ({ author, className }: AuthorCellProps) => (
	<Card
		className={`flex items-center transition-all hover:border-primary ${className}`}
	>
		<CardContent className="p-5 flex items-center gap-4 w-full">
			<Avatar className="size-14 ring-2 ring-primary/20">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<Badge variant="outline" className="text-[10px] px-1.5 py-0">
						<Star className="size-2.5 mr-0.5 fill-amber-500 text-amber-500" />
						{author.label}
					</Badge>
				</div>
				<p className="font-semibold truncate">{author.name}</p>
				<p className="text-xs text-muted-foreground">
					{author.articles} articles
				</p>
			</div>
		</CardContent>
	</Card>
);

interface VideoCellProps {
	title: string;
	duration: string;
	className?: string;
}

const VideoCell = ({ title, duration, className }: VideoCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-accent/20 to-card group cursor-pointer ${className}`}
	>
		<CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
			<div className="size-12 rounded-full bg-primary flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
				<Play className="size-5 text-primary-foreground ml-0.5" />
			</div>
			<p className="font-medium text-sm">{title}</p>
			<p className="text-xs text-muted-foreground">{duration}</p>
		</CardContent>
	</Card>
);

interface Post {
	title: string;
	image: string;
	date: string;
}

interface PostCellProps {
	post: Post;
	className?: string;
}

const PostCell = ({ post, className }: PostCellProps) => (
	<Card className={`group relative overflow-hidden py-0 ${className}`}>
		<Image
			src={post.image}
			alt={post.title}
			fill
			className="object-cover transition-transform group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
		<CardContent className="absolute bottom-0 left-0 right-0 p-4">
			<p className="text-xs text-white/70 flex items-center gap-1 mb-2">
				<Calendar className="size-3" />
				{post.date}
			</p>
			<h3 className="font-semibold text-white line-clamp-2">{post.title}</h3>
		</CardContent>
	</Card>
);

interface RatingCellProps {
	rating: number;
	reviews: number;
	className?: string;
}

const RatingCell = ({ rating, reviews, className }: RatingCellProps) => (
	<Card
		className={`flex flex-col items-center justify-center text-center ${className}`}
	>
		<CardContent className="p-5">
			<div className="flex gap-0.5 mb-2 justify-center">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`}
					/>
				))}
			</div>
			<p className="text-2xl font-bold">{rating}</p>
			<p className="text-xs text-muted-foreground">
				{reviews.toLocaleString()} reviews
			</p>
		</CardContent>
	</Card>
);
