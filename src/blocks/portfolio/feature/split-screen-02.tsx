import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<ContentBlock
						eyebrow="Design Philosophy"
						title="Form Follows Function"
						description="I believe that beautiful design should never compromise usability. Every visual decision is made with purpose, ensuring that aesthetics enhance rather than hinder the user experience."
						features={[
							{
								title: 'User Research',
								description: 'Deep understanding of target users',
							},
							{
								title: 'Iterative Design',
								description: 'Continuous refinement process',
							},
							{
								title: 'Accessibility',
								description: 'Inclusive design for all',
							},
						]}
						cta={{ label: 'See My Process', href: '#process' }}
					/>

					<ImageBlock
						src="https://picsum.photos/seed/design-process/800/900"
						alt="Design process visualization"
					/>
				</div>
			</div>
		</section>
	);
}

interface ContentBlockProps {
	eyebrow: string;
	title: string;
	description: string;
	features: { title: string; description: string }[];
	cta: { label: string; href: string };
}

const ContentBlock = ({
	eyebrow,
	title,
	description,
	features,
	cta,
}: ContentBlockProps) => (
	<div>
		<Badge variant="outline" className="mb-3 @md:mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
			{description}
		</p>

		<div className="space-y-4 mb-6 @md:mb-8">
			{features.map(({ title, description }, i) => (
				<div key={i} className="flex gap-4">
					<div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
					<div>
						<h3 className="font-semibold mb-0.5">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>
			))}
		</div>

		<Button size="lg" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

interface ImageBlockProps {
	src: string;
	alt: string;
}

const ImageBlock = ({ src, alt }: ImageBlockProps) => (
	<Card className="py-0 overflow-hidden">
		<CardContent className="p-0">
			<div className="relative aspect-[4/5]">
				<Image src={src} alt={alt} fill className="object-cover" />
			</div>
		</CardContent>
	</Card>
);
