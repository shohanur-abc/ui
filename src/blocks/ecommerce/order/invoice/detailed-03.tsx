import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Anchor,
	Box,
	Calendar,
	FileText,
	Globe,
	MapPin,
	Package,
	Ship,
	Truck,
	Weight,
} from 'lucide-react';

interface ShipmentHeaderProps {
	billOfLadingNumber: string;
	bookingNumber: string;
	vesselName: string;
	voyageNumber: string;
	shipmentDate: string;
	status: string;
}

interface PartyInfoProps {
	role: string;
	name: string;
	address: string;
	country: string;
	contactPerson: string;
	phone: string;
	email: string;
}

interface RouteInfoProps {
	portOfLoading: string;
	countryOfOrigin: string;
	portOfDischarge: string;
	countryOfDestination: string;
	finalDestination: string;
	estimatedDeparture: string;
	estimatedArrival: string;
}

interface ContainerProps {
	containerNumber: string;
	sealNumber: string;
	type: string;
	size: string;
	weight: number;
	volume: number;
}

interface CargoItemProps {
	hsCode: string;
	description: string;
	quantity: number;
	unit: string;
	grossWeight: number;
	netWeight: number;
	value: number;
}

interface ChargesBreakdownProps {
	oceanFreight: number;
	documentationFee: number;
	terminalHandling: number;
	customsClearance: number;
	insurance: number;
	totalCharges: number;
	currency: string;
}

const ShipmentHeader = ({
	billOfLadingNumber,
	bookingNumber,
	vesselName,
	voyageNumber,
	shipmentDate,
	status,
}: ShipmentHeaderProps) => (
	<Card className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/20">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="size-16 rounded-lg bg-blue-500/10 flex items-center justify-center">
						<Ship className="size-8 text-blue-500" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Bill of Lading</h1>
						<p className="text-sm text-muted-foreground">
							Commercial Invoice & Shipping Document
						</p>
					</div>
				</div>
				<Badge variant="default" className="text-sm">
					{status}
				</Badge>
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">B/L Number</p>
					<p className="font-mono font-semibold">{billOfLadingNumber}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Booking Number</p>
					<p className="font-mono">{bookingNumber}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Vessel / Voyage</p>
					<p className="font-medium">
						{vesselName} / {voyageNumber}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Shipment Date</p>
					<p>{shipmentDate}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PartyInfo = ({
	role,
	name,
	address,
	country,
	contactPerson,
	phone,
	email,
}: PartyInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{role}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<p className="font-semibold text-lg">{name}</p>
			<div className="flex items-start gap-2">
				<MapPin className="size-4 text-muted-foreground mt-0.5" />
				<div>
					<p>{address}</p>
					<p className="font-medium">{country}</p>
				</div>
			</div>
			<Separator />
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div>
					<p className="text-muted-foreground">Contact</p>
					<p>{contactPerson}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Phone</p>
					<p>{phone}</p>
				</div>
				<div className="col-span-2">
					<p className="text-muted-foreground">Email</p>
					<p>{email}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const RouteInfo = ({
	portOfLoading,
	countryOfOrigin,
	portOfDischarge,
	countryOfDestination,
	finalDestination,
	estimatedDeparture,
	estimatedArrival,
}: RouteInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<Globe className="size-4" />
				Route Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="text-center">
					<div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-2">
						<Anchor className="size-6 text-green-500" />
					</div>
					<p className="font-semibold">{portOfLoading}</p>
					<p className="text-xs text-muted-foreground">{countryOfOrigin}</p>
					<p className="text-xs mt-1">{estimatedDeparture}</p>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="h-px bg-border flex-1" />
					<Ship className="size-6 text-primary mx-4" />
					<div className="h-px bg-border flex-1" />
				</div>
				<div className="text-center">
					<div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
						<Anchor className="size-6 text-blue-500" />
					</div>
					<p className="font-semibold">{portOfDischarge}</p>
					<p className="text-xs text-muted-foreground">
						{countryOfDestination}
					</p>
					<p className="text-xs mt-1">{estimatedArrival}</p>
				</div>
			</div>
			<div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2 text-sm">
				<Truck className="size-4 text-muted-foreground" />
				<span className="text-muted-foreground">Final Destination:</span>
				<span className="font-medium">{finalDestination}</span>
			</div>
		</CardContent>
	</Card>
);

const ContainersTable = ({ containers }: { containers: ContainerProps[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<Box className="size-4" />
				Container Details
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Container #</TableHead>
						<TableHead>Seal #</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Size</TableHead>
						<TableHead className="text-right">Weight (kg)</TableHead>
						<TableHead className="text-right">Volume (m³)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{containers.map((container, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono font-medium">
								{container.containerNumber}
							</TableCell>
							<TableCell className="font-mono">
								{container.sealNumber}
							</TableCell>
							<TableCell>
								<Badge variant="outline">{container.type}</Badge>
							</TableCell>
							<TableCell>{container.size}</TableCell>
							<TableCell className="text-right">
								{container.weight.toLocaleString()}
							</TableCell>
							<TableCell className="text-right">{container.volume}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const CargoTable = ({
	items,
	currency,
}: {
	items: CargoItemProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<Package className="size-4" />
				Cargo Details
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">HS Code</TableHead>
						<TableHead>Description of Goods</TableHead>
						<TableHead className="text-center">Qty</TableHead>
						<TableHead>Unit</TableHead>
						<TableHead className="text-right">Gross Wt (kg)</TableHead>
						<TableHead className="text-right">Net Wt (kg)</TableHead>
						<TableHead className="text-right">Value ({currency})</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono text-xs">{item.hsCode}</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell className="text-center">{item.quantity}</TableCell>
							<TableCell>{item.unit}</TableCell>
							<TableCell className="text-right">
								{item.grossWeight.toLocaleString()}
							</TableCell>
							<TableCell className="text-right">
								{item.netWeight.toLocaleString()}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{item.value.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const ChargesBreakdown = ({
	oceanFreight,
	documentationFee,
	terminalHandling,
	customsClearance,
	insurance,
	totalCharges,
	currency,
}: ChargesBreakdownProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<FileText className="size-4" />
				Freight & Charges
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span>Ocean Freight</span>
					<span>
						{currency}
						{oceanFreight.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Documentation Fee</span>
					<span>
						{currency}
						{documentationFee.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Terminal Handling (Origin)</span>
					<span>
						{currency}
						{terminalHandling.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Customs Clearance</span>
					<span>
						{currency}
						{customsClearance.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Cargo Insurance</span>
					<span>
						{currency}
						{insurance.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-lg">
				<span>Total Charges</span>
				<span className="text-primary">
					{currency}
					{totalCharges.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const header: ShipmentHeaderProps = {
		billOfLadingNumber: 'MSCU-2024-789456',
		bookingNumber: 'BKG-2024-00123',
		vesselName: 'MSC AURORA',
		voyageNumber: 'V.024W',
		shipmentDate: 'February 20, 2024',
		status: 'In Transit',
	};

	const shipper: PartyInfoProps = {
		role: 'Shipper / Exporter',
		name: 'Shanghai Electronics Manufacturing Co., Ltd.',
		address: 'No. 888 Pudong Avenue, Pudong New District',
		country: 'China',
		contactPerson: 'Wang Lei',
		phone: '+86 21 5555 0100',
		email: 'export@shanghaielectronics.cn',
	};

	const consignee: PartyInfoProps = {
		role: 'Consignee / Importer',
		name: 'Global Tech Distribution Inc.',
		address: '2500 Commerce Way, Building C',
		country: 'USA',
		contactPerson: 'Michael Roberts',
		phone: '+1 310 555 0200',
		email: 'imports@globaltechdist.com',
	};

	const route: RouteInfoProps = {
		portOfLoading: 'Shanghai',
		countryOfOrigin: 'China',
		portOfDischarge: 'Long Beach',
		countryOfDestination: 'USA',
		finalDestination: 'Los Angeles Distribution Center',
		estimatedDeparture: 'Feb 20, 2024',
		estimatedArrival: 'Mar 15, 2024',
	};

	const containers: ContainerProps[] = [
		{
			containerNumber: 'MSCU1234567',
			sealNumber: 'SL789456',
			type: 'Dry',
			size: "40' HC",
			weight: 24500,
			volume: 76,
		},
		{
			containerNumber: 'MSCU7654321',
			sealNumber: 'SL789457',
			type: 'Dry',
			size: "40' HC",
			weight: 22800,
			volume: 76,
		},
	];

	const cargo: CargoItemProps[] = [
		{
			hsCode: '8471.30',
			description: 'Laptop Computers - Model XL500',
			quantity: 500,
			unit: 'Units',
			grossWeight: 3500,
			netWeight: 3250,
			value: 375000,
		},
		{
			hsCode: '8471.60',
			description: 'Computer Monitors - 27 inch LED',
			quantity: 1000,
			unit: 'Units',
			grossWeight: 12000,
			netWeight: 11500,
			value: 225000,
		},
		{
			hsCode: '8471.70',
			description: 'External Storage Devices - 2TB',
			quantity: 2500,
			unit: 'Units',
			grossWeight: 875,
			netWeight: 750,
			value: 125000,
		},
	];

	const charges: ChargesBreakdownProps = {
		oceanFreight: 4850,
		documentationFee: 150,
		terminalHandling: 650,
		customsClearance: 450,
		insurance: 1825,
		totalCharges: 7925,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<ShipmentHeader {...header} />
					<div className="grid @md:grid-cols-2 gap-4">
						<PartyInfo {...shipper} />
						<PartyInfo {...consignee} />
					</div>
					<RouteInfo {...route} />
					<ContainersTable containers={containers} />
					<CargoTable items={cargo} currency="$" />
					<div className="grid @md:grid-cols-2 gap-4">
						<ChargesBreakdown {...charges} />
						<Card>
							<CardContent className="pt-6 space-y-4">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<p className="text-xs text-muted-foreground">
											Total Packages
										</p>
										<p className="text-2xl font-bold">4,000</p>
									</div>
									<div>
										<p className="text-xs text-muted-foreground">
											Total Weight
										</p>
										<p className="text-2xl font-bold flex items-center gap-1">
											47,300{' '}
											<span className="text-sm font-normal text-muted-foreground">
												kg
											</span>
										</p>
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Total Value</p>
										<p className="text-2xl font-bold text-primary">$725,000</p>
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Incoterms</p>
										<Badge variant="secondary" className="text-lg">
											CIF
										</Badge>
									</div>
								</div>
								<Button className="w-full">Download B/L Document</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
