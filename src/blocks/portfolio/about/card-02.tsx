import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-lg mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card2/800/500"
						name="Sarah Chen"
						role="Product Designer"
						company="Google"
						location="Seattle, WA"
						experience="8+ years"
						bio="I design products that millions of people use every day. My focus is on creating intuitive, accessible, and delightful user experiences."
						highlights={[
							'Design Systems',
							'User Research',
							'Prototyping',
							'Accessibility',
						]}
						cta={{
							label: 'View Portfolio',
							href: '/portfolio',
							icon: ArrowUpRight,
						}}
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
	name: string;
	role: string;
	company: string;
	location: string;
	experience: string;
	bio: string;
	highlights: string[];
	cta: CTAData;
}

const ProfileCard = ({
	src,
	name,
	role,
	company,
	location,
	experience,
	bio,
	highlights,
	cta,
}: ProfileCardProps) => (
	<Card className="overflow-hidden py-0">
		<div className="relative aspect-[16/9]">
			<Image src={src} alt={name} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
			<div className="absolute bottom-4 left-4">
				<h1 className="text-2xl font-bold text-white">{name}</h1>
				<p className="text-white/80">
					{role} at {company}
				</p>
			</div>
		</div>
		<CardContent className="p-6">
			<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
				<div className="flex items-center gap-1">
					<MapPin className="size-4" />
					<span>{location}</span>
				</div>
				<div className="flex items-center gap-1">
					<Briefcase className="size-4" />
					<span>{company}</span>
				</div>
				<div className="flex items-center gap-1">
					<Calendar className="size-4" />
					<span>{experience}</span>
				</div>
			</div>
			<p className="text-muted-foreground mb-6">{bio}</p>
			<Separator className="my-6" />
			<div className="mb-6">
				<p className="text-sm font-medium mb-3">Specialties</p>
				<div className="flex flex-wrap gap-2">
					{highlights.map((item) => (
						<Badge key={item} variant="outline">
							{item}
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
