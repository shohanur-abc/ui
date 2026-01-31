import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	MessageSquare,
	Sparkles,
	ThumbsUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-10">
					<ContentBlock
						title="Join the Conversation"
						description="Connect with developers worldwide. Ask questions, share knowledge, and grow together."
						stats={[
							{ icon: Users, value: '125K', label: 'Members' },
							{ icon: MessageSquare, value: '50K', label: 'Discussions' },
						]}
						cta={{ label: 'Join Community', href: '/community' }}
						className="@xl:col-span-5"
					/>
					<DiscussionsList
						discussions={[
							{
								title: 'Best practices for React 19 hooks?',
								author: {
									name: 'Alex K.',
									avatar: 'https://i.pravatar.cc/100?img=50',
								},
								replies: 47,
								likes: 128,
								hot: true,
							},
							{
								title: 'TypeScript vs JavaScript in 2026',
								author: {
									name: 'Sarah C.',
									avatar: 'https://i.pravatar.cc/100?img=40',
								},
								replies: 89,
								likes: 256,
								hot: false,
							},
							{
								title: 'Favorite VS Code extensions?',
								author: {
									name: 'Maria J.',
									avatar: 'https://i.pravatar.cc/100?img=60',
								},
								replies: 156,
								likes: 342,
								hot: true,
							},
						]}
						className="@xl:col-span-7"
					/>
				</div>
			</div>
		</section>
	);
}

interface Stat {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

interface ContentBlockProps {
	title: string;
	description: string;
	stats: Stat[];
	cta: { label: string; href: string };
	className?: string;
}

const ContentBlock = ({
	title,
	description,
	stats,
	cta,
	className,
}: ContentBlockProps) => (
	<div className={`flex flex-col justify-center ${className}`}>
		<Badge variant="secondary" className="w-fit mb-4">
			<Sparkles className="size-3.5 mr-1.5" />
			Community
		</Badge>
		<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground mb-6">{description}</p>
		<div className="flex gap-8 mb-6">
			{stats.map((stat) => (
				<div key={stat.label} className="flex flex-col">
					<div className="flex items-center gap-2">
						<stat.icon className="size-5 text-primary" />
						<span className="text-2xl font-bold">{stat.value}</span>
					</div>
					<span className="text-sm text-muted-foreground">{stat.label}</span>
				</div>
			))}
		</div>
		<Button size="lg" asChild className="gap-2 w-fit">
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

interface Discussion {
	title: string;
	author: { name: string; avatar: string };
	replies: number;
	likes: number;
	hot: boolean;
}

interface DiscussionsListProps {
	discussions: Discussion[];
	className?: string;
}

const DiscussionsList = ({ discussions, className }: DiscussionsListProps) => (
	<div className={`space-y-4 ${className}`}>
		{discussions.map((discussion) => (
			<Card
				key={discussion.title}
				className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg"
			>
				<CardContent className="p-4 @md:p-5">
					<div className="flex items-start gap-4">
						<Avatar className="size-10 shrink-0">
							<AvatarImage
								src={discussion.author.avatar}
								alt={discussion.author.name}
							/>
							<AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<span className="text-sm font-medium">
									{discussion.author.name}
								</span>
								{discussion.hot && (
									<Badge
										variant="destructive"
										className="text-[10px] px-1.5 py-0"
									>
										Hot
									</Badge>
								)}
							</div>
							<h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
								{discussion.title}
							</h3>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span className="flex items-center gap-1">
									<MessageSquare className="size-4" />
									{discussion.replies} replies
								</span>
								<span className="flex items-center gap-1">
									<ThumbsUp className="size-4" />
									{discussion.likes} likes
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
