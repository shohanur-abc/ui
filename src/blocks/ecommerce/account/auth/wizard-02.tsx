import Link from 'next/link';
import { Phone, MapPin, ArrowRight, ArrowLeft, ShoppingBag, User, Calendar, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="space-y-2 mb-6">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
			<span className="font-medium">{steps[currentStep - 1]}</span>
		</div>
		<Progress value={(currentStep / steps.length) * 100} className="h-2" />
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input id={id} type={type} placeholder={placeholder} className="pl-10" />
		</div>
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
}: {
	label: string;
	placeholder: string;
	options: string[];
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option.toLowerCase().replace(/\s/g, '-')}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const NavigationButtons = ({
	showBack,
	nextLabel,
}: {
	showBack: boolean;
	nextLabel: string;
}) => (
	<div className="flex gap-3">
		{showBack && (
			<Button type="button" variant="outline" className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button type="submit" className="flex-1 gap-2 group">
			{nextLabel}
			<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
		</Button>
	</div>
);

const ProfileStep = () => {
	const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'];

	return (
		<form className="space-y-4">
			<FormField id="wizard-phone" label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" icon={Phone} />
			<FormField id="wizard-birth" label="Date of Birth" type="date" placeholder="" icon={Calendar} />
			<SelectField label="Country" placeholder="Select country" options={countries} />
			<FormField id="wizard-city" label="City" type="text" placeholder="New York" icon={MapPin} />
			<NavigationButtons showBack={true} nextLabel="Continue" />
		</form>
	);
};

export default function Main() {
	const steps = ['Account', 'Profile', 'Preferences'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Your profile</CardTitle>
						<CardDescription>Help us personalize your experience</CardDescription>
					</CardHeader>
					<CardContent>
						<StepIndicator steps={steps} currentStep={2} />
						<ProfileStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
