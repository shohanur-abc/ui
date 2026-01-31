import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Gift, Heart, MessageSquare, Star } from 'lucide-react';

interface DonationTierProps {
	name: string;
	amount: number;
	currency: string;
	benefits: string[];
}

interface DonationHeaderProps {
	organizationName: string;
	campaignName: string;
	donationId: string;
	date: string;
}

interface DonorInfoProps {
	name: string;
	email: string;
	isAnonymous: boolean;
	isRecurring: boolean;
}

interface DonationAmountProps {
	amount: number;
	processingFee: number;
	netAmount: number;
	currency: string;
	isRecurring: boolean;
	frequency?: string;
}

interface ThankYouMessageProps {
	message: string;
	signature: string;
}

interface ImpactStatsProps {
	stats: { label: string; value: string }[];
}

const DonationHeader = ({
	organizationName,
	campaignName,
	donationId,
	date,
}: DonationHeaderProps) => (
	<div className="text-center space-y-3">
		<div className="flex justify-center">
			<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20">
				<Heart className="size-8 text-pink-500" />
			</div>
		</div>
		<div>
			<h1 className="text-xl font-bold">{organizationName}</h1>
			<p className="text-muted-foreground">{campaignName}</p>
		</div>
		<div className="flex justify-center gap-4 text-sm text-muted-foreground">
			<span>Receipt #{donationId}</span>
			<span>•</span>
			<span>{date}</span>
		</div>
	</div>
);

const DonorInfo = ({
	name,
	email,
	isAnonymous,
	isRecurring,
}: DonorInfoProps) => (
	<div className="p-4 rounded-lg border space-y-2">
		<div className="flex items-center justify-between">
			<p className="font-semibold">Donor Information</p>
			<div className="flex gap-2">
				{isAnonymous && <Badge variant="outline">Anonymous</Badge>}
				{isRecurring && <Badge variant="secondary">Recurring</Badge>}
			</div>
		</div>
		<div className="space-y-1 text-sm">
			<p>
				<span className="text-muted-foreground">Name:</span> {name}
			</p>
			<p>
				<span className="text-muted-foreground">Email:</span> {email}
			</p>
		</div>
	</div>
);

const DonationAmount = ({
	amount,
	processingFee,
	netAmount,
	currency,
	isRecurring,
	frequency,
}: DonationAmountProps) => (
	<div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 space-y-3">
		<div className="text-center">
			<p className="text-3xl font-bold text-pink-600">
				{currency}
				{amount.toFixed(2)}
			</p>
			{isRecurring && (
				<p className="text-sm text-muted-foreground">{frequency}</p>
			)}
		</div>
		<Separator />
		<div className="space-y-1 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Donation Amount</span>
				<span>
					{currency}
					{amount.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Processing Fee</span>
				<span>
					-{currency}
					{processingFee.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between font-medium">
				<span>Net to Organization</span>
				<span>
					{currency}
					{netAmount.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const ThankYouMessage = ({ message, signature }: ThankYouMessageProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		<div className="flex items-center gap-2">
			<MessageSquare className="size-4 text-muted-foreground" />
			<p className="font-semibold">Thank You Note</p>
		</div>
		<p className="text-sm text-muted-foreground italic">
			&ldquo;{message}&rdquo;
		</p>
		<p className="text-sm font-medium">— {signature}</p>
	</div>
);

const ImpactStats = ({ stats }: ImpactStatsProps) => (
	<div className="grid grid-cols-2 gap-3">
		{stats.map((stat, index) => (
			<div key={index} className="p-3 rounded-lg border text-center">
				<p className="text-lg font-bold text-primary">{stat.value}</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

export default function Main() {
	const header: DonationHeaderProps = {
		organizationName: 'Hope Foundation',
		campaignName: '2024 Education Fund',
		donationId: 'DON-2024-7890',
		date: 'February 5, 2024',
	};

	const donor: DonorInfoProps = {
		name: 'Michael Thompson',
		email: 'michael@email.com',
		isAnonymous: false,
		isRecurring: true,
	};

	const donation: DonationAmountProps = {
		amount: 100.0,
		processingFee: 2.9,
		netAmount: 97.1,
		currency: '$',
		isRecurring: true,
		frequency: 'Monthly Donation',
	};

	const thankYou: ThankYouMessageProps = {
		message:
			'Your generous contribution helps us provide education to underprivileged children. Every dollar makes a difference in shaping young minds.',
		signature: 'The Hope Foundation Team',
	};

	const impact = [
		{ label: 'Children Helped', value: '2' },
		{ label: 'Books Provided', value: '10' },
		{ label: 'Your Impact Rank', value: 'Top 5%' },
		{ label: 'Total Given', value: '$1,200' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<DonationHeader {...header} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<DonorInfo {...donor} />
						<DonationAmount {...donation} />
						<ThankYouMessage {...thankYou} />
						<div className="space-y-3">
							<p className="font-semibold flex items-center gap-2">
								<Star className="size-4 text-amber-500" />
								Your Impact
							</p>
							<ImpactStats stats={impact} />
						</div>
					</CardContent>
					<CardFooter className="border-t pt-6 flex-col gap-3">
						<div className="flex flex-wrap gap-3 w-full">
							<Button className="flex-1 gap-2">
								<Gift className="size-4" />
								Donate Again
							</Button>
							<Button variant="outline" className="flex-1">
								Download Receipt
							</Button>
						</div>
						<p className="text-xs text-center text-muted-foreground">
							This donation is tax-deductible. EIN: 12-3456789
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
