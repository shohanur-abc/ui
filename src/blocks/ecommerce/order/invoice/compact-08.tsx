import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Pill } from 'lucide-react';

interface PharmacyInfoProps {
	pharmacyName: string;
	rxNumber: string;
	fillDate: string;
	patientName: string;
}

interface PrescriptionProps {
	medication: string;
	strength: string;
	quantity: number;
	daysSupply: number;
	directions: string;
	prescriber: string;
}

interface CostBreakdownProps {
	drugCost: number;
	insurancePaid: number;
	copay: number;
	currency: string;
}

const PharmacyHeader = ({
	pharmacyName,
	rxNumber,
	fillDate,
	patientName,
}: PharmacyInfoProps) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Pill className="size-4 text-primary" />
				<span className="font-bold text-sm">{pharmacyName}</span>
			</div>
			<Badge variant="default" className="text-[10px]">
				Filled
			</Badge>
		</div>
		<div className="flex items-center justify-between text-[10px] text-muted-foreground">
			<span>Rx #{rxNumber}</span>
			<span>Fill Date: {fillDate}</span>
		</div>
		<p className="text-xs font-medium">Patient: {patientName}</p>
	</div>
);

const PrescriptionInfo = ({
	medication,
	strength,
	quantity,
	daysSupply,
	directions,
	prescriber,
}: PrescriptionProps) => (
	<div className="p-3 rounded bg-muted/50 space-y-2">
		<div>
			<p className="font-bold text-sm">{medication}</p>
			<p className="text-xs text-muted-foreground">{strength}</p>
		</div>
		<div className="grid grid-cols-2 gap-2 text-[10px]">
			<div>
				<span className="text-muted-foreground">Qty: </span>
				<span className="font-medium">{quantity}</span>
			</div>
			<div>
				<span className="text-muted-foreground">Days: </span>
				<span className="font-medium">{daysSupply}</span>
			</div>
		</div>
		<div className="text-[10px]">
			<p className="text-muted-foreground">Directions:</p>
			<p className="font-medium">{directions}</p>
		</div>
		<p className="text-[10px] text-muted-foreground">
			Prescriber: {prescriber}
		</p>
	</div>
);

const CostBreakdown = ({
	drugCost,
	insurancePaid,
	copay,
	currency,
}: CostBreakdownProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between text-muted-foreground">
			<span>Drug Cost</span>
			<span>
				{currency}
				{drugCost.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-green-600">
			<span>Insurance Paid</span>
			<span>
				-{currency}
				{insurancePaid.toFixed(2)}
			</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between font-bold text-sm">
			<span>Your Copay</span>
			<span>
				{currency}
				{copay.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const pharmacy: PharmacyInfoProps = {
		pharmacyName: 'HealthCare Pharmacy',
		rxNumber: '7894561',
		fillDate: 'Feb 15, 2024',
		patientName: 'John Smith',
	};

	const prescription: PrescriptionProps = {
		medication: 'Lisinopril',
		strength: '10mg Tablets',
		quantity: 30,
		daysSupply: 30,
		directions: 'Take 1 tablet by mouth once daily',
		prescriber: 'Dr. Sarah Johnson',
	};

	const cost: CostBreakdownProps = {
		drugCost: 45.0,
		insurancePaid: 35.0,
		copay: 10.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<PharmacyHeader {...pharmacy} />
					<Separator />
					<PrescriptionInfo {...prescription} />
					<Separator />
					<CostBreakdown {...cost} />
					<div className="text-center text-[10px] text-muted-foreground pt-2 space-y-1">
						<p className="flex items-center justify-center gap-1">
							<Heart className="size-3" />
							<span>Refills Remaining: 2</span>
						</p>
						<p>Next refill available: Mar 10, 2024</p>
					</div>
				</div>
			</div>
		</section>
	);
}
