import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Briefcase,
	Calendar,
	ChevronRight,
	Clock,
	Edit,
	FileText,
	Github,
	Globe,
	Link2,
	Linkedin,
	LogOut,
	Mail,
	MapPin,
	MessageSquare,
	Settings,
	Star,
	Twitter,
	User,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const JobSeekerSidebar = ({
	src,
	fallback,
	name,
	title,
	location,
	availability,
	availabilityColor,
	profileStrength,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	location: string;
	availability: string;
	availabilityColor: string;
	profileStrength: number;
}) => (
	<div className="space-y-4">
		<div className="text-center">
			<Avatar className="size-20 mx-auto ring-2 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="font-bold mt-3">{name}</h2>
			<p className="text-sm text-muted-foreground">{title}</p>
			<div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
				<MapPin className="size-4" />
				{location}
			</div>
			<Badge className={`mt-2 ${availabilityColor}`}>{availability}</Badge>
		</div>
		<div className="space-y-2">
			<div className="flex justify-between text-sm">
				<span>Profile Strength</span>
				<span className="font-medium">{profileStrength}%</span>
			</div>
			<Progress value={profileStrength} className="h-2" />
			<p className="text-xs text-muted-foreground">
				Add projects to reach 100%
			</p>
		</div>
	</div>
);

const SocialLinks = ({
	links,
}: {
	links: {
		icon: React.ElementType;
		label: string;
		href: string;
		connected: boolean;
	}[];
}) => (
	<div className="space-y-2">
		{links.map((link, i) => (
			<div key={i} className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<link.icon className="size-4 text-muted-foreground" />
					<span className="text-sm">{link.label}</span>
				</div>
				{link.connected ? (
					<Badge variant="secondary" className="text-xs">
						Connected
					</Badge>
				) : (
					<Button variant="ghost" size="sm" className="h-7 text-xs">
						Connect
					</Button>
				)}
			</div>
		))}
	</div>
);

const JobSeekerNav = ({
	items,
	activeHref,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
	}[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="flex-1 text-sm font-medium">{item.label}</span>
				{item.badge && (
					<Badge variant={item.href === activeHref ? 'secondary' : 'outline'}>
						{item.badge}
					</Badge>
				)}
			</Link>
		))}
	</nav>
);

const JobStats = ({
	stats,
}: {
	stats: { label: string; value: string; change: string; positive: boolean }[];
}) => (
	<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
		{stats.map((stat, i) => (
			<Card key={i}>
				<CardContent className="p-4 text-center">
					<p className="text-2xl font-bold">{stat.value}</p>
					<p className="text-sm text-muted-foreground">{stat.label}</p>
					<p
						className={`text-xs mt-1 ${stat.positive ? 'text-green-500' : 'text-muted-foreground'}`}
					>
						{stat.change}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const RecentApplications = ({
	applications,
}: {
	applications: {
		company: string;
		position: string;
		status: string;
		statusColor: string;
		date: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Applications</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/applications">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{applications.map((app, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
				>
					<div>
						<p className="font-medium">{app.position}</p>
						<p className="text-sm text-muted-foreground">{app.company}</p>
					</div>
					<div className="text-right">
						<Badge className={app.statusColor}>{app.status}</Badge>
						<p className="text-xs text-muted-foreground mt-1">{app.date}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const SavedJobs = ({
	jobs,
}: {
	jobs: {
		title: string;
		company: string;
		location: string;
		salary: string;
		type: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Star className="size-5 text-amber-500" />
					Saved Jobs
				</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/saved">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{jobs.map((job, i) => (
				<div key={i} className="p-3 rounded-lg border">
					<div className="flex items-start justify-between">
						<div>
							<p className="font-medium">{job.title}</p>
							<p className="text-sm text-muted-foreground">{job.company}</p>
						</div>
						<Button size="sm">Apply</Button>
					</div>
					<div className="flex flex-wrap gap-2 mt-2">
						<Badge variant="secondary">{job.location}</Badge>
						<Badge variant="secondary">{job.type}</Badge>
						<Badge variant="secondary">{job.salary}</Badge>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
			fallback: 'RJ',
			name: 'Ryan Johnson',
			title: 'Senior Frontend Developer',
			location: 'San Francisco, CA',
			availability: 'Open to Work',
			availabilityColor: 'bg-green-500/20 text-green-600',
			profileStrength: 85,
		},
		socialLinks: [
			{ icon: Linkedin, label: 'LinkedIn', href: '#', connected: true },
			{ icon: Github, label: 'GitHub', href: '#', connected: true },
			{ icon: Twitter, label: 'Twitter', href: '#', connected: false },
			{ icon: Globe, label: 'Portfolio', href: '#', connected: true },
		],
		nav: [
			{ icon: User, label: 'Profile', href: '/profile' },
			{
				icon: Briefcase,
				label: 'Applications',
				href: '/applications',
				badge: '8',
			},
			{ icon: Star, label: 'Saved Jobs', href: '/saved', badge: '12' },
			{ icon: MessageSquare, label: 'Messages', href: '/messages', badge: '3' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		stats: [
			{
				label: 'Profile Views',
				value: '847',
				change: '+12% this week',
				positive: true,
			},
			{
				label: 'Applications',
				value: '23',
				change: '5 this month',
				positive: true,
			},
			{
				label: 'Interviews',
				value: '4',
				change: '2 scheduled',
				positive: true,
			},
			{
				label: 'Saved Jobs',
				value: '12',
				change: '3 new matches',
				positive: true,
			},
		],
		applications: [
			{
				company: 'Stripe',
				position: 'Senior Frontend Engineer',
				status: 'Interview',
				statusColor: 'bg-green-500/20 text-green-600',
				date: '2 days ago',
			},
			{
				company: 'Vercel',
				position: 'Staff Engineer',
				status: 'Applied',
				statusColor: 'bg-blue-500/20 text-blue-600',
				date: '5 days ago',
			},
			{
				company: 'Linear',
				position: 'Frontend Developer',
				status: 'Reviewing',
				statusColor: 'bg-amber-500/20 text-amber-600',
				date: '1 week ago',
			},
		],
		savedJobs: [
			{
				title: 'Lead Frontend Developer',
				company: 'Notion',
				location: 'Remote',
				salary: '$180k - $220k',
				type: 'Full-time',
			},
			{
				title: 'Senior React Engineer',
				company: 'Figma',
				location: 'San Francisco',
				salary: '$170k - $200k',
				type: 'Full-time',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-72 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<JobSeekerSidebar {...profileData.sidebar} />
								<Separator />
								<SocialLinks links={profileData.socialLinks} />
								<Separator />
								<JobSeekerNav items={profileData.nav} activeHref="/profile" />
								<Separator />
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 text-destructive"
								>
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Job Dashboard</h1>
						<JobStats stats={profileData.stats} />
						<div className="grid @xl:grid-cols-2 gap-6">
							<RecentApplications applications={profileData.applications} />
							<SavedJobs jobs={profileData.savedJobs} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
