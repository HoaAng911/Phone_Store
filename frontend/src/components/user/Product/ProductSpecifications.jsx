// ProductSpecifications component - clean, sharp edges, no rounded cards, Roboto style
import {
  Cpu,
  MemoryStick,
  HardDrive,
  BatteryFull,
  Smartphone,
  Palette,
  Ruler,
  Wifi,
  SignalHigh,
  Camera,
  Cog,
} from 'lucide-react';

export default function ProductSpecifications({ specification }) {
  if (!specification) return null;

  const iconMap = {
    cpu: Cpu,
    ram: MemoryStick,
    storage: HardDrive,
    battery: BatteryFull,
    screen: Smartphone,
    colors: Palette,
    size: Ruler,
    connectivity: Wifi,
    signal: SignalHigh,
    camera: Camera,
    rearCamera: Camera,
    frontCamera: Camera,
    default: Cog,
  };

  const entries = Object.entries(specification).filter(
    ([key, value]) =>
      key !== "id" &&
      key !== "createdAt" &&
      key !== "updatedAt" &&
      value !== null &&
      value !== undefined &&
      value !== ""
  );

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="mt-12 bg-white p-6 border border-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h2 className="text-xl font-bold mb-6 text-gray-900 tracking-wide">Thông số kỹ thuật</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {entries.map(([key, value]) => {
          const Icon = iconMap[key] || iconMap.default;

          return (
            <div key={key} className="flex items-start gap-3 py-2 border-b border-gray-200">
              <Icon className="w-5 h-5 text-gray-700 mt-1" />

              <div className="flex flex-col">
                <span className="text-sm text-gray-600 font-medium tracking-wide">{formatKey(key)}</span>
                <span className="text-base text-gray-900 font-semibold">
                  {Array.isArray(value) ? value.join(', ') : value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
