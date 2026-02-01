import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	BarChart3,
	Bell,
	BookmarkCheck,
	Calendar,
	ChevronRight,
	Clock,
	Eye,
	FileText,
	Folder,
	Heart,
	MessageCircle,
	MoreHorizontal,
	PenTool,
	Plus,
	Settings,
	Share2,
	Star,
	ThumbsUp,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const CreatorProfileCard = ({
	src,
	fallback,
	name,
	handle,
	bio,
	verified,
}: {
	src: string;
	fallback: string;
	name: string;
	handle: string;
	bio: string;
	verified: boolean;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between mb-4">
				<Avatar className="size-20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<Button variant="outline" size="icon">
					<Settings className="size-4" />
				</Button>
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-bold">{name}</h1>
					{verified && (
						<Badge className="bg-blue-500/20 text-blue-600 gap-1">
							<BookmarkCheck className="size-3" />
							Verified
						</Badge>
					)}
				</div>
				<p className="text-muted-foreground">@{handle}</p>
				<p className="text-sm mt-3">{bio}</p>
			</div>
			<Button className="w-full mt-4 gap-2">
				<PenTool className="size-4" />
				Create New Post
			</Button>
		</CardContent>
	</Card>
);

const AnalyticCard = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<Icon className="size-5 text-muted-foreground" />
				<span
					className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}
				>
					{positive ? '+' : ''}
					{change}
				</span>
			</div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

const MonetizationCard = ({
	earnings,
	pending,
	thisMonth,
}: {
	earnings: string;
	pending: string;
	thisMonth: string;
}) => (
	<Card className="col-span-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<BarChart3 className="size-5 text-emerald-500" />
				<span className="font-semibold">Earnings</span>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<p className="text-xl font-bold text-emerald-600">{earnings}</p>
					<p className="text-xs text-muted-foreground">Total Earned</p>
				</div>
				<div>
					<p className="text-xl font-bold">{pending}</p>
					<p className="text-xs text-muted-foreground">Pending</p>
				</div>
				<div>
					<p className="text-xl font-bold">{thisMonth}</p>
					<p className="text-xs text-muted-foreground">This Month</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ContentCard = ({
	title,
	type,
	views,
	likes,
	date,
	thumbnail,
}: {
	title: string;
	type: string;
	views: string;
	likes: string;
	date: string;
	thumbnail: string;
}) => (
	<Card className="overflow-hidden">
		<div className="aspect-video bg-muted relative">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${thumbnail})` }}
			/>
			<Badge className="absolute top-2 left-2">{type}</Badge>
		</div>
		<CardContent className="p-3">
			<p className="font-medium text-sm truncate">{title}</p>
			<div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Eye className="size-3" />
					{views}
				</span>
				<span className="flex items-center gap-1">
					<Heart className="size-3" />
					{likes}
				</span>
				<span>{date}</span>
			</div>
		</CardContent>
	</Card>
);

const ScheduleCard = ({
	posts,
}: {
	posts: { title: string; time: string; type: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Calendar className="size-5" />
					Scheduled
				</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{posts.map((post, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-2">
						<Clock className="size-4 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium truncate">{post.title}</p>
							<p className="text-xs text-muted-foreground">{post.time}</p>
						</div>
					</div>
					<Badge variant="outline">{post.type}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const AudienceCard = ({
	demographics,
}: {
	demographics: { label: string; percentage: number }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Users className="size-5" />
				Audience
			</h3>
		</CardHeader>
		<CardContent className="space-y-3">
			{demographics.map((demo, i) => (
				<div key={i} className="space-y-1">
					<div className="flex justify-between text-sm">
						<span>{demo.label}</span>
						<span className="text-muted-foreground">{demo.percentage}%</span>
					</div>
					<Progress value={demo.percentage} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

const NotificationsCard = ({
	notifications,
}: {
	notifications: { message: string; time: string; type: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Bell className="size-5" />
					Notifications
				</h3>
				<Badge variant="secondary">{notifications.length}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{notifications.map((notif, i) => (
				<div
					key={i}
					className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					{notif.type === 'like' ? (
						<Heart className="size-4 text-red-500 mt-0.5" />
					) : notif.type === 'comment' ? (
						<MessageCircle className="size-4 text-blue-500 mt-0.5" />
					) : (
						<Users className="size-4 text-green-500 mt-0.5" />
					)}
					<div className="flex-1 min-w-0">
						<p className="text-sm truncate">{notif.message}</p>
						<p className="text-xs text-muted-foreground">{notif.time}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		creator: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
			fallback: 'JD',
			name: 'James Davis',
			handle: 'jamesdavis',
			bio: 'Content creator & designer. Sharing insights on tech, creativity, and digital life. 🚀',
			verified: true,
		},
		analytics: [
			{
				icon: Eye,
				label: 'Views',
				value: '124.5K',
				change: '+12%',
				positive: true,
			},
			{
				icon: Heart,
				label: 'Likes',
				value: '8.2K',
				change: '+8%',
				positive: true,
			},
			{
				icon: Users,
				label: 'Followers',
				value: '15.3K',
				change: '+245',
				positive: true,
			},
			{
				icon: TrendingUp,
				label: 'Engagement',
				value: '6.8%',
				change: '-0.2%',
				positive: false,
			},
		],
		monetization: { earnings: '$4,250', pending: '$580', thisMonth: '$1,120' },
		content: [
			{
				title: 'The Future of AI Design',
				type: 'Article',
				views: '12.4K',
				likes: '892',
				date: '2d ago',
				thumbnail:
					'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
			},
			{
				title: 'Creative Process Breakdown',
				type: 'Video',
				views: '8.7K',
				likes: '645',
				date: '5d ago',
				thumbnail:
					'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
			},
		],
		schedule: [
			{
				title: 'Product Design Tips',
				time: 'Tomorrow, 9:00 AM',
				type: 'Article',
			},
			{ title: 'Live Q&A Session', time: 'Jan 30, 7:00 PM', type: 'Live' },
		],
		audience: [
			{ label: '18-24 years', percentage: 35 },
			{ label: '25-34 years', percentage: 42 },
			{ label: '35-44 years', percentage: 18 },
		],
		notifications: [
			{ message: 'Sarah liked your post', time: '5m ago', type: 'like' },
			{
				message: 'New comment on "AI Design"',
				time: '1h ago',
				type: 'comment',
			},
			{ message: '12 new followers today', time: '3h ago', type: 'follower' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<CreatorProfileCard {...profileData.creator} />
					{profileData.analytics.map((stat, i) => (
						<AnalyticCard key={i} {...stat} />
					))}
					<MonetizationCard {...profileData.monetization} />
					{profileData.content.map((post, i) => (
						<ContentCard key={i} {...post} />
					))}
					<ScheduleCard posts={profileData.schedule} />
					<AudienceCard demographics={profileData.audience} />
					<NotificationsCard notifications={profileData.notifications} />
				</div>
			</div>
		</section>
	);
}
