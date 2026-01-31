import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Gift, MessageSquare, Package, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type GiftOptionCardProps = {
	id: string;
	icon: LucideIcon;
	title: string;
	price: string;
	enabled?: boolean;
};

const GiftHeader = ({ title, badge }: { title: string; badge: string }) => (
	<div className="mb-4 flex items-center gap-2 rounded-lg bg-pink-500/10 p-3">
		<Gift className="size-5 text-pink-500" />
		<span className="font-semibold">{title}</span>
		<Badge className="ml-auto bg-pink-500/20 text-pink-600 hover:bg-pink-500/30 dark:text-pink-400">
			{badge}
		</Badge>
	</div>
);

const GiftOptionCard = ({
	id,
	icon: Icon,
	title,
	price,
	enabled,
}: GiftOptionCardProps) => (
	<Card className="bg-muted/50">
		<CardContent className="flex items-center justify-between py-3">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-pink-500" />
				<span className="text-sm">{title}</span>
				<span className="text-xs text-muted-foreground">{price}</span>
			</div>
			<Switch id={id} defaultChecked={enabled} />
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const giftOptions: GiftOptionCardProps[] = [
		{ id: 'wrap', icon: Gift, title: 'Gift Wrap', price: '+$7.99', enabled: true },
		{ id: 'message', icon: MessageSquare, title: 'Gift Note', price: 'Free' },
		{ id: 'box', icon: Package, title: 'Gift Box', price: '+$14.99' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$279.00' },
		{ label: 'Gift Options', value: '$7.99' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$22.96' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GiftHeader title="Gift Options" badge="Perfect Gift" />
				<div className="mb-4 space-y-2">
					{giftOptions.map((option) => (
						<GiftOptionCard key={option.id} {...option} />
					))}
				</div>
				<Card>
					<CardContent className="space-y-3 pt-6">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$309.95</span>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
							size="lg"
							asChild
						>
							<Link href="/checkout">
								<Sparkles className="size-4" />
								Send as Gift
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
