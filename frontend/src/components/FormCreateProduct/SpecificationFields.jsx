'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SpecificationFields = ({ specification, setSpecification }) => {
  const fields = [
    { key: 'screenSize', label: 'Kích thước màn hình' },
    { key: 'resolution', label: 'Độ phân giải' },
    { key: 'cpu', label: 'CPU' },
    { key: 'ram', label: 'RAM' },
    { key: 'storage', label: 'Bộ nhớ' },
    { key: 'battery', label: 'Dung lượng pin' },
    { key: 'os', label: 'Hệ điều hành' },
    { key: 'camera', label: 'Camera' },
    { key: 'sim', label: 'SIM' },
    { key: 'weight', label: 'Trọng lượng' },
  ];

  const handleChange = (key, value) => {
    setSpecification(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Thông số kỹ thuật
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className="space-y-1">
              <Label htmlFor={f.key} className="text-sm font-medium">
                {f.label}
              </Label>
              <Input
                id={f.key}
                type="text"
                value={specification[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={`Nhập ${f.label.toLowerCase()}`}
                className="transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecificationFields;