import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, XCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface BeforeAfterItem {
	before: string;
	after: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Zap} text="The Transformation" />
					<Title text="Before and After" highlight="Our Platform" />
					<Description text="See the dramatic difference our platform makes in your daily operations." />
				</div>

				<BeforeAfterComparison
					items={[
						{
							before: 'Manual data entry for hours',
							after: 'Automated sync in seconds',
						},
						{
							before: 'Scattered tools and logins',
							after: 'One unified platform',
						},
						{ before: 'Delayed reporting', after: 'Real-time analytics' },
						{
							before: 'Siloed team communication',
							after: 'Seamless collaboration',
						},
						{ before: 'Fragmented customer data', after: '360° customer view' },
						{
							before: 'Reactive problem solving',
							after: 'Proactive insights with AI',
						},
					]}
				/>

				<CTASection label="Experience the Difference" href="/signup" />
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
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const BeforeAfterComparison = ({ items }: { items: BeforeAfterItem[] }) => (
	<div className="grid gap-4 @lg:grid-cols-2 max-w-4xl mx-auto">
		<Card className="border-red-500/20 bg-red-500/5">
			<CardContent className="p-6">
				<h3 className="mb-4 text-lg font-semibold flex items-center gap-2 text-red-500">
					<XCircle className="size-5" />
					Before
				</h3>
				<ul className="space-y-3">
					{items.map((item, index) => (
						<li
							key={index}
							className="flex items-center gap-3 text-sm text-muted-foreground"
						>
							<div className="size-1.5 rounded-full bg-red-500/50 shrink-0" />
							{item.before}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
		<Card className="border-emerald-500/20 bg-emerald-500/5">
			<CardContent className="p-6">
				<h3 className="mb-4 text-lg font-semibold flex items-center gap-2 text-emerald-500">
					<CheckCircle className="size-5" />
					After
				</h3>
				<ul className="space-y-3">
					{items.map((item, index) => (
						<li key={index} className="flex items-center gap-3 text-sm">
							<div className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
							{item.after}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
