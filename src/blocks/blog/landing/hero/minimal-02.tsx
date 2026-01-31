import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative" data-theme="corporate">
			<div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="flex flex-col">
					<Eyebrow text="A blog about code" />
					<Title text="Writing about software, startups, and the things I learn along the way." />
					<CTAGroup
						primary={{ label: 'Start reading', href: '/articles' }}
						secondary={{ label: 'About me', href: '/about' }}
					/>
				</div>
			</div>
			<Divider />
		</section>
	);
}

interface EyebrowProps {
	text: string;
}

const Eyebrow = ({ text }: EyebrowProps) => (
	<p className="text-sm font-medium text-muted-foreground mb-4">{text}</p>
);

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight mb-8 max-w-3xl">
		{text}
	</h1>
);

interface CTAGroupProps {
	primary: { label: string; href: string };
	secondary: { label: string; href: string };
}

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
	<div className="flex gap-6">
		<Button variant="link" asChild className="gap-2 p-0 h-auto">
			<Link href={primary.href}>
				{primary.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
		<Button
			variant="link"
			asChild
			className="gap-2 p-0 h-auto text-muted-foreground"
		>
			<Link href={secondary.href}>{secondary.label}</Link>
		</Button>
	</div>
);

const Divider = () => (
	<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8">
		<div className="h-px bg-border" />
	</div>
);
