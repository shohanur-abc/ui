import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-5 gap-12 @lg:gap-16 items-start">
					<ProfileColumn
						src="https://picsum.photos/seed/split4/400/400"
						fallback="DL"
						name="David Lee"
						role="Technical Lead"
						company="Meta"
						achievements={[
							{ icon: Award, text: 'Patent Holder (3x)' },
							{ icon: Briefcase, text: '15+ Years Experience' },
						]}
						cta={{ label: 'Connect', href: '/contact', icon: ArrowRight }}
					/>
					<ContentColumn
						title="About Me"
						paragraphs={[
							"I'm a technical lead with a passion for building high-performance systems at scale. Currently at Meta, I lead a team of 12 engineers working on core infrastructure.",
							"My expertise lies in distributed systems, performance optimization, and team leadership. I've shipped products used by billions and mentored dozens of engineers.",
						]}
						skills={[
							{ name: 'System Design', value: 95 },
							{ name: 'Team Leadership', value: 90 },
							{ name: 'Performance', value: 92 },
							{ name: 'Architecture', value: 88 },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface AchievementItem {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ProfileColumnProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	company: string;
	achievements: AchievementItem[];
	cta: CTAData;
}

const ProfileColumn = ({
	src,
	fallback,
	name,
	role,
	company,
	achievements,
	cta,
}: ProfileColumnProps) => (
	<div className="@lg:col-span-2 text-center @lg:text-left @lg:sticky @lg:top-8">
		<Avatar className="size-32 @md:size-40 mx-auto @lg:mx-0 mb-6 ring-4 ring-border shadow-xl">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<h1 className="text-3xl @md:text-4xl font-bold tracking-tight mb-1">
			{name}
		</h1>
		<p className="text-primary font-medium mb-1">{role}</p>
		<p className="text-muted-foreground mb-6">{company}</p>
		<div className="space-y-2 mb-8">
			{achievements.map(({ icon: Icon, text }, i) => (
				<div
					key={i}
					className="flex items-center justify-center @lg:justify-start gap-2 text-sm text-muted-foreground"
				>
					<Icon className="size-4" />
					<span>{text}</span>
				</div>
			))}
		</div>
		<Button size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);

interface SkillItem {
	name: string;
	value: number;
}

interface ContentColumnProps {
	title: string;
	paragraphs: string[];
	skills: SkillItem[];
}

const ContentColumn = ({ title, paragraphs, skills }: ContentColumnProps) => (
	<div className="@lg:col-span-3">
		<Badge variant="outline" className="mb-4">
			{title}
		</Badge>
		<div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
			{paragraphs.map((text, i) => (
				<p key={i} className="text-base @md:text-lg">
					{text}
				</p>
			))}
		</div>
		<div>
			<h3 className="font-semibold mb-6">Core Competencies</h3>
			<div className="space-y-5">
				{skills.map(({ name, value }) => (
					<div key={name}>
						<div className="flex justify-between mb-2">
							<span className="text-sm font-medium">{name}</span>
							<span className="text-sm text-muted-foreground">{value}%</span>
						</div>
						<Progress value={value} className="h-2" />
					</div>
				))}
			</div>
		</div>
	</div>
);
