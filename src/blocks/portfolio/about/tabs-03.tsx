import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Briefcase, Code, Lightbulb, Users } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header
					eyebrow="About Me"
					title="Designer, Developer, Creator"
					description="I wear many hats. Here's a deeper look at what I do."
				/>
				<ProfileCard
					src="https://picsum.photos/seed/tabs3/400/400"
					fallback="MK"
					name="Mike Kim"
					tabs={{
						developer: {
							title: 'As a Developer',
							description:
								'I build robust web applications using modern technologies. My focus is on clean code, performance, and developer experience.',
							highlights: [
								'10+ years experience',
								'Open source contributor',
								'50+ projects delivered',
							],
							tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
						},
						designer: {
							title: 'As a Designer',
							description:
								'I create user-centered designs that are both beautiful and functional. I believe design should solve problems.',
							highlights: [
								'UI/UX specialist',
								'Design system expert',
								'Accessibility advocate',
							],
							tech: ['Figma', 'Framer', 'Adobe XD', 'Principle'],
						},
						leader: {
							title: 'As a Leader',
							description:
								'I lead teams with empathy and clarity. Building great products starts with building great teams.',
							highlights: [
								'Managed teams of 15+',
								'Mentored 30+ developers',
								'Culture builder',
							],
							tech: ['Agile', 'Scrum', 'OKRs', 'Coaching'],
						},
						creator: {
							title: 'As a Creator',
							description:
								'I share knowledge through content creation. Teaching others is the best way to master something.',
							highlights: [
								'YouTube: 100K subs',
								'Blog: 50K readers',
								'Newsletter: 10K',
							],
							tech: ['Writing', 'Video', 'Speaking', 'Workshops'],
						},
					}}
					cta={{ label: 'Work With Me', href: '/contact', icon: ArrowUpRight }}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
	<div className="text-center mb-12">
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
		<p className="text-lg text-muted-foreground max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface TabItem {
	title: string;
	description: string;
	highlights: string[];
	tech: string[];
}

interface TabsData {
	developer: TabItem;
	designer: TabItem;
	leader: TabItem;
	creator: TabItem;
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
	tabs: TabsData;
	cta: CTAData;
}

const ProfileCard = ({ src, fallback, name, tabs, cta }: ProfileCardProps) => (
	<Card className="max-w-3xl mx-auto">
		<CardHeader className="text-center pb-0">
			<Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="text-2xl font-bold">{name}</h2>
		</CardHeader>
		<CardContent className="pt-6">
			<Tabs defaultValue="developer">
				<TabsList className="grid w-full grid-cols-4 mb-6">
					<TabsTrigger value="developer" className="gap-1">
						<Code className="size-4" />
						<span className="hidden @md:inline">Developer</span>
					</TabsTrigger>
					<TabsTrigger value="designer" className="gap-1">
						<Lightbulb className="size-4" />
						<span className="hidden @md:inline">Designer</span>
					</TabsTrigger>
					<TabsTrigger value="leader" className="gap-1">
						<Users className="size-4" />
						<span className="hidden @md:inline">Leader</span>
					</TabsTrigger>
					<TabsTrigger value="creator" className="gap-1">
						<Briefcase className="size-4" />
						<span className="hidden @md:inline">Creator</span>
					</TabsTrigger>
				</TabsList>
				{Object.entries(tabs).map(([key, data]) => (
					<TabsContent key={key} value={key}>
						<h3 className="text-lg font-semibold mb-2">{data.title}</h3>
						<p className="text-muted-foreground text-sm mb-4">
							{data.description}
						</p>
						<div className="space-y-2 mb-4">
							{data.highlights.map((highlight) => (
								<div
									key={highlight}
									className="flex items-center gap-2 text-sm"
								>
									<span className="size-1.5 rounded-full bg-primary" />
									{highlight}
								</div>
							))}
						</div>
						<Separator className="my-4" />
						<div className="flex flex-wrap gap-2">
							{data.tech.map((item) => (
								<Badge key={item} variant="outline">
									{item}
								</Badge>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
			<div className="text-center mt-8">
				<Button className="gap-2" asChild>
					<Link href={cta.href}>
						{cta.label}
						<cta.icon className="size-4" />
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);
