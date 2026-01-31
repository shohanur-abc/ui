import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-2xl mx-auto space-y-12">
					<ProfileSection
						src="https://picsum.photos/seed/stack3/400/400"
						fallback="MK"
						name="Mike Kim"
						role="Full-Stack Developer"
						status="Available for hire"
						bio="I build web applications that are fast, accessible, and delightful to use. With 8 years of experience, I've shipped products used by millions."
					/>
					<Separator />
					<SkillsSection
						title="Technical Skills"
						categories={[
							{
								name: 'Frontend',
								skills: [
									{ name: 'React / Next.js', level: 95 },
									{ name: 'TypeScript', level: 90 },
									{ name: 'Tailwind CSS', level: 92 },
								],
							},
							{
								name: 'Backend',
								skills: [
									{ name: 'Node.js', level: 88 },
									{ name: 'Python', level: 75 },
									{ name: 'PostgreSQL', level: 85 },
								],
							},
							{
								name: 'Tools',
								skills: [
									{ name: 'Git', level: 95 },
									{ name: 'Docker', level: 80 },
									{ name: 'AWS', level: 78 },
								],
							},
						]}
					/>
					<Separator />
					<ServicesSection
						title="What I Offer"
						services={[
							'Custom web application development',
							'API design and development',
							'Performance optimization',
							'Code review and consulting',
							'Technical architecture planning',
							'Team mentoring and training',
						]}
					/>
					<CTASection
						title="Ready to Build Something Great?"
						description="Let's discuss your project and find the best solution."
						cta={{
							label: 'Start a Conversation',
							href: '/contact',
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
	status: string;
	bio: string;
}

const ProfileSection = ({
	src,
	fallback,
	name,
	role,
	status,
	bio,
}: ProfileSectionProps) => (
	<div className="flex flex-col @md:flex-row gap-6 items-start">
		<Avatar className="size-24 ring-2 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<h1 className="text-2xl font-bold mb-1">{name}</h1>
			<p className="text-primary font-medium mb-2">{role}</p>
			<Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
				<span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
				{status}
			</Badge>
			<p className="text-muted-foreground">{bio}</p>
		</div>
	</div>
);

interface SkillItem {
	name: string;
	level: number;
}

interface SkillCategory {
	name: string;
	skills: SkillItem[];
}

interface SkillsSectionProps {
	title: string;
	categories: SkillCategory[];
}

const SkillsSection = ({ title, categories }: SkillsSectionProps) => (
	<div>
		<h2 className="text-xl font-bold mb-6">{title}</h2>
		<div className="space-y-8">
			{categories.map((category) => (
				<div key={category.name}>
					<h3 className="text-sm font-medium text-muted-foreground mb-4">
						{category.name}
					</h3>
					<div className="space-y-4">
						{category.skills.map((skill) => (
							<div key={skill.name}>
								<div className="flex justify-between mb-1">
									<span className="text-sm font-medium">{skill.name}</span>
									<span className="text-sm text-muted-foreground">
										{skill.level}%
									</span>
								</div>
								<Progress value={skill.level} className="h-2" />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</div>
);

interface ServicesSectionProps {
	title: string;
	services: string[];
}

const ServicesSection = ({ title, services }: ServicesSectionProps) => (
	<div>
		<h2 className="text-xl font-bold mb-6">{title}</h2>
		<div className="grid @sm:grid-cols-2 gap-3">
			{services.map((service) => (
				<div key={service} className="flex items-center gap-2 text-sm">
					<CheckCircle2 className="size-5 text-green-500 shrink-0" />
					<span>{service}</span>
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
	title: string;
	description: string;
	cta: CTAData;
}

const CTASection = ({ title, description, cta }: CTASectionProps) => (
	<div className="p-8 rounded-xl border bg-card">
		<h2 className="text-xl font-bold mb-2">{title}</h2>
		<p className="text-muted-foreground mb-6">{description}</p>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
