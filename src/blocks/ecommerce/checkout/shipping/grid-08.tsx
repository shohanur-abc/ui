import { Home, Building2, MapPin, Plus, Check, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const AddressCard = ({
	value,
	icon: Icon,
	type,
	name,
	line1,
	line2,
	city,
	state,
	zip,
	isDefault,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	type: string;
	name: string;
	line1: string;
	line2?: string;
	city: string;
	state: string;
	zip: string;
	isDefault?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				h-full transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${isDefault ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			<CardContent className="p-4 relative">
				<div className="absolute top-3 right-3 flex items-center gap-1">
					<Button variant="ghost" size="icon" className="size-8">
						<Edit className="size-4" />
					</Button>
					<Button variant="ghost" size="icon" className="size-8 text-destructive">
						<Trash2 className="size-4" />
					</Button>
				</div>

				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
						<Icon className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0 pr-16">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-semibold">{type}</span>
							{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
						</div>
						<p className="text-sm font-medium">{name}</p>
						<div className="text-sm text-muted-foreground mt-1">
							<p>{line1}</p>
							{line2 && <p>{line2}</p>}
							<p>{city}, {state} {zip}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const NewAddressCard = () => (
	<Card className="h-full border-dashed hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer">
		<CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[180px]">
			<div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
				<Plus className="size-6" />
			</div>
			<span className="font-medium">Add New Address</span>
			<span className="text-sm text-muted-foreground">Ship to a different location</span>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			value: 'home',
			icon: Home,
			type: 'Home',
			name: 'John Doe',
			line1: '123 Main Street',
			line2: 'Apt 4B',
			city: 'New York',
			state: 'NY',
			zip: '10001',
			isDefault: true,
		},
		{
			value: 'work',
			icon: Building2,
			type: 'Work',
			name: 'John Doe',
			line1: '456 Business Avenue',
			line2: 'Floor 12, Suite 1201',
			city: 'New York',
			state: 'NY',
			zip: '10002',
		},
		{
			value: 'parents',
			icon: Home,
			type: 'Parents',
			name: "Jane Doe",
			line1: '789 Family Lane',
			city: 'Brooklyn',
			state: 'NY',
			zip: '11201',
		},
		{
			value: 'office2',
			icon: Building2,
			type: 'Office 2',
			name: 'John Doe',
			line1: '321 Corporate Drive',
			city: 'Jersey City',
			state: 'NJ',
			zip: '07302',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Shipping Address</h1>
					<p className="text-muted-foreground">Select or add a delivery address</p>
				</div>

				<RadioGroup defaultValue="home" className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mb-8">
					{addresses.map((addr) => (
						<AddressCard key={addr.value} {...addr} />
					))}
					<NewAddressCard />
				</RadioGroup>

				<div className="flex gap-3 justify-center">
					<Button variant="outline">Back to Cart</Button>
					<Button>Continue to Shipping</Button>
				</div>
			</div>
		</section>
	);
}
