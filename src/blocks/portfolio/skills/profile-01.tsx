import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Tech Profile"
					title="Skills Summary"
					description="A complete overview of my technical profile"
				/>

				<ProfileCard
					name="Full Stack Developer"
					tagline="Building modern web experiences"
					yearsExp={8}
					topSkills={['React', 'TypeScript', 'Next.js', 'Node.js']}
					categories={[
						{ name: 'Frontend', percentage: 40 },
						{ name: 'Backend', percentage: 30 },
						{ name: 'DevOps', percentage: 20 },
						{ name: 'Design', percentage: 10 },
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

interface Category {
	name: string;
	percentage: number;
}

interface ProfileCardProps {
	name: string;
	tagline: string;
	yearsExp: number;
	topSkills: string[];
	categories: Category[];
}

const ProfileCard = ({
	name,
	tagline,
	yearsExp,
	topSkills,
	categories,
}: ProfileCardProps) => (
	<Card className="max-w-2xl mx-auto border-primary/30">
		<CardContent className="p-6 @md:p-8">
			<div className="text-center mb-8">
				<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
					<span className="text-3xl font-bold text-primary">{yearsExp}+</span>
				</div>
				<h3 className="text-2xl font-bold">{name}</h3>
				<p className="text-muted-foreground">{tagline}</p>
			</div>

			<div className="mb-8">
				<h4 className="font-semibold mb-3 text-center">Top Skills</h4>
				<div className="flex flex-wrap justify-center gap-2">
					{topSkills.map((skill, i) => (
						<Badge key={i} variant="secondary" className="text-sm px-4 py-1">
							{skill}
						</Badge>
					))}
				</div>
			</div>

			<div>
				<h4 className="font-semibold mb-4 text-center">Focus Distribution</h4>
				<div className="flex h-4 rounded-full overflow-hidden">
					{categories.map(({ name, percentage }, i) => {
						const colors = [
							'bg-blue-500',
							'bg-green-500',
							'bg-orange-500',
							'bg-pink-500',
						];
						return (
							<div
								key={i}
								className={`${colors[i]} first:rounded-l-full last:rounded-r-full`}
								style={{ width: `${percentage}%` }}
								title={`${name}: ${percentage}%`}
							/>
						);
					})}
				</div>
				<div className="flex justify-between mt-2 text-xs text-muted-foreground">
					{categories.map(({ name, percentage }, i) => (
						<span key={i}>
							{name} {percentage}%
						</span>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);
