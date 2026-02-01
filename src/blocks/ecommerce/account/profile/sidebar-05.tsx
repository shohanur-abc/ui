import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Book,
	Calendar,
	ChevronRight,
	Clock,
	Download,
	FileText,
	Flame,
	GraduationCap,
	LogOut,
	Play,
	Settings,
	Star,
	Target,
	Trophy,
	User,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LearnerSidebar = ({
	src,
	fallback,
	name,
	title,
	level,
	xp,
	maxXp,
	streak,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	level: number;
	xp: number;
	maxXp: number;
	streak: number;
}) => (
	<div className="space-y-4">
		<div className="text-center">
			<div className="relative inline-block">
				<Avatar className="size-16 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full size-6 flex items-center justify-center">
					{level}
				</div>
			</div>
			<h2 className="font-bold mt-3">{name}</h2>
			<p className="text-sm text-muted-foreground">{title}</p>
		</div>
		<div className="flex justify-center gap-4">
			<div className="text-center">
				<div className="flex items-center gap-1 text-orange-500">
					<Flame className="size-4" />
					<span className="font-bold">{streak}</span>
				</div>
				<p className="text-xs text-muted-foreground">Streak</p>
			</div>
			<div className="text-center">
				<div className="flex items-center gap-1 text-amber-500">
					<Zap className="size-4" />
					<span className="font-bold">{xp}</span>
				</div>
				<p className="text-xs text-muted-foreground">XP</p>
			</div>
		</div>
		<div className="space-y-1">
			<div className="flex justify-between text-xs">
				<span>Level {level}</span>
				<span className="text-muted-foreground">
					{xp}/{maxXp}
				</span>
			</div>
			<Progress value={(xp / maxXp) * 100} className="h-2" />
		</div>
	</div>
);

const LearnerNav = ({
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

const ContinueLearning = ({
	courses,
}: {
	courses: {
		image: string;
		title: string;
		progress: number;
		nextLesson: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold">Continue Learning</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			{courses.map((course, i) => (
				<div
					key={i}
					className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-muted shrink-0">
						<Image
							src={course.image}
							alt={course.title}
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
							<Play className="size-6 text-white" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h4 className="font-medium text-sm truncate">{course.title}</h4>
						<p className="text-xs text-muted-foreground truncate">
							{course.nextLesson}
						</p>
						<div className="mt-2">
							<Progress value={course.progress} className="h-1" />
							<p className="text-xs text-muted-foreground mt-1">
								{course.progress}% complete
							</p>
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const DailyGoals = ({
	goals,
}: {
	goals: { label: string; current: number; target: number }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Target className="size-5 text-green-500" />
				<h3 className="font-semibold">Daily Goals</h3>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{goals.map((goal, i) => (
				<div key={i} className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>{goal.label}</span>
						<span className="text-muted-foreground">
							{goal.current}/{goal.target}
						</span>
					</div>
					<Progress
						value={(goal.current / goal.target) * 100}
						className="h-2"
					/>
				</div>
			))}
		</CardContent>
	</Card>
);

const Certificates = ({
	certificates,
}: {
	certificates: { title: string; issuer: string; date: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<GraduationCap className="size-5 text-amber-500" />
					Certificates
				</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/certificates">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{certificates.map((cert, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<FileText className="size-5 text-amber-500" />
						<div>
							<p className="text-sm font-medium">{cert.title}</p>
							<p className="text-xs text-muted-foreground">
								{cert.issuer} • {cert.date}
							</p>
						</div>
					</div>
					<Button variant="ghost" size="icon">
						<Download className="size-4" />
					</Button>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
			fallback: 'JW',
			name: 'Jake Wilson',
			title: 'Full Stack Developer',
			level: 28,
			xp: 7500,
			maxXp: 10000,
			streak: 42,
		},
		nav: [
			{ icon: Book, label: 'My Courses', href: '/learn', badge: '5' },
			{
				icon: Trophy,
				label: 'Achievements',
				href: '/achievements',
				badge: '24',
			},
			{ icon: GraduationCap, label: 'Certificates', href: '/certificates' },
			{ icon: Calendar, label: 'Schedule', href: '/schedule' },
			{ icon: User, label: 'Profile', href: '/profile' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		courses: [
			{
				image:
					'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
				title: 'Advanced React Patterns',
				progress: 68,
				nextLesson: 'Compound Components',
			},
			{
				image:
					'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300',
				title: 'Node.js Masterclass',
				progress: 45,
				nextLesson: 'REST API Design',
			},
		],
		goals: [
			{ label: 'Learning Time', current: 45, target: 60 },
			{ label: 'Lessons Completed', current: 3, target: 5 },
			{ label: 'Quizzes Passed', current: 2, target: 3 },
		],
		certificates: [
			{ title: 'React Developer', issuer: 'Meta', date: 'Jan 2024' },
			{ title: 'JavaScript Pro', issuer: 'FreeCodeCamp', date: 'Dec 2023' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<LearnerSidebar {...profileData.sidebar} />
								<Separator />
								<LearnerNav items={profileData.nav} activeHref="/learn" />
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
						<h1 className="text-2xl font-bold">Learning Dashboard</h1>
						<ContinueLearning courses={profileData.courses} />
						<div className="grid @md:grid-cols-2 gap-6">
							<DailyGoals goals={profileData.goals} />
							<Certificates certificates={profileData.certificates} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
