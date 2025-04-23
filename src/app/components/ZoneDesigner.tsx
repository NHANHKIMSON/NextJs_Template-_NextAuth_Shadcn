"use client";

import { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { HexColorPicker } from "react-colorful";

type Zone = {
    id: number;
    name: string;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

export default function ZoneDesigner() {
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);

    const addZone = () => {
        const spacing = 40;
        const id = Date.now();
        setZones((prev) => [
            ...prev,
            {
                id,
                name: `Zone ${prev.length + 1}`,
                color: "#e74c3c",
                x: spacing * prev.length,
                y: spacing * prev.length,
                width: 100,
                height: 80,
            },
        ]);
        setSelectedZoneId(id);
    };

    const updateZone = (id: number, updates: Partial<Zone>) => {
        setZones((prev) =>
            prev.map((z) => (z.id === id ? { ...z, ...updates } : z))
        );
    };

    const deleteZone = (id: number) => {
        setZones((prev) => prev.filter((z) => z.id !== id));
        if (selectedZoneId === id) setSelectedZoneId(null);
    };

    const saveLayout = () => {
        const layout = document.getElementById("layout-canvas");
        if (!layout) return;
    };

    const selectedZone = zones.find((z) => z.id === selectedZoneId);

    return (
        <div className="flex gap-6 p-6">
            <div className="w-1/4 space-y-4 border p-4 rounded bg-gray-50">
                <button
                    onClick={addZone}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Add Zone
                </button>

                {selectedZone && (
                    <>
                        <label className="block font-medium">Zone Name:</label>
                        <input
                            value={selectedZone.name}
                            onChange={(e) =>
                                updateZone(selectedZone.id, { name: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded"
                        />

                        <label className="block font-medium mt-4">Zone Color:</label>
                        <HexColorPicker
                            color={selectedZone.color}
                            onChange={(color) => updateZone(selectedZone.id, { color })}
                        />

                        <button
                            onClick={() => deleteZone(selectedZone.id)}
                            className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Delete Zone
                        </button>
                    </>
                )}

                <button
                    onClick={saveLayout}
                    className="mt-8 w-full px-4 py-2 bg-green-600 text-white rounded"
                >
                    Save Layout
                </button>
            </div>

            <DndContext
                onDragEnd={({ delta, active }) => {
                    setZones((zones) =>
                        zones.map((zone) =>
                            zone.id === active.id
                                ? {
                                    ...zone,
                                    x: Math.round((zone.x + delta.x) / 20) * 20,
                                    y: Math.round((zone.y + delta.y) / 20) * 20,
                                }
                                : zone
                        )
                    );
                }}
            >
                <div
                    id="layout-canvas"
                    className="relative w-full h-[600px] border bg-gray-100 bg-[linear-gradient(#ddd_1px,transparent_1px),linear-gradient(90deg,#ddd_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden"
                >
                    {zones.map((zone) => (
                        <DraggableZone
                            key={zone.id}
                            {...zone}
                            isSelected={zone.id === selectedZoneId}
                            onClick={() => setSelectedZoneId(zone.id)}
                            onResize={(width, height) =>
                                updateZone(zone.id, { width, height })
                            }
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
}

function DraggableZone({
                           id,
                           name,
                           color,
                           x,
                           y,
                           width,
                           height,
                           isSelected,
                           onClick,
                           onResize,
                       }: Zone & {
    isSelected: boolean;
    onClick: () => void;
    onResize: (w: number, h: number) => void;
}) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    const style = {
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width,
        height,
        backgroundColor: color,
        border: isSelected ? "2px solid #000" : "1px solid #ccc",
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="absolute rounded text-white cursor-move shadow-md p-2 resize overflow-hidden"
            onClick={onClick}
            onMouseUp={(e) => {
                const el = e.currentTarget;
                const newWidth = Math.round(el.offsetWidth / 20) * 20;
                const newHeight = Math.round(el.offsetHeight / 20) * 20;
                onResize(newWidth, newHeight);
            }}
        >
            {name}
        </div>
    );
}