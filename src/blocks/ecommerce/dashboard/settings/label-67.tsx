import {
	AlertCircle,
	Check,
	Clock,
	Download,
	ExternalLink,
	FileText,
	MoreVertical,
	Printer,
	QrCode,
	Settings2,
	Tag,
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
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

type LabelFormat = {
	id: string;
	name: string;
	size: string;
	description: string;
};

type RecentLabel = {
	id: string;
	orderNumber: string;
	carrier: string;
	tracking: string;
	createdAt: string;
};

const LabelFormatCard = ({
	name,
	size,
	description,
	value,
}: LabelFormat & { value: string }) => (
	<Label
		htmlFor={`format-${value}`}
		className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={`format-${value}`} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<span className="font-medium">{name}</span>
				<Badge variant="outline" className="text-xs">
					{size}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground mt-1">{description}</p>
		</div>
	</Label>
);

const RecentLabelRow = ({
	orderNumber,
	carrier,
	tracking,
	createdAt,
}: RecentLabel) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<div className="flex items-center gap-2">
				<p className="font-medium">#{orderNumber}</p>
				<Badge variant="outline" className="text-xs">
					{carrier}
				</Badge>
			</div>
			<p className="text-xs text-muted-foreground mt-1">
				{tracking} • {createdAt}
			</p>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Printer className="mr-2 size-4" />
					Reprint
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Download className="mr-2 size-4" />
					Download PDF
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ExternalLink className="mr-2 size-4" />
					Track Package
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const labelFormats: LabelFormat[] = [
		{ id: 'thermal', name: 'Thermal Label', size: '4" x 6"', description: 'Standard thermal shipping label' },
		{ id: 'letter', name: 'Letter Size', size: '8.5" x 11"', description: 'Print on regular paper and fold' },
		{ id: 'half', name: 'Half Sheet', size: '8.5" x 5.5"', description: 'Two labels per letter sheet' },
	];

	const recentLabels: RecentLabel[] = [
		{ id: '1', orderNumber: '12345', carrier: 'USPS', tracking: '94XXX...XXX123', createdAt: '2 hours ago' },
		{ id: '2', orderNumber: '12344', carrier: 'UPS', tracking: '1ZXX...XX789', createdAt: '5 hours ago' },
		{ id: '3', orderNumber: '12343', carrier: 'FedEx', tracking: '7XXX...XX456', createdAt: '1 day ago' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Tag className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Label Settings</CardTitle>
										<CardDescription>
											Configure shipping label printing
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-6 pt-6">
								<div>
									<Label className="text-base mb-4 block">Label Format</Label>
									<RadioGroup defaultValue="thermal" className="space-y-3">
										{labelFormats.map((format) => (
											<LabelFormatCard
												key={format.id}
												{...format}
												value={format.id}
											/>
										))}
									</RadioGroup>
								</div>

								<Separator />

								<div className="grid gap-4 @sm:grid-cols-2">
									<div className="space-y-2">
										<Label>Printer Type</Label>
										<Select defaultValue="thermal">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="thermal">Thermal Printer</SelectItem>
												<SelectItem value="laser">Laser Printer</SelectItem>
												<SelectItem value="inkjet">Inkjet Printer</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label>Label Position</Label>
										<Select defaultValue="top">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="top">Top of Page</SelectItem>
												<SelectItem value="bottom">Bottom of Page</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Label Content</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Include Packing Slip</Label>
										<p className="text-sm text-muted-foreground">
											Print packing slip with label
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Include QR Code</Label>
										<p className="text-sm text-muted-foreground">
											Add tracking QR code to label
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Include Return Label</Label>
										<p className="text-sm text-muted-foreground">
											Print return label for customers
										</p>
									</div>
									<Switch />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Recent Labels</CardTitle>
									<Button variant="ghost" size="sm">
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y">
								{recentLabels.map((label) => (
									<RecentLabelRow key={label.id} {...label} />
								))}
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<Printer className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">Print Test Label</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Verify your printer settings
								</p>
								<Button variant="outline" size="sm" className="mt-4">
									Print Test
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
