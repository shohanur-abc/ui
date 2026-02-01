'use client';

import { CreditCard, Download, Key, Lock, Mail, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const ProductHeader = ({
	name,
	type,
	price,
}: {
	name: string;
	type: string;
	price: string;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<Badge variant="secondary" className="text-[10px] mb-1">
				{type}
			</Badge>
			<h3 className="font-medium text-sm">{name}</h3>
		</div>
		<span className="font-bold">{price}</span>
	</div>
);

const EmailInput = () => (
	<div className="relative">
		<Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
		<Input
			type="email"
			placeholder="Email for delivery"
			className="h-9 text-sm pl-8"
		/>
	</div>
);

const QuickCardInput = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const InstantDeliveryInfo = () => (
	<div className="flex items-center gap-3 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Download className="size-3" />
			<span>Download</span>
		</div>
		<div className="flex items-center gap-1">
			<Key className="size-3" />
			<span>License key</span>
		</div>
		<div className="flex items-center gap-1">
			<Zap className="size-3" />
			<span>Instant</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<ProductHeader name="Pro Design Kit" type="Digital" price="$49" />
						<Separator />
						<EmailInput />
						<QuickCardInput />
						<InstantDeliveryInfo />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Purchase
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
