import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Percent, DollarSign, TrendingUp } from 'lucide-react';

interface FormulaStatProps {
	icon: React.ElementType;
	label: string;
	formula: string;
	result: string;
	components: { label: string; value: string }[];
}

const FormulaStat = ({ icon: Icon, label, formula, result, components }: FormulaStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="p-5">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<span className="font-medium">{label}</span>
			</div>
			<div className="mt-4 space-y-2">
				<p className="text-3xl font-bold tracking-tight">{result}</p>
				<Badge variant="outline" className="font-mono text-xs">{formula}</Badge>
			</div>
		</div>
		<Separator />
		<div className="grid grid-cols-2 divide-x bg-secondary/30">
			{components.map((comp, i) => (
				<div key={i} className="p-3 text-center">
					<p className="text-xs text-muted-foreground">{comp.label}</p>
					<p className="font-semibold">{comp.value}</p>
				</div>
			))}
		</div>
	</Card>
);

export default function Main() {
	const stats: FormulaStatProps[] = [
		{
			icon: DollarSign,
			label: 'Customer Lifetime Value',
			formula: 'AOV × Freq × Lifespan',
			result: '$1,847',
			components: [
				{ label: 'AOV', value: '$142' },
				{ label: 'Frequency', value: '4.2x/yr' },
			],
		},
		{
			icon: Calculator,
			label: 'Customer Acquisition Cost',
			formula: 'Marketing ÷ New Customers',
			result: '$24.50',
			components: [
				{ label: 'Spend', value: '$48,294' },
				{ label: 'Customers', value: '1,972' },
			],
		},
		{
			icon: Percent,
			label: 'Return on Ad Spend',
			formula: 'Revenue ÷ Ad Spend',
			result: '4.2x',
			components: [
				{ label: 'Revenue', value: '$284K' },
				{ label: 'Ad Spend', value: '$67.6K' },
			],
		},
		{
			icon: TrendingUp,
			label: 'LTV:CAC Ratio',
			formula: 'CLV ÷ CAC',
			result: '75:1',
			components: [
				{ label: 'CLV', value: '$1,847' },
				{ label: 'CAC', value: '$24.50' },
			],
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<FormulaStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
