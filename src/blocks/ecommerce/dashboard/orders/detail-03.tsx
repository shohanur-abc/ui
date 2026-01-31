import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Truck, MapPin, Package, Clock, Calendar, ExternalLink, Copy, Phone, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ShipmentDetailProps {
	shipment: {
		trackingNumber: string;
		carrier: string;
		service: string;
		status: 'in-transit' | 'out-for-delivery' | 'delivered' | 'exception';
		progress: number;
		origin: { city: string; state: string; country: string };
		destination: { name: string; address: string; city: string; state: string; zip: string; phone: string };
		weight: string;
		dimensions: string;
		dates: { shipped: string; estimated: string; delivered?: string };
		packages: number;
	};
	labels: {
		origin: string;
		destination: string;
		details: string;
		contact: string;
		trackOnCarrier: string;
		copyTracking: string;
	};
}

const StatusConfig = {
	'in-transit': { label: 'In Transit', className: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
	'out-for-delivery': { label: 'Out for Delivery', className: 'bg-primary/10 text-primary border-primary/30' },
	'delivered': { label: 'Delivered', className: 'bg-accent/10 text-accent border-accent/30' },
	'exception': { label: 'Exception', className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

const InfoBlock = ({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) => (
	<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
		<div className="flex items-center gap-2 text-muted-foreground mb-3">
			<Icon className="size-4" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		{children}
	</div>
);

const ShipmentDetail = ({ shipment, labels }: ShipmentDetailProps) => {
	const { label, className } = StatusConfig[shipment.status];
	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<Truck className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg">{shipment.carrier}</CardTitle>
								<p className="text-sm text-muted-foreground">{shipment.service}</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<code className="text-sm font-mono bg-muted px-2 py-1 rounded">{shipment.trackingNumber}</code>
							<Button variant="ghost" size="icon-sm">
								<Copy className="size-3" />
							</Button>
						</div>
					</div>
					<Badge variant="outline" className={className}>{label}</Badge>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Delivery Progress</span>
						<span className="font-medium">{shipment.progress}%</span>
					</div>
					<Progress value={shipment.progress} className="h-2" />
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
					<InfoBlock icon={MapPin} label={labels.origin}>
						<p className="font-medium">{shipment.origin.city}, {shipment.origin.state}</p>
						<p className="text-sm text-muted-foreground">{shipment.origin.country}</p>
					</InfoBlock>

					<InfoBlock icon={MapPin} label={labels.destination}>
						<p className="font-medium">{shipment.destination.name}</p>
						<p className="text-sm text-muted-foreground">{shipment.destination.address}</p>
						<p className="text-sm text-muted-foreground">{shipment.destination.city}, {shipment.destination.state} {shipment.destination.zip}</p>
					</InfoBlock>
				</div>

				<InfoBlock icon={Package} label={labels.details}>
					<div className="grid grid-cols-4 gap-4">
						<div>
							<p className="text-xs text-muted-foreground">Packages</p>
							<p className="font-medium">{shipment.packages}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Weight</p>
							<p className="font-medium">{shipment.weight}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Dimensions</p>
							<p className="font-medium">{shipment.dimensions}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Phone</p>
							<p className="font-medium">{shipment.destination.phone}</p>
						</div>
					</div>
				</InfoBlock>

				<div className="grid grid-cols-3 gap-4">
					<div className="p-3 rounded-lg bg-muted/30 text-center">
						<Calendar className="size-4 text-muted-foreground mx-auto mb-1" />
						<p className="text-xs text-muted-foreground">Shipped</p>
						<p className="font-medium">{shipment.dates.shipped}</p>
					</div>
					<div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
						<Clock className="size-4 text-primary mx-auto mb-1" />
						<p className="text-xs text-muted-foreground">Est. Delivery</p>
						<p className="font-medium text-primary">{shipment.dates.estimated}</p>
					</div>
					{shipment.dates.delivered && (
						<div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
							<CheckCircle2 className="size-4 text-accent mx-auto mb-1" />
							<p className="text-xs text-muted-foreground">Delivered</p>
							<p className="font-medium text-accent">{shipment.dates.delivered}</p>
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="gap-3 border-t border-border/50">
				<Button variant="outline" className="flex-1 gap-1.5">
					<Phone className="size-4" />
					{labels.contact}
				</Button>
				<Button className="flex-1 gap-1.5">
					<ExternalLink className="size-4" />
					{labels.trackOnCarrier}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const labels = {
		origin: 'Origin',
		destination: 'Destination',
		details: 'Package Details',
		contact: 'Contact Carrier',
		trackOnCarrier: 'Track on UPS',
		copyTracking: 'Copy',
	};

	const shipment = {
		trackingNumber: '1Z999AA10123456784',
		carrier: 'UPS',
		service: 'Express Saver',
		status: 'in-transit' as const,
		progress: 65,
		origin: { city: 'Los Angeles', state: 'CA', country: 'United States' },
		destination: { name: 'John Smith', address: '123 Main Street, Apt 4B', city: 'New York', state: 'NY', zip: '10001', phone: '+1 (555) 123-4567' },
		weight: '2.4 lbs',
		dimensions: '12 × 8 × 6 in',
		dates: { shipped: 'Jan 27, 2024', estimated: 'Jan 31, 2024' },
		packages: 1,
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<ShipmentDetail shipment={shipment} labels={labels} />
			</div>
		</section>
	);
}
