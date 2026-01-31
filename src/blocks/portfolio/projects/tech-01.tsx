import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import {
	ArrowUpRight,
	Code,
	Terminal,
	FileCode2,
	Wrench,
	Database,
	Cloud,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Code} text="Tech Stack" />
					<Title text="By Technology" />
					<Description text="Projects organized by the technologies and frameworks used." />
				</div>

				<TechGrid
					technologies={[
						{
							name: 'React',
							icon: FileCode2,
							color: '#61DAFB',
							projectCount: 24,
							description: 'Component-based web applications',
							projects: [
								'Dashboard Suite',
								'E-Commerce Platform',
								'SaaS Analytics',
							],
							href: '#react',
						},
						{
							name: 'Next.js',
							icon: Terminal,
							color: '#FFFFFF',
							projectCount: 18,
							description: 'Full-stack React applications',
							projects: ['Marketing Sites', 'Web Apps', 'API Routes'],
							href: '#nextjs',
						},
						{
							name: 'Node.js',
							icon: Code,
							color: '#68A063',
							projectCount: 15,
							description: 'Backend services and APIs',
							projects: ['REST APIs', 'GraphQL', 'Microservices'],
							href: '#nodejs',
						},
						{
							name: 'TypeScript',
							icon: FileCode2,
							color: '#3178C6',
							projectCount: 32,
							description: 'Type-safe JavaScript development',
							projects: ['Enterprise Apps', 'Libraries', 'SDKs'],
							href: '#typescript',
						},
						{
							name: 'PostgreSQL',
							icon: Database,
							color: '#4169E1',
							projectCount: 12,
							description: 'Relational database solutions',
							projects: ['Data Platforms', 'Analytics', 'CRM'],
							href: '#postgresql',
						},
						{
							name: 'AWS',
							icon: Cloud,
							color: '#FF9900',
							projectCount: 20,
							description: 'Cloud infrastructure & deployment',
							projects: ['Serverless', 'Container', 'CDN'],
							href: '#aws',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface Technology {
	name: string;
	icon: ComponentType<{ className?: string }>;
	color: string;
	projectCount: number;
	description: string;
	projects: string[];
	href: string;
}

const TechGrid = ({ technologies }: { technologies: Technology[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{technologies.map(
			(
				{ name, icon: Icon, color, projectCount, description, projects, href },
				i,
			) => (
				<Card
					key={i}
					className="group border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20"
				>
					<CardHeader>
						<div className="flex items-center justify-between mb-2">
							<div
								className="size-12 rounded-xl flex items-center justify-center"
								style={{ backgroundColor: `${color}20` }}
							>
								<Icon className="size-6" style={{ color }} />
							</div>
							<Badge variant="secondary">{projectCount} projects</Badge>
						</div>
						<CardTitle className="text-lg group-hover:text-primary transition-colors">
							{name}
						</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>

					<CardContent>
						{/* Sample projects */}
						<div className="space-y-2 mb-4">
							{projects.map((project, j) => (
								<div key={j} className="flex items-center gap-2 text-sm">
									<div
										className="size-1.5 rounded-full"
										style={{ backgroundColor: color }}
									/>
									<span className="text-muted-foreground">{project}</span>
								</div>
							))}
						</div>

						<Button variant="outline" className="w-full gap-2" asChild>
							<Link href={href}>
								View {name} Projects <ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
