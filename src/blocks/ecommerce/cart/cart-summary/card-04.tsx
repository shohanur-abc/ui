import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Timer, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	strike?: boolean;
};

type CountdownCardProps = {
	icon: LucideIcon;
	message: string;
	hours: number;
	minutes: number;
	seconds: number;
};

const CountdownCard = ({
	icon: Icon,
	message,
	hours,
	minutes,
	seconds,
}: CountdownCardProps) => (
	<Card className="mb-4 overflow-hidden border-red-500/30">
		<div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
		<CardContent className="py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-5 text-red-500" />
					<span className="font-medium">{message}</span>
				</div>
				<div className="flex gap-1 font-mono font-bold">
					<span className="rounded bg-red-500/10 px-2 py-1 text-red-500">
						{String(hours).padStart(2, '0')}
					</span>
					<span className="py-1">:</span>
					<span className="rounded bg-red-500/10 px-2 py-1 text-red-500">
						{String(minutes).padStart(2, '0')}
					</span>
					<span className="py-1">:</span>
					<span className="rounded bg-red-500/10 px-2 py-1 text-red-500">
						{String(seconds).padStart(2, '0')}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span
			className={strike ? 'text-muted-foreground line-through' : 'font-medium'}
		>
			{value}
		</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'Flash Sale (-30%)', value: '-$179.70' },
		{ label: 'Shipping', value: '$24.99', strike: true },
		{ label: 'Tax', value: '$33.54' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<CountdownCard
					icon={Timer}
					message="Flash Sale Ends"
					hours={1}
					minutes={45}
					seconds={30}
				/>
				<Card>
					<CardContent className="space-y-3 pt-6">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold">Total</span>
								<span className="text-2xl font-bold text-red-500">$452.84</span>
							</div>
							<p className="text-right text-sm text-green-500">
								You save $204.69!
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
