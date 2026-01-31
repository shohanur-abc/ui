import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Building2,
	Calendar,
	MapPin,
	ArrowRight,
	ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Building2} text="Experience" />
					<Title text="Work History" />
					<Description text="Companies I've had the pleasure of working with." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
					<CurrentRoleCard
						logo="https://github.com/google.png"
						initials="TC"
						company="TechCorp"
						role="Principal Engineer"
						period="2023 - Present"
						location="San Francisco"
						href="/experience/techcorp"
						className="@md:col-span-2 @xl:col-span-2"
					/>
					<PreviousRoleCard
						logo="https://github.com/facebook.png"
						initials="SX"
						company="StartupX"
						role="Staff Engineer"
						period="2021 - 2023"
						href="/experience/startupx"
					/>
					<PreviousRoleCard
						logo="https://github.com/facebook.png"
						initials="M"
						company="Meta"
						role="Senior Engineer"
						period="2019 - 2021"
						href="/experience/meta"
					/>
					<PreviousRoleCard
						logo="https://github.com/stripe.png"
						initials="S"
						company="Stripe"
						role="Software Engineer"
						period="2017 - 2019"
						href="/experience/stripe"
					/>
					<PreviousRoleCard
						logo="https://github.com/github.png"
						initials="SI"
						company="Startup Inc"
						role="Junior Developer"
						period="2015 - 2017"
						href="/experience/startup-inc"
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

interface CurrentRoleCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	location: string;
	href: string;
	className?: string;
}

const CurrentRoleCard = ({
	logo,
	initials,
	company,
	role,
	period,
	location,
	href,
	className = '',
}: CurrentRoleCardProps) => (
	<Link href={href} className={`block group ${className}`}>
		<Card className="h-full ring-2 ring-primary hover:shadow-xl transition-all">
			<CardContent className="p-8 h-full flex flex-col justify-between">
				<div>
					<Badge className="mb-4">Current</Badge>
					<div className="flex items-start gap-4">
						<Avatar className="size-16 rounded-xl border">
							<AvatarImage src={logo} alt={company} />
							<AvatarFallback className="rounded-xl text-xl">
								{initials}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
								{role}
							</h3>
							<p className="text-lg text-primary">{company}</p>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between mt-6">
					<div className="flex gap-4 text-sm text-muted-foreground">
						<span className="flex items-center gap-1">
							<Calendar className="size-4" />
							{period}
						</span>
						<span className="flex items-center gap-1">
							<MapPin className="size-4" />
							{location}
						</span>
					</div>
					<ArrowRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
				</div>
			</CardContent>
		</Card>
	</Link>
);

interface PreviousRoleCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	href: string;
}

const PreviousRoleCard = ({
	logo,
	initials,
	company,
	role,
	period,
	href,
}: PreviousRoleCardProps) => (
	<Link href={href} className="block group">
		<Card className="h-full hover:shadow-lg transition-all">
			<CardContent className="p-6 h-full flex flex-col">
				<div className="flex items-center gap-3 mb-4">
					<Avatar className="size-10 rounded-lg border">
						<AvatarImage src={logo} alt={company} />
						<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<h3 className="font-bold group-hover:text-primary transition-colors truncate">
							{role}
						</h3>
						<p className="text-sm text-primary">{company}</p>
					</div>
				</div>
				<div className="mt-auto flex items-center justify-between">
					<Badge variant="secondary" className="text-xs font-mono">
						{period}
					</Badge>
					<ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
				</div>
			</CardContent>
		</Card>
	</Link>
);
