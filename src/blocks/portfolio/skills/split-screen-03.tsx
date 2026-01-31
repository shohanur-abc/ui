import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Blocks,
	Braces,
	Cloud,
	Database,
	Server,
	Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-5 gap-10 @xl:gap-16 items-start">
					<LeftColumn
						image={{
							src: 'https://picsum.photos/seed/skills-portrait/600/800',
							alt: 'Developer portrait',
						}}
						stats={[
							{ value: '8+', label: 'Years' },
							{ value: '50+', label: 'Projects' },
							{ value: '30+', label: 'Skills' },
						]}
					/>

					<RightColumn
						badge="Skill Proficiency"
						title="Technical Expertise"
						description="A deep dive into my core competencies and the technologies I work with daily."
						skills={[
							{
								icon: Braces,
								name: 'Frontend Development',
								level: 95,
								details: 'React, Next.js, TypeScript',
							},
							{
								icon: Server,
								name: 'Backend Development',
								level: 88,
								details: 'Node.js, Python, Go',
							},
							{
								icon: Database,
								name: 'Database Design',
								level: 85,
								details: 'PostgreSQL, MongoDB, Redis',
							},
							{
								icon: Cloud,
								name: 'Cloud & DevOps',
								level: 82,
								details: 'AWS, Docker, Kubernetes',
							},
							{
								icon: Smartphone,
								name: 'Mobile Development',
								level: 78,
								details: 'React Native, Flutter',
							},
							{
								icon: Blocks,
								name: 'System Design',
								level: 80,
								details: 'Microservices, APIs',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface LeftColumnProps {
	image: { src: string; alt: string };
	stats: { value: string; label: string }[];
}

const LeftColumn = ({ image, stats }: LeftColumnProps) => (
	<div className="@3xl:col-span-2">
		<Card className="overflow-hidden py-0">
			<CardContent className="p-0">
				<div className="relative aspect-[3/4]">
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
					<div className="absolute bottom-0 left-0 right-0 p-6">
						<div className="flex justify-around">
							{stats.map(({ value, label }, i) => (
								<div key={i} className="text-center text-white">
									<p className="text-2xl @md:text-3xl font-bold">{value}</p>
									<p className="text-xs text-white/70">{label}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: number;
	details: string;
}

interface RightColumnProps {
	badge: string;
	title: string;
	description: string;
	skills: SkillItem[];
}

const RightColumn = ({
	badge,
	title,
	description,
	skills,
}: RightColumnProps) => (
	<div className="@3xl:col-span-3">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-8 @md:mb-10">
			{description}
		</p>

		<div className="space-y-5">
			{skills.map((skill, i) => (
				<SkillRow key={i} {...skill} />
			))}
		</div>
	</div>
);

const SkillRow = ({ icon: Icon, name, level, details }: SkillItem) => (
	<div className="group">
		<div className="flex items-center gap-4 mb-2">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<h4 className="font-semibold">{name}</h4>
					<span className="text-sm font-medium text-primary">{level}%</span>
				</div>
				<p className="text-xs text-muted-foreground">{details}</p>
			</div>
		</div>
		<Progress value={level} className="h-1.5 ml-14" />
	</div>
);
