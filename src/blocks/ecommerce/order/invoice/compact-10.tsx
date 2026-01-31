import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Gift, Heart } from 'lucide-react';

interface DonationInfoProps {
	organization: string;
	donorName: string;
	donationDate: string;
	receiptNumber: string;
}

interface DonationDetailsProps {
	amount: number;
	frequency: string;
	campaign: string;
	isRecurring: boolean;
	currency: string;
}

const DonationHeader = ({
	organization,
	donorName,
	donationDate,
	receiptNumber,
}: DonationInfoProps) => (
	<div className="space-y-3 text-center">
		<div className="size-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto">
			<Heart className="size-6 text-rose-500 fill-rose-500" />
		</div>
		<div>
			<h2 className="font-bold text-sm">{organization}</h2>
			<p className="text-[10px] text-muted-foreground">Thank You Receipt</p>
		</div>
		<div className="flex items-center justify-center gap-1 text-green-600">
			<Check className="size-4" />
			<span className="text-xs font-medium">Donation Confirmed</span>
		</div>
		<div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
			<span>{donationDate}</span>
			<span>#{receiptNumber}</span>
		</div>
	</div>
);

const DonationDetails = ({
	amount,
	frequency,
	campaign,
	isRecurring,
	currency,
}: DonationDetailsProps) => (
	<div className="p-4 rounded-lg bg-muted/50 space-y-3">
		<div className="text-center">
			<p className="text-3xl font-bold text-primary">
				{currency}
				{amount.toFixed(2)}
			</p>
			<Badge variant="secondary" className="mt-2 text-[10px]">
				{isRecurring ? `${frequency} Donation` : 'One-Time Gift'}
			</Badge>
		</div>
		<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
			<Gift className="size-3" />
			<span>{campaign}</span>
		</div>
	</div>
);

export default function Main() {
	const donation: DonationInfoProps = {
		organization: 'Hope Foundation',
		donorName: 'Sarah Mitchell',
		donationDate: 'Feb 15, 2024',
		receiptNumber: 'DON-78945',
	};

	const details: DonationDetailsProps = {
		amount: 100.0,
		frequency: 'Monthly',
		campaign: 'Education for All Initiative',
		isRecurring: true,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<DonationHeader {...donation} />
					<Separator />
					<DonationDetails {...details} />
					<div className="text-center text-[10px] text-muted-foreground space-y-1">
						<p className="font-medium text-foreground">
							Donor: {donation.donorName}
						</p>
						<p>This receipt serves as confirmation</p>
						<p>of your tax-deductible donation.</p>
						<p className="font-mono">Tax ID: 12-3456789</p>
					</div>
					<Button variant="outline" size="sm" className="w-full text-xs">
						Download Tax Receipt
					</Button>
				</div>
			</div>
		</section>
	);
}
