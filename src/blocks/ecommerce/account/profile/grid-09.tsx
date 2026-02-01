import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Book,
	BookOpen,
	Bookmark,
	Calendar,
	CheckCircle2,
	ChevronRight,
	Clock,
	Coffee,
	GraduationCap,
	Heart,
	Library,
	MessageSquare,
	Mic,
	Music2,
	Pause,
	Play,
	Plus,
	Star,
	Timer,
	TrendingUp,
	Volume2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ReaderProfileCard = ({
	src,
	fallback,
	name,
	readingGoal,
	booksRead,
	memberSince,
}: {
	src: string;
	fallback: string;
	name: string;
	readingGoal: { current: number; target: number };
	booksRead: number;
	memberSince: string;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between mb-4">
				<Avatar className="size-20 ring-4 ring-amber-500/30">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<Badge className="bg-amber-500/20 text-amber-600">Bookworm</Badge>
			</div>
			<div className="flex-1">
				<h1 className="text-xl font-bold">{name}</h1>
				<p className="text-sm text-muted-foreground">
					Member since {memberSince}
				</p>
				<div className="mt-4">
					<div className="flex items-center justify-between text-sm mb-2">
						<span>2024 Reading Challenge</span>
						<span className="font-medium">
							{readingGoal.current}/{readingGoal.target} books
						</span>
					</div>
					<Progress
						value={(readingGoal.current / readingGoal.target) * 100}
						className="h-3"
					/>
				</div>
				<div className="flex items-center gap-4 mt-4 text-sm">
					<div>
						<p className="text-2xl font-bold">{booksRead}</p>
						<p className="text-muted-foreground">Books read</p>
					</div>
				</div>
			</div>
			<Button className="w-full mt-4 gap-2">
				<Plus className="size-4" />
				Add Book
			</Button>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<Icon className={`size-6 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

const CurrentlyReadingCard = ({
	book,
}: {
	book: {
		title: string;
		author: string;
		cover: string;
		progress: number;
		currentPage: number;
		totalPages: number;
	};
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<BookOpen className="size-5 text-blue-500" />
				Currently Reading
			</h3>
		</CardHeader>
		<CardContent>
			<div className="flex gap-4">
				<div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0">
					<Image
						src={book.cover}
						alt={book.title}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex-1">
					<p className="font-medium line-clamp-2">{book.title}</p>
					<p className="text-sm text-muted-foreground">{book.author}</p>
					<div className="mt-3">
						<div className="flex items-center justify-between text-xs mb-1">
							<span>Page {book.currentPage}</span>
							<span className="text-muted-foreground">
								{book.totalPages} pages
							</span>
						</div>
						<Progress value={book.progress} className="h-2" />
					</div>
					<Button size="sm" variant="outline" className="mt-3 gap-1">
						<Play className="size-3" />
						Continue
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RecentActivityCard = ({
	activities,
}: {
	activities: {
		type: string;
		book: string;
		date: string;
		icon: React.ElementType;
	}[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Activity</h3>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{activities.map((activity, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-muted">
						<activity.icon className="size-4 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm truncate">
							{activity.type}{' '}
							<span className="font-medium">{activity.book}</span>
						</p>
						<p className="text-xs text-muted-foreground">{activity.date}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const BookshelfCard = ({
	shelves,
}: {
	shelves: { name: string; count: number; icon: React.ElementType }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Library className="size-5" />
					My Shelves
				</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{shelves.map((shelf, i) => (
				<Link
					key={i}
					href="#"
					className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div className="flex items-center gap-2">
						<shelf.icon className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">{shelf.name}</span>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary">{shelf.count}</Badge>
						<ChevronRight className="size-4 text-muted-foreground" />
					</div>
				</Link>
			))}
		</CardContent>
	</Card>
);

const GenreCard = ({
	name,
	count,
	percentage,
	color,
}: {
	name: string;
	count: number;
	percentage: number;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="font-medium text-sm">{name}</span>
				<span className="text-xs text-muted-foreground">{count} books</span>
			</div>
			<div className="h-2 rounded-full bg-muted overflow-hidden">
				<div
					className={`h-full rounded-full ${color}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</CardContent>
	</Card>
);

const ReviewCard = ({
	book,
	rating,
	review,
	date,
}: {
	book: string;
	rating: number;
	review: string;
	date: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-1 mb-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < rating ? 'fill-amber-500 text-amber-500' : 'text-muted'}`}
					/>
				))}
			</div>
			<p className="font-medium text-sm">{book}</p>
			<p className="text-xs text-muted-foreground line-clamp-2 mt-1">
				{review}
			</p>
			<p className="text-xs text-muted-foreground mt-2">{date}</p>
		</CardContent>
	</Card>
);

const ReadingStatsCard = ({
	stats,
}: {
	stats: { label: string; value: string; icon: React.ElementType }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<TrendingUp className="size-5" />
				Reading Stats
			</h3>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-3 gap-4">
				{stats.map((stat, i) => (
					<div key={i} className="text-center">
						<stat.icon className="size-5 text-muted-foreground mx-auto mb-1" />
						<p className="text-xl font-bold">{stat.value}</p>
						<p className="text-xs text-muted-foreground">{stat.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const AudiobookCard = ({
	title,
	author,
	cover,
	progress,
	duration,
}: {
	title: string;
	author: string;
	cover: string;
	progress: number;
	duration: string;
}) => (
	<Card className="col-span-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<Volume2 className="size-5 text-blue-500" />
				<span className="font-semibold">Now Playing</span>
			</div>
			<div className="flex gap-4">
				<div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
					<Image src={cover} alt={title} fill className="object-cover" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{title}</p>
					<p className="text-sm text-muted-foreground">{author}</p>
					<div className="flex items-center gap-2 mt-2">
						<Progress value={progress} className="flex-1 h-1.5" />
						<span className="text-xs text-muted-foreground">{duration}</span>
					</div>
				</div>
				<Button size="icon" variant="secondary" className="rounded-full">
					<Pause className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
			fallback: 'EM',
			name: 'Emily Morgan',
			readingGoal: { current: 12, target: 24 },
			booksRead: 156,
			memberSince: '2020',
		},
		stats: [
			{ icon: Book, label: 'To Read', value: '47', color: 'text-blue-500' },
			{ icon: Star, label: 'Reviews', value: '89', color: 'text-amber-500' },
			{ icon: Heart, label: 'Favorites', value: '32', color: 'text-red-500' },
			{ icon: Clock, label: 'Avg/Book', value: '6d', color: 'text-green-500' },
		],
		currentBook: {
			title: 'The Midnight Library',
			author: 'Matt Haig',
			cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200',
			progress: 68,
			currentPage: 224,
			totalPages: 330,
		},
		activities: [
			{
				type: 'Finished',
				book: 'Atomic Habits',
				date: '2 days ago',
				icon: CheckCircle2,
			},
			{
				type: 'Started',
				book: 'The Midnight Library',
				date: '3 days ago',
				icon: BookOpen,
			},
			{
				type: 'Reviewed',
				book: 'Project Hail Mary',
				date: '1 week ago',
				icon: Star,
			},
		],
		shelves: [
			{ name: 'Currently Reading', count: 3, icon: BookOpen },
			{ name: 'Want to Read', count: 47, icon: Bookmark },
			{ name: 'Read', count: 156, icon: CheckCircle2 },
			{ name: 'Favorites', count: 32, icon: Heart },
		],
		genres: [
			{ name: 'Fiction', count: 52, percentage: 85, color: 'bg-blue-500' },
			{ name: 'Sci-Fi', count: 38, percentage: 65, color: 'bg-purple-500' },
			{ name: 'Non-fiction', count: 28, percentage: 45, color: 'bg-green-500' },
			{ name: 'Fantasy', count: 24, percentage: 40, color: 'bg-amber-500' },
		],
		reviews: [
			{
				book: 'Project Hail Mary',
				rating: 5,
				review:
					'An incredible journey through space. Andy Weir delivers another masterpiece...',
				date: 'Jan 28, 2024',
			},
			{
				book: 'Atomic Habits',
				rating: 4,
				review:
					'Practical advice for building good habits. Changed my daily routines...',
				date: 'Jan 25, 2024',
			},
		],
		readingStats: [
			{ label: 'Pages/Day', value: '42', icon: Book },
			{ label: 'Reading Streak', value: '28', icon: Award },
			{ label: 'Avg Rating', value: '4.2', icon: Star },
		],
		audiobook: {
			title: 'Dune',
			author: 'Frank Herbert',
			cover:
				'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200',
			progress: 34,
			duration: '12:45:32',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<ReaderProfileCard {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<CurrentlyReadingCard book={profileData.currentBook} />
					<AudiobookCard {...profileData.audiobook} />
					<BookshelfCard shelves={profileData.shelves} />
					{profileData.genres.map((genre, i) => (
						<GenreCard key={i} {...genre} />
					))}
					<RecentActivityCard activities={profileData.activities} />
					{profileData.reviews.map((review, i) => (
						<ReviewCard key={i} {...review} />
					))}
					<ReadingStatsCard stats={profileData.readingStats} />
				</div>
			</div>
		</section>
	);
}
