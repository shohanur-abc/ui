import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-md mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card7/400/400"
						fallback="JM"
						name="James Miller"
						role="Backend Engineer"
						company="Netflix"
						location="Los Angeles, CA"
						joined="2019"
						bio="Building scalable systems that power streaming for millions. Focused on distributed systems, microservices, and cloud architecture."
						techStack={['Go', 'Java', 'Kubernetes', 'AWS', 'Kafka', 'Redis']}
						cta={{ label: 'Connect', href: '/contact', icon: ArrowRight }}
					/>
				</div>
			</div>
		</section>
	);
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
	company: string;
	location: string;
	joined: string;
	bio: string;
	techStack: string[];
	cta: CTAData;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	company,
	location,
	joined,
	bio,
	techStack,
	cta,
}: ProfileCardProps) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex gap-4 mb-6">
				<Avatar className="size-20 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-primary font-medium">{role}</p>
					<p className="text-sm text-muted-foreground">at {company}</p>
				</div>
			</div>
			<div className="flex gap-4 text-sm text-muted-foreground mb-4">
				<div className="flex items-center gap-1">
					<MapPin className="size-4" />
					<span>{location}</span>
				</div>
				<div className="flex items-center gap-1">
					<Calendar className="size-4" />
					<span>Joined {joined}</span>
				</div>
			</div>
			<p className="text-muted-foreground text-sm mb-6">{bio}</p>
			<div className="mb-6">
				<p className="text-sm font-medium mb-2">Tech Stack</p>
				<div className="flex flex-wrap gap-2">
					{techStack.map((tech) => (
						<Badge key={tech} variant="outline" className="text-xs">
							{tech}
						</Badge>
					))}
				</div>
			</div>
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
