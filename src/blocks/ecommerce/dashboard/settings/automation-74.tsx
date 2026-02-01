import {
	ArrowRight,
	Check,
	ChevronDown,
	Clock,
	Filter,
	MoreVertical,
	Pause,
	Play,
	Plus,
	Settings2,
	Trash2,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

type Automation = {
	id: string;
	name: string;
	trigger: string;
	action: string;
	status: 'active' | 'paused' | 'draft';
	runs: number;
	lastRun?: string;
};

type AutomationTemplate = {
	id: string;
	name: string;
	description: string;
	category: string;
};

const AutomationCard = ({
	name,
	trigger,
	action,
	status,
	runs,
	lastRun,
}: Automation) => {
	const statusStyles = {
		active: 'bg-emerald-500/10 text-emerald-500',
		paused: 'bg-amber-500/10 text-amber-500',
		draft: 'bg-muted text-muted-foreground',
	};

	return (
		<div
			className={`rounded-lg border p-4 ${
				status === 'active' ? 'border-primary/30' : ''
			}`}
		>
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold">{name}</h4>
						<Badge className={`${statusStyles[status]} border-0 text-xs`}>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					</div>
					<div className="mt-3 flex items-center gap-2 text-sm">
						<Badge variant="outline" className="gap-1">
							<Zap className="size-3" />
							{trigger}
						</Badge>
						<ArrowRight className="size-4 text-muted-foreground" />
						<Badge variant="outline" className="gap-1">
							{action}
						</Badge>
					</div>
					<div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
						<span>{runs.toLocaleString()} runs</span>
						{lastRun && <span>Last run: {lastRun}</span>}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Switch defaultChecked={status === 'active'} />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								<MoreVertical className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Settings2 className="mr-2 size-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Play className="mr-2 size-4" />
								Run Now
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								<Trash2 className="mr-2 size-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

const TemplateCard = ({ name, description, category }: AutomationTemplate) => (
	<div className="rounded-lg border p-4 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
		<div className="flex items-start justify-between">
			<div>
				<Badge variant="outline" className="text-xs mb-2">
					{category}
				</Badge>
				<h4 className="font-medium">{name}</h4>
				<p className="text-sm text-muted-foreground mt-1">{description}</p>
			</div>
			<Button variant="ghost" size="icon-sm">
				<Plus className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const automations: Automation[] = [
		{
			id: '1',
			name: 'Send order confirmation',
			trigger: 'Order Created',
			action: 'Send Email',
			status: 'active',
			runs: 1234,
			lastRun: '2 min ago',
		},
		{
			id: '2',
			name: 'Low stock alert',
			trigger: 'Inventory < 10',
			action: 'Notify Admin',
			status: 'active',
			runs: 89,
			lastRun: '5 hours ago',
		},
		{
			id: '3',
			name: 'VIP customer tag',
			trigger: 'Total Spend > $500',
			action: 'Add Tag',
			status: 'active',
			runs: 456,
			lastRun: '1 day ago',
		},
		{
			id: '4',
			name: 'Abandoned cart reminder',
			trigger: 'Cart Abandoned (1h)',
			action: 'Send Email',
			status: 'paused',
			runs: 234,
			lastRun: '3 days ago',
		},
	];

	const templates: AutomationTemplate[] = [
		{
			id: '1',
			name: 'Welcome email',
			description: 'Send welcome email to new customers',
			category: 'Email',
		},
		{
			id: '2',
			name: 'Review request',
			description: 'Ask for review 7 days after delivery',
			category: 'Email',
		},
		{
			id: '3',
			name: 'Refund notification',
			description: 'Notify customer of processed refund',
			category: 'Notification',
		},
		{
			id: '4',
			name: 'Restock alert',
			description: 'Notify customers when item is back in stock',
			category: 'Inventory',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Zap className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Automations</CardTitle>
										<CardDescription>
											Automate repetitive tasks and workflows
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Create Automation
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{automations.map((automation) => (
								<AutomationCard key={automation.id} {...automation} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Templates</CardTitle>
							<CardDescription>
								Get started quickly with pre-built automations
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								{templates.map((template) => (
									<TemplateCard key={template.id} {...template} />
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
