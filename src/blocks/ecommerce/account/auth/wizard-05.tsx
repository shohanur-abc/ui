import Link from 'next/link';
import { ArrowRight, ArrowLeft, Store, Check, Upload, FileText, Shield, CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
		<span className={`text-xs mt-2 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
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

const FileUpload = ({
	label,
	description,
	id,
}: {
	label: string;
	description: string;
	id: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
			<Upload className="size-8 text-muted-foreground mx-auto mb-2" />
			<p className="text-sm font-medium">{description}</p>
			<p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 5MB</p>
			<Input id={id} type="file" className="hidden" />
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

const VerificationStep = () => {
	const idTypes = ['Passport', 'Driver License', 'National ID', 'Business License'];

	return (
		<form className="space-y-4">
			<div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-4">
				<div className="flex items-start gap-3">
					<Shield className="size-5 text-primary flex-shrink-0 mt-0.5" />
					<div>
						<p className="font-medium text-sm">Identity Verification</p>
						<p className="text-xs text-muted-foreground">
							We need to verify your identity to ensure a safe marketplace for everyone.
						</p>
					</div>
				</div>
			</div>
			<SelectField label="ID Type" placeholder="Select ID type" options={idTypes} />
			<FileUpload id="id-front" label="Front of ID" description="Upload front side of your ID" />
			<FileUpload id="id-back" label="Back of ID" description="Upload back side of your ID" />
			<NavigationButtons showBack={true} nextLabel="Continue" />
		</form>
	);
};

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
						<CardTitle className="text-2xl">Verify Your Identity</CardTitle>
						<CardDescription>Upload documents to verify your account</CardDescription>
					</CardHeader>
					<CardContent>
						<StepProgress steps={steps} currentStep={2} />
						<VerificationStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
