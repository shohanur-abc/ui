import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Code, Palette, Server, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<ImageSection
						src="https://picsum.photos/seed/tabs2/800/900"
						alt="Sarah Chen"
					/>
					<ContentSection
						name="Sarah Chen"
						role="Full-Stack Developer"
						tabs={{
							frontend: {
								description:
									'Creating beautiful, responsive, and accessible user interfaces.',
								skills: [
									{ name: 'React/Next.js', level: 95 },
									{ name: 'TypeScript', level: 90 },
									{ name: 'Tailwind CSS', level: 92 },
									{ name: 'Vue.js', level: 75 },
								],
							},
							backend: {
								description:
									'Building scalable and secure server-side applications.',
								skills: [
									{ name: 'Node.js', level: 90 },
									{ name: 'Python', level: 85 },
									{ name: 'PostgreSQL', level: 88 },
									{ name: 'GraphQL', level: 80 },
								],
							},
							design: {
								description:
									'Crafting intuitive and delightful user experiences.',
								skills: [
									{ name: 'Figma', level: 88 },
									{ name: 'UI Design', level: 85 },
									{ name: 'Prototyping', level: 82 },
									{ name: 'Design Systems', level: 78 },
								],
							},
							tools: {
								description: 'Using the right tools to ship quality code fast.',
								skills: [
									{ name: 'Git', level: 95 },
									{ name: 'Docker', level: 85 },
									{ name: 'AWS', level: 80 },
									{ name: 'CI/CD', level: 82 },
								],
							},
						}}
						cta={{
							label: 'View Projects',
							href: '/projects',
							icon: ArrowRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface ImageSectionProps {
	src: string;
	alt: string;
}

const ImageSection = ({ src, alt }: ImageSectionProps) => (
	<div className="relative aspect-[4/5] rounded-xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

interface SkillItem {
	name: string;
	level: number;
}

interface TabData {
	description: string;
	skills: SkillItem[];
}

interface TabsData {
	frontend: TabData;
	backend: TabData;
	design: TabData;
	tools: TabData;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	name: string;
	role: string;
	tabs: TabsData;
	cta: CTAData;
}

const ContentSection = ({ name, role, tabs, cta }: ContentSectionProps) => (
	<div>
		<Badge variant="secondary" className="mb-4">
			Skills & Expertise
		</Badge>
		<h1 className="text-3xl @lg:text-4xl font-bold mb-2">{name}</h1>
		<p className="text-primary font-medium mb-6">{role}</p>
		<Tabs defaultValue="frontend" className="mb-8">
			<TabsList className="grid w-full grid-cols-4 mb-6">
				<TabsTrigger value="frontend" className="gap-1">
					<Code className="size-4" />
					<span className="hidden @sm:inline">Frontend</span>
				</TabsTrigger>
				<TabsTrigger value="backend" className="gap-1">
					<Server className="size-4" />
					<span className="hidden @sm:inline">Backend</span>
				</TabsTrigger>
				<TabsTrigger value="design" className="gap-1">
					<Palette className="size-4" />
					<span className="hidden @sm:inline">Design</span>
				</TabsTrigger>
				<TabsTrigger value="tools" className="gap-1">
					<Wrench className="size-4" />
					<span className="hidden @sm:inline">Tools</span>
				</TabsTrigger>
			</TabsList>
			{Object.entries(tabs).map(([key, data]) => (
				<TabsContent key={key} value={key}>
					<Card>
						<CardContent className="p-6">
							<p className="text-muted-foreground text-sm mb-6">
								{data.description}
							</p>
							<div className="space-y-4">
								{data.skills.map((skill) => (
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
						</CardContent>
					</Card>
				</TabsContent>
			))}
		</Tabs>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
