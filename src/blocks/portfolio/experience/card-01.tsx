import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Experience" />
					<Title text="Work Experience" />
					<Description text="Companies and roles that shaped my career." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<ExperienceCard
						logo="https://github.com/google.png"
						initials="G"
						company="Google"
						role="Staff Engineer"
						period="2022 - Present"
						location="Mountain View, CA"
						description="Leading design system initiatives across the organization."
						tags={['React', 'TypeScript', 'Design Systems']}
					/>
					<ExperienceCard
						logo="https://github.com/facebook.png"
						initials="M"
						company="Meta"
						role="Senior Engineer"
						period="2020 - 2022"
						location="Menlo Park, CA"
						description="Built and shipped Instagram Stories features."
						tags={['React Native', 'GraphQL', 'Mobile']}
					/>
					<ExperienceCard
						logo="https://github.com/stripe.png"
						initials="S"
						company="Stripe"
						role="Software Engineer"
						period="2018 - 2020"
						location="San Francisco, CA"
						description="Developed payment dashboard and checkout flows."
						tags={['Ruby', 'React', 'Payments']}
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

interface ExperienceCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	location: string;
	description: string;
	tags: string[];
}

const ExperienceCard = ({
	logo,
	initials,
	company,
	role,
	period,
	location,
	description,
	tags,
}: ExperienceCardProps) => (
	<Card className="group hover:shadow-lg transition-all hover:-translate-y-1">
		<CardHeader>
			<div className="flex items-start gap-4">
				<Avatar className="size-12 rounded-lg border">
					<AvatarImage src={logo} alt={company} />
					<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<CardTitle className="text-lg">{role}</CardTitle>
					<p className="text-sm text-primary">{company}</p>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
				<span className="flex items-center gap-1">
					<Calendar className="size-3" />
					{period}
				</span>
				<span className="flex items-center gap-1">
					<MapPin className="size-3" />
					{location}
				</span>
			</div>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>
			<div className="flex flex-wrap gap-1.5">
				{tags.map((tag, i) => (
					<Badge key={i} variant="secondary" className="text-xs">
						{tag}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);
