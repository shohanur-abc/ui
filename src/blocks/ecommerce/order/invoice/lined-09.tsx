import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Clock,
	Cpu,
	HardDrive,
	Monitor,
	Package,
	Shield,
	Truck,
	User,
	Wrench,
} from 'lucide-react';

interface CustomerProps {
	name: string;
	phone: string;
	email: string;
}

interface DeviceProps {
	type: string;
	brand: string;
	model: string;
	serialNumber: string;
	condition: string;
}

interface ServiceProps {
	description: string;
	technician: string;
	duration: string;
	status: string;
}

interface PartProps {
	name: string;
	partNumber: string;
	quantity: number;
	price: number;
	warranty: string;
}

interface TotalsProps {
	labor: number;
	parts: number;
	diagnostic: number;
	tax: number;
	total: number;
	currency: string;
}

const RepairHeader = ({
	ticketNumber,
	dateReceived,
	dateCompleted,
}: {
	ticketNumber: string;
	dateReceived: string;
	dateCompleted: string;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Wrench className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Repair Service Invoice</h1>
					<p className="text-sm text-muted-foreground">
						Electronics Repair Center
					</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default">Completed</Badge>
				<p className="font-mono font-bold mt-1">{ticketNumber}</p>
			</div>
		</div>
		<div className="flex gap-8 mt-4 text-sm">
			<span className="flex items-center gap-1 text-muted-foreground">
				<Calendar className="size-3" />
				Received: {dateReceived}
			</span>
			<span className="flex items-center gap-1 text-muted-foreground">
				<Clock className="size-3" />
				Completed: {dateCompleted}
			</span>
		</div>
	</div>
);

const CustomerSection = ({ customer }: { customer: CustomerProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Customer Information
		</p>
		<div className="flex items-center gap-3">
			<User className="size-5 text-primary" />
			<div>
				<p className="font-medium">{customer.name}</p>
				<p className="text-sm text-muted-foreground">
					{customer.phone} • {customer.email}
				</p>
			</div>
		</div>
	</div>
);

const DeviceSection = ({ device }: { device: DeviceProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Device Information
		</p>
		<div className="flex items-start gap-3">
			<Monitor className="size-5 text-primary" />
			<div className="flex-1">
				<div className="flex items-center gap-2 mb-1">
					<p className="font-medium">
						{device.brand} {device.model}
					</p>
					<Badge variant="outline">{device.type}</Badge>
				</div>
				<div className="grid grid-cols-2 gap-4 text-sm mt-2">
					<div>
						<span className="text-muted-foreground">Serial: </span>
						<span className="font-mono">{device.serialNumber}</span>
					</div>
					<div>
						<span className="text-muted-foreground">Condition: </span>
						<span>{device.condition}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const ServiceRow = ({ service }: { service: ServiceProps }) => (
	<>
		<div className="py-4">
			<div className="flex items-start justify-between">
				<div>
					<p className="font-medium">{service.description}</p>
					<div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
						<span>Technician: {service.technician}</span>
						<span className="flex items-center gap-1">
							<Clock className="size-3" />
							{service.duration}
						</span>
					</div>
				</div>
				<Badge
					variant={service.status === 'Complete' ? 'default' : 'secondary'}
				>
					{service.status}
				</Badge>
			</div>
		</div>
		<Separator />
	</>
);

const PartRow = ({ part, currency }: { part: PartProps; currency: string }) => (
	<>
		<div className="py-3">
			<div className="flex justify-between mb-1">
				<div className="flex items-center gap-2">
					<Cpu className="size-4 text-muted-foreground" />
					<span className="font-medium">{part.name}</span>
				</div>
				<span className="font-medium">
					{currency}
					{(part.quantity * part.price).toFixed(2)}
				</span>
			</div>
			<div className="flex items-center gap-4 text-sm text-muted-foreground ml-6">
				<span>Part #: {part.partNumber}</span>
				<span>Qty: {part.quantity}</span>
				<span className="flex items-center gap-1">
					<Shield className="size-3" />
					{part.warranty}
				</span>
			</div>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	labor,
	parts,
	diagnostic,
	tax,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Diagnostic Fee</span>
			<span>
				{currency}
				{diagnostic.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Labor</span>
			<span>
				{currency}
				{labor.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Parts</span>
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
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const WarrantyInfo = () => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Warranty Information
		</p>
		<div className="space-y-2 text-sm">
			<div className="flex items-center gap-2">
				<Shield className="size-4 text-green-500" />
				<span>90-day warranty on all labor</span>
			</div>
			<div className="flex items-center gap-2">
				<Package className="size-4 text-green-500" />
				<span>Parts warranty per manufacturer specs</span>
			</div>
			<div className="flex items-center gap-2">
				<Truck className="size-4 text-muted-foreground" />
				<span className="text-muted-foreground">Device ready for pickup</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const customer: CustomerProps = {
		name: 'David Park',
		phone: '(555) 345-6789',
		email: 'david.p@email.com',
	};

	const device: DeviceProps = {
		type: 'Laptop',
		brand: 'Apple',
		model: 'MacBook Pro 14" (2023)',
		serialNumber: 'C02X****HK',
		condition: 'Good',
	};

	const services: ServiceProps[] = [
		{
			description: 'Diagnostic assessment and testing',
			technician: 'James Wilson',
			duration: '30 min',
			status: 'Complete',
		},
		{
			description: 'Battery replacement',
			technician: 'James Wilson',
			duration: '45 min',
			status: 'Complete',
		},
		{
			description: 'System cleanup and optimization',
			technician: 'James Wilson',
			duration: '30 min',
			status: 'Complete',
		},
	];

	const parts: PartProps[] = [
		{
			name: 'MacBook Pro 14" Battery',
			partNumber: 'A2519',
			quantity: 1,
			price: 199.0,
			warranty: '1 year',
		},
		{
			name: 'Thermal Paste',
			partNumber: 'TP-PRO',
			quantity: 1,
			price: 15.0,
			warranty: 'N/A',
		},
	];

	const totals: TotalsProps = {
		diagnostic: 0,
		labor: 95.0,
		parts: 214.0,
		tax: 27.19,
		total: 336.19,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<RepairHeader
					ticketNumber="REP-2024-1234"
					dateReceived="Feb 18, 2024"
					dateCompleted="Feb 21, 2024"
				/>
				<Separator />
				<div className="grid @md:grid-cols-2 gap-4">
					<CustomerSection customer={customer} />
					<DeviceSection device={device} />
				</div>
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Services Performed
					</p>
				</div>
				{services.map((service, index) => (
					<ServiceRow key={index} service={service} />
				))}
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Parts Replaced
					</p>
				</div>
				{parts.map((part, index) => (
					<PartRow key={index} part={part} currency="$" />
				))}
				<div className="grid @md:grid-cols-2 gap-8">
					<WarrantyInfo />
					<TotalsSection {...totals} />
				</div>
			</div>
		</section>
	);
}
