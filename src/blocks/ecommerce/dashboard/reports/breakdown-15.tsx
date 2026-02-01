'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { HeadphonesIcon, MessageCircle, Mail, Phone, Bot } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type ChannelProps = {
	channel: string;
	icon: React.ElementType;
	tickets: string;
	percentage: number;
	avgResponse: string;
	satisfaction: number;
	color: string;
};

const ChannelCard = ({
	channel,
	icon: Icon,
	tickets,
	percentage,
	avgResponse,
	satisfaction,
	color,
}: ChannelProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div
					className="rounded-lg p-2"
					style={{ backgroundColor: `${color}20` }}
				>
					<Icon className="size-4" style={{ color }} />
				</div>
				<div>
					<p className="font-medium">{channel}</p>
					<p className="text-xs text-muted-foreground">{tickets} tickets</p>
				</div>
				<Badge variant="outline" className="ml-auto text-xs">
					{percentage}%
				</Badge>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Avg Response</span>
					<span className="font-medium">{avgResponse}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Satisfaction</span>
					<span className="font-medium">{satisfaction}%</span>
				</div>
				<Progress value={satisfaction} className="h-1.5" />
			</div>
		</CardContent>
	</Card>
);

type IssueProps = {
	issue: string;
	count: string;
	percentage: number;
};

const chartConfig: ChartConfig = {
	tickets: {
		label: 'Tickets',
	},
};

export default function Main() {
	const channels: ChannelProps[] = [
		{
			channel: 'Live Chat',
			icon: MessageCircle,
			tickets: '4,850',
			percentage: 38,
			avgResponse: '2 min',
			satisfaction: 92,
			color: 'var(--chart-1)',
		},
		{
			channel: 'Email',
			icon: Mail,
			tickets: '3,420',
			percentage: 27,
			avgResponse: '4 hrs',
			satisfaction: 85,
			color: 'var(--chart-2)',
		},
		{
			channel: 'Phone',
			icon: Phone,
			tickets: '2,180',
			percentage: 17,
			avgResponse: '5 min',
			satisfaction: 88,
			color: 'var(--chart-3)',
		},
		{
			channel: 'AI Chatbot',
			icon: Bot,
			tickets: '2,350',
			percentage: 18,
			avgResponse: 'Instant',
			satisfaction: 78,
			color: 'var(--chart-4)',
		},
	];

	const issues: IssueProps[] = [
		{ issue: 'Order Status', count: '3,850', percentage: 30 },
		{ issue: 'Returns & Refunds', count: '2,580', percentage: 20 },
		{ issue: 'Product Questions', count: '2,180', percentage: 17 },
		{ issue: 'Shipping Issues', count: '1,920', percentage: 15 },
		{ issue: 'Payment Problems', count: '1,280', percentage: 10 },
		{ issue: 'Account Issues', count: '990', percentage: 8 },
	];

	const chartData = channels.map((c) => ({
		name: c.channel,
		value: c.percentage,
		fill: c.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<HeadphonesIcon className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Support Channel Breakdown
								</CardTitle>
								<CardDescription>
									Customer support distribution and performance
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">12,800 Total Tickets</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{channels.map((c, i) => (
								<ChannelCard key={i} {...c} />
							))}
						</div>
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[280px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">
										Top Issue Categories
									</p>
									<div className="space-y-3">
										{issues.map((issue, i) => (
											<div key={i} className="flex items-center gap-3">
												<span className="w-32 text-sm font-medium">
													{issue.issue}
												</span>
												<div className="flex-1">
													<Progress value={issue.percentage} className="h-2" />
												</div>
												<span className="w-14 text-right text-sm text-muted-foreground">
													{issue.count}
												</span>
												<span className="w-10 text-right text-sm font-medium">
													{issue.percentage}%
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
