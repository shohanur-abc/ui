import {
	AlertCircle,
	Box,
	Check,
	ChevronRight,
	Copy,
	Edit,
	MoreVertical,
	Package,
	Plus,
	Ruler,
	Scale,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

type PackageTemplate = {
	id: string;
	name: string;
	dimensions: string;
	maxWeight: string;
	isDefault: boolean;
};

const PackageRow = ({
	name,
	dimensions,
	maxWeight,
	isDefault,
}: PackageTemplate) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-2">
				<Box className="size-4 text-muted-foreground" />
				<span className="font-medium">{name}</span>
				{isDefault && (
					<Badge className="bg-primary/10 text-primary border-0 text-xs">
						Default
					</Badge>
				)}
			</div>
		</TableCell>
		<TableCell>{dimensions}</TableCell>
		<TableCell>{maxWeight}</TableCell>
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
					<DropdownMenuItem>
						<Copy className="mr-2 size-4" />
						Duplicate
					</DropdownMenuItem>
					{!isDefault && (
						<DropdownMenuItem>
							<Check className="mr-2 size-4" />
							Set as Default
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
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
	const packages: PackageTemplate[] = [
		{ id: '1', name: 'Small Box', dimensions: '6" x 4" x 3"', maxWeight: '1 lb', isDefault: false },
		{ id: '2', name: 'Medium Box', dimensions: '12" x 9" x 6"', maxWeight: '5 lb', isDefault: true },
		{ id: '3', name: 'Large Box', dimensions: '18" x 14" x 10"', maxWeight: '20 lb', isDefault: false },
		{ id: '4', name: 'Flat Envelope', dimensions: '12" x 9" x 0.5"', maxWeight: '0.5 lb', isDefault: false },
		{ id: '5', name: 'Padded Envelope', dimensions: '10" x 8" x 1"', maxWeight: '1 lb', isDefault: false },
		{ id: '6', name: 'Tube', dimensions: '36" x 4" x 4"', maxWeight: '5 lb', isDefault: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Package className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Package Templates</CardTitle>
											<CardDescription>
												Pre-defined package sizes for shipping
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Add Template
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Dimensions</TableHead>
											<TableHead>Max Weight</TableHead>
											<TableHead className="w-10" />
										</TableRow>
									</TableHeader>
									<TableBody>
										{packages.map((pkg) => (
											<PackageRow key={pkg.id} {...pkg} />
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Units</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label>Dimensions</Label>
									<Select defaultValue="in">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="in">Inches (in)</SelectItem>
											<SelectItem value="cm">Centimeters (cm)</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Weight</Label>
									<Select defaultValue="lb">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="lb">Pounds (lb)</SelectItem>
											<SelectItem value="oz">Ounces (oz)</SelectItem>
											<SelectItem value="kg">Kilograms (kg)</SelectItem>
											<SelectItem value="g">Grams (g)</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Auto-Select Package</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Auto-select</Label>
										<p className="text-xs text-muted-foreground">
											Choose best package for items
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Combine items</Label>
										<p className="text-xs text-muted-foreground">
											Pack multiple items together
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<Box className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">
									{packages.length} Templates
								</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Pre-configured for quick shipping
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
