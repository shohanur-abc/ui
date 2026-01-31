import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Workflow, GitBranch, Play, Check } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="slate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Workflow} text="Automation" />
					<Title text="Automate Any Workflow" />
					<Description text="Build powerful automations with our visual workflow builder. No coding required—just drag, drop, and watch the magic happen." />
					<CTA
						items={[
							{
								label: 'Build Your First Automation',
								href: '#automation',
								icon: ArrowRight,
							},
							{
								label: 'View Templates',
								href: '#templates',
								variant: 'outline',
							},
						]}
					/>
				</div>
				<WorkflowDiagram />
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
	<Badge variant="outline" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
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

const WorkflowDiagram = () => (
	<div className="max-w-4xl mx-auto">
		<Card className="overflow-hidden">
			<CardContent className="pt-6">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<Badge variant="secondary">Example Workflow</Badge>
						<span className="text-sm text-muted-foreground">
							Lead Nurturing Automation
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Badge className="bg-green-500/10 text-green-500 border-green-500/30">
							Active
						</Badge>
						<Button variant="outline" size="sm" className="gap-1">
							<Play className="size-3" />
							Test
						</Button>
					</div>
				</div>

				<div className="relative">
					{/* Workflow nodes */}
					<div className="flex flex-col @md:flex-row items-center gap-4 @md:gap-0">
						<WorkflowNode
							icon={Play}
							title="Trigger"
							description="New form submission"
							status="complete"
						/>
						<WorkflowConnector />
						<WorkflowNode
							icon={GitBranch}
							title="Condition"
							description="If score > 50"
							status="complete"
						/>
						<WorkflowConnector />
						<WorkflowNode
							icon={Check}
							title="Action"
							description="Add to CRM"
							status="active"
						/>
						<WorkflowConnector />
						<WorkflowNode
							icon={Check}
							title="Action"
							description="Send email"
							status="pending"
						/>
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-border">
					<div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
						<span className="flex items-center gap-2">
							<span className="size-2 rounded-full bg-green-500" />
							Completed: 1,234
						</span>
						<span className="flex items-center gap-2">
							<span className="size-2 rounded-full bg-primary" />
							In Progress: 56
						</span>
						<span className="flex items-center gap-2">
							<span className="size-2 rounded-full bg-muted-foreground" />
							Pending: 890
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

const WorkflowNode = ({
	icon: Icon,
	title,
	description,
	status,
}: {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	status: 'complete' | 'active' | 'pending';
}) => (
	<div
		className={`flex-shrink-0 w-full @md:w-auto p-4 rounded-xl border-2 transition-all ${
			status === 'complete'
				? 'bg-green-500/5 border-green-500/30'
				: status === 'active'
					? 'bg-primary/5 border-primary/50 shadow-lg shadow-primary/10'
					: 'bg-muted/50 border-border'
		}`}
	>
		<div
			className={`size-10 rounded-lg flex items-center justify-center mb-2 ${
				status === 'complete'
					? 'bg-green-500/10'
					: status === 'active'
						? 'bg-primary/10'
						: 'bg-muted'
			}`}
		>
			<Icon
				className={`size-5 ${
					status === 'complete'
						? 'text-green-500'
						: status === 'active'
							? 'text-primary'
							: 'text-muted-foreground'
				}`}
			/>
		</div>
		<p className="font-medium text-sm">{title}</p>
		<p className="text-xs text-muted-foreground">{description}</p>
	</div>
);

const WorkflowConnector = () => (
	<div className="hidden @md:flex items-center justify-center w-12 shrink-0">
		<ArrowRight className="size-5 text-muted-foreground" />
	</div>
);
