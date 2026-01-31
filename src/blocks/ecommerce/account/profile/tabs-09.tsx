import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Bookmark,
	Calendar,
	Clock,
	ExternalLink,
	Eye,
	Github,
	Globe,
	Heart,
	Link2,
	Linkedin,
	MapPin,
	MessageSquare,
	PenTool,
	Play,
	Share2,
	Star,
	Twitter,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CreatorHeader = ({
	src,
	fallback,
	name,
	username,
	bio,
	followers,
	following,
	likes,
}: {
	src: string;
	fallback: string;
	name: string;
	username: string;
	bio: string;
	followers: string;
	following: string;
	likes: string;
}) => (
	<div className="text-center pb-6">
		<Avatar className="size-28 mx-auto ring-4 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-3xl">{fallback}</AvatarFallback>
		</Avatar>
		<h1 className="text-2xl font-bold mt-4">{name}</h1>
		<p className="text-muted-foreground">@{username}</p>
		<p className="text-sm max-w-md mx-auto mt-2">{bio}</p>
		<div className="flex items-center justify-center gap-6 mt-4">
			<div className="text-center">
				<p className="text-xl font-bold">{followers}</p>
				<p className="text-sm text-muted-foreground">Followers</p>
			</div>
			<div className="text-center">
				<p className="text-xl font-bold">{following}</p>
				<p className="text-sm text-muted-foreground">Following</p>
			</div>
			<div className="text-center">
				<p className="text-xl font-bold">{likes}</p>
				<p className="text-sm text-muted-foreground">Likes</p>
			</div>
		</div>
		<div className="flex items-center justify-center gap-2 mt-4">
			<Button>Follow</Button>
			<Button variant="outline" size="icon">
				<MessageSquare className="size-4" />
			</Button>
			<Button variant="outline" size="icon">
				<Share2 className="size-4" />
			</Button>
		</div>
	</div>
);

const PostsTab = ({
	posts,
}: {
	posts: { image: string; title: string; likes: number; comments: number; date: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{posts.map((post, i) => (
			<Card key={i} className="overflow-hidden group cursor-pointer">
				<div className="relative aspect-square">
					<Image src={post.image} alt={post.title} fill className="object-cover" />
					<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
						<div className="flex items-center gap-1">
							<Heart className="size-5" />
							{post.likes}
						</div>
						<div className="flex items-center gap-1">
							<MessageSquare className="size-5" />
							{post.comments}
						</div>
					</div>
				</div>
			</Card>
		))}
	</div>
);

const VideosTab = ({
	videos,
}: {
	videos: { thumbnail: string; title: string; views: string; duration: string; date: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{videos.map((video, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="relative aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer">
						<Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
						<div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<Button size="icon" className="rounded-full size-12">
								<Play className="size-6" />
							</Button>
						</div>
						<Badge className="absolute bottom-2 right-2 bg-black/70">{video.duration}</Badge>
					</div>
					<h4 className="font-medium mt-3 line-clamp-2">{video.title}</h4>
					<div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
						<Eye className="size-4" />
						{video.views} views
						<span>•</span>
						{video.date}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const ArticlesTab = ({
	articles,
}: {
	articles: { image: string; title: string; excerpt: string; readTime: string; date: string; tags: string[] }[];
}) => (
	<div className="space-y-4">
		{articles.map((article, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex flex-col @md:flex-row gap-4">
						<div className="relative w-full @md:w-48 aspect-video rounded-lg overflow-hidden bg-muted shrink-0">
							<Image src={article.image} alt={article.title} fill className="object-cover" />
						</div>
						<div className="flex-1">
							<h4 className="font-semibold line-clamp-2">{article.title}</h4>
							<p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
							<div className="flex flex-wrap gap-2 mt-2">
								{article.tags.map((tag, j) => (
									<Badge key={j} variant="secondary">{tag}</Badge>
								))}
							</div>
							<div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
								<Clock className="size-4" />
								{article.readTime} read
								<span>•</span>
								{article.date}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const SavedTab = ({
	saved,
}: {
	saved: { type: 'post' | 'video' | 'article'; image: string; title: string; author: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{saved.map((item, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
						<Image src={item.image} alt={item.title} fill className="object-cover" />
						<Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80">
							<Bookmark className="size-4 fill-current" />
						</Button>
					</div>
					<Badge variant="secondary" className="mt-3">{item.type}</Badge>
					<h4 className="font-medium mt-2 line-clamp-2">{item.title}</h4>
					<p className="text-sm text-muted-foreground mt-1">by {item.author}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const AboutTab = ({
	about,
}: {
	about: { bio: string; location: string; website: string; joined: string; socials: { icon: React.ElementType; label: string; href: string }[] };
}) => (
	<Card>
		<CardContent className="p-6 space-y-6">
			<div>
				<h3 className="font-semibold mb-2">About</h3>
				<p className="text-muted-foreground">{about.bio}</p>
			</div>
			<div className="space-y-3">
				<div className="flex items-center gap-3 text-sm">
					<MapPin className="size-4 text-muted-foreground" />
					{about.location}
				</div>
				<div className="flex items-center gap-3 text-sm">
					<Globe className="size-4 text-muted-foreground" />
					<a href={about.website} className="text-primary hover:underline">{about.website}</a>
				</div>
				<div className="flex items-center gap-3 text-sm">
					<Calendar className="size-4 text-muted-foreground" />
					Joined {about.joined}
				</div>
			</div>
			<div>
				<h3 className="font-semibold mb-3">Social Links</h3>
				<div className="flex flex-wrap gap-2">
					{about.socials.map((social, i) => (
						<Button key={i} variant="outline" size="sm" asChild>
							<a href={social.href}>
								<social.icon className="size-4 mr-2" />
								{social.label}
							</a>
						</Button>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
			fallback: 'SL',
			name: 'Sophia Laurent',
			username: 'sophialaurent',
			bio: 'Digital creator | Photography enthusiast | Sharing my creative journey ✨',
			followers: '128K',
			following: '892',
			likes: '2.4M',
		},
		posts: [
			{ image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300', title: 'Sunset vibes', likes: 4521, comments: 234, date: '2 days ago' },
			{ image: 'https://images.unsplash.com/photo-1682687221038-404670f01d03?w=300', title: 'City lights', likes: 3892, comments: 156, date: '5 days ago' },
			{ image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300', title: 'Morning coffee', likes: 5123, comments: 312, date: '1 week ago' },
			{ image: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=300', title: 'Travel mood', likes: 6234, comments: 428, date: '2 weeks ago' },
			{ image: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=300', title: 'Fashion week', likes: 7891, comments: 521, date: '3 weeks ago' },
			{ image: 'https://images.unsplash.com/photo-1682686580003-22d3d65399a8?w=300', title: 'Studio session', likes: 4123, comments: 189, date: '1 month ago' },
		],
		videos: [
			{ thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400', title: 'Day in my life as a content creator', views: '245K', duration: '12:34', date: '3 days ago' },
			{ thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', title: 'Photography tips for beginners', views: '189K', duration: '18:45', date: '1 week ago' },
			{ thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', title: 'Travel vlog: Iceland adventure', views: '312K', duration: '24:12', date: '2 weeks ago' },
		],
		articles: [
			{ image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300', title: 'How I Built My Personal Brand from Scratch', excerpt: 'A comprehensive guide on building your personal brand in the digital age...', readTime: '8 min', date: 'Jan 15, 2024', tags: ['Personal Branding', 'Career'] },
			{ image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=300', title: '10 Photography Tips That Changed My Game', excerpt: 'These simple photography techniques will elevate your content...', readTime: '5 min', date: 'Jan 8, 2024', tags: ['Photography', 'Tips'] },
		],
		saved: [
			{ type: 'post' as const, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300', title: 'Amazing sunset photography', author: 'John Smith' },
			{ type: 'video' as const, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300', title: 'Camera settings explained', author: 'Tech Reviews' },
			{ type: 'article' as const, image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300', title: 'Creative workflow tips', author: 'Design Weekly' },
		],
		about: {
			bio: 'Hi! I\'m Sophia, a digital creator and photography enthusiast based in Los Angeles. I love capturing beautiful moments and sharing my creative journey with the world. When I\'m not behind the camera, you can find me exploring new coffee shops or planning my next adventure.',
			location: 'Los Angeles, CA',
			website: 'sophialaurent.com',
			joined: 'March 2020',
			socials: [
				{ icon: Twitter, label: 'Twitter', href: '#' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Github, label: 'GitHub', href: '#' },
			],
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<CreatorHeader {...profileData.header} />
				<Tabs defaultValue="posts" className="mt-8">
					<TabsList className="w-full justify-center">
						<TabsTrigger value="posts">Posts</TabsTrigger>
						<TabsTrigger value="videos">Videos</TabsTrigger>
						<TabsTrigger value="articles">Articles</TabsTrigger>
						<TabsTrigger value="saved">Saved</TabsTrigger>
						<TabsTrigger value="about">About</TabsTrigger>
					</TabsList>
					<TabsContent value="posts" className="mt-6">
						<PostsTab posts={profileData.posts} />
					</TabsContent>
					<TabsContent value="videos" className="mt-6">
						<VideosTab videos={profileData.videos} />
					</TabsContent>
					<TabsContent value="articles" className="mt-6">
						<ArticlesTab articles={profileData.articles} />
					</TabsContent>
					<TabsContent value="saved" className="mt-6">
						<SavedTab saved={profileData.saved} />
					</TabsContent>
					<TabsContent value="about" className="mt-6">
						<AboutTab about={profileData.about} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
