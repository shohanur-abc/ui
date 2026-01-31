import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowUpRight,
	Briefcase,
	GraduationCap,
	Award,
	MapPin,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Journey" />
					<Title text="Career Highlights" />
					<Description text="Key milestones in my professional journey." />
				</div>

				<CareerCards
					items={[
						{
							icon: Briefcase,
							category: 'Current Role',
							title: 'Senior Full-Stack Developer',
							organization: 'TechCorp Inc.',
							location: 'Remote',
							period: '2022 - Present',
							highlights: [
								'Leading a team of 5 developers',
								'Architected microservices platform',
								'Reduced deployment time by 60%',
							],
						},
						{
							icon: Briefcase,
							category: 'Previous Role',
							title: 'Frontend Developer',
							organization: 'StartupXYZ',
							location: 'San Francisco, CA',
							period: '2019 - 2022',
							highlights: [
								'Built React component library',
								'Improved Core Web Vitals by 40%',
								'Mentored junior developers',
							],
						},
						{
							icon: GraduationCap,
							category: 'Education',
							title: 'M.S. Computer Science',
							organization: 'Stanford University',
							location: 'Stanford, CA',
							period: '2017 - 2019',
							highlights: [
								'Focus on Human-Computer Interaction',
								'GPA: 3.9/4.0',
								'Research on accessible interfaces',
							],
						},
						{
							icon: Award,
							category: 'Achievement',
							title: 'Developer of the Year',
							organization: 'Tech Awards 2023',
							location: 'Global',
							period: '2023',
							highlights: [
								'Top 1% of applicants',
								'Recognition for open source',
								'Innovation in developer tools',
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface CareerItem {
	icon: ComponentType<{ className?: string }>;
	category: string;
	title: string;
	organization: string;
	location: string;
	period: string;
	highlights: string[];
}

const CareerCards = ({ items }: { items: CareerItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-4 @md:gap-6">
		{items.map(
			(
				{
					icon: Icon,
					category,
					title,
					organization,
					location,
					period,
					highlights,
				},
				i,
			) => (
				<Card key={i} className="py-0 group hover:shadow-lg transition-all">
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
									<Icon className="size-5" />
								</div>
								<Badge variant="secondary" className="text-xs">
									{category}
								</Badge>
							</div>
							<span className="text-xs @md:text-sm text-muted-foreground">
								{period}
							</span>
						</div>

						<h3 className="font-bold text-lg @md:text-xl mb-1">{title}</h3>
						<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
							<span>{organization}</span>
							<span>•</span>
							<span className="flex items-center gap-1">
								<MapPin className="size-3" />
								{location}
							</span>
						</div>

						<ul className="space-y-1.5">
							{highlights.map((highlight, j) => (
								<li
									key={j}
									className="flex items-center gap-2 text-sm text-muted-foreground"
								>
									<ArrowUpRight className="size-3.5 text-primary shrink-0" />
									{highlight}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
