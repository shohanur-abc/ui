"use client"
import { useState, useRef, forwardRef } from "react"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Check, Code2, Copy as CopyIcon, ExternalLink as ExternalLinkIcon } from "lucide-react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle, } from "@/components/ui/resizable"
import { CodeBlock } from "./CodeBlock"
import { GroupImperativeHandle, Layout } from "react-resizable-panels"



export const Playground = ({ Preview, website, block, category, variant, tags = [], href
}: {
    file?: string,
    Preview?: React.ReactNode,
    website?: string,
    block?: string,
    category?: string,
    variant?: string,
    tags?: string[]
    href?: string
}) => {
    const [sourceCode, setSourceCode] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const groupRef = useRef<GroupImperativeHandle | null>(null);

    const fetchSourceCode = async () => {
        if (!sourceCode) {
            try {
                // Ensure path starts with 'src/' for API security check
                const apiPath = href?.startsWith('src/') ? href : `src/${href}`;
                const res = await fetch(`/api/source-code?id=${apiPath}.tsx`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch source code: ${res.status}`);
                }
                const data = await res.json();
                setSourceCode(data.message);
                return data.message;
            } catch (error) {
                console.error('Error fetching source code:', error);
            }
        }
    }

    return (
        <section className="relative">
            <div className="sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2.5 bg-background/95 backdrop-blur-sm border-b gap-2">
                <Head
                    website={website}
                    block={block}
                    category={category}
                    variant={variant}
                    tags={tags}
                    href={"src/" + href}
                />
                <BreakPoints
                    containerWidth={containerWidth}
                    groupRef={groupRef}
                    containerRef={containerRef}
                />
                <CodeDialog
                    onClick={fetchSourceCode}
                    sourceCode={sourceCode}
                />
                <Copy
                    text={sourceCode}
                    onFetch={fetchSourceCode}
                />
                <ExternalLink href={href ?? ""} />
            </div>

            <Container
                ref={containerRef}
                groupRef={groupRef}
                setContainerWidth={setContainerWidth}>
                {Preview}
            </Container>

        </section>
    )
}

function Copy({ text = '', onFetch }: { text?: string, onFetch?: () => Promise<string> }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const value = onFetch ? await onFetch() : text;
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button variant="outline" size="sm" className="h-7 gap-1.5 px-2 text-xs" onClick={handleCopy}>
            {copied ? <Check className="size-3.5 text-green-500" /> : <CopyIcon className="size-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
    )
}


type ContainerProps = {
    groupRef: React.RefObject<GroupImperativeHandle | null>;
    setContainerWidth: (width: number) => void;
    children: React.ReactNode;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ groupRef, setContainerWidth, children }, ref) => {
        const [side, setSide] = useState<"left" | "right">("left");

        const handleLayoutChange = (layout: Layout) => {
            let actSide = side === "left" ? layout.left : layout.right;
            actSide = actSide > 50 ? 100 - actSide : actSide;
            groupRef.current?.setLayout({
                left: actSide,
                center: 100 - actSide * 2,
                right: actSide,
            });
        };

        return (
            <main ref={ref} className="overflow-x-auto **:data-[slot=resizable-handle]:w-0 **:data-[slot=resizable-handle]:outline-1">
                <ResizablePanelGroup
                    groupRef={groupRef}
                    onLayoutChange={handleLayoutChange}
                    defaultLayout={{ left: 0, center: 100, right: 0 }}
                >
                    <ResizablePanel id="left" />
                    <ResizableHandle withHandle onPointerDown={() => setSide("left")} />
                    <ResizablePanel id="center" onResize={(w) => { console.log({ get: w.inPixels }); setContainerWidth(w.inPixels / 16); }}>
                        {children}
                    </ResizablePanel>
                    <ResizableHandle withHandle onPointerDown={() => setSide("right")} />
                    <ResizablePanel id="right" />
                </ResizablePanelGroup>
            </main>

        );
    }
);

Container.displayName = "Container";




const CodeDialog = ({ onClick, sourceCode }: { onClick: () => void, sourceCode: string }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs" onClick={onClick}>
                <Code2 className="size-3.5" />
                <span className="hidden sm:inline">Code</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl! w-[95vw] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
            <DialogHeader className="px-4 py-2 border-b shrink-0 flex-row items-center justify-between">
                <DialogTitle className="flex items-center gap-2 text-sm">
                    <Copy text={sourceCode} />
                </DialogTitle>
            </DialogHeader>
            <CodeBlock code={sourceCode} />
        </DialogContent>
    </Dialog>
)

const ExternalLink = ({ href }: { href: string }) => (
    <a href={`/${href}/iframe-preview`} target="_blank">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Open in new tab">
            <ExternalLinkIcon className="size-3.5" />
        </Button>
    </a>
)


const BreakPoints = ({ containerWidth, groupRef, containerRef }: { containerWidth: number, groupRef: React.RefObject<GroupImperativeHandle | null>, containerRef: React.RefObject<HTMLDivElement | null> }) => {
    const onBpClick = (width: number) => {
        const fullWidth = containerRef.current?.offsetWidth ?? 0;
        if (!fullWidth) return;
        console.log({ fullWidth });
        const center = (width / (fullWidth / 16)) * 100;
        const side = (100 - center) / 2;
        console.log({ set: width * 16 });
        groupRef.current?.setLayout({ left: side, center: center, right: side, })
    }
    return (
        <div className="*:data-size:cursor-pointer *:data-[size=sm]:bg-muted *:data-[size=3xl]:bg-muted *:data-[size=7xl]:bg-muted">
            {(
                [["3xs", 16], ["2xs", 18], ["xs", 20], ["sm", 24], ["md", 28], ["lg", 32], ["xl", 36], ["2xl", 42], ["3xl", 48], ["4xl", 56], ["5xl", 64], ["6xl", 72], ["7xl", 80]] as [string, number][]
            ).map(([sz, val], i, arr) => (
                <Badge key={sz}
                    variant={containerWidth >= val && containerWidth < (arr[i + 1]?.[1] || Infinity) ? "destructive" : "outline"}
                    onClick={() => onBpClick(val)} data-size={sz}>{sz}
                </Badge>
            ))}
            <Badge className="border-2 ml-2 border-sky-900 shadow-accent" variant="outline" >{Math.floor(containerWidth)}rem</Badge>
        </div>
    )
}


const Head = ({ website, block, category, variant, tags, href }: { website?: string, block?: string, category?: string, variant?: string, tags: string[], href?: string }) => {
    return (
        <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            {[
                [website, 'bg-primary/10 text-primary border border-primary/30 ring-1 ring-primary/20 shadow-sm dark:bg-primary/15 dark:text-primary rounded'],
                [block, 'bg-secondary text-secondary-foreground'],
                [category, 'bg-accent text-secondary-foreground'],
                [variant, 'bg-muted text-muted-foreground'],
            ].filter(([item]) => item).map(([item, className], index) => (
                <Badge key={index} className={`text-xs capitalize shrink-0 ${className}`}>
                    {item}
                </Badge>
            ))}
            {/* {variant && (<span className="font-medium text-sm truncate">{variant}</span>)} */}

            {/* Tags - responsive display */}
            {tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                    {tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                    ))}
                    {tags.length > 3 && (<span className="text-xs text-muted-foreground">+{tags.length - 3}</span>)}
                </div>
            )}


            {href && <Badge variant="outline" className="cursor-pointer border-2 border-violet-900 focus:ring-2 active:bg-violet-900 " onClick={() => navigator.clipboard.writeText(href)}>path</Badge>}
        </div>
    )
}