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
import { Switch } from '@/components/ui/switch';
import {
	Gift,
	Sparkles,
	Package,
	MessageSquare,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type GiftOptionProps = {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
	price: string;
	enabled?: boolean;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const GiftOption = ({
	id,
	icon: Icon,
	title,
	description,
	price,
	enabled,
}: GiftOptionProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/10">
			<Icon className="size-5 text-pink-500" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">{title}</span>
				<span className="text-xs text-muted-foreground">{price}</span>
			</div>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Switch id={id} defaultChecked={enabled} />
	</div>
);

const Header = ({
	title,
	badge,
}: { title: string; badge: { label: string; icon: LucideIcon } }) => (
	<CardHeader className="pb-3">
		<CardTitle className="flex items-center gap-2 text-base">
			{title}
			<Badge className="gap-1 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20">
				<badge.icon className="size-3" />
				{badge.label}
			</Badge>
		</CardTitle>
	</CardHeader>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Gift Wrap', value: '$7.99' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$20.56' },
	];

	const giftOptions: GiftOptionProps[] = [
		{
			id: 'wrap',
			icon: Gift,
			title: 'Gift Wrapping',
			description: 'Premium gift wrap with ribbon',
			price: '+$7.99',
			enabled: true,
		},
		{
			id: 'message',
			icon: MessageSquare,
			title: 'Gift Message',
			description: 'Add a personalized note',
			price: 'Free',
		},
		{
			id: 'box',
			icon: Package,
			title: 'Gift Box',
			description: 'Luxury presentation box',
			price: '+$12.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="shadow-xl">
					<Header
						title="Gift Options"
						badge={{ label: 'Perfect Gift', icon: Sparkles }}
					/>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{giftOptions.map((option) => (
								<GiftOption key={option.id} {...option} />
							))}
						</div>
						<Separator />
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$277.55" />
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								<Gift className="size-4" />
								Send as Gift
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
