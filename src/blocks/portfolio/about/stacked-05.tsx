import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Briefcase,
	Calendar,
	ChevronRight,
	GraduationCap,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto space-y-12">
					<ProfileSection
						src="https://picsum.photos/seed/stack5/400/400"
						fallback="DL"
						name="David Lee"
						role="Engineering Manager"
						company="at Netflix"
						bio="Building and scaling engineering teams. 15+ years in tech, from IC to management."
					/>
					<Separator />
					<ExperienceSection
						title="Work Experience"
						icon={Briefcase}
						items={[
							{
								title: 'Engineering Manager',
								org: 'Netflix',
								period: '2021 - Present',
								description:
									'Leading a team of 15 engineers building streaming infrastructure.',
							},
							{
								title: 'Senior Staff Engineer',
								org: 'Google',
								period: '2017 - 2021',
								description:
									'Tech lead for Cloud Storage. Designed systems handling petabytes of data.',
							},
							{
								title: 'Staff Engineer',
								org: 'Amazon',
								period: '2014 - 2017',
								description:
									'Core contributor to AWS S3. Built features used by millions.',
							},
							{
								title: 'Senior Software Engineer',
								org: 'Microsoft',
								period: '2010 - 2014',
								description:
									'Worked on Azure infrastructure and developer tools.',
							},
						]}
					/>
					<Separator />
					<EducationSection
						title="Education"
						icon={GraduationCap}
						items={[
							{
								degree: 'M.S. Computer Science',
								school: 'Stanford University',
								year: '2010',
							},
							{
								degree: 'B.S. Computer Engineering',
								school: 'UC Berkeley',
								year: '2008',
							},
						]}
					/>
					<Separator />
					<LeadershipSection
						title="Leadership Philosophy"
						points={[
							'People first: Great products come from happy, empowered teams.',
							'Technical excellence: Stay hands-on and maintain high standards.',
							'Clear communication: Over-communicate context and decisions.',
							'Continuous growth: Invest in learning and mentorship.',
						]}
					/>
					<CTASection
						cta={{
							label: 'Connect on LinkedIn',
							href: 'https://linkedin.com',
							icon: ArrowRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileSectionProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	company: string;
	bio: string;
}

const ProfileSection = ({
	src,
	fallback,
	name,
	role,
	company,
	bio,
}: ProfileSectionProps) => (
	<div className="text-center">
		<Avatar className="size-28 mx-auto mb-6 ring-4 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-3xl bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<h1 className="text-3xl font-bold mb-2">{name}</h1>
		<p className="text-xl text-primary font-medium mb-1">{role}</p>
		<p className="text-muted-foreground mb-4">{company}</p>
		<p className="text-muted-foreground max-w-lg mx-auto">{bio}</p>
	</div>
);

interface ExperienceItem {
	title: string;
	org: string;
	period: string;
	description: string;
}

interface ExperienceSectionProps {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	items: ExperienceItem[];
}

const ExperienceSection = ({
	title,
	icon: Icon,
	items,
}: ExperienceSectionProps) => (
	<div>
		<div className="flex items-center gap-2 mb-6">
			<Icon className="size-5 text-primary" />
			<h2 className="text-xl font-bold">{title}</h2>
		</div>
		<div className="space-y-6">
			{items.map((item, i) => (
				<Card key={i}>
					<CardContent className="p-6">
						<div className="flex flex-col @sm:flex-row @sm:items-start justify-between gap-2 mb-2">
							<div>
								<h3 className="font-semibold">{item.title}</h3>
								<p className="text-sm text-primary">{item.org}</p>
							</div>
							<Badge variant="secondary" className="w-fit">
								<Calendar className="size-3 mr-1" />
								{item.period}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{item.description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

interface EducationItem {
	degree: string;
	school: string;
	year: string;
}

interface EducationSectionProps {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	items: EducationItem[];
}

const EducationSection = ({
	title,
	icon: Icon,
	items,
}: EducationSectionProps) => (
	<div>
		<div className="flex items-center gap-2 mb-6">
			<Icon className="size-5 text-primary" />
			<h2 className="text-xl font-bold">{title}</h2>
		</div>
		<div className="grid @md:grid-cols-2 gap-4">
			{items.map((item, i) => (
				<Card key={i}>
					<CardContent className="p-6">
						<h3 className="font-semibold mb-1">{item.degree}</h3>
						<p className="text-sm text-muted-foreground mb-2">{item.school}</p>
						<Badge variant="outline">{item.year}</Badge>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

interface LeadershipSectionProps {
	title: string;
	points: string[];
}

const LeadershipSection = ({ title, points }: LeadershipSectionProps) => (
	<div>
		<h2 className="text-xl font-bold mb-6">{title}</h2>
		<div className="space-y-3">
			{points.map((point, i) => (
				<div key={i} className="flex items-start gap-3">
					<ChevronRight className="size-5 text-primary mt-0.5 shrink-0" />
					<p className="text-muted-foreground">{point}</p>
				</div>
			))}
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CTASectionProps {
	cta: CTAData;
}

const CTASection = ({ cta }: CTASectionProps) => (
	<div className="text-center">
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
