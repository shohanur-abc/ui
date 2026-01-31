import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Calendar,
	Edit,
	Globe,
	Instagram,
	Link as LinkIcon,
	MapPin,
	Share2,
	Twitter,
	Youtube,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CreatorHeader = ({
	src,
	fallback,
	name,
	handle,
	bio,
	location,
	website,
	joinDate,
}: {
	src: string;
	fallback: string;
	name: string;
	handle: string;
	bio: string;
	location: string;
	website: string;
	joinDate: string;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-28 mx-auto ring-4 ring-border shadow-xl">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-3xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">@{handle}</p>
		</div>
		<p className="text-sm max-w-sm mx-auto">{bio}</p>
		<div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
			<div className="flex items-center gap-1">
				<MapPin className="size-4" />
				<span>{location}</span>
			</div>
			<div className="flex items-center gap-1">
				<LinkIcon className="size-4" />
				<a href={website} className="hover:text-foreground transition-colors">{website.replace('https://', '')}</a>
			</div>
			<div className="flex items-center gap-1">
				<Calendar className="size-4" />
				<span>Joined {joinDate}</span>
			</div>
		</div>
	</div>
);

const SocialStats = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex justify-center gap-8">
		{items.map((stat, i) => (
			<div key={i} className="text-center">
				<p className="text-2xl font-bold">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const SocialLinks = ({
	links,
}: {
	links: { icon: React.ElementType; label: string; href: string; color: string }[];
}) => (
	<div className="flex justify-center gap-3">
		{links.map((link, i) => (
			<a
				key={i}
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				className={`p-3 rounded-full ${link.color} hover:scale-110 transition-transform`}
				title={link.label}
			>
				<link.icon className="size-5" />
			</a>
		))}
	</div>
);

const FeaturedProducts = ({
	products,
}: {
	products: { image: string; name: string; price: string }[];
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h3 className="font-semibold">Featured Products</h3>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/shop">View All</Link>
			</Button>
		</div>
		<div className="grid grid-cols-3 gap-3">
			{products.map((product, i) => (
				<Link key={i} href={`/product/${i}`} className="group">
					<div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-2">
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-cover group-hover:scale-105 transition-transform"
						/>
					</div>
					<p className="text-xs font-medium truncate">{product.name}</p>
					<p className="text-xs text-muted-foreground">{product.price}</p>
				</Link>
			))}
		</div>
	</div>
);

const ActionButtons = () => (
	<div className="flex gap-3 justify-center">
		<Button className="gap-2 flex-1" asChild>
			<Link href="/profile/edit">
				<Edit className="size-4" />
				Edit Profile
			</Link>
		</Button>
		<Button variant="outline" size="icon">
			<Share2 className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
			fallback: 'ML',
			name: 'Mia Laurent',
			handle: 'mialaurent',
			bio: 'Fashion designer & lifestyle curator. Sharing my favorite finds and creating beautiful things.',
			location: 'Paris, France',
			website: 'https://mialaurent.co',
			joinDate: 'Oct 2021',
		},
		stats: [
			{ value: '24.5K', label: 'Followers' },
			{ value: '1.2K', label: 'Following' },
			{ value: '156', label: 'Products' },
		],
		socialLinks: [
			{ icon: Instagram, label: 'Instagram', href: '#', color: 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30' },
			{ icon: Twitter, label: 'Twitter', href: '#', color: 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30' },
			{ icon: Youtube, label: 'YouTube', href: '#', color: 'bg-red-500/20 text-red-500 hover:bg-red-500/30' },
			{ icon: Globe, label: 'Website', href: '#', color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
		],
		products: [
			{ image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300', name: 'Designer Bag', price: '$299' },
			{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300', name: 'Signature Scent', price: '$125' },
			{ image: 'https://images.unsplash.com/photo-1611923134239-b9be5b4d1b27?w=300', name: 'Silk Scarf', price: '$89' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6 space-y-6">
						<CreatorHeader {...profileData.header} />
						<Separator />
						<SocialStats items={profileData.stats} />
						<SocialLinks links={profileData.socialLinks} />
						<Separator />
						<FeaturedProducts products={profileData.products} />
						<ActionButtons />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
