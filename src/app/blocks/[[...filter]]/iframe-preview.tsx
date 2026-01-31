'use client';
import { useRef, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Check, Code2, Copy, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/CodeBlock';
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from '@/components/ui/resizable';
import { GroupImperativeHandle, Layout } from 'react-resizable-panels';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type DeviceView = 'mobile' | 'tablet' | 'desktop';

export const Preview = ({ href }: { href: string }) => {
	const [copied, setCopied] = useState(false);
	const [sourceCode, setSourceCode] = useState('');
	const fetchSourceCode = async () => {
		if (!sourceCode) {
			try {
				const res = await fetch(`/api/source-code?id=src/${href}.tsx`);
				if (!res.ok) {
					throw new Error(`Failed to fetch source code: ${res.status}`);
				}
				const data = await res.json();
				setSourceCode(data.message);
			} catch (error) {
				console.error('Error fetching source code:', error);
			}
		}
	};

	const handleCopyCode = async () => {
		if (!sourceCode) {
			await fetchSourceCode();
		}
		navigator.clipboard.writeText(sourceCode).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};
	const groupRef = useRef<GroupImperativeHandle>(null);
	const [side, setSide] = useState<'left' | 'right'>('left');
	const handleLayoutChange = (layout: Layout) => {
		let actSide = side === 'left' ? layout.left : layout.right;
		actSide = actSide > 50 ? 100 - actSide : actSide;
		groupRef.current?.setLayout({
			left: actSide,
			center: 100 - actSide * 2,
			right: actSide,
		});
	};

	const deviceWidth = window.innerWidth;
	const onDeviceClick = (width: number) => {
		const center = ((width || deviceWidth) / deviceWidth) * 100;
		const side = (100 - center) / 2;
		groupRef.current?.setLayout({
			left: side,
			center: center,
			right: side,
		});
	};

	return (
		<div className="relative scroll-mt-16 w-full">
			<div className="fixed top-0  right-0 z-40 flex items-center justify-between px-4 py-2.5 bg-background/05 backdrop-blur-xs gap-2">
				<div className="flex items-center gap-2">
					{/* Device View Toggles */}
					<ToggleGroup
						type="single"
						defaultValue="desktop"
						variant="outline"
						onValueChange={(v) => onDeviceClick(+v)}
						size="sm"
						className="*:px-2 *:py-0 *:h-7"
					>
						<ToggleGroupItem value="360">
							<Smartphone />
						</ToggleGroupItem>
						<ToggleGroupItem value="768">
							<Tablet />
						</ToggleGroupItem>
						<ToggleGroupItem value={`${deviceWidth}`}>
							<Monitor />
						</ToggleGroupItem>
					</ToggleGroup>

					{/* View Code */}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="h-7 gap-1.5 px-2 text-xs"
								onClick={fetchSourceCode}
							>
								<Code2 className="size-3.5" />
								<span className="hidden sm:inline">Code</span>
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-5xl! w-[95vw] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
							<DialogHeader className="px-4 py-2 border-b shrink-0 flex-row items-center justify-between">
								<DialogTitle className="flex items-center gap-2 text-sm">
									<CopyButton copied={copied} handleCopyCode={handleCopyCode} />
								</DialogTitle>
							</DialogHeader>
							<CodeBlock code={sourceCode} />
						</DialogContent>
					</Dialog>

					<CopyButton copied={copied} handleCopyCode={handleCopyCode} />
				</div>
			</div>
			<main className="min-h-screen h-full flex items-center justify-center bg-muted/40">
				<div className="h-screen w-full overflow-hidden rounded-lg border shadow-2xl transition-all ">
					<ResizablePanelGroup
						groupRef={groupRef}
						onLayoutChange={handleLayoutChange}
						defaultLayout={{ left: 0, center: 100, right: 0 }}
					>
						<ResizablePanel id="left" />
						<ResizableHandle withHandle onPointerDown={() => setSide('left')} />
						<ResizablePanel id="center">
							<iframe
								src={href ? `/${href}/preview` : ''}
								className="h-full w-full"
								allowFullScreen
							/>
						</ResizablePanel>
						<ResizableHandle
							withHandle
							onPointerDown={() => setSide('right')}
						/>
						<ResizablePanel id="right" />
					</ResizablePanelGroup>
				</div>
			</main>
		</div>
	);
};

function CopyButton({
	copied,
	handleCopyCode,
}: {
	copied: boolean;
	handleCopyCode: () => void;
}) {
	return (
		<div>
			<Button
				variant="outline"
				size="sm"
				className="h-7 gap-1.5 px-2 text-xs"
				onClick={handleCopyCode}
			>
				{copied ? (
					<Check className="size-3.5 text-green-500" />
				) : (
					<Copy className="size-3.5" />
				)}
				<span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
			</Button>
		</div>
	);
}
