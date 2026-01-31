import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Briefcase,
	Calendar,
	MapPin,
	CheckCircle,
	Building2,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Experience" />
					<Title text="Career Timeline" />
					<Description text="My professional journey in a compact view." />
				</div>

				<Card className="max-w-3xl">
					<CardContent className="p-0">
						<CompactExperience
							company="TechCorp"
							role="Principal Engineer"
							period="2023 - Present"
							location="San Francisco"
							highlights={[
								'Leading platform engineering',
								'Design system for 200+ engineers',
							]}
							current
						/>
						<Separator />
						<CompactExperience
							company="StartupX"
							role="Staff Engineer"
							period="2021 - 2023"
							location="Remote"
							highlights={[
								'Built design system from scratch',
								'Mentored 8 engineers',
							]}
						/>
						<Separator />
						<CompactExperience
							company="Meta"
							role="Senior Software Engineer"
							period="2019 - 2021"
							location="Menlo Park"
							highlights={[
								'Instagram Stories features',
								'Performance optimization',
							]}
						/>
						<Separator />
						<CompactExperience
							company="Stripe"
							role="Software Engineer"
							period="2017 - 2019"
							location="San Francisco"
							highlights={['Merchant dashboards', 'Component library']}
						/>
						<Separator />
						<CompactExperience
							company="Startup Inc"
							role="Junior Developer"
							period="2015 - 2017"
							location="New York"
							highlights={['Full-stack development', 'First production apps']}
						/>
					</CardContent>
				</Card>
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

interface CompactExperienceProps {
	company: string;
	role: string;
	period: string;
	location: string;
	highlights: string[];
	current?: boolean;
}

const CompactExperience = ({
	company,
	role,
	period,
	location,
	highlights,
	current,
}: CompactExperienceProps) => (
	<div className="p-5 @md:p-6 hover:bg-muted/50 transition-colors">
		<div className="flex flex-col @md:flex-row @md:items-center gap-3 @md:gap-6 mb-3">
			<div className="flex items-center gap-2">
				<Building2 className="size-5 text-primary" />
				<h3 className="font-bold">{role}</h3>
				{current && <Badge>Current</Badge>}
			</div>
			<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
				<span className="text-sm text-primary">{company}</span>
				<span className="flex items-center gap-1">
					<Calendar className="size-3" />
					{period}
				</span>
				<span className="flex items-center gap-1">
					<MapPin className="size-3" />
					{location}
				</span>
			</div>
		</div>
		<ul className="flex flex-wrap gap-x-4 gap-y-1.5">
			{highlights.map((item, i) => (
				<li
					key={i}
					className="flex items-center gap-1.5 text-sm text-muted-foreground"
				>
					<CheckCircle className="size-3.5 text-primary shrink-0" />
					{item}
				</li>
			))}
		</ul>
	</div>
);
