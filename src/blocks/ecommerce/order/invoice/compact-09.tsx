import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dumbbell, User } from 'lucide-react';

interface MembershipInfoProps {
	memberName: string;
	memberId: string;
	membershipType: string;
	billingDate: string;
	status: string;
}

interface ChargeItemProps {
	description: string;
	amount: number;
}

interface TotalsProps {
	membership: number;
	addons: number;
	discount: number;
	total: number;
	currency: string;
}

const MembershipHeader = ({
	memberName,
	memberId,
	membershipType,
	billingDate,
	status,
}: MembershipInfoProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Dumbbell className="size-4 text-primary" />
				<span className="font-bold text-sm">FitLife Gym</span>
			</div>
			<Badge variant="default" className="text-[10px]">
				{status}
			</Badge>
		</div>
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
				<User className="size-5 text-primary" />
			</div>
			<div>
				<p className="font-medium text-sm">{memberName}</p>
				<p className="text-[10px] text-muted-foreground">ID: {memberId}</p>
			</div>
		</div>
		<div className="flex items-center justify-between text-[10px] text-muted-foreground">
			<span>{membershipType}</span>
			<span>Billing: {billingDate}</span>
		</div>
	</div>
);

const ChargeItems = ({
	items,
	currency,
}: {
	items: ChargeItemProps[];
	currency: string;
}) => (
	<div className="space-y-1">
		{items.map((item, index) => (
			<div key={index} className="flex justify-between text-xs">
				<span>{item.description}</span>
				<span>
					{currency}
					{item.amount.toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const TotalsSection = ({
	membership,
	addons,
	discount,
	total,
	currency,
}: TotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between">
			<span className="text-muted-foreground">Membership</span>
			<span>
				{currency}
				{membership.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Add-ons</span>
			<span>
				{currency}
				{addons.toFixed(2)}
			</span>
		</div>
		{discount > 0 && (
			<div className="flex justify-between text-green-600">
				<span>Discount</span>
				<span>
					-{currency}
					{discount.toFixed(2)}
				</span>
			</div>
		)}
		<Separator className="my-2" />
		<div className="flex justify-between font-bold text-sm">
			<span>Monthly Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const membership: MembershipInfoProps = {
		memberName: 'Alex Johnson',
		memberId: 'GYM-78945',
		membershipType: 'Premium Membership',
		billingDate: '1st of month',
		status: 'Active',
	};

	const charges: ChargeItemProps[] = [
		{ description: 'Premium Membership', amount: 59.99 },
		{ description: 'Personal Training (4x)', amount: 120.0 },
		{ description: 'Locker Rental', amount: 15.0 },
	];

	const totals: TotalsProps = {
		membership: 59.99,
		addons: 135.0,
		discount: 10.0,
		total: 184.99,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<MembershipHeader {...membership} />
					<Separator />
					<ChargeItems items={charges} currency="$" />
					<Separator />
					<TotalsSection {...totals} />
					<Button size="sm" className="w-full text-xs">
						Update Payment Method
					</Button>
				</div>
			</div>
		</section>
	);
}
