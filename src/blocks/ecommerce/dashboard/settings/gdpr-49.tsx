import {
	AlertTriangle,
	Check,
	Download,
	FileWarning,
	Loader2,
	Mail,
	Search,
	Shield,
	Trash2,
	User,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

type RequestType = {
	id: string;
	name: string;
	description: string;
	processingTime: string;
};

type ExistingRequest = {
	id: string;
	type: string;
	status: 'pending' | 'processing' | 'completed' | 'rejected';
	submittedAt: string;
	completedAt?: string;
};

const RequestTypeCard = ({
	id,
	name,
	description,
	processingTime,
}: RequestType) => (
	<Label
		htmlFor={id}
		className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all hover:bg-muted/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<Checkbox id={id} className="mt-1" />
		<div>
			<span className="font-medium">{name}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
			<p className="mt-1 text-xs text-muted-foreground">
				Processing time: {processingTime}
			</p>
		</div>
	</Label>
);

const RequestStatusCard = ({
	type,
	status,
	submittedAt,
	completedAt,
}: ExistingRequest) => {
	const statusStyles = {
		pending: 'bg-amber-500/10 text-amber-500',
		processing: 'bg-primary/10 text-primary',
		completed: 'bg-emerald-500/10 text-emerald-500',
		rejected: 'bg-destructive/10 text-destructive',
	};

	const statusIcons = {
		pending: <AlertTriangle className="size-4" />,
		processing: <Loader2 className="size-4 animate-spin" />,
		completed: <Check className="size-4" />,
		rejected: <X className="size-4" />,
	};

	return (
		<div className="flex items-center justify-between rounded-lg border p-4">
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{type}</h4>
					<Badge className={`${statusStyles[status]} border-0`}>
						<span className="mr-1">{statusIcons[status]}</span>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">
					Submitted: {submittedAt}
					{completedAt && ` • Completed: ${completedAt}`}
				</p>
			</div>
			{status === 'completed' && (
				<Button variant="outline" size="sm" className="gap-2">
					<Download className="size-4" />
					Download
				</Button>
			)}
		</div>
	);
};

export default function Main() {
	const requestTypes: RequestType[] = [
		{
			id: 'access',
			name: 'Access My Data',
			description: 'Get a copy of all personal data we hold about you',
			processingTime: '3-5 business days',
		},
		{
			id: 'rectification',
			name: 'Correct My Data',
			description: 'Request correction of inaccurate personal data',
			processingTime: '2-3 business days',
		},
		{
			id: 'erasure',
			name: 'Delete My Data',
			description: 'Request permanent deletion of your personal data',
			processingTime: '5-7 business days',
		},
		{
			id: 'portability',
			name: 'Data Portability',
			description: 'Receive your data in a machine-readable format',
			processingTime: '3-5 business days',
		},
		{
			id: 'restriction',
			name: 'Restrict Processing',
			description: 'Limit how we process your personal data',
			processingTime: '1-2 business days',
		},
	];

	const existingRequests: ExistingRequest[] = [
		{ id: '1', type: 'Access My Data', status: 'completed', submittedAt: 'Jan 10, 2026', completedAt: 'Jan 15, 2026' },
		{ id: '2', type: 'Data Portability', status: 'processing', submittedAt: 'Jan 18, 2026' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Shield className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>GDPR Data Request</CardTitle>
										<CardDescription>
											Exercise your data protection rights
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<Label className="font-semibold">Select Request Type</Label>
								{requestTypes.map((type) => (
									<RequestTypeCard key={type.id} {...type} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Additional Information</CardTitle>
								<CardDescription>
									Provide details about your request
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="space-y-2">
									<Label htmlFor="details">Request Details</Label>
									<Textarea
										id="details"
										placeholder="Please describe your request in detail..."
										rows={4}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Confirmation Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="your@email.com"
										defaultValue="john@example.com"
									/>
								</div>
								<div className="flex items-start gap-3">
									<Checkbox id="verify" className="mt-1" />
									<Label htmlFor="verify" className="text-sm cursor-pointer">
										I confirm that I am the data subject or authorized to make this
										request on behalf of the data subject
									</Label>
								</div>
								<Button className="w-full gap-2">
									<Mail className="size-4" />
									Submit Request
								</Button>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Your Requests</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{existingRequests.map((req) => (
									<RequestStatusCard key={req.id} {...req} />
								))}
								{existingRequests.length === 0 && (
									<p className="text-center text-sm text-muted-foreground py-4">
										No pending requests
									</p>
								)}
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<User className="size-5 text-primary shrink-0" />
									<div>
										<h4 className="font-medium">Your Rights</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											Under GDPR, you have the right to access, rectify, erase, and
											port your personal data. We'll respond within 30 days.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<FileWarning className="size-5 text-amber-500 shrink-0" />
									<div>
										<h4 className="font-medium">Verification Required</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											We may need to verify your identity before processing certain
											requests to protect your data.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
