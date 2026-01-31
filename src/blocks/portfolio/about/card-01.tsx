import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { ArrowRight, Github, Linkedin, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-md mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card1/400/400"
						fallback="JD"
						name="John Doe"
						role="Software Engineer"
						location="San Francisco, CA"
						bio="Building products that make a difference. Passionate about clean code, great UX, and continuous learning."
						skills={['React', 'TypeScript', 'Node.js', 'GraphQL']}
						socials={[
							{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
							{ icon: Github, href: 'https://github.com', label: 'GitHub' },
							{
								icon: Linkedin,
								href: 'https://linkedin.com',
								label: 'LinkedIn',
							},
						]}
						cta={{ label: 'Get In Touch', href: '/contact', icon: ArrowRight }}
					/>
				</div>
			</div>
		</section>
	);
}

interface SocialItem {
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	label: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	location: string;
	bio: string;
	skills: string[];
	socials: SocialItem[];
	cta: CTAData;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	location,
	bio,
	skills,
	socials,
	cta,
}: ProfileCardProps) => (
	<Card className="text-center">
		<CardHeader className="pb-0">
			<Avatar className="size-28 mx-auto mb-4 ring-4 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-3xl bg-primary text-primary-foreground font-bold">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-primary font-medium">{role}</p>
			<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
				<MapPin className="size-4" />
				<span>{location}</span>
			</div>
		</CardHeader>
		<CardContent className="pt-6">
			<p className="text-muted-foreground mb-6">{bio}</p>
			<div className="flex flex-wrap justify-center gap-2 mb-6">
				{skills.map((skill) => (
					<Badge key={skill} variant="secondary">
						{skill}
					</Badge>
				))}
			</div>
			<div className="flex justify-center gap-2">
				{socials.map(({ icon: Icon, href, label }) => (
					<Button key={label} variant="outline" size="icon" asChild>
						<Link href={href} aria-label={label}>
							<Icon className="size-4" />
						</Link>
					</Button>
				))}
			</div>
		</CardContent>
		<CardFooter className="justify-center">
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);
