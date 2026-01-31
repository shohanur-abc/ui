import {
	Check,
	ChevronRight,
	Edit,
	Globe,
	MapPin,
	MoreVertical,
	Plus,
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
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

type ShippingZone = {
	id: string;
	name: string;
	countries: string[];
	methods: { name: string; rate: string }[];
	enabled: boolean;
};

const ZoneCard = ({
	name,
	countries,
	methods,
	enabled,
}: ShippingZone) => (
	<div
		className={`rounded-lg border transition-all ${
			enabled ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between p-4">
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-semibold">{name}</h4>
					{enabled ? (
						<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
							Active
						</Badge>
					) : (
						<Badge variant="outline" className="text-xs">
							Inactive
						</Badge>
					)}
				</div>
				<p className="mt-1 text-sm text-muted-foreground">
					{countries.length} {countries.length === 1 ? 'country' : 'countries'}
				</p>
				<div className="mt-2 flex flex-wrap gap-1">
					{countries.slice(0, 5).map((country) => (
						<Badge key={country} variant="outline" className="text-xs">
							{country}
						</Badge>
					))}
					{countries.length > 5 && (
						<Badge variant="outline" className="text-xs">
							+{countries.length - 5} more
						</Badge>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Switch defaultChecked={enabled} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Edit className="mr-2 size-4" />
							Edit Zone
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
		<div className="border-t p-4">
			<p className="text-xs font-medium text-muted-foreground mb-2">
				Shipping Methods
			</p>
			<div className="space-y-2">
				{methods.map((method) => (
					<div
						key={method.name}
						className="flex items-center justify-between text-sm"
					>
						<span>{method.name}</span>
						<span className="font-medium">{method.rate}</span>
					</div>
				))}
			</div>
		</div>
	</div>
);

export default function Main() {
	const zones: ShippingZone[] = [
		{
			id: '1',
			name: 'Domestic',
			countries: ['United States'],
			methods: [
				{ name: 'Standard', rate: '$5.99' },
				{ name: 'Express', rate: '$12.99' },
				{ name: 'Overnight', rate: '$24.99' },
			],
			enabled: true,
		},
		{
			id: '2',
			name: 'Canada',
			countries: ['Canada'],
			methods: [
				{ name: 'Standard', rate: '$9.99' },
				{ name: 'Express', rate: '$19.99' },
			],
			enabled: true,
		},
		{
			id: '3',
			name: 'Europe',
			countries: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Sweden'],
			methods: [
				{ name: 'Standard', rate: '$14.99' },
				{ name: 'Express', rate: '$29.99' },
			],
			enabled: true,
		},
		{
			id: '4',
			name: 'Asia Pacific',
			countries: ['Japan', 'Australia', 'South Korea', 'Singapore', 'Hong Kong', 'Taiwan'],
			methods: [
				{ name: 'Standard', rate: '$19.99' },
				{ name: 'Express', rate: '$39.99' },
			],
			enabled: false,
		},
		{
			id: '5',
			name: 'Rest of World',
			countries: ['All other countries'],
			methods: [{ name: 'International', rate: '$29.99' }],
			enabled: false,
		},
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
										<Globe className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Shipping Zones</CardTitle>
										<CardDescription>
											Define shipping zones and rates by region
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Add Zone
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								{zones.map((zone) => (
									<ZoneCard key={zone.id} {...zone} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="border-primary/20 bg-primary/5">
						<CardContent className="flex items-center justify-between pt-6">
							<div className="flex items-start gap-4">
								<MapPin className="size-6 text-primary shrink-0" />
								<div>
									<h4 className="font-semibold">Zone Coverage</h4>
									<p className="mt-1 text-sm text-muted-foreground">
										You're shipping to {zones.filter((z) => z.enabled).length} active
										zones covering{' '}
										{zones
											.filter((z) => z.enabled)
											.reduce((acc, z) => acc + z.countries.length, 0)}{' '}
										countries.
									</p>
								</div>
							</div>
							<Button variant="outline">
								View Map
								<ChevronRight className="ml-2 size-4" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
