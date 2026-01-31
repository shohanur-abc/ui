import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Order {
	id: string;
	customer: string;
	region: string;
	amount: string;
	progress: number;
	status: 'fulfilled' | 'partial' | 'pending';
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	showing: string;
}

interface ProgressCellProps {
	progress: number;
	status: Order['status'];
}

interface PaginationButtonProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	disabled?: boolean;
}

const ProgressCell = ({ progress, status }: ProgressCellProps) => {
	const colors: Record<Order['status'], string> = {
		fulfilled: 'bg-accent',
		partial: 'bg-primary',
		pending: 'bg-muted-foreground',
	};
	return (
		<div className="flex items-center gap-3 min-w-32">
			<Progress value={progress} className="h-2 flex-1 bg-muted [&>div]:transition-all" />
			<span className="text-xs text-muted-foreground w-10">{progress}%</span>
		</div>
	);
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const config: Record<Order['status'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
		fulfilled: { label: 'Fulfilled', variant: 'default' },
		partial: { label: 'Partial', variant: 'secondary' },
		pending: { label: 'Pending', variant: 'outline' },
	};
	return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
};

const PaginationButton = ({ icon: Icon, label, disabled }: PaginationButtonProps) => (
	<Button variant="outline" size="icon-sm" disabled={disabled} className="hover:bg-muted">
		<Icon className="size-4" />
		<span className="sr-only">{label}</span>
	</Button>
);

const Pagination = ({ currentPage, totalPages, showing }: PaginationProps) => (
	<div className="flex items-center justify-between px-4 py-3">
		<span className="text-sm text-muted-foreground">{showing}</span>
		<div className="flex items-center gap-1">
			<PaginationButton icon={ChevronsLeft} label="First page" disabled={currentPage === 1} />
			<PaginationButton icon={ChevronLeft} label="Previous" disabled={currentPage === 1} />
			<div className="flex items-center gap-1 px-2">
				{Array.from({ length: totalPages }, (_, i) => (
					<Button
						key={i}
						variant={currentPage === i + 1 ? 'default' : 'ghost'}
						size="icon-sm"
						className="text-xs"
					>
						{i + 1}
					</Button>
				))}
			</div>
			<PaginationButton icon={ChevronRight} label="Next" disabled={currentPage === totalPages} />
			<PaginationButton icon={ChevronsRight} label="Last page" disabled={currentPage === totalPages} />
		</div>
	</div>
);

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell className="font-medium">{order.customer}</TableCell>
		<TableCell className="text-muted-foreground">{order.region}</TableCell>
		<TableCell className="font-semibold">{order.amount}</TableCell>
		<TableCell>
			<ProgressCell progress={order.progress} status={order.status} />
		</TableCell>
		<TableCell>
			<StatusBadge status={order.status} />
		</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{ id: 'ORD-7841', customer: 'TechCorp Inc.', region: 'North America', amount: '$12,450.00', progress: 100, status: 'fulfilled' },
		{ id: 'ORD-7842', customer: 'Global Retail Ltd.', region: 'Europe', amount: '$8,920.00', progress: 75, status: 'partial' },
		{ id: 'ORD-7843', customer: 'Asia Markets Co.', region: 'Asia Pacific', amount: '$15,780.00', progress: 100, status: 'fulfilled' },
		{ id: 'ORD-7844', customer: 'StartupXYZ', region: 'North America', amount: '$3,240.00', progress: 30, status: 'pending' },
		{ id: 'ORD-7845', customer: 'MegaStore Chain', region: 'Europe', amount: '$24,100.00', progress: 60, status: 'partial' },
		{ id: 'ORD-7846', customer: 'Pacific Traders', region: 'Asia Pacific', amount: '$7,650.00', progress: 100, status: 'fulfilled' },
	];

	const headers = ['Order ID', 'Customer', 'Region', 'Amount', 'Fulfillment', 'Status'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/40 hover:bg-muted/40 border-border/50">
								{headers.map((header) => (
									<TableHead key={header} className="font-semibold">{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<OrderRow key={order.id} order={order} />
							))}
						</TableBody>
						<TableFooter className="bg-transparent border-t border-border/50">
							<TableRow className="hover:bg-transparent">
								<TableCell colSpan={6} className="p-0">
									<Pagination
										currentPage={1}
										totalPages={5}
										showing="Showing 1-6 of 28 orders"
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</section>
	);
}
