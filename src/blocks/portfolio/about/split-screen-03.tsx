import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Figma, Framer, Palette, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12">
					<ImageWithOverlay
						src="https://picsum.photos/seed/split3/800/900"
						alt="Sarah Kim"
						name="Sarah Kim"
						role="Design Lead"
					/>
					<ContentSection
						eyebrow={{ icon: Sparkles, text: 'Creative Designer' }}
						paragraphs={[
							"I'm a design lead passionate about creating products that feel magical to use. With 8 years in product design, I've helped companies from startups to Fortune 500s craft their digital experiences.",
							'My approach combines strategic thinking with pixel-perfect execution. I believe that great design tells a story and creates emotional connections.',
						]}
						tools={[
							{ icon: Figma, name: 'Figma' },
							{ icon: Framer, name: 'Framer' },
							{ icon: Palette, name: 'Illustrator' },
						]}
						cta={{
							label: 'See My Portfolio',
							href: '/portfolio',
							icon: ArrowUpRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface ImageWithOverlayProps {
	src: string;
	alt: string;
	name: string;
	role: string;
}

const ImageWithOverlay = ({ src, alt, name, role }: ImageWithOverlayProps) => (
	<div className="relative aspect-[4/5] @lg:aspect-auto @lg:h-full rounded-2xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
		<div className="absolute bottom-6 left-6 right-6 text-white">
			<h1 className="text-3xl @md:text-4xl font-bold mb-1">{name}</h1>
			<p className="text-white/80">{role}</p>
		</div>
	</div>
);

interface EyebrowData {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface ToolItem {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	eyebrow: EyebrowData;
	paragraphs: string[];
	tools: ToolItem[];
	cta: CTAData;
}

const ContentSection = ({
	eyebrow,
	paragraphs,
	tools,
	cta,
}: ContentSectionProps) => (
	<div className="flex flex-col justify-center">
		<Badge variant="secondary" className="w-fit mb-6">
			<eyebrow.icon className="size-3.5 mr-1" />
			{eyebrow.text}
		</Badge>
		<div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
			{paragraphs.map((text, i) => (
				<p key={i}>{text}</p>
			))}
		</div>
		<div className="mb-8">
			<p className="text-sm font-medium mb-4">Tools I Love</p>
			<div className="flex gap-4">
				{tools.map(({ icon: Icon, name }) => (
					<Card key={name} className="flex-1">
						<CardContent className="p-4 text-center">
							<Icon className="size-6 mx-auto mb-2 text-primary" />
							<span className="text-sm">{name}</span>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
		<Button size="lg" className="gap-2 w-fit" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
