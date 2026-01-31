import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Globe, Package, Truck, Clock, DollarSign, AlertTriangle, ChevronDown, Printer } from 'lucide-react';

interface InternationalOrder {
	id: string;
	country: { name: string; code: string; flag: string };
	customer: string;
	items: number;
	value: string;
	currency: string;
	shippingMethod: string;
	customsStatus: 'pending' | 'cleared' | 'held' | 'processing';
	estimatedDelivery: string;
	duties: string;
}

interface InternationalOrderRowProps {
	order: InternationalOrder;
	labels: {
		items: string;
		duties: string;
		delivery: string;
		shipping: string;
		printLabel: string;
	};
}

const CustomsStatusBadge = ({ status }: { status: InternationalOrder['customsStatus'] }) => {
	const config: Record<InternationalOrder['customsStatus'], { className: string; label: string }> = {
		pending: { className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Customs Pending' },
		cleared: { className: 'bg-accent/10 text-accent border-accent/30', label: 'Cleared' },
		held: { className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Held' },
		processing: { className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'In Customs' },
	};
	const { className, label } = config[status];
	return <Badge variant="outline" className={className}>{label}</Badge>;
};

const CountryFlag = ({ flag, name }: { flag: string; name: string }) => (
	<div className="size-8 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-lg" title={name}>
		{flag}
	</div>
);

const InternationalOrderRow = ({ order, labels }: InternationalOrderRowProps) => (
	<div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0">
		<Checkbox id={order.id} />

		<CountryFlag flag={order.country.flag} name={order.country.name} />

		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-0.5">
				<span className="font-semibold">{order.customer}</span>
				<span className="text-xs text-muted-foreground font-mono">{order.id}</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Globe className="size-3" />
				<span>{order.country.name}</span>
				<span>•</span>
				<Package className="size-3" />
				<span>{order.items} {labels.items}</span>
			</div>
		</div>

		<div className="text-center min-w-[80px]">
			<p className="font-semibold">{order.value}</p>
			<p className="text-xs text-muted-foreground">{order.currency}</p>
		</div>

		<Separator orientation="vertical" className="h-10" />

		<div className="text-center min-w-[80px]">
			<p className="text-sm font-medium">{order.duties}</p>
			<p className="text-xs text-muted-foreground">{labels.duties}</p>
		</div>

		<div className="text-center min-w-[100px]">
			<p className="text-sm font-medium">{order.shippingMethod}</p>
			<p className="text-xs text-muted-foreground">{labels.shipping}</p>
		</div>

		<div className="text-center min-w-[80px]">
			<p className="text-sm font-medium">{order.estimatedDelivery}</p>
			<p className="text-xs text-muted-foreground">{labels.delivery}</p>
		</div>

		<CustomsStatusBadge status={order.customsStatus} />

		<Button variant="outline" size="sm" className="gap-1.5">
			<Printer className="size-4" />
			{labels.printLabel}
		</Button>
	</div>
);

export default function Main() {
	const labels = {
		items: 'items',
		duties: 'Duties',
		delivery: 'ETA',
		shipping: 'Method',
		printLabel: 'Label',
	};

	const orders: InternationalOrder[] = [
		{ id: 'INT-001', country: { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' }, customer: 'James Wilson', items: 3, value: '€245.00', currency: 'EUR', shippingMethod: 'DHL Express', customsStatus: 'cleared', estimatedDelivery: 'Feb 2', duties: '€24.50' },
		{ id: 'INT-002', country: { name: 'Germany', code: 'DE', flag: '🇩🇪' }, customer: 'Anna Schmidt', items: 1, value: '€89.00', currency: 'EUR', shippingMethod: 'FedEx', customsStatus: 'processing', estimatedDelivery: 'Feb 4', duties: '€8.90' },
		{ id: 'INT-003', country: { name: 'Japan', code: 'JP', flag: '🇯🇵' }, customer: 'Yuki Tanaka', items: 5, value: '¥45,000', currency: 'JPY', shippingMethod: 'UPS', customsStatus: 'held', estimatedDelivery: 'TBD', duties: '¥4,500' },
		{ id: 'INT-004', country: { name: 'Australia', code: 'AU', flag: '🇦🇺' }, customer: 'Sarah Mitchell', items: 2, value: 'A$189.00', currency: 'AUD', shippingMethod: 'DHL Express', customsStatus: 'pending', estimatedDelivery: 'Feb 6', duties: 'A$18.90' },
		{ id: 'INT-005', country: { name: 'Canada', code: 'CA', flag: '🇨🇦' }, customer: 'Michael Brown', items: 4, value: 'C$320.00', currency: 'CAD', shippingMethod: 'USPS', customsStatus: 'cleared', estimatedDelivery: 'Feb 1', duties: 'C$32.00' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					{orders.map((order) => (
						<InternationalOrderRow key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
