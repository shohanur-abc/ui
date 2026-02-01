import {
	ArrowLeft,
	CreditCard,
	Eye,
	EyeOff,
	HelpCircle,
	Lock,
	ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

interface CardPreviewProps {
	cardNumber: string;
	cardHolder: string;
	expiry: string;
	brand: string;
}

interface FormInputProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	helpText?: string;
	icon?: React.ComponentType<{ className?: string }>;
	actionIcon?: React.ComponentType<{ className?: string }>;
}

interface SecurityFeatureProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const BackButton = ({ label }: { label: string }) => (
	<Button variant="ghost" size="sm" className="gap-2 mb-4">
		<ArrowLeft className="size-4" />
		{label}
	</Button>
);

const CardPreview = ({
	cardNumber,
	cardHolder,
	expiry,
	brand,
}: CardPreviewProps) => (
	<div className="relative h-44 @sm:h-48 rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-5 @sm:p-6 text-primary-foreground shadow-xl overflow-hidden">
		<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
		<div className="relative h-full flex flex-col justify-between">
			<div className="flex justify-between items-start">
				<div className="size-10 @sm:size-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
					<CreditCard className="size-5 @sm:size-6" />
				</div>
				<span className="text-sm font-semibold tracking-wider">{brand}</span>
			</div>
			<div className="space-y-4">
				<p className="text-lg @sm:text-xl font-mono tracking-[0.2em]">
					{cardNumber}
				</p>
				<div className="flex justify-between items-end">
					<div>
						<p className="text-xs opacity-70">Card Holder</p>
						<p className="font-medium tracking-wide">{cardHolder}</p>
					</div>
					<div className="text-right">
						<p className="text-xs opacity-70">Expires</p>
						<p className="font-medium">{expiry}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const FormInput = ({
	id,
	label,
	placeholder,
	type = 'text',
	helpText,
	icon: Icon,
	actionIcon: ActionIcon,
}: FormInputProps) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<Label htmlFor={id} className="text-sm">
				{label}
			</Label>
			{helpText && (
				<button className="text-muted-foreground hover:text-foreground transition-colors">
					<HelpCircle className="size-3.5" />
				</button>
			)}
		</div>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={`${Icon ? 'pl-10' : ''} ${ActionIcon ? 'pr-10' : ''}`}
			/>
			{ActionIcon && (
				<button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
					<ActionIcon className="size-4" />
				</button>
			)}
		</div>
	</div>
);

const SecurityFeature = ({ icon: Icon, text }: SecurityFeatureProps) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const SaveCardToggle = ({
	label,
	description,
}: {
	label: string;
	description: string;
}) => (
	<div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
		<Checkbox id="save" className="mt-0.5" />
		<div>
			<Label htmlFor="save" className="font-medium cursor-pointer">
				{label}
			</Label>
			<p className="text-xs text-muted-foreground mt-1">{description}</p>
		</div>
	</div>
);

const PaymentButton = ({
	label,
	amount,
}: {
	label: string;
	amount: string;
}) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label} {amount}
	</Button>
);

const SecurityBadges = ({ features }: { features: SecurityFeatureProps[] }) => (
	<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
		{features.map((feature, index) => (
			<SecurityFeature key={index} {...feature} />
		))}
	</div>
);

export default function Main() {
	const cardData = {
		cardNumber: '•••• •••• •••• 4242',
		cardHolder: 'JOHN DOE',
		expiry: '12/28',
		brand: 'VISA',
	};

	const formFields: FormInputProps[] = [
		{
			id: 'number',
			label: 'Card Number',
			placeholder: '1234 5678 9012 3456',
			icon: CreditCard,
		},
		{ id: 'holder', label: 'Cardholder Name', placeholder: 'JOHN DOE' },
	];

	const rowFields: FormInputProps[] = [
		{ id: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY' },
		{
			id: 'cvv',
			label: 'CVV',
			placeholder: '•••',
			type: 'password',
			helpText: '3 digits on back',
			actionIcon: EyeOff,
		},
	];

	const securityFeatures: SecurityFeatureProps[] = [
		{ icon: ShieldCheck, text: 'PCI Compliant' },
		{ icon: Lock, text: '256-bit SSL' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<BackButton label="Back to cart" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					<CardHeader className="pb-0 pt-6 px-6">
						<CardPreview {...cardData} />
					</CardHeader>
					<CardContent className="space-y-4 pt-6">
						{formFields.map((field) => (
							<FormInput key={field.id} {...field} />
						))}
						<div className="grid grid-cols-2 gap-4">
							{rowFields.map((field) => (
								<FormInput key={field.id} {...field} />
							))}
						</div>
						<Separator className="my-2" />
						<SaveCardToggle
							label="Save this card"
							description="Securely save for faster checkout next time"
						/>
					</CardContent>
					<CardFooter className="flex-col gap-4 pt-2">
						<PaymentButton label="Pay" amount="$89.99" />
						<SecurityBadges features={securityFeatures} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
