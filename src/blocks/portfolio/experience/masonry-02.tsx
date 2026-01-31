import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Code} text="Skills" />
					<Title text="Technical Stack" />
					<Description text="Technologies mastered across my career." />
				</div>

				<div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4 gap-4 space-y-4">
					<SkillCategory
						title="Frontend"
						skills={[
							{ name: 'React', level: 95 },
							{ name: 'TypeScript', level: 92 },
							{ name: 'Next.js', level: 90 },
						]}
					/>
					<CompanyTile
						logo="https://github.com/google.png"
						initials="G"
						name="Google"
					/>
					<SkillCategory
						title="Backend"
						skills={[
							{ name: 'Node.js', level: 88 },
							{ name: 'Python', level: 75 },
						]}
					/>
					<StatTile value="500+" label="Components" />
					<SkillCategory
						title="Cloud"
						skills={[
							{ name: 'AWS', level: 80 },
							{ name: 'Docker', level: 85 },
							{ name: 'K8s', level: 75 },
						]}
					/>
					<CompanyTile
						logo="https://github.com/facebook.png"
						initials="M"
						name="Meta"
					/>
					<StatTile value="25+" label="Mentored" />
					<SkillCategory
						title="Design"
						skills={[
							{ name: 'Figma', level: 75 },
							{ name: 'Design Systems', level: 90 },
						]}
					/>
					<CompanyTile
						logo="https://github.com/stripe.png"
						initials="S"
						name="Stripe"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface Skill {
	name: string;
	level: number;
}

interface SkillCategoryProps {
	title: string;
	skills: Skill[];
}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => (
	<Card className="break-inside-avoid">
		<CardContent className="p-5">
			<h4 className="font-bold mb-4">{title}</h4>
			<div className="space-y-3">
				{skills.map(({ name, level }, i) => (
					<div key={i}>
						<div className="flex justify-between text-sm mb-1">
							<span>{name}</span>
							<span className="text-muted-foreground">{level}%</span>
						</div>
						<Progress value={level} className="h-1.5" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface CompanyTileProps {
	logo: string;
	initials: string;
	name: string;
}

const CompanyTile = ({ logo, initials, name }: CompanyTileProps) => (
	<Card className="break-inside-avoid">
		<CardContent className="p-5 flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={logo} alt={name} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<span className="font-medium">{name}</span>
		</CardContent>
	</Card>
);

interface StatTileProps {
	value: string;
	label: string;
}

const StatTile = ({ value, label }: StatTileProps) => (
	<Card className="break-inside-avoid bg-primary text-primary-foreground">
		<CardContent className="p-5 text-center">
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs opacity-80">{label}</p>
		</CardContent>
	</Card>
);
