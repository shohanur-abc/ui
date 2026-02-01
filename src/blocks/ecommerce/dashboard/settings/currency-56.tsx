import {
	AlertCircle,
	ArrowRight,
	Check,
	DollarSign,
	Globe,
	RefreshCw,
	Settings2,
	TrendingUp,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type Currency = {
	code: string;
	name: string;
	symbol: string;
	rate: string;
	enabled: boolean;
	isDefault?: boolean;
};

type ExchangeRate = {
	from: string;
	to: string;
	rate: string;
	lastUpdated: string;
};

const CurrencyCard = ({
	code,
	name,
	symbol,
	rate,
	enabled,
	isDefault,
}: Currency) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<div
					className={`flex size-12 items-center justify-center rounded-lg text-lg font-bold ${
						isDefault
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					{symbol}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-medium">{code}</h4>
						{isDefault && (
							<Badge className="bg-primary/10 text-primary border-0 text-xs">
								Default
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{name}</p>
					{!isDefault && (
						<p className="text-xs text-muted-foreground">1 USD = {rate}</p>
					)}
				</div>
			</div>
			<Switch defaultChecked={enabled} disabled={isDefault} />
		</div>
	</div>
);

const ExchangeRateRow = ({ from, to, rate, lastUpdated }: ExchangeRate) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-2">
			<Badge variant="outline">{from}</Badge>
			<ArrowRight className="size-4 text-muted-foreground" />
			<Badge variant="outline">{to}</Badge>
		</div>
		<div className="text-right">
			<p className="font-medium">{rate}</p>
			<p className="text-xs text-muted-foreground">{lastUpdated}</p>
		</div>
	</div>
);

export default function Main() {
	const currencies: Currency[] = [
		{
			code: 'USD',
			name: 'US Dollar',
			symbol: '$',
			rate: '1.00',
			enabled: true,
			isDefault: true,
		},
		{ code: 'EUR', name: 'Euro', symbol: '€', rate: '0.92', enabled: true },
		{
			code: 'GBP',
			name: 'British Pound',
			symbol: '£',
			rate: '0.79',
			enabled: true,
		},
		{
			code: 'JPY',
			name: 'Japanese Yen',
			symbol: '¥',
			rate: '149.50',
			enabled: false,
		},
		{
			code: 'AUD',
			name: 'Australian Dollar',
			symbol: 'A$',
			rate: '1.53',
			enabled: true,
		},
		{
			code: 'CAD',
			name: 'Canadian Dollar',
			symbol: 'C$',
			rate: '1.35',
			enabled: false,
		},
	];

	const exchangeRates: ExchangeRate[] = [
		{ from: 'USD', to: 'EUR', rate: '0.9215', lastUpdated: '2 hours ago' },
		{ from: 'USD', to: 'GBP', rate: '0.7892', lastUpdated: '2 hours ago' },
		{ from: 'USD', to: 'AUD', rate: '1.5342', lastUpdated: '2 hours ago' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Globe className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Currency Settings</CardTitle>
										<CardDescription>
											Manage supported currencies for your store
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{currencies.map((currency) => (
									<CurrencyCard key={currency.code} {...currency} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Display Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="grid gap-4 @sm:grid-cols-2">
									<div className="space-y-2">
										<Label>Currency Position</Label>
										<Select defaultValue="before">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="before">
													Before amount ($100)
												</SelectItem>
												<SelectItem value="after">
													After amount (100$)
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label>Decimal Separator</Label>
										<Select defaultValue="dot">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="dot">Dot (100.00)</SelectItem>
												<SelectItem value="comma">Comma (100,00)</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid gap-4 @sm:grid-cols-2">
									<div className="space-y-2">
										<Label>Thousands Separator</Label>
										<Select defaultValue="comma">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="comma">Comma (1,000)</SelectItem>
												<SelectItem value="dot">Dot (1.000)</SelectItem>
												<SelectItem value="space">Space (1 000)</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label>Decimal Places</Label>
										<Select defaultValue="2">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">0 ($100)</SelectItem>
												<SelectItem value="2">2 ($100.00)</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Exchange Rates</CardTitle>
									<Button variant="ghost" size="icon-sm">
										<RefreshCw className="size-4" />
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y">
								{exchangeRates.map((rate) => (
									<ExchangeRateRow key={`${rate.from}-${rate.to}`} {...rate} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Rate Updates</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Auto-update rates</Label>
										<p className="text-xs text-muted-foreground">
											Update hourly
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>Rate Source</Label>
									<Select defaultValue="ecb">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ecb">European Central Bank</SelectItem>
											<SelectItem value="openexchange">
												Open Exchange Rates
											</SelectItem>
											<SelectItem value="custom">Custom Rates</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<TrendingUp className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">Multi-Currency</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Customers can shop in their preferred currency with automatic
									conversion at checkout.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
