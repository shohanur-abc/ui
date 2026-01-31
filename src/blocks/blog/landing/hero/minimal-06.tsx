import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative min-h-[60vh] flex items-center"
			data-theme="slate"
		>
			<div className="relative mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-16">
				<div className="flex flex-col items-center text-center">
					<Title lines={['Exploring ideas at', 'the edge of technology']} />
					<CTA label="Enter" href="/articles" />
				</div>
			</div>
		</section>
	);
}

interface TitleProps {
	lines: string[];
}

const Title = ({ lines }: TitleProps) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight leading-tight mb-10">
		{lines.map((line, i) => (
			<span key={i} className="block">
				{line}
			</span>
		))}
	</h1>
);

interface CTAProps {
	label: string;
	href: string;
}

const CTA = ({ label, href }: CTAProps) => (
	<Button
		variant="outline"
		size="lg"
		asChild
		className="gap-2 rounded-full px-8"
	>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);
