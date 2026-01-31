import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={GraduationCap} text="Education" />
					<Title text="Academic Background" />
					<Description text="Educational foundation that shaped my technical expertise." />
				</div>

				<div className="grid @lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
					<EducationCard
						degree="Master of Science"
						field="Computer Science"
						school="Stanford University"
						location="Stanford, CA"
						period="2016 - 2018"
						gpa="3.9/4.0"
						highlights={[
							'Distributed Systems focus',
							'Research Assistant',
							'Published 2 papers',
						]}
					/>
					<EducationCard
						degree="Bachelor of Science"
						field="Computer Science"
						school="UC Berkeley"
						location="Berkeley, CA"
						period="2012 - 2016"
						gpa="3.8/4.0"
						highlights={[
							'Summa Cum Laude',
							"Dean's List",
							'Teaching Assistant',
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
	highlights: string[];
}

const EducationCard = ({
	degree,
	field,
	school,
	location,
	period,
	gpa,
	highlights,
}: EducationCardProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="p-6">
			<div className="flex items-start gap-4 mb-4">
				<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
					<GraduationCap className="size-7 text-primary" />
				</div>
				<div>
					<h3 className="text-lg font-bold">{degree}</h3>
					<p className="text-sm text-primary">{field}</p>
				</div>
			</div>
			<p className="font-medium mb-2">{school}</p>
			<div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
				<span className="flex items-center gap-1">
					<MapPin className="size-3" />
					{location}
				</span>
				<span className="flex items-center gap-1">
					<Calendar className="size-3" />
					{period}
				</span>
				<Badge variant="secondary" className="text-xs">
					GPA: {gpa}
				</Badge>
			</div>
			<div className="pt-4 border-t">
				<h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
					<Award className="size-4 text-primary" />
					Highlights
				</h4>
				<ul className="space-y-1.5">
					{highlights.map((highlight, i) => (
						<li
							key={i}
							className="text-sm text-muted-foreground flex items-center gap-2"
						>
							<span className="size-1.5 rounded-full bg-primary shrink-0" />
							{highlight}
						</li>
					))}
				</ul>
			</div>
		</CardContent>
	</Card>
);
