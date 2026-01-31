import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-md mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card9/400/400"
						fallback="RN"
						name="Rachel Nguyen"
						role="Data Scientist"
						tabs={{
							experience: [
								{
									role: 'Senior Data Scientist',
									company: 'Meta',
									period: '2021–Present',
								},
								{
									role: 'Data Scientist',
									company: 'Amazon',
									period: '2019–2021',
								},
								{
									role: 'ML Engineer',
									company: 'Startup',
									period: '2017–2019',
								},
							],
							education: [
								{
									degree: 'Ph.D. Computer Science',
									school: 'Stanford',
									year: '2017',
								},
								{ degree: 'B.S. Mathematics', school: 'MIT', year: '2013' },
							],
							awards: [
								{ title: 'Best Paper Award', org: 'NeurIPS', year: '2022' },
								{ title: 'ML Innovation Award', org: 'Google', year: '2020' },
							],
						}}
						cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
					/>
				</div>
			</div>
		</section>
	);
}

interface ExperienceItem {
	role: string;
	company: string;
	period: string;
}

interface EducationItem {
	degree: string;
	school: string;
	year: string;
}

interface AwardItem {
	title: string;
	org: string;
	year: string;
}

interface TabsData {
	experience: ExperienceItem[];
	education: EducationItem[];
	awards: AwardItem[];
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	tabs: TabsData;
	cta: CTAData;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	tabs,
	cta,
}: ProfileCardProps) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex items-center gap-4 mb-6">
				<Avatar className="size-16 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl bg-primary text-primary-foreground">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-primary">{role}</p>
				</div>
			</div>
			<Tabs defaultValue="experience" className="mb-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="experience" className="text-xs gap-1">
						<Briefcase className="size-3" />
						Work
					</TabsTrigger>
					<TabsTrigger value="education" className="text-xs gap-1">
						<GraduationCap className="size-3" />
						Edu
					</TabsTrigger>
					<TabsTrigger value="awards" className="text-xs gap-1">
						<Trophy className="size-3" />
						Awards
					</TabsTrigger>
				</TabsList>
				<TabsContent value="experience" className="mt-4 space-y-3">
					{tabs.experience.map((item, i) => (
						<div key={i} className="flex justify-between items-start">
							<div>
								<p className="text-sm font-medium">{item.role}</p>
								<p className="text-xs text-muted-foreground">{item.company}</p>
							</div>
							<Badge variant="secondary" className="text-xs">
								{item.period}
							</Badge>
						</div>
					))}
				</TabsContent>
				<TabsContent value="education" className="mt-4 space-y-3">
					{tabs.education.map((item, i) => (
						<div key={i} className="flex justify-between items-start">
							<div>
								<p className="text-sm font-medium">{item.degree}</p>
								<p className="text-xs text-muted-foreground">{item.school}</p>
							</div>
							<Badge variant="secondary" className="text-xs">
								{item.year}
							</Badge>
						</div>
					))}
				</TabsContent>
				<TabsContent value="awards" className="mt-4 space-y-3">
					{tabs.awards.map((item, i) => (
						<div key={i} className="flex justify-between items-start">
							<div>
								<p className="text-sm font-medium">{item.title}</p>
								<p className="text-xs text-muted-foreground">{item.org}</p>
							</div>
							<Badge variant="secondary" className="text-xs">
								{item.year}
							</Badge>
						</div>
					))}
				</TabsContent>
			</Tabs>
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
