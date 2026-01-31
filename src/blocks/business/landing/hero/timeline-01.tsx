import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="slate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div>
						<Eyebrow icon={Clock} text="Time-Saving Solutions" />
						<Title
							text="Reclaim Your Most Precious Resource"
							highlight="Time"
						/>
						<Description text="Automate the mundane. Focus on what matters. Our platform handles the repetitive tasks so your team can innovate." />
						<CTA
							items={[
								{ label: 'Save Time Now', href: '#save', icon: ArrowRight },
								{ label: 'Calculate ROI', href: '#roi', variant: 'outline' },
							]}
						/>
					</div>
					<Timeline
						items={[
							{
								time: 'Week 1',
								title: 'Onboarding',
								description: 'Quick setup and team training',
								status: 'complete',
							},
							{
								time: 'Week 2',
								title: 'Integration',
								description: 'Connect your existing tools',
								status: 'complete',
							},
							{
								time: 'Week 3',
								title: 'Automation',
								description: 'Configure workflows',
								status: 'current',
							},
							{
								time: 'Week 4',
								title: 'Optimization',
								description: 'Fine-tune and scale',
								status: 'upcoming',
							},
						]}
					/>
				</div>
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
	<Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text.split(highlight)[0]}
		<span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
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
	<div className="flex flex-wrap gap-3 @md:gap-4">
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

const Timeline = ({
	items,
}: {
	items: {
		time: string;
		title: string;
		description: string;
		status: 'complete' | 'current' | 'upcoming';
	}[];
}) => (
	<div className="relative">
		<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
		<div className="space-y-6">
			{items.map(({ time, title, description, status }, i) => (
				<div key={i} className="relative flex gap-4 pl-10">
					<div
						className={`absolute left-0 size-8 rounded-full flex items-center justify-center ${
							status === 'complete'
								? 'bg-primary text-primary-foreground'
								: status === 'current'
									? 'bg-primary/20 border-2 border-primary'
									: 'bg-muted border-2 border-border'
						}`}
					>
						{status === 'complete' ? (
							<CheckCircle2 className="size-4" />
						) : (
							<span className="text-xs font-medium">{i + 1}</span>
						)}
					</div>
					<div
						className={`flex-1 p-4 rounded-lg border ${
							status === 'current'
								? 'bg-primary/5 border-primary/30'
								: 'bg-card border-border'
						}`}
					>
						<div className="flex items-center gap-2 mb-1">
							<Calendar className="size-3.5 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">{time}</span>
						</div>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);
