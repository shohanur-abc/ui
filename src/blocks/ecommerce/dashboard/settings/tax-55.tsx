import {
	AlertCircle,
	Check,
	DollarSign,
	ExternalLink,
	Globe,
	MapPin,
	Percent,
	Plus,
	Settings2,
	Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type TaxRate = {
	id: string;
	region: string;
	country: string;
	rate: string;
	type: 'VAT' | 'GST' | 'Sales Tax';
	enabled: boolean;
};

type TaxExemption = {
	id: string;
	name: string;
	reason: string;
	validUntil: string;
};

const TaxRateRow = ({
	region,
	country,
	rate,
	type,
	enabled,
}: TaxRate) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				{region}
			</div>
		</TableCell>
		<TableCell className="text-muted-foreground">{country}</TableCell>
		<TableCell>
			<Badge variant="outline">{type}</Badge>
		</TableCell>
		<TableCell className="font-medium">{rate}</TableCell>
		<TableCell>
			<Switch defaultChecked={enabled} />
		</TableCell>
		<TableCell>
			<Button variant="ghost" size="icon-sm">
				<Settings2 className="size-4" />
			</Button>
		</TableCell>
	</TableRow>
);

const ExemptionCard = ({
	name,
	reason,
	validUntil,
}: TaxExemption) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div>
			<h4 className="font-medium">{name}</h4>
			<p className="text-sm text-muted-foreground">{reason}</p>
			<p className="mt-1 text-xs text-muted-foreground">
				Valid until: {validUntil}
			</p>
		</div>
		<Button variant="ghost" size="icon-sm" className="text-destructive">
			<Trash2 className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const taxRates: TaxRate[] = [
		{ id: '1', region: 'California', country: 'United States', rate: '7.25%', type: 'Sales Tax', enabled: true },
		{ id: '2', region: 'New York', country: 'United States', rate: '8.875%', type: 'Sales Tax', enabled: true },
		{ id: '3', region: 'European Union', country: 'EU', rate: '20%', type: 'VAT', enabled: true },
		{ id: '4', region: 'United Kingdom', country: 'UK', rate: '20%', type: 'VAT', enabled: false },
		{ id: '5', region: 'Australia', country: 'Australia', rate: '10%', type: 'GST', enabled: true },
	];

	const exemptions: TaxExemption[] = [
		{ id: '1', name: 'Non-Profit Organization', reason: 'Tax-exempt status 501(c)(3)', validUntil: 'Dec 31, 2026' },
		{ id: '2', name: 'Reseller Certificate', reason: 'Wholesale purchases exempt', validUntil: 'Jun 30, 2026' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Percent className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Tax Settings</CardTitle>
										<CardDescription>
											Configure tax rates for different regions
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Add Tax Rate
								</Button>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Region</TableHead>
										<TableHead>Country</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Rate</TableHead>
										<TableHead>Enabled</TableHead>
										<TableHead className="w-10" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{taxRates.map((rate) => (
										<TaxRateRow key={rate.id} {...rate} />
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Tax Calculation</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Automatic Tax Calculation</Label>
										<p className="text-sm text-muted-foreground">
											Calculate taxes automatically based on location
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Include Tax in Price</Label>
										<p className="text-sm text-muted-foreground">
											Display prices with tax included
										</p>
									</div>
									<Switch defaultChecked={false} />
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>Default Tax Rate</Label>
									<Select defaultValue="auto">
										<SelectTrigger>
											<SelectValue placeholder="Select default" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="auto">Auto-detect by location</SelectItem>
											<SelectItem value="us">US Sales Tax</SelectItem>
											<SelectItem value="eu">EU VAT</SelectItem>
											<SelectItem value="none">No Tax</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Tax Exemptions</CardTitle>
									<Button variant="outline" size="sm" className="gap-2">
										<Plus className="size-4" />
										Add
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{exemptions.map((exemption) => (
									<ExemptionCard key={exemption.id} {...exemption} />
								))}
							</CardContent>
						</Card>
					</div>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertCircle className="size-6 shrink-0 text-amber-500" />
							<div>
								<h4 className="font-semibold">Tax Compliance</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Tax laws vary by region. Consult with a tax professional to ensure
									compliance with local tax regulations.
								</p>
								<Button variant="link" size="sm" className="mt-2 h-auto p-0 gap-2">
									Learn more about tax compliance
									<ExternalLink className="size-3" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
