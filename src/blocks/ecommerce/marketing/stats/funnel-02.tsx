import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FunnelStepProps {
	step: number;
	label: string;
	value: string;
	rate: string;
	isLast?: boolean;
}

const FunnelStep = ({ step, label, value, rate, isLast }: FunnelStepProps) => (
	<div className="group flex flex-col items-center">
		<Card className="relative w-full p-4 text-center transition-all duration-300 hover:shadow-md @sm:p-6">
			<Badge variant="outline" className="mb-2">{step}</Badge>
			<p className="text-xl font-bold @sm:text-2xl">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
		</Card>
		{!isLast && (
			<div className="my-2 flex flex-col items-center">
				<div className="h-4 w-px bg-border" />
				<Badge variant="secondary" className="text-[10px]">{rate}</Badge>
				<div className="h-4 w-px bg-border" />
			</div>
		)}
	</div>
);

export default function Main() {
	const stats: FunnelStepProps[] = [
		{ step: 1, label: 'Website Visitors', value: '284,847', rate: '42%' },
		{ step: 2, label: 'Product Views', value: '119,635', rate: '28%' },
		{ step: 3, label: 'Add to Cart', value: '33,498', rate: '64%' },
		{ step: 4, label: 'Checkout Started', value: '21,439', rate: '75%' },
		{ step: 5, label: 'Completed Orders', value: '16,079', rate: '', isLast: true },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-2 @sm:grid-cols-5 @sm:gap-4">
					{stats.map((stat, i) => (
						<FunnelStep key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
