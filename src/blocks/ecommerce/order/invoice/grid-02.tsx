import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Clock,
	DollarSign,
	Flag,
	Target,
	TrendingUp,
} from 'lucide-react';

interface ProjectMetricProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	subtext?: string;
	color: string;
}

interface MilestoneProps {
	name: string;
	amount: number;
	status: string;
}

interface ExpenseProps {
	category: string;
	amount: number;
}

interface SummaryProps {
	billed: number;
	paid: number;
	outstanding: number;
	currency: string;
}

const MetricCard = ({
	icon,
	label,
	value,
	subtext,
	color,
}: ProjectMetricProps) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-start gap-3">
				<div
					className={`size-10 rounded-lg flex items-center justify-center ${color}`}
				>
					{icon}
				</div>
				<div>
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="text-xl font-bold">{value}</p>
					{subtext && (
						<p className="text-xs text-muted-foreground">{subtext}</p>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

const MilestoneCard = ({
	milestone,
	currency,
}: {
	milestone: MilestoneProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					{milestone.status === 'Complete' ? (
						<CheckCircle className="size-4 text-green-500" />
					) : (
						<Clock className="size-4 text-muted-foreground" />
					)}
					<span className="text-sm font-medium">{milestone.name}</span>
				</div>
				<Badge
					variant={milestone.status === 'Complete' ? 'default' : 'outline'}
				>
					{currency}
					{milestone.amount.toLocaleString()}
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const ExpenseCard = ({
	expense,
	total,
	currency,
}: {
	expense: ExpenseProps;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4 space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span>{expense.category}</span>
				<span className="font-medium">
					{currency}
					{expense.amount.toLocaleString()}
				</span>
			</div>
			<Progress value={(expense.amount / total) * 100} className="h-1.5" />
		</CardContent>
	</Card>
);

const SummaryCard = ({ billed, paid, outstanding, currency }: SummaryProps) => (
	<Card className="bg-gradient-to-br from-primary/10 to-primary/5">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">Payment Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Total Billed</span>
				<span className="font-medium">
					{currency}
					{billed.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-600">
				<span>Paid</span>
				<span className="font-medium">
					-{currency}
					{paid.toLocaleString()}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold">
				<span>Outstanding</span>
				<span className="text-primary">
					{currency}
					{outstanding.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: ProjectMetricProps[] = [
		{
			icon: <Target className="size-5 text-blue-600" />,
			label: 'Project Budget',
			value: '$125,000',
			subtext: 'Fixed Price',
			color: 'bg-blue-100',
		},
		{
			icon: <TrendingUp className="size-5 text-green-600" />,
			label: 'Completion',
			value: '68%',
			subtext: 'On Track',
			color: 'bg-green-100',
		},
		{
			icon: <DollarSign className="size-5 text-amber-600" />,
			label: 'Revenue',
			value: '$85,000',
			subtext: 'YTD Billed',
			color: 'bg-amber-100',
		},
		{
			icon: <Flag className="size-5 text-purple-600" />,
			label: 'Milestones',
			value: '4/6',
			subtext: 'Complete',
			color: 'bg-purple-100',
		},
	];

	const milestones: MilestoneProps[] = [
		{ name: 'Discovery Phase', amount: 15000, status: 'Complete' },
		{ name: 'Design Phase', amount: 25000, status: 'Complete' },
		{ name: 'Development', amount: 45000, status: 'In Progress' },
		{ name: 'Testing & QA', amount: 20000, status: 'Pending' },
		{ name: 'Deployment', amount: 15000, status: 'Pending' },
		{ name: 'Training', amount: 5000, status: 'Pending' },
	];

	const expenses: ExpenseProps[] = [
		{ category: 'Labor', amount: 65000 },
		{ category: 'Software', amount: 12000 },
		{ category: 'Hardware', amount: 8000 },
	];

	const summary: SummaryProps = {
		billed: 85000,
		paid: 60000,
		outstanding: 25000,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{metrics.map((metric, index) => (
						<MetricCard key={index} {...metric} />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<div className="@md:col-span-2 space-y-4">
						<h3 className="text-sm font-medium text-muted-foreground">
							Milestones
						</h3>
						<div className="grid @sm:grid-cols-2 gap-2">
							{milestones.map((milestone, index) => (
								<MilestoneCard key={index} milestone={milestone} currency="$" />
							))}
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-sm font-medium text-muted-foreground">
							Expenses
						</h3>
						{expenses.map((expense, index) => (
							<ExpenseCard
								key={index}
								expense={expense}
								total={85000}
								currency="$"
							/>
						))}
						<SummaryCard {...summary} />
					</div>
				</div>
			</div>
		</section>
	);
}
