import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative" data-theme="neon">
			<div className="relative mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-8 @lg:gap-16 items-end">
					<TitleBlock text="Developer, writer, and lifelong learner." />
					<DescriptionBlock
						text="I share what I learn about building software, growing as a developer, and navigating the tech industry."
						cta={{ label: 'View all posts', href: '/posts' }}
					/>
				</div>
			</div>
			<Divider />
		</section>
	);
}

interface TitleBlockProps {
	text: string;
}

const TitleBlock = ({ text }: TitleBlockProps) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

interface DescriptionBlockProps {
	text: string;
	cta: { label: string; href: string };
}

const DescriptionBlock = ({ text, cta }: DescriptionBlockProps) => (
	<div>
		<p className="text-lg text-muted-foreground mb-6">{text}</p>
		<Button variant="link" asChild className="gap-2 p-0 h-auto">
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const Divider = () => (
	<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 mt-8">
		<div className="h-px bg-border" />
	</div>
);
