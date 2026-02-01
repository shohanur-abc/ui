import Link from 'next/link';
import {
	ArrowRight,
	ArrowLeft,
	Store,
	Check,
	Upload,
	Palette,
	Type,
	Image,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const StepCircle = ({
	step,
	label,
	isActive,
	isCompleted,
}: {
	step: number;
	label: string;
	isActive: boolean;
	isCompleted: boolean;
}) => (
	<div className="flex flex-col items-center">
		<div
			className={`size-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
				isCompleted
					? 'bg-primary text-primary-foreground'
					: isActive
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{isCompleted ? <Check className="size-5" /> : step}
		</div>
		<span
			className={`text-xs mt-2 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
	<div className={`flex-1 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
);

const StepProgress = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-start mb-8">
		{steps.map((label, index) => (
			<div key={label} className="flex items-start flex-1 last:flex-initial">
				<StepCircle
					step={index + 1}
					label={label}
					isActive={currentStep === index + 1}
					isCompleted={currentStep > index + 1}
				/>
				{index < steps.length - 1 && (
					<StepConnector isCompleted={currentStep > index + 1} />
				)}
			</div>
		))}
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

const TextareaField = ({
	label,
	placeholder,
	id,
	maxLength,
}: {
	label: string;
	placeholder: string;
	id: string;
	maxLength?: number;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<Textarea
			id={id}
			placeholder={placeholder}
			rows={3}
			maxLength={maxLength}
		/>
		{maxLength && (
			<p className="text-xs text-muted-foreground text-right">
				Max {maxLength} characters
			</p>
		)}
	</div>
);

const FileUpload = ({
	label,
	description,
	id,
	icon: Icon,
}: {
	label: string;
	description: string;
	id: string;
	icon: React.ElementType;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
			<Icon className="size-6 text-muted-foreground mx-auto mb-1" />
			<p className="text-sm">{description}</p>
			<Input id={id} type="file" className="hidden" accept="image/*" />
		</div>
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

const StoreSetupStep = () => (
	<form className="space-y-4">
		<FormField
			id="store-name"
			label="Store Display Name"
			type="text"
			placeholder="My Awesome Store"
			icon={Type}
		/>
		<TextareaField
			id="store-description"
			label="Store Description"
			placeholder="Tell customers about your store..."
			maxLength={500}
		/>
		<div className="grid grid-cols-2 gap-3">
			<FileUpload
				id="store-logo"
				label="Store Logo"
				description="Upload logo"
				icon={Image}
			/>
			<FileUpload
				id="store-banner"
				label="Store Banner"
				description="Upload banner"
				icon={Image}
			/>
		</div>
		<NavigationButtons showBack={true} nextLabel="Review & Submit" />
	</form>
);

export default function Main() {
	const steps = ['Business Info', 'Verification', 'Store Setup', 'Review'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-lg">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="SellerHub" icon={Store} />
						</div>
						<CardTitle className="text-2xl">Customize Your Store</CardTitle>
						<CardDescription>Make your store stand out</CardDescription>
					</CardHeader>
					<CardContent>
						<StepProgress steps={steps} currentStep={3} />
						<StoreSetupStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
