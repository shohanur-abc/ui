import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	ChevronRight,
	Clock,
	ExternalLink,
	FileText,
	Globe,
	GraduationCap,
	Heart,
	Linkedin,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Plus,
	Star,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const JobSeekerHeader = ({
	src,
	fallback,
	name,
	title,
	location,
	status,
	lookingFor,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	location: string;
	status: string;
	lookingFor: string;
}) => (
	<Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row items-center gap-6">
				<Avatar className="size-28 ring-4 ring-indigo-500/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="text-center @md:text-left flex-1">
					<div className="flex items-center justify-center @md:justify-start gap-2">
						<h1 className="text-2xl font-bold">{name}</h1>
						<Badge className="bg-green-500/20 text-green-600">{status}</Badge>
					</div>
					<p className="text-lg text-muted-foreground">{title}</p>
					<div className="flex items-center justify-center @md:justify-start gap-2 mt-2 text-sm text-muted-foreground">
						<MapPin className="size-4" />
						{location}
					</div>
					<Badge variant="outline" className="mt-2">
						{lookingFor}
					</Badge>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">View Resume</Button>
					<Button>Edit Profile</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ProfileStrength = ({
	percentage,
	suggestions,
}: {
	percentage: number;
	suggestions: { label: string; completed: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Profile Strength</h2>
				<Badge variant={percentage >= 80 ? 'default' : 'secondary'}>
					{percentage}%
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<Progress value={percentage} className="h-2" />
			<div className="space-y-2">
				{suggestions.map((item, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							{item.completed ? (
								<div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
									<Star className="size-3 text-white" />
								</div>
							) : (
								<div className="size-5 rounded-full border-2 border-dashed border-muted-foreground" />
							)}
							<span
								className={
									item.completed ? 'text-muted-foreground line-through' : ''
								}
							>
								{item.label}
							</span>
						</div>
						{!item.completed && (
							<Button variant="ghost" size="sm">
								Add <ChevronRight className="size-4" />
							</Button>
						)}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ApplicationStats = ({
	stats,
}: {
	stats: { label: string; value: string; color: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Application Activity</h2>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{stats.map((stat, i) => (
					<div key={i} className="text-center p-3 rounded-lg bg-muted/30">
						<p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
						<p className="text-sm text-muted-foreground">{stat.label}</p>
					</div>
				))}
			</div>
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
		postedAgo: string;
		logo: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<Heart className="size-5 text-red-500" />
					Saved Jobs
				</h2>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/jobs/saved">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{jobs.map((job, i) => (
				<div
					key={i}
					className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
				>
					<Avatar className="size-12 rounded-lg shrink-0">
						<AvatarImage src={job.logo} alt={job.company} />
						<AvatarFallback className="rounded-lg">
							{job.company[0]}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<h4 className="font-medium truncate">{job.title}</h4>
						<p className="text-sm text-muted-foreground">{job.company}</p>
						<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<MapPin className="size-3" />
								{job.location}
							</span>
							<span>{job.salary}</span>
						</div>
					</div>
					<div className="text-right">
						<p className="text-xs text-muted-foreground">{job.postedAgo}</p>
						<Button variant="outline" size="sm" className="mt-2">
							Apply
						</Button>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const Experience = ({
	experiences,
}: {
	experiences: {
		title: string;
		company: string;
		period: string;
		current: boolean;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<Briefcase className="size-5" />
					Experience
				</h2>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{experiences.map((exp, i) => (
				<div key={i} className="flex gap-3">
					<div className="flex flex-col items-center">
						<div
							className={`size-3 rounded-full ${exp.current ? 'bg-green-500' : 'bg-muted-foreground'}`}
						/>
						{i < experiences.length - 1 && (
							<div className="w-px flex-1 bg-muted" />
						)}
					</div>
					<div className="pb-4">
						<div className="flex items-center gap-2">
							<p className="font-medium">{exp.title}</p>
							{exp.current && <Badge variant="secondary">Current</Badge>}
						</div>
						<p className="text-sm text-muted-foreground">{exp.company}</p>
						<p className="text-xs text-muted-foreground">{exp.period}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const Skills = ({
	skills,
}: {
	skills: {
		name: string;
		level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
		endorsements: number;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<Award className="size-5" />
					Skills
				</h2>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<Badge key={i} variant="secondary" className="gap-1 py-1.5">
						{skill.name}
						<span className="text-xs bg-background/50 px-1 rounded">
							{skill.endorsements}
						</span>
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

const Recommendations = ({
	count,
	preview,
}: {
	count: number;
	preview: { name: string; title: string; avatar: string; snippet: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<MessageSquare className="size-5" />
					Recommendations
				</h2>
				<Badge variant="secondary">{count}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{preview.map((rec, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center gap-3 mb-2">
						<Avatar className="size-10">
							<AvatarImage src={rec.avatar} />
							<AvatarFallback>{rec.name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">{rec.name}</p>
							<p className="text-xs text-muted-foreground">{rec.title}</p>
						</div>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2">
						"{rec.snippet}"
					</p>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'MJ',
			name: 'Michael Johnson',
			title: 'Senior Software Engineer',
			location: 'San Francisco, CA',
			status: 'Open to Work',
			lookingFor: 'Full-time • Remote',
		},
		profileStrength: {
			percentage: 75,
			suggestions: [
				{ label: 'Add profile photo', completed: true },
				{ label: 'Complete work experience', completed: true },
				{ label: 'Add skills (5+)', completed: true },
				{ label: 'Upload resume', completed: false },
				{ label: 'Get 3 recommendations', completed: false },
			],
		},
		applicationStats: [
			{ label: 'Applied', value: '24', color: 'text-blue-500' },
			{ label: 'Interviews', value: '5', color: 'text-green-500' },
			{ label: 'Saved', value: '18', color: 'text-red-500' },
			{ label: 'Profile Views', value: '142', color: 'text-purple-500' },
		],
		savedJobs: [
			{
				title: 'Staff Engineer',
				company: 'Stripe',
				location: 'Remote',
				salary: '$180k - $220k',
				postedAgo: '2d ago',
				logo: 'https://logo.clearbit.com/stripe.com',
			},
			{
				title: 'Principal Engineer',
				company: 'Airbnb',
				location: 'San Francisco',
				salary: '$200k - $250k',
				postedAgo: '3d ago',
				logo: 'https://logo.clearbit.com/airbnb.com',
			},
		],
		experiences: [
			{
				title: 'Senior Software Engineer',
				company: 'Tech Corp',
				period: 'Jan 2022 - Present',
				current: true,
			},
			{
				title: 'Software Engineer',
				company: 'StartupXYZ',
				period: 'Jun 2019 - Dec 2021',
				current: false,
			},
			{
				title: 'Junior Developer',
				company: 'Agency Inc',
				period: 'Jan 2017 - May 2019',
				current: false,
			},
		],
		skills: [
			{ name: 'React', level: 'Expert' as const, endorsements: 45 },
			{ name: 'TypeScript', level: 'Expert' as const, endorsements: 38 },
			{ name: 'Node.js', level: 'Advanced' as const, endorsements: 32 },
			{ name: 'Python', level: 'Advanced' as const, endorsements: 28 },
			{ name: 'AWS', level: 'Intermediate' as const, endorsements: 22 },
			{ name: 'Docker', level: 'Intermediate' as const, endorsements: 18 },
		],
		recommendations: {
			count: 8,
			preview: [
				{
					name: 'Sarah Chen',
					title: 'Engineering Manager at Tech Corp',
					avatar: 'https://i.pravatar.cc/40?img=1',
					snippet:
						"Michael is one of the most talented engineers I've worked with. His technical skills and leadership...",
				},
				{
					name: 'David Kim',
					title: 'CTO at StartupXYZ',
					avatar: 'https://i.pravatar.cc/40?img=2',
					snippet:
						'An exceptional problem solver who consistently delivers high-quality work under tight deadlines...',
				},
			],
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<JobSeekerHeader {...profileData.header} />
				<ProfileStrength {...profileData.profileStrength} />
				<ApplicationStats stats={profileData.applicationStats} />
				<SavedJobs jobs={profileData.savedJobs} />
				<Experience experiences={profileData.experiences} />
				<Skills skills={profileData.skills} />
				<Recommendations {...profileData.recommendations} />
			</div>
		</section>
	);
}
