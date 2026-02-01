import {
	Check,
	ChevronRight,
	Key,
	Mail,
	Phone,
	Shield,
	Smartphone,
	X,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

type RecoveryMethod = {
	id: string;
	type: string;
	value: string;
	verified: boolean;
	primary: boolean;
	icon: React.ComponentType<{ className?: string }>;
};

type TrustedContact = {
	id: string;
	name: string;
	email: string;
	added: string;
};

const RecoveryMethodCard = ({
	type,
	value,
	verified,
	primary,
	icon: Icon,
}: RecoveryMethod) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
			primary ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div
			className={`flex size-10 items-center justify-center rounded-lg ${
				verified
					? 'bg-emerald-500/10 text-emerald-500'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{type}</span>
				{primary && <Badge variant="default">Primary</Badge>}
				{verified ? (
					<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
						<Check className="mr-1 size-3" />
						Verified
					</Badge>
				) : (
					<Badge variant="secondary">Unverified</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{value}</p>
		</div>
		<div className="flex gap-2">
			{!verified && (
				<Button size="sm" variant="outline">
					Verify
				</Button>
			)}
			<Button size="sm" variant="ghost">
				Edit
			</Button>
		</div>
	</div>
);

const TrustedContactRow = ({ name, email, added }: TrustedContact) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">{email}</p>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-sm text-muted-foreground">Added {added}</span>
			<Button size="sm" variant="ghost" className="text-destructive">
				Remove
			</Button>
		</div>
	</div>
);

export default function Main() {
	const recoveryMethods: RecoveryMethod[] = [
		{
			id: 'email',
			type: 'Recovery Email',
			value: 'john.backup@gmail.com',
			verified: true,
			primary: true,
			icon: Mail,
		},
		{
			id: 'phone',
			type: 'Phone Number',
			value: '+1 (555) 123-4567',
			verified: true,
			primary: false,
			icon: Phone,
		},
		{
			id: 'authenticator',
			type: 'Authenticator App',
			value: 'Google Authenticator',
			verified: true,
			primary: false,
			icon: Smartphone,
		},
		{
			id: 'backup',
			type: 'Backup Codes',
			value: '6 codes remaining',
			verified: true,
			primary: false,
			icon: Key,
		},
	];

	const trustedContacts: TrustedContact[] = [
		{
			id: '1',
			name: 'Jane Doe',
			email: 'jane@example.com',
			added: 'Jan 10, 2026',
		},
		{
			id: '2',
			name: 'Bob Smith',
			email: 'bob@example.com',
			added: 'Dec 5, 2025',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Account Recovery</CardTitle>
									<CardDescription>
										Set up recovery options to regain access if you lose your
										password
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{recoveryMethods.map((method) => (
								<RecoveryMethodCard key={method.id} {...method} />
							))}
							<Button variant="outline" className="w-full gap-2 mt-4">
								Add Recovery Method
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">Trusted Contacts</CardTitle>
									<CardDescription>
										People who can help you recover your account
									</CardDescription>
								</div>
								<Button size="sm" variant="outline">
									Add Contact
								</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{trustedContacts.map((contact) => (
								<TrustedContactRow key={contact.id} {...contact} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Recovery Preferences</CardTitle>
							<CardDescription>
								Choose your preferred recovery method order
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<RadioGroup defaultValue="email" className="space-y-3">
								{[
									{ value: 'email', label: 'Email first, then phone' },
									{ value: 'phone', label: 'Phone first, then email' },
									{ value: 'authenticator', label: 'Authenticator app only' },
								].map((option) => (
									<div key={option.value} className="flex items-center gap-3">
										<RadioGroupItem value={option.value} id={option.value} />
										<Label htmlFor={option.value}>{option.label}</Label>
									</div>
								))}
							</RadioGroup>
							<div className="mt-6 flex justify-end">
								<Button>Save Preferences</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
