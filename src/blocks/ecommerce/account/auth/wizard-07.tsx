import Link from 'next/link';
import {
	ArrowRight,
	ArrowLeft,
	Store,
	Check,
	Building2,
	Mail,
	Phone,
	Globe,
	Edit2,
	Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

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

const ReviewSection = ({
	title,
	items,
	editStep,
}: {
	title: string;
	items: { label: string; value: string }[];
	editStep: number;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border border-border/50">
		<div className="flex items-center justify-between mb-3">
			<span className="font-medium">{title}</span>
			<Button variant="ghost" size="sm" className="gap-1 h-7">
				<Edit2 className="size-3" />
				Edit
			</Button>
		</div>
		<div className="space-y-2">
			{items.map((item) => (
				<div key={item.label} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span className="font-medium">{item.value}</span>
				</div>
			))}
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
			{NextIcon && (
				<NextIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
			)}
		</Button>
	</div>
);

const ReviewStep = () => {
	const businessInfo = [
		{ label: 'Business Name', value: 'My Store LLC' },
		{ label: 'Email', value: 'contact@mystore.com' },
		{ label: 'Phone', value: '+1 (555) 123-4567' },
	];

	const verificationInfo = [
		{ label: 'ID Type', value: 'Business License' },
		{ label: 'Status', value: 'Uploaded' },
	];

	const storeInfo = [
		{ label: 'Display Name', value: 'My Awesome Store' },
		{ label: 'Logo', value: 'Uploaded' },
		{ label: 'Banner', value: 'Uploaded' },
	];

	return (
		<form className="space-y-4">
			<ReviewSection
				title="Business Information"
				items={businessInfo}
				editStep={1}
			/>
			<ReviewSection
				title="Verification"
				items={verificationInfo}
				editStep={2}
			/>
			<ReviewSection title="Store Setup" items={storeInfo} editStep={3} />

			<Separator />

			<div className="flex items-start gap-2">
				<Checkbox id="terms" className="mt-0.5" />
				<Label
					htmlFor="terms"
					className="text-sm font-normal cursor-pointer leading-relaxed"
				>
					I agree to the{' '}
					<Link href="/seller-terms" className="text-primary hover:underline">
						Seller Terms
					</Link>{' '}
					and{' '}
					<Link
						href="/marketplace-policy"
						className="text-primary hover:underline"
					>
						Marketplace Policy
					</Link>
				</Label>
			</div>

			<NavigationButtons
				showBack={true}
				nextLabel="Submit Application"
				nextIcon={Sparkles}
			/>
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
						<CardTitle className="text-2xl">Review & Submit</CardTitle>
						<CardDescription>
							Double-check your information before submitting
						</CardDescription>
					</CardHeader>
					<CardContent>
						<StepProgress steps={steps} currentStep={4} />
						<ReviewStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
