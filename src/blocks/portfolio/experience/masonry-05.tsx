import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Quote,
	Star,
	Mic,
	Calendar,
	Video,
	GraduationCap,
	Award,
	MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Complete Profile" />
					<Title text="About Me" />
					<Description text="Everything about my professional journey in one place." />
				</div>

				<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
					<ProfileCard
						avatar="https://github.com/shadcn.png"
						initials="JD"
						name="John Doe"
						title="Principal Engineer"
					/>
					<TestimonialCard
						quote="Best engineer I've worked with."
						author="Sarah Chen"
						rating={5}
					/>
					<TalkCard
						title="Scaling Design Systems"
						event="React Summit 2024"
						videoUrl="https://youtube.com"
					/>
					<EducationCard
						degree="MS Computer Science"
						school="Stanford"
						year="2018"
					/>
					<StatCard value="8+" label="Years" />
					<TestimonialCard
						quote="Transformed our design system."
						author="Michael Park"
						rating={5}
					/>
					<CertCard name="AWS Architect" issuer="Amazon" />
					<TalkCard
						title="Frontend Performance"
						event="Next.js Conf 2023"
						videoUrl="https://youtube.com"
					/>
					<EducationCard
						degree="BS Computer Science"
						school="UC Berkeley"
						year="2016"
					/>
					<StatCard value="25+" label="Mentored" />
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ProfileCardProps {
	avatar: string;
	initials: string;
	name: string;
	title: string;
}

const ProfileCard = ({ avatar, initials, name, title }: ProfileCardProps) => (
	<Card className="break-inside-avoid">
		<CardContent className="p-6 text-center">
			<Avatar className="size-20 mx-auto mb-4 ring-4 ring-primary/20">
				<AvatarImage src={avatar} alt={name} />
				<AvatarFallback className="text-2xl">{initials}</AvatarFallback>
			</Avatar>
			<h3 className="text-xl font-bold">{name}</h3>
			<p className="text-sm text-primary">{title}</p>
		</CardContent>
	</Card>
);

interface TestimonialCardProps {
	quote: string;
	author: string;
	rating: number;
}

const TestimonialCard = ({ quote, author, rating }: TestimonialCardProps) => (
	<Card className="break-inside-avoid bg-muted/50">
		<CardContent className="p-5">
			<Quote className="size-5 text-primary/30 mb-2" />
			<p className="text-sm italic mb-3">&quot;{quote}&quot;</p>
			<div className="flex items-center justify-between">
				<p className="text-xs font-medium">{author}</p>
				<div className="flex gap-0.5">
					{[...Array(rating)].map((_, i) => (
						<Star key={i} className="size-3 text-yellow-500 fill-current" />
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

interface TalkCardProps {
	title: string;
	event: string;
	videoUrl: string;
}

const TalkCard = ({ title, event, videoUrl }: TalkCardProps) => (
	<Link href={videoUrl} target="_blank" className="block group">
		<Card className="break-inside-avoid hover:shadow-md transition-all">
			<CardContent className="p-5">
				<Mic className="size-5 text-primary mb-2" />
				<h4 className="font-bold text-sm group-hover:text-primary transition-colors">
					{title}
				</h4>
				<p className="text-xs text-muted-foreground mb-2">{event}</p>
				<span className="inline-flex items-center gap-1 text-xs text-primary">
					<Video className="size-3" />
					Watch
				</span>
			</CardContent>
		</Card>
	</Link>
);

interface EducationCardProps {
	degree: string;
	school: string;
	year: string;
}

const EducationCard = ({ degree, school, year }: EducationCardProps) => (
	<Card className="break-inside-avoid">
		<CardContent className="p-5">
			<GraduationCap className="size-5 text-primary mb-2" />
			<h4 className="font-bold text-sm">{degree}</h4>
			<p className="text-xs text-muted-foreground">
				{school} · {year}
			</p>
		</CardContent>
	</Card>
);

interface StatCardProps {
	value: string;
	label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
	<Card className="break-inside-avoid bg-primary text-primary-foreground">
		<CardContent className="p-5 text-center">
			<p className="text-3xl font-bold">{value}</p>
			<p className="text-xs opacity-80">{label}</p>
		</CardContent>
	</Card>
);

interface CertCardProps {
	name: string;
	issuer: string;
}

const CertCard = ({ name, issuer }: CertCardProps) => (
	<Card className="break-inside-avoid">
		<CardContent className="p-5">
			<Award className="size-5 text-primary mb-2" />
			<h4 className="font-bold text-sm">{name}</h4>
			<p className="text-xs text-muted-foreground">{issuer}</p>
		</CardContent>
	</Card>
);
