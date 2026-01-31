import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Building2} text="Companies" />
					<Title text="Where I've Worked" />
					<Description text="Click to learn more about my experience at each company." />
				</div>

				<div className="max-w-2xl mx-auto space-y-4">
					<CompanyCard
						logo="https://github.com/google.png"
						initials="G"
						company="Google"
						role="Staff Software Engineer"
						period="2022 - Present"
						description="Design systems and platform engineering"
						href="/experience/google"
						current
					/>
					<CompanyCard
						logo="https://github.com/facebook.png"
						initials="M"
						company="Meta"
						role="Senior Software Engineer"
						period="2020 - 2022"
						description="Instagram Stories and Reels"
						href="/experience/meta"
					/>
					<CompanyCard
						logo="https://github.com/stripe.png"
						initials="S"
						company="Stripe"
						role="Software Engineer"
						period="2018 - 2020"
						description="Payment dashboard and checkout"
						href="/experience/stripe"
					/>
					<CompanyCard
						logo="https://github.com/github.png"
						initials="GH"
						company="GitHub"
						role="Frontend Developer"
						period="2016 - 2018"
						description="Actions and CI/CD workflows"
						href="/experience/github"
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

interface CompanyCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	description: string;
	href: string;
	current?: boolean;
}

const CompanyCard = ({
	logo,
	initials,
	company,
	role,
	period,
	description,
	href,
	current,
}: CompanyCardProps) => (
	<Link href={href} className="block group">
		<Card
			className={`hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}
		>
			<CardContent className="p-6">
				<div className="flex items-center gap-4">
					<Avatar className="size-14 rounded-xl border shrink-0">
						<AvatarImage src={logo} alt={company} />
						<AvatarFallback className="rounded-xl">{initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="font-bold text-lg group-hover:text-primary transition-colors">
								{company}
							</h3>
							{current && <Badge className="text-xs">Current</Badge>}
						</div>
						<p className="text-sm text-primary">{role}</p>
						<p className="text-xs text-muted-foreground">{description}</p>
					</div>
					<div className="hidden @sm:flex flex-col items-end gap-2">
						<Badge variant="secondary" className="text-xs font-mono">
							{period}
						</Badge>
						<ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
					</div>
				</div>
			</CardContent>
		</Card>
	</Link>
);
