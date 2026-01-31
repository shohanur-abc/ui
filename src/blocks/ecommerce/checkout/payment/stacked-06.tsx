import { AlertCircle, CreditCard, Info, Lock, RefreshCw, Shield } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SavedCardProps {
	id: string;
	brand: string;
	last4: string;
	expiry: string;
	isDefault?: boolean;
	isExpiringSoon?: boolean;
}

interface ActionButtonProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	variant?: 'default' | 'outline' | 'ghost';
}

const SectionHeader = ({ title, action }: { title: string; action?: React.ReactNode }) => (
	<div className="flex items-center justify-between">
		<h3 className="font-semibold">{title}</h3>
		{action}
	</div>
);

const SavedCardItem = ({ brand, last4, expiry, isDefault, isExpiringSoon }: SavedCardProps) => (
	<div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 transition-colors cursor-pointer group">
		<div className="flex items-center gap-4">
			<div className="size-12 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
				<CreditCard className="size-5" />
			</div>
			<div>
				<div className="flex items-center gap-2">
					<span className="font-medium">{brand} •••• {last4}</span>
					{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
					{isExpiringSoon && <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/30">Expiring Soon</Badge>}
				</div>
				<p className="text-sm text-muted-foreground">Expires {expiry}</p>
			</div>
		</div>
		<Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
			Use Card
		</Button>
	</div>
);

const SavedCardsList = ({ cards }: { cards: SavedCardProps[] }) => (
	<div className="space-y-3">
		{cards.map((card) => (
			<SavedCardItem key={card.id} {...card} />
		))}
	</div>
);

const CVVInput = ({ placeholder }: { placeholder: string }) => (
	<div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
		<div className="flex-1 space-y-2">
			<Label htmlFor="cvv" className="text-sm flex items-center gap-2">
				Enter CVV to confirm
				<Info className="size-3.5 text-muted-foreground" />
			</Label>
			<Input id="cvv" type="password" placeholder={placeholder} className="max-w-32" />
		</div>
		<Lock className="size-5 text-muted-foreground" />
	</div>
);

const ExpiryAlert = ({ message }: { message: string }) => (
	<Alert variant="default" className="border-amber-500/30 bg-amber-500/5">
		<AlertCircle className="size-4 text-amber-500" />
		<AlertDescription className="text-sm">
			{message}
		</AlertDescription>
	</Alert>
);

const NewCardForm = ({ label }: { label: string }) => (
	<Button variant="outline" className="w-full gap-2 h-14 border-dashed">
		<CreditCard className="size-4" />
		{label}
	</Button>
);

const ActionButton = ({ icon: Icon, label, variant = 'default' }: ActionButtonProps) => (
	<Button variant={variant} className="gap-2 flex-1" size="lg">
		<Icon className="size-4" />
		{label}
	</Button>
);

const TrustIndicators = ({ items }: { items: { icon: React.ComponentType<{ className?: string }>; text: string }[] }) => (
	<div className="flex items-center justify-center gap-6">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
				<item.icon className="size-3.5" />
				<span>{text}</span>
			</div>
		))}
	</div>
);

const SecurityFooter = () => (
	<div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
		<div className="flex items-center gap-1.5">
			<Shield className="size-3.5" />
			<span>PCI DSS Certified</span>
		</div>
		<div className="flex items-center gap-1.5">
			<Lock className="size-3.5" />
			<span>Bank-level Security</span>
		</div>
	</div>
);

export default function Main() {
	const savedCards: SavedCardProps[] = [
		{ id: '1', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
		{ id: '2', brand: 'Mastercard', last4: '8888', expiry: '03/25', isExpiringSoon: true },
		{ id: '3', brand: 'Amex', last4: '0005', expiry: '09/27' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="space-y-1">
						<SectionHeader
							title="Select Payment Method"
							action={
								<Button variant="ghost" size="sm" className="gap-1.5 text-xs">
									<RefreshCw className="size-3" />
									Refresh
								</Button>
							}
						/>
						<p className="text-sm text-muted-foreground">Choose a saved card or add a new one</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<SavedCardsList cards={savedCards} />
						<ExpiryAlert message="Your Mastercard ending in 8888 expires next month. Please update it." />
						<CVVInput placeholder="•••" />
						<Separator />
						<NewCardForm label="Add New Payment Method" />
						<div className="flex gap-3 pt-2">
							<ActionButton icon={Lock} label="Pay $156.00" />
						</div>
						<SecurityFooter />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
