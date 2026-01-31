import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header
					title="My Professional Journey"
					subtitle="A decade of building, learning, and growing"
				/>
				<HorizontalTimeline
					items={[
						{
							year: '2014',
							label: 'Started',
							image: 'https://picsum.photos/seed/t4a/200/200',
						},
						{
							year: '2016',
							label: 'First Role',
							image: 'https://picsum.photos/seed/t4b/200/200',
						},
						{
							year: '2018',
							label: 'Senior',
							image: 'https://picsum.photos/seed/t4c/200/200',
						},
						{
							year: '2020',
							label: 'Lead',
							image: 'https://picsum.photos/seed/t4d/200/200',
						},
						{
							year: '2022',
							label: 'Director',
							image: 'https://picsum.photos/seed/t4e/200/200',
						},
						{
							year: '2024',
							label: 'Present',
							image: 'https://picsum.photos/seed/t4f/200/200',
						},
					]}
				/>
				<Separator className="my-12" />
				<CurrentStatus
					title="Emma Wilson"
					role="Engineering Director at Meta"
					description="Currently leading a team of 40+ engineers building the next generation of social experiences. Focused on AI integration and platform scalability."
					highlights={[
						'AI/ML Integration',
						'Platform Architecture',
						'Team Leadership',
						'Product Strategy',
					]}
					cta={{ label: "Let's Connect", href: '/contact', icon: ArrowRight }}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => (
	<div className="text-center mb-12">
		<h1 className="text-3xl @lg:text-4xl font-bold mb-3">{title}</h1>
		<p className="text-lg text-muted-foreground">{subtitle}</p>
	</div>
);

interface TimelineItem {
	year: string;
	label: string;
	image: string;
}

interface HorizontalTimelineProps {
	items: TimelineItem[];
}

const HorizontalTimeline = ({ items }: HorizontalTimelineProps) => (
	<div className="relative">
		<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden @md:block" />
		<div className="grid grid-cols-3 @md:grid-cols-6 gap-4">
			{items.map((item, i) => (
				<div key={i} className="text-center relative">
					<div className="relative size-16 @lg:size-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-background z-10">
						<Image
							src={item.image}
							alt={item.label}
							fill
							className="object-cover"
						/>
					</div>
					<Badge variant="outline" className="mb-1">
						{item.year}
					</Badge>
					<p className="text-sm font-medium">{item.label}</p>
				</div>
			))}
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CurrentStatusProps {
	title: string;
	role: string;
	description: string;
	highlights: string[];
	cta: CTAData;
}

const CurrentStatus = ({
	title,
	role,
	description,
	highlights,
	cta,
}: CurrentStatusProps) => (
	<div className="max-w-2xl mx-auto text-center">
		<h2 className="text-2xl font-bold mb-2">{title}</h2>
		<p className="text-primary font-medium mb-4">{role}</p>
		<p className="text-muted-foreground mb-6">{description}</p>
		<div className="flex flex-wrap justify-center gap-2 mb-8">
			{highlights.map((item) => (
				<Badge key={item} variant="secondary">
					{item}
				</Badge>
			))}
		</div>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
