import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Timer, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	strike?: boolean;
};

type CountdownProps = {
	hours: number;
	minutes: number;
	seconds: number;
	message: string;
};

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className={strike ? 'text-muted-foreground line-through' : 'font-medium'}>
			{value}
		</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	savings,
}: { label: string; value: string; savings: string }) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold text-primary">{value}</span>
		</div>
		<p className="text-right text-sm text-green-500">You save {savings}</p>
	</div>
);

const CountdownBanner = ({
	hours,
	minutes,
	seconds,
	message,
}: CountdownProps) => (
	<div className="rounded-xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 p-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Timer className="size-5 text-red-500" />
				<span className="text-sm font-medium">{message}</span>
			</div>
			<div className="flex gap-1 font-mono text-lg font-bold">
				<span className="rounded bg-background/80 px-2 py-0.5">{String(hours).padStart(2, '0')}</span>
				<span>:</span>
				<span className="rounded bg-background/80 px-2 py-0.5">{String(minutes).padStart(2, '0')}</span>
				<span>:</span>
				<span className="rounded bg-background/80 px-2 py-0.5">{String(seconds).padStart(2, '0')}</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$449.00' },
		{ label: 'Flash Sale (-25%)', value: '-$112.25' },
		{ label: 'Original Shipping', value: '$19.99', strike: true },
		{ label: 'Tax', value: '$26.94' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="overflow-hidden border-amber-500/30 shadow-xl shadow-amber-500/10">
					<CardHeader className="bg-gradient-to-r from-red-500/5 via-orange-500/5 to-amber-500/5 pb-4">
						<CountdownBanner
							hours={2}
							minutes={45}
							seconds={30}
							message="Flash Sale Ends"
						/>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<TotalRow label="Total" value="$363.69" savings="$132.24" />
					</CardContent>
					<CardFooter>
						<Button
							className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
							size="lg"
							asChild
						>
							<Link href="/checkout">
								<Zap className="size-4" />
								Grab This Deal
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
