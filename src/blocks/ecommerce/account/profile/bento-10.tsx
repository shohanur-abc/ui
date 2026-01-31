import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Book,
	Calendar,
	ChevronRight,
	Clock,
	Cpu,
	Download,
	FileText,
	Flame,
	GraduationCap,
	Heart,
	Play,
	PlayCircle,
	Star,
	Target,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LearnerProfileCard = ({
	src,
	fallback,
	name,
	title,
	streak,
	xp,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	streak: number;
	xp: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-blue-500/20 via-background to-purple-500/20">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
				<Avatar className="size-20 ring-4 ring-blue-500/30">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-blue-500 text-white text-2xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h2 className="text-xl font-bold">{name}</h2>
					<p className="text-muted-foreground text-sm">{title}</p>
					<div className="flex items-center gap-4 mt-2">
						<div className="flex items-center gap-1">
							<Flame className="size-4 text-orange-500" />
							<span className="text-sm font-medium">{streak} day streak</span>
						</div>
						<div className="flex items-center gap-1">
							<Zap className="size-4 text-amber-500" />
							<span className="text-sm font-medium">{xp.toLocaleString()} XP</span>
						</div>
					</div>
				</div>
				<Button asChild>
					<Link href="/learn">Continue Learning</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CurrentCourseCard = ({
	image,
	title,
	instructor,
	progress,
	nextLesson,
}: {
	image: string;
	title: string;
	instructor: string;
	progress: number;
	nextLesson: string;
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 h-full flex flex-col">
			<div className="relative aspect-video rounded-lg overflow-hidden mb-4">
				<Image src={image} alt={title} fill className="object-cover" />
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
					<Button size="icon" variant="secondary" className="rounded-full size-12">
						<Play className="size-5 ml-0.5" />
					</Button>
				</div>
			</div>
			<div className="flex-1">
				<Badge variant="secondary" className="mb-2">In Progress</Badge>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{instructor}</p>
				<div className="mt-3 space-y-1">
					<div className="flex justify-between text-sm">
						<span>Progress</span>
						<span className="font-medium">{progress}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>
			</div>
			<div className="mt-4 p-3 rounded-lg bg-muted/30">
				<p className="text-xs text-muted-foreground">Next Lesson</p>
				<p className="text-sm font-medium truncate">{nextLesson}</p>
			</div>
		</CardContent>
	</Card>
);

const StatsCard = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string; color: string }[];
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="grid grid-cols-2 gap-3">
				{items.map((stat, i) => (
					<div key={i} className="p-3 rounded-lg bg-muted/30 text-center">
						<stat.icon className={`size-5 mx-auto mb-1 ${stat.color}`} />
						<p className="text-xl font-bold">{stat.value}</p>
						<p className="text-xs text-muted-foreground">{stat.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SkillsCard = ({
	skills,
}: {
	skills: { name: string; level: number; maxLevel: number; color: string }[];
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Cpu className="size-5 text-primary" />
				<h3 className="font-medium">Skills</h3>
			</div>
			<div className="space-y-3">
				{skills.map((skill, i) => (
					<div key={i} className="space-y-1">
						<div className="flex items-center justify-between text-sm">
							<span>{skill.name}</span>
							<span className="text-muted-foreground">Lvl {skill.level}/{skill.maxLevel}</span>
						</div>
						<Progress value={(skill.level / skill.maxLevel) * 100} className={`h-2 ${skill.color}`} />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const CertificatesCard = ({
	certificates,
}: {
	certificates: { title: string; issuer: string; date: string }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<GraduationCap className="size-5 text-amber-500" />
					<h3 className="font-medium">Certificates</h3>
				</div>
				<Badge>{certificates.length}</Badge>
			</div>
			<div className="grid @sm:grid-cols-3 gap-3">
				{certificates.map((cert, i) => (
					<div key={i} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
						<div className="flex items-center gap-2 mb-2">
							<FileText className="size-4 text-amber-500" />
							<Download className="size-4 text-muted-foreground ml-auto cursor-pointer hover:text-foreground" />
						</div>
						<p className="text-sm font-medium truncate">{cert.title}</p>
						<p className="text-xs text-muted-foreground">{cert.issuer}</p>
						<p className="text-xs text-muted-foreground">{cert.date}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const GoalsCard = ({
	daily,
	weekly,
	dailyProgress,
	weeklyProgress,
}: {
	daily: string;
	weekly: string;
	dailyProgress: number;
	weeklyProgress: number;
}) => (
	<Card>
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center gap-2">
				<Target className="size-5 text-green-500" />
				<h3 className="font-medium">Goals</h3>
			</div>
			<div className="space-y-3">
				<div className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center justify-between mb-1">
						<span className="text-sm">Daily: {daily}</span>
						<span className="text-xs text-muted-foreground">{dailyProgress}%</span>
					</div>
					<Progress value={dailyProgress} className="h-2" />
				</div>
				<div className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center justify-between mb-1">
						<span className="text-sm">Weekly: {weekly}</span>
						<span className="text-xs text-muted-foreground">{weeklyProgress}%</span>
					</div>
					<Progress value={weeklyProgress} className="h-2" />
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
			fallback: 'JW',
			name: 'Jake Wilson',
			title: 'Full Stack Developer in Training',
			streak: 42,
			xp: 15800,
		},
		currentCourse: {
			image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
			title: 'Advanced React Patterns',
			instructor: 'Sarah Johnson',
			progress: 68,
			nextLesson: 'Compound Components Pattern',
		},
		stats: [
			{ icon: Book, value: '12', label: 'Courses', color: 'text-blue-500' },
			{ icon: Clock, value: '147h', label: 'Learn Time', color: 'text-green-500' },
			{ icon: Trophy, value: '8', label: 'Certificates', color: 'text-amber-500' },
			{ icon: Star, value: '4.9', label: 'Avg Rating', color: 'text-purple-500' },
		],
		skills: [
			{ name: 'JavaScript', level: 8, maxLevel: 10, color: '[&>div]:bg-amber-500' },
			{ name: 'React', level: 7, maxLevel: 10, color: '[&>div]:bg-blue-500' },
			{ name: 'Node.js', level: 5, maxLevel: 10, color: '[&>div]:bg-green-500' },
		],
		certificates: [
			{ title: 'React Developer', issuer: 'Meta', date: 'Jan 2024' },
			{ title: 'JavaScript Pro', issuer: 'FreeCodeCamp', date: 'Dec 2023' },
			{ title: 'Web Fundamentals', issuer: 'Google', date: 'Oct 2023' },
		],
		goals: {
			daily: '30 min learning',
			weekly: '5 lessons',
			dailyProgress: 80,
			weeklyProgress: 60,
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<LearnerProfileCard {...profileData.profile} />
					<CurrentCourseCard {...profileData.currentCourse} />
					<StatsCard items={profileData.stats} />
					<SkillsCard skills={profileData.skills} />
					<CertificatesCard certificates={profileData.certificates} />
					<GoalsCard {...profileData.goals} />
				</div>
			</div>
		</section>
	);
}
