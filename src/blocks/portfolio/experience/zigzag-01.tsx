import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Experience" />
					<Title text="Work History" />
					<Description text="My professional journey through leading tech companies." />
				</div>

				<div className="max-w-5xl mx-auto space-y-12">
					<ZigzagItem
						logo="https://github.com/google.png"
						initials="TC"
						company="TechCorp"
						role="Principal Engineer"
						period="Jan 2023 - Present"
						location="San Francisco, CA"
						description="Leading technical direction for platform engineering. Building design system used by 200+ engineers."
						tags={['Leadership', 'Architecture', 'Design Systems']}
						href="/experience/techcorp"
						align="left"
						current
					/>
					<ZigzagItem
						logo="https://github.com/facebook.png"
						initials="SX"
						company="StartupX"
						role="Staff Engineer"
						period="Mar 2021 - Dec 2022"
						location="Remote"
						description="Built and scaled design system from ground up. Led frontend platform initiatives."
						tags={['React', 'TypeScript', 'Design Systems']}
						href="/experience/startupx"
						align="right"
					/>
					<ZigzagItem
						logo="https://github.com/facebook.png"
						initials="M"
						company="Meta"
						role="Senior Engineer"
						period="Jun 2019 - Feb 2021"
						location="Menlo Park, CA"
						description="Developed Instagram Stories features. Optimized performance for billions of users."
						tags={['React Native', 'Performance', 'Scale']}
						href="/experience/meta"
						align="left"
					/>
					<ZigzagItem
						logo="https://github.com/stripe.png"
						initials="S"
						company="Stripe"
						role="Software Engineer"
						period="Aug 2017 - May 2019"
						location="San Francisco, CA"
						description="Built merchant dashboards and payment flows. Contributed to component library."
						tags={['Ruby', 'React', 'Payments']}
						href="/experience/stripe"
						align="right"
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

interface ZigzagItemProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	location: string;
	description: string;
	tags: string[];
	href: string;
	align: 'left' | 'right';
	current?: boolean;
}

const ZigzagItem = ({
	logo,
	initials,
	company,
	role,
	period,
	location,
	description,
	tags,
	href,
	align,
	current,
}: ZigzagItemProps) => (
	<div
		className={`grid @lg:grid-cols-2 gap-8 items-center ${align === 'right' ? '@lg:direction-rtl' : ''}`}
	>
		<Link href={href} className="group @lg:direction-ltr">
			<Card
				className={`hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}
			>
				<CardContent className="p-6 @md:p-8">
					<div className="flex items-start gap-4">
						<Avatar className="size-14 rounded-xl border shrink-0">
							<AvatarImage src={logo} alt={company} />
							<AvatarFallback className="rounded-xl">{initials}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							{current && <Badge className="mb-2">Current</Badge>}
							<h3 className="text-xl font-bold group-hover:text-primary transition-colors">
								{role}
							</h3>
							<p className="text-primary mb-1">{company}</p>
							<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
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
					</div>
					<p className="text-sm text-muted-foreground mt-4">{description}</p>
					<div className="flex flex-wrap gap-1.5 mt-4">
						{tags.map((tag, i) => (
							<Badge key={i} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
					<span className="inline-flex items-center gap-1 text-sm text-primary mt-4 group-hover:gap-2 transition-all">
						Learn more <ArrowRight className="size-4" />
					</span>
				</CardContent>
			</Card>
		</Link>
		<div
			className={`hidden @lg:block text-center @lg:direction-ltr ${align === 'right' ? '@lg:text-right' : '@lg:text-left'}`}
		>
			<div className="inline-flex items-center justify-center size-4 rounded-full bg-primary" />
		</div>
	</div>
);
