import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Award, Code, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<ContentSection
						eyebrow={{ icon: Lightbulb, text: 'Innovation Leader' }}
						title="Kevin Martinez"
						role="Head of Engineering"
						description="I build and scale engineering teams that ship great products. With experience leading 100+ engineers, I focus on creating cultures of innovation, autonomy, and excellence."
						highlights={[
							{ icon: Users, value: '100+', label: 'Engineers Managed' },
							{ icon: Code, value: '50+', label: 'Products Shipped' },
							{ icon: Award, value: '5', label: 'Company Awards' },
						]}
						values={[
							'Servant Leadership',
							'Technical Excellence',
							'Continuous Learning',
							'Work-Life Balance',
						]}
						cta={{
							label: 'Connect on LinkedIn',
							href: 'https://linkedin.com',
							icon: ArrowRight,
						}}
					/>
					<ImageGrid
						images={[
							{
								src: 'https://picsum.photos/seed/split10a/400/400',
								alt: 'Speaking',
							},
							{
								src: 'https://picsum.photos/seed/split10b/400/400',
								alt: 'Team',
							},
							{
								src: 'https://picsum.photos/seed/split10c/400/400',
								alt: 'Working',
							},
							{
								src: 'https://picsum.photos/seed/split10d/400/400',
								alt: 'Conference',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface EyebrowData {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface HighlightItem {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	eyebrow: EyebrowData;
	title: string;
	role: string;
	description: string;
	highlights: HighlightItem[];
	values: string[];
	cta: CTAData;
}

const ContentSection = ({
	eyebrow,
	title,
	role,
	description,
	highlights,
	values,
	cta,
}: ContentSectionProps) => (
	<div>
		<Badge variant="secondary" className="mb-4">
			<eyebrow.icon className="size-3.5 mr-1" />
			{eyebrow.text}
		</Badge>
		<h1 className="text-4xl @sm:text-5xl font-bold tracking-tight mb-2">
			{title}
		</h1>
		<p className="text-lg text-primary font-medium mb-6">{role}</p>
		<p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
		<div className="flex gap-8 mb-6">
			{highlights.map(({ icon: Icon, value, label }, i) => (
				<div key={i} className="text-center">
					<Icon className="size-5 text-primary mx-auto mb-1" />
					<div className="text-xl @md:text-2xl font-bold">{value}</div>
					<div className="text-xs text-muted-foreground">{label}</div>
				</div>
			))}
		</div>
		<Separator className="my-6" />
		<div className="mb-8">
			<p className="text-sm font-medium mb-3">Core Values</p>
			<div className="flex flex-wrap gap-2">
				{values.map((value) => (
					<Badge key={value} variant="outline">
						{value}
					</Badge>
				))}
			</div>
		</div>
		<Button size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);

interface ImageItem {
	src: string;
	alt: string;
}

const ImageGrid = ({ images }: { images: ImageItem[] }) => (
	<div className="grid grid-cols-2 gap-4">
		{images.map(({ src, alt }, i) => (
			<div
				key={i}
				className="relative aspect-square rounded-xl overflow-hidden"
			>
				<Image
					src={src}
					alt={alt}
					fill
					className="object-cover hover:scale-105 transition-transform duration-300"
				/>
			</div>
		))}
	</div>
);
