import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Recognition" />
					<Title text="Award-Winning Work" />
					<Description text="Projects that received industry recognition and awards." />
				</div>

				<AwardShowcase
					items={[
						{
							image: 'https://picsum.photos/seed/award1/1000/700',
							title: 'Sustainable City Dashboard',
							description:
								'Smart city monitoring platform tracking environmental impact and urban sustainability metrics.',
							awards: [
								{ name: 'Webby Award', year: '2025' },
								{ name: 'CSS Design Award', year: '2025' },
							],
							tags: ['React', 'D3.js', 'IoT'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/award2/1000/700',
							title: 'Mental Wellness Application',
							description:
								'Mobile app providing guided meditation, mood tracking, and therapy session booking.',
							awards: [{ name: 'Apple Design Award', year: '2024' }],
							tags: ['React Native', 'HealthKit', 'AI'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/award3/1000/700',
							title: 'Immersive E-Learning',
							description:
								'VR-enabled education platform with interactive 3D learning environments.',
							awards: [
								{ name: 'EdTech Innovation', year: '2024' },
								{ name: 'UX Design Award', year: '2024' },
							],
							tags: ['Three.js', 'WebXR', 'Next.js'],
							href: '#',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface AwardBadge {
	name: string;
	year: string;
}

interface AwardItem {
	image: string;
	title: string;
	description: string;
	awards: AwardBadge[];
	tags: string[];
	href: string;
}

const AwardShowcase = ({ items }: { items: AwardItem[] }) => (
	<div className="space-y-8">
		{items.map(({ image, title, description, awards, tags, href }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<div className="grid @lg:grid-cols-[1fr_1.2fr]">
					<div className="relative aspect-video @lg:aspect-auto @lg:min-h-[350px] overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						{/* Award badges overlay */}
						<div className="absolute top-4 left-4 flex flex-wrap gap-2">
							{awards.map(({ name, year }, j) => (
								<Badge
									key={j}
									className="bg-yellow-500/90 text-yellow-950 gap-1.5"
								>
									<Award className="size-3" />
									{name} {year}
								</Badge>
							))}
						</div>
					</div>

					<CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
						<h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3">
							{title}
						</h3>
						<p className="text-muted-foreground mb-6 leading-relaxed">
							{description}
						</p>

						<div className="flex flex-wrap gap-2 mb-8">
							{tags.map((tag, j) => (
								<Badge key={j} variant="outline">
									{tag}
								</Badge>
							))}
						</div>

						<div className="flex gap-3">
							<Button className="gap-2" asChild>
								<Link href={href}>
									View Case Study <ArrowUpRight className="size-4" />
								</Link>
							</Button>
							<Button variant="outline" className="gap-2" asChild>
								<Link href={href}>
									<ExternalLink className="size-4" />
									Live Site
								</Link>
							</Button>
						</div>
					</CardContent>
				</div>
			</Card>
		))}
	</div>
);
