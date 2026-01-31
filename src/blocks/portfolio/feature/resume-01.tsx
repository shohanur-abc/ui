import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ResumeSection
					eyebrow="Resume"
					title="Download My CV"
					description="Get a detailed overview of my experience, skills, and education in PDF format."
					formats={[
						{ name: 'Full Resume', size: '420 KB', href: '#resume-full' },
						{ name: 'One-Page Summary', size: '180 KB', href: '#resume-short' },
					]}
				/>
			</div>
		</section>
	);
}

interface FormatItem {
	name: string;
	size: string;
	href: string;
}

interface ResumeSectionProps {
	eyebrow: string;
	title: string;
	description: string;
	formats: FormatItem[];
}

const ResumeSection = ({
	eyebrow,
	title,
	description,
	formats,
}: ResumeSectionProps) => (
	<div className="max-w-3xl mx-auto text-center">
		<Badge variant="outline" className="mb-3 @md:mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8 @md:mb-10">
			{description}
		</p>

		<div className="flex flex-wrap items-center justify-center gap-4">
			{formats.map(({ name, size, href }, i) => (
				<Button
					key={i}
					variant={i === 0 ? 'default' : 'outline'}
					size="lg"
					asChild
				>
					<Link href={href}>
						{i === 0 ? (
							<Download className="size-4" />
						) : (
							<FileText className="size-4" />
						)}
						{name}
						<span className="text-xs text-muted-foreground">({size})</span>
					</Link>
				</Button>
			))}
		</div>
	</div>
);
