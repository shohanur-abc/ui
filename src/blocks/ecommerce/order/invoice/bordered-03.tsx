import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';

interface ProjectProps {
	name: string;
	client: string;
	startDate: string;
	endDate: string;
	manager: string;
}

interface PhaseProps {
	name: string;
	hours: number;
	rate: number;
	status: string;
	progress: number;
}

interface ExpenseProps {
	category: string;
	description: string;
	amount: number;
}

interface SummaryProps {
	totalHours: number;
	laborCost: number;
	expenses: number;
	total: number;
	currency: string;
}

const ProjectHeader = ({
	name,
	client,
	startDate,
	endDate,
	manager,
}: ProjectProps) => (
	<div className="border-l-8 border-primary bg-muted/30 p-6">
		<div className="flex items-start justify-between">
			<div>
				<Badge variant="outline" className="mb-2 rounded-none">
					Project Invoice
				</Badge>
				<h1 className="text-2xl font-bold">{name}</h1>
				<p className="text-muted-foreground">{client}</p>
			</div>
			<div className="text-right text-sm">
				<p className="flex items-center gap-2 justify-end text-muted-foreground">
					<Calendar className="size-4" />
					{startDate} - {endDate}
				</p>
				<p className="flex items-center gap-2 justify-end mt-1">
					<Users className="size-4" />
					PM: {manager}
				</p>
			</div>
		</div>
	</div>
);

const PhaseRow = ({
	phase,
	currency,
}: {
	phase: PhaseProps;
	currency: string;
}) => (
	<div className="border-l-4 border-foreground/30 hover:border-primary transition-colors p-4 bg-background">
		<div className="flex items-start justify-between mb-3">
			<div className="flex items-center gap-2">
				{phase.status === 'Complete' ? (
					<CheckCircle className="size-4 text-green-500" />
				) : (
					<Clock className="size-4 text-amber-500" />
				)}
				<span className="font-medium">{phase.name}</span>
				<Badge
					variant={phase.status === 'Complete' ? 'default' : 'secondary'}
					className="rounded-none text-[10px]"
				>
					{phase.status}
				</Badge>
			</div>
			<span className="font-bold">
				{currency}
				{(phase.hours * phase.rate).toLocaleString()}
			</span>
		</div>
		<div className="flex items-center gap-4">
			<div className="flex-1">
				<Progress value={phase.progress} className="h-2" />
			</div>
			<div className="flex gap-4 text-sm text-muted-foreground">
				<span>
					{phase.hours}h × {currency}
					{phase.rate}/h
				</span>
				<span>{phase.progress}%</span>
			</div>
		</div>
	</div>
);

const ExpenseRow = ({
	expense,
	currency,
}: {
	expense: ExpenseProps;
	currency: string;
}) => (
	<div className="border-l-4 border-amber-500 p-4 bg-amber-50 dark:bg-amber-950/20">
		<div className="flex items-center justify-between">
			<div>
				<Badge variant="outline" className="rounded-none text-[10px] mb-1">
					{expense.category}
				</Badge>
				<p className="text-sm">{expense.description}</p>
			</div>
			<span className="font-bold">
				{currency}
				{expense.amount.toFixed(2)}
			</span>
		</div>
	</div>
);

const SummaryBox = ({
	totalHours,
	laborCost,
	expenses,
	total,
	currency,
}: SummaryProps) => (
	<div className="border-l-8 border-primary bg-primary/5 p-6">
		<h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary pb-2 mb-4">
			Invoice Summary
		</h3>
		<div className="space-y-3">
			<div className="flex justify-between">
				<span className="flex items-center gap-2">
					<Clock className="size-4 text-muted-foreground" />
					Total Hours
				</span>
				<span className="font-medium">{totalHours}h</span>
			</div>
			<div className="flex justify-between">
				<span className="flex items-center gap-2">
					<DollarSign className="size-4 text-muted-foreground" />
					Labor
				</span>
				<span className="font-medium">
					{currency}
					{laborCost.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between">
				<span>Expenses</span>
				<span className="font-medium">
					{currency}
					{expenses.toLocaleString()}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-xl font-bold">
				<span>Total Due</span>
				<span className="text-primary">
					{currency}
					{total.toLocaleString()}
				</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const project: ProjectProps = {
		name: 'E-Commerce Platform Redesign',
		client: 'Retail Solutions Corp',
		startDate: 'Jan 15, 2024',
		endDate: 'Mar 30, 2024',
		manager: 'Sarah Chen',
	};

	const phases: PhaseProps[] = [
		{
			name: 'Discovery & Research',
			hours: 40,
			rate: 150,
			status: 'Complete',
			progress: 100,
		},
		{
			name: 'UX Strategy & Wireframes',
			hours: 60,
			rate: 150,
			status: 'Complete',
			progress: 100,
		},
		{
			name: 'Visual Design',
			hours: 80,
			rate: 150,
			status: 'Complete',
			progress: 100,
		},
		{
			name: 'Frontend Development',
			hours: 120,
			rate: 175,
			status: 'In Progress',
			progress: 75,
		},
		{
			name: 'Backend Integration',
			hours: 80,
			rate: 175,
			status: 'In Progress',
			progress: 40,
		},
		{
			name: 'Testing & QA',
			hours: 40,
			rate: 125,
			status: 'Pending',
			progress: 0,
		},
	];

	const expenses: ExpenseProps[] = [
		{
			category: 'Software',
			description: 'Design tool licenses (Figma, Adobe CC)',
			amount: 450,
		},
		{
			category: 'Stock Assets',
			description: 'Premium photography and icons',
			amount: 280,
		},
		{
			category: 'Hosting',
			description: 'Staging environment setup',
			amount: 150,
		},
	];

	const summary: SummaryProps = {
		totalHours: 420,
		laborCost: 67000,
		expenses: 880,
		total: 67880,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<div className="space-y-1">
					<ProjectHeader {...project} />
					<p className="text-xs font-bold uppercase tracking-widest p-4 bg-muted/50">
						Project Phases
					</p>
					{phases.map((phase, index) => (
						<PhaseRow key={index} phase={phase} currency="$" />
					))}
					<p className="text-xs font-bold uppercase tracking-widest p-4 bg-muted/50">
						Expenses
					</p>
					{expenses.map((expense, index) => (
						<ExpenseRow key={index} expense={expense} currency="$" />
					))}
				</div>
				<div className="mt-4">
					<SummaryBox {...summary} />
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<Button variant="outline" className="rounded-none">
						View Timesheet
					</Button>
					<Button className="rounded-none">Pay Invoice</Button>
				</div>
			</div>
		</section>
	);
}
