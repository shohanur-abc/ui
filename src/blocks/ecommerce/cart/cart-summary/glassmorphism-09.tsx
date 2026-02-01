import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Gift,
	Sparkles,
	MessageSquare,
	Package,
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

const PinkGlassBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-red-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-pink-500/30 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:bg-black/20">
		{children}
	</div>
);

const GiftHeader = ({
	title,
	badge,
}: {
	title: string;
	badge: { label: string; icon: LucideIcon };
}) => (
	<div className="mb-4 flex items-center gap-2">
		<span className="text-lg font-semibold">{title}</span>
		<Badge className="gap-1 bg-pink-500/20 text-pink-400 backdrop-blur hover:bg-pink-500/30">
			<badge.icon className="size-3" />
			{badge.label}
		</Badge>
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
	<div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 backdrop-blur transition-colors hover:bg-white/10">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 backdrop-blur">
			<Icon className="size-5 text-pink-400" />
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
			description: 'Premium gift wrap',
			price: '+$7.99',
			enabled: true,
		},
		{
			id: 'message',
			icon: MessageSquare,
			title: 'Gift Message',
			description: 'Add a note',
			price: 'Free',
		},
		{
			id: 'box',
			icon: Package,
			title: 'Luxury Box',
			description: 'Premium packaging',
			price: '+$12.99',
		},
	];

	return (
		<section className="@container relative">
			<PinkGlassBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<GiftHeader
						title="Gift Options"
						badge={{ label: 'Special', icon: Sparkles }}
					/>
					<div className="space-y-2">
						{giftOptions.map((option) => (
							<GiftOption key={option.id} {...option} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<div className="space-y-2">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$277.55" />
					<Button
						className="mt-6 w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							<Gift className="size-4" />
							Send as Gift
						</Link>
					</Button>
				</GlassCard>
			</div>
		</section>
	);
}
