import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, CircleDot, Flag, Heart, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-lg mx-auto">
					<FounderCard
						src="https://picsum.photos/seed/card8/800/500"
						name="Alex Thompson"
						role="Founder & CEO"
						company="TechVentures"
						tagline="Building the future of work"
						mission="We're on a mission to democratize technology and make it accessible to everyone, everywhere."
						values={[
							{ icon: Rocket, label: 'Innovation First' },
							{ icon: Heart, label: 'User-Centric' },
							{ icon: Flag, label: 'Transparency' },
						]}
						milestones={['$50M raised', '200+ employees', '10M+ users']}
						cta={{ label: 'Our Story', href: '/story', icon: ArrowUpRight }}
					/>
				</div>
			</div>
		</section>
	);
}

interface ValueItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface FounderCardProps {
	src: string;
	name: string;
	role: string;
	company: string;
	tagline: string;
	mission: string;
	values: ValueItem[];
	milestones: string[];
	cta: CTAData;
}

const FounderCard = ({
	src,
	name,
	role,
	company,
	tagline,
	mission,
	values,
	milestones,
	cta,
}: FounderCardProps) => (
	<Card className="overflow-hidden py-0">
		<div className="relative aspect-video">
			<Image src={src} alt={name} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute bottom-4 left-4 right-4">
				<Badge className="mb-2 bg-primary/90">{company}</Badge>
				<h1 className="text-2xl font-bold text-white">{name}</h1>
				<p className="text-white/80">{role}</p>
			</div>
		</div>
		<CardHeader className="pb-0">
			<p className="text-lg font-medium text-primary">{tagline}</p>
		</CardHeader>
		<CardContent>
			<p className="text-muted-foreground text-sm mb-6">{mission}</p>
			<div className="flex gap-4 mb-6">
				{values.map(({ icon: Icon, label }) => (
					<div key={label} className="flex items-center gap-2 text-sm">
						<Icon className="size-4 text-primary" />
						<span>{label}</span>
					</div>
				))}
			</div>
			<Separator className="my-4" />
			<div className="flex flex-wrap gap-3">
				{milestones.map((milestone) => (
					<div
						key={milestone}
						className="flex items-center gap-1.5 text-sm text-muted-foreground"
					>
						<CircleDot className="size-3 text-primary" />
						<span>{milestone}</span>
					</div>
				))}
			</div>
		</CardContent>
		<CardFooter>
			<Button className="gap-2 w-full" variant="outline" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);
