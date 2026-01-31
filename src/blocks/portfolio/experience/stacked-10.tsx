import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Briefcase,
	Download,
	Mail,
	Calendar,
	MapPin,
	Linkedin,
	Github,
	Globe,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto">
					<ResumeHeader
						name="John Doe"
						title="Principal Software Engineer"
						email="john@example.com"
						location="San Francisco, CA"
						linkedin="linkedin.com/in/johndoe"
						github="github.com/johndoe"
						website="johndoe.dev"
						resumeUrl="/resume.pdf"
					/>

					<ResumeSection icon={Briefcase} title="Experience">
						<ResumeEntry
							title="Principal Engineer"
							subtitle="TechCorp"
							date="2023 - Present"
							bullets={[
								'Leading technical direction for platform engineering',
								'Managing architecture decisions across 5 product teams',
								'Shipped design system used by 200+ engineers',
							]}
						/>
						<ResumeEntry
							title="Staff Engineer"
							subtitle="StartupX"
							date="2021 - 2023"
							bullets={[
								'Built and scaled design system from ground up',
								'Led frontend platform initiatives',
								'Mentored 8 engineers across experience levels',
							]}
						/>
						<ResumeEntry
							title="Senior Engineer"
							subtitle="Meta"
							date="2019 - 2021"
							bullets={[
								'Developed Instagram Stories features',
								'Optimized performance for billions of users',
								'Led React Native performance improvements',
							]}
							isLast
						/>
					</ResumeSection>
				</div>
			</div>
		</section>
	);
}

interface ResumeHeaderProps {
	name: string;
	title: string;
	email: string;
	location: string;
	linkedin: string;
	github: string;
	website: string;
	resumeUrl: string;
}

const ResumeHeader = ({
	name,
	title,
	email,
	location,
	linkedin,
	github,
	website,
	resumeUrl,
}: ResumeHeaderProps) => (
	<Card className="mb-8">
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-col @md:flex-row @md:items-start justify-between gap-6">
				<div>
					<h1 className="text-3xl @md:text-4xl font-bold mb-1">{name}</h1>
					<p className="text-lg text-primary mb-4">{title}</p>
					<div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
						<span className="flex items-center gap-1">
							<Mail className="size-4" />
							{email}
						</span>
						<span className="flex items-center gap-1">
							<MapPin className="size-4" />
							{location}
						</span>
					</div>
					<div className="flex gap-3">
						<Link href={`https://${linkedin}`} target="_blank">
							<Badge variant="outline" className="gap-1">
								<Linkedin className="size-3" />
								LinkedIn
							</Badge>
						</Link>
						<Link href={`https://${github}`} target="_blank">
							<Badge variant="outline" className="gap-1">
								<Github className="size-3" />
								GitHub
							</Badge>
						</Link>
						<Link href={`https://${website}`} target="_blank">
							<Badge variant="outline" className="gap-1">
								<Globe className="size-3" />
								Website
							</Badge>
						</Link>
					</div>
				</div>
				<Button asChild>
					<Link href={resumeUrl} download>
						<Download className="size-4 mr-2" />
						Download PDF
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

interface ResumeSectionProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}

const ResumeSection = ({ icon: Icon, title, children }: ResumeSectionProps) => (
	<div className="mb-8">
		<div className="flex items-center gap-2 mb-6">
			<Icon className="size-5 text-primary" />
			<h2 className="text-lg font-bold">{title}</h2>
		</div>
		<div className="space-y-6 pl-7 border-l-2 border-border">{children}</div>
	</div>
);

interface ResumeEntryProps {
	title: string;
	subtitle: string;
	date: string;
	bullets: string[];
	isLast?: boolean;
}

const ResumeEntry = ({ title, subtitle, date, bullets }: ResumeEntryProps) => (
	<div className="relative">
		<div className="absolute -left-[calc(0.75rem+1px)] top-1 size-3 rounded-full bg-primary" />
		<div className="flex flex-col @sm:flex-row @sm:items-baseline justify-between gap-1 mb-2">
			<div>
				<h3 className="font-bold">{title}</h3>
				<p className="text-sm text-primary">{subtitle}</p>
			</div>
			<Badge variant="secondary" className="w-fit text-xs font-mono">
				<Calendar className="size-3 mr-1" />
				{date}
			</Badge>
		</div>
		<ul className="space-y-1 text-sm text-muted-foreground">
			{bullets.map((bullet, i) => (
				<li key={i} className="flex items-start gap-2">
					<span className="size-1.5 rounded-full bg-muted-foreground/50 mt-2 shrink-0" />
					{bullet}
				</li>
			))}
		</ul>
	</div>
);
