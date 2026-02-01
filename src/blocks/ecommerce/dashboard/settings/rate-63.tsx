import {
	AlertCircle,
	Calculator,
	Check,
	DollarSign,
	Edit,
	Globe,
	MapPin,
	MoreVertical,
	Package,
	Percent,
	Plus,
	Scale,
	Trash2,
	Truck,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

type ShippingRate = {
	id: string;
	name: string;
	zone: string;
	weightRange: string;
	rate: string;
	estimatedDays: string;
};

const RateRow = ({
	name,
	zone,
	weightRange,
	rate,
	estimatedDays,
}: ShippingRate) => (
	<TableRow>
		<TableCell className="font-medium">{name}</TableCell>
		<TableCell>
			<Badge variant="outline">{zone}</Badge>
		</TableCell>
		<TableCell>{weightRange}</TableCell>
		<TableCell className="font-semibold">{rate}</TableCell>
		<TableCell className="text-muted-foreground">{estimatedDays}</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Edit className="mr-2 size-4" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const rates: ShippingRate[] = [
		{
			id: '1',
			name: 'Standard - Small',
			zone: 'Domestic',
			weightRange: '0-1 lb',
			rate: '$5.99',
			estimatedDays: '5-7 days',
		},
		{
			id: '2',
			name: 'Standard - Medium',
			zone: 'Domestic',
			weightRange: '1-5 lb',
			rate: '$8.99',
			estimatedDays: '5-7 days',
		},
		{
			id: '3',
			name: 'Standard - Large',
			zone: 'Domestic',
			weightRange: '5-20 lb',
			rate: '$15.99',
			estimatedDays: '5-7 days',
		},
		{
			id: '4',
			name: 'Express - Small',
			zone: 'Domestic',
			weightRange: '0-5 lb',
			rate: '$12.99',
			estimatedDays: '2-3 days',
		},
		{
			id: '5',
			name: 'International - Standard',
			zone: 'International',
			weightRange: '0-2 lb',
			rate: '$24.99',
			estimatedDays: '7-14 days',
		},
		{
			id: '6',
			name: 'International - Express',
			zone: 'International',
			weightRange: '0-2 lb',
			rate: '$49.99',
			estimatedDays: '3-5 days',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Calculator className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Shipping Rates</CardTitle>
										<CardDescription>
											Configure shipping rates by weight and zone
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Add Rate
								</Button>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Zone</TableHead>
										<TableHead>Weight</TableHead>
										<TableHead>Rate</TableHead>
										<TableHead>Delivery</TableHead>
										<TableHead className="w-10" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{rates.map((rate) => (
										<RateRow key={rate.id} {...rate} />
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Rate Calculation</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<RadioGroup defaultValue="weight" className="space-y-3">
									{[
										{
											value: 'weight',
											label: 'By Weight',
											desc: 'Calculate based on package weight',
										},
										{
											value: 'price',
											label: 'By Order Total',
											desc: 'Calculate based on cart value',
										},
										{
											value: 'item',
											label: 'Per Item',
											desc: 'Fixed rate per item',
										},
										{
											value: 'flat',
											label: 'Flat Rate',
											desc: 'Same rate for all orders',
										},
									].map((option) => (
										<Label
											key={option.value}
											htmlFor={`calc-${option.value}`}
											className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
										>
											<RadioGroupItem
												value={option.value}
												id={`calc-${option.value}`}
												className="mt-0.5"
											/>
											<div>
												<span className="font-medium">{option.label}</span>
												<p className="text-xs text-muted-foreground">
													{option.desc}
												</p>
											</div>
										</Label>
									))}
								</RadioGroup>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Free Shipping Rules</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Enable Free Shipping</Label>
										<p className="text-sm text-muted-foreground">
											Offer free shipping to customers
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>Minimum Order Amount</Label>
									<div className="relative">
										<DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input
											type="number"
											placeholder="50"
											defaultValue="50"
											className="pl-9"
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										Orders above this amount qualify for free shipping
									</p>
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>Eligible Zones</Label>
									<Select defaultValue="domestic">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Zones</SelectItem>
											<SelectItem value="domestic">Domestic Only</SelectItem>
											<SelectItem value="local">Local Only</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
