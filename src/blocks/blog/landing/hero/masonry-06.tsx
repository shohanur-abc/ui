import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Meet Our Writers"
					description="Talented authors sharing their expertise"
				/>
				<MasonryGrid
					authors={[
						{
							name: 'Sarah Chen',
							role: 'React Expert',
							avatar: 'https://i.pravatar.cc/200?img=40',
							articles: 127,
							followers: '12.5K',
							bio: 'Building beautiful UIs at scale. Previously at Meta.',
							featured: true,
						},
						{
							name: 'Alex Kim',
							role: 'Full Stack',
							avatar: 'https://i.pravatar.cc/200?img=50',
							articles: 89,
							followers: '8.2K',
							bio: 'Node.js and TypeScript enthusiast.',
							featured: false,
						},
						{
							name: 'Maria Johnson',
							role: 'Designer',
							avatar: 'https://i.pravatar.cc/200?img=60',
							articles: 64,
							followers: '6.8K',
							bio: 'Design systems and CSS architecture.',
							featured: false,
						},
						{
							name: 'John Smith',
							role: 'DevOps',
							avatar: 'https://i.pravatar.cc/200?img=33',
							articles: 52,
							followers: '5.1K',
							bio: 'Cloud infrastructure and automation.',
							featured: true,
						},
						{
							name: 'Emily Davis',
							role: 'Backend',
							avatar: 'https://i.pravatar.cc/200?img=25',
							articles: 45,
							followers: '4.3K',
							bio: 'API design and database optimization.',
							featured: false,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="text-center mb-10">
		<Badge variant="secondary" className="mb-4">
			<Users className="size-3.5 mr-1.5" />
			Authors
		</Badge>
		<h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

interface Author {
	name: string;
	role: string;
	avatar: string;
	articles: number;
	followers: string;
	bio: string;
	featured: boolean;
}

interface MasonryGridProps {
	authors: Author[];
}

const MasonryGrid = ({ authors }: MasonryGridProps) => (
	<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
		{authors.map((author) => (
			<Link key={author.name} href="#" className="block break-inside-avoid">
				<Card
					className={`group transition-all hover:border-primary hover:shadow-lg ${author.featured ? 'bg-gradient-to-br from-primary/5 to-card' : ''}`}
				>
					<CardContent className={`${author.featured ? 'p-6' : 'p-5'}`}>
						<div className="flex items-start gap-4 mb-4">
							<Avatar
								className={`${author.featured ? 'size-16' : 'size-12'} ring-2 ring-primary/10`}
							>
								<AvatarImage src={author.avatar} alt={author.name} />
								<AvatarFallback>{author.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-semibold">{author.name}</h3>
									{author.featured && (
										<Star className="size-4 fill-amber-500 text-amber-500" />
									)}
								</div>
								<p className="text-sm text-muted-foreground">{author.role}</p>
							</div>
						</div>
						<p className="text-sm text-muted-foreground mb-4">{author.bio}</p>
						<div className="flex gap-6 text-sm">
							<div>
								<p className="font-bold">{author.articles}</p>
								<p className="text-xs text-muted-foreground">Articles</p>
							</div>
							<div>
								<p className="font-bold">{author.followers}</p>
								<p className="text-xs text-muted-foreground">Followers</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
