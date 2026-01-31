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
	Building2,
	Calendar,
	CheckCircle,
	Clock,
	FileText,
	HardHat,
	Layers,
	MapPin,
	Users,
	Wrench,
} from 'lucide-react';

interface ContractHeaderProps {
	contractNumber: string;
	projectName: string;
	projectAddress: string;
	contractType: string;
	startDate: string;
	estimatedCompletion: string;
	status: string;
}

interface PartyInfoProps {
	role: string;
	companyName: string;
	contactName: string;
	licenseNumber: string;
	phone: string;
	email: string;
	address: string;
}

interface PhaseProps {
	number: number;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	status: string;
	percentComplete: number;
	amount: number;
}

interface LaborBreakdownProps {
	trade: string;
	hours: number;
	rate: number;
	workers: number;
	total: number;
}

interface MaterialItemProps {
	category: string;
	description: string;
	quantity: number;
	unit: string;
	unitCost: number;
	markup: number;
	total: number;
}

interface ChangeOrderProps {
	number: string;
	date: string;
	description: string;
	laborCost: number;
	materialCost: number;
	total: number;
	status: string;
}

interface ContractSummaryProps {
	originalContract: number;
	approvedChanges: number;
	revisedContract: number;
	completedWork: number;
	previousBillings: number;
	currentBilling: number;
	retainage: number;
	totalDue: number;
	currency: string;
}

const ContractHeader = ({
	contractNumber,
	projectName,
	projectAddress,
	contractType,
	startDate,
	estimatedCompletion,
	status,
}: ContractHeaderProps) => (
	<Card className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-amber-500/20">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="size-16 rounded-lg bg-amber-500/10 flex items-center justify-center">
						<HardHat className="size-8 text-amber-500" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Progress Invoice</h1>
						<p className="text-muted-foreground">{projectName}</p>
					</div>
				</div>
				<Badge variant="default">{status}</Badge>
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Contract Number</p>
					<p className="font-mono font-semibold">{contractNumber}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Contract Type</p>
					<p className="font-medium">{contractType}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Start Date</p>
					<p>{startDate}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Est. Completion</p>
					<p>{estimatedCompletion}</p>
				</div>
			</div>
			<div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span className="text-sm">{projectAddress}</span>
			</div>
		</CardContent>
	</Card>
);

const PartyInfo = ({
	role,
	companyName,
	contactName,
	licenseNumber,
	phone,
	email,
	address,
}: PartyInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{role}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex items-center gap-2">
				<Building2 className="size-4 text-primary" />
				<span className="font-semibold">{companyName}</span>
			</div>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div>
					<p className="text-muted-foreground">Contact</p>
					<p>{contactName}</p>
				</div>
				<div>
					<p className="text-muted-foreground">License</p>
					<p className="font-mono">{licenseNumber}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Phone</p>
					<p>{phone}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Email</p>
					<p className="truncate">{email}</p>
				</div>
			</div>
			<p className="text-xs text-muted-foreground">{address}</p>
		</CardContent>
	</Card>
);

const PhasesTable = ({
	phases,
	currency,
}: {
	phases: PhaseProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Layers className="size-4" />
				Project Phases & Schedule of Values
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-12">#</TableHead>
						<TableHead>Phase</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Duration</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead className="text-center">Complete</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{phases.map((phase) => (
						<TableRow key={phase.number}>
							<TableCell className="font-bold">{phase.number}</TableCell>
							<TableCell className="font-medium">{phase.name}</TableCell>
							<TableCell className="text-muted-foreground">
								{phase.description}
							</TableCell>
							<TableCell className="text-xs">
								<div className="flex items-center gap-1">
									<Calendar className="size-3" />
									{phase.startDate} - {phase.endDate}
								</div>
							</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										phase.status === 'Complete'
											? 'default'
											: phase.status === 'In Progress'
												? 'secondary'
												: 'outline'
									}
									className="gap-1"
								>
									{phase.status === 'Complete' && (
										<CheckCircle className="size-3" />
									)}
									{phase.status === 'In Progress' && (
										<Clock className="size-3" />
									)}
									{phase.status}
								</Badge>
							</TableCell>
							<TableCell className="text-center">
								{phase.percentComplete}%
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{phase.amount.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const LaborTable = ({
	items,
	currency,
}: {
	items: LaborBreakdownProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Users className="size-4" />
				Labor Breakdown (Current Period)
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Trade</TableHead>
						<TableHead className="text-center">Workers</TableHead>
						<TableHead className="text-center">Hours</TableHead>
						<TableHead className="text-right">Hourly Rate</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<Badge variant="outline">{item.trade}</Badge>
							</TableCell>
							<TableCell className="text-center">{item.workers}</TableCell>
							<TableCell className="text-center">{item.hours}</TableCell>
							<TableCell className="text-right">
								{currency}
								{item.rate}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{item.total.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const MaterialsTable = ({
	items,
	currency,
}: {
	items: MaterialItemProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Wrench className="size-4" />
				Materials & Equipment
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Category</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center">Qty</TableHead>
						<TableHead>Unit</TableHead>
						<TableHead className="text-right">Unit Cost</TableHead>
						<TableHead className="text-right">Markup</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<Badge variant="secondary">{item.category}</Badge>
							</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell className="text-center">{item.quantity}</TableCell>
							<TableCell>{item.unit}</TableCell>
							<TableCell className="text-right">
								{currency}
								{item.unitCost.toFixed(2)}
							</TableCell>
							<TableCell className="text-right">{item.markup}%</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{item.total.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const ChangeOrdersTable = ({
	orders,
	currency,
}: {
	orders: ChangeOrderProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<FileText className="size-4" />
				Change Orders
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>CO #</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-right">Labor</TableHead>
						<TableHead className="text-right">Materials</TableHead>
						<TableHead className="text-right">Total</TableHead>
						<TableHead className="text-center">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.number}>
							<TableCell className="font-mono font-medium">
								{order.number}
							</TableCell>
							<TableCell>{order.date}</TableCell>
							<TableCell>{order.description}</TableCell>
							<TableCell className="text-right">
								{currency}
								{order.laborCost.toLocaleString()}
							</TableCell>
							<TableCell className="text-right">
								{currency}
								{order.materialCost.toLocaleString()}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{order.total.toLocaleString()}
							</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										order.status === 'Approved' ? 'default' : 'secondary'
									}
								>
									{order.status}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const ContractSummary = ({
	originalContract,
	approvedChanges,
	revisedContract,
	completedWork,
	previousBillings,
	currentBilling,
	retainage,
	totalDue,
	currency,
}: ContractSummaryProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-3">
			<CardTitle className="text-base text-primary-foreground">
				Application for Payment
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Original Contract Sum</span>
					<span>
						{currency}
						{originalContract.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Approved Change Orders</span>
					<span>
						{currency}
						{approvedChanges.toLocaleString()}
					</span>
				</div>
				<Separator className="bg-primary-foreground/20" />
				<div className="flex justify-between font-medium">
					<span>Revised Contract Sum</span>
					<span>
						{currency}
						{revisedContract.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Total Completed Work</span>
					<span>
						{currency}
						{completedWork.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Less: Previous Billings</span>
					<span>
						-{currency}
						{previousBillings.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between font-medium">
					<span>Current Billing</span>
					<span>
						{currency}
						{currentBilling.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between text-amber-200">
					<span>Less: Retainage (10%)</span>
					<span>
						-{currency}
						{retainage.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-2xl">
				<span>Amount Due</span>
				<span>
					{currency}
					{totalDue.toLocaleString()}
				</span>
			</div>
			<Button variant="secondary" className="w-full">
				Submit Payment Request
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const header: ContractHeaderProps = {
		contractNumber: 'CNST-2024-00789',
		projectName: 'Oakwood Corporate Center',
		projectAddress: '1500 Innovation Boulevard, Austin, TX 78701',
		contractType: 'Fixed Price with Allowances',
		startDate: 'Nov 1, 2023',
		estimatedCompletion: 'Aug 15, 2024',
		status: 'In Progress',
	};

	const contractor: PartyInfoProps = {
		role: 'General Contractor',
		companyName: 'Summit Construction Group',
		contactName: 'Richard Anderson',
		licenseNumber: 'CGC-123456',
		phone: '(512) 555-0100',
		email: 'projects@summitconstruction.com',
		address: "800 Builder's Way, Austin, TX 78702",
	};

	const owner: PartyInfoProps = {
		role: 'Property Owner',
		companyName: 'Oakwood Development LLC',
		contactName: 'Patricia Chen',
		licenseNumber: 'DEV-789012',
		phone: '(512) 555-0200',
		email: 'pchen@oakwooddev.com',
		address: '2000 Capital of Texas Hwy, Austin, TX 78746',
	};

	const phases: PhaseProps[] = [
		{
			number: 1,
			name: 'Site Work',
			description: 'Excavation, grading, utilities',
			startDate: 'Nov 1',
			endDate: 'Dec 15',
			status: 'Complete',
			percentComplete: 100,
			amount: 285000,
		},
		{
			number: 2,
			name: 'Foundation',
			description: 'Footings, slab, waterproofing',
			startDate: 'Dec 16',
			endDate: 'Jan 31',
			status: 'Complete',
			percentComplete: 100,
			amount: 425000,
		},
		{
			number: 3,
			name: 'Structure',
			description: 'Steel frame, concrete decks',
			startDate: 'Feb 1',
			endDate: 'Apr 15',
			status: 'In Progress',
			percentComplete: 65,
			amount: 890000,
		},
		{
			number: 4,
			name: 'Exterior',
			description: 'Curtain wall, roofing, facades',
			startDate: 'Apr 16',
			endDate: 'Jun 15',
			status: 'Pending',
			percentComplete: 0,
			amount: 650000,
		},
		{
			number: 5,
			name: 'Interior',
			description: 'MEP, finishes, fit-out',
			startDate: 'May 1',
			endDate: 'Aug 1',
			status: 'Pending',
			percentComplete: 0,
			amount: 780000,
		},
	];

	const labor: LaborBreakdownProps[] = [
		{ trade: 'Ironworkers', hours: 480, rate: 85, workers: 6, total: 40800 },
		{ trade: 'Concrete', hours: 320, rate: 72, workers: 4, total: 23040 },
		{ trade: 'Carpentry', hours: 240, rate: 68, workers: 3, total: 16320 },
		{
			trade: 'Equipment Operators',
			hours: 160,
			rate: 78,
			workers: 2,
			total: 12480,
		},
	];

	const materials: MaterialItemProps[] = [
		{
			category: 'Steel',
			description: 'Structural Steel W-Shapes',
			quantity: 45,
			unit: 'Tons',
			unitCost: 2850,
			markup: 15,
			total: 147488,
		},
		{
			category: 'Concrete',
			description: 'Ready-Mix 4000 PSI',
			quantity: 280,
			unit: 'CY',
			unitCost: 185,
			markup: 10,
			total: 56980,
		},
		{
			category: 'Rebar',
			description: '#4 - #8 Reinforcing Bar',
			quantity: 22,
			unit: 'Tons',
			unitCost: 1450,
			markup: 12,
			total: 35728,
		},
		{
			category: 'Rental',
			description: 'Tower Crane (monthly)',
			quantity: 1,
			unit: 'Month',
			unitCost: 28000,
			markup: 5,
			total: 29400,
		},
	];

	const changeOrders: ChangeOrderProps[] = [
		{
			number: 'CO-001',
			date: 'Jan 15',
			description: 'Additional foundation piers per soil report',
			laborCost: 8500,
			materialCost: 12800,
			total: 21300,
			status: 'Approved',
		},
		{
			number: 'CO-002',
			date: 'Feb 8',
			description: 'Upgraded steel connections per structural review',
			laborCost: 5200,
			materialCost: 18500,
			total: 23700,
			status: 'Approved',
		},
		{
			number: 'CO-003',
			date: 'Feb 20',
			description: 'Owner requested elevator upgrade',
			laborCost: 0,
			materialCost: 35000,
			total: 35000,
			status: 'Pending',
		},
	];

	const summary: ContractSummaryProps = {
		originalContract: 3030000,
		approvedChanges: 45000,
		revisedContract: 3075000,
		completedWork: 1288500,
		previousBillings: 950000,
		currentBilling: 338500,
		retainage: 33850,
		totalDue: 304650,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<ContractHeader {...header} />
					<div className="grid @md:grid-cols-2 gap-4">
						<PartyInfo {...contractor} />
						<PartyInfo {...owner} />
					</div>
					<PhasesTable phases={phases} currency="$" />
					<div className="grid @md:grid-cols-2 gap-4">
						<LaborTable items={labor} currency="$" />
						<MaterialsTable items={materials} currency="$" />
					</div>
					<ChangeOrdersTable orders={changeOrders} currency="$" />
					<div className="grid @md:grid-cols-3 gap-4">
						<div className="@md:col-span-2 space-y-4">
							<Card>
								<CardContent className="pt-6 text-sm">
									<p className="font-medium mb-2">Certification:</p>
									<p className="text-muted-foreground">
										The undersigned certifies that all work described herein has
										been completed in accordance with the contract documents,
										that all amounts shown are correct, and that all previous
										progress payments have been applied to reduce the contract
										balance.
									</p>
									<div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
										<div>
											<p className="text-xs text-muted-foreground">
												Contractor Signature
											</p>
											<div className="h-12 border-b border-dashed mt-2" />
											<p className="text-xs text-muted-foreground mt-1">
												Date: _______________
											</p>
										</div>
										<div>
											<p className="text-xs text-muted-foreground">
												Owner Approval
											</p>
											<div className="h-12 border-b border-dashed mt-2" />
											<p className="text-xs text-muted-foreground mt-1">
												Date: _______________
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<ContractSummary {...summary} />
					</div>
				</div>
			</div>
		</section>
	);
}
