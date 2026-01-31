import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Experience" />
					<Title text="Work History" />
					<Description text="My journey through some of the world's leading tech companies." />
				</div>

				<div className="grid @md:grid-cols-3 @xl:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
					<FeaturedCard
						logo="https://github.com/google.png"
						initials="G"
						company="Google"
						role="Staff Engineer"
						period="2022 - Present"
						location="Mountain View"
						href="/experience/google"
						className="@md:col-span-2 @md:row-span-2"
					/>
					<CompactCard
						logo="https://github.com/facebook.png"
						initials="M"
						company="Meta"
						role="Senior Engineer"
						period="2020 - 2022"
					/>
					<CompactCard
						logo="https://github.com/stripe.png"
						initials="S"
						company="Stripe"
						role="Engineer"
						period="2018 - 2020"
					/>
					<CompactCard
						logo="https://github.com/github.png"
						initials="GH"
						company="GitHub"
						role="Frontend Dev"
						period="2016 - 2018"
						className="@xl:col-span-2"
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

interface FeaturedCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	location: string;
	href: string;
	className?: string;
}

const FeaturedCard = ({
	logo,
	initials,
	company,
	role,
	period,
	location,
	href,
	className = '',
}: FeaturedCardProps) => (
	<Link href={href} className={`group ${className}`}>
		<Card className="h-full hover:shadow-xl transition-all ring-2 ring-primary">
			<CardContent className="p-8 h-full flex flex-col justify-between">
				<div>
					<Badge className="mb-4">Current</Badge>
					<Avatar className="size-16 rounded-xl border mb-6">
						<AvatarImage src={logo} alt={company} />
						<AvatarFallback className="rounded-xl text-lg">
							{initials}
						</AvatarFallback>
					</Avatar>
					<h3 className="text-2xl @md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
						{role}
					</h3>
					<p className="text-lg text-primary mb-4">{company}</p>
				</div>
				<div>
					<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
						<span className="flex items-center gap-1">
							<Calendar className="size-4" />
							{period}
						</span>
						<span className="flex items-center gap-1">
							<MapPin className="size-4" />
							{location}
						</span>
					</div>
					<span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
						View details <ArrowRight className="size-4" />
					</span>
				</div>
			</CardContent>
		</Card>
	</Link>
);

interface CompactCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	className?: string;
}

const CompactCard = ({
	logo,
	initials,
	company,
	role,
	period,
	className = '',
}: CompactCardProps) => (
	<Card className={`group hover:shadow-lg transition-all ${className}`}>
		<CardContent className="p-6 h-full flex flex-col">
			<Avatar className="size-10 rounded-lg border mb-4">
				<AvatarImage src={logo} alt={company} />
				<AvatarFallback className="rounded-lg text-sm">
					{initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<h3 className="font-bold group-hover:text-primary transition-colors">
					{role}
				</h3>
				<p className="text-sm text-primary">{company}</p>
			</div>
			<Badge variant="secondary" className="w-fit mt-3 text-xs font-mono">
				{period}
			</Badge>
		</CardContent>
	</Card>
);
