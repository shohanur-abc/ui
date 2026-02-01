import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Timer, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type UrgencyBannerProps = {
	icon: LucideIcon;
	message: string;
	time: string;
};

const UrgencyBanner = ({ icon: Icon, message, time }: UrgencyBannerProps) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-amber-500" />
		<span className="text-sm text-amber-600 dark:text-amber-400">
			{message} <span className="font-mono font-bold">{time}</span>
		</span>
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
		<span className="text-xl font-bold">{total}</span>
		<Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400">
			Save {savings}
		</Badge>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="rounded-lg border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent p-4">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="space-y-2">
							<UrgencyBanner
								icon={Timer}
								message="Deal expires in"
								time="2:45:30"
							/>
							<PriceWithSavings total="$279.99" savings="$70.00" />
						</div>
						<Button
							className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
							size="lg"
							asChild
						>
							<Link href="/checkout">
								<Zap className="size-4" />
								Grab Deal
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
