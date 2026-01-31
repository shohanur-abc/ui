import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Code2,
	Database,
	Globe,
	Layers,
	Server,
	Smartphone,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Tech Stack"
					title="Zigzag Skills"
					subtitle="Alternating layout showcasing my expertise"
				/>

				<ZigzagLayout
					items={[
						{
							icon: Code2,
							title: 'Frontend Development',
							description:
								'Creating responsive, accessible web applications with React and Next.js. Focus on performance and user experience.',
							skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
						},
						{
							icon: Server,
							title: 'Backend Development',
							description:
								'Building scalable APIs and server-side applications with Node.js and Python. RESTful and GraphQL expertise.',
							skills: ['Node.js', 'Python', 'GraphQL', 'REST APIs'],
						},
						{
							icon: Database,
							title: 'Database Architecture',
							description:
								'Designing efficient data models and implementing optimized queries across SQL and NoSQL databases.',
							skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
						},
						{
							icon: Layers,
							title: 'Cloud & DevOps',
							description:
								'Deploying and managing applications on cloud platforms with containerization and CI/CD pipelines.',
							skills: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface SectionHeaderProps {
	badge: string;
	title: string;
	subtitle: string;
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
}

const ZigzagLayout = ({ items }: { items: SkillItem[] }) => (
	<div className="max-w-5xl mx-auto space-y-8 @md:space-y-12">
		{items.map((item, i) => (
			<ZigzagRow key={i} {...item} reverse={i % 2 === 1} />
		))}
	</div>
);

interface ZigzagRowProps extends SkillItem {
	reverse: boolean;
}

const ZigzagRow = ({
	icon: Icon,
	title,
	description,
	skills,
	reverse,
}: ZigzagRowProps) => (
	<div
		className={`flex flex-col @md:flex-row items-center gap-6 @md:gap-10 ${reverse ? '@md:flex-row-reverse' : ''}`}
	>
		<div className="w-full @md:w-1/3 flex justify-center">
			<div className="size-32 @md:size-40 rounded-2xl bg-primary/10 flex items-center justify-center">
				<Icon className="size-16 @md:size-20 text-primary" />
			</div>
		</div>
		<Card className="w-full @md:w-2/3 group hover:border-primary/50 transition-all">
			<CardContent className="p-6 @md:p-8">
				<h3 className="text-xl @md:text-2xl font-bold mb-3">{title}</h3>
				<p className="text-muted-foreground mb-5">{description}</p>
				<div className="flex flex-wrap gap-2">
					{skills.map((skill, i) => (
						<Badge key={i} variant="secondary">
							{skill}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);
