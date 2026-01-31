import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ArrowRight, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Users} text="Mentorship" />
					<Title text="Engineers I've Mentored" />
					<Description text="Helping engineers grow in their careers." />
				</div>

				<div className="max-w-5xl mx-auto space-y-12">
					<MenteeZigzag
						avatar="https://github.com/shadcn.png"
						initials="AJ"
						name="Alex Johnson"
						startRole="Junior Engineer"
						currentRole="Senior Engineer"
						company="Google"
						period="2021 - 2023"
						outcome="Promoted twice in 2 years, now leading a team of 4"
						align="left"
					/>
					<MenteeZigzag
						avatar="https://github.com/shadcn.png"
						initials="SC"
						name="Sarah Chen"
						startRole="Mid-level"
						currentRole="Staff Engineer"
						company="Stripe"
						period="2020 - 2022"
						outcome="Led successful migration to microservices"
						align="right"
					/>
					<MenteeZigzag
						avatar="https://github.com/shadcn.png"
						initials="MK"
						name="Michael Kim"
						startRole="Intern"
						currentRole="Senior Engineer"
						company="Meta"
						period="2019 - 2021"
						outcome="Received return offer, fast-tracked promotion"
						align="left"
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

interface MenteeZigzagProps {
	avatar: string;
	initials: string;
	name: string;
	startRole: string;
	currentRole: string;
	company: string;
	period: string;
	outcome: string;
	align: 'left' | 'right';
}

const MenteeZigzag = ({
	avatar,
	initials,
	name,
	startRole,
	currentRole,
	company,
	period,
	outcome,
	align,
}: MenteeZigzagProps) => (
	<div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
		<div
			className={`flex items-center gap-6 ${align === 'right' ? '@lg:order-2 @lg:justify-end' : ''}`}
		>
			<Avatar className="size-20 ring-4 ring-background shadow-lg">
				<AvatarImage src={avatar} alt={name} />
				<AvatarFallback className="text-2xl">{initials}</AvatarFallback>
			</Avatar>
			<div>
				<h3 className="text-xl font-bold mb-1">{name}</h3>
				<div className="flex items-center gap-1 text-sm mb-2">
					<span className="text-muted-foreground">{startRole}</span>
					<ArrowRight className="size-4 text-primary" />
					<span className="text-primary font-medium">{currentRole}</span>
				</div>
				<Badge variant="secondary" className="text-xs">
					@ {company}
				</Badge>
			</div>
		</div>
		<Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
			<CardContent className="p-6">
				<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
					<Calendar className="size-4" />
					<span>Mentored: {period}</span>
				</div>
				<p className="text-sm">{outcome}</p>
			</CardContent>
		</Card>
	</div>
);
