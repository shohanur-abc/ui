import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Book,
	Calendar,
	ChevronRight,
	Clock,
	Download,
	FileText,
	Flame,
	GraduationCap,
	Play,
	Star,
	Target,
	Trophy,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LearnerHeader = ({
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
	<div className="flex flex-col @md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
		<div className="relative">
			<Avatar className="size-24 ring-4 ring-background">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
			</Avatar>
			<div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
				{level}
			</div>
		</div>
		<div className="text-center @md:text-left flex-1">
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">{title}</p>
			<div className="flex items-center justify-center @md:justify-start gap-4 mt-3">
				<div className="flex items-center gap-1 text-orange-500">
					<Flame className="size-5" />
					<span className="font-bold">{streak} day streak</span>
				</div>
				<div className="flex items-center gap-1 text-amber-500">
					<Zap className="size-5" />
					<span className="font-bold">{xp.toLocaleString()} XP</span>
				</div>
			</div>
			<div className="mt-3 max-w-xs mx-auto @md:mx-0">
				<div className="flex justify-between text-sm mb-1">
					<span>Level {level}</span>
					<span className="text-muted-foreground">
						{xp}/{maxXp}
					</span>
				</div>
				<Progress value={(xp / maxXp) * 100} className="h-2" />
			</div>
		</div>
	</div>
);

const CoursesTab = ({
	courses,
}: {
	courses: {
		image: string;
		title: string;
		instructor: string;
		progress: number;
		nextLesson: string;
	}[];
}) => (
	<div className="space-y-4">
		{courses.map((course, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex flex-col @sm:flex-row gap-4">
						<div className="relative w-full @sm:w-40 aspect-video rounded-lg overflow-hidden bg-muted shrink-0">
							<Image
								src={course.image}
								alt={course.title}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
								<Button size="icon" className="rounded-full">
									<Play className="size-5" />
								</Button>
							</div>
						</div>
						<div className="flex-1">
							<h4 className="font-semibold">{course.title}</h4>
							<p className="text-sm text-muted-foreground">
								{course.instructor}
							</p>
							<p className="text-sm text-muted-foreground mt-1">
								Next: {course.nextLesson}
							</p>
							<div className="mt-3">
								<div className="flex justify-between text-sm mb-1">
									<span>Progress</span>
									<span>{course.progress}%</span>
								</div>
								<Progress value={course.progress} className="h-2" />
							</div>
						</div>
						<Button className="shrink-0">Continue</Button>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const AchievementsTab = ({
	achievements,
}: {
	achievements: {
		icon: React.ElementType;
		title: string;
		description: string;
		xp: number;
		earned: boolean;
		progress?: number;
	}[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{achievements.map((achievement, i) => (
			<Card key={i} className={achievement.earned ? 'border-amber-500/50' : ''}>
				<CardContent className="p-5 text-center">
					<div
						className={`size-16 mx-auto rounded-full flex items-center justify-center ${
							achievement.earned ? 'bg-amber-500/20' : 'bg-muted'
						}`}
					>
						<achievement.icon
							className={`size-8 ${achievement.earned ? 'text-amber-500' : 'text-muted-foreground'}`}
						/>
					</div>
					<h4 className="font-semibold mt-3">{achievement.title}</h4>
					<p className="text-sm text-muted-foreground">
						{achievement.description}
					</p>
					{achievement.earned ? (
						<Badge className="mt-3 bg-amber-500/20 text-amber-600">
							+{achievement.xp} XP
						</Badge>
					) : achievement.progress !== undefined ? (
						<div className="mt-3">
							<Progress value={achievement.progress} className="h-1.5" />
							<p className="text-xs text-muted-foreground mt-1">
								{achievement.progress}% complete
							</p>
						</div>
					) : (
						<Badge variant="secondary" className="mt-3">
							Locked
						</Badge>
					)}
				</CardContent>
			</Card>
		))}
	</div>
);

const CertificatesTab = ({
	certificates,
}: {
	certificates: {
		title: string;
		issuer: string;
		date: string;
		credentialId: string;
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{certificates.map((cert, i) => (
			<Card key={i}>
				<CardContent className="p-6">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
							<GraduationCap className="size-8" />
						</div>
						<div className="flex-1">
							<h4 className="font-semibold">{cert.title}</h4>
							<p className="text-sm text-muted-foreground">{cert.issuer}</p>
							<p className="text-sm text-muted-foreground">
								Issued {cert.date}
							</p>
							<p className="text-xs text-muted-foreground mt-2">
								ID: {cert.credentialId}
							</p>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button variant="outline" size="sm" className="gap-2">
							<Download className="size-4" />
							Download
						</Button>
						<Button variant="ghost" size="sm">
							Share
						</Button>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const StatsTab = ({
	stats,
	weeklyActivity,
}: {
	stats: { label: string; value: string; icon: React.ElementType }[];
	weeklyActivity: { day: string; hours: number }[];
}) => (
	<div className="space-y-6">
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<Card key={i}>
					<CardContent className="p-4 text-center">
						<stat.icon className="size-8 mx-auto text-primary mb-2" />
						<p className="text-2xl font-bold">{stat.value}</p>
						<p className="text-sm text-muted-foreground">{stat.label}</p>
					</CardContent>
				</Card>
			))}
		</div>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Weekly Activity</h3>
			</CardHeader>
			<CardContent>
				<div className="flex items-end justify-between gap-2 h-40">
					{weeklyActivity.map((day, i) => (
						<div key={i} className="flex-1 flex flex-col items-center gap-2">
							<div
								className="w-full bg-muted rounded-t-lg relative"
								style={{ height: `${(day.hours / 4) * 100}%` }}
							>
								<div className="absolute inset-0 bg-primary rounded-t-lg" />
							</div>
							<span className="text-xs text-muted-foreground">{day.day}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
			fallback: 'JW',
			name: 'Jake Wilson',
			title: 'Full Stack Developer',
			level: 28,
			xp: 7500,
			maxXp: 10000,
			streak: 42,
		},
		courses: [
			{
				image:
					'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
				title: 'Advanced React Patterns',
				instructor: 'Dan Abramov',
				progress: 68,
				nextLesson: 'Compound Components',
			},
			{
				image:
					'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300',
				title: 'Node.js Masterclass',
				instructor: 'Maximilian S.',
				progress: 45,
				nextLesson: 'REST API Design',
			},
			{
				image:
					'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300',
				title: 'TypeScript Deep Dive',
				instructor: 'Matt Pocock',
				progress: 92,
				nextLesson: 'Advanced Generics',
			},
		],
		achievements: [
			{
				icon: Star,
				title: 'First Course',
				description: 'Complete your first course',
				xp: 100,
				earned: true,
			},
			{
				icon: Flame,
				title: '7 Day Streak',
				description: 'Learn 7 days in a row',
				xp: 250,
				earned: true,
			},
			{
				icon: Trophy,
				title: 'Course Master',
				description: 'Complete 10 courses',
				xp: 500,
				earned: false,
				progress: 70,
			},
			{
				icon: Zap,
				title: 'Speed Learner',
				description: 'Finish a course in 1 week',
				xp: 300,
				earned: true,
			},
			{
				icon: Award,
				title: 'Top 1%',
				description: 'Score in top 1% on a quiz',
				xp: 1000,
				earned: false,
			},
			{
				icon: Book,
				title: 'Bookworm',
				description: 'Read 50 articles',
				xp: 200,
				earned: false,
				progress: 40,
			},
		],
		certificates: [
			{
				title: 'React Developer Professional',
				issuer: 'Meta',
				date: 'Jan 2024',
				credentialId: 'META-RDP-2024-001',
			},
			{
				title: 'JavaScript Fundamentals',
				issuer: 'FreeCodeCamp',
				date: 'Dec 2023',
				credentialId: 'FCC-JSF-2023-456',
			},
			{
				title: 'Node.js Backend Developer',
				issuer: 'OpenJS Foundation',
				date: 'Nov 2023',
				credentialId: 'OPENJS-NBD-789',
			},
		],
		stats: [
			{ label: 'Courses Completed', value: '12', icon: GraduationCap },
			{ label: 'Hours Learned', value: '156', icon: Clock },
			{ label: 'Certificates', value: '5', icon: Award },
			{ label: 'Achievements', value: '24', icon: Trophy },
		],
		weeklyActivity: [
			{ day: 'Mon', hours: 2.5 },
			{ day: 'Tue', hours: 1.5 },
			{ day: 'Wed', hours: 3 },
			{ day: 'Thu', hours: 2 },
			{ day: 'Fri', hours: 4 },
			{ day: 'Sat', hours: 1 },
			{ day: 'Sun', hours: 3.5 },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<LearnerHeader {...profileData.header} />
				<Tabs defaultValue="courses" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="courses" className="gap-2">
							<Book className="size-4" />
							My Courses
						</TabsTrigger>
						<TabsTrigger value="achievements" className="gap-2">
							<Trophy className="size-4" />
							Achievements
						</TabsTrigger>
						<TabsTrigger value="certificates" className="gap-2">
							<GraduationCap className="size-4" />
							Certificates
						</TabsTrigger>
						<TabsTrigger value="stats" className="gap-2">
							<Target className="size-4" />
							Stats
						</TabsTrigger>
					</TabsList>
					<TabsContent value="courses" className="mt-6">
						<CoursesTab courses={profileData.courses} />
					</TabsContent>
					<TabsContent value="achievements" className="mt-6">
						<AchievementsTab achievements={profileData.achievements} />
					</TabsContent>
					<TabsContent value="certificates" className="mt-6">
						<CertificatesTab certificates={profileData.certificates} />
					</TabsContent>
					<TabsContent value="stats" className="mt-6">
						<StatsTab
							stats={profileData.stats}
							weeklyActivity={profileData.weeklyActivity}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
