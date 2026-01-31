import Link from 'next/link';
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Shirt, Home, Sparkles, Gift, Laptop, Dumbbell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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

const CategoryOption = ({
	icon: Icon,
	label,
	id,
}: {
	icon: React.ElementType;
	label: string;
	id: string;
}) => (
	<div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
		<Checkbox id={id} />
		<div className="flex items-center gap-2">
			<Icon className="size-4 text-muted-foreground" />
			<Label htmlFor={id} className="text-sm font-normal cursor-pointer">
				{label}
			</Label>
		</div>
	</div>
);

const NavigationButtons = ({
	showBack,
	nextLabel,
	nextIcon: NextIcon,
}: {
	showBack: boolean;
	nextLabel: string;
	nextIcon?: React.ElementType;
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
			{NextIcon && <NextIcon className="size-4 transition-transform group-hover:translate-x-0.5" />}
		</Button>
	</div>
);

const PreferencesStep = () => {
	const categories = [
		{ id: 'fashion', icon: Shirt, label: 'Fashion & Clothing' },
		{ id: 'home', icon: Home, label: 'Home & Living' },
		{ id: 'beauty', icon: Sparkles, label: 'Beauty & Personal Care' },
		{ id: 'gifts', icon: Gift, label: 'Gifts & Special Occasions' },
		{ id: 'electronics', icon: Laptop, label: 'Electronics & Tech' },
		{ id: 'sports', icon: Dumbbell, label: 'Sports & Fitness' },
	];

	return (
		<form className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Select categories you&apos;re interested in to personalize your shopping experience.
			</p>
			<div className="space-y-2">
				{categories.map((category) => (
					<CategoryOption
						key={category.id}
						id={category.id}
						icon={category.icon}
						label={category.label}
					/>
				))}
			</div>
			<NavigationButtons showBack={true} nextLabel="Complete Setup" nextIcon={Check} />
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
						<CardTitle className="text-2xl">Your interests</CardTitle>
						<CardDescription>What would you like to shop for?</CardDescription>
					</CardHeader>
					<CardContent>
						<StepIndicator steps={steps} currentStep={3} />
						<PreferencesStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
