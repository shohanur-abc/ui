'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	Home,
	Briefcase,
	MapPin,
	Users,
	ArrowRight,
	Clock,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface RecipientAddressProps {
	value: string;
	name: string;
	avatar: string;
	address: string;
	lastUsed?: string;
}

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const AddressCard = ({
	value,
	icon: Icon,
	label,
	address,
	isDefault,
}: {
	value: string;
	icon: React.ElementType;
	label: string;
	address: string;
	isDefault?: boolean;
}) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} className="mt-1" />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div>
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{label}</span>
				{isDefault && <Badge variant="secondary">Default</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
	</label>
);

const RecipientCard = ({
	value,
	name,
	avatar,
	address,
	lastUsed,
}: RecipientAddressProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} className="mt-1" />
		<Avatar className="size-10">
			<AvatarFallback className="bg-primary/10 text-primary">
				{avatar}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<p className="text-sm text-muted-foreground">{address}</p>
			{lastUsed && (
				<p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
					<Clock className="size-3" />
					Last shipped: {lastUsed}
				</p>
			)}
		</div>
	</label>
);

const MyAddressesTab = () => (
	<div className="space-y-4">
		<RadioGroup defaultValue="home" className="space-y-3">
			<AddressCard
				value="home"
				icon={Home}
				label="Home"
				address="123 Main Street, Apt 4B, San Francisco, CA 94102"
				isDefault
			/>
			<AddressCard
				value="work"
				icon={Briefcase}
				label="Work"
				address="456 Corporate Blvd, Suite 100, San Francisco, CA 94105"
			/>
			<AddressCard
				value="other"
				icon={MapPin}
				label="Parent's House"
				address="789 Oak Avenue, Los Angeles, CA 90210"
			/>
		</RadioGroup>
	</div>
);

const FriendsAddressesTab = () => (
	<div className="space-y-4">
		<RadioGroup className="space-y-3">
			<RecipientCard
				value="jane"
				name="Jane Smith"
				avatar="JS"
				address="321 Friend Lane, San Jose, CA 95112"
				lastUsed="Dec 2024"
			/>
			<RecipientCard
				value="mike"
				name="Mike Johnson"
				avatar="MJ"
				address="654 Buddy Road, Oakland, CA 94601"
				lastUsed="Nov 2024"
			/>
			<RecipientCard
				value="sarah"
				name="Sarah Williams"
				avatar="SW"
				address="987 Pal Street, Berkeley, CA 94702"
			/>
		</RadioGroup>
	</div>
);

const NewAddressTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-3">
							<MapPin className="size-5 text-primary" />
							Shipping Address
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Select or add a new delivery address
						</p>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="my">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="my" className="gap-2">
									<Home className="size-4" />
									<span className="hidden @sm:inline">My</span>
								</TabsTrigger>
								<TabsTrigger value="friends" className="gap-2">
									<Users className="size-4" />
									<span className="hidden @sm:inline">Friends</span>
								</TabsTrigger>
								<TabsTrigger value="new" className="gap-2">
									<MapPin className="size-4" />
									<span className="hidden @sm:inline">New</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="my">
								<MyAddressesTab />
							</TabsContent>

							<TabsContent value="friends">
								<FriendsAddressesTab />
							</TabsContent>

							<TabsContent value="new">
								<NewAddressTab countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Delivery
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
