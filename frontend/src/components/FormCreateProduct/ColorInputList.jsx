'use client';

import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ColorInputList = ({ newColor, setNewColor, addColor, colors, removeColor }) => {
  return (
    <div className="space-y-3">
      <Label>Màu sắc</Label>

      <div className="flex gap-2">
        <Input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addColor()}
          placeholder="Thêm màu mới..."
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addColor}
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {colors.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1 text-sm"
            >
              <span>{color}</span>
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-1 text-red-500 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Chưa có màu nào được thêm
        </p>
      )}
    </div>
  );
};

export default ColorInputList;