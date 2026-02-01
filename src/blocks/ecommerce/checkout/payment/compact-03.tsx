'use client';

import { Check, CreditCard, Lock, Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SavedCard {
	id: string;
	brand: string;
	last4: string;
	isDefault?: boolean;
}

const SavedCardOption = ({
	card,
	selected,
}: {
	card: SavedCard;
	selected: boolean;
}) => (
	<Label
		htmlFor={card.id}
		className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
			selected ? 'border-primary bg-primary/5' : 'border-border'
		}`}
	>
		<RadioGroupItem value={card.id} id={card.id} className="size-3.5" />
		<CreditCard className="size-4 text-muted-foreground" />
		<span className="text-sm font-medium flex-1">
			{card.brand} •••• {card.last4}
		</span>
		{card.isDefault && (
			<Badge variant="secondary" className="text-[10px] py-0 h-4">
				Default
			</Badge>
		)}
		{selected && <Check className="size-4 text-primary" />}
	</Label>
);

const CvvInput = () => (
	<div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
		<Label
			htmlFor="cvv"
			className="text-xs text-muted-foreground whitespace-nowrap"
		>
			Enter CVV:
		</Label>
		<Input
			id="cvv"
			type="password"
			placeholder="•••"
			className="h-7 w-16 text-sm"
		/>
	</div>
);

const AmountSummary = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-sm text-muted-foreground">Amount</span>
		<span className="text-lg font-bold">{amount}</span>
	</div>
);

export default function Main() {
	const savedCards: SavedCard[] = [
		{ id: 'visa', brand: 'Visa', last4: '4242', isDefault: true },
		{ id: 'mc', brand: 'Mastercard', last4: '8888' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-3">
						<RadioGroup defaultValue="visa" className="space-y-2">
							{savedCards.map((card) => (
								<SavedCardOption
									key={card.id}
									card={card}
									selected={card.id === 'visa'}
								/>
							))}
						</RadioGroup>
						<CvvInput />
						<AmountSummary amount="$129.00" />
					</CardContent>
					<CardFooter className="px-4 pb-4 pt-0">
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Pay $129.00
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
