import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={GraduationCap} text="Education" />
					<Title text="Academic Background" />
					<Description text="My educational journey and academic achievements." />
				</div>

				<div className="max-w-3xl space-y-6">
					<EducationCard
						degree="Master of Science"
						field="Computer Science"
						school="Stanford University"
						location="Stanford, CA"
						period="2016 - 2018"
						gpa="3.9 / 4.0"
						thesis="Distributed Caching Strategies for Large-Scale Web Applications"
						courses={[
							'Distributed Systems',
							'Machine Learning',
							'Advanced Algorithms',
							'Database Systems',
						]}
						honors={[
							'Research Fellowship',
							'Published 2 Papers',
							"Dean's List",
						]}
					/>
					<EducationCard
						degree="Bachelor of Science"
						field="Computer Science"
						school="UC Berkeley"
						location="Berkeley, CA"
						period="2012 - 2016"
						gpa="3.8 / 4.0"
						courses={[
							'Data Structures',
							'Operating Systems',
							'Computer Architecture',
							'Web Development',
						]}
						honors={[
							'Summa Cum Laude',
							'Phi Beta Kappa',
							'CS Department Award',
						]}
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

interface EducationCardProps {
	degree: string;
	field: string;
	school: string;
	location: string;
	period: string;
	gpa: string;
	thesis?: string;
	courses: string[];
	honors: string[];
}

const EducationCard = ({
	degree,
	field,
	school,
	location,
	period,
	gpa,
	thesis,
	courses,
	honors,
}: EducationCardProps) => (
	<Card>
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-4 mb-6">
				<div className="flex items-start gap-4">
					<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
						<GraduationCap className="size-7 text-primary" />
					</div>
					<div>
						<h3 className="text-xl font-bold">{degree}</h3>
						<p className="text-primary">{field}</p>
						<p className="text-sm font-medium mt-1">{school}</p>
					</div>
				</div>
				<div className="flex flex-wrap @md:flex-col @md:items-end gap-2">
					<Badge variant="secondary" className="font-mono">
						{period}
					</Badge>
					<Badge variant="outline">GPA: {gpa}</Badge>
				</div>
			</div>

			<div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
				<span className="flex items-center gap-1">
					<MapPin className="size-4" />
					{location}
				</span>
				<span className="flex items-center gap-1">
					<Calendar className="size-4" />
					{period}
				</span>
			</div>

			{thesis && (
				<div className="mb-6 p-4 bg-muted/50 rounded-lg">
					<p className="text-xs text-muted-foreground mb-1">Thesis</p>
					<p className="text-sm font-medium">{thesis}</p>
				</div>
			)}

			<Separator className="my-6" />

			<div className="grid @md:grid-cols-2 gap-6">
				<div>
					<h4 className="text-sm font-medium mb-3">Key Courses</h4>
					<ul className="space-y-1.5">
						{courses.map((course, i) => (
							<li
								key={i}
								className="text-sm text-muted-foreground flex items-center gap-2"
							>
								<span className="size-1.5 rounded-full bg-primary shrink-0" />
								{course}
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
						<Award className="size-4 text-primary" />
						Honors & Awards
					</h4>
					<ul className="space-y-1.5">
						{honors.map((honor, i) => (
							<li
								key={i}
								className="text-sm text-muted-foreground flex items-center gap-2"
							>
								<span className="size-1.5 rounded-full bg-primary shrink-0" />
								{honor}
							</li>
						))}
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
);
