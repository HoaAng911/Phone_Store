'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BasicInfoSection = ({ form, setForm }) => {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Thông tin cơ bản
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập tên sản phẩm"
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="brand">
              Thương hiệu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brand"
              type="text"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="Nhập thương hiệu"
              className="transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Nhập mô tả sản phẩm"
            rows={4}
            className="resize-none transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="price">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Nhập giá sản phẩm"
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="stock">Tồn kho</Label>
            <Input
              id="stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              placeholder="Nhập số lượng tồn kho"
              className="transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;