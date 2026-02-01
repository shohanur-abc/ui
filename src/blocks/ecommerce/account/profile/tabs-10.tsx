import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Briefcase,
	Calendar,
	ChevronRight,
	Clock,
	Download,
	ExternalLink,
	FileText,
	Github,
	Globe,
	GraduationCap,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Star,
	Twitter,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const ResumeHeader = ({
	src,
	fallback,
	name,
	title,
	location,
	email,
	phone,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
}) => (
	<div className="flex flex-col @md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
		<Avatar className="size-28 ring-4 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-3xl">{fallback}</AvatarFallback>
		</Avatar>
		<div className="text-center @md:text-left flex-1">
			<h1 className="text-3xl font-bold">{name}</h1>
			<p className="text-xl text-muted-foreground">{title}</p>
			<div className="flex flex-wrap items-center justify-center @md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<MapPin className="size-4" />
					{location}
				</div>
				<div className="flex items-center gap-1">
					<Mail className="size-4" />
					{email}
				</div>
				<div className="flex items-center gap-1">
					<Phone className="size-4" />
					{phone}
				</div>
			</div>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" className="gap-2">
				<Download className="size-4" />
				Download CV
			</Button>
			<Button className="gap-2">
				<Mail className="size-4" />
				Contact
			</Button>
		</div>
	</div>
);

const ExperienceTab = ({
	experiences,
}: {
	experiences: {
		company: string;
		logo: string;
		role: string;
		period: string;
		location: string;
		description: string;
		skills: string[];
	}[];
}) => (
	<div className="space-y-4">
		{experiences.map((exp, i) => (
			<Card key={i}>
				<CardContent className="p-6">
					<div className="flex flex-col @sm:flex-row gap-4">
						<Avatar className="size-14 rounded-lg shrink-0">
							<AvatarImage src={exp.logo} alt={exp.company} />
							<AvatarFallback className="rounded-lg">
								{exp.company[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between">
								<div>
									<h4 className="font-semibold">{exp.role}</h4>
									<p className="text-muted-foreground">{exp.company}</p>
								</div>
								<div className="text-sm text-muted-foreground @md:text-right">
									<p>{exp.period}</p>
									<p>{exp.location}</p>
								</div>
							</div>
							<p className="text-sm mt-3">{exp.description}</p>
							<div className="flex flex-wrap gap-2 mt-3">
								{exp.skills.map((skill, j) => (
									<Badge key={j} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const EducationTab = ({
	education,
}: {
	education: {
		school: string;
		logo: string;
		degree: string;
		field: string;
		period: string;
		gpa?: string;
		achievements?: string[];
	}[];
}) => (
	<div className="space-y-4">
		{education.map((edu, i) => (
			<Card key={i}>
				<CardContent className="p-6">
					<div className="flex flex-col @sm:flex-row gap-4">
						<Avatar className="size-14 rounded-lg shrink-0">
							<AvatarImage src={edu.logo} alt={edu.school} />
							<AvatarFallback className="rounded-lg">
								{edu.school[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between">
								<div>
									<h4 className="font-semibold">{edu.degree}</h4>
									<p className="text-muted-foreground">{edu.school}</p>
								</div>
								<div className="text-sm text-muted-foreground">
									<p>{edu.period}</p>
								</div>
							</div>
							<p className="text-sm text-muted-foreground mt-1">{edu.field}</p>
							{edu.gpa && <p className="text-sm mt-2">GPA: {edu.gpa}</p>}
							{edu.achievements && (
								<ul className="mt-2 space-y-1">
									{edu.achievements.map((ach, j) => (
										<li key={j} className="text-sm flex items-start gap-2">
											<Star className="size-4 text-amber-500 shrink-0 mt-0.5" />
											{ach}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const SkillsTab = ({
	skillCategories,
}: {
	skillCategories: {
		category: string;
		skills: { name: string; level: number }[];
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-6">
		{skillCategories.map((cat, i) => (
			<Card key={i}>
				<CardHeader className="pb-3">
					<h3 className="font-semibold">{cat.category}</h3>
				</CardHeader>
				<CardContent className="space-y-4">
					{cat.skills.map((skill, j) => (
						<div key={j} className="space-y-1">
							<div className="flex justify-between text-sm">
								<span>{skill.name}</span>
								<span className="text-muted-foreground">{skill.level}%</span>
							</div>
							<Progress value={skill.level} className="h-2" />
						</div>
					))}
				</CardContent>
			</Card>
		))}
	</div>
);

const ProjectsTab = ({
	projects,
}: {
	projects: {
		name: string;
		description: string;
		image: string;
		technologies: string[];
		links: { label: string; href: string }[];
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{projects.map((project, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="aspect-video rounded-lg bg-muted overflow-hidden mb-4">
						<img
							src={project.image}
							alt={project.name}
							className="w-full h-full object-cover"
						/>
					</div>
					<h4 className="font-semibold">{project.name}</h4>
					<p className="text-sm text-muted-foreground mt-1">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-2 mt-3">
						{project.technologies.map((tech, j) => (
							<Badge key={j} variant="secondary">
								{tech}
							</Badge>
						))}
					</div>
					<div className="flex gap-2 mt-4">
						{project.links.map((link, j) => (
							<Button key={j} variant="outline" size="sm" asChild>
								<a href={link.href}>
									{link.label}
									<ExternalLink className="size-3 ml-1" />
								</a>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const CertificationsTab = ({
	certifications,
}: {
	certifications: {
		name: string;
		issuer: string;
		date: string;
		credentialId: string;
		logo: string;
	}[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{certifications.map((cert, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex items-start gap-4">
						<Avatar className="size-12 rounded-lg shrink-0">
							<AvatarImage src={cert.logo} alt={cert.issuer} />
							<AvatarFallback className="rounded-lg">
								{cert.issuer[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<h4 className="font-semibold">{cert.name}</h4>
							<p className="text-sm text-muted-foreground">{cert.issuer}</p>
							<p className="text-sm text-muted-foreground">
								Issued {cert.date}
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								ID: {cert.credentialId}
							</p>
						</div>
						<Button variant="outline" size="sm">
							<FileText className="size-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			name: 'James Davidson',
			title: 'Senior Software Engineer',
			location: 'San Francisco, CA',
			email: 'james.d@example.com',
			phone: '+1 (555) 123-4567',
		},
		experiences: [
			{
				company: 'TechCorp Inc.',
				logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
				role: 'Senior Software Engineer',
				period: 'Jan 2022 - Present',
				location: 'San Francisco, CA',
				description:
					'Lead developer for the core platform team. Architected and implemented microservices infrastructure serving 1M+ users.',
				skills: ['React', 'Node.js', 'AWS', 'Kubernetes'],
			},
			{
				company: 'StartupXYZ',
				logo: 'https://images.unsplash.com/photo-1572021335469-31706a17ber?w=100',
				role: 'Full Stack Developer',
				period: 'Jun 2019 - Dec 2021',
				location: 'Remote',
				description:
					'Built and maintained multiple client-facing applications. Reduced page load time by 40% through optimization.',
				skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
			},
		],
		education: [
			{
				school: 'Stanford University',
				logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100',
				degree: 'Master of Science',
				field: 'Computer Science',
				period: '2017 - 2019',
				gpa: '3.9/4.0',
				achievements: ["Dean's List", 'Research Assistant'],
			},
			{
				school: 'UC Berkeley',
				logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100',
				degree: 'Bachelor of Science',
				field: 'Computer Science',
				period: '2013 - 2017',
			},
		],
		skillCategories: [
			{
				category: 'Frontend',
				skills: [
					{ name: 'React', level: 95 },
					{ name: 'TypeScript', level: 90 },
					{ name: 'Next.js', level: 85 },
				],
			},
			{
				category: 'Backend',
				skills: [
					{ name: 'Node.js', level: 90 },
					{ name: 'Python', level: 80 },
					{ name: 'Go', level: 70 },
				],
			},
		],
		projects: [
			{
				name: 'E-commerce Platform',
				description:
					'Full-stack e-commerce solution with real-time inventory management',
				image:
					'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
				technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
				links: [
					{ label: 'Live', href: '#' },
					{ label: 'GitHub', href: '#' },
				],
			},
			{
				name: 'AI Chat Assistant',
				description:
					'GPT-powered customer support chatbot with knowledge base integration',
				image:
					'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
				technologies: ['Python', 'OpenAI', 'FastAPI'],
				links: [{ label: 'Demo', href: '#' }],
			},
		],
		certifications: [
			{
				name: 'AWS Solutions Architect',
				issuer: 'Amazon Web Services',
				date: 'Mar 2023',
				credentialId: 'AWS-SAA-001',
				logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
			},
			{
				name: 'Google Cloud Professional',
				issuer: 'Google',
				date: 'Jan 2023',
				credentialId: 'GCP-PCA-002',
				logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<ResumeHeader {...profileData.header} />
				<Tabs defaultValue="experience" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="experience" className="gap-2">
							<Briefcase className="size-4" />
							Experience
						</TabsTrigger>
						<TabsTrigger value="education" className="gap-2">
							<GraduationCap className="size-4" />
							Education
						</TabsTrigger>
						<TabsTrigger value="skills" className="gap-2">
							<Award className="size-4" />
							Skills
						</TabsTrigger>
						<TabsTrigger value="projects" className="gap-2">
							<Globe className="size-4" />
							Projects
						</TabsTrigger>
						<TabsTrigger value="certifications" className="gap-2">
							<FileText className="size-4" />
							Certifications
						</TabsTrigger>
					</TabsList>
					<TabsContent value="experience" className="mt-6">
						<ExperienceTab experiences={profileData.experiences} />
					</TabsContent>
					<TabsContent value="education" className="mt-6">
						<EducationTab education={profileData.education} />
					</TabsContent>
					<TabsContent value="skills" className="mt-6">
						<SkillsTab skillCategories={profileData.skillCategories} />
					</TabsContent>
					<TabsContent value="projects" className="mt-6">
						<ProjectsTab projects={profileData.projects} />
					</TabsContent>
					<TabsContent value="certifications" className="mt-6">
						<CertificationsTab certifications={profileData.certifications} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
