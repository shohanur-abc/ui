import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2 } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Building2} text="Experience" />
					<Title text="Where I've Worked" />
					<Description text="Companies and teams I've had the pleasure to work with." />
				</div>

				<VerticalTimeline
					items={[
						{
							period: 'Jan 2022 - Present',
							title: 'Staff Engineer',
							company: 'Vercel',
							logo: 'https://github.com/vercel.png',
							initials: 'VC',
							description:
								'Building the future of frontend development and deployment.',
							current: true,
						},
						{
							period: 'Mar 2020 - Dec 2021',
							title: 'Senior Engineer',
							company: 'Netlify',
							logo: 'https://github.com/netlify.png',
							initials: 'NL',
							description:
								'Led the build plugins team and improved deploy performance.',
							current: false,
						},
						{
							period: 'Jun 2018 - Feb 2020',
							title: 'Software Engineer',
							company: 'GitHub',
							logo: 'https://github.com/github.png',
							initials: 'GH',
							description: 'Worked on Actions and improved CI/CD workflows.',
							current: false,
						},
						{
							period: 'Aug 2016 - May 2018',
							title: 'Frontend Developer',
							company: 'DigitalOcean',
							logo: 'https://github.com/digitalocean.png',
							initials: 'DO',
							description:
								'Built the cloud control panel and droplet management UI.',
							current: false,
						},
					]}
				/>
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
	<p className="text-base @md:text-lg text-muted-foreground max-w-lg">{text}</p>
);

interface TimelineItem {
	period: string;
	title: string;
	company: string;
	logo: string;
	initials: string;
	description: string;
	current: boolean;
}

const VerticalTimeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative pl-8 @md:pl-12 border-l-2 border-border">
		{items.map(
			({ period, title, company, logo, initials, description, current }, i) => (
				<div
					key={i}
					className={`relative pb-10 last:pb-0 ${current ? '' : 'opacity-80'}`}
				>
					<div
						className={`absolute -left-[calc(2rem+1px)] @md:-left-[calc(3rem+1px)] size-4 @md:size-6 rounded-full ${current ? 'bg-primary' : 'bg-muted'} ring-4 ring-background`}
					/>
					<div className="flex items-start gap-4">
						<Avatar className="size-12 @md:size-14 rounded-lg border">
							<AvatarImage src={logo} alt={company} />
							<AvatarFallback className="rounded-lg text-sm">
								{initials}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="flex flex-wrap items-center gap-2 mb-1">
								<h3 className="text-base @md:text-lg font-semibold">{title}</h3>
								{current && <Badge className="text-xs">Current</Badge>}
							</div>
							<p className="text-sm text-primary mb-1">{company}</p>
							<p className="text-xs text-muted-foreground font-mono mb-2">
								{period}
							</p>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
					</div>
				</div>
			),
		)}
	</div>
);
