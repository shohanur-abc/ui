import {
	AlertTriangle,
	Archive,
	Check,
	Clock,
	Download,
	FileWarning,
	Loader2,
	Lock,
	Mail,
	ShieldAlert,
	Trash2,
	User,
	X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type AccountAction = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	variant: 'default' | 'warning' | 'danger';
};

type DeletionStep = {
	step: number;
	title: string;
	description: string;
	completed: boolean;
};

const ActionCard = ({
	title,
	description,
	icon: Icon,
	variant,
}: AccountAction) => {
	const variantStyles = {
		default: 'border-border hover:border-primary/50',
		warning: 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50',
		danger:
			'border-destructive/30 bg-destructive/5 hover:border-destructive/50',
	};

	const iconStyles = {
		default: 'bg-muted text-muted-foreground',
		warning: 'bg-amber-500/10 text-amber-500',
		danger: 'bg-destructive/10 text-destructive',
	};

	return (
		<div
			className={`flex items-start gap-4 rounded-lg border p-4 transition-all cursor-pointer ${variantStyles[variant]}`}
		>
			<div
				className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${iconStyles[variant]}`}
			>
				<Icon className="size-6" />
			</div>
			<div>
				<h4 className="font-medium">{title}</h4>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};

const DeletionStepRow = ({
	step,
	title,
	description,
	completed,
}: DeletionStep) => (
	<div className="flex items-start gap-4">
		<div
			className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
				completed
					? 'bg-emerald-500 text-white'
					: 'border-2 border-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-4" /> : step}
		</div>
		<div>
			<h4 className={`font-medium ${completed ? 'text-muted-foreground' : ''}`}>
				{title}
			</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const accountActions: AccountAction[] = [
		{
			id: 'download',
			title: 'Download Your Data',
			description: 'Get a copy of all your personal data before deletion',
			icon: Download,
			variant: 'default',
		},
		{
			id: 'deactivate',
			title: 'Deactivate Account',
			description:
				'Temporarily disable your account. You can reactivate anytime.',
			icon: Clock,
			variant: 'warning',
		},
		{
			id: 'delete',
			title: 'Delete Account Permanently',
			description: 'Permanently delete your account and all associated data',
			icon: Trash2,
			variant: 'danger',
		},
	];

	const deletionSteps: DeletionStep[] = [
		{
			step: 1,
			title: 'Download your data',
			description: 'Get a copy of your information',
			completed: true,
		},
		{
			step: 2,
			title: 'Confirm your identity',
			description: "Verify it's really you",
			completed: true,
		},
		{
			step: 3,
			title: 'Understand the consequences',
			description: 'Review what will be deleted',
			completed: false,
		},
		{
			step: 4,
			title: 'Final confirmation',
			description: 'Confirm deletion request',
			completed: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card className="border-destructive/20">
						<CardHeader className="border-b border-destructive/20">
							<div className="flex items-center gap-4">
								<Avatar className="size-16 ring-4 ring-destructive/20">
									<AvatarImage src="https://avatars.githubusercontent.com/u/252440198?v=4" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle className="text-destructive">
										Account Deletion
									</CardTitle>
									<CardDescription>
										Manage or permanently delete your account
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{accountActions.map((action) => (
								<ActionCard key={action.id} {...action} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Deletion Process</CardTitle>
							<CardDescription>
								Follow these steps to delete your account
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-6">
								{deletionSteps.map((step) => (
									<DeletionStepRow key={step.step} {...step} />
								))}
							</div>
							<div className="mt-6">
								<Progress value={50} className="h-2" />
								<p className="mt-2 text-sm text-muted-foreground">
									Step 2 of 4 completed
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="pt-6">
							<div className="flex items-start gap-4">
								<AlertTriangle className="size-6 text-amber-500 shrink-0" />
								<div>
									<h4 className="font-semibold">Before You Delete</h4>
									<ul className="mt-2 space-y-2 text-sm text-muted-foreground">
										<li className="flex items-center gap-2">
											<X className="size-4 text-destructive" />
											All orders and purchase history will be deleted
										</li>
										<li className="flex items-center gap-2">
											<X className="size-4 text-destructive" />
											Your reviews and ratings will be removed
										</li>
										<li className="flex items-center gap-2">
											<X className="size-4 text-destructive" />
											Wishlist and saved items will be lost
										</li>
										<li className="flex items-center gap-2">
											<X className="size-4 text-destructive" />
											Store credits and loyalty points will be forfeited
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-destructive/30 bg-destructive/5">
						<CardHeader className="border-b border-destructive/20">
							<CardTitle className="text-base text-destructive">
								Confirm Account Deletion
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<div className="space-y-2">
								<Label htmlFor="confirmEmail">
									Enter your email to confirm
								</Label>
								<Input
									id="confirmEmail"
									type="email"
									placeholder="john@example.com"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Enter your password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Enter password"
								/>
							</div>
							<div className="flex items-start gap-3">
								<Checkbox id="confirmUnderstand" className="mt-1" />
								<Label
									htmlFor="confirmUnderstand"
									className="text-sm cursor-pointer"
								>
									I understand that this action is permanent and cannot be
									undone. All my data will be permanently deleted.
								</Label>
							</div>
							<Button variant="destructive" className="w-full gap-2">
								<Trash2 className="size-4" />
								Delete My Account Permanently
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
