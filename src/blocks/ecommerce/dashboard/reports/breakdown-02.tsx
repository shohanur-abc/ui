'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import {
	DollarSign,
	CreditCard,
	Wallet,
	Building,
	Smartphone,
} from 'lucide-react';

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

type PaymentMethodProps = {
	method: string;
	icon: React.ElementType;
	transactions: string;
	amount: string;
	percentage: number;
	avgOrder: string;
};

const PaymentMethod = ({
	method,
	icon: Icon,
	transactions,
	amount,
	percentage,
	avgOrder,
}: PaymentMethodProps) => (
	<div className="flex items-center gap-4 rounded-lg border border-border/30 bg-muted/20 p-4">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-xs text-muted-foreground">
				{transactions} transactions
			</p>
			<Progress value={percentage} className="mt-2 h-1.5" />
		</div>
		<div className="text-right">
			<p className="font-bold">{amount}</p>
			<p className="text-xs text-muted-foreground">Avg: {avgOrder}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	amount: {
		label: 'Amount',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const methods: PaymentMethodProps[] = [
		{
			method: 'Credit Card',
			icon: CreditCard,
			transactions: '8,450',
			amount: '$685,200',
			percentage: 48,
			avgOrder: '$81.09',
		},
		{
			method: 'PayPal',
			icon: Wallet,
			transactions: '4,280',
			amount: '$342,400',
			percentage: 24,
			avgOrder: '$80.00',
		},
		{
			method: 'Bank Transfer',
			icon: Building,
			transactions: '2,150',
			amount: '$214,000',
			percentage: 15,
			avgOrder: '$99.53',
		},
		{
			method: 'Apple Pay',
			icon: Smartphone,
			transactions: '1,420',
			amount: '$128,800',
			percentage: 9,
			avgOrder: '$90.70',
		},
		{
			method: 'Other',
			icon: DollarSign,
			transactions: '580',
			amount: '$57,100',
			percentage: 4,
			avgOrder: '$98.45',
		},
	];

	const chartData = [
		{ name: 'Credit Card', amount: 685200 },
		{ name: 'PayPal', amount: 342400 },
		{ name: 'Bank Transfer', amount: 214000 },
		{ name: 'Apple Pay', amount: 128800 },
		{ name: 'Other', amount: 57100 },
	];

	const colors = [
		'var(--chart-1)',
		'var(--chart-2)',
		'var(--chart-3)',
		'var(--chart-4)',
		'var(--chart-5)',
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Payment Method Breakdown
						</CardTitle>
						<CardDescription>
							Transaction distribution by payment type
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<ChartContainer config={chartConfig} className="h-[200px] w-full">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ left: 100, right: 20 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									horizontal
									vertical={false}
								/>
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tickFormatter={(v) => `$${v / 1000}K`}
								/>
								<YAxis
									type="category"
									dataKey="name"
									tickLine={false}
									axisLine={false}
									width={90}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="amount" radius={4}>
									{chartData.map((_, index) => (
										<Cell key={`cell-${index}`} fill={colors[index]} />
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
							{methods.map((m, i) => (
								<PaymentMethod key={i} {...m} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
