import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	CheckCircle,
	Clock,
	Shield,
	User,
	Wrench,
} from 'lucide-react';

interface PropertyProps {
	address: string;
	unit: string;
	propertyType: string;
}

interface TenantProps {
	name: string;
	phone: string;
	email: string;
}

interface WorkOrderProps {
	number: string;
	dateSubmitted: string;
	dateCompleted: string;
	priority: string;
	category: string;
}

interface LaborProps {
	description: string;
	technician: string;
	hours: number;
	rate: number;
}

interface PartProps {
	name: string;
	quantity: number;
	unitPrice: number;
}

interface TotalsProps {
	labor: number;
	parts: number;
	tax: number;
	total: number;
	tenantCharge: number;
	currency: string;
}

const WorkOrderHeader = ({ workOrder }: { workOrder: WorkOrderProps }) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Wrench className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Work Order Invoice</h1>
					<p className="text-sm text-muted-foreground">
						Maintenance Service Record
					</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default" className="gap-1">
					<CheckCircle className="size-3" />
					Completed
				</Badge>
				<p className="font-mono font-bold mt-1">{workOrder.number}</p>
			</div>
		</div>
	</div>
);

const PropertySection = ({ property }: { property: PropertyProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Property
		</p>
		<div className="flex items-center gap-3">
			<Building className="size-5 text-primary" />
			<div>
				<p className="font-medium">{property.address}</p>
				<p className="text-sm text-muted-foreground">
					{property.unit} • {property.propertyType}
				</p>
			</div>
		</div>
	</div>
);

const TenantSection = ({ tenant }: { tenant: TenantProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Tenant
		</p>
		<div className="flex items-center gap-3">
			<User className="size-5 text-primary" />
			<div>
				<p className="font-medium">{tenant.name}</p>
				<p className="text-sm text-muted-foreground">
					{tenant.phone} • {tenant.email}
				</p>
			</div>
		</div>
	</div>
);

const TimelineSection = ({ workOrder }: { workOrder: WorkOrderProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Timeline
		</p>
		<div className="grid grid-cols-3 gap-4 text-sm">
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-muted-foreground" />
				<div>
					<p className="text-muted-foreground">Submitted</p>
					<p className="font-medium">{workOrder.dateSubmitted}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-muted-foreground" />
				<div>
					<p className="text-muted-foreground">Completed</p>
					<p className="font-medium">{workOrder.dateCompleted}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Shield className="size-4 text-muted-foreground" />
				<div>
					<p className="text-muted-foreground">Priority</p>
					<Badge
						variant={
							workOrder.priority === 'High' ? 'destructive' : 'secondary'
						}
					>
						{workOrder.priority}
					</Badge>
				</div>
			</div>
		</div>
	</div>
);

const LaborRow = ({
	labor,
	currency,
}: {
	labor: LaborProps;
	currency: string;
}) => (
	<>
		<div className="py-3">
			<div className="flex justify-between mb-1">
				<p className="font-medium">{labor.description}</p>
				<p className="font-medium">
					{currency}
					{(labor.hours * labor.rate).toFixed(2)}
				</p>
			</div>
			<p className="text-sm text-muted-foreground">
				{labor.technician} • {labor.hours}h @ {currency}
				{labor.rate}/hr
			</p>
		</div>
		<Separator />
	</>
);

const PartRow = ({ part, currency }: { part: PartProps; currency: string }) => (
	<>
		<div className="flex justify-between py-3 text-sm">
			<div>
				<p>{part.name}</p>
				<p className="text-muted-foreground">
					Qty: {part.quantity} @ {currency}
					{part.unitPrice.toFixed(2)}
				</p>
			</div>
			<p className="font-medium">
				{currency}
				{(part.quantity * part.unitPrice).toFixed(2)}
			</p>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	labor,
	parts,
	tax,
	total,
	tenantCharge,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Labor</span>
			<span>
				{currency}
				{labor.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Parts & Materials</span>
			<span>
				{currency}
				{parts.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between font-bold">
			<span>Total Cost</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2 text-primary">
			<span>Tenant Charge</span>
			<span>
				{tenantCharge > 0
					? `${currency}${tenantCharge.toFixed(2)}`
					: 'No Charge'}
			</span>
		</div>
		{tenantCharge === 0 && (
			<p className="text-sm text-muted-foreground text-center">
				Covered under normal maintenance
			</p>
		)}
	</div>
);

export default function Main() {
	const property: PropertyProps = {
		address: '1234 Oak Street',
		unit: 'Apartment 305',
		propertyType: 'Multi-family',
	};

	const tenant: TenantProps = {
		name: 'Maria Garcia',
		phone: '(555) 234-5678',
		email: 'm.garcia@email.com',
	};

	const workOrder: WorkOrderProps = {
		number: 'WO-2024-0456',
		dateSubmitted: 'Feb 18, 2024',
		dateCompleted: 'Feb 20, 2024',
		priority: 'Standard',
		category: 'Plumbing',
	};

	const laborItems: LaborProps[] = [
		{
			description: 'Diagnose and repair leaking faucet',
			technician: 'Mike Rodriguez',
			hours: 1.5,
			rate: 85,
		},
		{
			description: 'Inspect under-sink plumbing',
			technician: 'Mike Rodriguez',
			hours: 0.5,
			rate: 85,
		},
	];

	const partItems: PartProps[] = [
		{ name: 'Delta Faucet Cartridge', quantity: 1, unitPrice: 28.5 },
		{ name: 'O-Ring Set', quantity: 1, unitPrice: 8.0 },
		{ name: "Plumber's Tape", quantity: 1, unitPrice: 3.5 },
	];

	const totals: TotalsProps = {
		labor: 170.0,
		parts: 40.0,
		tax: 3.5,
		total: 213.5,
		tenantCharge: 0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<WorkOrderHeader workOrder={workOrder} />
				<Separator />
				<div className="grid @md:grid-cols-2 gap-4">
					<PropertySection property={property} />
					<TenantSection tenant={tenant} />
				</div>
				<Separator />
				<TimelineSection workOrder={workOrder} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Labor
					</p>
				</div>
				{laborItems.map((labor, index) => (
					<LaborRow key={index} labor={labor} currency="$" />
				))}
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Parts & Materials
					</p>
				</div>
				{partItems.map((part, index) => (
					<PartRow key={index} part={part} currency="$" />
				))}
				<TotalsSection {...totals} />
			</div>
		</section>
	);
}
