import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Award,
	Briefcase,
	GraduationCap,
	Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-3 gap-8 @xl:gap-12">
					<div className="@lg:col-span-1">
						<Sidebar
							src="https://picsum.photos/seed/timeline2/400/500"
							name="Sarah Chen"
							role="Product Designer"
							bio="10+ years crafting digital experiences. From startup to enterprise."
							cta={{
								label: 'Get in Touch',
								href: '/contact',
								icon: ArrowRight,
							}}
						/>
					</div>
					<div className="@lg:col-span-2">
						<Timeline
							items={[
								{
									icon: Award,
									date: 'Present',
									title: 'Design Lead at Google',
									subtitle: 'San Francisco, CA',
									description:
										'Leading design systems team, establishing patterns used across 20+ products.',
									highlight: true,
								},
								{
									icon: Briefcase,
									date: '2019 - 2022',
									title: 'Senior Designer at Airbnb',
									subtitle: 'San Francisco, CA',
									description:
										'Redesigned host experience, increasing listings by 40%.',
								},
								{
									icon: Briefcase,
									date: '2016 - 2019',
									title: 'Product Designer at Uber',
									subtitle: 'San Francisco, CA',
									description:
										'Worked on rider app, improving UX for millions of daily users.',
								},
								{
									icon: Heart,
									date: '2014 - 2016',
									title: 'UX Designer at Startup',
									subtitle: 'New York, NY',
									description:
										'First design hire. Built design culture from scratch.',
								},
								{
									icon: GraduationCap,
									date: '2014',
									title: 'MFA Interaction Design',
									subtitle: 'School of Visual Arts',
									description:
										'Focus on human-centered design and design thinking.',
								},
							]}
						/>
					</div>
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

interface SidebarProps {
	src: string;
	name: string;
	role: string;
	bio: string;
	cta: CTAData;
}

const Sidebar = ({ src, name, role, bio, cta }: SidebarProps) => (
	<div className="sticky top-8">
		<div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6">
			<Image src={src} alt={name} fill className="object-cover" />
		</div>
		<h1 className="text-2xl font-bold mb-1">{name}</h1>
		<p className="text-primary font-medium mb-3">{role}</p>
		<p className="text-muted-foreground text-sm mb-6">{bio}</p>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);

interface TimelineItem {
	icon: React.ComponentType<{ className?: string }>;
	date: string;
	title: string;
	subtitle: string;
	description: string;
	highlight?: boolean;
}

interface TimelineProps {
	items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => (
	<div className="space-y-0">
		{items.map((item, i) => (
			<div key={i} className="relative pl-8 pb-8 last:pb-0">
				{i < items.length - 1 && (
					<div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
				)}
				<div
					className={`absolute left-0 size-6 rounded-full flex items-center justify-center ${item.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
				>
					<item.icon className="size-3" />
				</div>
				<Card className={item.highlight ? 'border-primary/50' : ''}>
					<CardContent className="p-4">
						<Badge
							variant={item.highlight ? 'default' : 'secondary'}
							className="mb-2"
						>
							{item.date}
						</Badge>
						<h3 className="font-semibold">{item.title}</h3>
						<p className="text-sm text-muted-foreground">{item.subtitle}</p>
						<p className="text-sm text-muted-foreground mt-2">
							{item.description}
						</p>
					</CardContent>
				</Card>
			</div>
		))}
	</div>
);
