import {
	Bell,
	Check,
	ChevronRight,
	FileText,
	Globe,
	Lock,
	Mail,
	MapPin,
	Phone,
	Settings2,
	Shield,
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type ConsentCategory = {
	id: string;
	title: string;
	description: string;
	required: boolean;
	consented: boolean;
	lastUpdated: string;
};

type LegalDocument = {
	id: string;
	name: string;
	version: string;
	acceptedAt: string;
	updateAvailable: boolean;
};

const ConsentCard = ({
	title,
	description,
	required,
	consented,
	lastUpdated,
}: ConsentCategory) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			consented ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-3">
				<Checkbox
					id={title}
					defaultChecked={consented}
					disabled={required}
					className="mt-1"
				/>
				<div>
					<div className="flex items-center gap-2">
						<Label htmlFor={title} className="font-medium cursor-pointer">
							{title}
						</Label>
						{required && (
							<Badge variant="secondary" className="text-xs">
								Required
							</Badge>
						)}
					</div>
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
					<p className="mt-2 text-xs text-muted-foreground">
						Last updated: {lastUpdated}
					</p>
				</div>
			</div>
			{consented ? (
				<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
					<Check className="mr-1 size-3" />
					Consented
				</Badge>
			) : (
				<Badge variant="outline">Not Consented</Badge>
			)}
		</div>
	</div>
);

const LegalDocumentRow = ({
	name,
	version,
	acceptedAt,
	updateAvailable,
}: LegalDocument) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<FileText className="size-5 text-muted-foreground" />
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{name}</h4>
					<Badge variant="outline" className="text-xs">
						v{version}
					</Badge>
					{updateAvailable && (
						<Badge className="bg-amber-500/10 text-amber-500 border-0 text-xs">
							Update Available
						</Badge>
					)}
				</div>
				<p className="text-xs text-muted-foreground">Accepted: {acceptedAt}</p>
			</div>
		</div>
		<Button variant="ghost" size="sm" className="gap-2">
			View
			<ChevronRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const consentCategories: ConsentCategory[] = [
		{
			id: 'terms',
			title: 'Terms of Service',
			description: 'Required to use our platform and services',
			required: true,
			consented: true,
			lastUpdated: 'Jan 1, 2026',
		},
		{
			id: 'privacy',
			title: 'Privacy Policy',
			description: 'How we collect and use your personal data',
			required: true,
			consented: true,
			lastUpdated: 'Jan 1, 2026',
		},
		{
			id: 'marketing',
			title: 'Marketing Communications',
			description: 'Receive promotional emails and special offers',
			required: false,
			consented: true,
			lastUpdated: 'Dec 15, 2025',
		},
		{
			id: 'analytics',
			title: 'Analytics & Improvements',
			description: 'Help us improve by sharing usage data',
			required: false,
			consented: true,
			lastUpdated: 'Dec 15, 2025',
		},
		{
			id: 'thirdparty',
			title: 'Third-Party Data Sharing',
			description: 'Share data with trusted advertising partners',
			required: false,
			consented: false,
			lastUpdated: 'Never',
		},
	];

	const legalDocuments: LegalDocument[] = [
		{ id: '1', name: 'Terms of Service', version: '2.1', acceptedAt: 'Jan 1, 2026', updateAvailable: false },
		{ id: '2', name: 'Privacy Policy', version: '3.0', acceptedAt: 'Jan 1, 2026', updateAvailable: true },
		{ id: '3', name: 'Cookie Policy', version: '1.2', acceptedAt: 'Dec 20, 2025', updateAvailable: false },
		{ id: '4', name: 'Acceptable Use Policy', version: '1.0', acceptedAt: 'Nov 10, 2025', updateAvailable: false },
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
										<CardTitle>Consent Management</CardTitle>
										<CardDescription>
											Manage your privacy preferences and consents
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{consentCategories.map((category) => (
									<ConsentCard key={category.id} {...category} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-base">Communication Preferences</CardTitle>
										<CardDescription>How we can contact you</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{[
									{ icon: Mail, label: 'Email', description: 'Receive updates via email', enabled: true },
									{ icon: Phone, label: 'SMS', description: 'Receive text messages', enabled: false },
									{ icon: Bell, label: 'Push', description: 'Browser notifications', enabled: true },
								].map((pref) => (
									<div key={pref.label} className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<pref.icon className="size-5 text-muted-foreground" />
											<div>
												<Label>{pref.label}</Label>
												<p className="text-sm text-muted-foreground">
													{pref.description}
												</p>
											</div>
										</div>
										<Switch defaultChecked={pref.enabled} />
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Legal Documents</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{legalDocuments.map((doc) => (
									<LegalDocumentRow key={doc.id} {...doc} />
								))}
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
									<Lock className="size-6 text-primary" />
								</div>
								<h4 className="font-semibold">Your Rights</h4>
								<p className="mt-2 text-sm text-muted-foreground">
									You have the right to access, correct, or delete your data at any time.
								</p>
								<Button variant="link" size="sm" className="mt-2">
									Learn more about your rights
								</Button>
							</CardContent>
						</Card>

						<Button variant="outline" className="w-full gap-2">
							<Globe className="size-4" />
							Download All Consents
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
