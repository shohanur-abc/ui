import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Braces, Cloud, Database, Globe, Server, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Hex Grid"
					title="Skill Honeycomb"
					description="Interconnected expertise areas"
				/>

				<HexGrid
					skills={[
						{ icon: Braces, name: 'TypeScript', level: 95 },
						{ icon: Globe, name: 'React', level: 95 },
						{ icon: Server, name: 'Node.js', level: 88 },
						{ icon: Database, name: 'PostgreSQL', level: 85 },
						{ icon: Cloud, name: 'AWS', level: 82 },
						{ icon: Shield, name: 'Security', level: 78 },
					]}
				/>
			</div>
		</section>
	);
}

interface TitleSectionProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface Skill {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: number;
}

const HexGrid = ({ skills }: { skills: Skill[] }) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6 max-w-4xl mx-auto">
		{skills.map((skill, i) => (
			<HexCard key={i} {...skill} />
		))}
	</div>
);

const HexCard = ({ icon: Icon, name, level }: Skill) => (
	<Card className="group hover:border-primary/50 transition-all w-32 @md:w-40 aspect-[1/1.15] clip-hexagon">
		<CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
			<div className="size-10 @md:size-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
				<Icon className="size-5 @md:size-6 text-primary" />
			</div>
			<h4 className="font-semibold text-sm mb-1">{name}</h4>
			<Badge variant="secondary" className="text-xs">
				{level}%
			</Badge>
		</CardContent>
	</Card>
);
