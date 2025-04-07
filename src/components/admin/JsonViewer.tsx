// src/components/admin/JsonViewer.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JsonViewerProps {
    data: any;
    expandLevel?: number;
    title?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, expandLevel = 1, title }) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [copied, setCopied] = useState(false);

    const toggleNode = (path: string) => {
        const newExpandedNodes = new Set(expandedNodes);
        if (newExpandedNodes.has(path)) {
            newExpandedNodes.delete(path);
        } else {
            newExpandedNodes.add(path);
        }
        setExpandedNodes(newExpandedNodes);
    };

    const isExpanded = (path: string) => {
        return expandedNodes.has(path);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy JSON:', err));
    };

    const renderValue = (value: any, path: string, depth: number): JSX.Element => {
        if (value === null) {
            return <span className="text-gray-500">null</span>;
        }

        if (typeof value === 'boolean') {
            return <span className="text-yellow-600">{value.toString()}</span>;
        }

        if (typeof value === 'number') {
            return <span className="text-blue-600">{value}</span>;
        }

        if (typeof value === 'string') {
            return <span className="text-green-600">"{value}"</span>;
        }

        const isArrayOrObject = Array.isArray(value) || typeof value === 'object';
        const isAutoExpanded = depth < expandLevel;
        const expanded = isAutoExpanded || isExpanded(path);

        if (Array.isArray(value)) {
            const isEmpty = value.length === 0;

            return (
                <div>
                    <span
                        className={`cursor-pointer select-none ${isEmpty ? 'opacity-50' : ''}`}
                        onClick={() => !isEmpty && toggleNode(path)}
                    >
                        {!isEmpty && (expanded ? <ChevronDown className="inline h-3 w-3" /> : <ChevronRight className="inline h-3 w-3" />)}
                        {` Array(${value.length})`}
                    </span>
                    {expanded && !isEmpty && (
                        <div className="pl-4 border-l border-gray-300 ml-1">
                            {value.map((item, index) => (
                                <div key={index}>
                                    <span className="text-gray-500">{index}: </span>
                                    {renderValue(item, `${path}.${index}`, depth + 1)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (typeof value === 'object') {
            const keys = Object.keys(value);
            const isEmpty = keys.length === 0;

            return (
                <div>
                    <span
                        className={`cursor-pointer select-none ${isEmpty ? 'opacity-50' : ''}`}
                        onClick={() => !isEmpty && toggleNode(path)}
                    >
                        {!isEmpty && (expanded ? <ChevronDown className="inline h-3 w-3" /> : <ChevronRight className="inline h-3 w-3" />)}
                        {` Object${isEmpty ? ' (empty)' : ''}`}
                    </span>
                    {expanded && !isEmpty && (
                        <div className="pl-4 border-l border-gray-300 ml-1">
                            {keys.map(key => (
                                <div key={key}>
                                    <span className="text-purple-600">"{key}"</span>: {renderValue(value[key], `${path}.${key}`, depth + 1)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return <span>{String(value)}</span>;
    };

    return (
        <div className="bg-white border rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
                <div className="font-medium text-sm">{title || 'JSON データ'}</div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-500 hover:text-gray-900"
                    onClick={copyToClipboard}
                >
                    {copied ? (
                        <Check className="h-4 w-4 mr-1 text-green-500" />
                    ) : (
                        <Clipboard className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs">{copied ? 'コピーしました' : 'コピー'}</span>
                </Button>
            </div>
            <div className="p-3 overflow-auto font-mono text-sm max-h-[500px]">
                {renderValue(data, 'root', 0)}
            </div>
        </div>
    );
};

export default JsonViewer;