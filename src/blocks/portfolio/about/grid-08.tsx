import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Briefcase,
	GraduationCap,
	Heart,
	MapPin,
	Quote,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/gr8/400/400"
						fallback="JD"
						name="John Doe"
						role="Software Engineer"
						location="San Francisco, CA"
						className="@sm:col-span-2 @lg:col-span-1 @xl:col-span-2"
					/>
					<QuoteCard quote="Code is poetry." className="" />
					<SkillsCard
						title="Skills"
						skills={['React', 'TypeScript', 'Node.js', 'PostgreSQL']}
					/>
					<ExperienceCard
						icon={Briefcase}
						title="8+ Years"
						subtitle="Experience"
					/>
					<ExperienceCard
						icon={GraduationCap}
						title="Stanford"
						subtitle="M.S. Computer Science"
					/>
					<BioCard content="Building web applications that are fast, accessible, and delightful to use." />
					<InterestsCard
						icon={Heart}
						title="Interests"
						items={['Open Source', 'Teaching', 'Hiking', 'Coffee']}
						className="@sm:col-span-2 @lg:col-span-1"
					/>
					<CTACard
						title="Let's Connect"
						cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
						className="@sm:col-span-2 @xl:col-span-1"
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	location: string;
	className?: string;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	location,
	className,
}: ProfileCardProps) => (
	<Card className={className}>
		<CardContent className="p-6 flex items-center gap-4">
			<Avatar className="size-20 ring-2 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<h1 className="text-xl font-bold">{name}</h1>
				<p className="text-primary">{role}</p>
				<div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
					<MapPin className="size-3" />
					<span>{location}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface QuoteCardProps {
	quote: string;
	className?: string;
}

const QuoteCard = ({ quote, className }: QuoteCardProps) => (
	<Card className={`bg-primary text-primary-foreground ${className}`}>
		<CardContent className="p-6 flex flex-col justify-center h-full">
			<Quote className="size-6 mb-2 opacity-50" />
			<p className="text-lg font-medium italic">{quote}</p>
		</CardContent>
	</Card>
);

interface SkillsCardProps {
	title: string;
	skills: string[];
}

const SkillsCard = ({ title, skills }: SkillsCardProps) => (
	<Card>
		<CardContent className="p-6">
			<h2 className="text-sm font-medium text-muted-foreground mb-3">
				{title}
			</h2>
			<div className="flex flex-wrap gap-1">
				{skills.map((skill) => (
					<Badge key={skill} variant="secondary" className="text-xs">
						{skill}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

interface ExperienceCardProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
}

const ExperienceCard = ({
	icon: Icon,
	title,
	subtitle,
}: ExperienceCardProps) => (
	<Card>
		<CardContent className="p-6 text-center">
			<Icon className="size-8 text-primary mx-auto mb-2" />
			<div className="text-lg font-bold">{title}</div>
			<div className="text-sm text-muted-foreground">{subtitle}</div>
		</CardContent>
	</Card>
);

interface BioCardProps {
	content: string;
}

const BioCard = ({ content }: BioCardProps) => (
	<Card>
		<CardContent className="p-6 flex items-center">
			<p className="text-muted-foreground">{content}</p>
		</CardContent>
	</Card>
);

interface InterestsCardProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	items: string[];
	className?: string;
}

const InterestsCard = ({
	icon: Icon,
	title,
	items,
	className,
}: InterestsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<div className="flex items-center gap-2 mb-3">
				<Icon className="size-4 text-primary" />
				<h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
			</div>
			<div className="flex flex-wrap gap-2">
				{items.map((item) => (
					<Badge key={item} variant="outline">
						{item}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CTACardProps {
	title: string;
	cta: CTAData;
	className?: string;
}

const CTACard = ({ title, cta, className }: CTACardProps) => (
	<Card className={`bg-muted/50 ${className}`}>
		<CardContent className="p-6 flex flex-col justify-center items-center h-full text-center">
			<h2 className="font-bold mb-4">{title}</h2>
			<Button className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
