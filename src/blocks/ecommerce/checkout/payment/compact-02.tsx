'use client';

import { CreditCard, Lock, Shield, Smartphone, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface PaymentMethod {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const QuickPayButtons = ({
	methods,
	selected,
	onSelect,
}: {
	methods: PaymentMethod[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="flex gap-2">
		{methods.map((method) => (
			<Button
				key={method.id}
				variant={selected === method.id ? 'default' : 'outline'}
				size="sm"
				onClick={() => onSelect(method.id)}
				className="flex-1 h-9 gap-1.5 text-xs"
			>
				<method.icon className="size-3.5" />
				{method.label}
			</Button>
		))}
	</div>
);

const SingleLineCardInput = () => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<Input placeholder="MM/YY" className="h-9 text-sm w-20" />
		<Input placeholder="CVV" type="password" className="h-9 text-sm w-16" />
	</div>
);

const InlineTotal = ({ label, amount }: { label: string; amount: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-sm text-muted-foreground">{label}</span>
		<div className="flex items-center gap-2">
			<span className="font-semibold">{amount}</span>
			<Badge variant="outline" className="text-xs gap-1">
				<Shield className="size-2.5" />
				SSL
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const methods: PaymentMethod[] = [
		{ id: 'card', icon: CreditCard, label: 'Card' },
		{ id: 'apple', icon: Smartphone, label: 'Apple' },
		{ id: 'paypal', icon: Wallet, label: 'PayPal' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-3">
						<QuickPayButtons
							methods={methods}
							selected="card"
							onSelect={() => {}}
						/>
						<SingleLineCardInput />
						<Separator className="my-2" />
						<InlineTotal label="Total" amount="$89.00" />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Complete Purchase
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
