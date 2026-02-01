import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CounterStatProps {
	value: string;
	label: string;
	highlight?: boolean;
}

const CounterStat = ({ value, label, highlight }: CounterStatProps) => (
	<div
		className={`relative p-6 text-center transition-all duration-300 @md:p-8 ${highlight ? 'bg-primary text-primary-foreground rounded-2xl' : ''}`}
	>
		<p
			className={`text-4xl font-bold tracking-tighter @sm:text-5xl @xl:text-6xl ${highlight ? '' : ''}`}
		>
			{value}
		</p>
		<p
			className={`mt-3 text-sm font-medium @sm:text-base ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
		>
			{label}
		</p>
	</div>
);

export default function Main() {
	const stats: CounterStatProps[] = [
		{ value: '98%', label: 'Customer Satisfaction' },
		{ value: '15M+', label: 'Products Shipped', highlight: true },
		{ value: '48hrs', label: 'Average Delivery' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="overflow-hidden">
					<div className="flex flex-col items-center @lg:flex-row">
						{stats.map((stat, i) => (
							<div
								key={i}
								className="flex flex-1 flex-col items-center @lg:flex-row"
							>
								<CounterStat {...stat} />
								{i < stats.length - 1 && (
									<Separator
										orientation="vertical"
										className="hidden h-20 @lg:block"
									/>
								)}
								{i < stats.length - 1 && (
									<Separator className="w-32 @lg:hidden" />
								)}
							</div>
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
