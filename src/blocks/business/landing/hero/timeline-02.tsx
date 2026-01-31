import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Milestone, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="amber">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @md:mb-16">
					<Eyebrow icon={Milestone} text="Your Journey to Success" />
					<Title text="From Idea to Impact in 4 Simple Steps" />
					<Description text="Our proven methodology takes you from concept to market leader. Join thousands who&apos;ve transformed their businesses." />
					<CTA
						items={[
							{ label: 'Start Your Journey', href: '#start', icon: ArrowRight },
							{
								label: 'See Success Stories',
								href: '#stories',
								variant: 'outline',
							},
						]}
					/>
				</div>
				<HorizontalTimeline
					items={[
						{
							step: 1,
							title: 'Discovery',
							description: 'Deep dive into your business needs and goals',
							status: 'complete',
						},
						{
							step: 2,
							title: 'Strategy',
							description: 'Craft a tailored roadmap for success',
							status: 'complete',
						},
						{
							step: 3,
							title: 'Execution',
							description: 'Implement with precision and agility',
							status: 'current',
						},
						{
							step: 4,
							title: 'Scale',
							description: 'Grow and optimize for maximum impact',
							status: 'upcoming',
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
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
		{text}
	</p>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const HorizontalTimeline = ({
	items,
}: {
	items: {
		step: number;
		title: string;
		description: string;
		status: 'complete' | 'current' | 'upcoming';
	}[];
}) => (
	<div className="relative">
		{/* Mobile: Vertical */}
		<div className="@xl:hidden space-y-4">
			{items.map(({ step, title, description, status }, i) => (
				<div key={i} className="flex gap-4">
					<div className="flex flex-col items-center">
						<div
							className={`size-10 rounded-full flex items-center justify-center font-bold ${
								status === 'complete'
									? 'bg-primary text-primary-foreground'
									: status === 'current'
										? 'bg-primary/20 border-2 border-primary text-primary'
										: 'bg-muted text-muted-foreground border-2 border-border'
							}`}
						>
							{status === 'complete' ? (
								<CheckCircle className="size-5" />
							) : (
								step
							)}
						</div>
						{i < items.length - 1 && (
							<div className="w-0.5 h-full min-h-12 bg-border mt-2" />
						)}
					</div>
					<div
						className={`flex-1 p-4 rounded-lg border ${
							status === 'current'
								? 'bg-primary/5 border-primary/30'
								: 'bg-card'
						}`}
					>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>
			))}
		</div>

		{/* Desktop: Horizontal */}
		<div className="hidden @xl:block">
			<div className="flex items-center justify-between mb-6">
				{items.map(({ step, title, status }, i) => (
					<div key={i} className="flex items-center flex-1">
						<div
							className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${
								status === 'complete'
									? 'bg-primary text-primary-foreground'
									: status === 'current'
										? 'bg-primary/20 border-2 border-primary text-primary'
										: 'bg-muted text-muted-foreground border-2 border-border'
							}`}
						>
							{status === 'complete' ? (
								<CheckCircle className="size-6" />
							) : (
								step
							)}
						</div>
						{i < items.length - 1 && (
							<div
								className={`flex-1 h-1 mx-4 rounded ${
									status === 'complete' ? 'bg-primary' : 'bg-border'
								}`}
							/>
						)}
					</div>
				))}
			</div>
			<div className="grid grid-cols-4 gap-4">
				{items.map(({ title, description, status }, i) => (
					<div
						key={i}
						className={`p-4 rounded-lg border text-center ${
							status === 'current'
								? 'bg-primary/5 border-primary/30'
								: 'bg-card'
						}`}
					>
						<h3 className="font-semibold mb-2">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				))}
			</div>
		</div>
	</div>
);
