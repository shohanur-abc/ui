import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	BookOpen,
	Calendar,
	Edit,
	Facebook,
	Instagram,
	Link2,
	Linkedin,
	MessageCircle,
	Share2,
	Twitter,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CreatorProfile = ({
	src,
	fallback,
	name,
	username,
	bio,
	verified,
	followers,
	following,
}: {
	src: string;
	fallback: string;
	name: string;
	username: string;
	bio: string;
	verified: boolean;
	followers: string;
	following: string;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-28 mx-auto ring-4 ring-primary/20">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-3xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<div className="flex items-center justify-center gap-2">
				<h2 className="text-xl font-bold">{name}</h2>
				{verified && (
					<Badge className="bg-blue-500 text-white border-0">✓</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">@{username}</p>
		</div>
		<p className="text-sm text-muted-foreground max-w-xs mx-auto">{bio}</p>
		<div className="flex justify-center gap-8">
			<div className="text-center">
				<p className="text-lg font-bold">{followers}</p>
				<p className="text-xs text-muted-foreground">Followers</p>
			</div>
			<div className="text-center">
				<p className="text-lg font-bold">{following}</p>
				<p className="text-xs text-muted-foreground">Following</p>
			</div>
		</div>
		<div className="flex gap-2 justify-center">
			<Button size="sm" className="gap-2">
				<Users className="size-4" />
				Follow
			</Button>
			<Button size="sm" variant="outline" className="gap-2">
				<MessageCircle className="size-4" />
				Message
			</Button>
		</div>
	</div>
);

const SocialLinks = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; href: string; color: string }[];
}) => (
	<div className="flex justify-center gap-2">
		{items.map((social, i) => (
			<Button
				key={i}
				variant="outline"
				size="icon"
				className={`rounded-full hover:${social.color}`}
				asChild
			>
				<Link href={social.href}>
					<social.icon className="size-4" />
				</Link>
			</Button>
		))}
	</div>
);

const CollectionGrid = ({
	title,
	items,
}: {
	title: string;
	items: { image: string; name: string; items: number }[];
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h3 className="font-medium">{title}</h3>
			<Button variant="ghost" size="sm" className="gap-1 text-xs">
				View All <ArrowRight className="size-3" />
			</Button>
		</div>
		<div className="grid grid-cols-2 gap-3">
			{items.map((collection, i) => (
				<Link
					key={i}
					href="#"
					className="group relative aspect-square rounded-xl overflow-hidden"
				>
					<Image
						src={collection.image}
						alt={collection.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
					<div className="absolute bottom-0 left-0 right-0 p-3">
						<p className="text-white font-medium text-sm">{collection.name}</p>
						<p className="text-white/70 text-xs">{collection.items} items</p>
					</div>
				</Link>
			))}
		</div>
	</div>
);

const RecentPosts = ({
	items,
}: {
	items: { image: string; title: string; likes: string; date: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="font-medium">Recent Posts</h3>
		<div className="space-y-3">
			{items.map((post, i) => (
				<Link
					key={i}
					href="#"
					className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div className="size-16 relative rounded-lg overflow-hidden shrink-0 bg-muted">
						<Image src={post.image} alt={post.title} fill className="object-cover" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm line-clamp-2">{post.title}</p>
						<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
							<span>❤️ {post.likes}</span>
							<span>{post.date}</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
			fallback: 'MR',
			name: 'Maya Roberts',
			username: 'mayastyle',
			bio: 'Fashion creator & lifestyle blogger. Sharing my favorite finds and style inspiration ✨',
			verified: true,
			followers: '24.5K',
			following: '892',
		},
		socials: [
			{ icon: Instagram, label: 'Instagram', href: '#', color: 'text-pink-500' },
			{ icon: Twitter, label: 'Twitter', href: '#', color: 'text-blue-400' },
			{ icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-blue-600' },
			{ icon: Link2, label: 'Website', href: '#', color: 'text-foreground' },
		],
		collections: [
			{ image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', name: 'Summer Vibes', items: 24 },
			{ image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', name: 'Minimalist', items: 18 },
			{ image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', name: 'Workwear', items: 32 },
			{ image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', name: 'Weekend', items: 15 },
		],
		posts: [
			{ image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200', title: 'My Top 10 Spring Essentials for 2026', likes: '2.4K', date: '2d ago' },
			{ image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200', title: 'How I Style One Dress 5 Ways', likes: '1.8K', date: '5d ago' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[280px_1fr] gap-8">
							<div className="space-y-6">
								<CreatorProfile {...profileData.profile} />
								<SocialLinks items={profileData.socials} />
							</div>
							<div className="space-y-6">
								<CollectionGrid title="My Collections" items={profileData.collections} />
								<Separator />
								<RecentPosts items={profileData.posts} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
