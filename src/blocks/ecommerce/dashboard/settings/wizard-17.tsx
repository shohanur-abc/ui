import { Check, ChevronRight, Circle, Settings } from 'lucide-react';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type WizardStep = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	current: boolean;
};

type StoreTypeOption = {
	id: string;
	title: string;
	description: string;
};

const StepIndicator = ({ steps }: { steps: WizardStep[] }) => (
	<div className="flex justify-between">
		{steps.map((step, index) => (
			<div key={step.id} className="flex items-center">
				<div className="flex flex-col items-center">
					<div
						className={`flex size-10 items-center justify-center rounded-full border-2 transition-colors ${
							step.completed
								? 'border-primary bg-primary text-primary-foreground'
								: step.current
									? 'border-primary text-primary'
									: 'border-muted text-muted-foreground'
						}`}
					>
						{step.completed ? (
							<Check className="size-5" />
						) : (
							<span className="font-semibold">{step.id}</span>
						)}
					</div>
					<div className="mt-2 text-center">
						<p className={`text-sm font-medium ${step.current ? 'text-primary' : ''}`}>
							{step.title}
						</p>
						<p className="hidden text-xs text-muted-foreground @sm:block">
							{step.description}
						</p>
					</div>
				</div>
				{index < steps.length - 1 && (
					<div
						className={`mx-4 h-0.5 w-12 @sm:w-24 ${
							step.completed ? 'bg-primary' : 'bg-muted'
						}`}
					/>
				)}
			</div>
		))}
	</div>
);

const StoreTypeCard = ({ id, title, description }: StoreTypeOption) => (
	<Label
		htmlFor={id}
		className="group flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="mt-1" />
		<div>
			<span className="font-medium">{title}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Label>
);

export default function Main() {
	const steps: WizardStep[] = [
		{ id: 1, title: 'Store Type', description: 'Choose type', completed: true, current: false },
		{ id: 2, title: 'Basic Info', description: 'Store details', completed: false, current: true },
		{ id: 3, title: 'Preferences', description: 'Customize', completed: false, current: false },
		{ id: 4, title: 'Complete', description: 'Finish setup', completed: false, current: false },
	];

	const storeTypes: StoreTypeOption[] = [
		{
			id: 'physical',
			title: 'Physical Products',
			description: 'Sell tangible items that need shipping',
		},
		{
			id: 'digital',
			title: 'Digital Products',
			description: 'Sell downloadable files and content',
		},
		{
			id: 'services',
			title: 'Services',
			description: 'Offer appointments and bookings',
		},
		{
			id: 'hybrid',
			title: 'Mixed Store',
			description: 'Combination of products and services',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="border-b text-center">
						<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
							<Settings className="size-6 text-primary" />
						</div>
						<CardTitle className="text-xl">Store Setup Wizard</CardTitle>
						<CardDescription>Complete these steps to set up your store</CardDescription>
					</CardHeader>
					<CardContent className="pt-8">
						<StepIndicator steps={steps} />

						<div className="mt-10 space-y-6">
							<div>
								<h3 className="text-lg font-semibold">Basic Information</h3>
								<p className="text-sm text-muted-foreground">
									Tell us about your store
								</p>
							</div>

							<div className="grid gap-4 @sm:grid-cols-2">
								<div className="space-y-2 @sm:col-span-2">
									<Label htmlFor="storeName">Store Name</Label>
									<Input id="storeName" placeholder="My Awesome Store" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select>
										<SelectTrigger id="category">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="fashion">Fashion</SelectItem>
											<SelectItem value="electronics">Electronics</SelectItem>
											<SelectItem value="home">Home & Garden</SelectItem>
											<SelectItem value="sports">Sports</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="currency">Currency</Label>
									<Select defaultValue="usd">
										<SelectTrigger id="currency">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="usd">USD ($)</SelectItem>
											<SelectItem value="eur">EUR (€)</SelectItem>
											<SelectItem value="gbp">GBP (£)</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex justify-between pt-6">
								<Button variant="outline">Back</Button>
								<Button className="gap-2">
									Continue
									<ChevronRight className="size-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
