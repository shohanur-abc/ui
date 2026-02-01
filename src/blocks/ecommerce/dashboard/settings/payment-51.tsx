import {
	AlertCircle,
	Check,
	CreditCard,
	MoreVertical,
	Plus,
	Shield,
	Star,
	Trash2,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

type PaymentMethod = {
	id: string;
	type: 'visa' | 'mastercard' | 'amex' | 'paypal';
	name: string;
	lastFour?: string;
	email?: string;
	expiryDate?: string;
	isDefault: boolean;
	isExpired?: boolean;
};

type BillingPreference = {
	id: string;
	title: string;
	description: string;
	enabled: boolean;
};

const cardLogos: Record<string, string> = {
	visa: '💳',
	mastercard: '💳',
	amex: '💳',
	paypal: '🅿️',
};

const PaymentCard = ({
	type,
	name,
	lastFour,
	email,
	expiryDate,
	isDefault,
	isExpired,
}: PaymentMethod) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		} ${isExpired ? 'border-destructive/30 bg-destructive/5' : ''}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-4">
				<div
					className={`flex size-14 items-center justify-center rounded-lg text-2xl ${
						isExpired
							? 'bg-destructive/10'
							: isDefault
								? 'bg-primary/10'
								: 'bg-muted'
					}`}
				>
					{cardLogos[type]}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-medium">{name}</h4>
						{isDefault && (
							<Badge className="bg-primary/10 text-primary border-0 text-xs">
								<Star className="mr-1 size-3" />
								Default
							</Badge>
						)}
						{isExpired && (
							<Badge variant="destructive" className="text-xs">
								Expired
							</Badge>
						)}
					</div>
					{lastFour && (
						<p className="text-sm text-muted-foreground">
							•••• •••• •••• {lastFour}
						</p>
					)}
					{email && <p className="text-sm text-muted-foreground">{email}</p>}
					{expiryDate && (
						<p className="text-xs text-muted-foreground">
							Expires: {expiryDate}
						</p>
					)}
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<CreditCard className="mr-2 size-4" />
						Edit
					</DropdownMenuItem>
					{!isDefault && (
						<DropdownMenuItem>
							<Star className="mr-2 size-4" />
							Set as Default
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const BillingToggle = ({ title, description, enabled }: BillingPreference) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<h4 className="font-medium">{title}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const paymentMethods: PaymentMethod[] = [
		{
			id: '1',
			type: 'visa',
			name: 'Visa',
			lastFour: '4242',
			expiryDate: '12/2027',
			isDefault: true,
		},
		{
			id: '2',
			type: 'mastercard',
			name: 'Mastercard',
			lastFour: '8888',
			expiryDate: '03/2025',
			isDefault: false,
			isExpired: true,
		},
		{
			id: '3',
			type: 'paypal',
			name: 'PayPal',
			email: 'john@example.com',
			isDefault: false,
		},
	];

	const billingPreferences: BillingPreference[] = [
		{
			id: 'autorenew',
			title: 'Auto-Renew Subscriptions',
			description: 'Automatically renew your subscriptions',
			enabled: true,
		},
		{
			id: 'saveCards',
			title: 'Save New Cards',
			description: 'Save payment methods for future purchases',
			enabled: true,
		},
		{
			id: 'receipts',
			title: 'Email Receipts',
			description: 'Send receipts to your email after purchases',
			enabled: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<CreditCard className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Payment Methods</CardTitle>
										<CardDescription>
											Manage your saved payment methods
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Add New
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{paymentMethods.map((method) => (
								<PaymentCard key={method.id} {...method} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Billing Preferences</CardTitle>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{billingPreferences.map((pref) => (
								<BillingToggle key={pref.id} {...pref} />
							))}
						</CardContent>
					</Card>

					<Card className="border-primary/20 bg-primary/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<Shield className="size-6 text-primary shrink-0" />
							<div>
								<h4 className="font-semibold">Secure Payments</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									All payment information is encrypted and securely stored. We
									never store your full card number.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
