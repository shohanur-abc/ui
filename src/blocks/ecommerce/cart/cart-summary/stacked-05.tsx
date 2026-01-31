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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, Clock, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	tooltip?: string;
};

type DeliveryOptionProps = {
	icon: LucideIcon;
	title: string;
	estimate: string;
	price: string;
	selected?: boolean;
};

const SummaryRow = ({ label, value, tooltip }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="flex items-center gap-1">
			{label}
			{tooltip && (
				<Tooltip>
					<TooltipTrigger>
						<Info className="size-3.5 text-muted-foreground" />
					</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</Tooltip>
			)}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<div className="text-right">
			<span className="text-2xl font-bold">{value}</span>
		</div>
	</div>
);

const Header = ({
	title,
	itemCount,
}: { title: string; itemCount: number }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center justify-between">
			{title}
			<Badge variant="outline">{itemCount} items</Badge>
		</CardTitle>
	</CardHeader>
);

const DeliveryOption = ({
	icon: Icon,
	title,
	estimate,
	price,
	selected,
}: DeliveryOptionProps) => (
	<button
		type="button"
		className={`flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/50'}`}
	>
		<Icon
			className={`size-5 ${selected ? 'text-primary' : 'text-muted-foreground'}`}
		/>
		<div className="flex-1">
			<div className="text-sm font-medium">{title}</div>
			<div className="text-xs text-muted-foreground">{estimate}</div>
		</div>
		<span className="text-sm font-semibold">{price}</span>
	</button>
);

const CheckoutButton = ({
	label,
	href,
	sublabel,
}: { label: string; href: string; sublabel: string }) => (
	<div className="space-y-2">
		<Button className="w-full" size="lg" asChild>
			<Link href={href}>{label}</Link>
		</Button>
		<p className="text-center text-xs text-muted-foreground">{sublabel}</p>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$549.00' },
		{
			label: 'Estimated Tax',
			value: '$49.41',
			tooltip: 'Tax calculated at checkout',
		},
	];

	const deliveryOptions: DeliveryOptionProps[] = [
		{
			icon: Clock,
			title: 'Standard Delivery',
			estimate: '5-7 business days',
			price: 'Free',
			selected: true,
		},
		{
			icon: Zap,
			title: 'Express Delivery',
			estimate: '1-2 business days',
			price: '$14.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header title="Order Summary" itemCount={4} />
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<div className="space-y-2">
							<p className="text-sm font-medium">Delivery Method</p>
							{deliveryOptions.map((option, i) => (
								<DeliveryOption key={i} {...option} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$598.41" />
					</CardContent>
					<CardFooter className="border-t">
						<CheckoutButton
							label="Continue to Checkout"
							href="/checkout"
							sublabel="Secure 256-bit SSL encryption"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
