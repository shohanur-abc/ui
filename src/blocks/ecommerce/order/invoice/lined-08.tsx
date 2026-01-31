import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Camera,
	Clock,
	FileImage,
	Image,
	Palette,
	Star,
	User,
	Video,
	Wand2,
} from 'lucide-react';

interface ClientProps {
	name: string;
	email: string;
	company?: string;
}

interface ProjectProps {
	name: string;
	projectNumber: string;
	type: string;
	deadline: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	name: string;
	description: string;
	quantity: number;
	rate: number;
}

interface RevisionProps {
	round: number;
	date: string;
	status: string;
}

interface TotalsProps {
	services: number;
	revisions: number;
	rush: number;
	total: number;
	deposit: number;
	balance: number;
	currency: string;
}

const ProjectHeader = ({ project }: { project: ProjectProps }) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Palette className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">{project.name}</h1>
					<p className="text-sm text-muted-foreground">
						Creative Services Invoice
					</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default">{project.type}</Badge>
				<p className="font-mono text-sm font-bold mt-1">
					{project.projectNumber}
				</p>
				<p className="text-xs text-muted-foreground mt-1">
					Deadline: {project.deadline}
				</p>
			</div>
		</div>
	</div>
);

const ClientSection = ({ client }: { client: ClientProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Client
		</p>
		<div className="flex items-center gap-3">
			<User className="size-5 text-primary" />
			<div>
				<p className="font-medium">{client.name}</p>
				<p className="text-sm text-muted-foreground">
					{client.company && `${client.company} • `}
					{client.email}
				</p>
			</div>
		</div>
	</div>
);

const ServiceRow = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-start justify-between">
				<div className="flex gap-3">
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						{service.icon}
					</div>
					<div>
						<p className="font-medium">{service.name}</p>
						<p className="text-sm text-muted-foreground">
							{service.description}
						</p>
					</div>
				</div>
				<div className="text-right">
					<p className="font-bold">
						{currency}
						{(service.quantity * service.rate).toFixed(2)}
					</p>
					<p className="text-xs text-muted-foreground">
						{service.quantity} × {currency}
						{service.rate}
					</p>
				</div>
			</div>
		</div>
		<Separator />
	</>
);

const RevisionRow = ({ revision }: { revision: RevisionProps }) => (
	<>
		<div className="flex items-center justify-between py-3 text-sm">
			<div className="flex items-center gap-2">
				<Badge variant="outline">Round {revision.round}</Badge>
				<span className="text-muted-foreground">{revision.date}</span>
			</div>
			<Badge variant={revision.status === 'Approved' ? 'default' : 'secondary'}>
				{revision.status}
			</Badge>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	services,
	revisions,
	rush,
	total,
	deposit,
	balance,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Services</span>
			<span>
				{currency}
				{services.toFixed(2)}
			</span>
		</div>
		<Separator />
		{revisions > 0 && (
			<>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Additional Revisions</span>
					<span>
						{currency}
						{revisions.toFixed(2)}
					</span>
				</div>
				<Separator />
			</>
		)}
		{rush > 0 && (
			<>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Rush Fee (25%)</span>
					<span>
						{currency}
						{rush.toFixed(2)}
					</span>
				</div>
				<Separator />
			</>
		)}
		<div className="flex justify-between font-bold">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm text-green-600">
			<span>Deposit Paid</span>
			<span>
				-{currency}
				{deposit.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Balance Due</span>
			<span className="text-primary">
				{currency}
				{balance.toFixed(2)}
			</span>
		</div>
	</div>
);

const DeliverablesSection = ({ deliverables }: { deliverables: string[] }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Deliverables
		</p>
		<div className="space-y-2">
			{deliverables.map((item, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<FileImage className="size-4 text-muted-foreground" />
					<span>{item}</span>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const client: ClientProps = {
		name: 'Sarah Mitchell',
		email: 'sarah@brandco.com',
		company: 'BrandCo Marketing',
	};

	const project: ProjectProps = {
		name: 'Brand Identity Redesign',
		projectNumber: 'PRJ-2024-089',
		type: 'Branding',
		deadline: 'March 15, 2024',
	};

	const services: ServiceProps[] = [
		{
			icon: <Star className="size-5 text-primary" />,
			name: 'Logo Design',
			description: 'Primary logo with variations',
			quantity: 1,
			rate: 2500,
		},
		{
			icon: <Palette className="size-5 text-purple-500" />,
			name: 'Brand Guidelines',
			description: '40-page brand book',
			quantity: 1,
			rate: 1500,
		},
		{
			icon: <Image className="size-5 text-blue-500" />,
			name: 'Social Media Kit',
			description: 'Templates for all platforms',
			quantity: 1,
			rate: 800,
		},
		{
			icon: <FileImage className="size-5 text-green-500" />,
			name: 'Business Collateral',
			description: 'Cards, letterhead, envelopes',
			quantity: 1,
			rate: 600,
		},
	];

	const revisions: RevisionProps[] = [
		{ round: 1, date: 'Feb 20, 2024', status: 'Approved' },
		{ round: 2, date: 'Feb 28, 2024', status: 'Approved' },
		{ round: 3, date: 'Mar 5, 2024', status: 'In Review' },
	];

	const deliverables = [
		'Primary logo (AI, EPS, PNG, SVG)',
		'Logo variations (horizontal, stacked, icon)',
		'Brand guidelines PDF',
		'Social media templates (Canva, Figma)',
		'Print-ready business collateral',
		'Source files and fonts',
	];

	const totals: TotalsProps = {
		services: 5400,
		revisions: 0,
		rush: 0,
		total: 5400,
		deposit: 2700,
		balance: 2700,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<ProjectHeader project={project} />
				<Separator />
				<ClientSection client={client} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Services
					</p>
				</div>
				{services.map((service, index) => (
					<ServiceRow key={index} service={service} currency="$" />
				))}
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Revision History
					</p>
				</div>
				{revisions.map((revision, index) => (
					<RevisionRow key={index} revision={revision} />
				))}
				<div className="grid @md:grid-cols-2 gap-8">
					<DeliverablesSection deliverables={deliverables} />
					<TotalsSection {...totals} />
				</div>
				<Separator className="my-4" />
				<div className="flex justify-end gap-4">
					<Button variant="outline">Download Invoice</Button>
					<Button>Pay Balance</Button>
				</div>
			</div>
		</section>
	);
}
