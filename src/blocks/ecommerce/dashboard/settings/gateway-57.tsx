import {
	AlertCircle,
	Banknote,
	Building2,
	Check,
	ChevronRight,
	CreditCard,
	ExternalLink,
	Plus,
	Shield,
	Smartphone,
	Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

type PaymentGateway = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	connected: boolean;
	status?: 'live' | 'test';
	fee?: string;
};

type PaymentMethod = {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
};

const GatewayCard = ({
	name,
	description,
	icon: Icon,
	connected,
	status,
	fee,
}: PaymentGateway) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			connected ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-12 items-center justify-center rounded-lg ${
						connected
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					<Icon className="size-6" />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold">{name}</h4>
						{connected && (
							<Badge
								className={`text-xs border-0 ${
									status === 'live'
										? 'bg-emerald-500/10 text-emerald-500'
										: 'bg-amber-500/10 text-amber-500'
								}`}
							>
								{status === 'live' ? 'Live' : 'Test Mode'}
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{description}</p>
					{fee && (
						<p className="mt-1 text-xs text-muted-foreground">
							Transaction fee: {fee}
						</p>
					)}
				</div>
			</div>
			{connected ? (
				<Button variant="outline" size="sm" className="gap-2">
					Configure
					<ChevronRight className="size-4" />
				</Button>
			) : (
				<Button size="sm">Connect</Button>
			)}
		</div>
	</div>
);

const PaymentMethodRow = ({ name, icon: Icon, enabled }: PaymentMethod) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<Icon className="size-5 text-muted-foreground" />
			<span className="font-medium">{name}</span>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const gateways: PaymentGateway[] = [
		{
			id: 'stripe',
			name: 'Stripe',
			description: 'Accept credit cards and 135+ payment methods',
			icon: CreditCard,
			connected: true,
			status: 'live',
			fee: '2.9% + $0.30',
		},
		{
			id: 'paypal',
			name: 'PayPal',
			description: 'Accept PayPal and Pay Later payments',
			icon: Wallet,
			connected: true,
			status: 'test',
			fee: '3.49% + $0.49',
		},
		{
			id: 'square',
			name: 'Square',
			description: 'Accept in-person and online payments',
			icon: Building2,
			connected: false,
		},
		{
			id: 'applepay',
			name: 'Apple Pay',
			description: 'One-tap checkout for Apple devices',
			icon: Smartphone,
			connected: false,
		},
	];

	const paymentMethods: PaymentMethod[] = [
		{ id: 'creditcard', name: 'Credit Cards', icon: CreditCard, enabled: true },
		{ id: 'debitcard', name: 'Debit Cards', icon: CreditCard, enabled: true },
		{ id: 'wallet', name: 'Digital Wallets', icon: Wallet, enabled: true },
		{ id: 'bank', name: 'Bank Transfer', icon: Banknote, enabled: false },
		{ id: 'cod', name: 'Cash on Delivery', icon: Banknote, enabled: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<CreditCard className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Payment Gateways</CardTitle>
											<CardDescription>
												Connect payment processors to accept payments
											</CardDescription>
										</div>
									</div>
									<Button variant="outline" className="gap-2">
										<Plus className="size-4" />
										Add Gateway
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{gateways.map((gateway) => (
									<GatewayCard key={gateway.id} {...gateway} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Payment Methods</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{paymentMethods.map((method) => (
									<PaymentMethodRow key={method.id} {...method} />
								))}
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<Shield className="size-5 text-primary shrink-0" />
									<div>
										<h4 className="font-semibold">PCI Compliance</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											All connected gateways are PCI DSS compliant. Card data is
											never stored on our servers.
										</p>
										<Button
											variant="link"
											size="sm"
											className="mt-2 h-auto p-0 gap-2"
										>
											View compliance details
											<ExternalLink className="size-3" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="text-center">
									<div className="text-3xl font-bold text-primary">2</div>
									<p className="text-sm text-muted-foreground">
										Connected Gateways
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
