import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	FileText,
	MapPin,
	Phone,
	User,
} from 'lucide-react';

interface TenantProps {
	name: string;
	email: string;
	phone: string;
}

interface PropertyProps {
	name: string;
	unit: string;
	address: string;
}

interface ChargeProps {
	category: string;
	description: string;
	amount: number;
}

interface TotalsProps {
	previousBalance: number;
	currentCharges: number;
	payments: number;
	balance: number;
	currency: string;
}

const HeaderSection = ({
	statementDate,
	dueDate,
}: {
	statementDate: string;
	dueDate: string;
}) => (
	<div className="border-y-4 border-foreground py-6">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-12 border-2 border-foreground flex items-center justify-center">
					<FileText className="size-6" />
				</div>
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Rent Statement</h1>
					<p className="text-sm text-muted-foreground">{statementDate}</p>
				</div>
			</div>
			<div className="text-right border-l-2 border-foreground pl-4">
				<p className="text-xs uppercase tracking-widest text-muted-foreground">
					Payment Due
				</p>
				<p className="text-xl font-bold">{dueDate}</p>
			</div>
		</div>
	</div>
);

const TenantBox = ({
	tenant,
	label,
}: {
	tenant: TenantProps;
	label: string;
}) => (
	<div className="border-2 border-foreground">
		<div className="bg-foreground text-background px-4 py-2">
			<p className="text-xs font-bold uppercase tracking-widest">{label}</p>
		</div>
		<div className="p-4 space-y-2">
			<p className="font-bold flex items-center gap-2">
				<User className="size-4" />
				{tenant.name}
			</p>
			<p className="text-sm text-muted-foreground">{tenant.email}</p>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<Phone className="size-3" />
				{tenant.phone}
			</p>
		</div>
	</div>
);

const PropertyBox = ({ property }: { property: PropertyProps }) => (
	<div className="border-2 border-foreground">
		<div className="bg-foreground text-background px-4 py-2">
			<p className="text-xs font-bold uppercase tracking-widest">Property</p>
		</div>
		<div className="p-4 space-y-2">
			<p className="font-bold flex items-center gap-2">
				<Building className="size-4" />
				{property.name}
			</p>
			<Badge variant="outline" className="rounded-none">
				{property.unit}
			</Badge>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<MapPin className="size-3" />
				{property.address}
			</p>
		</div>
	</div>
);

const ChargeRow = ({
	charge,
	currency,
	isAlternate,
}: {
	charge: ChargeProps;
	currency: string;
	isAlternate: boolean;
}) => (
	<div
		className={`flex items-center justify-between p-4 border-x-2 border-b-2 border-foreground ${isAlternate ? 'bg-muted/30' : ''}`}
	>
		<div className="flex items-center gap-3">
			<Badge
				variant="outline"
				className="rounded-none text-[10px] min-w-[80px] justify-center"
			>
				{charge.category}
			</Badge>
			<span className="text-sm">{charge.description}</span>
		</div>
		<span className="font-bold">
			{currency}
			{charge.amount.toFixed(2)}
		</span>
	</div>
);

const TotalsBox = ({
	previousBalance,
	currentCharges,
	payments,
	balance,
	currency,
}: TotalsProps) => (
	<div className="border-2 border-foreground">
		<div className="bg-foreground text-background px-4 py-2">
			<p className="text-xs font-bold uppercase tracking-widest">
				Account Summary
			</p>
		</div>
		<div className="p-4 space-y-3">
			<div className="flex justify-between text-sm">
				<span>Previous Balance</span>
				<span>
					{currency}
					{previousBalance.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Current Charges</span>
				<span>
					{currency}
					{currentCharges.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-600">
				<span>Payments Received</span>
				<span>
					-{currency}
					{payments.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-lg">
				<span>Balance Due</span>
				<span className="text-primary">
					{currency}
					{balance.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const tenant: TenantProps = {
		name: 'Michael Anderson',
		email: 'm.anderson@email.com',
		phone: '(555) 234-5678',
	};

	const property: PropertyProps = {
		name: 'Sunset View Apartments',
		unit: 'Unit 405',
		address: '1234 Sunset Blvd, Los Angeles, CA 90028',
	};

	const charges: ChargeProps[] = [
		{
			category: 'Rent',
			description: 'Monthly rent - March 2024',
			amount: 2450.0,
		},
		{ category: 'Utility', description: 'Water & sewage', amount: 45.0 },
		{ category: 'Utility', description: 'Trash collection', amount: 25.0 },
		{
			category: 'Parking',
			description: 'Reserved parking spot #45',
			amount: 150.0,
		},
		{ category: 'Pet', description: 'Pet rent (1 cat)', amount: 35.0 },
		{ category: 'Storage', description: 'Storage unit #12', amount: 75.0 },
	];

	const totals: TotalsProps = {
		previousBalance: 0,
		currentCharges: 2780.0,
		payments: 0,
		balance: 2780.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<HeaderSection statementDate="March 2024" dueDate="March 1, 2024" />
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<TenantBox tenant={tenant} label="Tenant" />
					<PropertyBox property={property} />
				</div>
				<div className="mt-4">
					<div className="bg-foreground text-background px-4 py-2 border-2 border-foreground border-b-0">
						<p className="text-xs font-bold uppercase tracking-widest">
							Charges
						</p>
					</div>
					{charges.map((charge, index) => (
						<ChargeRow
							key={index}
							charge={charge}
							currency="$"
							isAlternate={index % 2 === 1}
						/>
					))}
				</div>
				<div className="mt-4">
					<TotalsBox {...totals} />
				</div>
				<div className="border-2 border-foreground mt-4 p-4">
					<p className="text-xs font-bold uppercase tracking-widest mb-2">
						Payment Methods
					</p>
					<p className="text-sm text-muted-foreground">
						Pay online at tenant portal, by check to &quot;Sunset
						Management&quot;, or via bank transfer.
					</p>
				</div>
			</div>
		</section>
	);
}
