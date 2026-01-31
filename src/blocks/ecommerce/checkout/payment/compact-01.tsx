'use client';

import { CreditCard, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InlineCardInput = ({ label, placeholder, icon: Icon, type }: { label: string; placeholder: string; icon?: React.ComponentType<{ className?: string }>; type?: string }) => (
	<div className="space-y-1.5">
		<Label className="text-xs">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />}
			<Input placeholder={placeholder} type={type} className={`h-9 text-sm ${Icon ? 'pl-8' : ''}`} />
		</div>
	</div>
);

const MiniTotal = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between px-1">
		<span className="text-xs text-muted-foreground">Total</span>
		<span className="font-semibold">{amount}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<InlineCardInput label="Card Number" placeholder="4242 4242 4242 4242" icon={CreditCard} />
						<div className="grid grid-cols-2 gap-3">
							<InlineCardInput label="Expiry" placeholder="MM/YY" />
							<InlineCardInput label="CVV" placeholder="•••" type="password" />
						</div>
						<MiniTotal amount="$49.99" />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Pay Now
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
