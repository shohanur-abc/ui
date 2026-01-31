import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative" data-theme="slate">
			<div className="relative mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
				<div className="flex flex-col items-center text-center">
					<Title text="Thoughts on building the future" />
					<Description text="Essays on technology, design, and the craft of software." />
					<CTA label="Read the latest" href="/articles" />
				</div>
			</div>
		</section>
	);
}

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-6">
		{text}
	</h1>
);

interface DescriptionProps {
	text: string;
}

const Description = ({ text }: DescriptionProps) => (
	<p className="text-lg @md:text-xl text-muted-foreground mb-8">{text}</p>
);

interface CTAProps {
	label: string;
	href: string;
}

const CTA = ({ label, href }: CTAProps) => (
	<Button variant="link" asChild className="gap-2 text-lg p-0 h-auto">
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);
