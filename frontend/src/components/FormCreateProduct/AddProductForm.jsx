import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useProductStore from '../../store/useProductStore';

// ShadCN Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import BasicInfoSection from './BasicInfoSection';
import ImageUpload from './ImageUpload';
import SpecificationSection from './SpecificationSection';

const formSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().optional(),
  price: z.string().min(1, 'Giá là bắt buộc').refine((val) => !isNaN(val) && Number(val) > 0, {
    message: 'Giá phải là số dương',
  }),
  brand: z.string().min(1, 'Thương hiệu là bắt buộc'),
  stock: z.string().optional().refine((val) => !val || (!isNaN(val) && Number(val) >= 0), {
    message: 'Tồn kho phải là số không âm',
  }),
});

const AddProductForm = () => {
  const { UploadImage, createProduct } = useProductStore();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const [specification, setSpecification] = useState({
    screenSize: '',
    resolution: '',
    cpu: '',
    ram: '',
    storage: '',
    battery: '',
    os: '',
    camera: '',
    sim: '',
    weight: '',
    colors: [],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      brand: '',
      stock: '',
    },
  });

  const onSubmit = async (values) => {
    if (!values.name || !values.price || !values.brand) {
      return form.setError('root', { message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }

    setLoading(true);
    try {
      let images = [];
      if (file) {
        const uploadRes = await UploadImage(file);
        if (uploadRes?.url) images.push({ url: uploadRes.url });
      }

      const hasSpec = Object.values(specification).some(
        (v) => (Array.isArray(v) ? v.length > 0 : v)
      );

      const productData = {
        ...values,
        price: +values.price,
        stock: values.stock ? +values.stock : 0,
        images,
        specification: hasSpec ? specification : undefined,
      };

      await createProduct(productData);

      // Reset form
      form.reset();
      setSpecification({
        screenSize: '',
        resolution: '',
        cpu: '',
        ram: '',
        storage: '',
        battery: '',
        os: '',
        camera: '',
        sim: '',
        weight: '',
        colors: [],
      });
      setFile(null);
      setPreview(null);
      setShowSpecs(false);

      alert('Thêm sản phẩm thành công');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tạo sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle className="text-xl font-semibold">Thêm Sản Phẩm Mới</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <BasicInfoSection form={form} />

                {/* Image Upload */}
                <ImageUpload
                  file={file}
                  setFile={setFile}
                  preview={preview}
                  setPreview={setPreview}
                />

                {/* Toggle Specifications */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  {showSpecs ? (
                    <>
                      <ChevronUp className="w-4 h-4" /> Ẩn thông số kỹ thuật
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" /> Thêm thông số kỹ thuật
                    </>
                  )}
                </Button>

                {/* Specification Section */}
                {showSpecs && (
                  <SpecificationSection
                    specification={specification}
                    setSpecification={setSpecification}
                  />
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[140px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang thêm...
                      </>
                    ) : (
                      'Thêm sản phẩm'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProductForm;