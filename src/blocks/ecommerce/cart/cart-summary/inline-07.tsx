import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CountdownProps = {
	icon: LucideIcon;
	time: string;
	message: string;
};

const Countdown = ({ icon: Icon, time, message }: CountdownProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-red-500" />
		<span className="font-mono font-bold text-red-500">{time}</span>
		<span className="text-muted-foreground">{message}</span>
	</div>
);

const PriceWithSavings = ({
	total,
	savings,
}: {
	total: string;
	savings: string;
}) => (
	<div className="flex items-center gap-2">
		<span className="text-lg font-bold">{total}</span>
		<Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
			-{savings}
		</Badge>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border-2 border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-4 py-3">
					<Countdown icon={Timer} time="01:45:30" message="left for deal" />
					<div className="flex items-center gap-4">
						<PriceWithSavings total="$179.99" savings="$60.00" />
						<Button className="gap-1 bg-red-500 hover:bg-red-600" asChild>
							<Link href="/checkout">
								<Zap className="size-4" />
								Buy Now
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
