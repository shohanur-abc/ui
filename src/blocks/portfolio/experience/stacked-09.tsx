import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Users} text="Mentorship" />
					<Title text="Engineers I've Mentored" />
					<Description text="I'm passionate about helping engineers grow in their careers." />
				</div>

				<div className="max-w-3xl space-y-0">
					<MenteeItem
						avatar="https://github.com/shadcn.png"
						initials="AJ"
						name="Alex Johnson"
						startRole="Junior Engineer"
						currentRole="Senior Engineer"
						company="Google"
						period="2021 - 2023"
						outcome="Promoted twice in 2 years, now leading a team of 4"
					/>
					<MenteeItem
						avatar="https://github.com/shadcn.png"
						initials="SC"
						name="Sarah Chen"
						startRole="Mid-level Engineer"
						currentRole="Staff Engineer"
						company="Stripe"
						period="2020 - 2022"
						outcome="Led successful migration to microservices"
					/>
					<MenteeItem
						avatar="https://github.com/shadcn.png"
						initials="MK"
						name="Michael Kim"
						startRole="Intern"
						currentRole="Senior Engineer"
						company="Meta"
						period="2019 - 2021"
						outcome="Received return offer, fast-tracked promotion"
					/>
					<MenteeItem
						avatar="https://github.com/shadcn.png"
						initials="RP"
						name="Rachel Park"
						startRole="Career Changer"
						currentRole="Mid-level Engineer"
						company="Netflix"
						period="2022 - Present"
						outcome="Successfully transitioned from marketing"
						isLast
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

interface MenteeItemProps {
	avatar: string;
	initials: string;
	name: string;
	startRole: string;
	currentRole: string;
	company: string;
	period: string;
	outcome: string;
	isLast?: boolean;
}

const MenteeItem = ({
	avatar,
	initials,
	name,
	startRole,
	currentRole,
	company,
	period,
	outcome,
	isLast,
}: MenteeItemProps) => (
	<>
		<div className="py-8 group">
			<div className="flex flex-col @sm:flex-row gap-4 @sm:gap-6">
				<Avatar className="size-16 rounded-xl ring-2 ring-background shrink-0">
					<AvatarImage src={avatar} alt={name} />
					<AvatarFallback className="rounded-xl">{initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
						{name}
					</h3>
					<div className="flex flex-wrap items-center gap-1 text-sm mb-3">
						<span className="text-muted-foreground">{startRole}</span>
						<ArrowRight className="size-4 text-primary" />
						<span className="text-primary font-medium">{currentRole}</span>
						<span className="text-muted-foreground">@ {company}</span>
					</div>
					<p className="text-sm text-muted-foreground mb-3">{outcome}</p>
					<Badge variant="secondary" className="text-xs">
						<Calendar className="size-3 mr-1" />
						{period}
					</Badge>
				</div>
			</div>
		</div>
		{!isLast && <Separator />}
	</>
);
