'use client';

import { CreditCard, Globe, Lock, Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface Currency {
	code: string;
	symbol: string;
	flag: string;
}

const CurrencySelector = ({ currencies, selected }: { currencies: Currency[]; selected: string }) => (
	<RadioGroup defaultValue={selected} className="flex gap-2">
		{currencies.map((currency) => (
			<Label
				key={currency.code}
				htmlFor={currency.code}
				className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={currency.code} id={currency.code} className="sr-only" />
				<span>{currency.flag}</span>
				<span className="text-xs font-medium">{currency.code}</span>
			</Label>
		))}
	</RadioGroup>
);

const CompactCardForm = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-3 gap-2">
			<Input placeholder="Name" className="h-9 text-sm col-span-1" />
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const ConversionDisplay = ({ from, to, rate }: { from: { amount: string; currency: string }; to: { amount: string; currency: string }; rate: string }) => (
	<div className="p-2.5 rounded-lg bg-muted/30 space-y-1.5">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">{from.amount} {from.currency}</span>
			<span className="font-medium">{to.amount} {to.currency}</span>
		</div>
		<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
			<Globe className="size-2.5" />
			<span>Rate: 1 {from.currency} = {rate} {to.currency}</span>
		</div>
	</div>
);

const SecurityBadge = () => (
	<div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-2.5" />
			<span>PCI DSS</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-2.5" />
			<span>256-bit SSL</span>
		</div>
	</div>
);

export default function Main() {
	const currencies: Currency[] = [
		{ code: 'USD', symbol: '$', flag: '🇺🇸' },
		{ code: 'EUR', symbol: '€', flag: '🇪🇺' },
		{ code: 'GBP', symbol: '£', flag: '🇬🇧' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">Pay in</span>
							<Badge variant="outline" className="text-xs gap-1">
								<Globe className="size-2.5" />
								Multi-currency
							</Badge>
						</div>
						<CurrencySelector currencies={currencies} selected="EUR" />
						<ConversionDisplay
							from={{ amount: '$99.00', currency: 'USD' }}
							to={{ amount: '€91.08', currency: 'EUR' }}
							rate="0.92"
						/>
						<Separator />
						<CompactCardForm />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Pay €91.08
						</Button>
						<SecurityBadge />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
